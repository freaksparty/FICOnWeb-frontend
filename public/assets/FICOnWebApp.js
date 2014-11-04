var FICOnWeb = angular.module('FICOnWeb', ['ngRoute', 'ngCookies']);

FICOnWeb.config(function ($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
});



FICOnWeb.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'assets/partials/home.html'
        })
        .when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'assets/partials/login.html'
        })
		.when('/register', {
			controller: 'registerCtrl',
            templateUrl: 'assets/partials/register.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

FICOnWeb.run(['$rootScope', '$http', '$cookieStore', function ($rootScope, $http, $cookieStore) {
	$rootScope.createSession = function() {
		$http.get('http://ficonlan.es:81/api/session')
		.success(function(data, status, headers, config) {
			$cookieStore.put('FICOnCookie', data);
		}).error(function(data, status, headers, config) {
			console.log('error al crear sesion');
		});
	}
}]);