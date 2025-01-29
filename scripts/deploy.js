const dotenv = require("dotenv")
const {ethers, run} = require("hardhat")

dotenv.config()

const BLOCKS = 10

async function deploy() {
    const MeownadToken = await ethers.getContractFactory("MeownadToken")
    const meownadToken = await MeownadToken.deploy()
    await meownadToken.deploymentTransaction()?.wait(BLOCKS)

    const meownadTokenAddress = await meownadToken.getAddress()
    await run("verify:verify", {
        address: meownadTokenAddress
    })

    const StakingContract = await ethers.getContractFactory("SimpleStaking")
    const stakingContract = await StakingContract.deploy(meownadTokenAddress)
    await stakingContract.deploymentTransaction()?.wait(BLOCKS)

    const stakingContractAddress = await stakingContract.getAddress()
    await run("verify:verify", {
        address: stakingContractAddress,
        constructorArguments: [meownadTokenAddress]
    })

    console.log({meownadTokenAddress, stakingContractAddress})
}

deploy().then(function () {
    console.log("Deployed")
}).finally(function () {
    process.exit(0)
})