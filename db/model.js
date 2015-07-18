var pass = '1234';

var Sequelize = require('Sequelize');
var orm = new Sequelize('ChallengeDb', 'app', pass, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 3000
  },

  storage: './ChallengeDb.sqlite'
});

orm.authenticate()
  // .then(function() {
  //   console.log('Connection to db successful!');
  //  })
  .catch(function(err) {
    console.log('Connection to db failed: ', err);
  })
  .done();

var Users = orm.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    autoincrement: true,
    primaryKey: true
  },

  first_Name: {
    type: Sequelize.STRING
  },

  last_Name: {
    type: Sequelize.STRING
  },

  FB_Email: {
    type: Sequelize.STRING
  }
});

var Challenges = orm.define('challenges', {
  challenge_id: {
    type: Sequelize.INTEGER,
    autoincrement: true,
    primaryKey: true
  },

  url_id: {
    type: Sequelize.INTEGER,
    autoincrement: true
  },

  title: {
    type: Sequelize.STRING
  },

  message: {
    type: Sequelize.STRING
  },

  wager: {
    type: Sequelize.STRING
  },

  creator: {
    type: Sequelize.INTEGER
  },

  winner: {
    type: Sequelize.INTEGER
  },

  complete: {
    type: Sequelize.BOOLEAN
  },

  // sequelize or sqlite automatically makes a 'createdAt' attribute
  // create_date: {

  // },

  start_date: {
    type: Sequelize.DATE
  },

  complete_date: {
    type: Sequelize.DATE
  }
});

// Define the join table which joins Users and Challenges
var UsersChallenges = orm.define('users-challenges', {
  user_id: {
    type: Sequelize.INTEGER
  },

  challenge_id: {
    type: Sequelize.INTEGER
  },

  accepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

// Setup the many-many relationship through the orm
Users.belongsToMany(Challenges, {
  through: UsersChallenges
});

Challenges.belongsToMany(Users, {
  through: UsersChallenges
});


// make the database
// delete database file to clear database
orm.sync();

exports.Users = Users;
exports.Challenges = Challenges;
exports.UsersChallenges = Users.Challenges;
