var db = require('./index.js');

var iChallengeID = 1;

//Challenges Method
module.exports = {
  findChallengeById: function(challengeId) {
    db.Challenges.findAll({
      where : {
        challenge_id: iChallengeID
        //challenge_id: challengeId
      }
    }) 
    .then(function(results) {
      if (results.length < 1) {
        throw new Error('Challenge ID not found at method findChallengeById()');
      } else {
        console.log('chalenges found: ', results);
        return results;
      }
    }).catch(function() {
      throw new Error('Unknown error at method findChallengeById()');
    });
  },

  createChallenge: function(challengeObject) {
    db.Challenges.create({
      title: challengeObject.title,
      message: challengeObject.message,
      wager: challengeObject.wager,
      creator: challengeObject.creator,
      winner: challengeObject.winner,
      complete: challengeObject.complete,
      start_date: challengeObject.start_date,
      complete_date: challengeObject.complete_date
    }).catch(function() {
      throw new Error('Unknown error at method createChallenge()');
    });
  }
  
};
