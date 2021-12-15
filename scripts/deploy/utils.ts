import { Manifest } from "@openzeppelin/upgrades-core"
import hre, { ethers } from "hardhat"
import { Deployment } from "hardhat-deploy/types"

export async function copyDeployments(deployments: { [name: string]: Deployment }) {
    for (const [name, deployment] of Object.entries(deployments)) {
        await hre.deployments.save(name, deployment)
    }
}

export async function copyManiFest(targetChainId: string) {
    const targetManiFest = new Manifest(parseInt(targetChainId))
    const targetManiFestData = await targetManiFest.read()
    const hardhatChainId = await hre.getChainId()
    const manifest = new Manifest(parseInt(hardhatChainId))

    await manifest.lockedRun(async () => {
        await manifest.write(targetManiFestData)
    })
}

export async function impersonate(address: string) {
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [address],
    })

    return await ethers.getSigner(address)
}
