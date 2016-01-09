(function () {
    var editorEmailTemplatesCtrl = function ($scope, $rootScope, $http, $cookieStore, $log, $location) {
        $scope.view = {};
	$scope.view.templates = {};
		
// 		$scope.save = function (templates) {
// 			$rootScope.postUri(
// 			if ($cookieStore.get('FICOnCookie')) {
// 				$http({
// 					url: $rootScope.config.apiUrl + '/api/event/news/' + $rootScope.config.eventId,
// 					method: "POST",
// 					data: { "title" : news.title, "imageurl" : news.image, "content" : news.content, "priorityHours" : 0, "publishDate": news.date },
// 					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
// 				}).success(function (data, status, headers, config) {
// 					$location.path("/home");
// 				}).error(function (data, status, headers, config) {
// 					console.log('noticia  no creada');
// 				});
// 			} else {
// 				console.log('error');
// 			}
// 		}

        $scope.ctr = function () {
		$rootScope.getUri(
			'/api/event/{eventId}/getEmailTemplates',
			function (data) {$scope.view.templates=data;});
	};

        $scope.ctr();
    }

    editorEmailTemplatesCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore', '$log', '$location'];
    angular.module('FICOnWeb').controller('editorEmailTemplatesCtrl', editorEmailTemplatesCtrl);
}());