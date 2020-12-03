const options = {
    id: "inibroker"
}
const aedes = require('aedes')(options)
const axios = require('axios')
const server = require('net').createServer(aedes.handle)
const PORT = 8001
server.listen(PORT, () => {
    console.log('Server started listening on port ', PORT)
})
aedes.authenticate = (client, username, password, callback) => {
    try {
        console.log(`client ${client.id} is entering authentication block with ${password} as password`)
        axios({
            method: "post",
            url: "http://localhost:5000/authenticate",
            data: {
                id: client.id,
                username: username,
                password: password
            }
        }).then((response) => {
            // console.log(response.data)
            if (response.data == "YES") {
                callback(null, true)
            } else {
                console.log(`client ${client.id} is not passing authentication block with ${password} as password`)
                var error = new Error('Identifier error')
                error.returnCode = 2
                callback(error, null)
            }
        }, (error) => {
            console.log(error)
            var error = new Error('Axios error')
            error.returnCode = 2
            callback(error, null)
        })
    } catch (error) {
        console.log(`${client.id} is somehow not passing`)
        var error = new Error('Identifier error')
        error.returnCode = 2
        callback(error, null)
    }
}
aedes.authorizePublish = (client, packet, callback) => {
    try {
        // console.log(`client ${client.id} is entering authorization block`)
        axios({
            method: "post",
            url: "http://localhost:5000/authorize",
            data: {
                id: client.id,
                topic: packet.topic
            }
        }).then((response) => {
            // console.log(response.data)
            if (response.data == "YES") {
                console.log(`client ${client.id} is authorized to publish with topic : ${packet.topic}`)
                callback(null)
            } else if (response.data == "NO") {
                console.log(`client ${client.id} is not authorized to publish with topic : ${packet.topic}`)
                var error = new Error('Identifier error')
                error.returnCode = 2
                callback(error)
            } else {
                console.log('something is wrong, error in else section of authorizedPublish')
                var error = new Error('Identifier error')
                error.returnCode = 2
                callback(error)
            }
        }, (error) => {
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}
aedes.authorizeSubscribe = (client, packet, callback) => {
    try {
        axios({
            method: "post",
            url: "http://localhost:5000/authorize",
            data: {
                id: client.id,
                topic: packet.topic
            }
        }).then((response) => {
            // console.log(response.data)
            if (response.data == "YES") {
                console.log(`client ${client.id} is authorized to subscribe with topic : ${packet.topic}`)
                callback(null, packet)
            } else if (response.data == "NO") {
                console.log(`client ${client.id} is not authorized to subscribe with topic : ${packet.topic}`)
                return callback(new Error('wrong topic'))
            } else {
                console.log('something is wrong, error in else section of authorizedPublish')
                return callback(new Error('somethong error'))
            }
        }, (error) => {
            console.log(error)
        })
    } catch (error) {
        return callback(new Error('something goes wrong topic'))
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
