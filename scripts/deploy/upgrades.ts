import assert from "assert"
import hre, { ethers, upgrades } from "hardhat"
import { DeployResult } from "hardhat-deploy/dist/types"
import { AddressCondition, OZ_PROXY } from "./constants"
import { getDeploymentOrNull, getProxyAdmin, increaseNonce } from "./helpers"
import { overrideOpenZeppelinManifestImplementationAddress, saveOpenZeppelinManifest } from "./validates"

export async function deployUpgradable(
    deploymentKey: string,
    contractFullyQualifiedName: string,
    proxyExecute: any,
): Promise<void> {
    const deployment = await getDeploymentOrNull(deploymentKey)
    if (!deployment) {
        console.log(`Deploying ${deploymentKey} the first time`)
        await ozValidateProxy(deploymentKey, contractFullyQualifiedName, proxyExecute)
        await deployProxy(deploymentKey, contractFullyQualifiedName, proxyExecute)
    } else {
        console.log(`Upgrading ${deploymentKey}`)
        await ozValidateUpgrade(deploymentKey, contractFullyQualifiedName)
        await prepareUpgrade(deploymentKey, contractFullyQualifiedName, proxyExecute)
    }
}

export async function deployUpgradableToken(
    deploymentKey: string,
    contractFullyQualifiedName: string,
    proxyExecute: any,
    condition: AddressCondition,
    targetAddr: string,
): Promise<void> {
    const { deployments } = hre

    const deployment = await getDeploymentOrNull(deploymentKey)
    if (!deployment) {
        console.log(`Deploying ${deploymentKey} the first time`)
        await ozValidateProxy(deploymentKey, contractFullyQualifiedName, proxyExecute)
        await increaseNonce(condition, targetAddr) // increase nonce for B0Q1
        await deployProxy(deploymentKey, contractFullyQualifiedName, proxyExecute)
    } else {
        console.log(`Upgrading ${deploymentKey}`)
        await ozValidateUpgrade(deploymentKey, contractFullyQualifiedName)
        await prepareUpgrade(deploymentKey, contractFullyQualifiedName, proxyExecute)
    }

    console.log(`Validating token address`)
    const proxyAddress = (await deployments.get(deploymentKey)).address.toLowerCase()
    if (condition == AddressCondition.GREATER_THAN) {
        assert.strictEqual(proxyAddress > targetAddr.toLowerCase(), true)
    } else if (condition == AddressCondition.LESS_THAN) {
        assert.strictEqual(proxyAddress < targetAddr.toLowerCase(), true)
    }
}

async function deployProxy(
    deploymentKey: string,
    contractFullyQualifiedName: string,
    proxyExecute: any,
): Promise<void> {
    await deploy(deploymentKey, contractFullyQualifiedName, proxyExecute)
    await initializeImplementation(deploymentKey, proxyExecute)
    await saveOpenZeppelinManifest(deploymentKey)
}

async function prepareUpgrade(
    deploymentKey: string,
    contractFullyQualifiedName: string,
    proxyExecute: any,
): Promise<void> {
    const { deployments } = hre
    const { catchUnknownSigner } = deployments

    await catchUnknownSigner(deploy(deploymentKey, contractFullyQualifiedName, proxyExecute))
    await initializeImplementation(deploymentKey, proxyExecute)
    await saveOpenZeppelinManifest(deploymentKey)
    await proposeUpgrade(deploymentKey)
}

// validate proxy contract by oz framework
// oz doesn't export upgradeable validation functions, those are embedded in the deployment script
// we call `deployProxy` here for validation only
// the metadata under .openzeppelin will be overwritten later by `saveOpenZeppelinManifest`
async function ozValidateProxy(
    deploymentKey: string,
    contractFullyQualifiedName: string,
    proxyExecute: any,
): Promise<void> {
    console.log(`Validating proxy ${deploymentKey}`)
    const contractFactory = await ethers.getContractFactory(contractFullyQualifiedName)
    const contract = await upgrades.deployProxy(contractFactory, proxyExecute.init.args, {
        initializer: proxyExecute.init.methodName,
        kind: "transparent",
    })
    await contract.deployed()
}

