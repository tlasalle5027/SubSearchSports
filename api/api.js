const express = require('express');
const userRouter = require('./users');
const sportRouter = require('./sports');
const adRouter = require('./ads');

const apiRouter = express.Router();
apiRouter.use('/user', userRouter);
apiRouter.use('/sport', sportRouter);
apiRouter.use('/ad', adRouter);

module.exports = apiRouter;