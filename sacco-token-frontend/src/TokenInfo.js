import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

// Replace with your contract's ABI
const tokenABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

const tokenAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

const TokenInfo = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [owner, setOwner] = useState('');

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        if (window.ethereum) {
          console.log("Ethereum object found");

          // Connect to Ethereum provider
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send('eth_requestAccounts', []);
          console.log("Ethereum accounts connected");

          const signer = provider.getSigner();
          const address = await signer.getAddress();
          console.log("Signer address:", address);

          const contract = new ethers.Contract(tokenAddress, tokenABI, signer);

          // Fetch token details
          const name = await contract.name();
          console.log("Token Name fetched:", name);

          const symbol = await contract.symbol();
          console.log("Token Symbol fetched:", symbol);

          const totalSupply = await contract.totalSupply();
          console.log("Total Supply fetched:", totalSupply.toString());

          const owner = await contract.owner();
          console.log("Owner fetched:", owner);

          // Update state variables
          setName(name);
          setSymbol(symbol);
          setTotalSupply(ethers.formatUnits(totalSupply, 18));
          setOwner(owner);
        } else {
          console.error("MetaMask is not installed.");
        }
      } catch (error) {
        console.error("Error fetching token info:", error);
      }
    };

    fetchTokenInfo();
  }, []);

  return (
    <div className="TokenInfo">
      <h1>Token Information</h1>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Symbol:</strong> {symbol}</p>
      <p><strong>Total Supply:</strong> {totalSupply}</p>
      <p><strong>Owner:</strong> {owner}</p>
    </div>
  );
};

export default TokenInfo;
