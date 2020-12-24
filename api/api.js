const express = require('express');
const userRouter = require('./users');
const sportRouter = require('./sports');
const adRouter = require('./ads');
const profileRouter = require('./profiles');

const apiRouter = express.Router();
apiRouter.use('/user', userRouter);
apiRouter.use('/user/profile', profileRouter);
apiRouter.use('/sport', sportRouter);
apiRouter.use('/ad', adRouter);

module.exports = apiRouter;