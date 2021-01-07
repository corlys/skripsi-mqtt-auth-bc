import express from 'express';
import bodyParser from "body-parser";

// import authRoutes from "./routes/authenticate.js";
// import authoRoutes from "./routes/authorize.js";
import clientRoutes from "./routes/client.js";
import brokerRoutes from "./routes/broker.js";
import topicRoutes from "./routes/topic.js";
import logRoutes from "./routes/log.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// app.use("/authenticate", authRoutes)
// app.use("/authorize", authoRoutes)
app.use("/client", clientRoutes)
app.use("/broker", brokerRoutes)
app.use("/topic", topicRoutes)
app.use("/log", logRoutes)


//Routes
// /authenticate/ (POST)
// /authorize/(POST)

app.get('/', (requst, response) => {
    response.send('Hello from homepage')
})

app.listen(PORT, () => {
    console.log(`Server running on : http://localhost:${PORT}`)
})

