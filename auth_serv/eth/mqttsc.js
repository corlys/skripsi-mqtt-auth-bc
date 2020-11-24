import web3 from "./web3.js";
import Mqttsc from "./build/Mqttsc.json";

const mqttsc = new web3.eth.Contract(
    Mqttsc.abi,
    "0xDd7D85924B83e3Ee1D5351eE32FB47a830dAE550"
);

export default mqttsc;