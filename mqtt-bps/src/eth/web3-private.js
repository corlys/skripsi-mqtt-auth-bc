const Web3 = require("web3");
// const HDWalletProvider = require("@truffle/hdwallet-provider");

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //we are on the server and running metamask
    window.ethereum.enable();
    web3 = new Web3(window.web3.currentProvider);
} else {
    try {

        //we are on the server and not running metamask
        //possibly need trufflehdwalletprovider to use mnemonic
        const ethprovider = new Web3.providers.HttpProvider("http://localhost:8545");
        web3 = new Web3('http://');
        web3.setProvider(ethprovider);
    } catch (error) {
        console.log(error)
    }
}

module.exports = web3;