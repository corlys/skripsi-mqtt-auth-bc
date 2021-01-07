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
        console.log(accounts)
        var clients = await mqttbaru.methods.getClients().call({ from: accounts[5] });
        res.send(clients)
    } catch (error) {
        console.log("Somethings Wrong on GET CLIENT")
        console.log(error)
    }
})

router.post("/add", async (req, res) => {
    try {
        console.log(`Adding with Account : ${accounts[5]}`)
        const { username, password } = req.body;
        var transaction = await mqttbaru.methods.addClient(username, password).send({ from: accounts[5] })
        console.log(`Berhasil Menambahkan Client dengan Username:${username} dan Password:${password}`)
        res.send(transaction)
    } catch (error) {
        console.log("Somethings Wrong on ADD CLIENT")
        console.log(error)
    }
})

router.post("/delete", async (req, res) => {
    try {
        const { id } = req.body;
        var transaction = await mqttbaru.methods.deleteClient(id).send({ from: accounts[5] })
        res.send(transaction)
    } catch (error) {
        console.log("Somethings Wrong on DELETE CLIENT")
    }
})

populateAccounts()
export default router


