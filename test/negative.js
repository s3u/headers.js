
var headers = require('lib/headers');

module.exports = {
    'unsupported-header': function(test) {
        var str = '*';
        var _header = 'authorize';
        try {
            var h = headers.parse(_header, str);
        }
        catch(err) {
            test.ok("Don't know how to parse " + _header, err);

        }
        var obj = [
            {
                'params' : {},
                'type' : '*'
            }
        ];
        try {
            var _str = headers.format('authorize', obj);
        }
        catch(err) {
            test.ok("Don't know how to parse " + _header, err);

        }
        test.done();
    }
}