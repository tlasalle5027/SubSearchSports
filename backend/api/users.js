const express = require('express');
const bcrypt = require('bcrypt');
const {dbConnection, multiStatementPool} = require('../sql/sql');
const verification = require('../auth/user_verify');
const verifyToken = verification.verifyToken;

const userRouter = express.Router();

/*
 * Helper function to Hash Password
 */
const passwordHash = function(password){
    const salt = bcrypt.genSaltSync();
    const hashword = bcrypt.hashSync(password, salt);
    
    return hashword;
}

/*
 * Helper middleware to check if Username
 * exists in the system
 */
const userNameExists = function(req, res, next){

    //Check if userName is in use
    const sql = "SELECT * FROM Users WHERE Users.user_name = ?";
    const values = [req.body.userName];

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
                        res.status(400).send(
                            {message: "Error! Username is already in use"}
                        );
                        return;
                    } else {
                        next();
                    }
                }                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
}

/*
 * Helper middleware to check if eMail
 * exists in the system
 */
const emailExists = function(req, res, next){

    //Check if userName is in use
    const sql = "SELECT * FROM Users WHERE Users.email = ?";
    const values = [req.body.email];

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
                        res.status(400).send(
                            {message: "Error! e-Mail address is already in use"}
                        );
                        return;
                    } else {
                        next();
                    }
                }                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
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

//Get a count of all users
userRouter.get('/count', (req, res, next) => {

    const sql = "SELECT COUNT(*) AS user_count FROM Users";

    //Run the SQL to get user Count
    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, function(err, users){
                if(err){
                    res.sendStatus(404);
                } else {
                    res.status(200).json({count: users[0].user_count});
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
userRouter.post('/', userNameExists, emailExists, (req, res, next) => {
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
    const hashword = passwordHash(password);

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
    const values = [userName, hashword, email, firstName, lastName, signUpDate];

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
userRouter.put('/:userId', verifyToken, (req, res, next) => {
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
userRouter.put('/:userId/addPro', verifyToken, (req, res, next) => {
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
userRouter.put('/:userId/removePro', verifyToken, (req, res, next) => {
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
userRouter.delete('/:userId', verifyToken, (req, res, next) => {
    const userId = req.params.userId;

    //To delete a user, we must also delete all the ads the user
    //posted, as well as their profile.
    const sql = "DELETE FROM Ads where Ads.posted_by_id = ?;" + 
                "DELETE FROM Profiles where Profiles.profile_id = ?;" + 
                "DELETE FROM Users where Users.user_id = ?";
    const values = [userId, userId, userId];

    //Run the SQL to delete the user
    multiStatementPool.getConnection(function(err, conn) {
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