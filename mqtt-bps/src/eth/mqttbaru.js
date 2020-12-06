const web3 = require("./web3.js");
const Mqttbaru = require("./build/Mqttbaru.json");

const abi = [
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_brokeraddress",
                "type": "address"
            }
        ],
        "name": "addBroker",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_username",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_password",
                "type": "string"
            }
        ],
        "name": "addClient",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_topic",
                "type": "string"
            }
        ],
        "name": "addTopic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "logerror",
                "type": "string"
            }
        ],
        "name": "check",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_brokeraddress",
                "type": "address"
            }
        ],
        "name": "deleteBroker",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "deleteClient",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_topic",
                "type": "string"
            }
        ],
        "name": "deleteTopic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "_tokenreturn",
                "type": "bytes32"
            }
        ],
        "name": "ref_token",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "refreshToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_topic",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_newtopic",
                "type": "string"
            }
        ],
        "name": "updateTopic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_token",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_username",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_password",
                "type": "string"
            }
        ],
        "name": "authenticate",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_token",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_topic",
                "type": "string"
            }
        ],
        "name": "authorize",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_token",
                "type": "bytes32"
            }
        ],
        "name": "checkAuthBroker",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBroker",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getClients",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getClientsCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getTopic",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "manager",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const mqttbaru = new web3.eth.Contract(
    Mqttbaru.abi,
    // abi,
    // "0x7d6Da71Bc022189c190a0067f7584364e8374544"
    "0x24E3EB3E06254BAB809C116D80351E8844231b5e"
);

module.exports = mqttbaru;

