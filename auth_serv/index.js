import express from 'express';
import bodyParser from "body-parser";

import authRoutes from "./routes/authenticate.js";
import authoRoutes from "./routes/authorize.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/authenticate", authRoutes)
app.use("/authorize", authoRoutes)

//Routes
// /authenticate/ (POST)
// /authorize/(POST)

app.get('/', (requst, response) => {
    response.send('Hello from homepage')
})

app.listen(PORT, () => {
    console.log(`Server running on : http://localhost:${PORT}`)
})

