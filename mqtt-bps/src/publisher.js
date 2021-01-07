// MQTT publisher
const mqtt = require('mqtt')
var options = {
    clientId: "0",
    username: "client1",
    password: "pass123"
}
var client = mqtt.connect('mqtt://localhost:8001', options)
var topic = 'temp'
message = 'Hello World!'
let pub = false
console.log('Membuat koneksi dengan broker')
client.on('connect', () => {
    console.log(`Memulai koneksi dengan broker dengan id: ${options.clientId}, username: ${options.username}, dan password: ${options.password}`)
    pub = setInterval(pub_func, 15000, topic, message)
})
client.on('close', () => {
    console.log('client close')
    clearInterval(pub);
    client.end();
})
function pub_func(_topic, _message) {
    console.log(`Mencoba publish pesan: ${message} dengan topic: ${topic}`)
    client.publish(_topic, _message)
}
