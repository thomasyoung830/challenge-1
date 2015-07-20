angular.module('challengeApp.auth', [])

.controller('AuthController', function ($scope, AuthFactory) {
  $scope.user = {};

  $scope.getUserInfo = function () {
    AuthController.getUserInfo().then(function(res){
      console.log(res);
      $scope.user = res;
    })
  };

  $scope.signup = function () {
    // Auth.signup($scope.user)
      // .then(function (token) {
      //   $window.localStorage.setItem('com.shortly', token);
      //   $location.path('/links');
      // })
      // .catch(function (error) {
      //   console.error(error);
      // });
  };
});
