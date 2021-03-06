(function () {
    var loginCtrl = function ($scope, $rootScope, $http, $cookieStore, $location) {
	$scope.view = {};
	$scope.view.user = "";
	$scope.view.password = "";
	$scope.view.email = "";
	$scope.view.sendRecover = false;
	$scope.errors = {};
	$scope.errors.login = false;
	$scope.errors.loginCode = "";
	$scope.errors.forgot = false;
	$scope.errors.forgotCode = "";
	$scope.loading = {};
	$scope.loading.forgotten = false;
        
	$scope.sendForgotten = function (email) {
		$scope.view.sendRecover = false;
		$scope.errors.forgot = false;
		$scope.errors.forgotCode = "";
		$scope.loading.forgotten = true;
		$rootScope.postUri('/api/user/passwordrecover', { "contenido" : email },
			function (data, status, headers, config) {
				$scope.loading.forgotten = false;
				if (data == "true") {
					$scope.view.sendRecover = true;
				} else {
					if (data == "false") {
						$scope.errors.forgot = true;
						$scope.errors.forgotCode = "98";
					} else {
					}
				}
			}, function (data, status) {
				$scope.loading.forgotten = false;
				$scope.errors.forgot = true;
				$scope.errors.forgotCode = data.exceptionCode;
			});
	}
		
        $scope.login = function (user, password) {
		$scope.errors.login = false;
		$scope.errors.loginCode = "";
		$rootScope.postUri('/api/login', { "login" : user, "password" : password },
			function (data, status, headers, config) {
				$cookieStore.put('FICOnCookie', data);
				if (data.secondpass) {
					$location.path("/profile");
				} else {
					$location.path("/home");
				}
			},
			function (data, status, headers, config) {
				$scope.errors.login = true;
				$scope.errors.loginCode = data.exceptionCode;
			});
        }

        $scope.ctr = function () {
	};

        $scope.ctr();
    }

    loginCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore', '$location'];
    angular.module('FICOnWeb').controller('loginCtrl', loginCtrl);
}());