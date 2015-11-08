(function () {
    var showActivityCtrl = function ($scope, $rootScope, $cookieStore, $http, $routeParams) {
		$scope.data = {};
		$scope.type = '';
		
		$scope.getActivity = function () {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/activity/' + $routeParams.id,
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
			if ($routeParams.type == 'tournament') $scope.type = 'Torneo';
			if ($routeParams.type == 'production') $scope.type = 'Producción';
			if ($routeParams.type == 'conference') $scope.type = 'Conferencia';
			$scope.getActivity();
		};

        $scope.ctr();
    }

    showActivityCtrl.$inject = ['$scope', '$rootScope', '$cookieStore', '$http', '$routeParams'];
    angular.module('FICOnWeb').controller('showActivityCtrl', showActivityCtrl);
}());