(function () {
    var newsaddCtrl = function ($scope, $rootScope, $http, $cookieStore, $log, $location) {
        $scope.view = {};
		$scope.view.news = {};
		$scope.view.news.image = "";
		$scope.view.news.title = "";
		$scope.view.news.date = "";
		$scope.view.news.content = "";
		$scope.view.date = "";
		$scope.view.publishNow = true;
		
		$scope.changeDate = function (date) {
			return moment(date).format('DD-MM-YYYY/HH:mm:ss'); 
		}
		
		$scope.update = function() {
			var d = new Date();
			$scope.view.date = d;
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
		
		$scope.publish = function (news) {	
			if (!$scope.view.publishNow) {
				news.date = $scope.changeDate($scope.view.date);
				console.log(news.date);
			} else {
				news.date = null;
				console.log(news.date);
			}
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/news/' + $rootScope.config.eventId,
					method: "POST",
					data: { "title" : news.title, "imageurl" : news.image, "content" : news.content, "priorityHours" : 0, "publishDate": news.date },
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$location.path("/home");
				}).error(function (data, status, headers, config) {
					console.log('noticia  no creada');
				});
			} else {
				console.log('error');
			}
		}

        $scope.ctr = function () {
			$scope.update();
		};

        $scope.ctr();
    }

    newsaddCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore', '$log', '$location'];
    angular.module('FICOnWeb').controller('newsaddCtrl', newsaddCtrl);
}());