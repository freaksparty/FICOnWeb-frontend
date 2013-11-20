var appFICOnLan = angular.module("appFICOnLan", ['ngRoute']);

appFICOnLan.config(function ($routeProvider) {
    $routeProvider.when('/',
        {
            templateUrl: "partials/index/index.html"
        }
     );
});
