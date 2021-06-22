const web3 = require("./web3-private.js");
const Mqttbaru = require("./build/Mqttbaru.json");

const mqttbaru = new web3.eth.Contract(
  Mqttbaru.abi,
  // abi,
  // "0x7d6Da71Bc022189c190a0067f7584364e8374544"
  // "0xb3774F0D56D1F5A5d78C864ddadeEd93A31D5C23"
  // "0x62d33261b46CacDA30CC2F7842206D572B838088"
  // "0x1C9043Ff224DcB53eF77999192Ad053957bcD0ac"
  // "0xEEdb5CffC096412B97daFe6e4993107b1Ff01ee4" // Semhas
  "0xcbAB4BF6E98089626c9f7283A36323330F791A40" //Ujian
);

module.exports = mqttbaru;
