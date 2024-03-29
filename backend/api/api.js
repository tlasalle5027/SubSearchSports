const express = require('express');
const userRouter = require('./users');
const sportRouter = require('./sports');
const adRouter = require('./ads');
const authRouter = require('../auth/auth');
const profileRouter = require('./profiles');
const searchRouter = require('./search');

const apiRouter = express.Router();
apiRouter.use('/user', userRouter);
apiRouter.use('/user/profile', profileRouter);
apiRouter.use('/sport', sportRouter);
apiRouter.use('/ad', adRouter);
apiRouter.use('/user/auth', authRouter);
apiRouter.use('/search', searchRouter);

module.exports = apiRouter;