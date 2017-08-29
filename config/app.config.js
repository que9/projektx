/**
 * @desc    - Application wide configuration file, deals with PORT, LOG_LEVELS etc
 * @author  - Gaurav Jha, gkjha009@gmail.com,facebook.com/gkjha009, github.com/que9
 * @type    - Configuration module
 * @version - 1.0.0
 * @see https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/
 */

'use strict'
// - config/app.config.js

/**
 * You should never group your config together into environment specific files. It doesn’t scale well! #nodejs
 */
const envConfig = require('./env.config')
const logConfig = require('./log.config')
const mongoConfig = require('./mongo.config')
const redisConfig = require('./redis.config')

const configResult = Object.assign({}, envConfig, logConfig, mongoConfig, redisConfig)
module.exports = configResult
