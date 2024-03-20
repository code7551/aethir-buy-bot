require('dotenv').config()
const { ethers, JsonRpcProvider, parseEther } = require('ethers');
function getTimestampInSeconds () {
  return Math.floor(Date.now() / 1000)
}
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
(async() => {
  const startAt = 1710928800
  let now = getTimestampInSeconds()
  while (now < startAt) {
    console.clear();
    console.log('Sale not started yet',startAt-now,'seconds left')
    await sleep(100);
    now = getTimestampInSeconds()
  }
  const buyTier = 1;
  // https://docs.aethir.com/checker-nodes-explained/checker-node-sale-dynamics/smart-contract-addresses
  const contractAddress = {
    tier1: "0xc2BF4eBEbBd692176d08faC51ba7ec3410Af18EC",
    tier2: "0xD19EBA0953e995806e76f5505cD6D8A820909C94",
    tier3: "0xF85468AaDD71d2dbC969b4A8Cc2147c1DdD4866d",
    tier4: "0x754C9D60d5E877bd24c47FaE05eb670875D47442",
    tier5: "0x2EbdcEDE80039bb745C3ee2a18C740346dd6560e",
  }
  let address = contractAddress.tier1;
  const contractABI = [{ "inputs": [{ "internalType": "uint256", "name": "paymentAmount", "type": "uint256" }, { "internalType": "bytes32[]", "name": "merkleProof", "type": "bytes32[]" }, { "internalType": "uint256", "name": "_allocation", "type": "uint256" }, { "internalType": "string", "name": "code", "type": "string" }], "name": "whitelistedPurchaseWithCode", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

  //const arbitrumProvider = new JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  const arbitrumProvider = new JsonRpcProvider('https://rpc.ankr.com/arbitrum');

  //const gasPrice = await arbitrumProvider.getFeeData();
  //console.log('current gas', gasPrice.gasPrice.toString());
  //tier1 buy x5
  let paymentAmount = parseEther('0.6295'); // ether amount you wanna buy
  //tier2 buy x4
  //const paymentAmount = parseEther('0.5792'); // ether amount you wanna buy

  //tier3 buy x4
  //const paymentAmount = parseEther('0.666'); // ether amount you wanna buy

  //tier4 buy x3
  //const paymentAmount = parseEther('0.5745');

  //tier5 buy x3
  //const paymentAmount = parseEther('0.6606');

  switch(buyTier) {
    case 1:
      paymentAmount = parseEther('0.6295');
      address = contractAddress.tier1;
      break;
    case 2:
      paymentAmount = parseEther('0.5792');
      address = contractAddress.tier2;
      break;
    case 3:
      paymentAmount = parseEther('0.666');
      address = contractAddress.tier3;
      break;
    case 4:
      paymentAmount = parseEther('0.5745');
      address = contractAddress.tier4;
      break;
    case 5:
      paymentAmount = parseEther('0.6606');
      address = contractAddress.tier5;
      break;

  }
  const merkleProof = []; 
  // const allocation = 0; 
  //const code = "degenclan"; 
  //const code = "mintttch";
  const code = "bitcoinaddict";

  const privateKey = process.env.PK; 

  const wallet = new ethers.Wallet(privateKey, arbitrumProvider);

  const contract = new ethers.Contract(address, contractABI, wallet);

  // Call the whitelistedPurchaseWithCode function
  const tx = await contract.whitelistedPurchaseWithCode(paymentAmount, merkleProof, 0, code,{
    maxFeePerGas: 3000000,
    gasLimit: 50000,
  });
  console.log('Transaction sent:', tx.hash);

  // Wait for the transaction to be execute
  const receipt = await tx.wait();
  console.log('Transaction receipt:', receipt);
})()