// const web3 = require("./web3-private.js");
// const Mqttbaru = require("./build/Mqttbaru.json");

import web3 from "./web3-private.js"
import Mqttbaru from "./build/Mqttbaru.json"

const mqttbaru = new web3.eth.Contract(
    Mqttbaru.abi,
    // abi,
    // "0x7d6Da71Bc022189c190a0067f7584364e8374544"
    "0x62d33261b46CacDA30CC2F7842206D572B838088"
);

export default mqttbaru;
