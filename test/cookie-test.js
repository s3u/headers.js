var header = require('lib/headers');

module.exports = {
    'cookie': function(test) {
        var c = header.parse('Cookie', 'foo=bar');
        test.deepEqual(c, {
          name : 'foo',
          value : 'bar'
        });
        test.equal(header.format('Cookie', {
          name : 'foo',
          value : 'bar'
        }), 'foo=bar');
        test.done();
    },
    'case-insensitiveness': function(test) {
        var c = header.parse('cookIe', 'foo=bar');
        test.deepEqual(c, {
          name : 'foo',
          value : 'bar'
        });
        test.equal(header.format('coOkie', {
          name : 'foo',
          value : 'bar'
        }), 'foo=bar');
        test.done();
    }
}
