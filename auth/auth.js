const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { dbConnection } = require('../sql/sql');

const authRouter = express.Router();

authRouter.post('/login', (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password

    if(!userName || !password){
        res.sendStatus(400);
    }

    const sql = "SELECT * from Users WHERE Users.user_name = ?";
    const values = [userName];

    dbConnection.getConnection(function(err, conn) {
        if(err){
            res.sendStatus(500);
        } else {
            // Do something with the connection
            conn.query(sql, values, function(err, user){
                if(err){
                    res.sendStatus(404);
                } else {
                    if(user.length == 0){
                        return res.status(404).send({message: "User not found"});
                    }
    
                    if(!(bcrypt.compareSync(password, user[0].password_hash))){
                        return res.status(401).send({
                            accessToken: null,
                            message: "Invalid Password!"
                        });
                    }
    
                    var token = jwt.sign({id: user.user_id}, config.secret, {
                        expiresIn: 129600
                    });
    
                    res.status(200).send({
                        id: user[0].user_id,
                        userName: user[0].user_name,
                        email: user[0].email,
                        firstName: user[0].first_name,
                        lastName: user[0].last_name,
                        accessToken: token
    
                    });
                }                
            });
            // Don't forget to release the connection when finished!
            dbConnection.releaseConnection(conn);
        }
    });
});

module.exports = authRouter;