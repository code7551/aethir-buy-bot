require('dotenv').config()
const axios = require('axios');
const { ethers, JsonRpcProvider, parseEther } = require('ethers');
function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000)
}
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
  const startAt = 1712066400
  
  let now = getTimestampInSeconds()
  while (now < startAt) {
    console.clear();
    console.log('Sale not started yet', startAt - now, 'seconds left')
    await sleep(100);
    now = getTimestampInSeconds()
  }

  const deadline = now + 60;

  const arbitrumProvider = new JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  const privateKey = process.env.PK;
  const wallet = new ethers.Wallet(privateKey, arbitrumProvider);


  // blocked by recaptcha
  // const address = wallet.address;
  // const resp1 = await axios.post(`https://be.launchmoby.com/api/v1/customer/login?wallet=${address}`, {},
  // {
  //   headers: {
  //     'Referer': 'https://launchmoby.com/',
  //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  //     'Accept': 'application/json, text/plain, */*'
  //   }
  // })
  // const accessToken = resp1.data.data.token;

  // const resp2 = await axios.get('https://be.launchmoby.com/api/v1/customer/signature-deposit?type=pingu', {
  //   headers: {
  //     'Referer': 'https://launchmoby.com/',
  //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  //     'Accept': 'application/json, text/plain, */*',
  //     'Authorization': `Bearer ${accessToken}`
  //   }
  // })

  // console.log(resp2.data)

  

  const contractAddress = "0xa8A0E3286f6D61741D2Fb76cF606d5D93254717d"
  const contractABI = [{
    inputs: [{
          internalType: "uint256",
          name: "paymentTokenAmount",
          type: "uint256"
      }, {
          internalType: "uint256",
          name: "minimumReceive",
          type: "uint256"
      }, {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
      }, {
          internalType: "bytes",
          name: "signature",
          type: "bytes"
      }],
      name: "purchasePublic",
      outputs: [],
      stateMutability: "payable",
      type: "function"
  }]

  
  const signature = '0x...'
  
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  const paymentTokenAmount = 500 * 1000000  // USDC AMOUNT
  const minimumReceive = 1 // min amount of tokens to receive (slippage protection)

  //use default gas price
  const tx = await contract.purchasePublic(paymentTokenAmount, minimumReceive, deadline, signature, {
    value: paymentTokenAmount,
    //maxFeePerGas: 200000000,
    //gasLimit: 500000,
  });
  console.log('Transaction sent:', tx.hash);

  // Wait for the transaction to be execute
  const receipt = await tx.wait();
  console.log('Transaction receipt:', receipt);
})()