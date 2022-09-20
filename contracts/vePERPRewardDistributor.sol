// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.7.6;
pragma abicoder v2;

import { AddressUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import { MerkleRedeemUpgradeSafe } from "./Balancer/MerkleRedeemUpgradeSafe.sol";
import { IvePERP } from "./interface/IvePERP.sol";

contract vePERPRewardDistributor is MerkleRedeemUpgradeSafe {
    using AddressUpgradeable for address;

    /// @notice Emitted when vePERP address is changed.
    /// @param oldValue Old vePERP address
    /// @param newValue New vePERP address
    event VePERPChanged(address oldValue, address newValue);

    /// @notice Emitted when minimum lock duration is changed.
    /// @param oldValue Old minimum lock time
    /// @param newValue New minimum lock time
    event MinLockDurationChanged(uint256 oldValue, uint256 newValue);

    /// @notice Emitted when seed allocation on a week
    /// @param week Week number
    /// @param totalAllocation Total allocation on the week
    event AllocationSeeded(uint256 indexed week, uint256 totalAllocation);

    /// @dev After supporting delegation, this event is deprecated, use VePERPClaimedV2 instead
    /// @notice Emitted when user claim vePERP reward
    /// @param claimant Claimant address
    /// @param week Week number
    /// @param balance Amount of vePERP reward claimed
    event VePERPClaimed(address indexed claimant, uint256 indexed week, uint256 balance);

    /// @notice Emitted when user claim vePERP reward
    /// @param claimant Claimant address
    /// @param week Week number
    /// @param balance Amount of vePERP reward claimed
    /// @param recipient The address who actually receives vePERP reward
    ///        could be another address if the claimant delegates
    event VePERPClaimedV2(address indexed claimant, uint256 indexed week, uint256 balance, address recipient);

    /// @notice Emitted when user set delegate
    /// @param delegator User address
    /// @param delegate The address user delegated
    event SetDelegate(address indexed delegator, address indexed delegate);

    /// @notice Emitted when user clear delegate
    /// @param delegator User address
    /// @param delegate The address user cleared
    event ClearDelegate(address indexed delegator, address indexed delegate);

    uint256 internal constant _WEEK = 7 * 86400; // a week in seconds

    //**********************************************************//
    //    The below state variables can not change the order    //
    //**********************************************************//
    // array of week (keep this public for backward compatibility)
    uint256[] public merkleRootIndexes;

    uint256 internal _minLockDuration;
    address internal _vePERP;
    //**********************************************************//
    //    The above state variables can not change the order    //
    //**********************************************************//

    mapping(address => address) public delegation;

    //
    // MODIFIER
    //

    /// @notice Modifier to check if the caller's vePERP lock time is over minLockDuration
    /// @dev If user has delegate, will check delegate's lock qualified or not
    modifier userLockTimeCheck(address user) {
        address delegate = delegation[user];
        address recipient = delegate == address(0) ? user : delegate; // the account who actually receives vePERP

        uint256 currentEpochStartTimestamp = (block.timestamp / _WEEK) * _WEEK; // round down to the start of the epoch
        uint256 userLockEndTimestamp = IvePERP(_vePERP).locked__end(recipient);

        // vePRD_LTM: vePERP lock time is less than minLockDuration
        require(userLockEndTimestamp >= currentEpochStartTimestamp + _minLockDuration, "vePRD_LTM");
        _;
    }

    //
    // ONLY OWNER
    //

    function initialize(
        address tokenArg,
        address vePERPArg,
        uint256 minLockDurationArg
    ) external initializer {
        // vePRD_TNC: token is not a contract
        require(tokenArg.isContract(), "vePRD_TNC");

        __MerkleRedeem_init(tokenArg);

        setVePERP(vePERPArg);
        setMinLockDuration(minLockDurationArg);

        // approve the vePERP contract to spend the PERP token
        token.approve(vePERPArg, type(uint256).max);
    }

    function seedAllocations(
        uint256 week,
        bytes32 merkleRoot,
        uint256 totalAllocation
    ) public override onlyOwner {
        super.seedAllocations(week, merkleRoot, totalAllocation);
        merkleRootIndexes.push(week);
        emit AllocationSeeded(week, totalAllocation);
    }

    /// @dev In case of vePERP migration, unclaimed PERP would be able to be deposited to the new contract instead
    function setVePERP(address vePERPArg) public onlyOwner {
        // vePRD_vePNC: vePERP is not a contract
        require(vePERPArg.isContract(), "vePRD_vePNC");

        address oldVePERP = _vePERP;
        _vePERP = vePERPArg;
        emit VePERPChanged(oldVePERP, vePERPArg);
    }

    function setMinLockDuration(uint256 minLockDurationArg) public onlyOwner {
        uint256 oldMinLockDuration = _minLockDuration;
        _minLockDuration = minLockDurationArg;
        emit MinLockDurationChanged(oldMinLockDuration, minLockDurationArg);
    }

    //
    // PUBLIC NON-VIEW
    //

    /// @notice Claim vePERP reward for a week
    /// @dev Overwrite the parent's function because vePERP distributor doesn't follow the inherited behaviors
    ///      from its parent. More specifically, it uses deposit_for() instead of transfer() to distribute the rewards.
    /// @param liquidityProvider Liquidity provider address
    /// @param week Week number of the reward claimed
    /// @param claimedBalance Amount of vePERP reward claimed
    /// @param merkleProof Merkle proof of the week's allocation
    function claimWeek(
        address liquidityProvider,
        uint256 week,
        uint256 claimedBalance,
        bytes32[] calldata merkleProof
    ) public override userLockTimeCheck(liquidityProvider) {
        // vePRD_CA: claimed already
        require(!claimed[week][liquidityProvider], "vePRD_CA");

        // vePRD_IMP: invalid merkle proof
        require(verifyClaim(liquidityProvider, week, claimedBalance, merkleProof), "vePRD_IMP");

        claimed[week][liquidityProvider] = true;
        _distribute(liquidityProvider, claimedBalance);
        address recipient = _getRecipient(liquidityProvider);
        emit VePERPClaimedV2(liquidityProvider, week, claimedBalance, recipient);
    }

    /// @notice Claim vePERP reward for multiple weeks
    /// @dev Overwrite the parent's function because vePERP distributor doesn't follow the inherited behaviors
    ///      from its parent. More specifically, it uses deposit_for() instead of transfer() to distribute the rewards.
    /// @param liquidityProvider Liquidity provider address
    /// @param claims Array of Claim structs
    function claimWeeks(address liquidityProvider, Claim[] calldata claims)
        public
        override
        userLockTimeCheck(liquidityProvider)
    {
        uint256 totalBalance = 0;
        uint256 length = claims.length;
        Claim calldata claim;
        address recipient = _getRecipient(liquidityProvider);

        for (uint256 i = 0; i < length; i++) {
            claim = claims[i];

            // vePRD_CA: claimed already
            require(!claimed[claim.week][liquidityProvider], "vePRD_CA");

            // vePRD_IMP: invalid merkle proof
            require(verifyClaim(liquidityProvider, claim.week, claim.balance, claim.merkleProof), "vePRD_IMP");

            totalBalance += claim.balance;
            claimed[claim.week][liquidityProvider] = true;
            emit VePERPClaimedV2(liquidityProvider, claim.week, claim.balance, recipient);
        }
        _distribute(liquidityProvider, totalBalance);
    }

    /// @notice Sets a delegate for the msg.sender
    /// @param delegate Address of the delegate
    function setDelegate(address delegate) external {
        require(delegate != msg.sender, "vePRD_DTS");
        require(delegate != address(0), "vePRD_DTZ");
        address currentDelegate = delegation[msg.sender];
        require(delegate != currentDelegate, "vePRD_AD");

        // Update delegation mapping
        delegation[msg.sender] = delegate;

        if (currentDelegate != address(0)) {
            emit ClearDelegate(msg.sender, currentDelegate);
        }

        emit SetDelegate(msg.sender, delegate);
    }

    /// @notice Clears a delegate for the msg.sender
    function clearDelegate() external {
        address currentDelegate = delegation[msg.sender];
        require(currentDelegate != address(0), "vePRD_ND");

        // update delegation mapping
        delegation[msg.sender] = address(0);

        emit ClearDelegate(msg.sender, currentDelegate);
    }

    //
    // EXTERNAL VIEW
    //

    /// @notice Get the merkleRootIndexes length
    /// @return length The length of merkleRootIndexes
    function getLengthOfMerkleRoots() external view returns (uint256 length) {
        return merkleRootIndexes.length;
    }

    /// @notice Get `vePERP` address
    /// @return vePERP The address of vePERP
    function getVePerp() external view returns (address vePERP) {
        return _vePERP;
    }

    /// @notice Get minLockDuration
    /// @return minLockDuration The minimum lock duration time
    function getMinLockDuration() external view returns (uint256 minLockDuration) {
        return _minLockDuration;
    }

    //
    // INTERNAL NON-VIEW
    //

    /// @dev Replace parent function disburse() because vePERP distributor uses deposit_for() instead of transfer()
    ///      to distribute the rewards
    function _distribute(address liquidityProvider, uint256 balance) internal {
        address recipient = _getRecipient(liquidityProvider);

        if (balance > 0) {
            emit Claimed(liquidityProvider, balance);
            IvePERP(_vePERP).deposit_for(recipient, balance);
        }
    }

    //
    // INTERNAL VIEW
    //

    function _getRecipient(address liquidityProvider) internal view returns (address) {
        address delegate = delegation[liquidityProvider];
        return delegate == address(0) ? liquidityProvider : delegate;
    }
}
