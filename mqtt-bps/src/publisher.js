// MQTT publisher
const mqtt = require('mqtt')


var options = {
    clientId: "0",
    username: "sss",
    password: "ketua"
}

var client = mqtt.connect('mqtt://localhost:8001', options)
var topic = 'temp'
message = 'Hello World!'
client.on('connect', async () => {
    // console.log(client)
    setInterval(() => {
        client.publish(topic, message)
        // console.log('Message sent!', message)
    }, 5000)
})

client.on('close', () => {
    client.end();
})