const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("使用如下账户部署合约：", deployer.address);
  console.log("账户余额：", accountBalance.toString());

  const factory = await hre.ethers.getContractFactory("WavePortal");
  const contract = await factory.deploy({
    value: hre.ethers.utils.parseEther('0.05'), //部署合约的时候充值0.06 ETH
  });
  await contract.deployed();

  let contractBalance = await hre.ethers.provider.getBalance(contract.address);
  console.log('当前合约余额：', hre.ethers.utils.formatEther(contractBalance));

  console.log("合约的地址: ", contract.address);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();