# lushan-liquidity-mining

[![@perp/curie-liquidity-mining on npm](https://img.shields.io/npm/v/@perp/curie-liquidity-mining?style=flat-square)](https://www.npmjs.com/package/@perp/curie-liquidity-mining)

This repository contains the liquidity mining contracts for [Perpetual Protocol Reward Program](https://rewards.perp.com/).

Contract source code also published as npm packages:

- [@perp/curie-liquidity-mining](https://www.npmjs.com/package/@perp/curie-liquidity-mining) (source code)

## Local Development

You need Node.js 16+ to build. Use [nvm](https://github.com/nvm-sh/nvm) to install it.

Clone this repository, install Node.js dependencies, and build the source code:

```bash
git clone git@github.com:perpetual-protocol/perp-curie-liquidity-mining.git
npm i
npm run build
```

If the installation failed on your machine, please try a vanilla install instead:

```bash
npm run clean
rm -rf node_modules/
rm package-lock.json
npm install
npm run build
```

Run all the test cases:

```bash
npm run test
```

## Changelog

See [CHANGELOG](https://github.com/perpetual-protocol/perp-curie-liquidity-mining/blob/main/CHANGELOG.md).

## Bug Bounty Program

This repository is subject to the Perpetual Protocol v2 bug bounty program, [per the terms defined on ImmuneFi](https://immunefi.com/bounty/perpetual/).

## Grant Program

Projects, ideas and events that benefit Perpetual Protocol and its ecosystem are eligible for [grants](https://perp.com/grants)!

## Related Projects

- [voting-escrow](https://github.com/perpetual-protocol/voting-escrow)