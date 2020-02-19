const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 8080

app.use(morgan("combined", { stream: logger.stream.write }));

app.get('/', function(req, res) {
    throw new Error('error thrown navigating to');
});

app.listen(port, console.log(`Listening on port ${port}!`));