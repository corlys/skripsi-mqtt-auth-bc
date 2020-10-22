import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send(clients);
})

router.post("/", (req, res) => {
    console.log('reach post route')
    res.send(req.body)
})

export default router;
