var sys = require('sys'),
    cc = require('cache-control');

val = 'public,max-age=10,max-stale=10';
c = cc.parse(val);
sys.log(sys.inspect(c));