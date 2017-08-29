const fs = require('fs'),
  zlib = require('zlib'),
  crypto = require('crypto'),
  {Readable, Writable, Duplex, Transform } = require('stream')

    // Readable stream
var read = function (size) {
    this.push(String.fromCharCode(this.charsCode++) + ' ')

        // Terminating the read stream
    if (this.charsCode > 90) {
      this.push('\n')
      this.push(null)
    }
  },
  write = function (chunk, encoding, callback) {
    console.log('#', chunk.toString())
    callback()
  },

  transform = function (chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }

var r = new Readable({read}),
  w = new Writable({write}),
  d = new Duplex({read, write}),
  t = new Transform({transform})

r.charsCode = 65
d.charsCode = 65
        // r.pipe( process.stdout );
        // process.stdin.pipe( w );
        // process.stdin.pipe( process.stdout );
        // process.stdin.pipe( d ).pipe( process.stdout );
        // process.stdin.pipe( t ).pipe( process.stdout );

var loaderThrough = new Transform({
  transform (chunk, encoding, callback) {
    process.stdout.write('.')
    callback(null, chunk)
  }
})

fs
            .createReadStream(process.argv[2])
            .pipe(zlib.createGzip())
            .pipe(crypto.createCipher('aes192', 'project-x'))
            // .on("data", ()=> process.stdout.write('.'))
            .pipe(loaderThrough)
            .createWriteStream(process.argv[2] + '.gz')
            .on('finish', () => process.stdout.write('Done!'))

        // reverse the order
fs.createReadStream(process.argv[2])
            .pipe(crypto.createDecipher('aes192', 'project-x'))
            .pipe(zlib.createGunzip())
            .pipe(fs.createWriteStream(process.argv[2].slice(0, -3)))
            .on('finish', () => process.stdout.write('Done'))
