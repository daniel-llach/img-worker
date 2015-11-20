const FARM_OPTIONS     = {
          maxConcurrentWorkers        : require('os').cpus().length
        , maxCallsPerWorker           : Infinity
        , maxConcurrentCallsPerWorker : 1
      }

var workerFarm = require('worker-farm')
  , workers    = workerFarm(FARM_OPTIONS, require.resolve('./worker/child'))
  , ret        = 0

var actualNumberOfWorkers = 0;

// starting
var colors = require('colors');
console.log('waiting new images...'.gray);

// watch tags directory for a new image
var fs = require("fs-extra");
var pathTags = './';
fs.watch( pathTags , initWorker);

// init a worker
function initWorker(event, file){

  if(file != '.DS_Store'){
    // is not a OS file
    if(ret < FARM_OPTIONS.maxConcurrentWorkers){
      ++ret;
      var inp = {};
      inp.name = '#' + ret + ' worker';
      inp.file = file;

      // init img-worker
      workers(inp, function (err, outp) {
        console.log(ret + ' workers active(s)');
        console.log(outp.msg);
        // wait done
        if(outp.status == 'done'){
          console.log(inp.name + ' done!');
          workerFarm.end(workers)
          --ret;
          console.log(ret + ' workers active(s)');

        }

      })
    }else{
      console.log('waiting for a worker...');
    }

  }
}

//
// for (var i = 0; i < FARM_OPTIONS.maxConcurrentWorkers; i++) {
//   workers('#' + i + ' worker', function (err, outp) {
//     console.log(outp)
//     if (++ret == 10)
//       workerFarm.end(workers)
//   })
// }
