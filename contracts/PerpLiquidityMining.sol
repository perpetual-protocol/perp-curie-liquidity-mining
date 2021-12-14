// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.9;
pragma abicoder v2;

import { MerkleRedeemUpgradeSafe } from "./Balancer/MerkleRedeemUpgradeSafe.sol";

contract PerpLiquidityMining is MerkleRedeemUpgradeSafe {
    //**********************************************************//
    //    The below state variables can not change the order    //
    //**********************************************************//
    // array of week
    uint256[] public merkleRootIndexes;

    //**********************************************************//
    //    The above state variables can not change the order    //
    //**********************************************************//

    function initialize(address _token) external initializer {
        require(_token != address(0), "Invalid input");
        __MerkleRedeem_init(_token);
    }

    function seedAllocations(
        uint256 _week,
        bytes32 _merkleRoot,
        uint256 _totalAllocation
    ) public override onlyOwner {
        super.seedAllocations(_week, _merkleRoot, _totalAllocation);
        merkleRootIndexes.push(_week);
    }

    function claimWeek(
        address _account,
        uint256 _week,
        uint256 _claimedBalance,
        bytes32[] memory _merkleProof
    ) public override {
        require(weekMerkleRoots[_week] != 0, "Invalid claim");
        super.claimWeek(_account, _week, _claimedBalance, _merkleProof);
    }

    function claimWeeks(address _account, Claim[] memory _claims) public virtual override {
        for (uint256 i; i < _claims.length; i++) {
            claimWeek(_account, _claims[i].week, _claims[i].balance, _claims[i].merkleProof);
        }
    }

    //
    // VIEW
    //

    function getLengthOfMerkleRoots() external view returns (uint256) {
        return merkleRootIndexes.length;
    }
}
