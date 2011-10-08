var header = require('lib/headers');

module.exports = {
    'simple': function(test) {
        var c = header.parse('Set-Cookie', 'foo=bar');
        test.deepEqual(c, {
          name : 'foo',
          value : 'bar'
        });
        test.done();
    },
    'param': function(test) {
        c = header.parse('Set-Cookie', 'foo=bar;Secure');
        test.deepEqual(c, {
          name : 'foo',
          value : 'bar',
          'Secure' : true
        });
        test.done();
    },
    'domain': function(test) {
        var c = header.parse('Set-Cookie', 'foo=bar;Domain=www.subbu.org;Secure');
        test.deepEqual(c, {
          name : 'foo',
          value : 'bar',
          'Domain' : 'www.subbu.org',
          'Secure' : true
        });
        test.done();
    },
    'path': function(test) {
        c = header.parse('Set-Cookie', 'foo=bar;Domain=www.subbu.org;Secure;Path=/foo');
        test.deepEqual(c, {
          name : 'foo',
          value : 'bar',
          'Domain' : 'www.subbu.org',
          'Secure' : true,
          'Path' : '/foo'
        });
        test.done();
    },
    'expires': function(test) {
        c = header.parse('Set-Cookie', 'foo=bar;Expires=Wed, 15 Nov 1995 06:25:24 GMT');
        test.deepEqual(c, {
          name : 'foo',
          value : 'bar',
          'Expires' : 'Wed, 15 Nov 1995 06:25:24 GMT'
        });
        test.done();
    },
    'httpOnly': function(test) {
        c = header.parse('Set-Cookie', 'foo=bar;Expires=Wed, 15 Nov 1995 06:25:24 GMT;HttpOnly');
        test.deepEqual(c, {
          name : 'foo',
          value : 'bar',
          'Expires' : 'Wed, 15 Nov 1995 06:25:24 GMT',
          'HttpOnly' : true
        });
        test.done();
    },
    'case-insensitiveness': function(test) {
        var c = header.parse('set-cookie', 'foo=bar');
        test.deepEqual(c, {
          name : 'foo',
          value : 'bar'
        });
        test.done();
    }
}