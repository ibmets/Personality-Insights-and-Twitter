const request = require('request');

let queryObject = {
  uri: process.env.PERSONALITY_URL,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  auth: {
    user:process.env.PERSONALITY_USERNAME,
    pass: process.env.PERSONALITY_PASSWORD
  },
  qs:{
    version: process.env.PERSONALITY_VERSION
  }
};


let processedResults = {
  emotionalRange: 0,
  agreeableness: 0,
  conscientiousness: 0,
  openness: 0,
  extraversion: 0
};

// Callback from twitterQuery.getTweets to organise results from twitter
function getPersonalityInsight(twitterErr, name, position, tweets, callback){
  if(twitterErr){
    console.log(twitterErr);
    return callback(twitterErr);
  }

  // Personality Insights json object containing tweets
  queryObject.json = {
    contentItems: tweets
  };

  request(queryObject, handleResponse);

  // Callback from request to handle HTTP response
  function handleResponse(err, httpResponse, body){
    if(err){
      console.log(err);
      return callback(err);
    }
    else{
      if(body){
        processedResults = findPersonality(body, name, position);
      }

      return callback(false, processedResults);
    }
  }
}

function findPersonality(data, name, position){
  if(data.error){
    console.log('Error in personality for: ' + name + ' ' + data.error);
  }
  else{
    if(data.personality){
      
      // Assign personality Attributes to results object
      for(let i=0; i < data.personality.length; i++){
        let personalityAttribute = data.personality[i];
        
        // Neuroticism
        if(personalityAttribute.trait_id === 'big5_neuroticism'){
          processedResults.emotionalRange = personalityAttribute.percentile;
          for(let j=0; j < personalityAttribute.children.length; j++){
            let personalityFacet = personalityAttribute.children[j]
            if(personalityFacet.trait_id == 'facet_anger'){
              processedResults.anger = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_anxiety'){
              processedResults.anxiety = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_depression'){
              processedResults.depression = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_immoderation'){
              processedResults.immoderation = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_self_consciousness'){
              processedResults.self_consciousness = personalityFacet.percentile
            } if(personalityFacet.trait_id == 'facet_vulnerability'){
              processedResults.vulnerability = personalityFacet.percentile
            }
          }
        }

        // Agreeableness
        if(personalityAttribute.trait_id === 'big5_agreeableness'){
          processedResults.agreeableness = personalityAttribute.percentile;
          for(let j=0; j < personalityAttribute.children.length; j++){
            let personalityFacet = personalityAttribute.children[j]
            if(personalityFacet.trait_id == 'facet_altruism'){
              processedResults.altruism = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_cooperation'){
              processedResults.cooperation = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_modesty'){
              processedResults.modesty = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_morality'){
              processedResults.morality = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_sympathy'){
              processedResults.sympathy = personalityFacet.percentile
            } if(personalityFacet.trait_id == 'facet_trust'){
              processedResults.trust = personalityFacet.percentile
            }
          }
        }
        
        // Conscientiousness
        if(personalityAttribute.trait_id === 'big5_conscientiousness'){
          processedResults.conscientiousness = personalityAttribute.percentile;
          for(let j=0; j < personalityAttribute.children.length; j++){
            let personalityFacet = personalityAttribute.children[j]
            if(personalityFacet.trait_id == 'facet_achievement_striving'){
              processedResults.achievement_striving = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_cautiousness'){
              processedResults.cautiousness = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_dutifulness'){
              processedResults.dutifulness = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_orderliness'){
              processedResults.orderliness = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_self_discipline'){
              processedResults.self_discipline = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_self_efficacy'){
              processedResults.self_efficacy = personalityFacet.percentile
            } 
          }
        }

        // Openness
        if(personalityAttribute.trait_id === 'big5_openness'){
          processedResults.openness = personalityAttribute.percentile;
          for(let j=0; j < personalityAttribute.children.length; j++){
            let personalityFacet = personalityAttribute.children[j]
            if(personalityFacet.trait_id == 'facet_adventurousness'){
              processedResults.adventurousness = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_artistic_interests'){
              processedResults.artistic_interests = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_emotionality'){
              processedResults.emotionality = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_imagination'){
              processedResults.imagination = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_intellect'){
              processedResults.intellect = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_liberalism'){
              processedResults.liberalism = personalityFacet.percentile
            }
          }

        }
        if(personalityAttribute.trait_id === 'big5_extraversion'){
          processedResults.extraversion = personalityAttribute.percentile;
          for(let j=0; j < personalityAttribute.children.length; j++){
            let personalityFacet = personalityAttribute.children[j]
            console.log('Extraversion', personalityFacet)
            if(personalityFacet.trait_id == 'facet_activity_level'){
              processedResults.activity_level = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_assertiveness'){
              processedResults.assertiveness = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_cheerfulness'){
              processedResults.cheerfulness = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_excitement_seeking'){
              processedResults.excitement_seeking = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_friendliness'){
              processedResults.friendliness = personalityFacet.percentile
            }
            if(personalityFacet.trait_id == 'facet_gregariousness'){
              processedResults.gregariousness = personalityFacet.percentile
            }
          }

        }
      }
    }
    processedResults.Name = name;
    processedResults.Position = position;
    return processedResults;
  }
}

module.exports = {
  getPersonalityInsight:getPersonalityInsight
};
