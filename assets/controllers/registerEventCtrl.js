(function () {
    var registerEventCtrl = function ($scope, $rootScope, $cookieStore, $http) {
        $scope.view = {};
		$scope.data = {};
 		$scope.evento = $rootScope.config.eventId;
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
			return moment(date, 'DD-MM-YYYY/HH:mm:ss').format('DD-MM-YYYY - HH:mm:ss'); 
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
					url: $rootScope.config.apiUrl + '/api/event/registrations/size/' + $rootScope.config.eventId + '/all', 
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
		
		$scope.setPaid = function (userId) {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/registration/setPaid/' + $rootScope.config.eventId + '/' + userId, 
					method: "PUT",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.ctr();
				}).error(function (data, status, headers, config) {
					console.log('Error setPaid() ' + status + ': ' + data);
				});
			} else {
				console.log('error');
			}
		}
		
		$scope.classLabel = function (state) {
			if (state == 'paid') return 'label-success';
			if (state == 'registered') return 'label-warning';
			if (state == 'inQueue') return 'label-danger';
		}
				
		$scope.removeRegister = function (userId) {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/registration/' + $rootScope.config.eventId + '/' + userId, 
					method: "DELETE",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.ctr();
					$('#modalDelete').modal('toggle');
				}).error(function (data, status, headers, config) {
					console.log('error get');
				});
			} else {
				console.log('error');
			}
		}
		
		$scope.getUsers = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/registrations/' + $rootScope.config.eventId + '/query?page=' + $scope.currentPage + '&pageTam=' + $scope.pagination + '&orderBy=' + $scope.orderBy + '&desc=' + $scope.desc + '&state=all', 
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

    registerEventCtrl.$inject = ['$scope', '$rootScope', '$cookieStore', '$http'];
    angular.module('FICOnWeb').controller('registerEventCtrl', registerEventCtrl);
}());