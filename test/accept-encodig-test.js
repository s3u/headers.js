var header = require('lib/headers');

module.exports = {
    'simple': function(test) {
        var str = 'compress;q=0.5, gzip;q=1.0';
        var h = header.parse('Accept-Encoding', str);
        var obj = [
            {
                'params' : {
                    'q' : '0.5'
                },
                'encoding' : 'compress'
            },
            {
                'params' : {
                    'q' : '1.0'
                },
                'encoding' : 'gzip'
            }
        ];
        test.deepEqual(h, obj);
        var _str = header.format('Accept-Encoding', obj);
        test.equal(_str, 'compress;q=0.5,gzip;q=1.0');
        test.done();
    },

    'star': function(test) {
        var str = '*';
        var h = header.parse('Accept-Encoding', str);
        var obj = [
            {
                'params' : {},
                'encoding' : '*'
            }
        ];
        test.deepEqual(h, obj);
        var _str = header.format('Accept-Encoding', obj);
        test.equal(_str, str);
        test.done();
    },

    'empty': function(test) {
        var str = '';
        var h = header.parse('Accept-Encoding', str);
        var obj = [
            {
                'params' : {},
                'encoding' : ''
            }
        ];
        test.deepEqual(h, obj);
        var _str = header.format('Accept-Encoding', obj);
        test.equal(_str, str);
        test.done();
    },

    'complex': function(test) {
        var str = 'gzip;q=1.0, identity; q=0.5, *;q=0';
        var h = header.parse('Accept-Encoding', str);
        var obj = [
            {
                'params' : {
                    'q' : '1.0'
                },
                'encoding' : 'gzip'
            },
            {
                'params' : {
                    'q' : '0.5'
                },
                'encoding' : 'identity'
            },
            {
                'params' : {
                    'q' : '0'
                },
                'encoding' : '*'
            }
        ];
        test.deepEqual(h, obj);
        var _str = header.format('Accept-Encoding', obj);
        test.equal(_str, 'gzip;q=1.0,identity;q=0.5,*;q=0');
        test.done();
    },
    'case-insensitiveness': function(test) {
        var str = 'gzip;q=1.0, identity; q=0.5, *;q=0';
        var h = header.parse('accept-encodiNg', str);
        var obj = [
            {
                'params' : {
                    'q' : '1.0'
                },
                'encoding' : 'gzip'
            },
            {
                'params' : {
                    'q' : '0.5'
                },
                'encoding' : 'identity'
            },
            {
                'params' : {
                    'q' : '0'
                },
                'encoding' : '*'
            }
        ];
        test.deepEqual(h, obj);
        var _str = header.format('accept-encodIng', obj);
        test.equal(_str, 'gzip;q=1.0,identity;q=0.5,*;q=0');
        test.done();
    }
}

