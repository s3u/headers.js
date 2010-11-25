exports.parse = parse,
  exports.format = format;

function parse(name, str) {
  var module = require(name);
  if(module) {
    return module.parse(str);
  }
  else {
    throw 'Don\'t know how to parse ' + name;
  }
}

function format(name, obj) {
  var module = require(name);
  if(module) {
    return module.format(obj);
  }
  else {
    throw 'Don\'t know how to format ' + name; 
  }
}