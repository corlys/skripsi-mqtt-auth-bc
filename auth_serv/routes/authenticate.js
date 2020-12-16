import express from "express";
import web3 from "../eth/web3.js";
import mqttsc from "../eth/mqttsc.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send(clients);
})

router.post("/", async (req, res) => {
    const { id, username, password } = req.body
    const _password = Buffer.from(password).toString()
    let accounts = [];
    web3.eth.getAccounts().then(_accounts => {
        accounts = _accounts
        // console.log(accounts)
        mqttsc.methods.authenticate(id, username, _password).call({ from: accounts[0] }).then(_bool => {
            const authenticated = _bool
            if (authenticated) {
                console.log(`client ${id} dengan username : ${username} lolos authentication`)
                res.send("YES")
            } else {
                console.log(`client ${id} dengan username : ${username} tidak lolos authentication`)
                res.send("NO")
            }
        })
    })
    // console.log(req.body)
    // console.log(Buffer.from(req.body.password).toString());

})

export default router;
