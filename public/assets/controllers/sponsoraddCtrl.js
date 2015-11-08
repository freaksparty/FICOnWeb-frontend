(function () {
    var sponsoraddCtrl = function ($scope, $rootScope, $http, $cookieStore, $log, $location) {
        $scope.view = {};
		$scope.view.sponsor = {};
		$scope.view.sponsor.imageurl = "";
		$scope.view.sponsor.name = "";
		$scope.view.sponsor.url = "";
				
		$scope.publish = function (sponsor) {	
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/sponsor/1',
					method: "POST",
					data: { "name" : sponsor.name, "imageurl" : sponsor.imageurl, "url" : sponsor.url },
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$location.path("/home");
				}).error(function (data, status, headers, config) {
					console.log('sponsor no creado');
				});
			} else {
				console.log('error');
			}
		}

        $scope.ctr = function () {
		};

        $scope.ctr();
    }

    sponsoraddCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore', '$log', '$location'];
    angular.module('FICOnWeb').controller('sponsoraddCtrl', sponsoraddCtrl);
}());