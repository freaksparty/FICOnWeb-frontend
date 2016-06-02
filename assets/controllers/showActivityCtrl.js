(function () {
    var showActivityCtrl = function ($scope, $rootScope, $cookieStore, $http, $routeParams) {
		$scope.data = {};
		$scope.type = '';
		
		$scope.getActivity = function() {
		    $rootScope.getUri('/api/activity/' + $routeParams.id,
				    function (data, status, headers, config) {$scope.data = data;});
		}
		
        $scope.ctr = function () {	
			if ($routeParams.type == 'workshop') $scope.type = 'Taller';
			if ($routeParams.type == 'conference') $scope.type = 'Conferencia';
			$scope.getActivity();
		};

        $scope.ctr();
    }

    showActivityCtrl.$inject = ['$scope', '$rootScope', '$cookieStore', '$http', '$routeParams'];
    angular.module('FICOnWeb').controller('showActivityCtrl', showActivityCtrl);
}());