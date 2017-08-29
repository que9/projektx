// https://zellwk.com/blog/crud-express-mongodb/
// https://zellwk.com/blog/crud-express-and-mongodb-2/
// not much usefull - https://www.guru99.com/node-js-mongodb.html

const express = require('express')
const path = require('path')
const favicon = require('static-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const routes = require('./routes/index')
// mongoRoutes    = require("./routes/mondodb-routes");

const config = require('./config/app.config')

const app = express()

// - View engine setup -/
app.set('config', config)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(favicon())
// - These should be set befor your first routes -/
app.use(logger('dev', {
  skip: (req, res) => {
    return req.statusCode < 400
  },
  stream: process.stderr
}))

app.use(logger('dev', {
  skip: (req, res) => {
    return req.statusCode >= 400
  },
  stream: process.stdout
}))

// - Now server can read json data as well comming from client /
app.use(bodyParser.json())
// - Urlencoded method within body-parser tells body-parser to extract data from the form and add them to the body object of req /
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'assets')))

// - Defining the routes /
app.use('/', routes)
// app.use("/mongo", mongoRoutes);

// - Catch 404 and forward to error handler /
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

/// Error handlers /
// - Development error handler, will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// - Production error handler -/
// - No stacktraces leaked to user -/
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
