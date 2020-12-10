const express = require('express');
const dbConnection = require('../sql/sql');

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(404);
        } else {
            // Do something with the connection
            conn.query("SELECT * FROM Users", function(err, rows, fields){
                res.status(200).send(rows);
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
     });
});

module.exports = userRouter;