var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  // res.render('index', { title: 'Express' });
  // debugger
  res.send({status: 'Halla Debugger'})
})

module.exports = router
