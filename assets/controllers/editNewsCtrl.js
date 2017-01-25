(function () {
  var editorNewsCtrl = function ($scope, $rootScope, $http, $cookieStore, $log, $location, $routeParams) {
    $scope.view = {};
    $scope.view.news = {};
    $scope.view.news.image = "";
    $scope.view.news.title = "";
    $scope.view.news.date = "";
    $scope.view.news.content = "";
    $scope.view.date = new Date();
    $scope.view.publishNow = true;

    $scope.changeDate = function (date) {
        return moment(date).format('DD-MM-YYYY/HH:mm:ss'); 
    }

    $scope.update = function() {
        if(!$scope.view.date) {
            var d = new Date();
            $scope.view.date = d;
        }
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.dateOptions = {
            'formatYear': 'yyyy',
            'show-weeks': 'false',
            'startingDay': 1
    };

    $scope.format = 'dd-MM-yyyy';

    $scope.publish = function (news) {
        if (!$scope.view.publishNow) {
            news.date = $scope.changeDate($scope.view.date);
        } else {
            news.date = null;
        }
        
        $rootScope.postUri(
          $routeParams.id?'/api/news/'+$routeParams.id:'/api/event/news/{eventId}/',
          { "title" : news.title, "imageurl" : news.image, "content" : news.content, "priorityHours" : 0, "publishDate": news.date }, 
          function(){
              $location.path("/home");
          },
          function (data, status, headers, config) {
              console.log('Noticia  no guardada');
          },
          $routeParams.id?'PUT':'POST');
    }

    $scope.ctr = function () {
      if($routeParams.id) {
        $rootScope.getUri(
          '/api/news/' + $routeParams.id,
          function (data) {
            $scope.view.news = data;
            $scope.view.image=data.imageurl;
            $scope.view.date=moment(data.publishDate, 'DD-MM-YYYY/HH:mm:ss').toDate();
          });
        $scope.view.publishNow = false;
      }
      $scope.update();
    };

    $scope.ctr();
  }

  editorNewsCtrl.$inject = ['$scope', '$rootScope', '$http', '$cookieStore', '$log', '$location', '$routeParams'];
  angular.module('FICOnWeb').controller('editorNewsCtrl', editorNewsCtrl);
}());
