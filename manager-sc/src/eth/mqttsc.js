import web3 from "./web3.js";
import Mqttsc from "./build/Mqttsc.json";

const mqttsc = new web3.eth.Contract(
    Mqttsc.abi,
    "0x844aF99Dd3586B4b4EBC1ED298b87aAaf1Dc8760"
);

export default mqttsc;