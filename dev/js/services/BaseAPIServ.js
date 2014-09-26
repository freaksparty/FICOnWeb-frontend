FICONLAN.factory("BaseAPIServ", ["$http", "API_URI_BASE", function ($http, API_URI_BASE) {
    
    var getBaseService = function(method, url) {
        return function (data, success, error) {
            $http[method](API_URI_BASE + url).success(function (res, status, headers, config) {
                success(status, data);
            }).error(function (res, status, headers, config) {
                error(status, data);
            });
        }
    };

    return {
        get  : function (url) { return getBaseService("GET", url); },
        post : function (url) { return getBaseService("POST", url); }      
    };
    
}]);