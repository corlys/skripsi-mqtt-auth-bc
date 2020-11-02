import web3 from "./web3.js";
import Mqttsc from "./build/Mqttsc.json";

const mqttsc = new web3.eth.Contract(
    Mqttsc.abi,
    "0x7544C2aEEC79D420D78Df53d52668FE6a625088c"
);

export default mqttsc;