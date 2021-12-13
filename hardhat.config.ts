import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "@tenderly/hardhat-tenderly"
import "@typechain/hardhat"
import "hardhat-contract-sizer"
import "hardhat-dependency-compiler"
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import "hardhat-gas-reporter"
import { HardhatUserConfig } from "hardhat/config"
import "solidity-coverage"
import {
    OPTIMISM_DEPLOYER_MNEMONIC,
    OPTIMISM_KOVAN_DEPLOYER_MNEMONIC,
    OPTIMISM_KOVAN_WEB3_ENDPOINT,
    OPTIMISM_WEB3_ENDPOINT,
} from "./constants"
import "./mocha-test"

export function getUrl(network: string) {
    const NetworkUrl = {
        optimism: OPTIMISM_WEB3_ENDPOINT,
        optimismKovan: OPTIMISM_KOVAN_WEB3_ENDPOINT,
    }

    return NetworkUrl[network] ? NetworkUrl[network] : ""
}

export function getMnemonic(network: string) {
    const NetworkMnemonic = {
        optimism: OPTIMISM_DEPLOYER_MNEMONIC,
        optimismKovan: OPTIMISM_KOVAN_DEPLOYER_MNEMONIC,
    }

    return NetworkMnemonic[network] ? NetworkMnemonic[network] : ""
}

enum ChainId {
    OPTIMISM_CHAIN_ID = 10,
    OPTIMISM_KOVAN_CHAIN_ID = 69,
}

enum CompanionNetwork {
    optimism = "optimism",
    optimismKovan = "optimismKovan",
}

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.9",
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
    },
    dependencyCompiler: {
        paths: ["@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol"],
    },
    external: {
        contracts: [
            {
                artifacts: "node_modules/@openzeppelin/contracts-upgradeable/build",
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
}

export default config
