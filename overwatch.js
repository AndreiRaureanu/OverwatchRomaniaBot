const https = require('https');
const request = require('request');

const apiBaseUrl = 'https://ow-api.herokuapp.com/';
const apiType = 'profile';

const platformOptions = ['pc', 'xbl', 'psn'];
let platform;

const regionOptions = ['eu', 'us', 'kr', 'cn', 'global'];
let region;

let buildAPIUrl = (battleTag) => {
  return apiBaseUrl + apiType + '/' + platform + '/' + region + '/' + battleTag;
};

module.exports = (message, callback) => {

  let msgParts = message.split(' ');

  let battleTag = null;
  platform = platformOptions[0];
  region = regionOptions[0];

  // Part user's options
  msgParts.forEach( (item) => {
    if (item.indexOf('#') > -1) {
      battleTag = item.replace('#', '-');
    } else if (item.indexOf('p=') > -1) {
      platform = item.split('=').pop();
    } else if (item.indexOf('r=') > -1) {
      region = item.split('=').pop();
    }
  });

  // Check user's options for validity
  if (!battleTag) {
    return callback('Invalid BattleTag', 'Please provide a valid BattleTag. Ex: User#1234')
  } else {
    if (platformOptions.indexOf(platform) == -1)
      return callback('Invalid Platform', 'Platform invalid, allowed options are: ' + platformOptions.join(' '));
    if (regionOptions.indexOf(region) == -1)
      return callback('Invalid Region', 'Region invalid, allowed options are: ' + regionOptions.join(' '));
  }

  let url = buildAPIUrl(battleTag);
  console.log('Getting stats from URL: ' + url);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // For API errors, send back the error to the user
      let statsJSON = JSON.parse(body);
      if (statsJSON.statusCode == 404)
        return callback('API Error: ' + statsJSON.statusCode + ' - ' + statsJSON.error, statsJSON.error);

      // Stats were returned okay, let's parse them
      let stats = statsJSON;
    //  let statLevel = stats.level;
      let statCompRank = stats.competitive.rank;


      // Format the string we are going to return to the user
      let statsString = '';
      statsString += statCompRank;


      return callback(null, statsString);
    } else {
      return callback(error || response.statusCode, null);
    }
  });

};