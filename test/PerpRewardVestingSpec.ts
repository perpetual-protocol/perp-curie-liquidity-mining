
import { parseEther } from "@ethersproject/units"
import BN from "bn.js"
import { expect, use } from "chai"
import { ethers, waffle } from "hardhat"

import { PerpLiquidityMining } from "../typechain"
import { ERC20PresetMinterPauser } from "../typechain/openzeppelin"
import { TestPerpLiquidityMining } from "../typechain/TestPerpLiquidityMining"

describe("liquidity mining", () => {
    const RANDOM_BYTES32_1 = "0x7c1b1e7c2eaddafdf52250cba9679e5b30014a9d86a0e2af17ec4cee24a5fc80"
    const RANDOM_BYTES32_2 = "0xb6801f31f93d990dfe65d67d3479c3853d5fafd7a7f2b8fad9e68084d8d409e0"
    const RANDOM_BYTES32_3 = "0x43bd90E4CC93D6E40580507102Cc7B1Bc8A25284a7f2b8fad9e68084d8d409e0"

    const [admin, alice, bob] = waffle.provider.getWallets()
    let token: ERC20PresetMinterPauser
    let perpLiquidityMining: TestPerpLiquidityMining

    beforeEach(async () => {
        const tokenFactory = await ethers.getContractFactory("ERC20PresetMinterPauser")
        token = (await tokenFactory.deploy("name", "symbol")) as ERC20PresetMinterPauser
        token.mint(admin.address, parseEther("1000000"))

        const perpLiquidityMiningFactory = await ethers.getContractFactory("TestPerpLiquidityMining")
        perpLiquidityMining = (await perpLiquidityMiningFactory.deploy()) as TestPerpLiquidityMining
        await perpLiquidityMining.initialize(token.address)

        await token.connect(admin).approve(perpLiquidityMining.address, parseEther("1000000"))
    })

    describe("seedAllocations()", () => {
        it("verify balances after seeding", async () => {
            await perpLiquidityMining.seedAllocations(1, RANDOM_BYTES32_1, parseEther("500000"))

            expect(await token.balanceOf(admin.address)).to.eq(parseEther("500000"))
            expect(await token.balanceOf(perpLiquidityMining.address)).to.eq(parseEther("500000"))
            expect(await perpLiquidityMining.weekMerkleRoots(1)).to.eq(RANDOM_BYTES32_1)
            expect(await perpLiquidityMining.merkleRootIndexes(0)).to.eq(1)
        })
    })

    describe("claimWeek()", () => {
        beforeEach(async () => {
            await perpLiquidityMining.seedAllocations(1, RANDOM_BYTES32_1, parseEther("500000"))
        })
        it("alice claims her own share", async () => {
            await perpLiquidityMining.connect(alice).claimWeek(alice.address, 1, parseEther("200000"), [RANDOM_BYTES32_1])

            expect(await token.balanceOf(alice.address)).to.eq(parseEther("200000"))
            expect(await token.balanceOf(perpLiquidityMining.address)).to.eq(parseEther("300000"))
            expect(await perpLiquidityMining.claimed(1, alice.address)).to.eq(true)
        })

        it("admin claims alice's share", async () => {
            await perpLiquidityMining.connect(admin).claimWeek(alice.address, 1, parseEther("200000"), [RANDOM_BYTES32_1])

            expect(await token.balanceOf(alice.address)).to.eq(parseEther("200000"))
            expect(await token.balanceOf(perpLiquidityMining.address)).to.eq(parseEther("300000"))
            expect(await perpLiquidityMining.claimed(1, alice.address)).to.eq(true)
        })

        it("alice & bob both claim their shares", async () => {
            await perpLiquidityMining.connect(alice).claimWeek(alice.address, 1, parseEther("200000"), [RANDOM_BYTES32_1])
            await perpLiquidityMining.connect(bob).claimWeek(bob.address, 1, parseEther("300000"), [RANDOM_BYTES32_1])

            expect(await token.balanceOf(alice.address)).to.eq(parseEther("200000"))
            expect(await token.balanceOf(bob.address)).to.eq(parseEther("300000"))
            expect(await token.balanceOf(perpLiquidityMining.address)).to.eq(parseEther("0"))
            expect(await perpLiquidityMining.claimed(1, alice.address)).to.eq(true)
            expect(await perpLiquidityMining.claimed(1, bob.address)).to.eq(true)
        })

        it("there are three allocations and alice claims two of them", async () => {
            await perpLiquidityMining.seedAllocations(3, RANDOM_BYTES32_2, parseEther("200000"))
            await perpLiquidityMining.seedAllocations(5, RANDOM_BYTES32_3, parseEther("300000"))

            await perpLiquidityMining.connect(alice).claimWeek(alice.address, 1, parseEther("500000"), [RANDOM_BYTES32_1])
            await perpLiquidityMining.connect(alice).claimWeek(alice.address, 5, parseEther("300000"), [RANDOM_BYTES32_3])
            expect(await token.balanceOf(alice.address)).to.eq(parseEther("800000"))
            expect(await perpLiquidityMining.claimed(3, alice.address)).to.eq(false)

            await perpLiquidityMining.connect(alice).claimWeek(alice.address, 3, parseEther("200000"), [RANDOM_BYTES32_2])
            expect(await token.balanceOf(alice.address)).to.eq(parseEther("1000000"))
        })

        it("force error, invalid claim, input week is invalid", async () => {
            await expect(perpLiquidityMining.connect(alice).claimWeek(alice.address, 0, parseEther("500000"), [RANDOM_BYTES32_1])).to.revertedWith("Invalid claim")
        })


        it("force error, claiming twice", async () => {
            await perpLiquidityMining.connect(alice).claimWeek(alice.address, 1, parseEther("500000"), [RANDOM_BYTES32_1])
            await expect( 
                perpLiquidityMining.connect(alice).claimWeek(alice.address, 1, parseEther("500000"), [RANDOM_BYTES32_1])).to.revertedWith(
                    "Claimed already",
            )
        })

        // we do not verify if the claimed amount is valid or not; we suppose this is verified by MerkleRedeemUpgradeSafe.sol
        it.skip("force error, claimed amount larger than the available quota", async () => {})
    })

    // describe("claimWeeks()", () => {
    //     // when testing claimWeeks(), input all inputs as strings s.t. Claims[] will not cause error
    //     it("alice claims her two shares", async () => {
    //         await perpLiquidityMining.seedAllocations(new BN(2), RANDOM_BYTES32_1, parseEther(500000), { from: admin })
    //         await forwardBlockTimestamp(30)

    //         await perpLiquidityMining.seedAllocations(new BN(7), RANDOM_BYTES32_2, parseEther(1000000), { from: admin })
    //         await forwardBlockTimestamp(Number(vestingPeriod))

    //         const claimsArr = [
    //             {
    //                 week: "2",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_1],
    //             },
    //             {
    //                 week: "7",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_2],
    //             },
    //         ]

    //         await perpLiquidityMining.claimWeeks(alice.address, claimsArr, { from: alice })
    //         expect(await token.balanceOf(alice.address)).to.eq(parseEther(200000))
    //         expect(await token.balanceOf(perpLiquidityMining.address)).to.eq(parseEther(1300000))
    //         expect(await perpLiquidityMining.claimed("2", alice.address)).to.eq(true)
    //         expect(await perpLiquidityMining.claimed("7", alice.address)).to.eq(true)
    //     })

    //     it("admin claims alice's two shares", async () => {
    //         await perpLiquidityMining.seedAllocations(new BN(2), RANDOM_BYTES32_1, parseEther(500000), { from: admin })
    //         await forwardBlockTimestamp(30)

    //         await perpLiquidityMining.seedAllocations(new BN(7), RANDOM_BYTES32_2, parseEther(1000000), { from: admin })
    //         await forwardBlockTimestamp(Number(vestingPeriod))

    //         const claimsArr = [
    //             {
    //                 week: "2",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_1],
    //             },
    //             {
    //                 week: "7",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_2],
    //             },
    //         ]

    //         await perpLiquidityMining.claimWeeks(alice.address, claimsArr, { from: admin })
    //         expect(await token.balanceOf(alice.address)).to.eq(parseEther(200000))
    //         expect(await perpLiquidityMining.claimed("2", alice.address)).to.eq(true)
    //         expect(await perpLiquidityMining.claimed("7", alice.address)).to.eq(true)
    //     })

    //     it("alice & bob both claim their three shares", async () => {
    //         await perpLiquidityMining.seedAllocations(new BN(2), RANDOM_BYTES32_1, parseEther(500000), { from: admin })
    //         await forwardBlockTimestamp(30)

    //         await perpLiquidityMining.seedAllocations(new BN(5), RANDOM_BYTES32_2, parseEther(500000), { from: admin })
    //         await forwardBlockTimestamp(30)

    //         await perpLiquidityMining.seedAllocations(new BN(7), RANDOM_BYTES32_3, parseEther(1000000), { from: admin })
    //         await forwardBlockTimestamp(Number(vestingPeriod))

    //         const claimsArr = [
    //             {
    //                 week: "2",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_1],
    //             },
    //             {
    //                 week: "5",
    //                 balance: toFullDigitStr(150000),
    //                 merkleProof: [RANDOM_BYTES32_2],
    //             },
    //             {
    //                 week: "7",
    //                 balance: toFullDigitStr(200000),
    //                 merkleProof: [RANDOM_BYTES32_3],
    //             },
    //         ]

    //         await perpLiquidityMining.claimWeeks(alice.address, claimsArr, { from: alice })
    //         await perpLiquidityMining.claimWeeks(bob, claimsArr, { from: bob })
    //         expect(await token.balanceOf(alice.address)).to.eq(parseEther(450000))
    //         expect(await token.balanceOf(bob.address)).to.eq(parseEther(450000))
    //         expect(await token.balanceOf(perpLiquidityMining.address)).to.eq(parseEther(1100000))
    //     })

    //     it("alice & bob both claim two of their three shares", async () => {
    //         await perpLiquidityMining.seedAllocations(new BN(2), RANDOM_BYTES32_1, parseEther(500000), { from: admin })
    //         await forwardBlockTimestamp(30)

    //         await perpLiquidityMining.seedAllocations(new BN(5), RANDOM_BYTES32_1, parseEther(500000), { from: admin })
    //         await forwardBlockTimestamp(30)

    //         await perpLiquidityMining.seedAllocations(new BN(7), RANDOM_BYTES32_3, parseEther(1000000), { from: admin })
    //         await forwardBlockTimestamp(Number(vestingPeriod))

    //         const aliceClaimsArr = [
    //             {
    //                 week: "2",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_1],
    //             },
    //             {
    //                 week: "5",
    //                 balance: toFullDigitStr(150000),
    //                 merkleProof: [RANDOM_BYTES32_2],
    //             },
    //         ]

    //         const bobClaimsArr = [
    //             {
    //                 week: "2",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_1],
    //             },
    //             {
    //                 week: "7",
    //                 balance: toFullDigitStr(200000),
    //                 merkleProof: [RANDOM_BYTES32_3],
    //             },
    //         ]

    //         await perpLiquidityMining.claimWeeks(alice.address, aliceClaimsArr, { from: alice })
    //         await perpLiquidityMining.claimWeeks(bob, bobClaimsArr, { from: bob })
    //         expect(await token.balanceOf(alice.address)).to.eq(parseEther(250000))
    //         expect(await token.balanceOf(bob.address)).to.eq(parseEther(300000))
    //         expect(await token.balanceOf(perpLiquidityMining.address)).to.eq(parseEther(1450000))
    //         expect(await perpLiquidityMining.claimed("7", alice.address)).to.eq(false)
    //         expect(await perpLiquidityMining.claimed("5", bob.address)).to.eq(false)
    //     })

    //     it("force error, alice has two shares and both are not yet available", async () => {
    //         await perpLiquidityMining.seedAllocations(new BN(2), RANDOM_BYTES32_1, parseEther(1000000), { from: admin })
    //         await forwardBlockTimestamp(60)

    //         await perpLiquidityMining.seedAllocations(new BN(7), RANDOM_BYTES32_2, parseEther(1000000), { from: admin })
    //         await forwardBlockTimestamp(60)

    //         const claimsArr = [
    //             {
    //                 week: "2",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_1],
    //             },
    //             {
    //                 week: "7",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_2],
    //             },
    //         ]

    //         await expectRevert(perpLiquidityMining.claimWeeks(alice.address, claimsArr, { from: alice }), "Invalid claim")
    //     })

    //     it("force error, alice has three shares and the latest one is not yet available", async () => {
    //         await perpLiquidityMining.seedAllocations(new BN(2), RANDOM_BYTES32_1, parseEther(500000), { from: admin })
    //         await forwardBlockTimestamp(30)

    //         await perpLiquidityMining.seedAllocations(new BN(5), RANDOM_BYTES32_2, parseEther(500000), { from: admin })
    //         await forwardBlockTimestamp(Number(vestingPeriod))

    //         await perpLiquidityMining.seedAllocations(new BN(7), RANDOM_BYTES32_3, parseEther(1000000), { from: admin })
    //         await forwardBlockTimestamp(30)

    //         const claimsArr = [
    //             {
    //                 week: "2",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_1],
    //             },
    //             {
    //                 week: "5",
    //                 balance: toFullDigitStr(150000),
    //                 merkleProof: [RANDOM_BYTES32_2],
    //             },
    //             {
    //                 week: "7",
    //                 balance: toFullDigitStr(200000),
    //                 merkleProof: [RANDOM_BYTES32_3],
    //             },
    //         ]

    //         await expectRevert(perpLiquidityMining.claimWeeks(alice.address, claimsArr, { from: alice }), "Invalid claim")
    //     })

    //     it("force error, claimWeeks() twice", async () => {
    //         await perpLiquidityMining.seedAllocations(new BN(2), RANDOM_BYTES32_1, parseEther(500000), { from: admin })
    //         await forwardBlockTimestamp(30)

    //         await perpLiquidityMining.seedAllocations(new BN(7), RANDOM_BYTES32_2, parseEther(1000000), { from: admin })
    //         await forwardBlockTimestamp(Number(vestingPeriod))

    //         const claimsArr = [
    //             {
    //                 week: "2",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_1],
    //             },
    //             {
    //                 week: "7",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_2],
    //             },
    //         ]

    //         await perpLiquidityMining.claimWeeks(alice.address, claimsArr, { from: alice })
    //         await expectRevert(perpLiquidityMining.claimWeeks(alice.address, claimsArr, { from: alice }), "Claimed already")
    //     })

    //     it("force error, claiming twice, first claimWeek() then claimWeeks()", async () => {
    //         await perpLiquidityMining.seedAllocations(new BN(2), RANDOM_BYTES32_1, parseEther(500000), { from: admin })
    //         await forwardBlockTimestamp(30)

    //         await perpLiquidityMining.seedAllocations(new BN(7), RANDOM_BYTES32_2, parseEther(1000000), { from: admin })
    //         await forwardBlockTimestamp(Number(vestingPeriod))

    //         await perpLiquidityMining.claimWeek(alice.address, new BN(2), parseEther(100000), [RANDOM_BYTES32_1], {
    //             from: alice,
    //         })

    //         const claimsArr = [
    //             {
    //                 week: "2",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_1],
    //             },
    //             {
    //                 week: "6",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_2],
    //             },
    //         ]

    //         await expectRevert(perpLiquidityMining.claimWeeks(alice.address, claimsArr, { from: alice }), "Claimed already")
    //     })

    //     it("force error, claiming twice, first claimWeeks() then claimWeek()", async () => {
    //         await perpLiquidityMining.seedAllocations(new BN(2), RANDOM_BYTES32_1, parseEther(500000), { from: admin })
    //         await forwardBlockTimestamp(30)

    //         await perpLiquidityMining.seedAllocations(new BN(7), RANDOM_BYTES32_2, parseEther(1000000), { from: admin })
    //         await forwardBlockTimestamp(Number(vestingPeriod))

    //         const claimsArr = [
    //             {
    //                 week: "2",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_1],
    //             },
    //             {
    //                 week: "7",
    //                 balance: toFullDigitStr(100000),
    //                 merkleProof: [RANDOM_BYTES32_2],
    //             },
    //         ]

    //         await perpLiquidityMining.claimWeeks(alice.address, claimsArr, { from: alice })
    //         await expectRevert(
    //             perpLiquidityMining.claimWeek(alice.address, new BN(2), parseEther(100000), [RANDOM_BYTES32_1], {
    //                 from: alice,
    //             }),
    //             "Claimed already",
    //         )
    //     })
    // })
})