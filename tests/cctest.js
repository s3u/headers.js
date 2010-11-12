var sys = require('sys'),
    cc = require('cache-control'),
    assert = require('assert');

val = 'max-age=10';
c = cc.parse(val);
assert.deepEqual(c, {
  'max-age' : '10'
});

val = 'no-cache';
c = cc.parse(val);
assert.deepEqual(c, {
  'no-cache' : true
});

val = 'private,no-cache';
c = cc.parse(val);
assert.deepEqual(c, {
  'private' : true,
  'no-cache' : true
});

val = 'public,max-age=10,max-stale=10';
c = cc.parse(val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'max-stale' : '10'
});

val = 'max-age=10,public,max-stale=10';
c = cc.parse(val);
assert.deepEqual(c, {
  'max-age' : '10',
  'public' : true,
  'max-stale' : '10'
});
assert.ok(!c['private']);

val = 'max-age=10,max-stale=10,public';
c = cc.parse(val);
assert.deepEqual(c, {
  'max-age' : '10',
  'max-stale' : '10',
  'public' : true
});
assert.ok(!c['private']);

val = 'only-if-cached';
c = cc.parse(val);
assert.deepEqual(c, {
  'only-if-cached' : true
});
assert.ok(!c['max-age']);

val = 'public,max-age=10,foo=30';
c = cc.parse(val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'foo' : '30'
})

val = "public,max-age=10,bar='bara'";
c = cc.parse(val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bara'"
})

