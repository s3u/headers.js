exports.parse = parse,
  exports.format = format;

//     Accept         = "Accept" ":"
//                      #( media-range [ accept-params ] )
//
//     media-range    = ( "*/*"
//                      | ( type "/" "*" )
//                      | ( type "/" subtype )
//                      ) *( ";" parameter )
//     accept-params  = ";" "q" "=" qvalue *( accept-extension )
//     accept-extension = ";" token [ "=" ( token | quoted-string ) ]

// {
//   type
//   subtype
//   params (separated by ;)
// } - each separated by a comma
//


// First split by ,
//   Then split by ;
//    


function parse(str, opts) {
  if (str == undefined) {
    throw 'Undefined argument'
  }

  var arr = new Array();
  var obj = new Object();
  obj.params = new Object();
  var cur = 0;

  var begin = cur;
  var isVal = isSubtype = false;
  var token = '', val = true, lws = true;
  while (cur < str.length) {
    switch (str.charAt(cur)) {
      case ' ' :
        break;
      case ';' :
        if(obj[opts.ptype] == undefined) {
          obj[opts.ptype] = token;
        }
        else if (isSubtype) {
          obj[opts.ptype2] = token;
          isSubtype = false;
        }
        else {
          obj.params[token] = val;
          isVal = false;
        }
        token = val = '';
        break;
      case '=' :
        val = '';
        isVal = true;
        break;
      case ',' :
        if(obj[opts.ptype] == undefined) {
          obj[opts.ptype] = token;
        }
        else if (isSubtype) {
          obj.subtype = token;
          isSubtype = false;
        }
        else {
          obj.params[token] = val;
          isVal = false;
        }
        token = val = '';
        arr.push(obj);
        obj = new Object();
        obj.params = new Object();
        break;
      case '/' :
        if(opts.ptype) {
          obj[opts.ptype] = token;
          isSubtype = true;
          token = '';
          break;
        }
      default:
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
  if(obj[opts.ptype] == undefined) {
    obj[opts.ptype] = token;
    arr.push(obj);
  }
  else if(isSubtype) {
    obj.subtype = token;
    arr.push(obj);
  }
  else {
    if(token.length > 0) {
      obj.params[token] = val;
    }
    arr.push(obj);
  }

  return arr;
}

function format(obj, opts) {
  var str = '';
  for(var i = 0; i < obj.length; i++) {
    if(str.length > 0) {
      str += ',';
    }    
    str += obj[i][opts.ptype];
    if(opts.ptype2 && obj[i][opts.ptype2]) {
      str += '/' + obj[i][opts.ptype2];
    }
    for(param in obj[i].params) {
      str += ';';
      str += param + '=' + obj[i].params[param];
    }
  }

  return str;
}