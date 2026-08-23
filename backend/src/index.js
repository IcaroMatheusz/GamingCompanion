const express = require("express");

const app = express()

app.get("/api/status", (req,res) => {
    res.json({
        status: "online",
        message: "Gaming Companion Backend funcionando"
    });
});

app.listen(3000, () => {
    console.log("Backend rondando na porta 3000")
})