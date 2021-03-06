/** todo
 *
 *  En/Disabling Console output according to intLogLevel - Done!
 *  En/Disabling writing to file according to intLogLevel - Done!
 * intro/ customIntro function - Done !
 *  0.1.4
 * 
 *  Bug gix
 *  option to separate log files per intLogLevel
 *  0.1.6
 * --------------------------------- 
 *  Support for  Arrays truncate if too big
 * auto JSON.stringifying object, for your conveninience Done !
 *  organize log levels in folders of months and years - optional
 * Add events such as on<logLevel>
 *  0.1.7
 * 
 *  make it more developer-friendly  by avoiding the dot notation eg: log() instead of log.debug()
 *  feature for archives, and zipping old logs 
 * 
 * add more log levels trace, fatal
 *  send email alerts
 * Allows for multiple configurable destination streams. For example, you might be writing trace logs to one file but when an error is encountered, write to the same file, then into error file and send an email at the same time.
 * 0.1.6
 * 
*/
var fs  = require('fs');
var now = require('moment');
var chalk =  require('chalk');

var  c_emergency = chalk.bold.red;
var  c_alert =  chalk.red;
var  c_critical =  chalk.bgRed.black;
var  c_error =  chalk.bgBlack.red;
var  c_warning =  chalk.yellow.bold;
var  c_notice =  chalk.blue.bold;
var  c_info =  chalk.white;
var  c_debug =  chalk.green;
var  c_date = chalk.dim;
var  c_logLevel= chalk.inverse;

var intLogLevel = [];
	intLogLevel['EMERGENCY']= 0;
	intLogLevel['ALERT']    = 1;	
	intLogLevel['CRITICAL'] = 2;
	intLogLevel['ERROR']    = 3;
	intLogLevel['WARNING']  = 4;
	intLogLevel['NOTICE']   = 5;
	intLogLevel['INFO']     = 6;
	intLogLevel['DEBUG']    = 7;

var self =this;
var initialized =false;

var opts = {
	consoleOutput : true,
	consoleOutputLevel: 7, //or 7 or ['DEBUG','TRACE'],
	
	fileOutput: true,
	fileOutputLevel: 7, // ['DEBUG','TRACE'],
	
	outputPath: "logs/",
	dateTimeFormat: "DD-MM-YYYY HH:mm:ss.S",
	fileNameDateFormat: "DDMMYYYY",
	
	fileNamePrefix:"",
	fileNameSuffix:"",
	verbose:true,
	customIntro: true
};


/*** Misc Functions */
var mkdirSync = function (path) { // implement recursion http://stackoverflow.com/questions/13696148/node-js-create-folder-or-use-existing#24311711
  try {
    fs.mkdirSync(path);
  } catch(e) {
    // if ( e.code != 'EEXIST' ) throw e;
	if ( e.code != 'EEXIST' ) console.log(e);
  }
}

String.prototype.leftJustify = function( length, char ) {
    var fill = [];
    while ( fill.length + this.length < length ) {
      fill[fill.length] = char;
    }
    return fill.join('') + this;
}

String.prototype.rightJustify = function( length, char ) {
    var fill = [];
    while ( fill.length + this.length < length ) {
      fill[fill.length] = char;
    }
    return this + fill.join('');
}

String.prototype.centerJustify = function( length, char ) {
    var i=0;
	var str= this;
	var toggle= true;
    while ( i + this.length < length ) {
      i++;
	  if(toggle)
	  	str = str+ char;
	  else
	  	str = char+str;
	  toggle = !toggle;
    }
    return str;
}


function dfault( defArg, defVal){ /*  to enable default parameters in functions */
	return ( typeof defArg !== 'undefined' ? defArg : defVal) ;
}

function isset(obj){
    return (typeof obj !=='undefined' ? true : false);
}
function introduce(package) {
	
	//console.log("********************************");
	console.log("***************"+package.name+"***************");
	console.log("version:                   "+package.version);
	console.log("Console output:            "+(opts.consoleOutput ? "enabled" : "disabled") );
	if(opts.consoleOutput) console.log("Console output logLevel:   " + opts.consoleOutputLevel);
	console.log("File output:               "+(opts.fileOutput ? "enabled" : "disabled") );
	if(opts.fileOutput) console.log("File output logLevel:      " + opts.fileOutputLevel);
	console.log("Writing logs file to:      "+opts.outputPath);
	console.log("*************************************");
	console.log("by "+package.author);
	console.log("\n");
	//console.log("*************************************");
}

