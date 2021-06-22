import express from "express";
import web3 from "../eth/web3-private.js";
import mqttbaru from "../eth/mqttbaru.js";

const router = express.Router();

let accounts = [];

async function populateAccounts() {
  try {
    accounts = await web3.eth.getAccounts(); //manajer accounts[5]
  } catch (error) {}
}

router.get("/", async (req, res) => {
  try {
    var brokers = await mqttbaru.methods
      .getBroker()
      // .call({ from: accounts[5] });
      .call({ from: accounts[3] });
    res.send(brokers);
    console.log("[GET] / on broker");
  } catch (error) {
    console.log(error);
    console.log("Somethings Wrong on GET BROKER");
  }
});

router.get("/token/:address", async (req, res) => {
  try {
    const address = req.params.address;
    var brokers = await mqttbaru.methods
      .getBrokerToken(address)
      .call({ from: accounts[5] });
    res.send(brokers);
  } catch (error) {
    console.log("Somethings Wrong on GET BROKER");
  }
});

router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const { address } = req.body;
    var transaction = await mqttbaru.methods
      .addBroker(address)
      .send({ from: accounts[5] });
    res.send(transaction);
  } catch (error) {
    console.log(error);
    console.log("Somethings Wrong on ADD BROKER");
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { address } = req.body;
    var transaction = await mqttbaru.methods
      .deleteBroker(address)
      .send({ from: accounts[5] });
    res.send(transaction);
  } catch (error) {
    console.log("Somethings Wrong on DELETE BROKER");
  }
});

populateAccounts();
export default router;
