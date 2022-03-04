const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { nextTick } = require("process");
const db = require("./db.json");
const fs = require("fs");
const { getSystemErrorMap } = require("util");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded());
const port = 3000;

// post-requests

    //login

app.post("/", async (req, res) => {
    if (await checkAccount(req)) {
        res.sendFile(__dirname + "/public/homepage.html");
    } else {
        res.sendFile(__dirname + "/public/errorPage.html");
    }
});

async function checkAccount(req) {
    var username = req.body.Benutzername;
    var password = req.body.Passwort;
    try {
        if (await bcrypt.compare(password, findUser(username).password)) {
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;   
}

function findUser(username) {
    var user;
    db.users.forEach(element => {
        if (element.name == username) {
            user = element;
        }
    });
    return user;
}

    //register

app.post("/register", async (req, res) => {
    if (await registerAccount(req)) {
        res.sendFile(__dirname + "/public/index.html");
    } else {
        res.sendFile(__dirname + "/public/errorPage.html");
    }
});

async function registerAccount(req) {
    var password = await hashIt(req.body.Passwort);
    console.log(password);
    var user = {
        "name" : req.body.Benutzername,
        "password" : password,
        "phone" : req.body.Telefonnummer,
        "plz" : req.body.PLZ,
        "adress" : req.body.Adresse
    };
    console.log(JSON.stringify(user));
    if (!alreadyExists(user.name)) {
        db.users.push(user);
        saveDB(db);
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

function alreadyExists(name) {
    var exists = false;
    db.users.forEach(element => {
        if (element.name == name) {
            console.log("True");
            exists = true;
        }
    });
    return exists;
}

// get-requests

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/register.html");
});

app.get("/menu", (req, res) => {
    res.sendFile(__dirname + "public/menu.html");
});

app.listen(port, () => {
    console.log("Server gestartet auf Port:" + port);
});

/* import mysql from "mysql";

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "social_media",
});

connection.connect();

const getUserById = (id) => {
  connection.query(`SELECT * FROM users where id = ${id}`, (err, results, fields) => {
    if (err) throw err;

    console.log("The solution is: ", results);
  });
};

getUserById(7);

connection.end(); */