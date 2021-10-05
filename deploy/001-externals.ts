import { parseUnits } from "ethers/lib/utils"
import { ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ContractFullyQualifiedName, DeploymentsKey, getTag, OZ_PROXY } from "../scripts/deploy"
import { TestERC20 } from "../typechain"
// if it's production
// import IERC20Artifact from "../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log(`\nRunning: ${__filename}`)

    const { deployments } = hre
    const deployer = await ethers.getNamedSigner("deployer")

    // prepare PERP
    if (hre.network.name === "homestead") {
        // PERP address on Mainnet : 0xbc396689893d065f41bc2c6ecbee5e0085233447
        // const perp = await ethers.getContractAt(IERC20Artifact.abi, "address")
        // await deployments.save("PERP", { abi: perp.abi, address: perp.address })
    } else if (hre.network.name === "rinkeby") {
        const perp = await deployments.deploy(DeploymentsKey.PERP_TEST, {
            from: deployer.address,
            contract: ContractFullyQualifiedName.TestERC20,
            log: true,
            proxy: {
                proxyContract: OZ_PROXY,
                execute: {
                    init: {
                        methodName: "__TestERC20_init",
                        args: ["TestPERP", "TestPERP"],
                    },
                },
            },
            gasLimit: 1000000, // sometimes estimateGas is too low, we must set a higher gasLimit manually
        })
        const testPerpFactory = await ethers.getContractFactory(ContractFullyQualifiedName.TestERC20)
        const testPerp = testPerpFactory.attach(perp.address) as TestERC20
        await (await testPerp.setMinter(deployer.address)).wait()
        console.log("Assigned TestnetDeployer as TestPERP minter")

        const decimals = await testPerp.decimals()
        const billion = parseUnits("1000000000", decimals)
        await (await testPerp.mint(deployer.address, billion)).wait()
        console.log("Executed TestPERP.mint(billion)")
    }
}
func.tags = [getTag(__filename)]

export default func
