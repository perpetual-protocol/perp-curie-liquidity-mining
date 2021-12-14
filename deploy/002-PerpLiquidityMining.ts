import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { CONTRACT_FILES, DeploymentsKey } from "../scripts/deploy/constants"
import { getTag } from "../scripts/deploy/helpers"
import { deployUpgradable } from "../scripts/deploy/upgrades"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log(`\nRunning: ${__filename}`)

    const { deployments } = hre
    const perpToken = await deployments.get(DeploymentsKey.PERP_TEST)

    const deploymentKey = DeploymentsKey.PerpLiquidityMining
    const contractFullyQualifiedName = CONTRACT_FILES[deploymentKey]
    const proxyExecute = {
        init: {
            methodName: "initialize",
            args: [perpToken.address],
        },
    }

    await deployUpgradable(deploymentKey, contractFullyQualifiedName, proxyExecute)
}

func.tags = [getTag(__filename)]

export default func
