(function () {
    var activityaddCtrl = function ($scope, $rootScope, $http, $cookieStore, $log, $location, $routeParams) {
        $scope.view = {};
		$scope.view.activity = {};
		$scope.view.activity.image = "";
		$scope.view.activity.name = "";
		$scope.view.activity.description = "";
		$scope.view.activity.type = "production";
		$scope.view.activity.oficial = false;
		
		$scope.publish = function (activity) {	
			if($routeParams.id) {
				$rootScope.postUri('/api/activity/'+$routeParams.id, 
						{ "name" : activity.name, "imageurl" : activity.image, "description" : activity.description, "numParticipants" : 500, "oficial": activity.oficial, "type" : activity.type }, 
									function(){
										$location.path("/home");
									},
									function (data, status, headers, config) {
										console.log('Actividad  no creada');
									},
									'PUT');
			} else {
				$rootScope.postUri('/api/event/{eventId}/activity/', 
						{ "name" : activity.name, "imageurl" : activity.image, "description" : activity.description, "numParticipants" : 500, "oficial": activity.oficial, "type" : activity.type }, 
									function(){
										$location.path("/home");
									},
									function (data, status, headers, config) {
										console.log('Actividad  no creada');
									});
			}
			
		}

		$scope.ctr = function () {
			if($routeParams.id) {
				$rootScope.getUri('/api/activity/' + $routeParams.id,function (data) {
					$scope.view = {};
					$scope.view.activity = {};
					$scope.view.activity.image = data.imageurl;
					$scope.view.activity.name = data.name;
					$scope.view.activity.description = data.description;
					$scope.view.activity.type = data.type;
					$scope.view.activity.oficial = data.oficial;
				});
			}
		}

        $scope.ctr();
    }

    activityaddCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore', '$log', '$location', '$routeParams'];
    angular.module('FICOnWeb').controller('activityaddCtrl', activityaddCtrl);
}());
