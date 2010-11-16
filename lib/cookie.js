exports.parse = parse,
  exports.format = format;

//   cookie-header = "Cookie:" OWS cookie-string OWS
//   cookie-string = cookie-pair *( ";" cookie-pair)
//   cookie-pair   = cookie-name "=" cookie-value
//   cookie-name   = token
//   cookie-value  = token
//   token         = <token, as defined in Section 2.2 of RFC 2616>

function parse(str) {
  if (str == undefined) {
    throw 'Undefined argument'
  }

  var obj = new Object();
  obj.name = '';
  obj.value = '';

  var cur = 0;
  var isVal = false;

  while (cur < str.length) {
    switch (str.charAt(cur)) {
      case '=' :
        isVal = true;
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
  
  return obj;
}

function format(obj) {
  return obj.name + '=' + obj.value;
}