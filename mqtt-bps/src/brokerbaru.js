const options = {
  id: "inibroker",
};
const web3 = require("./eth/web3-private");
const mqttbaru = require("./eth/mqttbaru");
const aedes = require("aedes")(options);
const server = require("net").createServer(aedes.handle);
const PORT = 8001;

let accounts = [];
let token = "";

server.listen(PORT, async () => {
  try {
    accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    // console.log(web3.eth.personal.listAccounts)
    // web3.eth.personal.unlockAccount(accounts[3], 'password', 3600) //password = password or pass123
    console.log(`attempting getting token from ${accounts[3]}`);
    let receipt = await mqttbaru.methods
      .refreshToken()
      .send({ from: accounts[3] });
    token = receipt.events.ref_token.returnValues[0];
    console.log(
      `Broker ${accounts[3]} with ${token} started listening on port ${PORT}`
    );
  } catch (error) {
    console.log(error);
  }
});

aedes.authenticate = async (client, username, password, callback) => {
  try {
    console.log(
      `client ${client.id} is entering authentication block in broker(${token}) with ${password} as password`
    );
    const _password = Buffer.from(password).toString();
    const authblock = await mqttbaru.methods
      .authenticate(token, client.id, username, _password)
      .call({ from: accounts[3] });
    if (authblock) {
      callback(null, true);
    } else if (!authblock) {
      console.log(
        `client ${client.id} is not passing authentication block with ${password} as password`
      );
      var error = new Error("Identifier error");
      error.returnCode = 2;
      callback(error, null);
    } else {
      console.log("somethings wrong on Auth Block");
    }
  } catch (error) {
    console.log(error);
  }
};

aedes.authorizePublish = async (client, packet, callback) => {
  try {
    console.log(`client ${client.id} is entering authorization block`);
    const authblock = await mqttbaru.methods
      .authorize(token, client.id, packet.topic)
      .call({ from: accounts[3] });
    if (authblock) {
      callback(null);
      console.log(
        `client ${client.id} is authorized to publish with topic : ${packet.topic}`
      );
    } else if (!authblock) {
      console.log(
        `client ${client.id} is not authorized to publish with topic : ${packet.topic}`
      );
      var error = new Error("Identifier error");
      error.returnCode = 2;
      callback(error);
    } else {
      console.log("somethings wrong on Auth Block");
      var error = new Error("Identifier error");
      error.returnCode = 2;
      callback(error);
    }
  } catch (error) {
    console.log("somethings wrong on Auth Block");
    var error = new Error("Identifier error");
    error.returnCode = 2;
    callback(error);
  }
};

aedes.authorizeSubscribe = async (client, packet, callback) => {
  try {
    console.log(`client ${client.id} is entering authorization block`);
    const authblock = await mqttbaru.methods
      .authorize(token, client.id, packet.topic)
      .call({ from: accounts[3] });
    if (authblock) {
      console.log(
        `client ${client.id} is authorized to subscribe with topic : ${packet.topic}`
      );
      callback(null, packet);
    } else if (!authblock) {
      console.log(
        `client ${client.id} is not authorized to subscribe with topic : ${packet.topic}`
      );
      return callback(new Error("wrong topic"));
    } else {
      console.log(
        "something is wrong, error in else section of authorizedPublish"
      );
      return callback(new Error("somethong error"));
    }
  } catch (error) {
    console.log(
      "something is wrong, error in catch section of authorizedPublish"
    );
    return callback(new Error("somethong error"));
  }
};
aedes.on("client", (client) => {
  console.log(`client ${client.id} passed authentication`);
});
aedes.on("connectionError", (client, error) => {
  console.log(`error : ${error}, on client ${client.id}`);
});
aedes.on("clientDisconnect", (client) => {
  console.log(`disconnect on client ${client.id}`);
});

setInterval(async () => {
  try {
    const receipt = await mqttbaru.methods
      .refreshToken()
      .send({ from: accounts[3] });
    if (receipt.status === false) {
      console.log(receipt);
      console.log("Trying Again, The Receipt from before is down below");
      const redo = await mqttbaru.methods
        .refreshToken()
        .send({ from: accounts[3] });
      token = redo.events.ref_token.returnValues[0];
    } else {
      token = receipt.events.ref_token.returnValues[0];
      console.log("token now : ");
      console.log(receipt.events.ref_token.returnValues[0]);
      console.log(receipt.events.check.returnValues[0]);
    }
  } catch (error) {
    console.log(error);
    console.log("Something's Wrong");
  }
}, 90000);
