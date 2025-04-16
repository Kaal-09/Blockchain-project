import { expect } from "chai"


const NAME = "TokenMaster"
const SYMBOL = "TM"

const OCCASION_NAME = "ETH Simrol"
const OCCASION_COST = ethers.utils.parseUnits('1', 'ether')
const OCCASION_MAX_TICKETS = 100
const OCCASION_DATE = "Apr 27"
const OCCASION_TIME = "10:00AM CST"
const OCCASION_LOCATION = "MP, Simrol"

describe("TokenMaster", () => {
    let tokenMasterDeployedContractInstance
    let deployer, buyer

    beforeEach(async () => {
        [deployer, buyer] = await ethers.getSigners()
        //getSigners() returns an array of Signer objects, which represent the accounts in the local Ethereum network.
        // the first account is the owner of contract rest are just others. The configurations of signers can be changed in hardhat.config.cjs

        const TokenMasterContractFactoryObject = await ethers.getContractFactory("TokenMaster")
        tokenMasterDeployedContractInstance = await TokenMasterContractFactoryObject.deploy(NAME, SYMBOL) // constructor arguments are Name nd Symbol so they need to be passed here.
        await tokenMasterDeployedContractInstance.deployed(); // waiting till the contract deploys(just in case).

        const transaction = await tokenMasterDeployedContractInstance
        .connect(deployer) // althoug here redundant but still for sureity.
        .list( // listing the occasion. This function is defined in the contract.
        OCCASION_NAME,
        OCCASION_COST,
        OCCASION_MAX_TICKETS,
        OCCASION_DATE,
        OCCASION_TIME,
        OCCASION_LOCATION
        )

        await transaction.wait()
    })

    describe("Deployment", () => {
        it("Sets the name", async () => {
        expect(await tokenMasterDeployedContractInstance.name()).to.equal(NAME)
        })

        it("Sets the symbol", async () => {
        expect(await tokenMasterDeployedContractInstance.symbol()).to.equal(SYMBOL)
        })

        it("Sets the owner", async () => {
        expect(await tokenMasterDeployedContractInstance.owner()).to.equal(deployer.address)
        })
    })

    describe("Occasions", () => {
        it('Returns occasions attributes', async () => {
        const occasion = await tokenMasterDeployedContractInstance.getOccasion(1)
        expect(occasion.id.toNumber()).to.equal(1)
        expect(occasion.name).to.equal(OCCASION_NAME)
        expect(occasion.cost.toString()).to.equal(OCCASION_COST.toString())
        expect(occasion.tickets.toNumber()).to.equal(OCCASION_MAX_TICKETS)
        expect(occasion.date).to.equal(OCCASION_DATE)
        expect(occasion.time).to.equal(OCCASION_TIME)
        expect(occasion.location).to.equal(OCCASION_LOCATION)
        })

        it('Updates occasions count', async () => {
        const totalOccasions = await tokenMasterDeployedContractInstance.totalOccasions()
        expect(totalOccasions.toNumber()).to.equal(1)
        })
    })

    describe("Minting", () => {
        const ID = 1
        const SEAT = 50
        const AMOUNT = ethers.utils.parseUnits('1', 'ether')

        beforeEach(async () => {
        const transaction = await tokenMasterDeployedContractInstance.connect(buyer).mint(ID, SEAT, { value: AMOUNT })
        await transaction.wait()
        })

        it('Updates ticket count', async () => {
        const occasion = await tokenMasterDeployedContractInstance.getOccasion(ID)
        expect(occasion.tickets.toNumber()).to.equal(OCCASION_MAX_TICKETS - 1) // since one ticket in bought (seat 50)
        })

        it('Updates buying status', async () => {
        const status = await tokenMasterDeployedContractInstance.hasBought(ID, buyer.address)
        expect(status).to.equal(true)
        })

        it('Updates seat status', async () => {
        const owner = await tokenMasterDeployedContractInstance.seatTaken(ID, SEAT)
        expect(owner).to.equal(buyer.address)
        })

        it('Updates overall seating status', async () => {
        const seats = await tokenMasterDeployedContractInstance.getSeatsTaken(ID)
        expect(seats.length).to.equal(1)
        expect(seats[0].toNumber()).to.equal(SEAT)
        })

        it('Updates the contract balance', async () => {
        const balance = await ethers.provider.getBalance(tokenMasterDeployedContractInstance.address)
        expect(balance.toString()).to.equal(AMOUNT.toString())
        })
    })

    describe("Withdrawing", () => {
        const ID = 1
        const SEAT = 50
        const AMOUNT = ethers.utils.parseUnits("1", 'ether')
        let balanceBefore

        beforeEach(async () => {
        balanceBefore = await ethers.provider.getBalance(deployer.address)

        let transaction = await tokenMasterDeployedContractInstance.connect(buyer).mint(ID, SEAT, { value: AMOUNT })
        await transaction.wait()

        transaction = await tokenMasterDeployedContractInstance.connect(deployer).withdraw()
        await transaction.wait()
        })

        it('Updates the owner balance', async () => {
        const balanceAfter = await ethers.provider.getBalance(deployer.address)
        expect(balanceAfter.gt(balanceBefore)).to.be.true
        })

        it('Updates the contract balance', async () => {
        const balance = await ethers.provider.getBalance(tokenMasterDeployedContractInstance.address)
        expect(balance.toNumber()).to.equal(0)
        })
    })
})
