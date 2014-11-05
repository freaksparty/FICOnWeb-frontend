(function () {
    var menuCtrl = function ($scope, $http, $cookieStore, $rootScope, $window) {
        	
		$scope.logout = function () {
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: 'http://ficonlan.es:81/api/session',
					method: "DELETE",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$cookieStore.remove('FICOnCookie');
					$window.location.reload();
				}).error(function (data, status, headers, config) {
					console.log('error al cerrar sesión');
				});
			} else {
				$rootScope.createSession();
			}
		};
		
        $scope.ctr = function () {		
        };

        $scope.ctr();
    }

    menuCtrl.$inject = ['$scope', '$http', '$cookieStore', '$rootScope', '$window'];
    angular.module('FICOnWeb').controller('menuCtrl', menuCtrl);
}());