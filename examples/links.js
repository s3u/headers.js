var sys = require('sys'),
    link = require('link');

var val = "<http://foo.com>;rel='http://some.rel.com alternate';title='hello';type='application/xml'";
l = link.parse(val);
console.log(sys.inspect(l));
sys.log(link.hasRelationType(l, 'alternate'));

sys.log(link.format({
  href : 'http://www.example.org',
  rel : ['related'],
  title : 'Hello World',
  type : 'text/html'
}));
