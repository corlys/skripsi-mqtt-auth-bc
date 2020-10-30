import web3 from "./web3.js";
import Mqttsc from "./build/Mqttsc.json";

const mqttsc = new web3.eth.Contract(
    Mqttsc.abi,
    "0x76508cD626CE2e62faDAbC2dD1fBEACfFe751b34"
);

export default mqttsc;