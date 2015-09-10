var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
//var htmlFetcher = require('../workers/htmlfetcher.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var headers = httpHelpers.headers;

  var method = req.method;
  if (method === 'POST') {
    //collect the data
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      //do some stuff with it
      body = body.slice(4);
      archive.isUrlInList(body, function(bool) {
        if (bool) {
          archive.isUrlArchived(body, function(bool) {
            if (bool) {
              fs.readFile(archive.paths.archivedSites + '/' + body, function(err, data) {
                if (err) {
                  console.log("500 server error")
                  httpHelpers.serveAssets(res,"server error", 500);
                } else {
                  httpHelpers.serveAssets(res, data, 200);
                }
              });
            } else {
              console.log("it's in the list but hasnt been archived");
              httpHelpers.serveAssets(res, 'serving it for you soon', 302);
            }
          });
        } else {
          archive.addUrlToList(body, function() {
            console.log('successfully added ' + body + 'to list');
            httpHelpers.serveAssets(res, 'serving it for you soon', 302);
          });
        }
      })
    });
  } else if (method === 'GET') {
    var fileName = path.parse(req.url).base;
    if (fileName === '') {
      fileName = "/index.html";
    }

    fs.exists(archive.paths.siteAssets + fileName, function(exists){
      if(exists){
        //if it exists, send the data
        fs.readFile(archive.paths.siteAssets + fileName, function(err, data){
          if(err){
            console.log("500 server error")
            httpHelpers.serveAssets(res,"server error", 500);
          } else {
            httpHelpers.serveAssets(res, data, 200);
          }
        })
      } else {
        httpHelpers.serveAssets(res, "not found", 404);
      }
    });
  }
};
/*


*/