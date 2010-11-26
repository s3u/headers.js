var sys = require('sys'),
    header = require('header'),
    assert = require('assert');

c = header.parse('Cookie', 'foo=bar');
assert.deepEqual(c, {
  name : 'foo',
  value : 'bar'
});
assert.equal(header.format('Cookie', {
  name : 'foo',
  value : 'bar'
}), 'foo=bar');
