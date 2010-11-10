exports.parse = parse;

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
