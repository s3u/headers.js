var sys = require('sys'),
    header = require('headers'),
    assert = require('assert');

var str = 'text/html';
var h = header.parse('Content-Type', str);
obj = [{
  'params' : {},
  'type' : 'text',
  'subtype' : 'html'
}];
assert.deepEqual(h, obj);
