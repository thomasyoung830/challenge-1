angular.module('challengeApp.createChallenge', [])

.controller('CreateChallengeController', function ($scope, CreateChallengeFactory) {
  
  $scope.allUsers = [];
  $scope.challengeInfo = {};

  // get array of all users in the database
  CreateChallengeFactory.getAllUsers().then(function(res){
    $scope.allUsers = res;
    // for testing purposes, set the challengee to the first user in allUsers
    $scope.challengee = $scope.allUsers[0];
  });

  // get the info of the person creating the challenge
  CreateChallengeFactory.getCreatorInfo().then(function(res){
    $scope.creatorUser = res;
  });

  // method that takes the challengeInfo object as argument and calls the factory POST call



});
