var sys = require('sys'),
    header = require('header'),
    assert = require('assert');

var str = 'da, en-gb;q=0.8, en;q=0.7';
var h = header.parse('Accept-Language', str);
var obj = [{
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
}];
assert.deepEqual(h, obj);

_str = header.format('Accept-Language', obj);
assert.equal(_str, 'da,en-gb;q=0.8,en;q=0.7');
