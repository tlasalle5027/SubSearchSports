const express = require('express');
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
    

})

module.exports = userRouter;