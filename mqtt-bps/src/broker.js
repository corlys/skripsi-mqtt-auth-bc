const aedes = require('aedes')
const axios = require('axios')

const server = require('net').createServer(aedes.handle)

const PORT = 8001



server.listen(port, () => {
    console.log('Server started listening on port ', PORT)
})

aedes.authenticate = (client, username, password, callback) => {
    try {
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
                console.log('clinet is authenticated')
                callback(null, true)
            } else {
                console.log('client is not valid')
                var error = new Error('Identifier error')
                error.returnCode = 2
                callback(error, null)
            }
        }, (error) => {
            console.log('axios error')
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
                console.log('clinet is authorized')
                callback(null, true)
            } else if (response.data == "NO") {
                console.log('client is not authorized to use ', packet.topic)
                var error = new Error('Identifier error')
                error.returnCode = 2
                callback(error, null)
            } else {
                console.log('something is wrong, error in else section of authorizedPublish')
                var error = new Error('Identifier error')
                error.returnCode = 2
                callback(error, null)
            }
        }, (error) => {
            console.log(error)
        })
    } catch (error) {

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
                console.log('clinet is authorized')
                callback(null, true)
            } else if (response.data == "NO") {
                console.log('client is not authorized to use ', packet.topic)
                var error = new Error('Identifier error')
                error.returnCode = 2
                callback(error, null)
            } else {
                console.log('something is wrong, error in else section of authorizedPublish')
                var error = new Error('Identifier error')
                error.returnCode = 2
                callback(error, null)
            }
        }, (error) => {
            console.log(error)
        })
    } catch (error) {

    }
}

