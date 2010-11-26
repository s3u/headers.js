var sys = require('sys'),
    header = require('header'),
    assert = require('assert');

var str = 'compress;q=0.5, gzip;q=1.0';
var h = header.parse('Accept-Encoding', str);
assert.deepEqual(h, [{
  'params' : {
    'q' : '0.5'
  },
  'encoding' : 'compress'
}, {
  'params' : {
    'q' : '1.0'
  },
  'encoding' : 'gzip'
}]);
var _str = header.format('Accept-Encoding', [{
  'params' : {
    'q' : '0.5'
  },
  'encoding' : 'compress'
}, {
  'params' : {
    'q' : '1.0'
  },
  'encoding' : 'gzip'
}]);
assert.equal(_str, 'compress;q=0.5,gzip;q=1.0');

str = '*';
h = header.parse('Accept-Encoding', str);
assert.deepEqual(h, [{
  'params' : {},
  'encoding' : '*'
}]);
_str = header.format('Accept-Encoding', [{
  'params' : {},
  'encoding' : '*'
}]);
assert.equal(_str, str);

str = '';
h = header.parse('Accept-Encoding', str);
assert.deepEqual(h, [{
  'params' : {},
  'encoding' : ''
}]);
_str = header.format('Accept-Encoding', [{
  'params' : {},
  'encoding' : ''
}]);
assert.equal(_str, str);

str = 'gzip;q=1.0, identity; q=0.5, *;q=0';
h = header.parse('Accept-Encoding', str);
assert.deepEqual(h, [{
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
}]);
_str = header.format('Accept-Encoding', [{
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
}]);
assert.equal(_str, 'gzip;q=1.0,identity;q=0.5,*;q=0');
