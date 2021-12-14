import { parseUnits } from "ethers/lib/utils"
import { ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import TestERC20 from "../artifacts/contracts/Test/TestERC20.sol/TestERC20.json"
import { ExternalContractFullyQualifiedName, ExternalDeploymentsKey } from "../scripts/deploy/constants"
import { getTag, getTestPerp } from "../scripts/deploy/helpers"
import { deployUpgradable } from "../scripts/deploy/upgrades"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log(`\nRunning: ${__filename}`)

    const { deployments } = hre
    const { getNamedAccounts } = hre.network.name === "hardhat" ? hre.companionNetworks.fork : hre
    const deployer = await ethers.getNamedSigner("deployer")
    const { usdc } = await getNamedAccounts()

    // prepare PERP
    const deploymentKey = ExternalDeploymentsKey.PERP
    if (hre.network.name === "optimism") {
        await deployments.save(deploymentKey, { abi: TestERC20.abi, address: usdc })
        console.log(`Saved perp: ${usdc}`)
    } else if (hre.network.name === "optimismKovan" || hre.network.name === "hardhat") {
        const contractFullyQualifiedName = ExternalContractFullyQualifiedName.TestERC20
        const proxyExecute = {
            init: {
                methodName: "__TestERC20_init",
                args: ["TestPERP", "TestPERP", 6],
            },
        }
        await deployUpgradable(deploymentKey, contractFullyQualifiedName, proxyExecute)

        const testPerp = await getTestPerp()

        const minterRole = await testPerp.MINTER_ROLE()
        const decimals = await testPerp.decimals()
        const billion = parseUnits("1000000000", decimals)
        if (!(await testPerp.hasRole(minterRole, deployer.address))) {
            console.log(`Executing testPerp.setMinter(${deployer.address})`)
            await (await testPerp.setMinter(deployer.address)).wait()
            console.log(`Executed testPerp.setMinter(${deployer.address})`)
        }
        console.log(`Executing testPerp.mint(${deployer.address}, ${billion})`)
        await (await testPerp.mint(deployer.address, billion)).wait()
        console.log(`Executed testPerp.mint(${deployer.address}, ${billion})`)
    }
}
func.tags = [getTag(__filename)]

export default func
