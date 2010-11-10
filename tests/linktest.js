var sys = require('sys'),
    link = require('link'),
    assert = require('assert');

var val = "<http://foo.com>;rel='href';title='hello'";
var l = link.parse(val);
assert.equal(l.href, 'http://foo.com');
assert.equal(l.rel.length, 1, 'Expected 1 rel, but got ' + l.rel.length);
assert.equal(l.rel[0], 'href', 'Expected href, but got ' + l.rel[0]);
assert.equal(l.title, 'hello');

val = "<http://foo.com>;rel='http://some.rel.com';title='hello';type='application/xml'";
l = link.parse(val);
assert.equal(l.href, 'http://foo.com');
assert.equal(l.rel.length, 1);
assert.equal(l.rel[0], 'http://some.rel.com');
assert.equal(l.title, 'hello');
assert.equal(l.type, 'application/xml');

val = "<http://foo.com>;rel='http://some.rel.com alternate';title='hello';type='application/xml'";
l = link.parse(val);
assert.equal(l.href, 'http://foo.com');
assert.equal(l.rel.length, 2);
assert.equal(l.rel[0], 'http://some.rel.com');
assert.equal(l.rel[1], 'alternate');
assert.equal(l.title, 'hello');
assert.equal(l.type, 'application/xml');
assert.ok(l.hasRelationType('alternate'));

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
