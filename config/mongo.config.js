/**
 * @desc MongoDB configuration file
 */

'use strict'
// config/mongl.config.js

const joi = require('joi')

// - Defining log validation schema
const mongoSchema = joi.object({
  MONGO_URI: joi.string()
        .default('127.0.01'),
  db: joi.string()
        .default('projectx'),
  PORT: joi.number()
        .default(27017)
}).unknown().required()

// - Validating against schema
const { error, value: mongoVars } = joi.validate(process.env, mongoSchema)

if (error) { throw new Error(`Mongo config validation error @ ${__filename} : ${error.message}`) }

const mongoConfig = {
  mongo: {
    host: mongoVars.MONGO_URI,
    db: mongoVars.db,
    port: mongoVars.PORT
  }
}

module.exports = mongoConfig
