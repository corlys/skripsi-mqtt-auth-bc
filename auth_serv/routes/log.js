import express from "express";
import web3 from "../eth/web3-private.js";
import mqttbaru from "../eth/mqttbaru.js";

const router = express.Router();

let accounts = []

async function populateAccounts() {
    try {
        accounts = await web3.eth.getAccounts(); //manajer accounts[5]
    } catch (error) {

    }
}

router.get("/", async (req, res) => {
    try {
        var logs = await mqttbaru.methods.getLog().call({ from: accounts[5] });
        res.send(logs)
    } catch (error) {
        console.log("Somethings Wrong on GET CLIENT")
    }
})

populateAccounts()
export default router



