var sys = require('sys'),
    header = require('header'),
    assert = require('assert');

var str = '*';
var h = header.parse('Accept', str);
var obj = [{
  'params' : {},
  'type' : '*'
}];
assert.deepEqual(h, obj);
var _str = header.format('Accept', obj);
assert.equal(_str, '*');

str = 'text/html';
h = header.parse('Accept', str);
obj = [{
  'params' : {},
  'type' : 'text',
  'subtype' : 'html'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept', obj);
assert.equal(_str, 'text/html');

str = 'text/html;q=1.0';
h = header.parse('Accept', str);
obj = [{
  'params' : {
    'q' : '1.0'
  },
  'type' : 'text',
  'subtype' : 'html'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept', obj);
assert.equal(_str, 'text/html;q=1.0');

str = 'text/html;q=1.0;foo=bar';
h = header.parse('Accept', str);
obj = [{
  'params' : {
    'q' : '1.0',
    'foo' : 'bar'
  },
  'type' : 'text',
  'subtype' : 'html'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept', obj);
assert.equal(_str, 'text/html;q=1.0;foo=bar');

str = 'text/html;q=1.0;foo=bar,text/xml';
h = header.parse('Accept', str);
obj = [{
  'params' : {
    'q' : '1.0',
    'foo' : 'bar'
  },
  'type' : 'text',
  'subtype' : 'html'
}, {
  'params' : {},
  'type' : 'text',
  'subtype' : 'xml'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept', obj);
assert.equal(_str, 'text/html;q=1.0;foo=bar,text/xml');

str = 'text/html;q=1.0;foo=bar,text/xml;q=.8';
h = header.parse('Accept', str);
obj = [{
  'params' : {
    'q' : '1.0',
    'foo' : 'bar'
  },
  'type' : 'text',
  'subtype' : 'html'
}, {
  'params' : {
    'q' : '.8'
  },
  'type' : 'text',
  'subtype' : 'xml'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept', obj);
assert.equal(_str, 'text/html;q=1.0;foo=bar,text/xml;q=.8');

str = 'text/html,text/xml;q=.8';
h = header.parse('Accept', str);
obj = [{
  'params' : {},
  'type' : 'text',
  'subtype' : 'html'
}, {
  'params' : {
    'q' : '.8'
  },
  'type' : 'text',
  'subtype' : 'xml'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept', obj);
assert.equal(_str, 'text/html,text/xml;q=.8');

str = 'text/html,text/xml';
h = header.parse('Accept', str);
obj = [{
  'params' : {},
  'type' : 'text',
  'subtype' : 'html'
}, {
  'params' : {},
  'type' : 'text',
  'subtype' : 'xml'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept', obj);
assert.equal(_str, 'text/html,text/xml');

str = 'text/plain; q=0.5, text/html,text/x-dvi; q=0.8, text/x-c';
h = header.parse('Accept', str);
obj = [{
  'params' : {
    'q' : '0.5'
  },
  'type' : 'text',
  'subtype' : 'plain'
}, {
  'params' : {},
  'type' : 'text',
  'subtype' : 'html'
}, {
  'params' : {
    'q' : '0.8'
  },
  'type' : 'text',
  'subtype' : 'x-dvi'
}, {
  'params' : {},
  'type' : 'text',
  'subtype' : 'x-c'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept', obj);
assert.equal(_str, 'text/plain;q=0.5,text/html,text/x-dvi;q=0.8,text/x-c');

str = 'text/plain; q=0.5, text/html,text/x-dvi; q=0.8, *';
h = header.parse('Accept', str);
obj = [{
  'params' : {
    'q' : '0.5'
  },
  'type' : 'text',
  'subtype' : 'plain'
}, {
  'params' : {},
  'type' : 'text',
  'subtype' : 'html'
}, {
  'params' : {
    'q' : '0.8'
  },
  'type' : 'text',
  'subtype' : 'x-dvi'
}, {
  'params' : {},
  'type' : '*'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept', obj);
assert.equal(_str, 'text/plain;q=0.5,text/html,text/x-dvi;q=0.8,*');

str = 'text/*;q=0.3, text/html;q=0.7, text/html;level=1,text/html;level=2;q=0.4, */*;q=0.5';
h = header.parse('Accept', str);
obj = [{
  'params' : {
    'q' : '0.3'
  },
  'type' : 'text',
  'subtype' : '*'
}, {
  'params' : {
    'q' : '0.7'
  },
  'type' : 'text',
  'subtype' : 'html'
}, {
  'params' : {
    'level' : '1'
  },
  'type' : 'text',
  'subtype' : 'html'
}, {
  'params' : {
    'level' : '2',
    'q' : '0.4'
  },
  'type' : 'text',
  'subtype' : 'html'
}, {
  'params' : {
    'q' : '0.5'
  },
  'type' : '*',
  'subtype' : '*'
}];
assert.deepEqual(h, obj);
_str = header.format('Accept', obj);
assert.equal(_str, 'text/*;q=0.3,text/html;q=0.7,text/html;level=1,text/html;level=2;q=0.4,*/*;q=0.5');
