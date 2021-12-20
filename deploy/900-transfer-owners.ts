import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeploymentsKey } from "../scripts/deploy/constants"
import { getTag } from "../scripts/deploy/helpers"
import { transferOwnerTo } from "../scripts/deploy/ownables"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log(`\nRunning: ${__filename}`)

    const { getNamedAccounts } = hre

    const { liquidityMiningOwner } = await getNamedAccounts()

    const perpLiquidityMining = DeploymentsKey.PerpLiquidityMining

    await transferOwnerTo(perpLiquidityMining, liquidityMiningOwner)
}
func.tags = [getTag(__filename)]

export default func
