'use strict';

angular.module('myApp.post', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/post', {
    templateUrl: 'post/post.html',
    controller: 'PostCtrl'
  });
}])

.controller('PostCtrl', ['$scope','$firebase','$location','CommonProp',function($scope,$firebase,$location,CommonProp) {
    $scope.addPost = function(){
	var title = $scope.article.title;
        var post = $scope.article.post;
	
	var firebaseObj = new Firebase(FB_URL + "/posts");
    	var fb = $firebase(firebaseObj);

	fb.$push({ title: title,post: post,emailId: CommonProp.getUser().password.email }).then(function(ref) {
  		console.log(ref); 
		$location.path('/welcome');
	}, function(error) {
  		console.log("Error:", error);
	});

    }
}]);

