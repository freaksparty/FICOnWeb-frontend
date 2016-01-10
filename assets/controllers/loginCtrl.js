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
// 		if ($cookieStore.get('FICOnCookie')) {
			$http({
				url: $rootScope.config.apiUrl + '/api/user/passwordrecover',
				method: "POST",
				data: { "contenido" : email },
				headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
			}).success(function (data, status, headers, config) {
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
			}).error(function (data, status, headers, config) {
				$scope.loading.forgotten = false;
				$scope.errors.forgot = true;
				$scope.errors.forgotCode = data.exceptionCode;
			});
// 		} else {
// 			$scope.loading.forgotten = false;
// 			$scope.errors.forgot = true;
// 			$scope.errors.forgotCode = "1";
// 			$rootScope.createSession();
// 		}
	}
		
        $scope.login = function (user, password) {
		$scope.errors.login = false;
		$scope.errors.loginCode = "";
// 		if ($cookieStore.get('FICOnCookie')) {
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
// 		} else {
// 			$scope.errors.login = true;
// 			$scope.errors.loginCode = "1";
// 			$rootScope.createSession();
// 		}
        }

        $scope.ctr = function () {
// 		if ($rootScope.getSessionId() == null) {
// 		    $rootScope.createSession();
// 		}
	};

        $scope.ctr();
    }

    loginCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore', '$location'];
    angular.module('FICOnWeb').controller('loginCtrl', loginCtrl);
}());