/* Misc Functions ***/

function init(o){
	
	opts.outputPath = dfault( o.outputPath, opts.outputPath );

	opts.consoleOutput = dfault(o.consoleOutput, opts.consoleOutput );
	opts.consoleOutputLevel = dfault(o.consoleOutputLevel, opts.consoleOutputLevel );
	
	opts.fileOutput = dfault(o.fileOutput, opts.fileOutput);
	opts.fileOutputLevel= dfault(o.fileOutputLevel, opts.fileOutputLevel);
	
	opts.dateTimeFormat = dfault(o.dateTimeFormat, opts.dateTimeFormat );
	opts.fileNamePrefix = dfault(o.fileNamePrefix, opts.fileNamePrefix );
	opts.fileNameSuffix = dfault(o.fileNameSuffix, opts.fileNameSuffix );
	opts.fileNameDateFormat = dfault(o.fileNameDateFormat, opts.fileNameDateFormat  );
	
	opts.verbose = dfault(o.verbose, opts.verbose ); // verbose option is currently useless
	opts.customIntro = dfault(o.customIntro, opts.customIntro );
	
	if(typeof opts.customIntro ==='function') 
		opts.customIntro(require('../../package.json')); 
	else if(opts.customIntro != null &&  opts.customIntro != false);
		//introduce(require('../../package.json'));

	opts.filename = opts.outputPath + opts.fileNamePrefix + now().format(opts.fileNameDateFormat) + opts.fileNameSuffix +".log";

	whenTheDayEnds(); /** recursive function that calls itself on each new day, use it for your conveninience */
	
    mkdirSync(opts.outputPath);
	initialized =true;
	return self;
}

function whenTheDayEnds() {
	/* Run the following after the day ends (new day) */
	opts.filename = opts.outputPath + opts.fileNamePrefix + now().format(opts.fileNameDateFormat) + opts.fileNameSuffix +".log";

    /* scheduling for next day */
	var timeLeft= now().endOf('day').diff(now());
	setTimeout(function(){
		whenTheDayEnds();
	}, timeLeft);
}

function logIt(data, logLevel, consoleOut, fileOut){		
	if(!initialized) init(opts);

	var out = dfault(consoleOut , opts.consoleOutput);
	var txt= (typeof data == "object") ? "\n"+JSON.stringify(data,null,3) : data;
	var logLine= now().format(opts.dateTimeFormat)+" ["+logLevel+"] "+txt+"\r\n";

	if(out) 
	{
		var c_logLine = c_date( now().format(opts.dateTimeFormat) )
	         + ' '+c_logLevel('['+logLevel.centerJustify(9,' ')+']')
			 + '  '+txt;

		//styling with colors
		switch (logLevel) {
			case 'EMERGENCY': c_logLine= c_emergency(c_logLine);	break;
			case 'ALERT':	  c_logLine= c_alert(c_logLine);	break;
			case 'CRITICAL':  c_logLine= c_critical(c_logLine);	break;
			case 'ERROR': 	  c_logLine= c_error(c_logLine);	break;
			case 'WARNING':   c_logLine= c_warning(c_logLine);	break;
			case 'NOTICE': 	  c_logLine= c_notice(c_logLine);	break;
			case 'INFO': 	  c_logLine= c_info(c_logLine);	break;
			case 'DEBUG': 	  c_logLine= c_debug(c_logLine);	break;
		}
		
		controlledConsoleOutput(c_logLine, logLevel, consoleOut);	
	}		
	
	if(dfault(fileOut , opts.fileOutput))
		controlledFileOutput(logLine, logLevel, fileOut);
}

function controlledConsoleOutput(logMsg, logLevel, consoleOut) {
	
	controlledOutput(logMsg, logLevel, opts.consoleOutputLevel, consoleOut, function(log) {
		console.log(log); 
	});
}

function controlledFileOutput(logMsg, logLevel, fileOut) {
	
	controlledOutput(logMsg, logLevel, opts.fileOutputLevel, fileOut, function(log) {

		fs.appendFile(opts.filename, log, function(err) {
			if (err) throw err;
		});
	});
}

