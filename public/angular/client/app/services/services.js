angular.module('challengeApp.services', [])

.factory('Auth', function ($http) {
  // Your code here
})

.factory('ChallengeFactory', function($http){
	var getChallengeInfo = function(challengeId){
		return $http({
		  method: 'GET',
		  url: '/api/1/challenge/' +  challengeId,
		}).then(function(resp){
		  return resp;
		});
	};



	return {
		getChallengeInfo: getChallengeInfo
	};
});