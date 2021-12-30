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
import { HardhatUserConfig, task } from "hardhat/config"
import "solidity-coverage"
import { ETHERSCAN_API_KEY } from "./constants"
import "./mocha-test"
import { getMnemonic, getUrl, tenderlyConfig } from "./scripts/hardhatConfig"
import { verifyOnEtherscan, verifyOnTenderly } from "./scripts/verify"

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

task("etherscanVerify", "Verify on etherscan")
    .addOptionalParam("contract", "Contract need to verify")
    .setAction(async ({ contract }, hre) => {
        await verifyOnEtherscan(hre, contract)
    })

task("tenderlyVerify", "Verify on tenderly")
    .addOptionalParam("contract", "Contract need to verify")
    .setAction(async ({ contract }, hre) => {
        const network = hre.network.name

        hre.config.tenderly = {
            project: tenderlyConfig[network],
            username: "perpprotocol",
        }

        await verifyOnTenderly(hre, contract)
    })

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
        gnosisSafeAddress: {
            [ChainId.OPTIMISM_CHAIN_ID]: "0x801B15C92075D85204d1b23054407DA63cc3105B",
            [ChainId.OPTIMISM_KOVAN_CHAIN_ID]: "0x2a8725c1a9a397e2d1bA26634c8f8d62b403d968",
        },
        optimismL2BridgeAddress: {
            [ChainId.OPTIMISM_CHAIN_ID]: "0x4200000000000000000000000000000000000010",
            [ChainId.OPTIMISM_KOVAN_CHAIN_ID]: "0x4200000000000000000000000000000000000010",
        },
        perpTokenAddress: {
            // Perp token address on optimism
            [ChainId.OPTIMISM_CHAIN_ID]: "0x9e1028F5F1D5eDE59748FFceE5532509976840E0",
            // Perp token address on optimismKovan
            [ChainId.OPTIMISM_KOVAN_CHAIN_ID]: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
        },
        liquidityMiningOwner: {
            [ChainId.OPTIMISM_CHAIN_ID]: "0xDcf664d0f76E99eaA2DBD569474d0E75dC899FCD",
            [ChainId.OPTIMISM_KOVAN_CHAIN_ID]: "0xAbE2323C84edDDE78b9dEB001eea9b2b3fD3538A",
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
