const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { nextTick } = require("process");
const db = require("./db.json");
const fs = require("fs");
const { getSystemErrorMap } = require("util");
const bcrypt = require("bcrypt");
const Database = require("../database/database.js");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.set("view engine", "pug");
const port = 80;

try {
    Database.connection.connect();
} catch (error) {
    console.log(error);
}

// post-requests

//login

app.post("/login", async (req, res) => {
    if (await checkAccount(req)) {
        res.send("Pizza ist Unterwegs");
    } else {
        res.sendFile(__dirname + "/public/errorPage.html");
    }
});

async function checkAccount(req) {
    var email = req.body.Email;
    var password = req.body.Passwort;
    try {
        var registeredUser;
        Database.findUser(email, (user) => {
            registeredUser = user;
            console.log(JSON.stringify(user));
        });
        if (await bcrypt.compare(password, registeredUser.password)) {
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
}

function findUserA(username) {
    var user;
    db.users.forEach((element) => {
        if (element.name == username) {
            user = element;
        }
    });
    return user;
}

//register

app.post("/register", async (req, res) => {
    if (await registerAccount(req)) {
        res.redirect("/login");
    } else {
        res.sendFile(__dirname + "/public/errorPage.html");
    }
});

async function registerAccount(req) {
    var password = await hashIt(req.body.Passwort);
    var user = {
        name: req.body.Name,
        email: req.body.Email,
        password: password,
        phone: req.body.Telefonnummer,
        plz: req.body.PLZ,
        adress: req.body.Adresse,
    };
    console.log(JSON.stringify(user));
    if (!alreadyExists(user.email)) {
        Database.addUser(user);
        return true;
    } else {
        return false;
    }
}

async function hashIt(password) {
    var encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
}

function saveDB(db) {
    fs.writeFile("db.json", JSON.stringify(db, null, 4), "utf8", (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function alreadyExistsJ(name) {
    var exists = false;
    db.users.forEach((element) => {
        if (element.name == name) {
            console.log("True");
            exists = true;
        }
    });
    return exists;
}

function alreadyExists(email) {
    var exists = false;
    Database.findUser(email, (user) => {
        if (user != null) {
            exists = true;
        }
    });
    return exists;
}

//select pizza

app.post("/menu", (req, res) => {
    console.log(req.body);
    res.redirect("/login");
});

//function add

// get-requests

app.get("/", (req, res) => {
    Database.findUser("paul.huefner@gmail.com", (user) => {
        console.log(user.name);
    });
    res.sendFile(__dirname + "/public/homepage.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/register.html");
});

app.get("/menu", async (req, res) => {
    Database.getPizza((err, result) => {
        if (err) res.sendFile(__dirname + "/public/errorPage.html");
        else res.render("index.pug", { title: "Pizzarando", data: result });
    });
});

app.listen(port, () => {
    console.log("Server gestartet auf Port:" + port);
});
