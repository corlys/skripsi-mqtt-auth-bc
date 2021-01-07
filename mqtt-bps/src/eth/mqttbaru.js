const web3 = require("./web3-private.js");
const Mqttbaru = require("./build/Mqttbaru.json");

const mqttbaru = new web3.eth.Contract(
    Mqttbaru.abi,
    // abi,
    // "0x7d6Da71Bc022189c190a0067f7584364e8374544"
    // "0xb3774F0D56D1F5A5d78C864ddadeEd93A31D5C23"
    "0x62d33261b46CacDA30CC2F7842206D572B838088"
);

module.exports = mqttbaru;

