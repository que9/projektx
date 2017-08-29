// https://www.guru99.com/node-js-generators-compare-callbacks.html

// What are generators?
/**
 * 1. function executions that can be suspended and resumed at a later point.
 * 2. useful when carrying out concepts such as 'lazy execution'
 *
 */

 function * Add (x) {
   yield x + 1
   var y = yield (null)
   y = 6
   return x + y
 }
 var gen = Add(5)
 console.log('!', gen)
 console.log('2', gen.next())
 console.log('3', gen.next())

// https://www.guru99.com/node-js-streams-filestream-pipes.html
/**
 * Node makes extensive use of streams as a data transfer mechanism.
 * require("fs").createReadStream( path.join(__diname,'data/data.txt') ).on("data", data=>{
 *   console.log( data.toString() );
 *
 * pipe,read, isPaused, pause, resume,
 * data, error, close,
 * })
 *
 *
 * Events
 *
 * Node.js is referred to as an Event-driven framework.
//  * / https://www.guru99.com/node-js-streams-filestream-pipes.html
 *
 * var events = require("events")
 * var emitter = new events.EventEmitter();
 *  emitter.on("event.name", callback);
 *
 *  emitter.emit("event.name",anything");
 *
 */
