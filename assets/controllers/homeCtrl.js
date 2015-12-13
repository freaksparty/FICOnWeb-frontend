(function () {
    var homeCtrl = function ($scope, $rootScope, $http, $cookieStore, $routeParams, $location) {
        $scope.view = {};
		//$scope.data = {};
		//$scope.desc = {};
		$scope.currentPage = 1;
		$scope.pagination = 10;
		//$scope.size = 0;
		//$scope.data.tournaments = [];
		$scope.news = {};
		
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
		
		$scope.getNews = function () {	
			$http({
				url: $rootScope.config.apiUrl + '/api/event/' + $rootScope.config.eventId + 
				    '/news/published/' + $scope.currentPage + '/' + $scope.pagination,
				method: "GET",
				cache: true,
				headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
			}).success(function (data, status, headers, config) {
				$scope.news = data;
			}).error(function (data, status, headers, config) {
				console.log('Error getNews('+status+') ' + data);
			});
		}
		
        $scope.ctr = function () {
            if ($routeParams.page) $scope.currentPage = $routeParams.page;
			//$scope.getSize();
			$scope.getNews();
			$rootScope.getEventData($scope);
		};

        $scope.ctr();
    }

    homeCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore', '$routeParams', '$location'];
    angular.module('FICOnWeb').controller('homeCtrl', homeCtrl);
}());