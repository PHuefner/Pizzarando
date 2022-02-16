const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname + "/public")));
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(".\\index.html");
});

app.listen(port, () => {
    console.log("Server gestartet auf Port:" + port);
});