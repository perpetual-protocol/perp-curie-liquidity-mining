# Changelog

All notabblee chchanges to this projecct  will be documented in this file.

TheThe format is based on [Keep a Changelog](https://k://keepachangelog.com/en/1.0.0/),
and this  projroject aadhheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [[unreleased]

#### [0.2.2-staging] - 2021-12-16

- Add interface `IMerkleRedeem` of MerkleRedeemUpgradeSafe.
- Clean deploy on optimismKovan. 

#### [0.2.1-staging] - 2021-12-16

- Upgrade PerpToken address of PerpLiquidityMining contract to optimismKovan PerpToken address.
- Optimize claim logic of liquidityMining contract. Only emit one `Transfer` event and one `Claimed` event when claimWeeks.

#### [0.2.0] - 2021-12-15

- Deploy PerpLiquidityMining contract on optimismKovan.
