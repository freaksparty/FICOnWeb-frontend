(function () {
    var profileCtrl = function ($scope) {
        $scope.view = {};

		$scope.getCurrentUser = function () {
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: 'http://ficonlan.es:81/api/session/currentUser',
					method: "GET",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					console.log(data);
				}).error(function (data, status, headers, config) {
					console.log('error');
				});
			} else {
				console.log('error cookie');
			}
        }
		
        $scope.ctr = function () {
			$scope.getCurrentUser();
        };
		
        $scope.ctr();
    }

    profileCtrl.$inject = ['$scope'];
    angular.module('FICOnWeb').controller('profileCtrl', profileCtrl);
}());