angular.module('challengeApp.auth', [])

.controller('AuthController', function ($scope, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    // Auth.signin($scope.user)
    //   .then(function (token) {
    //     $window.localStorage.setItem('com.shortly', token);
    //     $location.path('/links');
    //   })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      // .then(function (token) {
      //   $window.localStorage.setItem('com.shortly', token);
      //   $location.path('/links');
      // })
      .catch(function (error) {
        console.error(error);
      });
  };
});
