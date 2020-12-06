// MQTT publisher
const mqtt = require('mqtt')
var options = {
    clientId: "0",
    username: "client1",
    password: "12345"
}
var client = mqtt.connect('mqtt://localhost:8001', options)
var topic = 'speed'
message = 'Hello World!'
console.log('Membuat koneksi dengan broker')
client.on('connect', () => {
    console.log(`Memulai koneksi dengan broker dengan id: ${options.clientId}, username: ${options.username}, dan password: ${options.password}`)
    setInterval(() => {
        console.log(`Mencoba publish pesan: ${message} dengan topic: ${topic}`)
        client.publish(topic, message)
    }, 15000)
})

client.on('close', () => {
    client.end();
})

