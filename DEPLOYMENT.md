# Deployment

1. Add required network settings or external addresses to `hardhat.config.ts`

```ts
const config: HardhatUserConfig = {
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true,
        },
        optimismKovan: {
            chainId: ChainId.OPTIMISM_KOVAN_CHAIN_ID,
            url: OPTIMISM_KOVAN_WEB3_ENDPOINT,
            accounts: {
                mnemonic: OPTIMISM_KOVAN_DEPLOYER_MNEMONIC,
            },
        },
    },
    namedAccounts: {
        optimismL2BridgeAddress: {
            [ChainId.OPTIMISM_KOVAN_CHAIN_ID]: "0x",
        },
        perpTokenAddress: {
            [ChainId.OPTIMISM_KOVAN_CHAIN_ID]: "0x",
        },
    },
}
```

2. Deploy contracts

```bash
export OPTIMISM_KOVAN_WEB3_ENDPOINT="YOUR_RPC_ENDPOINT"
export OPTIMISM_KOVAN_DEPLOYER_MNEMONIC="YOUR_MNEMONIC"

# deploy and WILL reuse existing contracts
npm run deploy:optimismKovan

# only run the specific deployment script
npm run deploy:optimismKovan -- --tags PerpLiquidityMining
```

3. **Manually execute transactions if you see the following message during deploying**

```bash
---------------------------------------------------------------------------------------
No signer for MULTISIG_WALLET_ADDRESS
Please execute the following:

from: MULTISIG_WALLET_ADDRESS
to: PROXYADMIN_ADDRESS
method: upgrade
args:
  - PROXY_ADDRESS
  - NEW_IMPLEMENTATION_ADDRESS

(raw data: 0xabc123456789)
---------------------------------------------------------------------------------------
```

4. Update CHANGELOG.md

5. Update `version` of `package.json` and `package-lock.json`

6. Verify contracts on Etherscan
   - run `export ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY`
   - run `npm run etherscan:optimismKovan -- [--contract contractName]`

7. Verify what's included in the packed npm package

```bash
npm pack
```

9. Publish npm package

```bash
# push tag to trigger "Publish NPM package" workflow
git tag vX.X.X
git push origin --tags

# create GitHub release
gh release create vX.X.X -t "vX.X.X" -F CHANGELOG.md
```
