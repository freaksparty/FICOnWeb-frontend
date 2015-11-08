(function () {
    var sponsorCtrl = function ($scope, $cookieStore, $http, $rootScope) {
        $scope.view = {};
		$scope.data = {};
		$scope.view.name = "";
		$scope.view.id = "";
		$scope.currentPage = 1;
		$scope.pagination = 5;
		$scope.size = 0;
		$scope.orderBy = "sponsorId";
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
			$scope.getSponsors();
		}
		
		$scope.isNext = function () {
			return (($scope.currentPage * $scope.pagination < $scope.size) && ($scope.pagination > 0));
		}
		
		$scope.getPrev = function () {
            $scope.currentPage = $scope.currentPage-1;
            $scope.getSponsors();
		}
		
		$scope.getNext = function () {
			$scope.currentPage = $scope.currentPage+1;
            $scope.getSponsors();
		}
		
		$scope.getPages = function (pages) {
			$scope.pagination = pages;
			$scope.currentPage = 1;
			$scope.getSponsors();
		};
		
		$scope.getSize = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/sponsor/size/',
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
			
		$scope.deleteSponsor = function (sponsorId) {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/sponsor/' + sponsorId,
					method: "DELETE",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {	
					$scope.getSponsors();
					$('#modalDelete').modal('toggle');
				}).error(function (data, status, headers, config) {
					console.log('error delete');
				});
			} else {
				console.log('error');
			}
		}
		
		$scope.getSponsors = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/sponsor/query?page=' + $scope.currentPage + '&pageTam=' + $scope.pagination + '&orderBy=' + $scope.orderBy + '&desc=' + $scope.desc,
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
			$scope.getSponsors();
		};

        $scope.ctr();
    }

    sponsorCtrl.$inject = ['$scope', '$cookieStore', '$http', '$rootScope'];
    angular.module('FICOnWeb').controller('sponsorCtrl', sponsorCtrl);
}());