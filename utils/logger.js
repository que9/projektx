/**
 * @desc - Application wide log management module using winston, which lets you control various log levels and
 *       allows to switch of/off logs depending on execution environment
 * @author - gkjha009@gmail,facebook.com/gkjha009,github.com/que9
 * @see - https://www.npmjs.com/package/winston#logging, http://usejsdoc.org/, http://www.jyotman.xyz/post/logging-in-node.js-done-right
 * @see - https://blog.risingstack.com/node-js-tutorial-debugging-async-memory-leaks-cpu-profiling/
 * @version - 1.0.0
 */

 'use strict'

// MONGO_URI
// logging can help your discover any problem whereas a not so proper logging can leave you finding a trivial problem for hours
// morgan, debug, Winston, Log, Bunyan

// Why not console.log
    // Can not be switched off
    // Can not assign levels to loggings[ cetain logs in dev only ! in production ]

// Debug module is mostly used while creating modules which will be used by others later. It provides the users a way to enable the logging in external modules by simply enabling the Debug logging of that external module they are using.
// Morgan - used a middleware for logging http requets
// Node.js provides us with two default write streams - stdout and stderr [separate out out and error logs]

/**
 * morgan( format, options );
 * format dev format which logs the following information
 * :method :url :status :response-time ms - :res[content-length]
 *
 * if you hit localhost:3000
 * GET / 200 0.23 ms - 12
 * Note - Morgan provides many more formats for logging. Don't use dev format in production environments.
 */

 /**
  * Winston is a multi-transport async logging library for Node.js.
  * Log level { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
  *
  */
/**
 * A transport is essentially a storage device for your logs
 * Logging levels in winston conform to the severity ordering specified by RFC5424:
 */
 const winston = require('winston')
 const path = require('path')
 const LOG_LEVEL = process.env.LOG_LEVEL || 'debug'

 const log = new winston.Logger({
   exitOnError: false,
    // - A transport is essentially a storage device for your logs /
   transports: [
        // - Transports for console -/
     new winston.transports.Console({
       level: LOG_LEVEL,    // - Setting log level according to the envirnment /
            // - Prints timestamp for every log, which is very handy while reading the logs /
       json: false,
       timestamp () {
         return (new Date()).toString()
       }
     }),

        // - Transports for loggin into files
     new winston.transports.File({
       name: 'WinstonInfo',
       filename: path.join(__dirname, 'winston-info.log'),
       level: 'info',
       json: true
     }),
     new winston.transports.File({
       name: 'WinstonError',
       level: 'error',
       filename: path.join(__dirname, 'winston.log'),
       json: true
     })
   ],

    // - Catch and log uncaughtException events from your process /
   exceptionHandlers: [
     new winston.transports.File({
       level: 'error',
       filename: path.join(__dirname, 'winston-exceptions.log')
     })
   ]
 })

 module.exports = log
