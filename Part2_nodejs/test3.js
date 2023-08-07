const EventEmitter = require('events');
const celebrity = new EventEmitter();

celebrity.on('celebrity', celebrity => {
  console.log('I like this post');
  console.log(celebrity);
});

celebrity.on('celebrity', celebrity => {
    console.log('I like this post2');
    console.log(celebrity);
});

celebrity.emit('celebrity', 'hello world');

// process object is an instance of EventEmitter!!
process.on('beforeExit', (c) => {
    console.log('beforeExit: ', c);
});

process.on('exit', (c) => {
    console.log('exit: ', c);
});