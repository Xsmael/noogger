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

-  write daily log file, handy for servers, or applications that run continously
-  Forwards logging data to the console output if needed (optional)
-  En/Disable Console output according to log
-  pretty colors in console output
-  Supported log levels (as per cisco and many other manufacturer standards):
	EMERGENCY(0)
	ALERT(1)
	CRITICAL(2)
	ERROR(3)
	WARNING(4)
	NOTICE(5)
	INFO(6)
	DEBUG(7)
-  Customize date-time format for log lines and for log file name

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
	consoleOutputLevel: ['DEBUG','ERROR','WARNING'],
	
	dateTimeFormat: "DD-MM-YYYY HH:mm:ss.S",
	outputPath: "logs/",
	fileNameDateFormat: "DDMMYYYY",
	fileNamePrefix:"myApp-"
};

var log = require('noogger').init(logParams);

```
or
```js
var log = require('noogger');

var logParams = {
	consoleOutput : true,
	consoleOutputLevel:'DEBUG',
	
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
	consoleOutputLevel: 'DEBUG',
	dateTimeFormat: "DD-MM-YYYY HH:mm:ss.S",
	outputPath: "logs/",
	fileNameDateFormat: "DDMMYYYY",
	fileNamePrefix:"",
	fileNameSuffix:""
```

## Parameters: 
-  	`consoleOutput` : `boolean` : Wether the logging will be printed on the console output as well, or not
-  	`consoleOutputLevel` : `int` or `string` or `array`  : Specify the console output log level.
-  	using int: from 0 to 7 
-  	using string: any valid log level (DEBUG, INFO, ERROR,....)
-  	using array: to allow multiple log levels eg: ['DEBUG','ERROR','WARNING']
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
