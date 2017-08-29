
var fs = require('fs')
var path = require('path')
var async = require('async')

let fileName1 = path.join(path.dirname(process.cwd()), 'package.json')
let fileName2 = path.join(path.dirname(process.cwd()), 'package-lock.json')

async.map([fileName1, fileName2], (name, callback) => {
    // Reading file asynchronously
  fs.readFile(name, 'utf-8', (err, file) => {
    if (err) { return callback(err) }
    var obj = null
    try {
      obj = JSON.parse(file)
      return callback(null, obj)
    } catch (ex) {
      return callback(ex)
    }
  })
}, (err, result) => {
  if (err) { return console.error('Error', err) }
  console.log('result', result)
})
