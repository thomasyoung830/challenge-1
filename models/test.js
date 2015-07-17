var db = require('./index.js');
var challenges = require('./challenges.js');

var testObject = {
	title: 'gallon milk challenge',
	message: 'Randy Savege said you cant drink gallon of milk',
	wager: 'Randy will pay you 500 if successful',
	creator: 1,
	winner: null,
	complete: false,
	start_date: Date(),
	complete_date: Date()
};

challenges.createChallenge(testObject);

//This is Users method
// db.Users.findOrCreate({
// 	where: {first_name: 'Johny', last_name: 'Martin'}, 
// 	defaults: {last_name: 'Martin',
// 				FB_Email: 'ricky@example.com'}
// }).then(function(user) {
// 	 //console.log('HERE IS THE USER:', user.get('first_name') + ' ' + user.get('last_name'));
// 	//console.log('HERE IS THE USER:',user);
// }).catch(function() {
// 	console.log('Error at Users.findOrcreate');
// });

// db.Users.findAll({
// 	where : {
// 		first_name: 'Johny',
// 		last_name: 'Martin'
// 	}
// }) 
// .then(function(results) {
//   if (results.length < 1) {
//   	console.log('no user found');
//   } else {
//   	console.log('user found');
//   }
// }).catch(function() {
// 	console.log('Error at Users.findAll');
// });


// //This is Messages method


