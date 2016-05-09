(function () {
    var activityaddCtrl = function ($scope, $rootScope, $http, $cookieStore, $log, $location) {
        $scope.view = {};
		$scope.view.activity = {};
		$scope.view.activity.image = "";
		$scope.view.activity.name = "";
		$scope.view.activity.description = "";
		$scope.view.activity.type = "workshop";
		$scope.view.activity.oficial = false;
		
		
		$scope.publish = function (activity) {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/' + $rootScope.config.eventId + '/activity/',
					method: "POST",
					data: { "name" : activity.name, "imageurl" : activity.image, "description" : activity.description, "numParticipants" : 500, "oficial": activity.oficial, "type" : activity.type },
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$location.path("/home");
				}).error(function (data, status, headers, config) {
					console.log('Taller no creado');
				});
			} else {
				console.log('Error activityaddCtrl.publish(): No hay cookie.');
			}
		}

        $scope.ctr = function () {
		};

        $scope.ctr();
    }

    activityaddCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore', '$log', '$location'];
    angular.module('FICOnWeb').controller('activityaddCtrl', activityaddCtrl);
}());