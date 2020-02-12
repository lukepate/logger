const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require('./config/winston');

app.use(morgan("combined", { stream: logger.stream.write }));

app.get('/', function(req, res) {
    throw new Error('error thrown navigating to');
});

// Error handler middleware
app.use(function(err, req, res, next) {
  logger.error(`${req.method} - ${req.originalUrl} - ${err.message} - ${req.ip}`);
  next(err)
})  

app.listen(8080);