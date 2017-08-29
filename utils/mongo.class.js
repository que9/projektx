/**
 * @desc    - MongoDB client class for establishing connection
 * @author  - Gaurav Kumar Jha, gkjha009@gmail.com,facebook.com/gkjha009, github.com/que9
 */

'use strict'

const MongoClient = require('mongodb').MongoClient
// - 009 it will be updated later with utils.promisify
// const Promise = require('promise')

// - private variables /
var _connectionString = 'mongodb://'
var _totalConnections = 0

/**
 * @desc    Class for making MongoDB connections
 * @author gkjha009@gmail.com,facebook.com/gkjha009, github.com/que9
 */
class MongoDBClient {
  constructor (options = {}, callback) {
        // Holds reference of  mongoDB connection
    this.db = null
        // pre-determined options
    this.options = {
      username: null,
      password: null,
      dbname: ''
    }

    this.callback = callback
    return this.fill(options).init()
  }

    /**
     * @desc Fills the internal object with outside values while validating the keys
     * @return ClassRef
     * @param {*} options
     */
  fill (options = {}) {
    for (let key in options) {
      if (key in this.options) {
        this.options[key] = options[key]
      }
    }

    return this
  }

    /**
     * @desc Instanciates connection with mongoDB and perfomes error checking
     * @return MongoDB connection
     * @param void
     */
  init () {
    MongoClient.connect(this.getConnectionUrl).then((err, connection) => {
      if (err) { return console.error(`Error in mongodb connection@ ${__filename}`, err) }

      _totalConnections++    // - Increasing total connections made to mongoDB by one /
      this.db = connection

      if (typeof this.callback === 'function') { this.callback(err, connection) }

      return this  // - Making it chainable /
    })
  }

    /**
     * @desc Accontable for constructing a mongoDB connection string based on the params passed to MongoDBClient Class
     * @param void
     * @return Constructed connection string
     */
  get getConnectionUrl () {
        // - Making sure if the username and password is provided
    if (this.options.dbname && this.options.password) { _connectionString += `${this.options.username}:${this.options.password}@` }

    _connectionString += `${MongoDBClient.host}:${MongoDBClient.port}/${this.options.dbname}`
    return _connectionString
  }

  get getTotalConnections () {
    return _totalConnections
  }
};

/** ****** CLASS STATIC VARIABLES  *******/
MongoDBClient.port = 27017
// @info Host is static because you can be connected from one host at a time
MongoDBClient.host = '127.0.0.1'

// Exporting the MongoDBClient Class
module.exports = { MongoDBClient }
