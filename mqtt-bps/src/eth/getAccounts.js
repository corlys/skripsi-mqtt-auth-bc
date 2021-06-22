// const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require("web3");
const compiledFactory = require("./build/Mqttbaru.json");

// AWS
// const ethprovider = new Web3.providers.HttpProvider("http://54.204.186.144:8545");
// const ethprovider = new Web3.providers.HttpProvider("http://34.194.205.110:8546");
// const ethprovider = new Web3.providers.HttpProvider("http://52.207.109.45:8547");

// GCP
// const ethprovider = new Web3.providers.HttpProvider(
//   "http://35.208.190.191:8545"
// );
const ethprovider = new Web3.providers.HttpProvider(
  "http://35.209.58.187:8546"
);
// const ethprovider = new Web3.providers.HttpProvider("http://35.206.93.93:8547");

const web3 = new Web3("http://");
web3.setProvider(ethprovider);

// console.log(web3);

const getAcc = async () => {
  try {
    // console.log("start")
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    // Smart Contract Integrity
    // const bchaincode = await web3.eth.getCode("0x83650e30311CD531EC748b3f54632955e583084A");
    // const herecode = "0x"+compiledFactory.evm.deployedBytecode.object

    // if(bchaincode == herecode){
    //     console.log("sama")
    // }
  } catch (error) {
    console.log(error);
  }
};
getAcc();
