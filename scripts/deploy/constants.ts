export enum DeployConfig {
    MAX_ORDERS_PER_MARKET = 5,
    MAX_MARKETS_PER_ACCOUNT = 3,

    // default market paramters
    POOL_DEFAULT_FEE_TIER = 3000, // 0.3%
    POOL_OBSERVATION_CARDINALITY_NEXT = 500,
    FEE_RATIO = 1000, // 0.1%,
    INSURANCE_FUND_FEE_RATIO = 100000, // 10%
    MAX_TICK_CROSSED_WITHIN_BLOCK = 500, // ~5%
    // TODO:
    // SETTLEMENT_TOKEN_BALANCE_CAP = 100000000, // 100 million on staging
    SETTLEMENT_TOKEN_BALANCE_CAP = 1000000, // 1 million on production
}
export enum ContractFullyQualifiedName {
    PerpLiquidityMining = "contracts/PerpLiquidityMining.sol:PerpLiquidityMining",
    OpPerpToken = "contracts/OpPerpToken.sol:OpPerpToken",
}

export enum DeploymentsKey {
    PerpLiquidityMining = "PerpLiquidityMining",
    OpPerpToken = "OpPerpToken",
}

export const CONTRACT_FILES = {
    [DeploymentsKey.PerpLiquidityMining]: ContractFullyQualifiedName.PerpLiquidityMining,
    [DeploymentsKey.OpPerpToken]: ContractFullyQualifiedName.OpPerpToken,
}

export enum ExternalContractFullyQualifiedName {
    TestERC20 = "contracts/Test/TestERC20.sol:TestERC20", // only used in testnet
}

export enum ExternalDeploymentsKey {
    DefaultProxyAdmin = "DefaultProxyAdmin",
    OpPerpToken = "OpPerpToken",
}

// NOTE: If we change this value, we must also change saveOpenZeppelinManifest() - proxy kind
export const OZ_PROXY = "OpenZeppelinTransparentProxy"

export enum AddressCondition {
    GREATER_THAN = "GREATER_THAN",
    LESS_THAN = "LESS_THAN",
}

export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000"
