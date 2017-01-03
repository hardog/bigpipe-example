'use strict';

const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html'});

    let layoutHtml = fs.readFileSync('./layout-1.html');
    res.write(layoutHtml.toString());

    let start = Date.now();
    // module A, 1s delay/latency
    while(1){
        if(Date.now() - start > 1000){
            res.write('<script>renderFlushCon("#A","this is module A");</script>');
            break;
        }
    }

    // module B
    while(1){
        if(Date.now() - start > 2000){
            res.write('<script>renderFlushCon("#B","this is module B");</script>');
            break;
        }
    }

    // module C
    while(1){
        if(Date.now() - start > 3000){
            res.write('<script>renderFlushCon("#C","this is module C");</script>');
            break;
        }
    }

    res.write('</body></html>');
    res.end();
}).listen(8080, '127.0.0.1');