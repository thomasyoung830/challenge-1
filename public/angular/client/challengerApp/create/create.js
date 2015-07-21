angular.module('challengeApp.createChallenge', [])

.controller('CreateChallengeController', function ($scope, CreateChallengeFactory) {
  
  $scope.allUsers = [];
  $scope.challengeInfo = {};

  // get array of all users in the database
  CreateChallengeFactory.getAllUsers().then(function(res){
    angular.forEach(res, function(user){
      user.full_name = user.first_name+' '+user.last_name;
    });
    $scope.allUsers = res;
  });

  // get the info of the person creating the challenge
  CreateChallengeFactory.getCreatorInfo().then(function(res){
    $scope.challengeInfo.creator = res.id;
  });

  // method that takes the challengeInfo object as argument and calls the factory POST call
  $scope.postChallenge = function(challengeInfo){
    challengeInfo.challengee = challengeInfo.challengee.id;
  };


});
