// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var helpers = require('../helpers/archive-helpers.js');
var fs = require('fs');
var CronJob = require('cron').CronJob;

// setInterval(function() {helpers.downloadUrls(exports.toDownload);}, 5000);
//on some interval with cron


// helpers.downloadUrls(exports.toDownload, function(){
//   exports.toDownload = [];
// });

// helpers.readListOfUrls(helpers.downloadUrls, helpers.paths.toDownload, function() {
//   fs.writeFile(helpers.paths.toDownload, '', function(){console.log('done')});
// });

//call read list of urls
//read list reads the file
  //it splits the data into lines
  //it calls its callback on that array
  //if there is a second callback
  //it passes the second callback as the second parameter to the first callback


exports.job = new CronJob('* * * * *', function() {
  helpers.readListOfUrls(helpers.downloadUrls);
  fs.appendFile(__dirname + "/fetchLog.txt", "fetcher just ran at: " + new Date().toString() + '\n');
});

// exports.job.start();