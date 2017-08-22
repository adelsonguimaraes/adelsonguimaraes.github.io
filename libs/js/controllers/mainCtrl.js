(function () {
    angular.module('sw').controller('mainCtrl', function ( $scope, $rootScope ) {

        // testa conexão
        $scope.online = window.navigator.onLine;

        $scope.gibis = [
            {
                id: 1,
                titulo: 'Turma da Mônica',
                descricao: 'As aventuras de cebolinha o luivo',
                valor: 3.50
            },
            {
                id: 2,
                titulo: 'Star Wars',
                descricao: 'O império contra-ataca',
                valor: 8.30
            },
            {
                id: 3,
                titulo: 'O Rei Leão',
                descricao: 'Um reino perdido',
                valor: 4.50
            },
            {
                id: 4,
                titulo: 'Pinóquio',
                descricao: 'A lenda da baleia',
                valor: 10.00
            },
            {
                id: 5,
                titulo: 'Mickey e Donald',
                descricao: 'A fantástica máquina do tempo',
                valor: 5.90
            },
            {
                id: 6,
                titulo: 'Pateta e Max',
                descricao: 'Embalos de sábado a tarde',
                valor: 3.50
            }
        ]

    });
})();