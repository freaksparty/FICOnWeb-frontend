var FICOnWeb = angular.module('FICOnWeb', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'textAngular', 'slick']);

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
	.when('/rules', {
		controller: 'rulesCtrl',
		templateUrl: 'assets/partials/rules.html'
        })
	.when('/admin/event/:id?', {
		controller:  'editeventCtrl',
		templateUrl: 'assets/partials/eventeditor.html'
	})
	.when('/activity/:type/:id' , {
		controller: 'showActivityCtrl',
		templateUrl: 'assets/partials/showActivity.html'
	})
	.when('/admin/news/add' , {
		controller: 'editorNewsCtrl',
		templateUrl: 'assets/partials/newseditor.html'
	})
	.when('/admin/news/:id', {
		controller: 'editorNewsCtrl',
		templateUrl: 'assets/partials/newseditor.html'
	})
	.when('/admin/news' , {
		controller: 'adminNewsCtrl',
		templateUrl: 'assets/partials/news.html'
	})
	.when('/admin/users' , {
		controller: 'usersCtrl',
		templateUrl: 'assets/partials/users.html'
	}).when('/admin/sponsors/add' , {
		controller: 'sponsoraddCtrl',
		templateUrl: 'assets/partials/sponsoradd.html'
	}).when('/admin/sponsors/' , {
		controller: 'sponsorCtrl',
		templateUrl: 'assets/partials/sponsor.html'
	}).when('/admin/activities/add' , {
		controller: 'activityaddCtrl',
		templateUrl: 'assets/partials/activityadd.html'
	})
	.when('/admin/activities' , {
		controller: 'activityCtrl',
		templateUrl: 'assets/partials/activity.html'
	})
	.when('/admin/registerEvent' , {
		controller: 'registerEventCtrl',
		templateUrl: 'assets/partials/registerEvent.html'
	})
	.when('/admin/emails', {
		controller: 'editorEmailTemplatesCtrl',
		templateUrl: 'assets/partials/emailTemplatesEditor.html'
	})
        .otherwise({
            redirectTo: '/home'
        });
});

