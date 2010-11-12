var sys = require('sys'),
    link = require('link'),
    assert = require('assert');

var val = "<http://foo.com>;rel='href';title='hello'";
var l = link.parse(val);
assert.deepEqual(l, {
  href : 'http://foo.com',
  rel : ['href'],
  title : 'hello'
});

val = "<http://foo.com>;rel='http://some.rel.com';title='hello';type='application/xml'";
l = link.parse(val);
assert.deepEqual(l, {
  href : 'http://foo.com',
  rel : ['http://some.rel.com'],
  title : 'hello',
  type : 'application/xml'
});

val = "<http://foo.com>;rel='http://some.rel.com alternate';title='hello';type='application/xml'";
l = link.parse(val);
assert.deepEqual(l, {
  href : 'http://foo.com',
  rel : ['http://some.rel.com', 'alternate'],
  title : 'hello',
  type : 'application/xml'
});
assert.ok(link.hasRelationType(l, 'alternate'));

var str = link.format({
  href : 'http://www.example.org',
  rel : ['related'],
  title : 'Hello World',
  type : 'text/html'
});
assert.equal(str, "<http://www.example.org>;rel=related;title='Hello World';type='text/html'");

str= link.format({
  rel : ['related']
});
assert.equal(str, "<>;rel=related");

str = link.format({
  rel : ['related'],
  type: 'application/xml'
});
assert.equal(str, "<>;rel=related;type='application/xml'");
