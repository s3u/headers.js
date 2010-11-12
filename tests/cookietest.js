var sys = require('sys'),
    cookie = require('cookie'),
    assert = require('assert');

c = cookie.parse('foo=bar');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar'
});
assert.equal(cookie.format({
  name : 'foo',
  value : 'bar'
}), 'foo=bar');
