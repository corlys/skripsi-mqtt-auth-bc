// MQTT subscriber
const mqtt = require('mqtt');



var options = {
    clientId: "1",
    username: "hisyam",
    password: "waketu"
}

var client = mqtt.connect('mqtt://localhost:8001', options)
var topic = 'temp'

client.on('connect', () => {
    client.subscribe(topic)
})

client.on('message', (topic, message) => {
    message = message.toString()
    console.log(message)
})