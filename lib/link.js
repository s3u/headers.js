exports.parse = headerParse;
exports.format = headerFormat;

/*
 * Parse/format Link headers as per RFC 5988
 */

//  Link           = "Link" ":" #link-value
//  link-value     = "<" URI-Reference ">" *( ";" link-param )
//  link-param     = ( ( "rel" "=" relation-types )
//                 | ( "anchor" "=" <"> URI-Reference <"> )
//                 | ( "rev" "=" relation-types )
//                 | ( "hreflang" "=" Language-Tag )
//                 | ( "media" "=" ( MediaDesc | ( <"> MediaDesc <"> ) ) )
//                 | ( "title" "=" quoted-string )
//                 | ( "title*" "=" ext-value )
//                 | ( "type" "=" ( media-type | quoted-mt ) )
//                 | ( link-extension ) )
//  link-extension = ( parmname [ "=" ( ptoken | quoted-string ) ] )
//                 | ( ext-name-star "=" ext-value )
//  ext-name-star  = parmname "*" ; reserved for RFC2231-profiled
//                                ; extensions.  Whitespace NOT
//                                ; allowed in between.
//  ptoken         = 1*ptokenchar
//  ptokenchar     = "!" | "#" | "$" | "%" | "&" | "'" | "("
//                 | ")" | "*" | "+" | "-" | "." | "/" | DIGIT
//                 | ":" | "<" | "=" | ">" | "?" | "@" | ALPHA
//                 | "[" | "]" | "^" | "_" | "`" | "{" | "|"
//                 | "}" | "~"
//  media-type     = type-name "/" subtype-name
//  quoted-mt      = <"> media-type <">
//  relation-types = relation-type
//                 | <"> relation-type *( 1*SP relation-type ) <">
//  relation-type  = reg-rel-type | ext-rel-type
//  reg-rel-type   = LOALPHA *( LOALPHA | DIGIT | "." | "-" )
//  ext-rel-type   = URI

function headerParse(linkValue) {
  if (linkValue == undefined) {
    throw 'Undefined argument'
  }

  var val = linkValue.toString();

  if charAt(0) ==  
  if (typeof linkValue == 'string') {
    
  }
}

// define these here so at least they only have to be compiled once on the first module load.
var protocolPattern = /^([a-z0-9]+:)/,
  portPattern = /:[0-9]+$/,
  nonHostChars = ["/", "?", ";", "#"],
  hostlessProtocol = {
    "file":true,
    "file:":true
  },
  slashedProtocol = {
    "http":true, "https":true, "ftp":true, "gopher":true, "file":true,
    "http:":true, "https:":true, "ftp:":true, "gopher:":true, "file:":true
  },
  path = require("path"), // internal module, guaranteed to be loaded already.
  querystring = require('querystring');

function urlParse (url, parseQueryString, slashesDenoteHost) {
  if (url && typeof(url) === "object" && url.href) return url;

  var out = { href : url },
    rest = url;

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    out.protocol = proto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === "//";
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      out.slashes = true;
    }
  }
  if (!hostlessProtocol[proto] && (slashes || (proto && !slashedProtocol[proto]))) {
    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    // don't enforce full RFC correctness, just be unstupid about it.
    var firstNonHost = -1;
    for (var i = 0, l = nonHostChars.length; i < l; i ++) {
      var index = rest.indexOf(nonHostChars[i]);
      if (index !== -1 && (firstNonHost < 0 || index < firstNonHost)) firstNonHost = index;
    }
    if (firstNonHost !== -1) {
      out.host = rest.substr(0, firstNonHost);
      rest = rest.substr(firstNonHost);
    } else {
      out.host = rest;
      rest = "";
    }

    // pull out the auth and port.
    var p = parseHost(out.host);
    var keys = Object.keys(p);
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      out[key] = p[key];
    }
    // we've indicated that there is a hostname, so even if it's empty, it has to be present.
    out.hostname = out.hostname || "";
  }

  // now rest is set to the post-host stuff.
  // chop off from the tail first.
  var hash = rest.indexOf("#");
  if (hash !== -1) {
    // got a fragment string.
    out.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf("?");
  if (qm !== -1) {
    out.search = rest.substr(qm);
    out.query = rest.substr(qm+1);
    if (parseQueryString) {
      out.query = querystring.parse(out.query);
    }
    rest = rest.slice(0, qm);
  }
  if (rest) out.pathname = rest;

  return out;
};

// format a parsed object into a url string
function urlFormat (obj) {
  // ensure it's an object, and not a string url. If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings to clean up potentially wonky urls.
  if (typeof(obj) === "string") obj = urlParse(obj);

  var protocol = obj.protocol || "",
    host = (obj.host !== undefined) ? obj.host
      : obj.hostname !== undefined ? (
        (obj.auth ? obj.auth + "@" : "")
        + obj.hostname
        + (obj.port ? ":" + obj.port : "")
      )
      : false,
    pathname = obj.pathname || "",
    search = obj.search || (
      obj.query && ( "?" + (
        typeof(obj.query) === "object"
        ? querystring.stringify(obj.query)
        : String(obj.query)
      ))
    ) || "",
    hash = obj.hash || "";

  if (protocol && protocol.substr(-1) !== ":") protocol += ":";

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (obj.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = "//" + (host || "");
    if (pathname && pathname.charAt(0) !== "/") pathname = "/" + pathname;
  } else if (!host) host = "";

  if (hash && hash.charAt(0) !== "#") hash = "#" + hash;
  if (search && search.charAt(0) !== "?") search = "?" + search;

  return protocol + host + pathname + search + hash;
};

function parseHost (host) {
  var out = {};
  var at = host.indexOf("@");
  if (at !== -1) {
    out.auth = host.substr(0, at);
    host = host.substr(at+1); // drop the @
  }
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    out.port = port.substr(1);
    host = host.substr(0, host.length - port.length);
  }
  if (host) out.hostname = host;
  return out;
}

