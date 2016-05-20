# node-logger (noogger)

A simple logging module for node.js


[![Build Status](https://travis-ci.org/websockets/ws.svg?branch=master)](https://travis-ci.org/websockets/ws)

`noogger` is a simple to use logger module that helps you to write logs files in a clean an organized way.
No need to implement the logging mechanism for your node applications anymore.


### Installing
Install it locally in your project or globally:
```
npm install noogger
npm install -g noogger
```

## Features

-  creates one log file per day, handy for servers, or applications that run for a long period
-  Forwards the logging info to the console output if needed (to avoid using both console.log() and this module)
-  Log levels INFO, DEBUG, WARNING, ERROR, FATAL
-  Customizable

## Usage

#### Basic (with default parameters)

```js
var log = require('noogger');
...
...
...
log.info("Hello World! Booting..");
log.warning("something is wrong");
log.error("Failed to initialize the...");
log.debug("something Happened!");

```
The log file will look like this
```
28-04-2016 20:16:45.5 [WARNING] something is wrong
28-04-2016 20:16:45.5 [ERROR] Failed to initialize the...
28-04-2016 20:16:45.5 [DEBUG] something Happened!
28-04-2016 20:17:06.6 [ERROR] telnet socket closed
```

#### With custom options

```js
var logParams = {
	consoleOutput : true,
	dateTimeFormat: "DD-MM-YYYY HH:mm:ss",
	fileNameDateFormat: "YYYY-MM-DD",
	fileNamePrefix:"myApp-",
	outputPath: "myLogs/"
};

var log = require('noogger').init(logParams);

```
or
```js
var log = require('noogger');

var logParams = {
	consoleOutput : true,
	dateTimeFormat: "DD-MM-YYYY HH:mm:ss",
	fileNameDateFormat: "YYYY-MM-DD",
	fileNamePrefix:"myApp-",
	outputPath: "myLogs/"
};


log.init(logParams);
```

## Default Parameters: 
```
	consoleOutput : false,
	dateTimeFormat: "DD-MM-YYYY HH:mm:ss.S",
	outputPath: "logs/",
	fileNameDateFormat: "DDMMYYYY",
	fileNamePrefix:"",
	fileNameSuffix:""
```

## Parameters: 
-  	`consoleOutput` : `boolean` : Wether the logging will be printed on the console output as well, or not
-  	`dateTimeFormat` : `string` : specifies the Date and time format to be used inside log file for each record.
                             refer to the date format section.
-  	`outputPath` : `string` : define the location where the log files  will be written
-  	`fileNameDateFormat`: `string` : the date format to be used in the log files name to differentiate them (per day); 
                               you can alter this, so that it will write one file per week or month or whatever you want,
                               refer to the date format section.
-  	`fileNamePrefix`: `string` : Prepends the given string to every log file name.
-  	`fileNameSuffix`: `string` : Appends the given string to every log file name.


## Date and Time formatting

The formating is based on the moment.js library, since it is the one used.
So please refer to [this page][1].

Submit any issue or request to [github page][2].

[1]: http://momentjs.com/docs/#/displaying/format/
[2]: https://github.com/Xsmael/node-logger/issues
