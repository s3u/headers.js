var sys = require('sys'),
    header = require('headers'),
    assert = require('assert');

var str = 'compress;q=0.5, gzip;q=1.0';
var h = header.parse('Accept-Encoding', str);
var obj = [{
  'params' : {
    'q' : '0.5'
  },
  'encoding' : 'compress'
}, {
  'params' : {
    'q' : '1.0'
  },
  'encoding' : 'gzip'
}];
assert.deepEqual(h, obj);
var _str = header.format('Accept-Encoding', obj);
assert.equal(_str, 'compress;q=0.5,gzip;q=1.0');

str = '*';
h = header.parse('Accept-Encoding', str);
obj = [{
  'params' : {},
  'encoding' : '*'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept-Encoding', obj);
assert.equal(_str, str);

str = '';
h = header.parse('Accept-Encoding', str);
obj = [{
  'params' : {},
  'encoding' : ''
}];
assert.deepEqual(h, obj);
_str = header.format('Accept-Encoding',obj);
assert.equal(_str, str);

str = 'gzip;q=1.0, identity; q=0.5, *;q=0';
h = header.parse('Accept-Encoding', str);
obj = [{
  'params' : {
    'q' : '1.0'
  },
  'encoding' : 'gzip'
}, {
  'params' : {
    'q' : '0.5'
  },
  'encoding' : 'identity'
}, {
  'params' : {
    'q' : '0'
  },
  'encoding' : '*'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept-Encoding', obj);
assert.equal(_str, 'gzip;q=1.0,identity;q=0.5,*;q=0');
