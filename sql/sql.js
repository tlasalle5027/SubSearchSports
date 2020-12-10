const mySQL = require('mysql2');

const connection = mySQL.createConnection({
    host: "46.17.175.35",
    user: "u654695621_jajy",
    password: "meMaNeVeVy",
    database: "u654695621_jajy",
    port: 3306
});

module.exports = connection;