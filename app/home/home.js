'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$location','CommonProp','$firebaseAuth',function($scope,$location,CommonProp,$firebaseAuth) {
    var firebaseObj = new Firebase(FB_URL);
    var loginObj = $firebaseAuth(firebaseObj);
    var login = {};

    $scope.signIn = function(e) {
        e.preventDefault();
        var username = $scope.user.email;
        var password = $scope.user.password;
        loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            console.log('Authentication successful');
            localStorage.setItem('user', JSON.stringify(user));
            CommonProp.setUser(user);
           $location.path('/welcome');
        }, function(error) {
            console.log('Authentication failure');
        });
    }
}])

.service('CommonProp', function() {
    var user = '';
 
    return {
        getUser: function() {
            if (!user) {
                user = JSON.parse(localStorage.getItem('user'));
            }
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
});