(function () {
    var rulesCtrl = function ($scope, $rootScope, $http, $cookieStore) {
        $scope.data = {};		

		$scope.getRules = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/1/rules',
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
			$scope.getRules();
		};

        $scope.ctr();
    }

    rulesCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore'];
    angular.module('FICOnWeb').controller('rulesCtrl', rulesCtrl);
}());