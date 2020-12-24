const express = require('express');
const dbConnection = require('../sql/sql');

const adRouter = express.Router();

const formatDate = function(date){
    date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);

    return date;
}

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

//Get a single ad from the database by Ad Id
adRouter.get('/:adId', (req, res, next) => {
    res.status(200).json({ad: req.ad});
});

//Add a new ad to the database
adRouter.post('/', (req, res, next) => {
    const posterId = req.body.postedBy;
    const datePosted = formatDate(new Date());
    const dateNeeded = req.body.dateNeeded;
    const locName = req.body.locName;
    const locAddOne = req.body.locAddOne;
    const locAddTwo = req.body.locAddTwo;
    const locCity = req.body.locCity;
    const locState = req.body.locState;
    const locZip = req.body.locZip;
    const sportNeeded = req.body.sportNeeded;
    const posNeeded = req.body.posNeeded;
    const adBody = req.body.adBody;

    if(!posterId || !dateNeeded || !locName || !locAddOne || !locCity || 
        !locState || !locZip || !sportNeeded || !posNeeded || !adBody){
            res.sendStatus(400);
        }

    const sql = 'INSERT INTO Ads (posted_by_id, date_posted, date_needed, location_name, ' + 
    'location_address_one, location_address_two, location_city, location_state, location_zip, ' + 
    'sport_needed, position_needed, ad_body)' + 
    ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [posterId, datePosted, dateNeeded, locName, locAddOne, locAddTwo, locCity, 
                    locState, locZip, sportNeeded, posNeeded, adBody];
                    
    //Run the SQL to add an ad to the database
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, ad){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(201).json({ad: ad});
                }
                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});


module.exports = adRouter;