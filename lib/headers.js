var accept = require('./accept.js'),
    cookie = require('./cookie.js'),
    setCookie = require('./set-cookie.js'),
    cacheControl = require('./cache-control.js'),
    link =  require('./link.js');

exports.parse = parse,
  exports.format = format;

function parse(name, str) {
  var module = findModule(name);
  var opts = getOpts(name);
  if(module) {
    var ret = module.parse(str, opts);
    if(name === 'Content-Type') {
      ret = (ret && ret[0]) ? ret[0] :ret;
    }
    return ret;
  }
  else {
    throw 'Don\'t know how to parse ' + name;
  }
}

function format(name, obj) {
  var module = findModule(name);
  var opts = getOpts(name);
  if(module) {
    return module.format(obj, opts);
  }
  else {
    throw 'Don\'t know how to format ' + name; 
  }
}

function findModule(name) {
  var module;
  switch (name) {
    case 'Content-Type':
    case 'Accept' :
    case 'Accept-Language' :
    case 'Accept-Encoding' :
    case 'Accept-Charset' :
      module = accept;
      break;
    case 'Cookie' :
      module = cookie;
      break;
    case 'Set-Cookie' :
      module = setCookie;
      break;
    case 'Cache-Control' :
      module = cacheControl;
      break;
    case 'Link' :
      module = link;
      break;
  }
  return module;
}

function getOpts(name) {
  var opts;
  switch (name) {
    case 'Content-Type':
    case 'Accept' :
      opts = {
        'ptype' : 'type',
        'ptype2' : 'subtype'
      };
      break;
    case 'Accept-Encoding' :
      opts = {
        'ptype' : 'encoding'
      };
      break;
    case 'Accept-Charset' :
      opts = {
        'ptype' : 'charset'
      };
      break;
    case 'Accept-Language' :
      opts = {
        'ptype' : 'language'
      };
      break;
    default:
      opts = {};
  }
  return opts;
}
