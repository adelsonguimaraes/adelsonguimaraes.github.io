angular.module(module).controller('homeCtrl', function ($rootScope, $scope, authenticationAPI, genericAPI, $location, SweetAlert, $uibModal, $timeout, $interval) {
    //Verifica Sessao e permissão de acesso
    // if (!$rootScope.usuario) { $location.path("/login"); return false; }

    function reset () {
        $scope.view = 1; // a tela atual que o jogo se encontra
        $scope.jogo = {
            tempo: 30,
            jogadores: [
                {
                    index: 1,
                    nome: 'Maquina 1',
                    moeda: 5,
                    player: false,
                    jogada: null
                },
                {
                    index: 2,
                    nome: 'Maquina 2',
                    moeda: 5,
                    player: false,
                    jogada: null
                }
            ]
        }
        $scope.jogador = null;
    }
    reset();

    $scope.entrar = function (obj) {
        $scope.jogador = {
            index: $scope.jogo.jogadores.length, 
            nome: obj.nome,
            moeda: 5,
            player: true,
            jogada: null
        };
        $scope.jogo.jogadores.push($scope.jogador);
        if ($scope.jogador!==null) $scope.view = 2;
        // tempo();
    }

    var t;
    // contador do tempo
    function tempo () {
        $scope.jogo.tempo = 30;
        t = $interval(function () {
            $scope.jogo.tempo--;
            if ($scope.jogo.tempo<=0) {
                $interval.cancel(t);
                forcandoJogada();
            }
        }, 1000);
    };

    var tr;
    // contador do tempo
    function tempoReinicio () {
        $scope.jogo.tempo = 15;
        tr = $interval(function () {
            $scope.jogo.tempo--;
            if ($scope.jogo.tempo<=0) {
                $interval.cancel(tr);
                $scope.view = 2;
                tempo(); // chamando o contador de tempo para a jogada
            }
        }, 1000);
    };

    // butão de jogada que o player usa para escolher a jogada
    $scope.btn = null;
    $scope.setButton = function (b) {
        $scope.btn = b;
    }

    // função qunado o próprio jogador clica no botão de jogar
    $scope.jogando = function () {
        var index = $scope.jogador.index;
        $scope.jogo.jogadores[index].jogada = $scope.btn;
        $interval.cancel(t);
        maquinasJogando();
        console.log("JOGADA PLAYER", $scope.jogo.jogadores);
        $scope.view = 3;
        rodada();
        tempoReinicio(); // conta o tempo para reiniciar as jogadas
    }

    // função que força jogada do player quando o tempo de jogada acaba
    function forcandoJogada () {
        var index = $scope.jogador.index;
        // caso acabe o tempo e a jogado do jogador ainda não estiver pronta o jogo força
        if ($scope.jogo.jogadores[index].jogada == null) {
            $scope.jogo.jogadores[index].jogada = randomPlay();
        }
        $interval.cancel(t);
        maquinasJogando();
        console.log("JOGADA FORÇADA", $scope.jogo.jogadores);
        $scope.view = 3;
        rodada();
        tempoReinicio(); // conta o tempo para reiniciar as jogadas
    }

    function randomPlay () {
        var j = null;
        while(j == null ) {
            var r = Math.floor(Math.random() * 20);
            if (r==0) j = 'pedra';
            if (r==1) j = 'papel';
            if (r==2) j = 'tesoura';
        }
        return j;
    }

    // função que simula a jogada das maquinas
    function maquinasJogando () {
        for (f of $scope.jogo.jogadores) {
            if (!f.player) {
                f.jogada = randomPlay();
            }
        }
    }

    // function que alimenta a rodada onde guarda as informações de quem perdeu e quem perdeu, ganhou, empatou e pontos
    $scope.rodada = [];
    function rodada () {
        $scope.rodada = [{
            jogador1: {
                nome: $scope.jogo.jogadores[0].nome,
                jogada: $scope.jogo.jogadores[0].jogada,
                resutado: jokenpo($scope.jogo.jogadores[0].jogada, $scope.jogo.jogadores[1].jogada).resultado,
                pontos: jokenpo($scope.jogo.jogadores[0].jogada, $scope.jogo.jogadores[1].jogada).pontos
            },
            jogador2: {
                nome: $scope.jogo.jogadores[1].nome,
                jogada: $scope.jogo.jogadores[1].jogada,
                resutado: jokenpo($scope.jogo.jogadores[1].jogada, $scope.jogo.jogadores[0].jogada).resultado,
                pontos: jokenpo($scope.jogo.jogadores[1].jogada, $scope.jogo.jogadores[0].jogada).pontos
            }
        },{
            jogador1: {
                nome: $scope.jogo.jogadores[0].nome,
                jogada: $scope.jogo.jogadores[0].jogada,
                resutado: jokenpo($scope.jogo.jogadores[0].jogada, $scope.jogo.jogadores[2].jogada).resultado,
                pontos: jokenpo($scope.jogo.jogadores[0].jogada, $scope.jogo.jogadores[2].jogada).pontos
            },
            jogador2: {
                nome: $scope.jogo.jogadores[2].nome,
                jogada: $scope.jogo.jogadores[2].jogada,
                resutado: jokenpo($scope.jogo.jogadores[2].jogada, $scope.jogo.jogadores[0].jogada).resultado,
                pontos: jokenpo($scope.jogo.jogadores[2].jogada, $scope.jogo.jogadores[0].jogada).pontos
            }
        },{
            jogador1: {
                nome: $scope.jogo.jogadores[1].nome,
                jogada: $scope.jogo.jogadores[1].jogada,
                resutado: jokenpo($scope.jogo.jogadores[1].jogada, $scope.jogo.jogadores[2].jogada).resultado,
                pontos: jokenpo($scope.jogo.jogadores[1].jogada, $scope.jogo.jogadores[2].jogada).pontos
            },
            jogador2: {
                nome: $scope.jogo.jogadores[2].nome,
                jogada: $scope.jogo.jogadores[2].jogada,
                resutado: jokenpo($scope.jogo.jogadores[2].jogada, $scope.jogo.jogadores[1].jogada).resultado,
                pontos: jokenpo($scope.jogo.jogadores[2].jogada, $scope.jogo.jogadores[1].jogada).pontos
            }
        }];
    }

    // função que trata a lógica de jokenpó entre dois jogadores
    function jokenpo (a, b) {
        var r = {resultado: null, pontos: null};
        // pedra
        if (a=='pedra' && b=='pedra') r = {resultado: 'empate', pontos: '-1'};
        if (a=='pedra' && b=='papel') r = {resultado: 'perdeu', pontos: '-2'};
        if (a=='pedra' && b=='tesoura') r = {resultado: 'venceu', pontos: '+1'};
        // papel
        if (a=='papel' && b=='pedra') r = {resultado: 'venceu', pontos: '+1'};
        if (a=='papel' && b=='papel') r = {resultado: 'empate', pontos: '-1'};
        if (a=='papel' && b=='tesoura') r = {resultado: 'venceu', pontos: '-2'};
        // tesoura
        if (a=='tesoura' && b=='pedra') r = {resultado: 'perdeu', pontos: '-2'};
        if (a=='tesoura' && b=='papel') r = {resultado: 'venceu', pontos: '+1'};
        if (a=='tesoura' && b=='tesoura') r = {resultado: 'empate', pontos: '-1'};
        return r;
    }

});