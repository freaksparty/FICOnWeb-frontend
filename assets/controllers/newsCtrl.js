(function () {
    var newsCtrl = function ($scope, $cookieStore, $http, $rootScope) {
        $scope.view = {};
		$scope.data = {};
		$scope.currentPage = 1;
		$scope.pagination = 5;
		$scope.size = 0;
		$scope.orderBy = "publishDate";
		$scope.desc = 1;
		
		$scope.changeDate = function (date) {
			return moment(date, 'DD-MM-YYYY/HH:mm:ss').format('DD-MM-YYYY HH:mm:ss'); 
		}
		
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
			$scope.getNews();
		}
		
		$scope.isNext = function () {
			return (($scope.currentPage * $scope.pagination < $scope.size) && ($scope.pagination > 0));
		}
		
		$scope.getPrev = function () {
            $scope.currentPage = $scope.currentPage-1;
            $scope.getNews();
		}
		
		$scope.getNext = function () {
			$scope.currentPage = $scope.currentPage+1;
            $scope.getNews();
		}
		
		$scope.getPages = function (pages) {
			$scope.pagination = pages;
			$scope.currentPage = 1;
			$scope.getNews();
		};
		
		$scope.getSize = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/news/all/size/' + $rootScope.config.eventId,
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
		
		$scope.deleteNews = function (newsId) {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/news/' + newsId,
					method: "DELETE",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$scope.getNews();
				}).error(function (data, status, headers, config) {
					console.log('error delete');
				});
			} else {
				console.log('error');
			}
		}
		
		$scope.getNews = function () {	
			$http({
				url: $rootScope.config.apiUrl + '/api/event/' +
					$rootScope.config.eventId + '/news/query?page=' + $scope.currentPage + 
					'&pageTam=' + $scope.pagination + '&orderBy=' + $scope.orderBy + '&desc=' + $scope.desc,
				method: "GET",
				headers: { "sessionId" :  $rootScope.getSessionId() }
			}).success(function (data, status, headers, config) {
				$scope.data = data;
			}).error(function (data, status, headers, config) {
				console.log('Error getNews() ' + status + ': ' + data);
			});
		}
		
        $scope.ctr = function () {
			$scope.getSize();
			$scope.getNews();
		};

        $scope.ctr();
    }

    newsCtrl.$inject = ['$scope', '$cookieStore', '$http', '$rootScope'];
    angular.module('FICOnWeb').controller('newsCtrl', newsCtrl);
}());