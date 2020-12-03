import web3 from "./web3.js";
import Mqttsc from "./build/Mqttsc.json";

const mqttsc = new web3.eth.Contract(
    Mqttsc.abi,
    "0x19bC81447EEDF5Dcf3d1f439cE65cfF8eBE6b7D0"
);

export default mqttsc;