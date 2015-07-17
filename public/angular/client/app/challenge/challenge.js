angular.module('challengeApp.challenge', [])

.controller('ChallengeController', function ($scope, ChallengeFactory) {
  
  $scope.challengeData = {};
  
  $scope.getChallengeInfo = function(challengeId){
    ChallengeFactory.getChallengeInfo(challengeId).then(function(res){
        $scope.challengeData.creator = res.creator;
        $scope.challengeData.participants = res.participants[0].id;
        $scope.challengeData.title = res.title;
        $scope.challengeData.description = res.message;
    });
  };



});
