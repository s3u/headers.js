var sys = require('sys'),
    header = require('header'),
    assert = require('assert');

var val = "public,, ,max-age= 10   ,   bar  =  'bar baz'";
var c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bar baz'"
});
assert.equal(header.format('Cache-Control', {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bar baz'"
}), "public,max-age=10,bar='bar baz'");

try {
  header.parse('Foo', 'Bar');
  assert.ok(false);
}
catch(e) {
  assert.ok(true);
}
