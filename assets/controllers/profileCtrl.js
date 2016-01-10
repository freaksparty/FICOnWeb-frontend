(function () {
    var profileCtrl = function ($scope, $rootScope, $cookieStore, $http, $location) {
        $scope.view = {};
	$scope.view.passChanged = false;
	$scope.view.dataChanged = false;
	$scope.view.oldPass = "";
	$scope.view.newPass = "";
	$scope.view.newPass2 = "";
	$scope.view.dob = "";
	$scope.data = {};
	$scope.data.user = {};
	$scope.errors = {};
	$scope.errors.recoverPass = false;
	$scope.errors.recoverPassCode = "";
	$scope.errors.changeData = false;
	$scope.errors.changeDataCode = "";

	$scope.changeDate = function (date) {
		return moment(date, 'DD-MM-YYYY/HH:mm:ss').format('DD-MM-YYYY'); 
	}
	
	$scope.deleteUser = function () {	
		if ($cookieStore.get('FICOnCookie')) {
			$http({
				url: $rootScope.config.apiUrl + '/api/user/' + $cookieStore.get('FICOnCookie').userId,
				method: "DELETE",
				headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
			}).success(function (data, status, headers, config) {	
				$('#modalDelete').modal('toggle');
				$location.path("home");
			}).error(function (data, status, headers, config) {
				console.log('error delete');
			});
		} else {
			console.log('error');
		}
	}
	
	$scope.getCurrentUser = function () {
		if($rootScope.getIsLogged()) {
			$rootScope.getUri('/api/session/currentUser',
				function (data, status) {
					$scope.data.user = data;
					$scope.view.dob = $scope.changeDate($scope.data.user.dob);
				},
				function (data, status) {
					$location.path("home");
				});
				
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
				url: $rootScope.config.apiUrl + '/api/user/' + $cookieStore.get('FICOnCookie').userId ,
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
				url: $rootScope.config.apiUrl + '/api/user/changePassword/' + $cookieStore.get('FICOnCookie').userId,
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
		$rootScope.pageRequiresLogin();
		$scope.getCurrentUser();
	};

        $scope.ctr();
    }

    profileCtrl.$inject = ['$scope', '$rootScope', '$cookieStore', '$http', '$location'];
    angular.module('FICOnWeb').controller('profileCtrl', profileCtrl);
}());