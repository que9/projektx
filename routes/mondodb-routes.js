// https://www.guru99.com/bluebird-promises.html

const x = require('express')
// const Q = require('q')
const router = x.Router()

const { MongoDBClient } = require('../utils/mongo.class')

var db = null
MongoDBClient({dbname: 'test'}, function (err, connection) {
  if (err) { throw err }
  db = connection
})

router.get('/', (req, res) => {
  res.render('mondodb-index', {title: 'MongoDB Page'})
})

// POST
router.post('/quotes', (req, res) => {
  if (db) {
    db.collection('quotes').save(req.body, (err, result) => {
      console.log('Saved ', result, err)
      res.redirect('/mongo/quotes')
    })
  }
})

router.get('/quotes', (req, res) => {
  var cursor = db.collection('quotes').find()
    // Find return a cursor which in-tern is a readable stream , toArray
  console.log('Readable cursor ', cursor)

  cursor.toArray((err, result) => {
    if (err) { return console.log(err) }
    res.render('list', {quotes: result})
  })

    // Nexturn  = Next + turn
    // Nextorm  = Next + Strorm
    // Nexter   =
    // Nextern  = Next + Tern
    // Nextep   = Next + Step
})

router.put('/quotes', (req, res) => {
    // Do the updating here
  db.collection('quotes')
    .findOneAndUpdate(
            // find query
            {name: req.body.uusename},
            // update query
    {$set: {
      name: req.user.quote
    }},
            // options
    {
      sort: {_id: -1},
      upsert: true
    },
            // callback
            (err, req) => {
              if (err) { return console.log(err) }
            })
})

router.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete(
    {name: req.body.uusename},
    {
      sort: {_id: -1}  // we do not need to reverse the sorting order
            // upsert:true // there is not upsert
    },
    (err, result) => {
      console.log(err)
    }
    )
})

module.exports = router
