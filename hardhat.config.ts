import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "@openzeppelin/hardhat-upgrades"
import "@tenderly/hardhat-tenderly"
import "@typechain/hardhat"
import "hardhat-contract-sizer"
import "hardhat-dependency-compiler"
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import "hardhat-gas-reporter"
import { HardhatUserConfig } from "hardhat/config"
import "solidity-coverage"
import { ETHERSCAN_API_KEY } from "./constants"
import "./mocha-test"
import { getMnemonic, getUrl } from "./scripts/hardhatConfig"

enum ChainId {
    HOMESTEAD_CHAIN_ID = 1,
    KOVAN_CHAIN_ID = 42,
    OPTIMISM_CHAIN_ID = 10,
    OPTIMISM_KOVAN_CHAIN_ID = 69,
}

enum CompanionNetwork {
    optimism = "optimism",
    optimismKovan = "optimismKovan",
}

const config: HardhatUserConfig = {
    solidity: {
        version: "0.7.6",
        settings: {
            optimizer: { enabled: true, runs: 200 },
            evmVersion: "berlin",
            // for smock to mock contracts
            outputSelection: {
                "*": {
                    "*": ["storageLayout"],
                },
            },
        },
    },
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true,
        },
        optimismKovan: {
            url: getUrl(CompanionNetwork.optimismKovan),
            accounts: {
                mnemonic: getMnemonic(CompanionNetwork.optimismKovan),
            },
            chainId: ChainId.OPTIMISM_KOVAN_CHAIN_ID,
        },
        optimism: {
            url: getUrl(CompanionNetwork.optimism),
            accounts: {
                mnemonic: getMnemonic(CompanionNetwork.optimism),
            },
            chainId: ChainId.OPTIMISM_CHAIN_ID,
        },
    },
    namedAccounts: {
        deployer: 0, // 0 means ethers.getSigners[0]
        optimismL2BridgeAddress: {
            [ChainId.OPTIMISM_CHAIN_ID]: "0x4200000000000000000000000000000000000010",
            [ChainId.OPTIMISM_KOVAN_CHAIN_ID]: "0x4200000000000000000000000000000000000010",
        },
        perpTokenAddress: {
            // Perp token address on optimism
            // [ChainId.OPTIMISM_CHAIN_ID]: "",
            // Perp token address on optimismKovan
            [ChainId.OPTIMISM_KOVAN_CHAIN_ID]: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
        },
    },
    dependencyCompiler: {
        paths: ["@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol"],
    },
    external: {
        contracts: [
            {
                artifacts: "node_modules/@openzeppelin/contracts/build",
            },
        ],
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: false,
    },
    gasReporter: {
        excludeContracts: ["test"],
    },
    mocha: {
        require: ["ts-node/register/files"],
        jobs: 4,
        timeout: 120000,
        color: true,
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}

export default config
