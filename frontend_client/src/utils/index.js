import { ethers, WeiPerEther } from "ethers";

const shortenAddress = (address) => {
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};

const weiToEth = (bigNum) => {
	return ethers.formatEther(bigNum);
}

const timestampToLocaleTime = (timestamp) => {
	return new Date(parseInt((ethers.toNumber(timestamp) * 1000).toString())).toLocaleDateString()
}

const CONTRACT_ADDRESS = "0xe25aC1ae173e0219c7b0124e7714D5D7B1bb1be8";

const ABI = [
	{
		"inputs": [],
		"name": "SendEth__InvalidTransactionId",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SendEth__NotAValidTransaction",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SendEth__SentZeroAmount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SendEth__TransferFailed",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receipient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "createTransaction",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allTransactions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "enum SendEth.TransactionStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getAllUserTransactions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "receipient",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "message",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "enum SendEth.TransactionStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct SendEth.Transaction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "txId",
				"type": "uint256"
			}
		],
		"name": "getTransactionById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "receipient",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "message",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "enum SendEth.TransactionStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct SendEth.Transaction",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export { shortenAddress, CONTRACT_ADDRESS, ABI, weiToEth, timestampToLocaleTime};
