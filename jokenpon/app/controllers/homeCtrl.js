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
                    jogada: null,
                    pontos: 0,
                    adversarios: []
                },
                {
                    index: 2,
                    nome: 'Maquina 2',
                    moeda: 5,
                    player: false,
                    jogada: null,
                    pontos: 0,
                    adversarios: []
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
            jogada: null,
            pontos: 0,
            adversarios: []
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
                // calculando as moedas
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
    $scope.rodada = [
        {
            index: 0,
            jogador1: {
                index:'',
                nome: '',
                pontos: ''
            },
            jogador2: {
                index: '',
                nome: '',
                pontos: ''
            }
        }
    ];
    function rodada () {
        $scope.rodada = [];
        var jogadores = [];
        
        // repetir 2 vezes
        // montando uma lista de jogadores duplicados
        // a lista irá ser usada para monta a tabela de versos
        var i=0;
        while (i < 2) {
            // laço de jogadores
            var index = 0;
            for (j of $scope.jogo.jogadores) {
                // se o jogador tem moedas
                if (j.moeda>0) {
                    jogadores.push({
                        index: index,
                        indexjodador: j.index, 
                        nome: j.nome,
                        jogada: j.jogada,
                        usado: false
                    });       
                }
                index++;
            }
            i++;
        }

        // lista de rodadas possíveis
        for (r=0; r<jogadores.length/2; r++) {
            // a lista de jogadores duplicados
            for (j of jogadores) {
                // se nessa posição a rodada não existir
                if ($scope.rodada[r] == undefined) {
                    // e se o jogador ainda não foi usado
                    if (j.usado === undefined || j.usado === false) {
                        // criamos a rodada e adicioanamos o dado do jogador como jogador1
                        $scope.rodada.push({
                            jogador1: {
                                index: j.index,
                                nome: j.nome,
                                jogada: j.jogada,
                                pontos: ''
                            },
                            jogador2: {
                                index: '',
                                nome: '',
                                jogada: '',
                                pontos: ''
                            }
                        });
                        // setamos que esse jogador já foi usado
                        j.usado = true;
                    }
                }else{
                    // caso a rodada já exista nessa posição verificamos se o jogador 2 está vazio
                    if ($scope.rodada[r].jogador2.index === '') {
                        // se o jogador da lista ainda não foir usado
                        if (j.usado === undefined || j.usado === false) {
                            // então adicionamos como jogador 2 na rodada
                            $scope.rodada[r].jogador2.index = j.index;
                            $scope.rodada[r].jogador2.nome = j.nome;
                            $scope.rodada[r].jogador2.jogada = j.jogada;
                            // calculamos os pontos do jogador
                            $scope.rodada[r].jogador2.pontos = jokenpo(j.jogada, $scope.rodada[r].jogador1.jogada).pontos;
                            // calculamos a quantidade de moedas do jogador depois na rodada
                            // $scope.jodaores[j.indexjodador].moeda += +($scope.rodada[r].jogador2.pontos);

                            // e agora com a informação de pontos do jogador 2 calculamos os pontos do jogador 1
                            $scope.rodada[r].jogador1.pontos = jokenpo($scope.rodada[r].jogador1.jogada, j.jogada).pontos;
                            // calculamos a quantidade de moedas do jogador depois na rodada
                            // $scope.jodaores[$scope.rodada[r].jogador1.indexjodador].moeda += +($scope.rodada[r].jogador1.pontos);
                            j.usado = true;
                        }
                    }
                }
            }
        }

        console.log($scope.rodada);
        
        // if ($scope.jogo.jogadores[0].moeda>0) {
        //     // rodada 1 - jogador 1 vs 2
        //     $scope.rodada.push({
        //         jogador1: {
        //             nome: $scope.jogo.jogadores[0].nome,
        //             jogada: $scope.jogo.jogadores[0].jogada,
        //             resutado: jokenpo($scope.jogo.jogadores[0].jogada, $scope.jogo.jogadores[1].jogada).resultado,
        //             pontos: jokenpo($scope.jogo.jogadores[0].jogada, $scope.jogo.jogadores[1].jogada).pontos
        //         },
        //         jogador2: {
        //             nome: $scope.jogo.jogadores[1].nome,
        //             jogada: $scope.jogo.jogadores[1].jogada,
        //             resutado: jokenpo($scope.jogo.jogadores[1].jogada, $scope.jogo.jogadores[0].jogada).resultado,
        //             pontos: jokenpo($scope.jogo.jogadores[1].jogada, $scope.jogo.jogadores[0].jogada).pontos
        //         }
        //     });

        //     // rodada 1 - jogador 1 - 2
        //     $scope.jogo.jogadores[0].moeda += +($scope.rodada[0].jogador1.pontos);
        //     $scope.jogo.jogadores[1].moeda += +($scope.rodada[0].jogador2.pontos);
        // }

        // if ($scope.jogo.jogadores[1].moeda>0) {
        //     // rodada 1 - jogador 1 vs 3
        //     $scope.rodada.push({
        //         jogador1: {
        //             nome: $scope.jogo.jogadores[0].nome,
        //             jogada: $scope.jogo.jogadores[0].jogada,
        //             resutado: jokenpo($scope.jogo.jogadores[0].jogada, $scope.jogo.jogadores[2].jogada).resultado,
        //             pontos: jokenpo($scope.jogo.jogadores[0].jogada, $scope.jogo.jogadores[2].jogada).pontos
        //         },
        //         jogador2: {
        //             nome: $scope.jogo.jogadores[2].nome,
        //             jogada: $scope.jogo.jogadores[2].jogada,
        //             resutado: jokenpo($scope.jogo.jogadores[2].jogada, $scope.jogo.jogadores[0].jogada).resultado,
        //             pontos: jokenpo($scope.jogo.jogadores[2].jogada, $scope.jogo.jogadores[0].jogada).pontos
        //         }
        //     });

        //     // rodada 2 - jogador 1 - 3
        //     $scope.jogo.jogadores[0].moeda += +($scope.rodada[1].jogador1.pontos);
        //     $scope.jogo.jogadores[2].moeda += +($scope.rodada[1].jogador2.pontos);
        // }

        // if ($scope.jogo.jogadores[2].moeda>0) {
        //     // rodada 3 - jogador 2 - 3
        //     $scope.rodada.push({
        //         jogador1: {
        //             nome: $scope.jogo.jogadores[1].nome,
        //             jogada: $scope.jogo.jogadores[1].jogada,
        //             resutado: jokenpo($scope.jogo.jogadores[1].jogada, $scope.jogo.jogadores[2].jogada).resultado,
        //             pontos: jokenpo($scope.jogo.jogadores[1].jogada, $scope.jogo.jogadores[2].jogada).pontos
        //         },
        //         jogador2: {
        //             nome: $scope.jogo.jogadores[2].nome,
        //             jogada: $scope.jogo.jogadores[2].jogada,
        //             resutado: jokenpo($scope.jogo.jogadores[2].jogada, $scope.jogo.jogadores[1].jogada).resultado,
        //             pontos: jokenpo($scope.jogo.jogadores[2].jogada, $scope.jogo.jogadores[1].jogada).pontos
        //         }
        //     });

        //     // rodada 3 - jogador 2 - 3
        //     $scope.jogo.jogadores[1].moeda += +($scope.rodada[2].jogador1.pontos);
        //     $scope.jogo.jogadores[2].moeda += +($scope.rodada[2].jogador2.pontos);
        // }
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