import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  window.ethereum.enable();
  web3 = new Web3(window.web3.currentProvider);
} else {
  try {
    const ethprovider = new Web3.providers.HttpProvider(
      "http://35.208.190.191:8545"
    );
    // const ethprovider = new Web3.providers.HttpProvider(
    //   "http://35.209.58.187:8546"
    // );
    // const ethprovider = new Web3.providers.HttpProvider(
    //   "http://35.206.93.93:8547"
    // );
    web3 = new Web3("http://");
    web3.setProvider(ethprovider);
  } catch (error) {
    console.log(error);
  }
}

export default web3;
