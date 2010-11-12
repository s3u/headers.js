var sys = require('sys'),
    setCookie = require('set-cookie'),
    assert = require('assert');

c = setCookie.parse('foo=bar');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar'
});

c = setCookie.parse('foo=bar;Secure');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar',
  'Secure' : true
});

c = setCookie.parse('foo=bar;Domain=www.subbu.org;Secure');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar',
  'Domain' : 'www.subbu.org',
  'Secure' : true
});

c = setCookie.parse('foo=bar;Domain=www.subbu.org;Secure;Path=/foo');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar',
  'Domain' : 'www.subbu.org',
  'Secure' : true,
  'Path' : '/foo'
});

c = setCookie.parse('foo=bar;Expires=Wed, 15 Nov 1995 06:25:24 GMT');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar',
  'Expires' : 'Wed, 15 Nov 1995 06:25:24 GMT'
});

c = setCookie.parse('foo=bar;Expires=Wed, 15 Nov 1995 06:25:24 GMT;HttpOnly');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar',
  'Expires' : 'Wed, 15 Nov 1995 06:25:24 GMT',
  'HttpOnly' : true
});
