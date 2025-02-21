import dotenv from "dotenv";
import hardhat from "hardhat"; // Import Hardhat as a default export
dotenv.config();

const { ethers, run } = hardhat; // Destructure ethers and run from the default export
const BLOCKS = 10;

async function deploy() {
    try {
        // Deploy MeownadToken
        console.log("Deploying Meownad Token...");
        const MeownadToken = await ethers.getContractFactory("MeownadToken");
        const meownadToken = await MeownadToken.deploy();
        await meownadToken.deploymentTransaction().wait(BLOCKS); // Wait for confirmation
        const meownadTokenAddress = await meownadToken.getAddress();
        console.log(`Meownad Token deployed to: ${meownadTokenAddress}`);

        // Verify MeownadToken
        console.log("Verifying Meownad Token...");
        await run("verify:verify", { address: meownadTokenAddress });

        console.log({ meownadTokenAddress });
    } catch (error) {
        console.error("Error during deployment:", error);
        process.exitCode = 1;
    }
}

deploy()
    .then(() => console.log("Deployment completed successfully."))
    .finally(() => process.exit(0));