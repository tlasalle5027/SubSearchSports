const express = require('express');
const jsaes = require('jsaes');
const dbConnection = require('../sql/sql');

const profileRouter = express.Router();

module.exports = profileRouter;