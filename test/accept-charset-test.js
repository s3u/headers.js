var header = require('lib/headers');

module.exports = {
    'accept-chartset': function(test) {
        var str = 'iso-8859-5, unicode-1-1;q=0.8';
        var h = header.parse('Accept-Charset', str);
        var obj = [
            {
                'params' : {},
                'charset' : 'iso-8859-5'
            },
            {
                'params' : {
                    'q' : '0.8'
                },
                'charset' : 'unicode-1-1'
            }
        ];
        test.deepEqual(h, obj);
        var _str = header.format('Accept-Charset', obj);
        test.equal(_str, 'iso-8859-5,unicode-1-1;q=0.8');
        test.done();
    },
    'case-insensitiveness': function(test) {
        var str = 'iso-8859-5, unicode-1-1;q=0.8';
        var h = header.parse('accept-charseT', str);
        var obj = [
            {
                'params' : {},
                'charset' : 'iso-8859-5'
            },
            {
                'params' : {
                    'q' : '0.8'
                },
                'charset' : 'unicode-1-1'
            }
        ];
        test.deepEqual(h, obj);
        var _str = header.format('accept-charsEt', obj);
        test.equal(_str, 'iso-8859-5,unicode-1-1;q=0.8');
        test.done();
    }
}
