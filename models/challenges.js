var db = require('./index.js');

var iChallengeID = 1;
var iUserID = 1;

//Challenges Method
module.exports = {
  findChallengeById: function(challengeId) {
    db.Challenge.findOne({
      where : {
        id: iChallengeID
        //challenge_id: challengeId
      }
    })
    .then(function(result) {
      console.log('FIND CHALLENGE BY ID: ',result.get({plain: true}));
      return result.get({plain: true});
    }).catch(function() {
      throw new Error('Unknown error at method findChallengeById()');
    });
  },

  createChallenge: function(challengeObject) {

    db.User.findOne({id: iUserID}, function() {})
    .then(function(user) {
      console.log('INSIDE CREATE CHALLENGE: ', user);
      db.Challenge.create({
        title: challengeObject.title,
        message: challengeObject.message,
        wager: challengeObject.wager,
        creator: user.id,
        winner: challengeObject.winner,
        complete: challengeObject.complete,
        date_started: challengeObject.date_started,
        date_completed: challengeObject.date_completed
      }).then(function(challenge) {
        db.User.findOne({
          where: {id: user.id}
        }).then(function(user) {
          console.log('CREATING LINK: ', challenge);
          user.addChallenge(challenge, {accepted: false});
        });
      }).catch(function() {
        throw new Error('Unknown error at method createChallenge()');
      });
    });



    // db.Challenge.create({
    //   title: challengeObject.title,
    //   message: challengeObject.message,
    //   wager: challengeObject.wager,
    //   creator: user.id,
    //   winner: challengeObject.winner,
    //   complete: challengeObject.complete,
    //   date_started: challengeObject.date_started,
    //   date_completed: challengeObject.date_completed
    // })


  }

};
