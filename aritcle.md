Todo: 
-[] Describing why we need logging more in the first section
-[] Describe more about Morgan - writing errors to the console
-[] Describe more about winston - writing errors to a file 
-[] Most details in the actual tutorial part 
-[] Updating Github


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

[Clone this repo](https://github.com/lukepate/logger-) if you want to follow along with the tutorial.


### Step 2 - Installing Winston

Now that our app is up and running, lets install Winston.
//add in more about the actual benefits of logging

```shell
npm install winston
```
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

### Step 3 - Adding Logs

Now we can start writing our errors to a file and log them. Let's add our first log. 

Your app.js file should look like this:
```javascript
const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require('./config/winston');
const port = 8080

app.use(morgan("combined", { stream: logger.stream.write }));

app.get('/', function(req, res) {
    throw new Error('error thrown navigating to');
});

app.use(function(err, req, res, next) {
  logger.error(`${req.method} - ${req.originalUrl} - ${err.message} - ${req.ip}`);
  next(err)
})  

app.listen(port, console.log(`Listening on port ${port}!`));
```

We'll need to install our new dependencies

```shell
npm install 
```

Now we're ready to start our server and see our logs. In one terminal window, start the application:

```shell
node app.js 
```

Then, open a new Terminal window and tail the error file. This will allow you to see new logs being written to the file. Tail outputs the content of a file as lines are added to it.

Run the following command in the second terminal window:

```shell
tail -f ./logs/error.log
```

Now if we navigate our browser to [localhost:8080](http://localhost:8080) we can see errors as they are written to /logs/error.log. After you load the page, you should see something like this:

```
{"message":"GET - / - error thrown navigating to - ::1","level":"error"}
```