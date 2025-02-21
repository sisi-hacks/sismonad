const { ethers } = require("hardhat");

async function testConnection() {
    try {
        // Get the provider from Hardhat
        const provider = ethers.provider;

        // Fetch network details
        const network = await provider.getNetwork();
        console.log(`Connected to network: ${network.name} (Chain ID: ${network.chainId})`);

        // Optionally, fetch the latest block number to confirm connectivity
        const blockNumber = await provider.getBlockNumber();
        console.log(`Latest block number: ${blockNumber}`);
    } catch (error) {
        console.error("Error testing connection:", error);
    }
}

// Run the testConnection function
testConnection()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });