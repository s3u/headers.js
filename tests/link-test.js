var sys = require('sys'),
    header = require('headers'),
    assert = require('assert');

var val = "<http://foo.com>;rel='href';title='hello'";
var l = header.parse('Link', val);
assert.deepEqual(l, {
  href : 'http://foo.com',
  rel : ['href'],
  title : 'hello'
});

val = "<http://foo.com>;rel='http://some.rel.com';title='hello';type='application/xml'";
l = header.parse('Link', val);
assert.deepEqual(l, {
  href : 'http://foo.com',
  rel : ['http://some.rel.com'],
  title : 'hello',
  type : 'application/xml'
});

val = "<http://foo.com>;rel='http://some.rel.com alternate';title='hello';type='application/xml'";
l = header.parse('Link', val);
assert.deepEqual(l, {
  href : 'http://foo.com',
  rel : ['http://some.rel.com', 'alternate'],
  title : 'hello',
  type : 'application/xml'
});

var str = header.format('Link', {
  href : 'http://www.example.org',
  rel : ['related'],
  title : 'Hello World',
  type : 'text/html'
});
assert.equal(str, "<http://www.example.org>;rel=related;title='Hello World';type='text/html'");

str= header.format('Link', {
  rel : ['related']
});
assert.equal(str, "<>;rel=related");

str = header.format('Link', {
  rel : ['related'],
  type: 'application/xml'
});
assert.equal(str, "<>;rel=related;type='application/xml'");
