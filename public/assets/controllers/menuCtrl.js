(function () {
    var menuCtrl = function ($scope, $http, $cookieStore, $rootScope) {
        		
		$scope.isValidSession = function() {
			$http({
				url: 'http://ficonlan.es:81/api/session/isvalid',
				method: "GET",
				headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
			}).success(function (data, status, headers, config) {
				if (data == "false") $rootScope.createSession();
			}).error(function (data, status, headers, config) {
				$rootScope.createSession();
			});
		}
		
		$scope.isLogged = function() {
			if ($cookieStore.get('FICOnCookie')) {
				if ($cookieStore.get('FICOnCookie').user != null)  {
					console.log('logueado');
				} else {
					console.log('no logueado');
				}
			} else {
			};
		}
		
        $scope.ctr = function () {
			if ($cookieStore.get('FICOnCookie')) {
				$scope.isValidSession();
			} else {
				$rootScope.createSession();
			};
			$scope.isLogged();
        };

        $scope.ctr();
    }

    menuCtrl.$inject = ['$scope', '$http', '$cookieStore', '$rootScope'];
    angular.module('FICOnWeb').controller('menuCtrl', menuCtrl);
}());