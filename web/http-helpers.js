var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, data, statusCode) {
  console.log('Serving data: ' + data);
  res.writeHead(statusCode, headers);
  res.end(data);
};

exports.isNative = function(url) {
  var parsed = path.parse(url);
  console.log("is Native url: " + url + " isNative base " + parsed.base);
  if (parsed.ext === '.com'){
    return false;
  }else if (parsed.base === ""){
    return "/index.html";
  }else {
    return parsed.base;
  }

//  return parsed.ext === '.com' ? false : parsed.base;
}

// As you progress, keep thinking about what helper functions you can put here!
