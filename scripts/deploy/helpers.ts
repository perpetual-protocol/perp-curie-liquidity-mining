import hre, { ethers } from "hardhat"
import { Deployment } from "hardhat-deploy/types"
import path from "path"
import { TestERC20 } from "../../typechain"
import { ProxyAdmin } from "../../typechain/openzeppelin/ProxyAdmin"
import {
    AddressCondition,
    CONTRACT_FILES,
    DeploymentsKey,
    ExternalContractFullyQualifiedName,
    ExternalDeploymentsKey,
} from "./constants"

export async function getDeploymentOrNull(deploymentKey: string): Promise<Deployment> {
    const { deployments } = hre

    try {
        return await deployments.get(deploymentKey)
    } catch (e) {
        if (!e.message.includes("No deployment found for")) {
            throw e
        }
    }
    return null
}

export async function getContract<T>(deploymentKey: DeploymentsKey): Promise<T> {
    const { deployments } = hre

    const deployment = await deployments.get(deploymentKey)
    const contractFactory = await ethers.getContractFactory(CONTRACT_FILES[deploymentKey])
    const contract = contractFactory.attach(deployment.address) as unknown as T
    return contract
}

export async function getProxyAdmin(): Promise<ProxyAdmin> {
    const { deployments } = hre

    const deployment = await deployments.get(ExternalDeploymentsKey.DefaultProxyAdmin)
    const contractFactory = await ethers.getContractFactory(deployment.abi, deployment.bytecode)
    return contractFactory.attach(deployment.address) as ProxyAdmin
}

export async function getTestUsdc(): Promise<TestERC20> {
    const { deployments } = hre

    const deployment = await deployments.get(ExternalDeploymentsKey.USDC)
    const contractFactory = await ethers.getContractFactory(ExternalContractFullyQualifiedName.TestERC20)
    return contractFactory.attach(deployment.address) as TestERC20
}

export async function increaseNonce(condition: AddressCondition, targetAddr: string): Promise<void> {
    const deployer = await ethers.getNamedSigner("deployer")

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

    console.log(`Finalized nonce`)
}

// eg. filename "07-Pool-vETHvUSD" would generate a tag named: Pool-vETHvUSD
export function getTag(fullPath: string): string {
    const filename = path.parse(fullPath).name
    const start = filename.indexOf("-")
    const tag = filename.substr(start + 1)
    return tag
}
