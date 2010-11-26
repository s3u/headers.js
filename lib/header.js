exports.parse = parse,
  exports.format = format;

function parse(name, str) {
  var module = findModule(name);
  var opts = getOpts(name);
  if(module) {
    return module.parse(str, opts);
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
    case 'Accept' :
    case 'Accept-Language' :
    case 'Accept-Encoding' :
    case 'Accept-Charset' :
      module = require('accept');
      break;
    case 'Cookie' :
      module = require('cookie');
      break;
    case 'Set-Cookie' :
      module = require('set-cookie');
      break;
    case 'Cache-Control' :
      module = require('cache-control');
      break;
    case 'Link' :
      module = require('link');
      break;
  }
  return module;
}

function getOpts(name) {
  var opts;
  switch (name) {
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