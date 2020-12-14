const express = require('express');
const jsaes = require('jsaes');
const dbConnection = require('../sql/sql');

const userRouter = express.Router();

userRouter.param('userId', (req, res, next, userId) => {
    const sql = 'SELECT * FROM Users WHERE Users.user_id=' + userId;
    
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, function(err, user){
                if(err){
                    next(err);
                } else {
                    if(user.length > 0){
                        req.user = user;
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

userRouter.get('/', (req, res, next) => {
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query("SELECT * FROM Users", function(err, users){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(200).json({users: users});
                }
                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

userRouter.get('/:userId', (req, res, next) => {
    res.status(200).json({user: req.user});
});

userRouter.post('/', (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    //Check that all required fields exist, else send a 400 error
    if(!userName || !password || !email || !firstName || !lastName){
        res.sendStatus(400);
    }

    //Get the current date and convert it to MySQL DATE format
    let signUpDate;
    signUpDate = new Date();
    signUpDate = signUpDate.getUTCFullYear() + '-' +
    ('00' + (signUpDate.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + signUpDate.getUTCDate()).slice(-2) + ' ' + 
    ('00' + signUpDate.getUTCHours()).slice(-2) + ':' + 
    ('00' + signUpDate.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + signUpDate.getUTCSeconds()).slice(-2);
    console.log(`SignUpDate: ${signUpDate}`);

    //Encrypt password using AES 256-bit encryption
    jsaes.AES_Init();

    let key = new Array(32);
    for(let i = 0; i < 32; i++){
        key[i] = i;
    }

    jsaes.AES_ExpandKey(key);
    jsaes.AES_Encrypt(password, key);

    jsaes.AES_Done();

    //Insert values into database
    const sql = 'INSERT INTO Users (user_name, password_hash, email, first_name, last_name, member_since)' + 
        ' VALUES (?, ?, ?, ?, ?, ?)';
    const values = [userName, password, email, firstName, lastName, signUpDate];

    //Run the SQL to add user to the database
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, user){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(201).json({user: user});
                }
                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

module.exports = userRouter;