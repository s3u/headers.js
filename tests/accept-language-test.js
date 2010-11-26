var sys = require('sys'),
    header = require('header'),
    assert = require('assert');

var str = 'da, en-gb;q=0.8, en;q=0.7';
var h = header.parse('Accept-Language', str);
assert.deepEqual(h, [{
  'params' : {},
  'language' : 'da'
}, {
  'params' : {
    'q' : '0.8'
  },
  'language' : 'en-gb'
}, {
  'params' : {
    'q' : '0.7'
  },
  'language' : 'en'
}]);

_str = header.format('Accept-Language', [{
  'params' : {},
  'language' : 'da'
}, {
  'params' : {
    'q' : '0.8'
  },
  'language' : 'en-gb'
}, {
  'params' : {
    'q' : '0.7'
  },
  'language' : 'en'
}]);
assert.equal(_str, 'da,en-gb;q=0.8,en;q=0.7');
