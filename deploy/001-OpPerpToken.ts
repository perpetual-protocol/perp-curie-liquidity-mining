import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { CONTRACT_FILES, DeploymentsKey } from "../scripts/deploy/constants"
import { getTag } from "../scripts/deploy/helpers"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log(`\nRunning: ${__filename}`)

    const { ethers, deployments, network, getNamedAccounts } = hre
    const deployer = await ethers.getNamedSigner("deployer")
    const { perpTokenAddress, optimismL2BridgeAddress } = await getNamedAccounts()
    const deploymentKey = DeploymentsKey.OpPerpToken

    if (network.name === "optimismKovan" || network.name === "optimism") {
        await deployments.deploy(deploymentKey, {
            from: deployer.address,
            contract: CONTRACT_FILES[deploymentKey],
            args: [optimismL2BridgeAddress, perpTokenAddress],
            log: true,
        })
    }
}
func.tags = [getTag(__filename)]

export default func
