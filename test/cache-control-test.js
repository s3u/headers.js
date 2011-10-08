var header = require('lib/headers');

module.exports = {
    'max-age': function(test) {
        var val = 'max-age=10';
        var c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'max-age' : '10'
        });
        test.equal(header.format('Cache-Control', {
            'max-age' : '10'
        }), 'max-age=10');
        test.done();
    },

    'no-cache': function(test) {
        var val, c;
        val = 'no-cache';
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'no-cache' : true
        });
        test.equal(header.format('Cache-Control', {
            'no-cache' : true
        }), 'no-cache');
        test.done();
    },

    'private-no-cache': function(test) {
        var val, c;
        val = 'private,no-cache';
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'private' : true,
            'no-cache' : true
        });
        test.equal(header.format('Cache-Control', {
            'private' : true,
            'no-cache' : true
        }), 'private,no-cache');
        test.done();
    },

    'max-age-max-stale': function(test) {
        var val, c;
        val = 'public,max-age=10,max-stale=10';
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'public' : true,
            'max-age' : '10',
            'max-stale' : '10'
        });
        test.equal(header.format('Cache-Control', {
            'public' : true,
            'max-age' : '10',
            'max-stale' : '10'
        }), 'public,max-age=10,max-stale=10');
        test.done();
    },

    'max-age-public-max-stale': function(test) {
        var val, c;
        val = 'max-age=10,public,max-stale=10';
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'max-age' : '10',
            'public' : true,
            'max-stale' : '10'
        });
        test.ok(!c['private']);
        test.equal(header.format('Cache-Control', {
            'max-age' : '10',
            'public' : true,
            'max-stale' : '10'
        }), 'max-age=10,public,max-stale=10');
        test.done();
    },

    'max-age-max-stale-public': function(test) {
        var val, c;
        val = 'max-age=10,max-stale=10,public';
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'max-age' : '10',
            'max-stale' : '10',
            'public' : true
        });
        test.ok(!c['private']);
        test.equal(header.format('Cache-Control', {
            'max-age' : '10',
            'max-stale' : '10',
            'public' : true
        }), 'max-age=10,max-stale=10,public');
        test.done();
    },

    'only-if-cached': function(test) {
        var val, c;
        val = 'only-if-cached';
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'only-if-cached' : true
        });
        test.ok(!c['max-age']);
        test.equal(header.format('Cache-Control', {
            'only-if-cached' : true
        }), 'only-if-cached');
        test.done();
    },

    'param': function(test) {
        var val, c;
        val = 'public,max-age=10,foo=30';
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'public' : true,
            'max-age' : '10',
            'foo' : '30'
        });
        test.equal(header.format('Cache-Control', {
            'public' : true,
            'max-age' : '10',
            'foo' : '30'
        }), 'public,max-age=10,foo=30');
        test.done();
    },

    'quoted': function(test) {
        var val, c;
        val = "public,max-age=10,bar='bara'";
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'public' : true,
            'max-age' : '10',
            'bar' : "'bara'"
        });
        test.equal(header.format('Cache-Control', {
            'public' : true,
            'max-age' : '10',
            'bar' : '\'bara\''
        }), 'public,max-age=10,bar=\'bara\'');
        test.done();
    },

    'lws': function(test) {
        var val, c;
        val = "public, max-age=10, bar='bara'";
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'public' : true,
            'max-age' : '10',
            'bar' : "'bara'"
        });
        val = "public ,max-age=10 , bar='bar baz'";
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'public' : true,
            'max-age' : '10',
            'bar' : "'bar baz'"
        });
        val = "public ,max-age=10 , bar='bara'";
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'public' : true,
            'max-age' : '10',
            'bar' : "'bara'"
        });
        val = "public ,     max-age= 10   ,   bar  =  'bar baz'";
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'public' : true,
            'max-age' : '10',
            'bar' : "'bar baz'"
        })

        val = "public,, ,max-age= 10   ,   bar  =  'bar baz'";
        c = header.parse('Cache-Control', val);
        test.deepEqual(c, {
            'public' : true,
            'max-age' : '10',
            'bar' : "'bar baz'"
        })
        test.done();
    },
    'case-insensitiveness': function(test) {
        var val, c;
        val = 'public,max-age=10,foo=30';
        c = header.parse('cache-contRol', val);
        test.deepEqual(c, {
            'public' : true,
            'max-age' : '10',
            'foo' : '30'
        });
        test.equal(header.format('cacHe-control', {
            'public' : true,
            'max-age' : '10',
            'foo' : '30'
        }), 'public,max-age=10,foo=30');
        test.done();
    }
}