var sys = require('sys'),
    link = require('link');

var val = "<http://foo.com>;rel='href';title='hello'";
var l = link.parse(val);
for(name in l) {
  sys.log(name + " ---> " + l[name]);
}

sys.log('------------');
val = "<http://foo.com>;rel='http://some.rel.com';title='hello';type='application/xml'";
l = link.parse(val);
for(name in l) {
  sys.log(name + " ---> " + l[name]);
}

sys.log('------------');
val = "<http://foo.com>;rel='http://some.rel.com alternate';title='hello';type='application/xml'";
l = link.parse(val);
for(name in l) {
  if(name == 'rel') {
    for(v in l[name]) {
      sys.log(name + " ---> " + l[name][v]);      
    }
  }
  else {
    sys.log(name + " ---> " + l[name]);
  }
}
sys.log(l.hasRelationType('alternate'));

sys.log('----- format -----');
sys.log(link.format({
  href : 'http://www.example.org',
  rel : ['related'],
  title : 'Hello World',
  type : 'text/html'
}));

sys.log(link.format({
  rel : 'related'
}))