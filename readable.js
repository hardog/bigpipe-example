'use strict';

const Readable = require('stream').Readable;

// const rs = new Readable;
// rs.push('hello');
// rs.push('world\n');
// rs.push(null); // must
// rs.pipe(process.stdout);


let rs = Readable();
let c = 97 - 1;
let pauseNum = 1;

rs._read = function(){
    if(c >= 'z'.charCodeAt(0)) return rs.push(null);
    setTimeout(() => {
        rs.push(String.fromCharCode(++c));
    }, 200);
    pauseNum ++;

    if(pauseNum === 10){
        rs.pause();
        let start = Date.now();
        while(1){
            // console.log('waint start:', Date.now());;
            if(Date.now() - start > 1000){
                console.log('waiting end:', start, Date.now());
                rs.resume();
                break;
            }
        }
    }
};

// start flow mode
// method one 'data' event
// rs.on('data', function(chunk){
//     console.log('chunk:', chunk.toString());
// });

// method two pipe dest stream
rs.pipe(process.stdout);

// method three #resume method
// rs.resume();


process.on('exit', function(){
    console.error('\n_read() called ' + (c - 97) + ' times');
});

process.stdout.on('error', process.exit);