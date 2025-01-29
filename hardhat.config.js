require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-foundry");
const dotenv = require("dotenv");

dotenv.config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  etherscan: {
    apiKey: {
      monadDevnet: "DUMMY_VALUE_FOR_VERIFICATION"
    },
    customChains:[{
      network: "monadDevnet",
      chainId: parseInt(process.env.MONAD_DEVNET_CHAIN_ID),
      urls: {
        apiURL: `${process.env.MONAD_DEVNET_EXPLORER_URL}/api`,
        browserURL: process.env.MONAD_DEVNET_EXPLORER_URL
      }
    }]
  },
  networks: {
    monadDevnet: {
      url: process.env.MONAD_DEVNET_RPC,
      accounts: [process.env.PRIVATE_KEY],
      chainId: parseInt(process.env.MONAD_DEVNET_CHAIN_ID)
    }
  }
};
