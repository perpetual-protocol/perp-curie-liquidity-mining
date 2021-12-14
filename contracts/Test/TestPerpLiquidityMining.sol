// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.9;
pragma experimental ABIEncoderV2;

import "../PerpLiquidityMining.sol";

contract TestPerpLiquidityMining is PerpLiquidityMining {
    function verifyClaim(
        address _liquidityProvider,
        uint256 _week,
        uint256 _claimedBalance,
        bytes32[] memory _merkleProof
    ) public view override returns (bool valid) {
        return true;
    }
}
