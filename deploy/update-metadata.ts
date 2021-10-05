import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import stringify from "json-stable-stringify"
import _ from "lodash"
import { CONTRACT_FILES } from "../scripts/deploy"
import { writeFile } from "../scripts/files"

interface Metadata {
    network: string
    contracts: InternalContractMetadata
    externalContracts: ExternalContractMetadata
}

// TODO: should we add abi?
interface InternalContractMetadata {
    [deploymentsKey: string]: {
        name: string
        address: string
        createdBlockNumber: number
    }
}
interface ExternalContractMetadata {
    [deploymentsKey: string]: string
}

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log(`\nRunning: ${__filename}`)

    const metadata: Metadata = {
        network: hre.network.name,
        contracts: {},
        externalContracts: {},
    }

    // fetch the pools info
    const deployments = await hre.deployments.all()

    // assign metadata.externalContracts and contracts
    Object.keys(deployments)
        .sort((a, b) => (a < b ? 1 : 0))
        .map(key => {
            const deployment = deployments[key]
            const contractFileName = CONTRACT_FILES[key]
            const isProxy = key.endsWith("_Proxy")
            const isImplementation = key.endsWith("_Implementation")

            if (_.isEmpty(contractFileName)) {
                if (!isProxy && !isImplementation) {
                    // only external contract won't have contract file
                    metadata.externalContracts[key] = deployment.address
                }
            } else {
                metadata.contracts[key] = {
                    name: contractFileName,
                    address: deployment.address,
                    createdBlockNumber: deployment.receipt.blockNumber,
                }
            }
        })
    console.log(metadata)

    const stage = "staging" // TODO
    const metadataJson = stringify(metadata, { space: 4 })
    await writeFile(`${process.cwd()}/metadata/${stage}.json`, metadataJson)
}
func.tags = ["metadata"]

export default func
