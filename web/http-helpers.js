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

exports.serveAssets = function(res, asset, callback) {

  fs.readFile(archive.paths.siteAssets + '/index.html', function(err, content){
    if (err){
      console.log("error");
    } else{
      callback(res, content);
    }
  });

};

exports.sendData = function(res, data) {
  res.writeHead(200, headers);
  res.end(data);
};

// As you progress, keep thinking about what helper functions you can put here!
