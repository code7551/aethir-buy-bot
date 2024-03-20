require('dotenv').config()
const { ethers, JsonRpcProvider, parseEther } = require('ethers');

(async () => {
  const lists = [{
    address: "0xc2BF4eBEbBd692176d08faC51ba7ec3410Af18EC",
    amount: '0.6295'// 5 nodes
  }, {
    address: '0xD19EBA0953e995806e76f5505cD6D8A820909C94',
    amount: '0.725'// 5 nodes
  }, {
    address: '0xF85468AaDD71d2dbC969b4A8Cc2147c1DdD4866d',
    amount: '0.835'// 5 nodes
  }, {
    address: '0x754C9D60d5E877bd24c47FaE05eb670875D47442',
    amount: '0.96'// 5 nodes
  }, {
    address: '0x2EbdcEDE80039bb745C3ee2a18C740346dd6560e',
    amount: '0.88'// 4 nodes
  }]
  // https://docs.aethir.com/checker-nodes-explained/checker-node-sale-dynamics/smart-contract-addresses
  const { address, amount } = lists[0]
  const contractABI = [{ "inputs": [{ "internalType": "uint256", "name": "paymentAmount", "type": "uint256" }, { "internalType": "bytes32[]", "name": "merkleProof", "type": "bytes32[]" }, { "internalType": "uint256", "name": "_allocation", "type": "uint256" }, { "internalType": "string", "name": "code", "type": "string" }], "name": "whitelistedPurchaseWithCode", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

  const arbitrumProvider = new JsonRpcProvider('https://arb-mainnet.g.alchemy.com/v2/hWJhg1vsnB4RpLzVTUAK4FcOndwMhBi7');

  const paymentAmount = parseEther(amount); // ether amount you wanna buy
  const merkleProof = [];
  // const allocation = 0;
  const code = "degenclan";

  const privateKey = process.env.PK;

  const wallet = new ethers.Wallet(privateKey, arbitrumProvider);

  const contract = new ethers.Contract(address, contractABI, wallet);

  // static call to check
  await contract.whitelistedPurchaseWithCode.staticCall(paymentAmount, merkleProof, paymentAmount, code, {
    maxFeePerGas: 200000000,
    gasLimit: 500000,
  })

  // Call the whitelistedPurchaseWithCode function
  const tx = await contract.whitelistedPurchaseWithCode(paymentAmount, merkleProof, paymentAmount, code);
  console.log('Transaction sent:', tx.hash);

  // Wait for the transaction to be execute
  const receipt = await tx.wait();
  console.log('Transaction receipt:', receipt);
})()