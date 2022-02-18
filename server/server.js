const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { nextTick } = require("process");
const app = express();
const db = require("./db.json");

app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.urlencoded());
const port = 3000;

app.post("/login", (req, res) => {
    var username = req.body.Benutzername;
    var password = req.body.Passwort;
    db.user.forEach(element => {
        console.log(element.name);
        console.log(element.password);
        if (element.name == username && element.password == password) {
            res.redirect("/homepage");
        }
    });
    res.redirect("/");
});

app.get("/homepage", (req, res) => {
    res.sendFile(__dirname + "/public/homepage.html");
});

app.listen(port, () => {
    console.log("Server gestartet auf Port:" + port);
});