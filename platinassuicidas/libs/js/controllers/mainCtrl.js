/*******************************************
		Controller Main
*******************************************/
var mainCtrl = function ($location, $rootScope, $scope, authenticationAPI, genericAPI, syncAPI, $timeout) {

    var root = $rootScope;

    // window.location.reload(true); // forçando a atualização do cache

    root.usuario = ""; //startando variavel global usuario
    root.onLine = navigator.onLine;

    $scope.loader = 'libs/img/ajax_loader_blue.gif';

    $rootScope.startLoad = function () {
        document.getElementById('load').style.display = 'inline-block';
    };
    $rootScope.stopLoad = function () {
        document.getElementById('load').style.display = 'none';
    }

    // authenticationAPI.verificaSessao();
    authenticationAPI.sessionCtrl();

    if (root.usuario) {
        $rootScope.usuario.alias = $rootScope.usuario.email.substr(0, $rootScope.usuario.email.indexOf('@'));
    }

    // modal para aplicação
    $rootScope.modalGeneric = function (title, content) {
        $scope.myModal = {
            title: title,
            content: content
        };
        $('#myModal').modal({
            // backdrop: 'static'
        });
    };

    $rootScope.closeModalHref = function ( idmodal, href ) {
        $location.path('/'+href);
        $('#'+idmodal).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };

    function sincAllDB () {
        // se off-line ou navegador sem suport a indexedDB
        // console.log('Status de Internet navigator.onLine', root.onLine);
        if (!root.onLine || !indexedDBCtrl.support) return false;
        // chamando sync all da syncAPI
        syncAPI.syncAllDB();
    };

    $rootScope.verificaSenhaInicial = function () {
        // verifica se o usuário está online
        if (!root.onLine) return false;
        
        usuarioDAO.buscarPorId({id:root.usuario.idusuario}).then(resp => {
            if (resp.success) {
                let u = resp.data;
                if (u.sync !== 'SIM' ) {
                    alert('Verificamos que você ainda não atualizou a senha padrão, por segurança é necessário atualizá-la!');
                    window.location.replace('#/alterarsenha');
                }
            }
        });
    }

    if ( root.usuario ) {
        sincAllDB();
        $rootScope.verificaSenhaInicial();
    }
}

angular.module( 'cfp' )
	.controller( 'mainCtrl', mainCtrl );