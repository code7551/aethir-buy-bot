require('dotenv').config()
const { ethers, JsonRpcProvider, parseEther } = require('ethers');
function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000)
}
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
  const startAt = 1710928800
  let now = getTimestampInSeconds()
  while (now < startAt) {
    console.clear();
    console.log('Sale not started yet', startAt - now, 'seconds left')
    await sleep(100);
    now = getTimestampInSeconds()
  }
  const contractAddress = "0x4c91993eC24B9A0A11984305D38A05FD45EccB31"
  const contractABI = [{
      "inputs": [
        {
          "internalType": "uint256",
          "name": "paymentTokenAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "minimumReceive",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "purchasePublic",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }]

  const arbitrumProvider = new JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  const privateKey = process.env.PK;
  const wallet = new ethers.Wallet(privateKey, arbitrumProvider);
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  const paymentTokenAmount = ethers.utils.parseEther('10000');  // USDC AMOUNT
  const signature = '0x...'; 

  const tx = await contract.purchasePublic(paymentTokenAmount, paymentTokenAmount, signature, {
    value: paymentTokenAmount,
    maxFeePerGas: 200000000,
    gasLimit: 500000,
  });
  console.log('Transaction sent:', tx.hash);

  // Wait for the transaction to be execute
  const receipt = await tx.wait();
  console.log('Transaction receipt:', receipt);
})()