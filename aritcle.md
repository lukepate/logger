# Adding Server Logs to your Node.js App

# Why do we need  logging?

Any serious application with active users needs to be maintained. Part of that  maintenance phase consists of  analyzing your application's activity for potential bugs. Effective logging in some cases may become the last line of defense 


Ask anyone who's ever had to debug any serious production bug without efficient logging and they'll most likely agree and bring up some horror story.


## What Info should we log?

Obviously we don't want to observe every piece of activity on our application, but by storing the exceptions and errors, we might have a better chance of understanding bugs within our code as the users experience them. Best practice is to write meaningful logs. Cryptic logs are often just as helpful as having no logs at all.

As for what to send to the logs, that's more particular  to your applications and its individual components. Generally speaking, these types of things are safe to log.

- User Id's
- Timestamps
- log level/severity
- Error Messages 
- Status Codes 
- Methods

How should we log it?
// explain Console.log
// Explain winston.js 


## Prereqs?


Setting up proper logging can be overwhelming. In this tutorial, we're going to be creating a simple event log using Node.js and Winston.

### Step 1 - Set Up

To jump straight in, we're going to use the Express-Generator command line tool to scaffold out a simple Node.js API. If you aren't familiar, I definitely recommend looking more into Express-Generator and it's capabilities. 

 We'll start by installing express-generator.
```shell
touch app.js
```
Once the package is installed we're going use it to spin up an Express API. To create the app we use the 'express' keyword followed by the name of our new project.

```shell
npm init
npm i express
```

```javascript
const express = require('express')
const app = express()


app.get('/', function (req, res) {
res.send('Hello World')
})


app.listen(3000)
```


Next we'll add a utility to ensure our start scripts run continuously. Forever is a perfect solution for keeping our application up and logging activity. 

```shell
npm install -g forever
```
Before we get too far, let's spin up our API and make sure everything's setup correctly.

```shell
forever app.js
```
If you navigate your browser to localhost:3000, you should see your index file


Step 2 - Installing Winston
Now that our app is up and running, lets install Winston.
//add in more about the actual benefits of logging
npm install winston
We'll then create a config and logs folder for out log outputs

```shell
mkdir ./logs ./config 
```
Now we'll create a file for Winston Logger configuration and add some code to it.

```shell
touch ./config/winston.js
```
// go over actual logging details

```javascript
const winston = require('winston');
// creates a new Winston Logger
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
  ],
  exitOnError: false
});
module.exports = logger;
```

Step 3 - Adding Logs
Now we'll go to our app.js and import our Winston logger we just created
const winston = require('./config/winston');
Now we can start writing our errors to a file and log them. Let's add our first log. 

```javascript
// Finish When to log them
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
winston.error(`${err.status} - ${req.method} - ${req.originalUrl} - ${err.message} - ${req.ip}`);
// render the error page
  res.status(err.status || 500);
  res.render('error');
});

```

Now we're ready to start our server 
forever app.js
Open a new Terminal window while our Node.js server is still running and we can tail our logs to see our errors as they populate.
tail -f ./logs/error.log
If force our app to throw an error by navigating our browser to a URL our app can't route to, we should see our logger outputting errors to our log file.