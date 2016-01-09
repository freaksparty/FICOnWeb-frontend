(function () {
    var editorEmailTemplatesCtrl = function ($scope, $rootScope, $log) {
        $scope.view = {};
	$scope.view.templates = {};
		
	$scope.send = function (template) {
		var object = {};
		var idTemplate;
		switch(template) {
			case 'confirmed':
				object.asunto = $scope.view.templates.subjectSpotConfirmed;
				object.contenido = $scope.view.templates.contentSpotConfirmed;
				idTemplate = $scope.view.templates.idSpotConfirmed;
				break;
			case 'pendingDirect':
				object.asunto = $scope.view.templates.subjectPendingConfirmationDirect;
				object.contenido = $scope.view.templates.contentPendingConfirmationDirect;
				idTemplate = $scope.view.templates.idPendingConfirmationDirect;
				break;
			case 'queue':
				object.asunto = $scope.view.templates.subjectOnQueue;
				object.contenido = $scope.view.templates.contentOnQueue;
				idTemplate = $scope.view.templates.idOnQueue;
				break;
			case 'pendingFromQueue':
				object.asunto = $scope.view.templates.subjectPendingConfirmationFromQueue;
				object.contenido = $scope.view.templates.contentPendingConfirmationFromQueue;
				idTemplate = $scope.view.templates.idPendingConfirmationFromQueue;
				break;
			case 'expired':
				object.asunto = $scope.view.templates.subjectConfirmationPeriodExpired;
				object.contenido = $scope.view.templates.contentConfirmationPeriodExpired;
				idTemplate = $scope.view.templates.idConfirmationPeriodExpired;
				break;
		}
		$rootScope.postUri('/api/emailTemplate/'+idTemplate, object,
				function (data) {/*TODO*/}, undefined, 'PUT');
	}

        $scope.ctr = function () {
		$rootScope.getUri(
			'/api/event/{eventId}/getEmailTemplates',
			function (data) {$scope.view.templates=data;});
	};

        $scope.ctr();
    }

    editorEmailTemplatesCtrl.$inject = ['$scope', '$rootScope', '$log'];
    angular.module('FICOnWeb').controller('editorEmailTemplatesCtrl', editorEmailTemplatesCtrl);
}());