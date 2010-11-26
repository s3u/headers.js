var sys = require('sys'),
    header = require('header'),
    assert = require('assert');

var str = 'iso-8859-5, unicode-1-1;q=0.8';
var h = header.parse('Accept-Charset', str);
assert.deepEqual(h, [{
  'params' : {},
  'charset' : 'iso-8859-5'
}, {
  'params' : {
    'q' : '0.8'
  },
  'charset' : 'unicode-1-1'
}]);
var _str = header.format('Accept-Charset', [{
  'params' : {},
  'charset' : 'iso-8859-5'
}, {
  'params' : {
    'q' : '0.8'
  },
  'charset' : 'unicode-1-1'
}]);
assert.equal(_str, 'iso-8859-5,unicode-1-1;q=0.8');