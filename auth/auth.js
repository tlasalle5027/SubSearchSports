const express = require('express');
const jsaes = require('jsaes');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { dbConnection } = require('../sql/sql');

const authRouter = express.Router();

authRouter.post('/login', (req, res, next) => {
    

});

module.exports = authRouter;