FICOnWeb.run(['$rootScope', '$http', '$cookieStore', '$location', '$window', function ($rootScope, $http, $cookieStore, $location, $window) {
// 	$cookieStore.remove('FICOnCookie');
	$rootScope.vars = {};
	$rootScope.vars.logged = false;
	$rootScope.vars.userName = "";
	$rootScope.vars.roles = [];
	$rootScope.showEvent = {};
	$rootScope.event = {};
    
	$rootScope.config = {};
	$rootScope.config.apiUrl = 'http://localhost:8080';
	$rootScope.config.eventId = 1;
	
	var $eventId = $location.search().eventId;
	if($eventId) {
	    $rootScope.config.eventId = $eventId;
	    $cookieStore.put('FICOnEventId', $eventId);
	}
	if($cookieStore.get('FICOnEventId')) {
	    $rootScope.config.eventId = $cookieStore.get('FICOnEventId');
	}
	
	$rootScope.stateFilter = function (state) {
		switch (state) {
			case 'paid':
				return 'Confirmado';
			case 'registered':
				return 'Pendiente de pago';
			case 'inQueue':
				return 'En cola';
			default:
				return 'error';
		}
	}
	
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
    
// 	$rootScope.createAndMove = function() {
// 		$http.get($rootScope.config.apiUrl + '/api/session')
// 		.success(function(data, status, headers, config) {
// 			$cookieStore.put('FICOnCookie', data);
// 			$window.location.reload();
// 			$location.path("/home");
//             $rootScope.vars.validSession = true;
// 		}).error(function(data, status, headers, config) {
// 			console.log('error al crear sesion');
// 		});
// 	};
	
// 	$rootScope.isValidSession = function() {
//         $http({
//             url: $rootScope.config.apiUrl + '/api/session/isvalid',
// 			method: "GET",
// 			headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
// 		}).success(function (data, status, headers, config) {
// 			if (data == "false") {
// 				$rootScope.createAndMove();
// 			}
// 		}).error(function (data, status, headers, config) {
// 			$rootScope.createAndMove();
// 		});
// 	};
	
	$rootScope.redirectToLogin = function() {$location.path('/login');}
	
	$rootScope.pageRequiresLogin = function() {
		if($cookieStore.get('FICOnCookie')) {
			$rootScope.getUriErrHandler('/api/session/isvalid', function(data){
				if(data!=true)$rootScope.redirectToLogin();
			},$rootScope.redirectToLogin);
		} else {
			$rootScope.redirectToLogin();
		}
	}
	
	$rootScope.createSession = function() {
		this.getUri('/api/session', function(data, status, headers, config)
		{$cookieStore.put('FICOnCookie', data);});
	};
	
	$rootScope.pageRequiresSession = function() {
		if(!$cookieStore.get('FICOnCookie')) {
			$rootScope.createSession();
		}
	}
	
	$rootScope.checkRoles = function(roles) {
		roles.forEach(function(rol) {
			$rootScope.vars.roles.push(rol.roleName);
		});
	}	
	
	$rootScope.isLogged = function() {
		if ($cookieStore.get('FICOnCookie') && $cookieStore.get('FICOnCookie').userId > 0) {
			$rootScope.vars.logged = true;
			$rootScope.vars.userName = $cookieStore.get('FICOnCookie').loginName;
			$rootScope.checkRoles($cookieStore.get('FICOnCookie').roles);
		} else {
			$rootScope.vars.logged = false;
			$rootScope.vars.userName = "";
		}
	}
	$rootScope.colorState = function (state) {
		switch (state) {
			case 'paid':
				return '#2EFF00';
			case 'registered':
				return '#FFCC00';
			case 'inQueue':
				return '#FF0000';
			default:
				return 'error';
		}
	};	
	$rootScope.showButton = function () {
		if ($cookieStore.get('FICOnCookie')) {
			if ($cookieStore.get('FICOnCookie').userId > 0) {
				$http({
					url: $rootScope.config.apiUrl + '/api/registration/state/' + $rootScope.config.eventId + '/' + $cookieStore.get('FICOnCookie').userId,
					method: "GET",
					headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
				}).success(function (data, status, headers, config) {
					$rootScope.showEvent = data;
				}).error(function (data, status, headers, config) {
					console.log('error get');
				});
			}
		} else {
			console.log('Error showButton, no cookie.');
		}
	}
	
	$rootScope.registerOnEvent = function () {
		if ($cookieStore.get('FICOnCookie')) {
			$http({
				url: $rootScope.config.apiUrl + '/api/registration/' + $rootScope.config.eventId + '/' + $cookieStore.get('FICOnCookie').userId,
				method: "POST",
				headers: { "sessionId" :  $cookieStore.get('FICOnCookie').sessionId }
			}).success(function (data, status, headers, config) {
				$window.location.reload();
			}).error(function (data, status, headers, config) {
				if (data.exceptionCode == 14) $('#modalYoung').modal('toggle');
			});
		} else {
			console.log('Error registerOnEvent(), no cookie.');
		}
	}
	
	//función para comprobar la validez de las cookies en cada carga de página
// 	$rootScope.$on('$routeChangeSuccess', function () {
// 		$rootScope.showButton();
// 		if ($cookieStore.get('FICOnCookie')) {
// 			$rootScope.isValidSession();
// 			$rootScope.isLogged();
// 		} else {
// 			// $rootScope.createAndMove();
// 		};
// 	});

	$rootScope.$on('$routeChangeSuccess', function () {
		$rootScope.isLogged();
	});
	
	$rootScope.getSessionId = function () {
	    if(typeof $cookieStore.get('FICOnCookie') === 'undefined')
		return null;
	    else
		return $cookieStore.get('FICOnCookie').sessionId
	}
	
	//Peticiones compartidas entre varias páginas	
	$rootScope.getEventData = function ($scope) {
		this.getUri('/api/event/{eventId}', function (data) {$rootScope.event=$scope.event=data;});
	}
	
	$rootScope.getUri = function(uri, callback, errorhandler) {
		if(typeof errorhandler !== 'function') {
			errorhandler = function (data, status, headers, config) {
				console.log('Error rootScope.getUri('+uri+') ['+status+']: '+data);
			}
		}
		uri = $rootScope.config.apiUrl + uri.replace("{eventId}", $rootScope.config.eventId);
		$http({
			url: uri,
			method: "GET",
			cache: true,
			headers: { "sessionId" :  $rootScope.getSessionId() }
		}).success(callback).error(errorhandler);
	}
	
	$rootScope.postUri = function(uri, data, callback, errorhandler, verb) {
		if(typeof verb === 'undefined') verb = 'POST';
		if(typeof errorhandler === 'undefined') errorhandler = function(data, status) {
			console.log('Error rootScope.postUri('+uri+') '+verb+' ['+status+']: '+data);
		};
		uri = $rootScope.config.apiUrl + uri.replace("{eventId}", $rootScope.config.eventId);
		$http({url: uri,method:verb,data: data,headers:{"sessionId":$rootScope.getSessionId()}}).success(callback).error(errorhandler);
	}
	
}]);
