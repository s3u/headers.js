var header = require('lib/headers');

module.exports = {
    'title': function(test) {
        var val = "<http://foo.com>;rel='href';title='hello'";
        var l = header.parse('Link', val);
        test.deepEqual(l, {
          href : 'http://foo.com',
          rel : ['href'],
          title : 'hello'
        });
        test.done();
    },

    'title-type': function(test) {
        var val = "<http://foo.com>;rel='http://some.rel.com';title='hello';type='application/xml'";
        var l = header.parse('Link', val);
        test.deepEqual(l, {
          href : 'http://foo.com',
          rel : ['http://some.rel.com'],
          title : 'hello',
          type : 'application/xml'
        });
        test.done();
    },

    'multiple-rel': function(test) {
        var val = "<http://foo.com>;rel='http://some.rel.com alternate';title='hello';type='application/xml'";
        var l = header.parse('Link', val);
        test.deepEqual(l, {
          href : 'http://foo.com',
          rel : ['http://some.rel.com', 'alternate'],
          title : 'hello',
          type : 'application/xml'
        });
        test.done();
    },

    'format-type': function(test) {
        var str = header.format('Link', {
          href : 'http://www.example.org',
          rel : ['related'],
          title : 'Hello World',
          type : 'text/html'
        });
        test.equal(str, "<http://www.example.org>;rel=related;title='Hello World';type='text/html'");
        test.done();
    },

    'format-no-href': function(test) {
        var str= header.format('Link', {
          rel : ['related']
        });
        test.equal(str, "<>;rel=related");
        test.done();
    },

    'format-rel-type': function(test) {
        var str = header.format('Link', {
          rel : ['related'],
          type: 'application/xml'
        });
        test.equal(str, "<>;rel=related;type='application/xml'");
        test.done();
    },
    'case-insensitiveness' : function(test) {
        var str = header.format('linK', {
          href : 'http://www.example.org',
          rel : ['related'],
          title : 'Hello World',
          type : 'text/html'
        });
        test.equal(str, "<http://www.example.org>;rel=related;title='Hello World';type='text/html'");
        test.done();
    }
}