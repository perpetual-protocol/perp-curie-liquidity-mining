import _ from "lodash"

export const OPTIMISM_KOVAN_WEB3_ENDPOINT = _.defaultTo(process.env["OPTIMISM_KOVAN_WEB3_ENDPOINT"], "")
export const OPTIMISM_KOVAN_DEPLOYER_MNEMONIC = _.defaultTo(process.env["OPTIMISM_KOVAN_DEPLOYER_MNEMONIC"], "")
export const OPTIMISM_WEB3_ENDPOINT = _.defaultTo(process.env["OPTIMISM_WEB3_ENDPOINT"], "")
export const OPTIMISM_DEPLOYER_MNEMONIC = _.defaultTo(process.env["OPTIMISM_DEPLOYER_MNEMONIC"], "")
export const ETHERSCAN_API_KEY = _.defaultTo(process.env["ETHERSCAN_API_KEY"], "")

if (_.isEmpty(OPTIMISM_KOVAN_DEPLOYER_MNEMONIC)) {
    console.warn("OPTIMISM_KOVAN_DEPLOYER_MNEMONIC is empty")
}
if (_.isEmpty(OPTIMISM_KOVAN_WEB3_ENDPOINT)) {
    console.warn("OPTIMISM_KOVAN_DEPLOYER_MNEMONIC is empty")
}
if (_.isEmpty(OPTIMISM_DEPLOYER_MNEMONIC)) {
    console.warn("OPTIMISM_DEPLOYER_MNEMONIC is empty")
}
if (_.isEmpty(OPTIMISM_WEB3_ENDPOINT)) {
    console.warn("OPTIMISM_WEB3_ENDPOINT is empty")
}
if (_.isEmpty(ETHERSCAN_API_KEY)) {
    console.warn("ETHERSCAN_API_KEY is empty")
}