function controlledOutput(logMsg, logLevel, outputLevel, isOut, getOut) {  //getOut is a callback
	if(typeof outputLevel == 'string' )
				var maxLevel =intLogLevel[outputLevel] ;
		
		switch(typeof outputLevel) {
			
			case 'number': maxLevel = outputLevel;
			case 'string': 
				if( intLogLevel[logLevel] <= maxLevel) // if current level is allowed to be printed
				{
					if(isset(isOut)) //in case this optional argument is specified
					{
						if(isOut)    //if true  then 'out' it
							getOut(logMsg)
					}
					else //in case the optional argument is not specified but "current level is ALLOWED to be printed"
						getOut(logMsg);
				}
				else if(isset(isOut)) //if current level is NOT allowed to be printed, BUT the optional arg is specified
				{
					if(isOut) // if is true then 'out' it 
						getOut(logMsg);
				}
			break;		
			
			default: //Array, coz typeof an array usually gives 'object' check this....
			
				/*Here the same pattern as above is used... it works like  a kind of truth table */
				if( outputLevel.indexOf(logLevel) > -1)
				{
					if(isset(isOut)) 
					{
						if(isOut)
							getOut(logMsg);
					}
					else
						getOut(logMsg);
				}
				else if(isset(isOut)) 
				{
					if(isOut)
						getOut(logMsg);
				}
			break;
			
		}
}

function emergency(data, consoleOut, fileOut) {
	logIt(data,"EMERGENCY", consoleOut, fileOut);
}
function alert(data, consoleOut, fileOut) {
	logIt(data,"ALERT", consoleOut, fileOut);
}
function critical(data, consoleOut, fileOut) {
	logIt(data,"CRITICAL", consoleOut, fileOut);
}
function error(data, consoleOut, fileOut) {
	logIt(data,"ERROR", consoleOut, fileOut);
}
function warning(data, consoleOut, fileOut) {
	logIt(data,"WARNING", consoleOut, fileOut);
}
function notice(data, consoleOut, fileOut) {
	logIt(data,"NOTICE", consoleOut, fileOut);
}
function info(data, consoleOut, fileOut) {
	logIt(data,"INFO", consoleOut, fileOut);
}
function debug(data, consoleOut, fileOut) {
	logIt(data,"DEBUG", consoleOut, fileOut);
}

/**Express middleware 
//http://expressjs.com/en/api.html#req
//https://expressjs.com/en/guide/writing-middleware.html

var middleware= function(req,res,next) {

	var method = req.method;
	var text= req.originalUrl;
	if(req.secure) {} //  if we use https; put spec color
	logIt(text,method,true,true);
}

**/

if(0)
{
	var f=false,
		t=true;

debug("Debugging haha hehe वाचाल",t,t);
debug(' This is a debug message to help you figure out whats going on',f,t);

info('Just to inform you, everything is okay! no probs today',f);
info(' The processus has started successfully!',t);

notice('OMG! have you noticed what just happened ? ');
notice(opts);

warning(' Hum another thing went wrong...',f);
warning('Something went wrong...',t);

error('General Failure');
error('Error ooccurred while doing thus...');

critical('This is a critical messsage and require your whole attetion!',t);
critical('OMG! have you noticed what just happened ? ');

alert('FATAL ERROR!',f,f);
alert('DAMN FATAL ERROR!',t,t);

emergency('the system is going down!');
emergency('There is an emergency! ');
}

/**
https://en.wikipedia.org/wiki/Syslog#Severity_level
**/
exports.init = init;

exports.emergency = emergency;
exports.alert = alert;
exports.critical = critical;
exports.error = error;
exports.warning = warning;
exports.notice = notice;
exports.info = info;
exports.debug = debug;

/**
 * 
Value	Severity	Keyword		Description														Examples
0		Emergency	emerg		System is unusable												This level should not be used by applications.
1		Alert		alert		Should be corrected immediately									Loss of the primary ISP connection.
2		Critical	crit		Critical conditions												A failure in the system's primary application.
3		Error		err			Error conditions												An application has exceeded its file storage limit and attempts to write are failing.
4		Warning		warning		May indicate that an error will occur if action is not taken.	A non-root file system has only 2GB remaining.
5		Notice		notice		Events that are unusual, but not error conditions.	
6		Informati..	info		Normal operational messages that require no action.				An application has started, paused or ended successfully.
7		Debug		debug		Information useful to developers for debugging the application.	

src https://en.wikipedia.org/wiki/Syslog
 */



/** http://momentjs.com/docs/#/displaying/ for date formats */

