(function () {
    var registerCtrl = function ($scope, $cookieStore, $http, $rootScope) {
        $scope.view = {};
		$scope.view.selectDNI = "1";
		$scope.view.login = "";
		$scope.view.pass = "";
		$scope.view.pass2 = "";
		$scope.view.email = "";
		$scope.view.name = "";
		$scope.view.dni = "";
		$scope.view.phone = "";
		$scope.view.shirtSize = "";
		$scope.view.registerSend = false;
		$scope.errors = {};
		$scope.errors.register = false;
		$scope.errors.registerCode = "";
		
		$scope.isNumber = function (number) {
			if (isNaN(number)) {
				return false;
			} else {
				return true;
			}
		}
		
		$scope.validatePassword = function (pass, pass2) {
			if ((pass != "") && (pass2 != "")) {
				if (pass == pass2) {
					return true;
				} else {
					return false;
				}
			} else return false;
		}
		
		$scope.validateDni = function (dni) {
			if (dni !== undefined) {
				var numero, let, letra;
				var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;
				dni = dni.toUpperCase();
				if (expresion_regular_dni.test(dni) === true) {
					numero = dni.substr(0, dni.length - 1);
					numero = numero.replace('X', 0);
					numero = numero.replace('Y', 1);
					numero = numero.replace('Z', 2);
					let = dni.substr(dni.length - 1, 1);
					numero = numero % 23;
					letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
					letra = letra.substring(numero, numero + 1);
					if (letra != let) {
						return false;
					} else {
						return true;
					}
				} else {
					return false;
				}
			}
		};
		
		$scope.register = function (login, pass, pass2, email, name, dni, phone, shirtSize) {
			$scope.errors.register = false;
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: 'http://ficonlan.es:81/api/user',
					method: "POST",
					data: { "name" : name, "login" : login, "password" : pass, "dni" : dni, "email" : email, "phoneNumber" : phone, "shirtSize" : shirtSize },
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.view.registerSend = true;
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