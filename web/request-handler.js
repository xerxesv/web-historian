var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var headers = httpHelpers.headers;

  var urlParsed = path.parse(req.url);
  console.log(urlParsed);

  if(urlParsed.base === ''){
    httpHelpers.serveAssets(res, archive.paths.siteAssets + urlParsed.base, httpHelpers.sendData)
  } else {
    //how to deal with actual requests
    console.log(JSON.stringify(archive));
    archive.processUrl(archive.paths.siteAssets + urlParsed.base);
  }

  // res.end(archive.paths.list);
};
/*


*/