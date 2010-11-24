exports.parse = parse,
  exports.format = format;

// set-cookie-header = "Set-Cookie:" SP set-cookie-string
// set-cookie-string = cookie-pair *( ";" SP cookie-av )
// cookie-pair       = cookie-name "=" cookie-value
// cookie-name       = token
// cookie-value      = token
// token             = <token, defined in [RFC2616], Section 2.2>
//
// cookie-av         = expires-av / max-age-av / domain-av /
//                     path-av / secure-av / httponly-av /
//                     extension-av
// expires-av        = "Expires=" sane-cookie-date
// sane-cookie-date  = <rfc1123-date, defined in [RFC2616], Section 3.3.1>
// max-age-av        = "Max-Age=" 1*DIGIT
// domain-av         = "Domain=" domain-value
// domain-value      = <subdomain>
//                       ; defined in [RFC1034], Section 3.5, as
//                       ; enhanced by [RFC1123], Section 2.1
// path-av           = "Path=" path-value
// path-value        = <any CHAR except CTLs or ";">
// secure-av         = "Secure"
// httponly-av       = "HttpOnly"
// extension-av      = <any CHAR except CTLs or ";">

function parse(str) {
  if (str == undefined) {
    throw 'Undefined argument'
  }

  var obj = new Object();
  obj.name = '';
  obj.value = '';

  var cur = 0;
  var isVal = false;
  var av = false;

  // Cookie name and value
  while (cur < str.length && !av) {
    switch (str.charAt(cur)) {
      case '=' :
        isVal = true;
        break;
      case ';' :
        av = true;
        break;
      default:
        if(isVal) {
          obj.value += str.charAt(cur);
        }
        else {
          obj.name += str.charAt(cur);
        }
        break;
    }
    cur++;
  }

  // Name-[value] pairs
  isVal = false;
  var param = '';
  while (cur < str.length) {
    switch (str.charAt(cur)) {
      case '=' :
        isVal = true;
        obj[param] = '';
        break;
      case ';' :
        if(!isVal) {
          obj[param] = true;
        }
        isVal = false;
        param = '';
        break;
      default :
        if(isVal) {
          obj[param] += str.charAt(cur);
        }
        else {
          param += str.charAt(cur);
        }
        break;
    }
    cur++;
  }
  if(param != '' && !isVal) {
    obj[param] = true;
  }
  return obj;
}

function format(obj) {
  var str = '';
  for(var param in obj) {
    if(str.length > 0) {
      str += ',';
    }
    str += param;
    if(obj[param] != true) {
      str += '=' + obj[param]
    }
  }
  return str;
}

// TODO
// To maximize compatibility with user agents, servers that wish to
//   store arbitrary data in a cookie-value SHOULD encode that data, for
//   example, using Base 16 [RFC3548].
function encodeBase16(data) {

}
