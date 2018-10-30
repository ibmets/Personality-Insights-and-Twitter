const request = require('request');
const dotenv = require('dotenv').config()

// Build query object
const queryObject = {
  uri: 'https://api.twitter.com/1.1/statuses/user_timeline.json?',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  oauth: {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
  }
};

function getTweets(player, callback){
  // Query parameters include "screen_name", "count", "include_rts" and "exclude_replies"
  queryObject.uri = queryObject.uri + `screen_name=${player['Social handle - Twitter']}&count=200&include_rts=false&exclude_replies=true`
  request(queryObject, handleResponse);

  // Callback from request to handle HTTP response
  function handleResponse(err, httpResponse, body){
    if(err){
      return callback(err);
    }
    else{
      let results = [];
      if(body){
        let jsonBody = JSON.parse(body);
        results = jsonBody;
      }
      return callback(false, results, player);
    }
  }
}

module.exports = {
  getTweets:getTweets
};
