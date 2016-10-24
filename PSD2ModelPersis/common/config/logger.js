var winston = require('winston');
var fs = require( 'fs' );
var logDir = 'logs'

var LoggerManager = function () {};
if ( !fs.existsSync( logDir ) ) {
	// Create the directory if it does not exist
	fs.mkdirSync( logDir );
} 
var customColors = {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    crit: 'red',
    fatal: 'red'
};

LoggerManager.prototype.getLogger = function () { 


var logger = new winston.Logger({
    colors: customColors,
   transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new winston.transports.File({
            level: 'debug',
            filename: logDir + '/logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ]
});
return logger;
};
module.exports = new LoggerManager();

