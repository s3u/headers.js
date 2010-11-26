exports.parse = parse,
  exports.format = format;

//    Link           = "Link" ":" #link-value
//    link-value     = "<" URI-Reference ">" *( ";" link-param )
//    link-param     = ( ( "rel" "=" relation-types )
//                   | ( "anchor" "=" <"> URI-Reference <"> )
//                   | ( "rev" "=" relation-types )
//                   | ( "hreflang" "=" Language-Tag )
//                   | ( "media" "=" ( MediaDesc | ( <"> MediaDesc <"> ) ) )
//                   | ( "title" "=" quoted-string )
//                   | ( "title*" "=" ext-value )
//                   | ( "type" "=" ( media-type | quoted-mt ) )
//                   | ( link-extension ) )
//    link-extension = ( parmname [ "=" ( ptoken | quoted-string ) ] )
//                   | ( ext-name-star "=" ext-value )
//    ext-name-star  = parmname "*" ; reserved for RFC2231-profiled
//                                  ; extensions.  Whitespace NOT
//                                  ; allowed in between.
//    ptoken         = 1*ptokenchar
//    ptokenchar     = "!" | "#" | "$" | "%" | "&" | "'" | "("
//                   | ")" | "*" | "+" | "-" | "." | "/" | DIGIT
//                   | ":" | "<" | "=" | ">" | "?" | "@" | ALPHA
//                   | "[" | "]" | "^" | "_" | "`" | "{" | "|"
//                   | "}" | "~"
//    media-type     = type-name "/" subtype-name
//    quoted-mt      = <"> media-type <">
//    relation-types = relation-type
//                   | <"> relation-type *( 1*SP relation-type ) <">
//    relation-type  = reg-rel-type | ext-rel-type
//    reg-rel-type   = LOALPHA *( LOALPHA | DIGIT | "." | "-" )
//    ext-rel-type   = URI

function parse(str) {
  if (str == undefined) {
    throw 'Undefined argument'
  }

  var obj = new Object();
  var cur = 0;

  var begin = cur;
  var linkParam;

  while (cur < str.length) {
    switch (str.charAt(cur)) {
      case '<' :
        begin = cur + 1;
        break;
      case '>' :
        obj.href = str.substr(begin, cur - begin);
        break;
      case ' ' :
        if(linkParam == 'rel') {
          if(obj[linkParam] == undefined) {
            obj[linkParam] = new Array();
          }
          obj[linkParam].push(escape(str.substr(begin, cur - begin)));
          begin = cur + 1;
        }
        break;
      case ';' :
        if(linkParam) {
          var val = str.substr(begin, cur - begin);
          if(linkParam == 'rel') {
            if(obj[linkParam] == undefined) {
              obj[linkParam] = new Array();
            }
            obj[linkParam].push(escape(val));
          }
          else {
            obj[linkParam] = val;
            if(isQuotable(linkParam)) {
              obj[linkParam] = escape(obj[linkParam]);
            }
          }
          linkParam = undefined;
        }
        begin = cur + 1;
        break;
      case '=' :
        linkParam = str.substr(begin, cur - begin);
        begin = cur + 1;
        break;
      default:
        break;
    }
    cur++;
  }
  // The last param is still unprocessed
  if(linkParam) {
    obj[linkParam] = str.substr(begin, cur - begin);
    if(isQuotable(linkParam)) {
      obj[linkParam] = escape(obj[linkParam]);
    }
  }

  return obj;
}

function format(obj) {
  var str = '<';
  if(obj.href) {
    str += obj.href;
  }
  str += '>';
  for(var param in obj) {
    if(param == 'href') {
      continue;
    }

    if(param == 'rel') {
      str += ';' + param + '=';
      if(obj[param].push == undefined) {
        throw new Error("rel must be an array");
      }
      if(obj[param].length > 1) {
        str += '\'';
        for(var i = 0; i < obj[param].length; i++) {
          str += obj[param];
          if(i < obj[param].length - 1) {
            str += ' ';
          }
        }
        str += '\'';
      }
      else {
        str += obj[param][0];
      }
    }
    else if (param == 'title' || param == 'type') {
      str += ';' + param + '=' + '\'' + obj[param] + '\'';
    }
    else {
      str += ';' + param + '=' + obj[param];
    }
  }
  return str;
}


// type and title are quotable
// all extended params are quotable

function isQuotable(param) {
  return (quotables[param] || nonQuotables[param] == undefined);
}

var quotables = new Object();
quotables['title'] = 'true';
quotables['type'] = 'true';
quotables['rel'] = 'true';
var nonQuotables = new Object();
nonQuotables['anchor'] = 'true';
nonQuotables['rev'] = 'true';
nonQuotables['hreflang'] = 'true';
nonQuotables['media'] = 'true';
nonQuotables['rev'] = 'true';
nonQuotables['rev'] = 'true';

function escape(value) {
  var begin = 0;
  var len = value.length;
  if(value.charAt(begin) == '\'' || value.charAt(begin) == '\"') {
    begin++;
    len--;
  }
  if(value.charAt(value.length - 1) == '\'' || value.charAt(value.length - 1) == '\"') {
    len--;
  }
  return value.substr(begin, len);
}