var header = require('lib/headers');

module.exports = {
    'content-type': function(test) {
        var str = 'text/html';
        var h = header.parse('Content-Type', str);
        var obj = {
          'params' : {},
          'type' : 'text',
          'subtype' : 'html'
        };
        test.deepEqual(h, obj);
        test.done();
    },

    'case-insensitiveness': function(test) {
        var str = 'text/html';
        var h = header.parse('content-Type', str);
        var obj = {
          'params' : {},
          'type' : 'text',
          'subtype' : 'html'
        };
        test.deepEqual(h, obj);
        test.done();
    }

}
