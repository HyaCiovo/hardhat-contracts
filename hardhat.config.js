require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const API_KEY = '';//你的alchemy goerli测试app的key
const SECRET_KEY = '' //你的metamask私钥
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${API_KEY}`,
      accounts: [SECRET_KEY]
    }
  }
};