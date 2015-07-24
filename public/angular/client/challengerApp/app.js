angular.module('challengeApp', [
  'challengeApp.challenge',
  'challengeApp.createChallenge',
  'challengeApp.completedChallenges',
  'challengeApp.recentChallenges',
  'challengeApp.services',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
    
  $urlRouterProvider.otherwise('/signin');
    
  $stateProvider
      // HOME STATES AND NESTED VIEWS ========================================
    .state('signin', {
      url: '/signin',
      templateUrl: 'angular/client/challengerApp/auth/signin.html',
    })

    .state('signout', {
      url: '/signout',
      controller: function($scope, $state) {
        $scope.logout();
        $state.go('signin');
      }
    })

    .state('completed', {
        url: '/completed',
        templateUrl: 'angular/client/challengerApp/completed.html',
        controller: 'completedChallengesController'
    })

    .state('create', {
        url: '/create',
        templateUrl: 'angular/client/challengerApp/create/create.html',
        controller: 'CreateChallengeController'
    })
    // Challenge PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('challenge', {
        url: '/challenge/:challengeId',
        templateUrl: 'angular/client/challengerApp/challenge/public.html',
        controller: 'ChallengeController'

    .state('challenge.creator', {
      url: '/creator',
      templateUrl: 'angular/client/challengerApp/challenge/creator.html', 
    })

    .state('challenge.challengee', {
      url: '/challengee',
      templateUrl: 'angular/client/challengerApp/challenge/challengee.html', 
    })
  });

}).controller('ChallengeAppController', function($scope, $state, Auth) {
  $scope.user = null;

  $scope.setCurrentUser = function() {
    Auth.getUserInfo().then(function(user) {
      $scope.user = user;
    }, function() {
      $state.go('signin');
    });
  };

  $scope.logout = function() {
    Auth.logout().then(function() {
      $scope.user = null;
    });
  };

  $scope.setCurrentUser();
});
