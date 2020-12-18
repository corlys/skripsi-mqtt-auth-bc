const options = {
    id: "inibroker"
}
const web3 = require("./eth/web3-private");
const mqttbaru = require("./eth/mqttbaru");
const aedes = require('aedes')(options)
const server = require('net').createServer(aedes.handle)
const PORT = 8001

let account = "";
let accounts = [];
let token = "";

server.listen(PORT, async () => {
    try {
        // account = '0xDaFA7Bc0a066CBBDE48cf970EEB4C67A495a1277';
        // account = await web3.eth.personal.importRawKey("edbf799e35bcc79d738094d5e04106b026c20dff9d5dcbe12f4a7d63fba54c12", "pass123").then(console.log)
        accounts = await web3.eth.getAccounts();
        web3.eth.personal.unlockAccount(accounts[1], 'pass123', 480)
        console.log(`attempting getting token from ${accounts[1]}`)
        let receipt = await mqttbaru.methods.refreshToken().send({ from: accounts[1] })
        token = receipt.events.ref_token.returnValues[0]
        // console.log(receipt)
        console.log(receipt.status)
        console.log(`Server ${accounts[1]} with ${token} started listening on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})

aedes.authenticate = async (client, username, password, callback) => {
    try {
        console.log(`client ${client.id} is entering authentication block in broker(${token}) with ${password} as password`)
        const _password = Buffer.from(password).toString()
        const authblock = await mqttbaru.methods.authenticate(token, client.id, username, _password).call({ from: accounts[1] });
        if (authblock) {
            callback(null, true)
        } else if (!authblock) {
            console.log(`client ${client.id} is not passing authentication block with ${password} as password`)
            var error = new Error('Identifier error')
            error.returnCode = 2
            callback(error, null)
        } else {
            console.log('somethings wrong on Auth Block')
        }
    } catch (error) {
        console.log(error)
    }
}

aedes.authorizePublish = async (client, packet, callback) => {
    try {
        console.log(`client ${client.id} is entering authorization block`)
        const authblock = await mqttbaru.methods.authorize(token, client.id, packet.topic).call({ from: accounts[1] });
        if (authblock) {
            callback(null)
            console.log(`client ${client.id} is authorized to publish with topic : ${packet.topic}`)
        } else if (!authblock) {
            console.log(`client ${client.id} is not authorized to publish with topic : ${packet.topic}`)
            var error = new Error('Identifier error')
            error.returnCode = 2
            callback(error)
        } else {
            console.log('somethings wrong on Auth Block')
            var error = new Error('Identifier error')
            error.returnCode = 2
            callback(error)
        }
    } catch (error) {
        console.log('somethings wrong on Auth Block')
        var error = new Error('Identifier error')
        error.returnCode = 2
        callback(error)
    }
}

aedes.authorizeSubscribe = async (client, packet, callback) => {
    try {
        console.log(`client ${client.id} is entering authorization block`)
        const authblock = await mqttbaru.methods.authorize(token, client.id, packet.topic).call({ from: accounts[1] });
        if (authblock) {
            console.log(`client ${client.id} is authorized to subscribe with topic : ${packet.topic}`)
            callback(null, packet)
        } else if (!authblock) {
            console.log(`client ${client.id} is not authorized to subscribe with topic : ${packet.topic}`)
            return callback(new Error('wrong topic'))
        } else {
            console.log('something is wrong, error in else section of authorizedPublish')
            return callback(new Error('somethong error'))
        }
    } catch (error) {
        console.log('something is wrong, error in catch section of authorizedPublish')
        return callback(new Error('somethong error'))
    }
}
aedes.on('client', (client) => {
    console.log(`client ${client.id} passed authentication`)
})
aedes.on("connectionError", (client, error) => {
    console.log(`error : ${error}, on client ${client.id}`)
})
aedes.on("clientDisconnect", (client) => {
    console.log(`disconnect on client ${client.id}`)
})

setInterval(async () => {
    try {
        const receipt = await mqttbaru.methods.refreshToken().send({ from: accounts[1] })
        // console.log("receipt : ")
        // console.log(receipt)

        if (receipt.status === false) {
            console.log(receipt)
            console.log('Trying Again, The Receipt from before is down below')
            const redo = await mqttbaru.methods.refreshToken().send({ from: accounts[1] })
            token = redo.events.ref_token.returnValues[0]
        } else {
            token = receipt.events.ref_token.returnValues[0]
            console.log('token now : ')
            console.log(receipt.events.ref_token.returnValues[0])
            console.log(receipt.events.check.returnValues[0])
        }
    } catch (error) {
        console.log(error)
        console.log("Something's Wrong")
        // console.log(receipt)
    }
}, 90000)


