'use strict';

const koa = require('koa');
const View = require('./view');
const app = module.exports = koa();

app.use(function *(){
    // also work
    // this.status = 200;
    // this.res.write('hello');

    // let start = Date.now();
    // while(1){
    //     if(Date.now() - start > 1000){
    //         this.res.write('1s latency');
    //         break;
    //     }
    // }
    // this.res.end();

    this.type = 'html';
    this.body = new View(this);
});

app.listen(3000);