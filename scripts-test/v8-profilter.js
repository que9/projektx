const fs = require('fs')
const profiler = require('v8-profiler')

var createProfile = function(){
  // -- Setting the profiler
  profiler.startProfiling('prob1', true)
  setTimeout(() => {
    // Called after 2*1000 ms
    // Stopping profiling
    var profile = profiler.stopProfiling('prob1')

    profile.export((err, result) => {
      if (err) { return console.error(err) }

      fs.writeFileSync('app.cpuprofiler', result)
      profile.delete()
      process.exit(0)
    });
  }, 2 * 1000);
}

var takeSnapshot = function(){
  const snapshot = profiler.takeSnapshot();
  snapshot.export((err, result) =>{
    fs.writeFileSync('app.headsnapshot', result);
    snapshot.delete();
  });

  setTimeout(()=>{
    const snapshotAfter = profiler.takeSnapshot();
    snapshotAfter.export((err, result) =>{
      fs.writeFileSync('after.heapsnapshot', result);
      snapshotAfter.delete();
      process.exit(0);
    });
  }, 2*1000);
}


takeSnapshot();