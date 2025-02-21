require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.28",
    paths: {
        sources: "./src", // Point to the src folder
    },
    networks: {
        monadTestnet: {
            url: process.env.RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
            chainId: parseInt(process.env.CHAIN_ID),
        },
    },
    etherscan: {
        apiKey: process.env.EXPLORER_API_KEY, // Replace with your Monad Explorer API key
        customChains: [
            {
                network: "monadTestnet",
                chainId: 10143,
                urls: {
                    apiURL: "https://testnet.monadexplorer.com/api", // Monad Testnet API URL
                    browserURL: "https://testnet.monadexplorer.com", // Monad Testnet Explorer URL
                },
            },
        ],
    },
};