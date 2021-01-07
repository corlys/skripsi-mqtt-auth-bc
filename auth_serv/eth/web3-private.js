import Web3 from "web3"

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    window.ethereum.enable();
    web3 = new Web3(window.web3.currentProvider);
} else {
    try {
        const ethprovider = new Web3.providers.HttpProvider("http://54.204.186.144:8545");
        web3 = new Web3('http://');
        web3.setProvider(ethprovider);
    } catch (error) {
        console.log(error)
    }
}

export default web3;