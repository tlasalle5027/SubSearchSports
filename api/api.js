const express = require('express');
const userRouter = require('./users');

const apiRouter = express.Router();
apiRouter.use('/user', userRouter);

module.exports = apiRouter;