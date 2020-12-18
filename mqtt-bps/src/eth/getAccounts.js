// const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require("./build/Mqttbaru.json");

const ethprovider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3('http://');
web3.setProvider(ethprovider);


// console.log(web3);

const getAcc = async () => {
    try {
        console.log("start")
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        // web3.eth.personal.importRawKey("edbf799e35bcc79d738094d5e04106b026c20dff9d5dcbe12f4a7d63fba54c12", "pass123").then(console.log)
    } catch (error) {
        console.log(error)
    }
    // const account = "0x5C21865438FA716DE8f058599A4C5D1a5DF4BA57"

    // console.log('Attempting to deploy from account ', account)

    // const result = await new web3.eth.Contract(compiledFactory.abi)
    //     .deploy({ data: compiledFactory.evm.bytecode.object })
    //     .send({ from: account });
    // // console.log(interface);
    // console.log('Contract deployed to ',result.options.address)
};
getAcc();