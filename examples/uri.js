var uri = require('url'),
    sys = require('sys');

var u = uri.parse('http:  //foo.com');
sys.log(u.protocol);
sys.log(u.hostname);
