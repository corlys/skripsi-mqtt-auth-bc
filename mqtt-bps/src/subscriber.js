// MQTT subscriber
const mqtt = require('mqtt');


clientId = '1';

var options = {
    clientId: clientId,
    username: "noodles",
    password: "spicy"
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