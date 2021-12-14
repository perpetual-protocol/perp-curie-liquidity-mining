// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.9;

import { L2StandardERC20 } from "@eth-optimism/contracts/standards/L2StandardERC20.sol";

contract OpPerpToken is L2StandardERC20 {
    constructor(address _l2Bridge, address _l1Token) L2StandardERC20(_l2Bridge, _l1Token, "Perpetual", "PERP") {}
}
