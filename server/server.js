const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { nextTick } = require("process");
const db = require("./db.json");
const fs = require("fs");
const { getSystemErrorMap } = require("util");
const bcrypt = require("bcrypt");
const mysql = require("mysql");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.set("view engine", "pug");
const port = 3000;

// post-requests

    //login

app.post("/login", async (req, res) => {
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

function findUserA(username) {
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
    findUser("fabian.mueller@gmail.com");
    res.sendFile(__dirname + "/public/homepage.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/register.html");
});

app.get("/menu", async (req, res) => {
    //res.sendFile(__dirname + "public/menu.html");
    getPizza((err, result) => {
        if (err)
            res.sendFile(__dirname + "/public/errorPage.html");
        else
            res.render("index.pug", {title: "Pizzarando", data: result});
    })
});

app.listen(port, () => {
    console.log("Server gestartet auf Port:" + port);
});

//database connection

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pizzarando",
  });

try {
    connection.connect();
} catch (error) {
    console.log("No db.");
}

function findUser(email) {
    connection.query("SELECT * FROM person WHERE email LIKE ?", [email], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result[0].name);
    });
}

async function getPizza(callback) {
    connection.query("SELECT * FROM pizza", (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

// connection.end();