//database connection
const mysql = require("../server/node_modules/mysql");

var connection = mysql.createConnection({
    host: "192.168.1.100",
    user: "pizza",
    password: "",
    database: "pizzarando",
    port: 3306,
});

function findUser(email, callback) {
    connection.query(
        "SELECT * FROM person, kunde WHERE person.pID = kunde.pID AND email LIKE ?",
        [email],
        (err, result) => {
            if (err) {
                throw err;
            } else if (result[0] != undefined) {
                callback(result[0]);
            }
        }
    );
}

function addUser(user) {
    var usercount = 0;
    connection.query("SELECT MAX(pID) FROM person", (err, result) => {
        usercount = result[0].MAX(pID) + 1;
        console.log(result[0].MAX(pID));
    });
    console.log(usercount);
    var fname = user.name.split(",")[0];
    var lname = user.name.split(",")[1].split(" ").join("");
    var values = [usercount, lname, fname, user.email];
    connection.query(
        "INSERT INTO person(pID, name, vorname, email) VALUES (?)",
        [values],
        (err, result) => {
            if (err) throw err;
            console.log(result);
        }
    );
    values = [
        usercount,
        user.plz,
        user.phone,
        user.adress.split(",")[0],
        user.adress.split(",")[1].split(" ").join(""),
    ];
    connection.query(
        "INSERT INTO kunde(pID, plz, telNr, straße, hausNr) VALUES (?)",
        [values],
        (err, result) => {
            if (err) throw err;
            console.log(result);
        }
    );
}

function getPizza(callback) {
    connection.query("SELECT * FROM pizza", (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

module.exports = {
    connection,
    findUser,
    getPizza,
    addUser,
};
