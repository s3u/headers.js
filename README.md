
# Headers

Bunch of code to parse and format the following headers:

* `Accept`
* `Accept-Language`
* `Accept-Charset`
* `Accept-Encoding`
* `Cookie`
* `Set-Cookie`
* `Cache-Control`
* `Link`

Parsing and formatting is implemented by a `header` module which has two functions `parse`, and `format`.
Each of these methods accept two arguments - the name of the header, and either a string or an object. The
structure of the object is specific to each header, but is easily guessable. See the `tests` directory for
examples.

# Example

Here is an example to parse a `Link` header.

    var header = require('header');
    var str = "<http://foo.com>;rel='http://some.rel.com alternate';title='hello';type='application/xml'";
    l = header.parse('Link', val);
    console.log(sys.inspect(l));

Formatting follows the same style.

    var header = require('header');
    sys.log(header.format('Link', {
      href : 'http://www.example.org',
      rel : ['related'],
      title : 'Hello World',
      type : 'text/html'
    }));
