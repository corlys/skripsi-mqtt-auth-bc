// MQTT subscriber
const mqtt = require("mqtt");
var options = {
  clientId: "1",
  username: "client2",
  password: "password",
};
var client = mqtt.connect("mqtt://localhost:8001", options);
var topic = "speed";
client.on("connect", () => {
  client.subscribe(topic);
});
client.on("message", (topic, message) => {
  message = message.toString();
  console.log(message, " with ", topic, "as topic");
});
client.on("close", () => {
  console.log("client close");
  client.end();
});
