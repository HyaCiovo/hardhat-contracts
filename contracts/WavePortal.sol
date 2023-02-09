// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves; //wave次数计数器

    // uint256 private seed; //随机种子

    //新的wave事件，调用wave()方法时emit
    event NewWave(address indexed from, uint256 timestamp, string message);

    //Wave结构体
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves; //在合约里，存放所有wave数据的数组

    //存放每个wave的人最后一次执行合约交易的时间，每个人15分钟只能wave一次
    mapping(address => uint256) public lastWavedAt;

    //合约的构造函数，payable表示合约可以支付ETH给其他地址
    constructor() payable {
        console.log("Hello, this a smart contract!");
        // seed = (block.timestamp + block.difficulty) % 100; //seed初始化
    }

    //核心方法
    function wave(string memory _message) public {
        //require前面的表达式必须为真，否则抛后面异常信息；这里是如果该地址距上次交易不到15分钟则不允许再次发起交易
        require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            "Error: Wait 15 Minutes please"
        );

        lastWavedAt[msg.sender] = block.timestamp; //更新mapping

        totalWaves += 1;
        console.log("%s has waved!", msg.sender);

        waves.push(Wave(msg.sender, _message, block.timestamp)); //数组里新push一个Wave

        // seed = (block.timestamp + block.difficulty + seed) % 100; //计算seed
        // console.log("Random # generated: d%", seed);

        // if (seed <= 50) {
        //本次seed<=50则向发起wave交易的地址发放奖励0.0001 ETH
        console.log("%s won!", msg.sender);
        // uint256 prizeAmount = 0.0001 ether;
        uint256 prizeAmount = 0.01 ether;
        require(
            prizeAmount <= address(this).balance,
            "Error: Trying to withdraw more money than the contract has."
        ); //判断合约是否余额不足
        (bool success, ) = (msg.sender).call{value: prizeAmount}(""); //给msg.sender对应的地址转账prizeAmount
        require(success, "Failed to withdraw money from contract.");
        // }

        emit NewWave(msg.sender, block.timestamp, _message); //发射NewWave事件，前端可以订阅并捕捉到
    }

    //返回当前所有wave的数组
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    //返回wave计数
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
