/**
 * @desc    - Logging configuraiton file
 * @author  - gkjha009@gmail.com
 * @version - 1.0.0
 * @see     - https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/
 */

'use strict'
// - config/log.config.js

const joi = require('joi')

// - Defining log validation schema
const logSchema = joi.object({
  LOG_LEVEL: joi.string()
        .valid(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
        .default('debug'),
  LOG_ENABLED: joi.boolean()
        .truthy('TRUE').truthy('true')
        .falsy('FALSE').falsy('false')
        .default('true')
}).unknown().required()

// - Validating against schema
const { error, value: logVars } = joi.validate(process.env, logSchema)

if (error) { throw new Error(`Log config validation error @ ${__filename} : ${error.message}`) }

const logConfig = {
  logger: {
    level: logVars.LOG_LEVEL,
    enabled: logVars.LOG_ENABLED
  }
}

module.exports = logConfig
