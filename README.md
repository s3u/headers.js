
# Headers

Contains HTTP header parsing modules.

## Link

RFC 5988 specifies this header.

### Parsing

    val = "<http://foo.com>;rel='http://some.rel.com alternate';title='hello';type='application/xml'";
    var l = require('link').parse(val);

    // Get href
    sys.log('Link href: ' + link.href);

    // Get rel types
    for(v in l[name]) {
      sys.log(l[name][v]);
    }

    // Check 
    sys.log(l.hasRelationType('alternate'));

### Formatting

    sys.log(link.format({
      href : 'http://www.example.org',
      rel : ['related'],
      title : 'Hello World',
      type : 'text/html'
    }));
    