// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.7.6;
pragma abicoder v2;

import { AddressUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import { IRewardDelegate } from "@perp/voting-escrow/contracts/interface/IRewardDelegate.sol";
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

    /// @notice Emitted when rewardDelegate is changed.
    /// @param oldValue Old address of rewardDelegate
    /// @param newValue New address of rewardDelegate
    event RewardDelegateChanged(address oldValue, address newValue);

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

    address internal _rewardDelegate;

    //
    // MODIFIER
    //

    /// @notice Modifier to check if the caller's vePERP lock time is over minLockDuration
    modifier userLockTimeCheck(address user) {
        address beneficiary = _getBeneficiary(user);

        uint256 currentEpochStartTimestamp = (block.timestamp / _WEEK) * _WEEK; // round down to the start of the epoch
        uint256 userLockEndTimestamp = IvePERP(_vePERP).locked__end(beneficiary);

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
        address rewardDelegateArg,
        uint256 minLockDurationArg
    ) external initializer {
        // vePRD_TNC: token is not a contract
        require(tokenArg.isContract(), "vePRD_TNC");

        __MerkleRedeem_init(tokenArg);

        setVePERP(vePERPArg);
        setMinLockDuration(minLockDurationArg);
        setRewardDelegate(rewardDelegateArg);

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

    function setRewardDelegate(address rewardDelegateArg) public onlyOwner {
        // vePRD_RDNC: RewardDelegate is not a contract
        require(rewardDelegateArg.isContract(), "vePRD_RDNC");

        address oldRewardDelegate = _rewardDelegate;
        _rewardDelegate = rewardDelegateArg;
        emit RewardDelegateChanged(oldRewardDelegate, rewardDelegateArg);
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

        address beneficiary = _getBeneficiary(liquidityProvider);

        _distribute(beneficiary, claimedBalance);
        emit VePERPClaimedV2(liquidityProvider, week, claimedBalance, beneficiary);
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
        address beneficiary = _getBeneficiary(liquidityProvider);

        for (uint256 i = 0; i < length; i++) {
            claim = claims[i];

            // vePRD_CA: claimed already
            require(!claimed[claim.week][liquidityProvider], "vePRD_CA");

            // vePRD_IMP: invalid merkle proof
            require(verifyClaim(liquidityProvider, claim.week, claim.balance, claim.merkleProof), "vePRD_IMP");

            totalBalance += claim.balance;
            claimed[claim.week][liquidityProvider] = true;
            emit VePERPClaimedV2(liquidityProvider, claim.week, claim.balance, beneficiary);
        }
        _distribute(beneficiary, totalBalance);
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

    /// @notice Get `rewardDelegate` address
    /// @return rewardDelegate The address of RewardDelegate
    function getRewardDelegate() external view returns (address rewardDelegate) {
        return _rewardDelegate;
    }

    //
    // INTERNAL NON-VIEW
    //

    /// @dev Replace parent function disburse() because vePERP distributor uses deposit_for() instead of transfer()
    ///      to distribute the rewards
    function _distribute(address beneficiary, uint256 balance) internal {
        if (balance > 0) {
            IvePERP(_vePERP).deposit_for(beneficiary, balance);
        }
    }

    /// @dev Get the beneficiary address from `RewardDelegate` contract
    ///      if user didn't have delegate, will return the user address itself
    function _getBeneficiary(address user) internal view returns (address beneficiary) {
        (beneficiary, ) = IRewardDelegate(_rewardDelegate).getBeneficiaryAndTrusterCount(user);

        return beneficiary;
    }
}
