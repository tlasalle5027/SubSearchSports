const express = require('express');
const dbConnection = require('../sql/sql');

const adRouter = express.Router();

//Param middleware for the ad Id
adRouter.param('adId', (req, res, next, adId) => {
    const sql = 'SELECT * FROM Ads WHERE Ads.ad_id=?';
    const values = [adId];
    
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, ad){
                if(err){
                    next(err);
                } else {
                    if(ad.length > 0){
                        req.ad = ad;
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

//Get a JSON object containing all ads in the database
adRouter.get('/', (req, res, next) => {
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query("SELECT * FROM Ads", function(err, ads){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(200).json({ads: ads});
                }
                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

//Get a single ad from the database by User Id
userRouter.get('/:adId', (req, res, next) => {
    res.status(200).json({ad: req.ad});
});


module.exports = adRouter;