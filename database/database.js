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
        "SELECT * FROM person WHERE email LIKE ?",
        [email],
        (err, result) => {
            if (err) {
                throw err;
            } else if (result[0] != undefined) {
                callback(result[0].name);
            }
        }
    );
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

module.exports = {
    connection,
    findUser,
    getPizza,
};
