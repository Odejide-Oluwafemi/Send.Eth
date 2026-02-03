require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/lEBB3O-bQnzdOLjXtCAVf",
      accounts: [
        "4183e70575e84971c29a835e908356ddc209bc4383bd45d65121e4a1a9dfeb40"
      ]
    }
  }
};
