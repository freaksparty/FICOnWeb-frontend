(function () {
    var menuCtrl = function ($scope, $http, $cookieStore, $rootScope, $window, $location) {
        	
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
        };

        $scope.ctr();
    }

    menuCtrl.$inject = ['$scope', '$http', '$cookieStore', '$rootScope', '$window', '$location'];
    angular.module('FICOnWeb').controller('menuCtrl', menuCtrl);
}());