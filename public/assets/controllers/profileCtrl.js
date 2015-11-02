(function () {
    var profileCtrl = function ($scope, $rootScope, $cookieStore, $http, $location) {
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
				if ($cookieStore.get('FICOnCookie').userId > 0) {
					$http({
						url: $rootScope.config.apiUrl + '/api/session/currentUser',
						method: "GET",
						headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
					}).success(function (data, status, headers, config) {
						$scope.data.user = data;
						$scope.data.user.dob = $scope.data.user.dob.substring(1, $scope.data.user.dob.indexOf("/"));
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
			$scope.errors.changeDataCode = "";
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/user/' + $cookieStore.get('FICOnCookie').user ,
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
			$scope.errors.recoverPassCode = "";
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/user/changePassword/' + $cookieStore.get('FICOnCookie').user ,
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
		
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        });
        
        $scope.ctr = function () {
			$scope.getCurrentUser();
        };
		
        $scope.ctr();
    }

    profileCtrl.$inject = ['$scope', '$rootScope', '$cookieStore', '$http', '$location'];
    angular.module('FICOnWeb').controller('profileCtrl', profileCtrl);
}());