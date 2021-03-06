(function () {
    var editeventCtrl = function ($scope, $rootScope, $routeParams, $http, $cookieStore, $log, $location) {
	$scope.view = {};
	$scope.view.event = {};
	$scope.view.event.name = "";
	$scope.view.event.price = "0";
	$scope.view.event.description = "";
	$scope.view.event.normas = "";
	$scope.view.event.registrationOpenDate;
	$scope.view.event.registrationCloseDate;
	$scope.view.registrationOpenDate;
	$scope.view.registrationCloseDate;
	
	$scope.changeDate = function (date) {
		return moment(date).format('DD-MM-YYYY/HH:mm:ss'); 
	}
	
	$scope.update = function() {
		if(!$scope.view.registrationOpenDate) {
		    $scope.view.registrationOpenDate = new Date();
		}
		if(!$scope.view.registrationCloseDate) {
		    $scope.view.registrationCloseDate = new Date();
		}
	};
	
	$scope.openInscriptionStart = function($ev) {$ev.preventDefault();$ev.stopPropagation();$scope.openedInscriptionStart=true;};
	$scope.openInscriptionEnd = function($ev) {$ev.preventDefault();$ev.stopPropagation();$scope.openedInscriptionClose=true;};
	
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
		$scope.view.event.registrationOpenDate = $scope.changeDate($scope.view.registrationOpenDate);
		$scope.view.event.registrationCloseDate = $scope.changeDate($scope.view.registrationCloseDate);
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
				$scope.view.event.price = data.price;
				$scope.view.event.description = data.description;
				$scope.view.event.registrationOpenDate = data.openInscriptionDate;
				$scope.view.registrationOpenDate = moment(data.openInscriptionDate, 'DD-MM-YYYY/HH:mm:ss').toDate();
				$scope.view.registrationCloseDate = moment(data.closeInscriptionDate, 'DD-MM-YYYY/HH:mm:ss').toDate();
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