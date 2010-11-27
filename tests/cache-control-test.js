var sys = require('sys'),
    header = require('header'),
    assert = require('assert');

var val = 'max-age=10';
var c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'max-age' : '10'
});
assert.equal(header.format('Cache-Control', {
  'max-age' : '10'
}), 'max-age=10');

val = 'no-cache';
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'no-cache' : true
});
assert.equal(header.format('Cache-Control', {
  'no-cache' : true
}), 'no-cache');

val = 'private,no-cache';
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'private' : true,
  'no-cache' : true
});
assert.equal(header.format('Cache-Control', {
  'private' : true,
  'no-cache' : true
}), 'private,no-cache');

val = 'public,max-age=10,max-stale=10';
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'max-stale' : '10'
});
assert.equal(header.format('Cache-Control', {
  'public' : true,
  'max-age' : '10',
  'max-stale' : '10'
}), 'public,max-age=10,max-stale=10');

val = 'max-age=10,public,max-stale=10';
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'max-age' : '10',
  'public' : true,
  'max-stale' : '10'
});
assert.ok(!c['private']);
assert.equal(header.format('Cache-Control', {
  'max-age' : '10',
  'public' : true,
  'max-stale' : '10'
}), 'max-age=10,public,max-stale=10');

val = 'max-age=10,max-stale=10,public';
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'max-age' : '10',
  'max-stale' : '10',
  'public' : true
});
assert.ok(!c['private']);
assert.equal(header.format('Cache-Control', {
  'max-age' : '10',
  'max-stale' : '10',
  'public' : true
}), 'max-age=10,max-stale=10,public');

val = 'only-if-cached';
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'only-if-cached' : true
});
assert.ok(!c['max-age']);
assert.equal(header.format('Cache-Control', {
  'only-if-cached' : true
}), 'only-if-cached');

val = 'public,max-age=10,foo=30';
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'foo' : '30'
});
assert.equal(header.format('Cache-Control', {
  'public' : true,
  'max-age' : '10',
  'foo' : '30'
}), 'public,max-age=10,foo=30');

val = "public,max-age=10,bar='bara'";
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bara'"
});
assert.equal(header.format('Cache-Control', {
  'public' : true,
  'max-age' : '10',
  'bar' : '\'bara\''
}), 'public,max-age=10,bar=\'bara\'');

// LWS
val = "public, max-age=10, bar='bara'";
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bara'"
});
val = "public ,max-age=10 , bar='bar baz'";
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bar baz'"
});
val = "public ,max-age=10 , bar='bara'";
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bara'"
});
val = "public ,     max-age= 10   ,   bar  =  'bar baz'";
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bar baz'"
})

val = "public,, ,max-age= 10   ,   bar  =  'bar baz'";
c = header.parse('Cache-Control', val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bar baz'"
})
