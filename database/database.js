//database connection
const { syncBuiltinESMExports } = require("module");
const { threadId } = require("worker_threads");
const mysql = require("../server/node_modules/mysql");

var connection = mysql.createConnection({
    host: "192.168.1.100",
    user: "pizza",
    password: "",
    database: "pizzarando",
    port: 3306,
});

function findUser(email) {
    return new Promise((user) => {
        connection.query(
            "SELECT * FROM person, kunde WHERE person.pID = kunde.pID AND person.email LIKE ?;",
            [email],
            (err, result) => {
                if (err) throw err;
                user(result[0]);
            }
        );
    });
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
            if (err) throw err;
            connection.query(
                "INSERT INTO kunde SELECT MAX(pID), ? FROM person;",
                [valuesK],
                (err, result) => {
                    if (err) throw err;
                }
            );
        }
    );
}

function getPizza() {
    return new Promise((pizza) => {
        connection.query("SELECT * FROM pizza;", (err, result) => {
            if (err) {
                throw err;
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
