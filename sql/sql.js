const mySQL = require('mysql2');

const connection = mySQL.createConnection({
    host: "46.17.175.35",
    user: "u654695621_subadmin",
    password: "$u8A0M!n",
    database: "u654695621_SubSearchSport",
    port: 3306
});

module.exports = connection;