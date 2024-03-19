# Aethir Node Buy Bot

Quickly purchase Aethir nodes during sales using this Node.js script that interacts with the smart contracts on the Arbitrum network.

## Setup

1. Install dependencies:
yarn

2. Create `.env` file with your Ethereum private key:
PK=YOUR_PRIVATE_KEY

## Usage

1. Modify function parameters (`paymentAmount`, `merkleProof`, `allocation`, `code`).
2. Run the script:
node run.js


## How It Works
The script uses the Ethers.js library to connect to the Arbitrum network, create a wallet instance from your private key, and interact with the Aethir node sale smart contracts. It automates the process of calling the `whitelistedPurchaseWithCode` function, allowing you to purchase nodes faster than manually clicking through the website.