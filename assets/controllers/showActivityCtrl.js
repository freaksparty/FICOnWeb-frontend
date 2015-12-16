(function () {
    var showActivityCtrl = function ($scope, $rootScope, $cookieStore, $http, $routeParams) {
		$scope.data = {};
		$scope.type = '';
		
		$scope.getActivity = function() {
		    $rootScope.getUri('/api/activity/{eventId}',
				    function (data, status, headers, config) {$scope.data = data;});
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