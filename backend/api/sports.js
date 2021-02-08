const express = require('express');
const { dbConnection } = require('../sql/sql');

const sportRouter = express.Router();

//Param middleware for the sport Id
sportRouter.param('sportId', (req, res, next, sportId) => {
    const sql = 'SELECT * FROM Sports WHERE Sports.sport_id=?';
    const values = [sportId];
    
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, sport){
                if(err){
                    next(err);
                } else {
                    if(sport.length > 0){
                        req.sport = sport;
                        next();
                    } else {
                        res.sendStatus(404);
                    }
                }                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

//Get a JSON object containing all sports in the database
sportRouter.get('/', (req, res, next) => {
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query("SELECT * FROM Sports", function(err, sports){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(200).json({sports: sports});
                }
                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

//Get a count of all sports
sportRouter.get('/count', (req, res, next) => {
    const sql = "SELECT COUNT(*) AS sport_count FROM Sports";

    //Run the SQL to get sport Count
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, function(err, sports){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(200).json({count: sports[0].sport_count});
                }                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

//Get a single sport from the database by Sport Id
sportRouter.get('/:sportId', (req, res, next) => {
    res.status(200).json({sport: req.sport});
});

module.exports = sportRouter