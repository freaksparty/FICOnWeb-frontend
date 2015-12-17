(function () {
    var editeventCtrl = function ($scope, $rootScope, $routeParams, $http, $cookieStore, $log, $location) {
	$scope.view = {};
	$scope.view.event = {};
	$scope.view.event.name = "";
	$scope.view.event.description = "";
	$scope.view.event.normas = "";
	$scope.view.event.registrationOpenDate = "";
	
	$scope.changeDate = function (date) {
		return moment(date).format('DD-MM-YYYY/HH:mm:ss'); 
	}
	
	$scope.update = function() {
		if(!$scope.view.event.registrationOpenDate) {
		    var d = new Date();
		    $scope.view.event.registrationOpenDate = d;
		}
	};
	
	$scope.openInscriptionStart = function($ev) {
		$ev.preventDefault();$ev.stopPropagation();$scope.openedInscriptionStart=true;
	};
	
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yyyy',
		'show-weeks': 'false',
		startingDay: 1
	};

	$scope.format = 'dd-MM-yyyy';
	
	$scope.send = function (event) {
		if($routeParams.id) {
			$rootScope.postUri('/api/event/'+$routeParams.id, $scope.view.event, function(){$location.path("/home");}, undefined, 'PUT');
		} else {
			$rootScope.postUri('/api/event', $scope.view.event, function(){$location.path("/home");});
		}
	}

        $scope.ctr = function () {
			if($routeParams.id) {
				$rootScope.getUri('/api/event/{eventId}', function(data) {
					$scope.view.event.name = data.name;
					$scope.view.event.normas = data.rules;
					$scope.view.event.description = data.description;
					//$scope.view.event.registrationOpenDate = data.openInscriptionDate;
					$scope.view.event.registrationOpenDate = null;
					$scope.update();
				});
			} else {
				$scope.update();
			}
		};

        $scope.ctr();
    }

    editeventCtrl.$inject = ['$scope', '$rootScope', '$routeParams', '$http', '$cookieStore', '$log', '$location'];
    angular.module('FICOnWeb').controller('editeventCtrl', editeventCtrl);
}());