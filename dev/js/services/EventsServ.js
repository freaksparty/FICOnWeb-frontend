FICONLAN.factory("EventServ", ["$http", "BaseAPIServ", function ($http, BaseAPIServ) {
    var EVENT_URL, CREATE_URL, MODIFY_URL, SEARCH_URL;

    EVENT_URL = "/event";

    CREATE_URL = EVENT_URL  + "/create";
    MODIFY_URL = EVENT_URL  + "/changeData";
    SEARCH_URL = SEARCH_URL + "/byName";

    return {
        create : BaseAPIServ.post(CREATE_URL),
        modify : BaseAPIServ.post(MODIFY_URL)
    };
}]);