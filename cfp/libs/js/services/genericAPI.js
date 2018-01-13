// service
(function () {

    "use strict"

    angular.module('cfp').service("genericAPI", function ( $http, $rootScope ) {
        function _generic (data, scope) {
            return $http({
                method: 'POST',
                url: api + "src/rest/" + data.class + ".php",
                dataType: 'jsonp',
                data: {
                    metodo: data.metodo,
                    data: data.data,
                    usuario: $rootScope.usuario
                }
            });
        };

        return {
            generic: _generic
        };
    });

})();
