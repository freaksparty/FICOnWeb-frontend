var FICOnWeb = angular.module('FICOnWeb', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'textAngular']);

FICOnWeb.config(function ($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
});

FICOnWeb.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
			controller: 'homeCtrl',
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
		.when('/profile', {
			controller: 'profileCtrl',
            templateUrl: 'assets/partials/profile.html'
        })
		.when('/admin/news/add' , {
			controller: 'newsaddCtrl',
			templateUrl: 'assets/partials/newsadd.html'
		})
        .otherwise({
            redirectTo: '/home'
        });
});

FICOnWeb.run(['$rootScope', '$http', '$cookieStore', '$location', '$window', function ($rootScope, $http, $cookieStore, $location, $window) {
	$rootScope.vars = {};
	$rootScope.vars.logged = false;
	$rootScope.vars.userName = "";
	$rootScope.vars.roles = [];
    
    $rootScope.config = {};
    $rootScope.config.apiUrl = 'http://localhost:8080';
	
	$rootScope.isNumber = function (number) {
		if (isNaN(number)) {
			return false;
		} else {
			return true;
		}
	};
	
	$rootScope.validatePassword = function (pass, pass2) {
		if ((pass != "") && (pass2 != "")) {
			if (pass == pass2) {
				return true;
			} else {
				return false;
			}
		} else return false;
	}

	$rootScope.createSession = function() {
		$http.get($rootScope.config.apiUrl + '/api/session')
		.success(function(data, status, headers, config) {
			$cookieStore.put('FICOnCookie', data);
			$window.location.reload();
			$location.path("/home");
		}).error(function(data, status, headers, config) {
			console.log('error al crear sesion');
		});
	};
	
	$rootScope.isValidSession = function() {
		$http({
			url: $rootScope.config.apiUrl + '/api/session/isvalid',
			method: "GET",
			headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
		}).success(function (data, status, headers, config) {
			if (data == "false") {
				$rootScope.createSession();
			}
		}).error(function (data, status, headers, config) {
			$rootScope.createSession();
		});
	};
	
	$rootScope.checkRoles = function(roles) {
		roles.forEach(function(rol) {
			$rootScope.vars.roles.push(rol.roleName);
		});
	}	
	
	$rootScope.isLogged = function() {
		if ($cookieStore.get('FICOnCookie').userId > 0) {
			$rootScope.vars.logged = true;
			$rootScope.vars.userName = $cookieStore.get('FICOnCookie').loginName;
			$rootScope.checkRoles($cookieStore.get('FICOnCookie').roles);
		} else {
			$rootScope.vars.logged = false;
			$rootScope.vars.userName = "";
		}
	}
	
	//función para comprobar la validez de las cookies en cada carga de página
	$rootScope.$on('$routeChangeSuccess', function () {
		if ($cookieStore.get('FICOnCookie')) {
			$rootScope.isValidSession();
			$rootScope.isLogged();
		} else {
			$rootScope.createSession();
		};
	});
	
}]);