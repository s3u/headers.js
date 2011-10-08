var header = require('lib/headers');

module.exports = {
    'simple': function(test) {

        var str = 'da, en-gb;q=0.8, en;q=0.7';
        var h = header.parse('Accept-Language', str);
        var obj = [
            {
                'params' : {},
                'language' : 'da'
            },
            {
                'params' : {
                    'q' : '0.8'
                },
                'language' : 'en-gb'
            },
            {
                'params' : {
                    'q' : '0.7'
                },
                'language' : 'en'
            }
        ];
        test.deepEqual(h, obj);

        _str = header.format('Accept-Language', obj);
        test.equal(_str, 'da,en-gb;q=0.8,en;q=0.7');
        test.done();
    },
    'case-insensitiveness': function(test) {

        var str = 'da, en-gb;q=0.8, en;q=0.7';
        var h = header.parse('accept-langUage', str);
        var obj = [
            {
                'params' : {},
                'language' : 'da'
            },
            {
                'params' : {
                    'q' : '0.8'
                },
                'language' : 'en-gb'
            },
            {
                'params' : {
                    'q' : '0.7'
                },
                'language' : 'en'
            }
        ];
        test.deepEqual(h, obj);

        _str = header.format('accept-languaGe', obj);
        test.equal(_str, 'da,en-gb;q=0.8,en;q=0.7');
        test.done();
    }
}
