var contasemabertoCtrl = function ($scope, $rootScope, $location, genericAPI) {
    if ( !$rootScope.usuario ) {
        $location.path('/login');
        return false;
    }

    $scope.contas = [];

    contaDAO.listarContasAtivasPorUsuario($rootScope.usuario.idusuario).then(response => {
        if ( response.success ) {
            $scope.contas = response.data;
        }
    });
};

angular
    .module('cfp')
    .controller('contasemabertoCtrl', contasemabertoCtrl);