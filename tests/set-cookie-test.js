var sys = require('sys'),
    header = require('headers'),
    assert = require('assert');

c = header.parse('Set-Cookie', 'foo=bar');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar'
});

c = header.parse('Set-Cookie', 'foo=bar;Secure');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar',
  'Secure' : true
});

c = header.parse('Set-Cookie', 'foo=bar;Domain=www.subbu.org;Secure');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar',
  'Domain' : 'www.subbu.org',
  'Secure' : true
});

c = header.parse('Set-Cookie', 'foo=bar;Domain=www.subbu.org;Secure;Path=/foo');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar',
  'Domain' : 'www.subbu.org',
  'Secure' : true,
  'Path' : '/foo'
});

c = header.parse('Set-Cookie', 'foo=bar;Expires=Wed, 15 Nov 1995 06:25:24 GMT');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar',
  'Expires' : 'Wed, 15 Nov 1995 06:25:24 GMT'
});

c = header.parse('Set-Cookie', 'foo=bar;Expires=Wed, 15 Nov 1995 06:25:24 GMT;HttpOnly');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar',
  'Expires' : 'Wed, 15 Nov 1995 06:25:24 GMT',
  'HttpOnly' : true
});
