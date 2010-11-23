exports.parse = parse,
  exports.format = format;

//    Cache-Control   = "Cache-Control" ":" 1#cache-directive
//
//    cache-directive = cache-request-directive
//         | cache-response-directive
//
//    cache-request-directive =
//           "no-cache"                          ; Section 14.9.1
//         | "no-store"                          ; Section 14.9.2
//         | "max-age" "=" delta-seconds         ; Section 14.9.3, 14.9.4
//         | "max-stale" [ "=" delta-seconds ]   ; Section 14.9.3
//         | "min-fresh" "=" delta-seconds       ; Section 14.9.3
//         | "no-transform"                      ; Section 14.9.5
//         | "only-if-cached"                    ; Section 14.9.4
//         | cache-extension                     ; Section 14.9.6
//
//     cache-response-directive =
//           "public"                               ; Section 14.9.1
//         | "private" [ "=" <"> 1#field-name <"> ] ; Section 14.9.1
//         | "no-cache" [ "=" <"> 1#field-name <"> ]; Section 14.9.1
//         | "no-store"                             ; Section 14.9.2
//         | "no-transform"                         ; Section 14.9.5
//         | "must-revalidate"                      ; Section 14.9.4
//         | "proxy-revalidate"                     ; Section 14.9.4
//         | "max-age" "=" delta-seconds            ; Section 14.9.3
//         | "s-maxage" "=" delta-seconds           ; Section 14.9.3
//         | cache-extension                        ; Section 14.9.6
//
//    cache-extension = token [ "=" ( token | quoted-string ) ]

function parse(str) {
  if (str == undefined) {
    throw 'Undefined argument'
  }

  var obj = new Object();
  var cur = 0;

  var begin = cur;
  var isVal = false;
  var token = '', val = true, lws = true;
  while (cur < str.length) {
    switch (str.charAt(cur)) {
      case ',' :
        if(token.length > 0) {
          obj[token] = val;
        }
        begin = cur + 1;
        token = '';
        val = lws = true;
        isVal = false;
        // Step ahead for leading white space
        while(str.charAt(cur + 1) == ' ') {
          cur++;
        }
        break;
      case '=' :
        val = '';
        isVal = lws = true;
        break;
      case ' ' :
        // Special lws treatment
        if(lws) {
          break;
        }
        else {
          // Look ahead
          var pos = cur;
          while(str.charAt(pos) == ' ') {
            pos++;
          }
          if(pos == str.length || str.charAt(pos) == ',' || str.charAt(pos) == '=') {
            cur = pos - 1;
            break;
          }
        }
      default:
        if(str.charAt(cur) != ' ') {
          lws = false;
        }
        if(isVal) {
          val += str.charAt(cur);
        }
        else {
          token += str.charAt(cur);
        }
        break;
    }
    cur++;
  }
  if(token.length > 0) {
    obj[token] = val;
  }
  
  return obj;
}

function format(obj) {
  var str = '';
  for(param in obj) {
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