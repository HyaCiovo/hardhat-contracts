const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('10'),  //部署合约的时候充值0.01 ETH
  });

  await waveContract.deployed();
  console.log("合约部署到如下地址：", waveContract.address);
  console.log("合约部署人：", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log('当前合约余额：', hre.ethers.utils.formatEther(contractBalance));

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn;

  waveTxn = await waveContract.wave('hello, 豆畜子');
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log('当前合约余额：', hre.ethers.utils.formatEther(contractBalance));

  waveTxn = await waveContract.connect(randomPerson).wave('hello, 肥兔子');
  //waveTxn = await waveContract.wave('hello, 肥兔子');
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log('当前合约余额：', hre.ethers.utils.formatEther(contractBalance));

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

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