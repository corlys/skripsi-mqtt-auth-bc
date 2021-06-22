// const web3 = require("./web3-private.js");
// const Mqttbaru = require("./build/Mqttbaru.json");

import web3 from "./web3-private.js";
import Mqttbaru from "./build/Mqttbaru.json";

const mqttbaru = new web3.eth.Contract(
  Mqttbaru.abi,
  // abi,
  // "0x7d6Da71Bc022189c190a0067f7584364e8374544"
  // "0x62d33261b46CacDA30CC2F7842206D572B838088"
  // "0x573f02421Ea104988738e6CEbFDa3f74A0654170" //contract skalabilitas di addbroker (gagal),
  // "0xbDf09C7cf5A3f4be428B0630d0865614Fe274f09" //skalabilitas add broker,
  // "0x1C9043Ff224DcB53eF77999192Ad053957bcD0ac"
  // "0xEEdb5CffC096412B97daFe6e4993107b1Ff01ee4" //Semhas
  "0xcbAB4BF6E98089626c9f7283A36323330F791A40"
);

export default mqttbaru;
