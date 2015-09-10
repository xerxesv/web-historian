var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var headers = httpHelpers.headers;

  var fileName = httpHelpers.isNative(req.url);
  console.log(fileName);

  var method = req.method;
  if (method === 'POST') {
    //collect the data
    var body = '';
    request.on('data', function(chunk) {
      body += chunk;
    });
    request.on('end', function() {
      //do some stuff with it
      console.log(body);
      archive.isUrlInList(body, function(bool) {
        if (bool) {
          //find it and serve it
        } else {
          //add url to list
          //trigger htmlfetcher
        }
      })
    });

  }

  if(fileName){ // this is for serving native files
    fs.exists(archive.paths.siteAssets + fileName, function(exists){
      if(exists){
        //if it exists, send the data
        fs.readFile(archive.paths.siteAssets + fileName, function(err, data){
          if(err){
            console.log("500 server error")
            httpHelpers.serveAssets(res,"server error", 500);
          }else{
            httpHelpers.serveAssets(res, data, 200);
          }
        })
      }else{
        httpHelpers.serveAssets(res, "not found", 404);
      }
    })
  } else {
    //how to deal with actual requests
//    console.log(JSON.stringify(archive));
    // archive.processUrl(archive.paths.siteAssets + urlParsed.base);
  }

  // res.end(archive.paths.list);
};
/*


*/