(function () {
    var homeCtrl = function ($scope, $rootScope, $http, $cookieStore, $routeParams, $location) {
        $scope.view = {};
		$scope.data = {};
		$scope.desc = {};
		$scope.currentPage = 1;
		$scope.pagination = 10;
		$scope.size = 0;
		$scope.data.tournaments = [];
		
		$scope.isNext = function () {
			return $scope.currentPage * $scope.pagination < $scope.size;
		}
		
		$scope.getPrev = function () {
            $scope.currentPage = parseInt($scope.currentPage)-1;
            $location.url("home?page=" + $scope.currentPage);
		}
		
		$scope.getNext = function () {
			$scope.currentPage = parseInt($scope.currentPage)+1;
            $location.url("home?page=" + $scope.currentPage);
		}
		
		$scope.getSize = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/news/published/size/1',
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
		
		
		$scope.getNews = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/news/published/1/' + $scope.currentPage + '/' + $scope.pagination,
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
            if ($routeParams.page) $scope.currentPage = $routeParams.page;
			$scope.getSize();
			$scope.getNews();
			$rootScope.getEventData($scope);
		};

        $scope.ctr();
    }

    homeCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore', '$routeParams', '$location'];
    angular.module('FICOnWeb').controller('homeCtrl', homeCtrl);
}());