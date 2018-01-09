/*******************************************
		Controller Main
*******************************************/
var mainCtrl = function ($location, $rootScope, authenticationAPI) {

    var root = $rootScope;

    root.usuario = ""; //startando variavel global usuario

    // authenticationAPI.verificaSessao();
    authenticationAPI.sessionCtrl();

}

angular.module( 'cfp' )
	.controller( 'mainCtrl', mainCtrl );