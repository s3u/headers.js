
# Headers

This is a commonjs compatible Javascript module for parsing and format the following HTTP headers:

* `Content-Type` (per RFC 2616)
* `Accept` (per RFC 2616)
* `Accept-Language` (per RFC 2616)
* `Accept-Charset` (per RFC 2616)
* `Accept-Encoding` (per RFC 2616)
* `Cookie` (per http://tools.ietf.org/html/draft-ietf-httpstate-cookie-18)
* `Set-Cookie` (per http://tools.ietf.org/html/draft-ietf-httpstate-cookie-18)
* `Cache-Control` (per RFC 2616)
* `Link` (per RFC 5988)

Parsing and formatting is implemented by a `header` module which has two functions `parse`, and `format`.
Each of these methods accept two arguments - the name of the header, and either a string (for parsing) or
an object (for formatting. The structure of the object is specific to each header, but is easily
guessable. See the `tests` directory for examples.

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

# Installing

    npm install headers
