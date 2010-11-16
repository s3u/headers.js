
# Headers

Contains HTTP header parsing modules.

## Link (RFC 5988)

### Parsing

    var val = "<http://foo.com>;rel='http://some.rel.com alternate';title='hello';type='application/xml'";
    l = link.parse(val);
    console.log(sys.inspect(l));

    sys.log(link.hasRelationType(l, 'alternate'));

### Formatting

    sys.log(link.format({
      href : 'http://www.example.org',
      rel : ['related'],
      title : 'Hello World',
      type : 'text/html'
    }));

## Cache-Control (RFC 2616)

    val = 'public,max-age=10,max-stale=10';
    c = cc.parse(val);
    sys.log(sys.inspect(c));

## Set-Cookie

Based
on
[HTTP
State
Management
Mechanism](http://tools.ietf.org/html/draft-ietf-httpstate-cookie-17).

    c = setCookie.parse('foo=bar;Domain=www.subbu.org;Secure');
    sys.log(sys.inspect(c));

## TODO

* White space in #rule
* Implied linear white space (LWS)
* Accept
* Accept-Charset
* Accept-Encoding
* Accept-Language
* Accept-Range
* Allow
* 