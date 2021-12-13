import { readValidations } from "@openzeppelin/hardhat-upgrades/dist/utils/validations"
import { getStorageLayout, getUnlinkedBytecode, getVersion, Manifest } from "@openzeppelin/upgrades-core"
import hre from "hardhat"

// copy from https://github.com/wighawag/hardhat-deploy/pull/162
export async function saveOpenZeppelinManifest(deploymentKey: string): Promise<void> {
    const { deployments, network } = hre

    const proxy = await deployments.get(deploymentKey)
    const implementation = await deployments.get(`${deploymentKey}_Implementation`)

    const { version, validations } = await getVersionAndValidations(implementation)

    const manifest = await Manifest.forNetwork(network.provider)
    await manifest.addProxy({
        address: proxy.address,
        txHash: proxy.transactionHash,
        kind: "transparent",
    })
    await manifest.lockedRun(async () => {
        const manifestData = await manifest.read()
        const layout = getStorageLayout(validations, version)
        manifestData.impls[version.linkedWithoutMetadata] = {
            address: implementation.address,
            txHash: implementation.transactionHash,
            layout,
        }
        await manifest.write(manifestData)
    })
}

export async function overrideOpenZeppelinManifestImplementationAddress(deploymentKey: string): Promise<void> {
    const { deployments, network } = hre

    const oldImplementation = await deployments.get(`${deploymentKey}_Implementation`)

    const { version } = await getVersionAndValidations(oldImplementation)

    const manifest = await Manifest.forNetwork(network.provider)
    await manifest.lockedRun(async () => {
        const manifestData = await manifest.read()
        // HACK: version.linkedWithoutMetadata is generated from bytecode,
        // so it will conflict if we deploy multiple instances from the same contract file,
        // for instance, BaseToken -> vETH and vBTC.
        // We set the implementation address to the correct one
        // before calling upgrades.prepareUpgrade()
        manifestData.impls[version.linkedWithoutMetadata].address = oldImplementation.address
        manifestData.impls[version.linkedWithoutMetadata].txHash = oldImplementation.transactionHash
        await manifest.write(manifestData)
    })
}

const getVersionAndValidations = async (implementation: { bytecode?: string }) => {
    if (implementation.bytecode === undefined) throw Error("No bytecode for implementation")

    const validations = await readValidations(hre)
    const unlinkedBytecode = getUnlinkedBytecode(validations, implementation.bytecode)
    const version = getVersion(unlinkedBytecode, implementation.bytecode)

    return {
        version,
        validations,
    }
}
