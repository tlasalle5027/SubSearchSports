const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

module.exports = {
    verifyToken: function(req, res, next){
        const token = req.headers["access-token"];

        if (!token) {
            return res.status(403).send({
              message: "No token provided!"
            });
        }
        
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
              return res.status(401).send({
                message: "User Unauthorized!"
              });
            }

            req.userId = decoded.id;
            next();
        });
    }
};