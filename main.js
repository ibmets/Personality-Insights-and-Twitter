const json2csv = require('json2csv');
const mkdirp = require('mkdirp');
const fs = require('fs');
const twitterQuery = require('./twitterQuery');
const piQuery = require('./piQuery');
const utils = require('./utils')
const dotenv = require('dotenv').config()

// Create variables to hold results
let tweets = [];

utils.readPlayersFromFile(process.env.PLAYERS_ALL, function(err,players){
  if(err){
    console.log('here')
    console.log(err);
  }
  else{
    for(let i = 0; i < players.length; i++) {
      console.log('index', i)
      console.log('players', players[i])
      twitterQuery.getTweets(players[i], getInsight)
    }
  }
})

function getInsight(twitterErr, twitterData, player){
  if(twitterErr){
    console.log(twitterErr);
  }
  else{
    if(twitterData){
      for(let i=0; i < twitterData.length; i ++){
        twitterData[i].text = twitterData[i].text.replace(/https.+/g,'')
        let contentObject = {
          content: twitterData[i].text,
        };
        tweets.push(contentObject);
      }
    }
    writeTweetsTofile('./results/tweets-analysed-' + player.Name + '.csv', tweets, ['content'], function(writeErr){
      if(writeErr){
        console.log(writeErr);
      }
    });
  }
  // console.log(tweets)
  piQuery.getPersonalityInsight(twitterErr, player.Name, player.Position, tweets, processInsights);
}

function processInsights(err, personalityResult){
  console.dir(personalityResult)
  writeCsvDataTofile('./results/' + personalityResult.Name +'.csv',personalityResult, ['Name', 'Position', 
    'emotionalRange','agreeableness','conscientiousness', 'openness', 'extraversion',
    
    // Emotional Range
    'anger', 'anxiety', 'depression','immoderation','self_consciousness', 'vulnerability',

    // Agreeableness
    'altruism', 'cooperation', 'modesty', 'morality', 'sympathy', 'trust',
    
    // Conscientiousness
    'achievement_striving','cautiousness','dutifulness', 'orderliness', 'self_discipline', 'self_efficacy',
    
    // Openness
    'adventurousness', 'artistic_interests', 'emotionality', 'imagination', 'intellect', 'liberalism',
    
    // Extraversion
    'activity_level', 'assertiveness', 'cheerfulness', 'excitement_seeking', 'friendliness', 'gregariousness'

  ], function(writeErr){
    if(writeErr){
      console.log(writeErr);
    }
  });
}

function writeCsvDataTofile(file, data, fields, callback){
  let getDirName = require('path').dirname;

  mkdirp(getDirName(file), function(err){
    if(err){
      return callback(err);
    }
    let csv = json2csv({ data: data, fields: fields });

    fs.writeFile(file, csv, function(err) {
      if(err){
        console.log(err);
      }
      callback(err);
    });
  });
}

function writeTweetsTofile(file, data, fields, callback) {
  let getDirName = require('path').dirname;
  mkdirp(getDirName(file), function(err){
    if(err){
      return callback(err);
    }

    let csv = json2csv({ data: data, fields: fields });

    fs.writeFile(file, csv, function(err) {
      if(err){
        console.log(err);
      }
      callback(err);
    });
  })
}

module.exports = {
  writeCsvDataTofile: writeCsvDataTofile
};
