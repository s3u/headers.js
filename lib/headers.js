var accept = require('./accept.js'),
    cookie = require('./cookie.js'),
    setCookie = require('./set-cookie.js'),
    cacheControl = require('./cache-control.js'),
    link =  require('./link.js');

exports.parse = parse,
  exports.format = format;

function parse(name, str) {
  var header = name.toLowerCase();
  var module = findModule(header);
  var opts = getOpts(header);
  if(module) {
    var ret = module.parse(str, opts);
    if(header === 'content-type') {
      ret = (ret && ret[0]) ? ret[0] :ret;
    }
    return ret;
  }
  else {
    throw "Don't know how to parse " + name;
  }
}

function format(name, obj) {
  var header = name.toLowerCase();
  var module = findModule(header);
  var opts = getOpts(header);
  if(module) {
    return module.format(obj, opts);
  }
  else {
    throw "Don't know how to format " + name;
  }
}

function findModule(name) {
  var module;
  switch (name) {
    case 'content-type':
    case 'accept' :
    case 'accept-language' :
    case 'accept-encoding' :
    case 'accept-charset' :
      module = accept;
      break;
    case 'cookie' :
      module = cookie;
      break;
    case 'set-cookie' :
      module = setCookie;
      break;
    case 'cache-control' :
      module = cacheControl;
      break;
    case 'link' :
      module = link;
      break;
  }
  return module;
}

function getOpts(name) {
  var opts;
  switch (name) {
    case 'content-type':
    case 'accept' :
      opts = {
        'ptype' : 'type',
        'ptype2' : 'subtype'
      };
      break;
    case 'accept-encoding' :
      opts = {
        'ptype' : 'encoding'
      };
      break;
    case 'accept-charset' :
      opts = {
        'ptype' : 'charset'
      };
      break;
    case 'accept-language' :
      opts = {
        'ptype' : 'language'
      };
      break;
    default:
      opts = {};
  }
  return opts;
}
