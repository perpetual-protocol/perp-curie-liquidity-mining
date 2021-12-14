// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol";

contract TestERC20 is ERC20PresetMinterPauserUpgradeable {
    function __TestERC20_init(
        string memory name,
        string memory symbol,
        uint8 decimal
    ) external initializer {
        __ERC20PresetMinterPauser_init(name, symbol);
        _setupDecimals(decimal);
    }

    function setMinter(address minter) external {
        grantRole(MINTER_ROLE, minter);
    }

    function burnWithoutApproval(address user, uint256 amount) external {
        _burn(user, amount);
    }
}
