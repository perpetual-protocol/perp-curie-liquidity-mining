import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { CONTRACT_FILES, DeploymentsKey } from "../scripts/deploy/constants"
import { getTag } from "../scripts/deploy/helpers"
import { deployUpgradable } from "../scripts/deploy/upgrades"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log(`\nRunning: ${__filename}`)

    const { getNamedAccounts } = hre
    const { perpTokenAddress } = await getNamedAccounts()

    const deploymentKey = DeploymentsKey.TradingCompetition
    const contractFullyQualifiedName = CONTRACT_FILES[deploymentKey]
    const proxyExecute = {
        init: {
            methodName: "initialize",
            args: [perpTokenAddress],
        },
    }

    await deployUpgradable(deploymentKey, contractFullyQualifiedName, proxyExecute)
}

func.tags = [getTag(__filename)]

export default func
