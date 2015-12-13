(function () {
    var showSponsorsCtrl = function ($scope, $rootScope, $cookieStore, $http) {
		$scope.data = {};
		
		$scope.getSponsors = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/sponsor/1',
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
			$scope.data = $scope.getSponsors();
		};

        $scope.ctr();
    }

    showSponsorsCtrl.$inject = ['$scope', '$rootScope', '$cookieStore', '$http'];
    angular.module('FICOnWeb').controller('showSponsorsCtrl', showSponsorsCtrl);
}());