(function () {
    var activityCtrl = function ($scope, $rootScope, $cookieStore, $http) {
        $scope.view = {};
		$scope.data = {};
		$scope.currentPage = 1;
		$scope.pagination = 5;
		$scope.size = 0;
		$scope.orderBy = "event";
		$scope.desc = 1;
		
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
			$scope.getActivities();
		}
		
		$scope.isNext = function () {
			return (($scope.currentPage * $scope.pagination < $scope.size) && ($scope.pagination > 0));
		}
		
		$scope.getPrev = function () {
            $scope.currentPage = $scope.currentPage-1;
            $scope.getActivities();
		}
		
		$scope.getNext = function () {
			$scope.currentPage = $scope.currentPage+1;
            $scope.getActivities();
		}
		
		$scope.getPages = function (pages) {
			$scope.pagination = pages;
			$scope.currentPage = 1;
			$scope.getActivities();
		};
		
		$scope.getSize = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/' + $rootScope.config.eventId + '/activityTAM/all',
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
		
		$scope.deleteActivity = function (activityId) {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/activity/' + activityId,
					method: "DELETE",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.getActivities();
				}).error(function (data, status, headers, config) {
					console.log('error delete');
				});
			} else {
				console.log('error');
			}
		}
		
		$scope.getActivities = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/' + $rootScope.config.eventId + '/activityHeaders/query?page=' + $scope.currentPage + '&pageTam=' + $scope.pagination + '&orderBy=' + $scope.orderBy + '&desc=' + $scope.desc,
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
			$scope.getActivities();
		};

        $scope.ctr();
    }

    activityCtrl.$inject = ['$scope', '$rootScope', '$cookieStore', '$http'];
    angular.module('FICOnWeb').controller('activityCtrl', activityCtrl);
}());