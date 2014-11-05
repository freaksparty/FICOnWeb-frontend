(function () {
    var loginCtrl = function ($scope, $rootScope, $http, $cookieStore, $location) {
        $scope.view = {};
        $scope.view.user = "";
        $scope.view.password = "";
		$scope.view.sendRecover = false;
		$scope.errors = {};
		$scope.errors.login = false;
		$scope.errors.loginCode = "";
		$scope.errors.forgot = false;
		$scope.errors.forgotCode = "";
        
        $scope.login = function (user, password) {
			$scope.errors.login = false;
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: 'http://ficonlan.es:81/api/login',
					method: "POST",
					data: { "login" : user, "password" : password },
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$cookieStore.put('FICOnCookie', data);
					$location.path("/home");
				}).error(function (data, status, headers, config) {
					$scope.errors.login = true;
					$scope.errors.loginCode = data.exceptionCode;
					$rootScope.createSession();
				});
			} else {
				$scope.errors.login = true;
				$scope.errors.loginCode = "1";
				$rootScope.createSession();
			}
        }

        $scope.ctr = function () {
		};

        $scope.ctr();
    }

    loginCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore', '$location'];
    angular.module('FICOnWeb').controller('loginCtrl', loginCtrl);
}());