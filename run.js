require('dotenv').config()
const { ethers, JsonRpcProvider, parseEther } = require('ethers');

(async() => {
  // https://docs.aethir.com/checker-nodes-explained/checker-node-sale-dynamics/smart-contract-addresses
  const contractAddress = {
    tier1: "0xc2BF4eBEbBd692176d08faC51ba7ec3410Af18EC",
    tier2: "0xD19EBA0953e995806e76f5505cD6D8A820909C94",
    tier3: "0xF85468AaDD71d2dbC969b4A8Cc2147c1DdD4866d",
    tier4: "0x754C9D60d5E877bd24c47FaE05eb670875D47442",
    tier5: "0x2EbdcEDE80039bb745C3ee2a18C740346dd6560e",
  }
  const contractABI = [{ "inputs": [{ "internalType": "uint256", "name": "paymentAmount", "type": "uint256" }, { "internalType": "bytes32[]", "name": "merkleProof", "type": "bytes32[]" }, { "internalType": "uint256", "name": "_allocation", "type": "uint256" }, { "internalType": "string", "name": "code", "type": "string" }], "name": "whitelistedPurchaseWithCode", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

  const arbitrumProvider = new JsonRpcProvider('https://arb1.arbitrum.io/rpc');

  const paymentAmount = parseEther('0.6295'); // ether amount you wanna buy
  const merkleProof = []; 
  // const allocation = 0; 
  const code = "degenclan"; 

  const privateKey = process.env.PK; 

  const wallet = new ethers.Wallet(privateKey, arbitrumProvider);

  const contract = new ethers.Contract(contractAddress.tier1, contractABI, wallet);

  // Call the whitelistedPurchaseWithCode function
  const tx = await contract.whitelistedPurchaseWithCode(paymentAmount, merkleProof, paymentAmount, code);
  console.log('Transaction sent:', tx.hash);

  // Wait for the transaction to be execute
  const receipt = await tx.wait();
  console.log('Transaction Info:', receipt.transactionHash);
})()