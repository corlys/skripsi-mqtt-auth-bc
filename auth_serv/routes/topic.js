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

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        var topics = await mqttbaru.methods.getTopic(id).call({ from: accounts[5] })
        res.send(topics)
    } catch (error) {
        console.log("Somethings Wrong on GET TOPIC")
        console.log(error)
    }
})

router.post("/add", async (req, res) => {
    try {
        const { id, topic } = req.body;
        var transaction = await mqttbaru.methods.addTopic(id, topic).send({ from: accounts[5] })
        res.send(transaction)
    } catch (error) {
        console.log("Somethings Wrong on ADD TOPIC")
    }
})

router.post("/delete", async (req, res) => {
    try {
        const { id, topic } = req.body;
        var transaction = await mqttbaru.methods.deleteTopic(id, topic).send({ from: accounts[5] })
        res.send(transaction)
    } catch (error) {
        console.log("Somethings Wrong on DELETE TOPIC")
    }
})

router.post("/update", async (req, res) => {
    try {
        const { id, oldtopic, newtopic } = req.body;
        var transaction = await mqttbaru.methods.updateTopic(id, oldtopic, newtopic).send({ from: accounts[5] })
        res.send(transaction)
    } catch (error) {
        console.log("Somethings Wrong on UPDATE TOPIC")
    }
})

populateAccounts()
export default router


