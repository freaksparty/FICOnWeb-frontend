(function () {
    var menuCtrl = function ($scope, $http, $cookieStore, $rootScope, $window, $location) {
	$scope.data = {};
	$scope.data.workshops = [];
	
	$scope.logout = function () {
		if ($cookieStore.get('FICOnCookie')) {
			$http({
				url: $rootScope.config.apiUrl + '/api/session',
				method: "DELETE",
				headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
			}).success(function (data, status, headers, config) {
				$cookieStore.remove('FICOnCookie');
				$location.path('/');
				$window.location.reload();
			}).error(function (data, status, headers, config) {
				$cookieStore.remove('FICOnCookie');
				$location.path('/');
				$window.location.reload();
			});
		} else {
			$rootScope.createSession();
		}
	};
		
        $scope.ctr = function () {
		$rootScope.getEventData($scope);
        };

	$scope.checkRole = function(role) {
		return $scope.vars.roles.indexOf(role) != -1;
	}

	$scope.showAdmin = function() {
		return $scope.checkRole('Admin') || $scope.checkRole('ActivityController') || $scope.checkRole('EventController') || $scope.checkRole('NewsController') || $scope.checkRole('SponsorController') || $scope.checkRole('RegistrationController');
	}

        $scope.ctr();
    }

    menuCtrl.$inject = ['$scope', '$http', '$cookieStore', '$rootScope', '$window', '$location'];
    angular.module('FICOnWeb').controller('menuCtrl', menuCtrl);
}());