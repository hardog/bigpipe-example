'use strict';

const Readable = require('stream').Readable;
const util = require('util');
const co = require('co');
const fs = require('fs');

module.exports = View;

util.inherits(View, Readable);

function View(ctx){
    Readable.call(this, {});

    co.call(this, this.render).catch(ctx.onerror);
}

View.prototype._read = function(){};
View.prototype.render = function *(){
    let layoutHtml = fs.readFileSync('./layout-1.html');

    this.push(layoutHtml.toString());

    let start = Date.now();

    this.push('<script>renderFlushCon("#A", "this is A Module");</script>');
    this.push('<script>renderFlushCon("#B", "this is B Module");</script>');
    this.push('<script>renderFlushCon("#C", "this is C Module");</script>');

    this.push('</body></html>');
    this.push(null);
};