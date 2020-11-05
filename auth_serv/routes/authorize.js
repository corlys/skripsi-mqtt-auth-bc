import express from "express";
import web3 from "../eth/web3.js";
import mqttsc from "../eth/mqttsc.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send(clients);
})

router.post("/", (req, res) => {
    const { id, topic } = req.body
    let accounts = [];
    web3.eth.getAccounts().then(_accounts => {
        accounts = _accounts
        // console.log(accounts)
        mqttsc.methods.authorize(id, topic).call({ from: accounts[0] }).then(_bool => {
            const authorized = _bool
            if (authorized) {
                console.log(`client ${id} authorized untuk menggunakan topik ${topic}`)
                res.send("YES")
            } else {
                console.log(`client ${id} tidak authorized untuk menggunakan topik ${topic}`)
                res.send("NO")
            }
        })
    })
    // console.log(req.body)
})

export default router;
