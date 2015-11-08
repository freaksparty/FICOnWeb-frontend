(function () {
    var usersCtrl = function ($scope, $cookieStore, $http) {
        $scope.view = {};
		$scope.data = {};
		$scope.view.login = "";
		$scope.view.id = "";
		$scope.currentPage = 1;
		$scope.pagination = 5;
		$scope.size = 0;
		$scope.orderBy = "login";
		$scope.desc = 0;
		
		$scope.changeFilter = function (filter) {
			if ($scope.orderBy == filter) {
				if ($scope.desc == 1) {
					$scope.desc = 0;
				} else {
					$scope.desc = 1;
				}
			} else {
				$scope.desc = 1;
				$scope.orderBy = filter;
			}
			$scope.getUsers();
		}
		
		$scope.changeDate = function (date) {
			return moment(date, 'DD-MM-YYYY/HH:mm:ss').format('DD-MM-YYYY'); 
		}
		
		$scope.isNext = function () {
			return (($scope.currentPage * $scope.pagination < $scope.size) && ($scope.pagination > 0));
		}
		
		$scope.getPrev = function () {
            $scope.currentPage = $scope.currentPage-1;
            $scope.getUsers();
		}
		
		$scope.getNext = function () {
			$scope.currentPage = $scope.currentPage+1;
            $scope.getUsers();
		}
		
		$scope.getPages = function (pages) {
			$scope.pagination = pages;
			$scope.currentPage = 1;
			$scope.getUsers();
		};
		
		$scope.getSize = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/users/all/size/',
					method: "GET",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.size = data;
				}).error(function (data, status, headers, config) {
					console.log('error get');
				});
			} else {
				console.log('error');
			}
		}
		
		$scope.deleteUser = function (userId) {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/user/' + userId,
					method: "DELETE",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {	
					$scope.getUsers();
					$('#modalDelete').modal('toggle');
				}).error(function (data, status, headers, config) {
					console.log('error delete');
				});
			} else {
				console.log('error');
			}
		}
		
		$scope.getUsers = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/users/all/query?page=' + $scope.currentPage + '&pageTam=' + $scope.pagination + '&orderBy=' + $scope.orderBy + '&desc=' + $scope.desc,
					method: "GET",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.data = data;
				}).error(function (data, status, headers, config) {
					console.log('error get');
				});
			} else {
				console.log('error');
			}
		}
		
        $scope.ctr = function () {
			$scope.getSize();
			$scope.getUsers();
		};

        $scope.ctr();
    }

    usersCtrl.$inject = ['$scope', '$cookieStore', '$http'];
    angular.module('FICOnWeb').controller('usersCtrl', usersCtrl);
}());