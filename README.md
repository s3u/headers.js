
# Headers

Contains HTTP header parsing modules.

## Link

RFC 5988 specifies this header. Here is the format.

    Link           = "Link" ":" #link-value
    link-value     = "<" URI-Reference ">" *( ";" link-param )
    link-param     = ( ( "rel" "=" relation-types )
                   | ( "anchor" "=" <"> URI-Reference <"> )
                   | ( "rev" "=" relation-types )
                   | ( "hreflang" "=" Language-Tag )
                   | ( "media" "=" ( MediaDesc | ( <"> MediaDesc <"> ) ) )
                   | ( "title" "=" quoted-string )
                   | ( "title*" "=" ext-value )
                   | ( "type" "=" ( media-type | quoted-mt ) )
                   | ( link-extension ) )
    link-extension = ( parmname [ "=" ( ptoken | quoted-string ) ] )
                   | ( ext-name-star "=" ext-value )
    ext-name-star  = parmname "*" ; reserved for RFC2231-profiled
                                  ; extensions.  Whitespace NOT
                                  ; allowed in between.
    ptoken         = 1*ptokenchar
    ptokenchar     = "!" | "#" | "$" | "%" | "&" | "'" | "("
                   | ")" | "*" | "+" | "-" | "." | "/" | DIGIT
                   | ":" | "<" | "=" | ">" | "?" | "@" | ALPHA
                   | "[" | "]" | "^" | "_" | "`" | "{" | "|"
                   | "}" | "~"
    media-type     = type-name "/" subtype-name
    quoted-mt      = <"> media-type <">
    relation-types = relation-type
                   | <"> relation-type *( 1*SP relation-type ) <">
    relation-type  = reg-rel-type | ext-rel-type
    reg-rel-type   = LOALPHA *( LOALPHA | DIGIT | "." | "-" )
    ext-rel-type   = URI

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
    