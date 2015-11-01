(function () {
    var newsaddCtrl = function ($scope, $rootScope, $http, $cookieStore) {
        $scope.view = {};
		$scope.view.news = {};
		$scope.view.news.image = "";
		$scope.view.news.title = "";
		$scope.view.news.date = "";
		$scope.view.news.content = "";
		
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
			if ($cookieStore.get('FICOnCookie')) {
				$http({
					url: $rootScope.config.apiUrl + '/api/event/news/1',
					method: "POST",
					data: { "title" : news.title, "imageurl" : news.image, "content" : news.content, "priorityHours" : 0 },
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					console.log('noticia creada');
				}).error(function (data, status, headers, config) {
					console.log('noticia  no creada');
				});
			} else {
				console.log('error');
			}
		}

        $scope.ctr = function () {
		};

        $scope.ctr();
    }

    newsaddCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore'];
    angular.module('FICOnWeb').controller('newsaddCtrl', newsaddCtrl);
}());