(function () {
    var registerCtrl = function ($scope, $cookieStore, $http, $rootScope) {
        $scope.view = {};
		$scope.view.login = "";
		$scope.view.pass = "";
		$scope.view.pass2 = "";
		$scope.view.email = "";
		$scope.view.name = "";
		$scope.view.dni = "";
		$scope.view.phone = "";
		$scope.view.shirtSize = "";
		$scope.errors = {};
		$scope.errors.register = false;
		$scope.errors.registerCode = "";
		
		$scope.validatePassword = function (pass, pass2) {
			if ((pass != "") && (pass2 != "")) {
				if (pass == pass2) {
					return true;
				} else {
					return false;
				}
			} else return false;
		}
		
		$scope.register = function (login, pass, pass2, email, name, dni, phone, shirtSize) {
			$scope.errors.register = false;
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: 'http://ficonlan.es:81/api/user',
					method: "POST",
					data: { "name" : name, "login" : login, "password" : pass, "dni" : dni, "email" : email, "phoneNumber" : phone, "shirtSize" : shirtSize },
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					console.log('registrado');
					console.log(data);
				}).error(function (data, status, headers, config) {
					$scope.errors.register = true;
					$scope.errors.registerCode = data.exceptionCode;
					$rootScope.createSession();
				});
			} else {
				$scope.errors.register = true;
				$scope.errors.registerCode = "1";
				$rootScope.createSession();
			}
        }

        $scope.ctr = function () {
        };

        $scope.ctr();
    }

    registerCtrl.$inject = ['$scope', "$cookieStore", "$http", "$rootScope"];
    angular.module('FICOnWeb').controller('registerCtrl', registerCtrl);
}());