// validate implementation contract by oz framework
// oz doesn't export upgradeable validation functions, those are embedded in the deployment script
// we call `prepareUpgrade` here for validation only
// the metadata under .openzeppelin will be overwritten later by `saveOpenZeppelinManifest`
async function ozValidateUpgrade(deploymentKey: string, contractFullyQualifiedName: string): Promise<void> {
    const { deployments } = hre

    console.log(`Validating upgrade ${deploymentKey}`)

    await overrideOpenZeppelinManifestImplementationAddress(deploymentKey)

    const proxy = await deployments.get(deploymentKey)
    const contractFactory = await ethers.getContractFactory(contractFullyQualifiedName)
    await upgrades.prepareUpgrade(proxy.address, contractFactory)
}

async function proposeUpgrade(deploymentKey: string): Promise<void> {
    const { deployments, getNamedAccounts } = hre
    const { gnosisSafeAddress } = await getNamedAccounts()

    const proxy = await deployments.get(deploymentKey)
    const proxyAdmin = await getProxyAdmin()

    const actualImplementation = await proxyAdmin.getProxyImplementation(proxy.address)
    const latestImplementation = (await deployments.get(`${deploymentKey}_Implementation`)).address
    if (actualImplementation !== latestImplementation) {
        let txData: string
        try {
            // We don't and can't execute this transaction, instead, we only need the transaction data.
            await proxyAdmin.upgrade(proxy.address, latestImplementation)
        } catch (err) {
            txData = err.transaction.data
        }

        console.log(`
        ---------------------------------------------------------------------------------------
        Please execute the following transaction on Gnosis to upgrade ${deploymentKey} Proxy:

        from: ${gnosisSafeAddress} (Gnosis Safe)
        to: ${proxyAdmin.address} (ProxyAdmin)
        data: ${txData}

        Re-run the deploy script after the transaction is confirmed.
        ---------------------------------------------------------------------------------------
        `)
        process.exit(0)
    }
}

async function deploy(
    deploymentKey: string,
    contractFullyQualifiedName: string,
    proxyExecute: any,
): Promise<DeployResult> {
    const { deployments, getNamedAccounts } = hre
    const deployer = await ethers.getNamedSigner("deployer")
    const { gnosisSafeAddress } = await getNamedAccounts()

    // NOTE: No await here since we might want to execute this with catchUnknownSigner()
    const deployPromise = deployments.deploy(deploymentKey, {
        from: deployer.address,
        contract: contractFullyQualifiedName,
        log: true,
        proxy: {
            // NOTE: It will set ProxyAdmin.owner to gnosisSafeAddress right after ProxyAdmin is deployed.
            owner: gnosisSafeAddress, // ProxyAdmin.owner
            proxyContract: OZ_PROXY,
            viaAdminContract: "DefaultProxyAdmin",
            execute: proxyExecute,
        },
        // gasLimit: 87000000, // sometimes estimateGas is too low, we might need to set a higher gasLimit
    })

    return deployPromise
}

// call initialize() on Implementation contract to make sure its owner is deployer
async function initializeImplementation(deploymentKey: string, proxyExecute: any): Promise<void> {
    const { deployments } = hre
    const deployer = await ethers.getNamedSigner("deployer")

    const implementationDeploymentKey = `${deploymentKey}_Implementation`
    try {
        console.log(`Initializing ${implementationDeploymentKey}`)
        await deployments.execute(
            implementationDeploymentKey,
            {
                from: deployer.address,
                log: true,
            },
            proxyExecute.init.methodName,
            ...proxyExecute.init.args,
        )
    } catch (err) {
        // TODO
        // if (String(err).includes("contract is already initialized")) {
        if (err.error.message.includes("execution reverted: Initializable: contract is already initialized")) {
            console.log(`Initialized ${implementationDeploymentKey}`)
        } else {
            throw err
        }
    }
}
