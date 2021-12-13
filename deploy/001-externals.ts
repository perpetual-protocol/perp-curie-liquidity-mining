import { parseUnits } from "ethers/lib/utils"
import { ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import TestERC20 from "../artifacts/contracts/Test/TestERC20.sol/TestERC20.json"
import { ExternalContractFullyQualifiedName, ExternalDeploymentsKey } from "../scripts/deploy/constants"
import { getTag, getTestUsdc } from "../scripts/deploy/helpers"
import { deployUpgradable } from "../scripts/deploy/upgrades"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log(`\nRunning: ${__filename}`)

    const { deployments } = hre
    const { getNamedAccounts } = hre.network.name === "hardhat" ? hre.companionNetworks.fork : hre
    const deployer = await ethers.getNamedSigner("deployer")
    const { usdc } = await getNamedAccounts()

    // prepare USDC
    const deploymentKey = ExternalDeploymentsKey.USDC
    if (hre.network.name === "optimism") {
        await deployments.save(deploymentKey, { abi: TestERC20.abi, address: usdc })
        console.log(`Saved USDC: ${usdc}`)
    } else if (hre.network.name === "optimismKovan" || hre.network.name === "hardhat") {
        const contractFullyQualifiedName = ExternalContractFullyQualifiedName.TestERC20
        const proxyExecute = {
            init: {
                methodName: "__TestERC20_init",
                args: ["TestUSDC", "TestUSDC", 6],
            },
        }
        await deployUpgradable(deploymentKey, contractFullyQualifiedName, proxyExecute)

        const testUsdc = await getTestUsdc()

        const minterRole = await testUsdc.MINTER_ROLE()
        const decimals = await testUsdc.decimals()
        const billion = parseUnits("1000000000", decimals)
        if (!(await testUsdc.hasRole(minterRole, deployer.address))) {
            console.log(`Executing testUsdc.setMinter(${deployer.address})`)
            await (await testUsdc.setMinter(deployer.address)).wait()
            console.log(`Executed testUsdc.setMinter(${deployer.address})`)
        }
        console.log(`Executing testUsdc.mint(${deployer.address}, ${billion})`)
        await (await testUsdc.mint(deployer.address, billion)).wait()
        console.log(`Executed testUsdc.mint(${deployer.address}, ${billion})`)
    }
}
func.tags = [getTag(__filename)]

export default func
