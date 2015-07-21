angular.module('challengeApp.createChallenge', [])

.controller('CreateChallengeController', function ($scope, CreateChallengeFactory) {
  
  $scope.allUsers = [];
  $scope.challengeInfo = {};
  $scope.challengeInfo.participants = [];

  // get array of all users in the database
  CreateChallengeFactory.getAllUsers().then(function(res){
    angular.forEach(res, function(user){
      user.full_name = user.first_name+' '+user.last_name;
    });
    $scope.allUsers = res;
  });

  // method that takes the challengeInfo object as argument and calls the factory POST call
  $scope.postChallenge = function(challengeInfo){
    challengeInfo.participants.push( challengeInfo.challengee.id );
  };


});
