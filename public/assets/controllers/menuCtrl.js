(function () {
    var menuCtrl = function ($scope, $http, $cookieStore, $rootScope, $window, $location) {
		$scope.data = {};
		$scope.data.tournaments = [];
		$scope.data.productions = [];
		$scope.data.conferences = [];
		$scope.evento = 2;
        	
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
		
		/*$scope.getConferences = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/activityHeaders/1/query?type=conference',
					method: "GET",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.data.conferences = data;
				}).error(function (data, status, headers, config) {
					console.log('error get');
				});
			} else {
				console.log('error');
			}
		}
		
		$scope.getProductions = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/activityHeaders/1/query?type=production',
					method: "GET",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.data.productions = data;
				}).error(function (data, status, headers, config) {
					console.log('error get');
				});
			} else {
				console.log('error');
			}
		}
		
		$scope.getTournaments = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/activityHeaders/1/query?type=tournament',
					method: "GET",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.data.tournaments = data;
				}).error(function (data, status, headers, config) {
					console.log('error get');
				});
			} else {
				console.log('error');
			}
		}*/
		
        $scope.ctr = function () {		
			/*$scope.getTournaments();
			$scope.getProductions();
			$scope.getConferences();*/
			$rootScope.getEventData($scope);
        };

        $scope.ctr();
    }

    menuCtrl.$inject = ['$scope', '$http', '$cookieStore', '$rootScope', '$window', '$location'];
    angular.module('FICOnWeb').controller('menuCtrl', menuCtrl);
}());