angular.module('challenge', [
  'challenge.clicked',
  'challenge.create',
  'challenge.completed',
  'challenge.auth',
  'challenge.recent',
  'challenge.services',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
    
  $urlRouterProvider.otherwise('/signin');
    
  $stateProvider
      // HOME STATES AND NESTED VIEWS ========================================
    .state('signin', {
        url: '/signin',
        templateUrl: 'signin.html',
        controller: 'SigninController'
    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'signup.html',
        controller: 'SignupController'
    })

    .state('completed', {
        url: '/completed',
        template: 'completed.html',
        controller: 'CompletedController'
    })

    .state('create', {
        url: '/create',
        template: 'create.html',
        controller: 'CreateController'
    })
    // Challenge PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('challenge', {
        url: '/challenge',
        views: {
            // the main template will be placed here (relatively named)
            'creator': { 
              templateUrl: 'challenge/creator.html',
              controller: 'ChallengeController'
            },

            // the child views will be defined here (absolutely named)
            'challenger': { 
              templateUrl: 'challenge/challenger.html' 
              controller: "ChallengeController"
            },

            // for column two, we'll define a separate controller 
            'public': { 
              templateUrl: 'challenge/public.html',
              controller: "ChallengeController" 
          }
        }
    });

}); // closes $routerApp.config()


    
        