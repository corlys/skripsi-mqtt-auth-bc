const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //we are on the server and running metamask
    window.ethereum.enable();
    web3 = new Web3(window.web3.currentProvider);
} else {
    //we are on the server and not running metamask
    //possibly need trufflehdwalletprovider to use mnemonic
    const provider = new HDWalletProvider(
        "tower crisp stand stove myth wire cradle rate urge chunk account table",
        "https://rinkeby.infura.io/v3/36ac3f601d2c4510a4d0ee538a293ef9"
    );
    web3 = new Web3(provider);
}

module.exports = web3;