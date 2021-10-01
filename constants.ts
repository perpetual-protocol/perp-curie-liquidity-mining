import _ from "lodash"
export const HOMESTEAD_WEB3_ENDPOINT= _.defaultTo(`${process.env["HOMESTEAD_WEB3_ENDPOINT"]}`, "")
export const HOMESTEAD_DEPLOYER_MNEMONIC= _.defaultTo(`${process.env["HOMESTEAD_DEPLOYER_MNEMONIC"]}`, "")

export const RINKEBY_DEPLOYER_MNEMONIC = _.defaultTo(`${process.env["RINKEBY_DEPLOYER_MNEMONIC"]}`, "")
export const RINKEBY_WEB3_ENDPOINT = _.defaultTo(`${process.env["RINKEBY_WEB3_ENDPOINT"]}`, "")

if (_.isEmpty(RINKEBY_DEPLOYER_MNEMONIC)) {
    console.warn("RINKEBY_MNEMONIC is empty")
}
if (_.isEmpty(RINKEBY_WEB3_ENDPOINT)) {
    console.warn("RINKEBY_WEB3_ENDPOINT is empty")
}
if (_.isEmpty(HOMESTEAD_WEB3_ENDPOINT)) {
    console.warn("HOMESTEAD_WEB3_ENDPOINT is empty")
}
if (_.isEmpty(HOMESTEAD_DEPLOYER_MNEMONIC)) {
    console.warn("HOMESTEAD_DEPLOYER_MNEMONIC is empty")
}
