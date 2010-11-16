var sys = require('sys'),
    cc = require('cache-control'),
    assert = require('assert');

val = 'max-age=10';
c = cc.parse(val);
assert.deepEqual(c, {
  'max-age' : '10'
});
assert.equal(cc.format({
  'max-age' : '10'
}), 'max-age=10');

val = 'no-cache';
c = cc.parse(val);
assert.deepEqual(c, {
  'no-cache' : true
});
assert.equal(cc.format({
  'no-cache' : true
}), 'no-cache');

val = 'private,no-cache';
c = cc.parse(val);
assert.deepEqual(c, {
  'private' : true,
  'no-cache' : true
});
assert.equal(cc.format({
  'private' : true,
  'no-cache' : true
}), 'private,no-cache');

val = 'public,max-age=10,max-stale=10';
c = cc.parse(val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'max-stale' : '10'
});
assert.equal(cc.format({
  'public' : true,
  'max-age' : '10',
  'max-stale' : '10'
}), 'public,max-age=10,max-stale=10');

val = 'max-age=10,public,max-stale=10';
c = cc.parse(val);
assert.deepEqual(c, {
  'max-age' : '10',
  'public' : true,
  'max-stale' : '10'
});
assert.ok(!c['private']);
assert.equal(cc.format({
  'max-age' : '10',
  'public' : true,
  'max-stale' : '10'
}), 'max-age=10,public,max-stale=10');

val = 'max-age=10,max-stale=10,public';
c = cc.parse(val);
assert.deepEqual(c, {
  'max-age' : '10',
  'max-stale' : '10',
  'public' : true
});
assert.ok(!c['private']);
assert.equal(cc.format({
  'max-age' : '10',
  'max-stale' : '10',
  'public' : true
}), 'max-age=10,max-stale=10,public');

val = 'only-if-cached';
c = cc.parse(val);
assert.deepEqual(c, {
  'only-if-cached' : true
});
assert.ok(!c['max-age']);
assert.equal(cc.format({
  'only-if-cached' : true
}), 'only-if-cached');

val = 'public,max-age=10,foo=30';
c = cc.parse(val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'foo' : '30'
});
assert.equal(cc.format({
  'public' : true,
  'max-age' : '10',
  'foo' : '30'
}), 'public,max-age=10,foo=30');

val = "public,max-age=10,bar='bara'";
c = cc.parse(val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bara'"
})
assert.equal(cc.format({
  'public' : true,
  'max-age' : '10',
  'bar' : '\'bara\''
}), 'public,max-age=10,bar=\'bara\'');

// LWS
val = "public, max-age=10, bar='bara'";
c = cc.parse(val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bara'"
});
val = "public ,max-age=10 , bar='bar baz'";
c = cc.parse(val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bar baz'"
});
val = "public ,max-age=10 , bar='bara'";
c = cc.parse(val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bara'"
});
val = "public ,     max-age= 10   ,   bar  =  'bar baz'";
c = cc.parse(val);
assert.deepEqual(c, {
  'public' : true,
  'max-age' : '10',
  'bar' : "'bar baz'"
})

