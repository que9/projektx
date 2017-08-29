/**
 * @desc - NodeJS envirnoment variables configurations
 * @author - Gaurav Jha gkjha009@gmail.com, facebook.com/gkjha009, github.com/que9
 */

'use strict'
// - config/env.config
console.clear()
const joi = require('joi')

// - Envirnoment variables configuration object
const envVarsSchema = joi.object({
  NODE_ENV: joi.string()
    .valid(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: joi.number()
    .default(3000)
}).unknown().required()

// - Compiling environemnt variables against envVarsSchema
const { error, value: envVars } = joi.validate(process.env, envVarsSchema)

if (error) { throw new Error(`Envirnoment variables validation error @ ${__filename} : ${error.message}`) }

const envConfig = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  server: {
    port: envVars.PORT
  }
}

module.exports = envConfig
