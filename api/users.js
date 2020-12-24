const express = require('express');
const jsaes = require('jsaes');
const dbConnection = require('../sql/sql');

const userRouter = express.Router();

/*
 * Helper function to Hash Password
 */
const passwordHash = function(password){
    //Encrypt password using AES 256-bit encryption
    jsaes.AES_Init();

    let key = new Array(32);
    for(let i = 0; i < 32; i++){
        key[i] = i;
    }

    jsaes.AES_ExpandKey(key);
    jsaes.AES_Encrypt(password, key);

    jsaes.AES_Done();
}

//Param middleware for the user Id
userRouter.param('userId', (req, res, next, userId) => {
    const sql = 'SELECT * FROM Users WHERE Users.user_id=?';
    const values = [userId];
    
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, user){
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

//Get a JSON object containing all users in the database
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

//Get a single user from the database by User Id
userRouter.get('/:userId', (req, res, next) => {
    res.status(200).json({user: req.user});
});

//Add a new user to the database
//Note: Pro Member defaults to 0 (false)
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

    //Hash the password
    passwordHash(password);

    //Get the current date and convert it to MySQL DATE format
    let signUpDate;
    signUpDate = new Date();
    signUpDate = signUpDate.getUTCFullYear() + '-' +
    ('00' + (signUpDate.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + signUpDate.getUTCDate()).slice(-2) + ' ' + 
    ('00' + signUpDate.getUTCHours()).slice(-2) + ':' + 
    ('00' + signUpDate.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + signUpDate.getUTCSeconds()).slice(-2);
    
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

//Make a change to user information
userRouter.put('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    //Check that all required fields exist, else send a 400 error
    if(!userName || !password || !email || !firstName || !lastName){
        res.sendStatus(400);
    }

    //Hash the password
    passwordHash(password);

    const sql = "UPDATE Users SET user_name = ?, password_hash = ?, email = ?, first_name = ?, last_name = ? " + 
        "WHERE Users.user_id = ?";
    const values = [userName, password, email, firstName, lastName, userId];

    //Run the SQL to edit the users database entry
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, user){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(200).json({user: user});
                }
                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

//Add a PRO membership to a particular user
userRouter.put('/:userId/addPro', (req, res, next) => {
    const userId = req.params.userId;

    const sql = "UPDATE Users SET pro_member = 1 WHERE Users.user_id = ?";
    const values = [userId];

    //Run the SQL to add PRO membership
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, user){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(200).json({user: user});
                }                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

//Remove a PRO membership from a particular user
userRouter.put('/:userId/removePro', (req, res, next) => {
    const userId = req.params.userId;

    const sql = "UPDATE Users SET pro_member = 0 WHERE Users.user_id = ?";
    const values = [userId];

    //Run the SQL to add PRO membership
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, user){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(200).json({user: user});
                }                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

//Delete a user
userRouter.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId;

    const sql = "DELETE FROM Users where Users.user_id = ?";
    const values = [userId];

        //Run the SQL to delete the user
        dbConnection.getConnection(function(err, conn) {
            if(err){
                res.sendStatus(500);
            } else {
                // Do something with the connection
                conn.query(sql, values, function(err, user){
                    if(err){
                        res.sendStatus(404);
                    } else {
                        res.sendStatus(204);
                    }                
                });
                // Don't forget to release the connection when finished!
                dbConnection.releaseConnection(conn);
            }
        });

});

module.exports = userRouter;