const express = require('express');
const jsaes = require('jsaes');
const dbConnection = require('../sql/sql');

const profileRouter = express.Router();

//Param middleware for the profile Id
profileRouter.param('profileId', (req, res, next, profileId) => {
    const sql = 'SELECT * FROM Profiles WHERE Profiles.profile_id=?';
    const values = [profileId];
    
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, profile){
                if(err){
                    next(err);
                } else {
                    if(profile.length > 0){
                        req.profile = profile;
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

//Get a single user profile from the database by User Id
profileRouter.get('/:profileId', (req, res, next) => {
    res.status(200).json({profile: req.profile});
});



module.exports = profileRouter;