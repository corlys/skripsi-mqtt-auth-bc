// MQTT publisher
const mqtt = require('mqtt')

clientId = '0';
var options = {
    clientId: clientId,
    username: "candy",
    password: "cone"
}

var client = mqtt.connect('mqtt://localhost:8001', options)
var topic = 'temp'
message = 'Hello World!'
client.on('connect', async () => {
    // console.log(client)
    setInterval(() => {
        client.publish(topic, message)
        console.log('Message sent!', message)
    }, 5000)
})