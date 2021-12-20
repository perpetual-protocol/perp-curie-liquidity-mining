import hre from "hardhat"
import { TxOptions } from "hardhat-deploy/types"

export async function execute(
    deploymentKey: string,
    methodName: string,
    args: any[],
    txOptions?: TxOptions,
): Promise<void> {
    const { deployments } = hre
    const { catchUnknownSigner } = deployments

    const owner = await deployments.read(deploymentKey, "owner")
    console.log(`execute ${deploymentKey}.${methodName}(${args})`)

    const mergedTxOptions = {
        ...{
            from: owner,
            log: true,
        },
        ...txOptions,
    }

    await catchUnknownSigner(deployments.execute(deploymentKey, mergedTxOptions, methodName, ...args))
}
