(function () {
    var profileCtrl = function ($scope, $cookieStore, $http, $location) {
        $scope.view = {};
		$scope.view.passChanged = false;
		$scope.view.dataChanged = false;
		$scope.view.oldPass = "";
		$scope.view.newPass = "";
		$scope.view.newPass2 = "";
		$scope.data = {};
		$scope.data.user = {};
		$scope.errors = {};
		$scope.errors.recoverPass = false;
		$scope.errors.recoverPassCode = "";
		$scope.errors.changeData = false;
		$scope.errors.changeDataCode = "";

		$scope.getCurrentUser = function () {
			if ($cookieStore.get('FICOnCookie')) {
				if ($cookieStore.get('FICOnCookie').user != null) {
					$http({
						url: 'http://ficonlan.es:81/api/session/currentUser',
						method: "GET",
						headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
					}).success(function (data, status, headers, config) {
						$scope.data.user = data;
					}).error(function (data, status, headers, config) {
						$location.path("home");
					});
				} else {
					$location.path("home");
				}
			} else {
				$location.path("home");
			}
        };
		
		$scope.changeData = function () {
			$scope.errors.changeData = false;
			$scope.view.dataChanged = false;
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: 'http://ficonlan.es:81/api/user/' + $cookieStore.get('FICOnCookie').user ,
					method: "PUT",
					data: $scope.data.user,
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.view.dataChanged = true;
				}).error(function (data, status, headers, config) {
					$scope.errors.changeData = true;
					$scope.errors.changeDataCode = data.exceptionCode;
				});
			} else {
				$rootScope.createSession();
			}
        };
		
		$scope.changePassword = function (oldPassword, newPassword) {
			$scope.errors.recoverPass = false;
			$scope.view.passChanged = false;
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: 'http://ficonlan.es:81/api/user/changePassword/' + $cookieStore.get('FICOnCookie').user ,
					method: "POST",
					data: { "oldPassword" : oldPassword, "newPassword" : newPassword},
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.view.passChanged = true;
					$scope.view.oldPass = "";
					$scope.view.newPass = "";
					$scope.view.newPass2 = "";
				}).error(function (data, status, headers, config) {
					$scope.errors.recoverPass = true;
					$scope.errors.recoverPassCode = data.exceptionCode
				});
			} else {
				$rootScope.createSession();
			}
        };
		
        $scope.ctr = function () {
			$scope.getCurrentUser();
        };
		
        $scope.ctr();
    }

    profileCtrl.$inject = ['$scope', '$cookieStore', '$http', '$location'];
    angular.module('FICOnWeb').controller('profileCtrl', profileCtrl);
}());