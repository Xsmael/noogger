/** todo
 * Support for js Object and Arrays
 *  En/Disabling Console output according to logLevels
 *  option to separate log files per logLevels
 *  Add events such as on<logLevel>
 *  enable logging per module (-)--77
 * 
 * 
 * 
*/
var fs  = require('fs');
var now = require('moment');
var chalk =  require('chalk');

var  c_fatal =  chalk.red.bold;
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


var self =this;
var initialized =false;

var opts = {
	consoleOutput : true,
	dateTimeFormat: "DD-MM-YYYY HH:mm:ss.S",
	outputPath: "logs/",
	fileNameDateFormat: "DDMMYYYY",
	fileNamePrefix:"",
	fileNameSuffix:""
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
/* Misc Functions ***/


function init(o){
	opts.outputPath = ( typeof o.outputPath !== 'undefined' ?  o.outputPath : opts.outputPath  );
	opts.consoleOutput = ( typeof o.consoleOutput !== 'undefined' ?  o.consoleOutput : true );
	opts.dateTimeFormat = ( typeof o.dateTimeFormat !== 'undefined' ?  o.dateTimeFormat : opts.dateTimeFormat );
	opts.fileNamePrefix = ( typeof o.fileNamePrefix !== 'undefined' ?  o.fileNamePrefix : opts.fileNamePrefix  );
	opts.fileNameSuffix = ( typeof o.fileNameSuffix !== 'undefined' ?  o.fileNameSuffix : opts.fileNameSuffix  );
	opts.fileNameDateFormat = ( typeof o.fileNameDateFormat !== 'undefined' ?  o.fileNameDateFormat : opts.fileNameDateFormat  );
	
    mkdirSync(opts.outputPath);
	initialized =true;
	return self;
}

function logIt(txt,logLevel, consoleOut){
	
	if(!initialized) init(opts);
	
	var filename = opts.fileNamePrefix + now().format(opts.fileNameDateFormat) + opts.fileNameSuffix +".log";
	var logLine= now().format(opts.dateTimeFormat)+" ["+logLevel+"] "+txt+"\r\n";

	var out = typeof consoleOut !=='undefined' ? consoleOut : opts.consoleOutput;
	if(out) 
	{
		var cout = c_date( now().format(opts.dateTimeFormat) )
	         + ' '+c_logLevel('['+logLevel.rightJustify(9,' ')+']')
			 + '  '+txt;
		switch (logLevel) {
			case 'FATAL': 	  cout= c_fatal(cout);	break;
			case 'EMERGENCY': cout= c_emergency(cout);	break;
			case 'ALERT':	  cout= c_alert(cout);	break;
			case 'CRITICAL':  cout= c_critical(cout);	break;
			case 'ERROR': 	  cout= c_error(cout);	break;
			case 'WARNING':   cout= c_warning(cout);	break;
			case 'NOTICE': 	  cout= c_notice(cout);	break;
			case 'INFO': 	  cout= c_info(cout);	break;
			case 'DEBUG': 	  cout= c_debug(cout);	break;
		}
		console.log(cout);
	}		
	
	var path= opts.outputPath+filename;
	fs.appendFile(path, logLine, function(err) {
		if (err) throw err;	
	});
}

function fatal(data, consoleOut) {
	logIt(data,"FATAL", consoleOut);
}
function emergency(data, consoleOut) {
	logIt(data,"EMERGENCY", consoleOut);
}
function alert(data, consoleOut) {
	logIt(data,"ALERT", consoleOut);
}
function critical(data, consoleOut) {
	logIt(data,"CRITICAL", consoleOut);
}
function error(data, consoleOut) {
	logIt(data,"ERROR", consoleOut);
}
function warning(data, consoleOut) {
	logIt(data,"WARNING", consoleOut);
}
function notice(data, consoleOut) {
	logIt(data,"NOTICE", consoleOut);
}
function info(data, consoleOut) {
	logIt(data,"INFO", consoleOut);
}
function debug(data, consoleOut) {
	logIt(data,"DEBUG", consoleOut);
}


exports.init = init;

exports.emergency = emergency;
exports.alert = alert;
exports.critical = critical;
exports.error = error;
exports.warning = warning;
exports.notice = notice;
exports.info = info;
exports.debug = debug;
exports.fatal = fatal;




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