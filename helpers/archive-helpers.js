var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('../node_modules/http-request')

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  toDownload: path.join(__dirname, '../workers/toDownload.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, fileContents) {
    var splitData = fileContents.toString().split('\n');
    if (splitData.length > 0) {
      callback(splitData);
    }
  });
};


exports.isUrlInList = function(targetUrl, isOrIsnt) {
  exports.readListOfUrls(function(urls){
    _.contains(urls, targetUrl) ? isOrIsnt(true) : isOrIsnt(false);
  });
};

exports.addUrlToList = function(UrlToAdd, callback) {
  fs.appendFile(exports.paths.list, UrlToAdd + '\n', function(err) {
    if (err) {
      console.log(err);
    } else {
      if (callback) {
        callback();
      }
    }
    // err ? console.log(err) : callback();
  });
};

exports.isUrlArchived = function(targetUrl, callback) {
  fs.exists(exports.paths.archivedSites + '/' +targetUrl, function(exists) {
    exists ? callback(true) : callback(false);
  })
};

exports.downloadUrls = function(UrlArray, callback) {
  _.each(UrlArray, function(url) {
    exports.isUrlArchived(url, function() {
      console.log('working on: ' + url);
      httpRequest.get('http://' + url, exports.paths.archivedSites + '/' + url, function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(res.code, res.headers, res.file);
        }
      })
    });
  });
  if (callback) {
    callback();
  }
};