export interface ContractNameAndDir {
    name: string
    dir: string
}

// only for slither analysis.
export const allDeployedContractsNamesAndDirs: ContractNameAndDir[] = [
    { name: "PerpLiquidityMining.sol", dir: "./contracts" },
    { name: "vePERPRewardDistributor.sol", dir: "./contracts" },
]
