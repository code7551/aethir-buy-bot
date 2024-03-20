require('dotenv').config()
const { ethers, JsonRpcProvider, parseEther } = require('ethers');

(async () => {
  const buyAddress = {
    tier1: "0xc2BF4eBEbBd692176d08faC51ba7ec3410Af18EC",
    tier2: "0xD19EBA0953e995806e76f5505cD6D8A820909C94",
    tier3: "0xF85468AaDD71d2dbC969b4A8Cc2147c1DdD4866d",
    tier4: "0x754C9D60d5E877bd24c47FaE05eb670875D47442",
    tier5: "0x2EbdcEDE80039bb745C3ee2a18C740346dd6560e",
  }
  const contractAddress = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
  const contractABI = [{
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }];

  const arbitrumProvider = new JsonRpcProvider('https://arb1.arbitrum.io/rpc');

  const allowanceAmount = parseEther('1'); // allowance amount 

  const privateKey = process.env.PK;

  const wallet = new ethers.Wallet(privateKey, arbitrumProvider);

  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  // Call the approve function
  const tx = await contract.approve(buyAddress.tier1, allowanceAmount);
  console.log('Transaction sent:', tx.hash);

  // Wait for the transaction to be execute
  const receipt = await tx.wait();
  console.log('Transaction receipt:', receipt);
})()
