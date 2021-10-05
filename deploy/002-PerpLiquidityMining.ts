import { ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { CONTRACT_FILES, DeploymentsKey, getTag, OZ_PROXY } from "../scripts/deploy"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log(`\nRunning: ${__filename}`)

  const { deployments } = hre
  const deployer = await ethers.getNamedSigner("deployer")
  const perpToken = await deployments.get(DeploymentsKey.PERP_TEST)
  const deploymentKey = DeploymentsKey.PerpLiquidityMining

  await deployments.deploy(deploymentKey, {
      from: deployer.address,
      contract: CONTRACT_FILES[deploymentKey],
      log: true,
      proxy: {
          proxyContract: OZ_PROXY,
          owner: deployer.address,
          viaAdminContract: "DefaultProxyAdmin",
          execute: {
              init: {
                  methodName: "initialize",
                  args: [perpToken.address],
              },
          },
      },
  })
}

func.tags = [getTag(__filename)]

export default func