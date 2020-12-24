const express = require('express');
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

//Post a new user profile to the database
profileRouter.post('/', (req, res, next) => {
    const profileId = req.body.profileId;
    const userCity = req.body.userCity;
    const userState = req.body.userState;
    const userZip = req.body.userZip;
    const profileBio = req.body.profileBio;
    const sportOne = req.body.sportOne;
    const sportOnePos = req.body.sportOnePos;
    const sportOneSkill = req.body.sportOneSkill;
    const sportTwo = req.body.sportTwo;
    const sportTwoPos = req.body.sportTwoPos;
    const sportTwoSkill = req.body.sportTwoSkill;
    const sportThree = req.body.sportThree;
    const sportThreePos = req.body.sportThreePos;
    const sportThreeSkill = req.body.sportThreeSkill;

    if(!profileId || !userCity || !userState || !userZip || !sportOne || 
        !sportOnePos || !sportOneSkill){
            res.sendStatus(400);
        }

        const sql = 'INSERT INTO Profiles (profile_id, user_city, user_state, user_zip, ' + 
        'profile_bio, sport_01, sport_01_positions, sport_01_skill, sport_02, ' + 
        'sport_02_positions, sport_02_skill, sport_03, sport_03_positions, sport_03_skill)' + 
        ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [profileId, userCity, userState, userZip, profileBio, sportOne, 
                        sportOnePos, sportOneSkill, sportTwo, sportTwoPos, sportTwoSkill, 
                        sportThree, sportThreePos, sportThreeSkill];

    //Run the SQL to add a profile to the database
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, profile){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(201).json({profile: profile});
                }
                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

//Update a user profile
profileRouter.put('/:profileId', (req, res, next) => {
    const profileId = req.params.profileId;
    const userCity = req.body.userCity;
    const userState = req.body.userState;
    const userZip = req.body.userZip;
    const profileBio = req.body.profileBio;
    const sportOne = req.body.sportOne;
    const sportOnePos = req.body.sportOnePos;
    const sportOneSkill = req.body.sportOneSkill;
    const sportTwo = req.body.sportTwo;
    const sportTwoPos = req.body.sportTwoPos;
    const sportTwoSkill = req.body.sportTwoSkill;
    const sportThree = req.body.sportThree;
    const sportThreePos = req.body.sportThreePos;
    const sportThreeSkill = req.body.sportThreeSkill;

    if(!profileId || !userCity || !userState || !userZip || !sportOne || 
        !sportOnePos || !sportOneSkill){
            res.sendStatus(400);
        }

    const sql = 'UPDATE Profiles SET user_city = ?, user_state = ?, user_zip = ?, profile_bio = ?, ' + 
                'sport_01 = ?, sport_01_positions = ?, sport_01_skill = ?, sport_02 = ?, sport_02_positions = ?, ' + 
                'sport_02_skill = ?, sport_03 = ?, sport_03_positions = ?, sport_03_skill = ? ' + 
                'WHERE Profiles.profile_id = ?';
    const values = [userCity, userState, userZip, profileBio, sportOne, sportOnePos, sportOneSkill, 
                    sportTwo, sportTwoPos, sportTwoSkill, sportThree, sportThreePos, sportThreeSkill, 
                    profileId];

    //Run the SQL to update the profile
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, profile){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(200).json({profile: profile});
                }
                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

module.exports = profileRouter;