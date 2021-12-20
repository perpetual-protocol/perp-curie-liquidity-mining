import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers"
import hre, { deployments, ethers } from "hardhat"
import { PerpOwnableUpgrade } from "../../typechain"
import { DeploymentsKey, ExternalDeploymentsKey } from "./constants"
import { getContract } from "./helpers"
import { execute } from "./transactions"

export async function transferOwner(deploymentKey: string): Promise<void> {
    const { deployments } = hre
    const { getNamedAccounts } = hre.network.name === "hardhat" ? hre.companionNetworks.fork : hre
    const { gnosisSafeAddress } = await getNamedAccounts()

    console.log(`Transferring owner ${deploymentKey}`)
    try {
        await deployments.read(deploymentKey, "owner")
    } catch (err) {
        if (err.message.includes(`no method named "owner" on contract`)) {
            console.log(`Skip since ${deploymentKey} is not ownable`)
            return
        } else {
            throw err
        }
    }

    const owner = await deployments.read(deploymentKey, "owner")
    console.log(`${deploymentKey}.owner() = ${owner}`)
    const candidate = await deployments.read(deploymentKey, "candidate")
    console.log(`${deploymentKey}.candidate() = ${candidate}`)
    if (owner !== gnosisSafeAddress) {
        if (candidate !== gnosisSafeAddress) {
            await execute(deploymentKey, "setOwner", [gnosisSafeAddress])
            await execute(deploymentKey, "updateOwner", [], { from: gnosisSafeAddress })
        } else {
            await execute(deploymentKey, "updateOwner", [], { from: gnosisSafeAddress })
        }
    }
}

export async function transferOwnerByImpersonating(from: SignerWithAddress, to: SignerWithAddress): Promise<void> {
    console.log("# transferOwnerByImpersonating")
    // transferProxyAdmin owner to deployer in order to upgrade
    const proxyAdminDeployment = await deployments.get(ExternalDeploymentsKey.DefaultProxyAdmin)
    const proxyAdmin = await ethers.getContractAt(proxyAdminDeployment.abi, proxyAdminDeployment.address)
    if ((await proxyAdmin.owner()) !== to.address) {
        await (await proxyAdmin.connect(from).transferOwnership(to.address)).wait()
        console.log(`- proxy admin: from ${from.address} to ${to.address}`)
    }

    for (const deploymentKey of Object.keys(DeploymentsKey)) {
        const contract = await getContract<PerpOwnableUpgrade>(deploymentKey as DeploymentsKey)
        await (await contract.connect(from).setOwner(to.address)).wait()
        await (await contract.connect(to).updateOwner()).wait()
        console.log(`- ${deploymentKey} owner: owner from ${from.address} to ${to.address}`)
    }
}

export async function transferOwnerTo(deploymentKey: string, ownerTo: string): Promise<void> {
    const { deployments } = hre

    console.log(`Transferring owner ${deploymentKey}`)
    try {
        await deployments.read(deploymentKey, "owner")
    } catch (err) {
        if (err.message.includes(`no method named "owner" on contract`)) {
            console.log(`Skip since ${deploymentKey} is not ownable`)
            return
        } else {
            throw err
        }
    }

    const owner = await deployments.read(deploymentKey, "owner")
    console.log(`${deploymentKey}.owner() = ${owner}`)
    const candidate = await deployments.read(deploymentKey, "candidate")
    console.log(`${deploymentKey}.candidate() = ${candidate}`)
    if (owner !== ownerTo) {
        if (candidate !== ownerTo) {
            await execute(deploymentKey, "setOwner", [ownerTo])
            await execute(deploymentKey, "updateOwner", [], { from: ownerTo })
        } else {
            await execute(deploymentKey, "updateOwner", [], { from: ownerTo })
        }
    }
}
