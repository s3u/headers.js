exports.parse = linkParse;

var sys = require('sys');

/*
 * Parse/format Link headers as per RFC 5988
 */

function linkParse(str) {
  if (str == undefined) {
    throw 'Undefined argument'
  }

  var obj = new Object();
  obj.hasRelationType = function(type) {
    if(this.rel == undefined) return false;
    for(var t in this.rel) {
      if(this.rel[t] == type) {
        return true;
      }
    }
    return false;
  };
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