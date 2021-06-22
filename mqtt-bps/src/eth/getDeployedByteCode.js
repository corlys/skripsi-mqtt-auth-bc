const Web3 = require("web3");
const compiledFactory = require("./build/Mqttbaru.json");
const ethprovider = new Web3.providers.HttpProvider(
  "http://35.208.190.191:8545"
);
const web3 = new Web3("http://");
web3.setProvider(ethprovider);
const getDeployedByteCode = async () => {
  try {
    const deployedCode = await web3.eth.getCode(
      "0xcbAB4BF6E98089626c9f7283A36323330F791A40"
    );
    const compiledCode = "0x" + compiledFactory.evm.deployedBytecode.object;
    if (deployedCode === compiledCode) {
      console.log(deployedCode);
      console.log(compiledCode);
      console.log("Compiled ByteCode and Deployed ByteCode are the same");
    } else {
      throw new Error(
        "Compiled ByteCode and Deployed ByteCode is Not The Same "
      );
    }
  } catch (error) {
    console.log(error);
  }
};
getDeployedByteCode();

// AWS
// const ethprovider = new Web3.providers.HttpProvider("http://54.204.186.144:8545");
// const ethprovider = new Web3.providers.HttpProvider("http://34.194.205.110:8546");
// const ethprovider = new Web3.providers.HttpProvider("http://52.207.109.45:8547");

// GCP
// const ethprovider = new Web3.providers.HttpProvider(
//   "http://35.208.190.191:8545"
// );
// const ethprovider = new Web3.providers.HttpProvider("http://35.209.58.187:8546");
// const ethprovider = new Web3.providers.HttpProvider("http://35.206.93.93:8547");

// Smart Contract That Are Different: 0xb44829898f8a1421d7c5A235D81F37D99DA1A027
// Smart Contract That Are The Same:  0x452E56B6daFD50EcAC925efA8b366fECbDEA9182
