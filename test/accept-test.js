var header = require('lib/headers');

module.exports = {
    'star': function(test) {
        var str = '*';
        var h = header.parse('Accept', str);
        var obj = [
            {
                'params' : {},
                'type' : '*'
            }
        ];
        test.deepEqual(h, obj);
        var _str = header.format('Accept', obj);
        test.equal(_str, '*');
        test.done();
    },

    'html': function(test) {
        var str, h, obj, _str;
        str = 'text/html';
        h = header.parse('Accept', str);
        obj = [
            {
                'params' : {},
                'type' : 'text',
                'subtype' : 'html'
            }
        ];
        test.deepEqual(h, obj);
        _str = header.format('Accept', obj);
        test.equal(_str, 'text/html');
        test.done();
    },

    'q': function(test) {
        var str, h, obj, _str;
        str = 'text/html;q=1.0';
        h = header.parse('Accept', str);
        obj = [
            {
                'params' : {
                    'q' : '1.0'
                },
                'type' : 'text',
                'subtype' : 'html'
            }
        ];
        test.deepEqual(h, obj);
        _str = header.format('Accept', obj);
        test.equal(_str, 'text/html;q=1.0');
        test.done();
    },

    'params': function(test) {
        var str, h, obj, _str;
        str = 'text/html;q=1.0;foo=bar';
        h = header.parse('Accept', str);
        obj = [
            {
                'params' : {
                    'q' : '1.0',
                    'foo' : 'bar'
                },
                'type' : 'text',
                'subtype' : 'html'
            }
        ];
        test.deepEqual(h, obj);
        _str = header.format('Accept', obj);
        test.equal(_str, 'text/html;q=1.0;foo=bar');
        test.done();
    },

    'multiple': function(test) {
        var str, h, obj, _str;
        str = 'text/html;q=1.0;foo=bar,text/xml';
        h = header.parse('Accept', str);
        obj = [
            {
                'params' : {
                    'q' : '1.0',
                    'foo' : 'bar'
                },
                'type' : 'text',
                'subtype' : 'html'
            },
            {
                'params' : {},
                'type' : 'text',
                'subtype' : 'xml'
            }
        ];
        test.deepEqual(h, obj);
        _str = header.format('Accept', obj);
        test.equal(_str, 'text/html;q=1.0;foo=bar,text/xml');
        test.done();
    },

    'multiple-q': function(test) {
        var str, h, obj, _str;
        str = 'text/html;q=1.0;foo=bar,text/xml;q=.8';
        h = header.parse('Accept', str);
        obj = [
            {
                'params' : {
                    'q' : '1.0',
                    'foo' : 'bar'
                },
                'type' : 'text',
                'subtype' : 'html'
            },
            {
                'params' : {
                    'q' : '.8'
                },
                'type' : 'text',
                'subtype' : 'xml'
            }
        ];
        test.deepEqual(h, obj);
        _str = header.format('Accept', obj);
        test.equal(_str, 'text/html;q=1.0;foo=bar,text/xml;q=.8');
        test.done();
    },

    'another-q': function(test) {
        var str, h, obj, _str;
        str = 'text/html,text/xml;q=.8';
        h = header.parse('Accept', str);
        obj = [
            {
                'params' : {},
                'type' : 'text',
                'subtype' : 'html'
            },
            {
                'params' : {
                    'q' : '.8'
                },
                'type' : 'text',
                'subtype' : 'xml'
            }
        ];
        test.deepEqual(h, obj);
        _str = header.format('Accept', obj);
        test.equal(_str, 'text/html,text/xml;q=.8');
        test.done();
    },

    'multiple-noq': function(test) {
        var str, h, obj, _str;
        str = 'text/html,text/xml';
        h = header.parse('Accept', str);
        obj = [
            {
                'params' : {},
                'type' : 'text',
                'subtype' : 'html'
            },
            {
                'params' : {},
                'type' : 'text',
                'subtype' : 'xml'
            }
        ];
        test.deepEqual(h, obj);
        _str = header.format('Accept', obj);
        test.equal(_str, 'text/html,text/xml');
        test.done();
    },


    'multiple-complex': function(test) {
        var str, h, obj, _str;
        str = 'text/plain; q=0.5, text/html,text/x-dvi; q=0.8, text/x-c';
        h = header.parse('Accept', str);
        obj = [
            {
                'params' : {
                    'q' : '0.5'
                },
                'type' : 'text',
                'subtype' : 'plain'
            },
            {
                'params' : {},
                'type' : 'text',
                'subtype' : 'html'
            },
            {
                'params' : {
                    'q' : '0.8'
                },
                'type' : 'text',
                'subtype' : 'x-dvi'
            },
            {
                'params' : {},
                'type' : 'text',
                'subtype' : 'x-c'
            }
        ];
        test.deepEqual(h, obj);
        _str = header.format('Accept', obj);
        test.equal(_str, 'text/plain;q=0.5,text/html,text/x-dvi;q=0.8,text/x-c');
        test.done();
    },

    'multiple-complex-2': function(test) {
        var str, h, obj, _str;
        str = 'text/plain; q=0.5, text/html,text/x-dvi; q=0.8, *';
        h = header.parse('Accept', str);
        obj = [
            {
                'params' : {
                    'q' : '0.5'
                },
                'type' : 'text',
                'subtype' : 'plain'
            },
            {
                'params' : {},
                'type' : 'text',
                'subtype' : 'html'
            },
            {
                'params' : {
                    'q' : '0.8'
                },
                'type' : 'text',
                'subtype' : 'x-dvi'
            },
            {
                'params' : {},
                'type' : '*'
            }
        ];
        test.deepEqual(h, obj);
        _str = header.format('Accept', obj);
        test.equal(_str, 'text/plain;q=0.5,text/html,text/x-dvi;q=0.8,*');
        test.done();
    },

    'multiple-complex-3': function(test) {
        var str, h, obj, _str;
        str = 'text/*;q=0.3, text/html;q=0.7, text/html;level=1,text/html;level=2;q=0.4, */*;q=0.5';
        h = header.parse('Accept', str);
        obj = [
            {
                'params' : {
                    'q' : '0.3'
                },
                'type' : 'text',
                'subtype' : '*'
            },
            {
                'params' : {
                    'q' : '0.7'
                },
                'type' : 'text',
                'subtype' : 'html'
            },
            {
                'params' : {
                    'level' : '1'
                },
                'type' : 'text',
                'subtype' : 'html'
            },
            {
                'params' : {
                    'level' : '2',
                    'q' : '0.4'
                },
                'type' : 'text',
                'subtype' : 'html'
            },
            {
                'params' : {
                    'q' : '0.5'
                },
                'type' : '*',
                'subtype' : '*'
            }
        ];
        test.deepEqual(h, obj);
        _str = header.format('Accept', obj);
        test.equal(_str, 'text/*;q=0.3,text/html;q=0.7,text/html;level=1,text/html;level=2;q=0.4,*/*;q=0.5');
        test.done();
    },
    'case-insensitiveness': function(test) {
            var str, h, obj, _str;
            str = 'text/html;q=1.0;foo=bar,text/xml';
            h = header.parse('accePt', str);
            obj = [
                {
                    'params' : {
                        'q' : '1.0',
                        'foo' : 'bar'
                    },
                    'type' : 'text',
                    'subtype' : 'html'
                },
                {
                    'params' : {},
                    'type' : 'text',
                    'subtype' : 'xml'
                }
            ];
            test.deepEqual(h, obj);
            _str = header.format('accept', obj);
            test.equal(_str, 'text/html;q=1.0;foo=bar,text/xml');
            test.done();
        }

}