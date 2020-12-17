const express = require('express');
const userRouter = require('./users');
const adRouter = require('./ads');

const apiRouter = express.Router();
apiRouter.use('/user', userRouter);
apiRouter.use('/ad', adRouter);

module.exports = apiRouter;