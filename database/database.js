//database connection
const { connect } = require("http2");
const { syncBuiltinESMExports } = require("module");
const { threadId } = require("worker_threads");
const mysql = require("../server/node_modules/mysql");

var connection = mysql.createPool({
    host: "192.168.1.100", //ersetzen durch den Host ("localhost" für XAMPP)
    user: "pizza", //ersetzen durch "root"
    password: "", //ersetzen durch ""
    database: "pizzarando",
    port: 3306,
});

function findUser(email) {
    return new Promise((user) => {
        connection.query(
            "SELECT * FROM person, kunde WHERE person.pID = kunde.pID AND person.email LIKE ?;",
            [email],
            (err, result) => {
                if (err) console.log(err);
                user(result[0]);
            }
        );
    });
}

function addBestellung(pID, pNr) {
    var date = Date.now();
    connection.query("SELECT MAX(bID) FROM bestellung;", (err, result) => {
        if (err) console.log(err);
        if (result == null)
            connection.query(
                "INSERT INTO bestellung VALUES (0, ?);",
                [date],
                (err, result) => {
                    if (err) console.log(err);
                }
            );
        connection.query(
            "INSERT INTO bestellung SELECT MAX(bID) + 1, ? FROM bestellung;",
            [date],
            (err, result) => {
                if (err) console.log(err);
            }
        );
    });
    connection.query(
        "INSERT INTO bestellung_kunde SELECT MAX(bID) + 1, ? FROM bestellung;",
        [pID],
        (err, result) => {
            if (err) console.log(err);
        }
    );
    connection.query("INSERT INTO bestellung_pizza SELECT ?, ");
}

function addUser(user) {
    var valuesP = [
        user.name.split(",")[1].split(" ").join(""),
        user.name.split(",")[0],
        user.email,
    ];
    var valuesK = [
        user.plz,
        user.phone,
        user.adress.split(",")[0],
        user.adress.split(",")[1].split(" ").join(""),
        user.password,
    ];
    connection.query(
        "INSERT INTO person SELECT MAX(pID) + 1, ? FROM person;",
        [valuesP],
        (err, result) => {
            if (err) console.log(err);
            connection.query(
                "INSERT INTO kunde SELECT MAX(pID), ? FROM person;",
                [valuesK],
                (err, result) => {
                    if (err) console.log(err);
                }
            );
        }
    );
}

function getPizza() {
    return new Promise((pizza) => {
        connection.query("SELECT * FROM pizza;", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                pizza(result);
            }
        });
    });
}

module.exports = {
    connection,
    findUser,
    getPizza,
    addUser,
};
