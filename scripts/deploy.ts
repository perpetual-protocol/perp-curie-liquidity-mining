import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers"
import { ethers } from "hardhat"
import { DeploymentsExtension, DeployResult } from "hardhat-deploy/types"
import path from "path"

export enum ContractFullyQualifiedName {
    PerpLiquidityMining = "contracts/PerpLiquidityMining.sol:PerpLiquidityMining",

    // only used in testnet
    TestERC20 = "contracts/Test/TestERC20.sol:TestERC20",
}

export enum DeploymentsKey {
    PerpLiquidityMining = "PerpLiquidityMining",

    // external
    PERP_TEST = "PERP_TEST",
}

export const OZ_PROXY = "OpenZeppelinTransparentProxy"

export const CONTRACT_FILES = {
    [DeploymentsKey.PerpLiquidityMining]: ContractFullyQualifiedName.PerpLiquidityMining,
}

// eg. filename "07-Pool-vETHvUSD" would generate a tag named: Pool-vETHvUSD
export function getTag(fullPath: string): string {
    const filename = path.parse(fullPath).name
    const start = filename.indexOf("-")
    const tag = filename.substr(start + 1)
    return tag
}

export enum AddressCondition {
    GREATER_THAN = "GREATER_THAN",
    LESS_THAN = "LESS_THAN",
}

export async function deployToken(
    condition: AddressCondition,
    targetAddr: string,
    deployments: DeploymentsExtension,
    deploymentKey: string,
    deployOptions: any,
    deployer: SignerWithAddress,
): Promise<DeployResult> {
    try {
        // If there is no error when getting the contract,
        // that means the proxy contract is already deployed and its address is in the right condition.
        // So we can deploy the implementation contract in the normal way.
        await deployments.get(deploymentKey)
        const deployResult = await deployments.deploy(deploymentKey, deployOptions)
        return deployResult
    } catch (e) {
        // Deploy contract the first time, do the following process:
    }

    // We use deployer's address and nonce to compute a contract's address which deployed with that nonce,
    // to find the nonce that matches the condition
    let nonce = await deployer.getTransactionCount()
    console.log(`Next nonce: ${nonce}`)

    let computedAddress = "0x0"
    let count = 0
    while (
        count < 2 ||
        (condition == AddressCondition.GREATER_THAN
            ? computedAddress.toLowerCase() <= targetAddr.toLowerCase()
            : computedAddress.toLowerCase() >= targetAddr.toLowerCase())
    ) {
        // Increase the nonce until we find a contract address that matches the condition
        computedAddress = ethers.utils.getContractAddress({
            from: deployer.address,
            nonce: nonce,
        })
        console.log(`Computed address: ${nonce}, ${computedAddress}`)
        nonce += 1
        count += 1
    }

    // When deploying a upgradable contract,
    // it will deploy the implementation contract first, then deploy the proxy
    // so we need to increase the nonce to "the expected nonce - 1"
    let nextNonce = await deployer.getTransactionCount()
    for (let i = 0; i < count - 1 - 1; i++) {
        nextNonce += 1
        console.log(`Increasing nonce to ${nextNonce}`)
        const tx = await deployer.sendTransaction({
            to: deployer.address,
            value: ethers.utils.parseEther("0"),
        })
        await tx.wait()
    }

    const deployResult = await deployments.deploy(deploymentKey, deployOptions)
    console.log(`Proxy address: ${deployResult.address}`)

    return deployResult
}

export async function getContract<T>(deployments: DeploymentsExtension, deploymentKey: DeploymentsKey): Promise<T> {
    const deployment = await deployments.get(deploymentKey)
    const contractFactory = await ethers.getContractFactory(CONTRACT_FILES[deploymentKey])
    const contract = contractFactory.attach(deployment.address) as unknown as T
    return contract
}
