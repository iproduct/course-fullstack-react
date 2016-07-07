var EventEmitter = require('events').EventEmitter;
var util = require('util');

class MemoryWatcher extends EventEmitter {
  constructor(options) {
    super();
    options = options || {
      frequency: 10000 // 10 seconds
    };
    setInterval(() => {
      var bytes = process.memoryUsage().rss; // resident set size
      if (options.maxBytes && bytes > options.maxBytes) {
        this.emit('error', new Error('Memory exceeded ' + options.maxBytes + ' bytes'));
      } else {
        this.emit('data', bytes);
      }
    }, options.frequency);
  }
}


//Use it!
var watcher = new MemoryWatcher({
  maxBytes: 25000000,
  frequency: 3000
});

watcher.on('data', function (bytes) {
  console.log(bytes);
})

watcher.on('error', function (err) {
  console.log('error: ', err);
  process.exit(1);
});
