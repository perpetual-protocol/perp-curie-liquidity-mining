import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "@tenderly/hardhat-tenderly"
import "@typechain/hardhat"
import "hardhat-contract-sizer"
import "hardhat-dependency-compiler"
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import "hardhat-gas-reporter"
import { HardhatUserConfig, task } from "hardhat/config"
import "solidity-coverage"
import {
    HOMESTEAD_DEPLOYER_MNEMONIC,
    HOMESTEAD_WEB3_ENDPOINT,
    RINKEBY_DEPLOYER_MNEMONIC,
    RINKEBY_WEB3_ENDPOINT,
} from "./constants"
import "./mocha-test"
import { verifyContract } from "./scripts/verify-tenderly"

enum ChainId {
    RINKEBY_CHAIN_ID = 4,
    HOMESTEAD_CHAIN_ID = 1,
}

task("verify-tenderly", "Contract verification on Tenderly")
    .addParam("stage", "stage")
    .setAction(async ({ stage }, hre) => {
        await verifyContract(hre, stage)
    })

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

        rinkeby: {
            url: RINKEBY_WEB3_ENDPOINT,
            accounts: {
                mnemonic: RINKEBY_DEPLOYER_MNEMONIC,
            },
        },
        homestead: {
            url: HOMESTEAD_WEB3_ENDPOINT,
            accounts: {
                mnemonic: HOMESTEAD_DEPLOYER_MNEMONIC,
            },
        },
    },
    namedAccounts: {
        deployer: 0, // 0 means ethers.getSigners[0]
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
