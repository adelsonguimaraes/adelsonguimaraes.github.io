angular.module(module).controller('homeCtrl', function ($rootScope, $scope, authenticationAPI, genericAPI, $location, SweetAlert, $uibModal, $timeout, $interval) {
    //Verifica Sessao e permissão de acesso
    // if (!$rootScope.usuario) { $location.path("/login"); return false; }

    function reset () {
        $scope.view = 1; // a tela atual que o jogo se encontra | 1. Inicial | 2. Escolha de Jogada | 3. Rodada | 4. Vencedor
        $scope.countRodada = 0;
        $scope.obj = {
            nome: ''
        };
        $scope.jogo = {
            tempo: 30,
            jogadores: [
                {
                    index: 0,
                    nome: 'Bot 1',
                    moeda: 5,
                    player: false,
                    jogada: null,
                    pontos: 0,
                    adversarios: []
                },
                {
                    index: 1,
                    nome: 'Bot 2',
                    moeda: 5,
                    player: false,
                    jogada: null,
                    pontos: 0,
                    adversarios: []
                }
            ]
        }
        $scope.jogador = JSON.parse(localStorage.getItem('jogador'));
        if ($scope.jogador!==null) $scope.obj.nome = $scope.jogador.nome;
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
        if ($scope.jogador!==null) {
            $scope.view = 2;
            localStorage.setItem('jogador', JSON.stringify($scope.jogador));
        }
        tempo();
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
                // verificando se já temos um campeão
                var commoeda = [];
                for (j of $scope.jogo.jogadores) {
                    // FIM DO JOGO VENCEDOR
                    if (j.moeda>0) commoeda.push(j);
                }
                // se existir apenas um jogador com moedas
                if (commoeda.length==1) {
                    $scope.vencedor = commoeda[0];
                    $scope.view = 4;
                    $interval.cancel(tr);
                // caso ninguém tenha mais moedas
                }else if (commoeda.length<=0) {
                    $interval.cancel(tr);
                    $scope.view=5;
                // caso não seguimos com a play
                }else{
                    $interval.cancel(tr);
                    $scope.view = 2;
                    tempo(); // chamando o contador de tempo para a jogada
                    $scope.btn = null;
                }
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
        // console.log("JOGADA PLAYER", $scope.jogo.jogadores);
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
        // console.log("JOGADA FORÇADA", $scope.jogo.jogadores);
        $scope.view = 3;
        rodada();
        tempoReinicio(); // conta o tempo para reiniciar as jogadas
    }

    // função que simula jogada
    function randomPlay () {
        var j = null;
        // até que j != de null
        while(j == null ) {
            // getando um número aleatório entre 0 e 20
            var r = Math.floor(Math.random() * 20);
            if (r==0) j = 'pedra'; // se o numero for igual a 0 jogada será pedra
            if (r==1) j = 'papel'; // se o numero for igual a 1 jogada será papel
            if (r==2) j = 'tesoura'; // se o numero for igual a 2 jogada será tesoura
        }
        return j;
    }

    // função que simula a jogada das maquinas
    function maquinasJogando () {
        // lista de jogadores
        for (f of $scope.jogo.jogadores) {
            // se o jogador não for uma pessoa
            if (!f.player) {
                // jogando altomaticamente para a maquina
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
        $scope.countRodada++;
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
                        indexjogador: j.index, 
                        nome: j.nome,
                        jogada: j.jogada,
                        usado: false
                    });       
                }
                index++;
            }
            i++;
        }

        // calculando o total de jogadas, se tiver apenas 2(4) jogadores, necessário apenas 1 par de jogada
        var total = (jogadores.length>4) ? (jogadores.length/2) : 1;
        // lista de rodadas possíveis
        for (r=0; r<total; r++) {
            // a lista de jogadores duplicados
            for (j of jogadores) {
                // se nessa posição a rodada não existir
                if ($scope.rodada[r] == undefined) {
                    // e se o jogador ainda não foi usado
                    if (j.usado === undefined || j.usado === false) {
                        // criamos a rodada e adicioanamos o dado do jogador como jogador1
                        $scope.rodada.push({
                            jogador1: {
                                indexjogador: j.indexjogador,
                                nome: j.nome,
                                jogada: j.jogada,
                                pontos: ''
                            },
                            jogador2: {
                                indexjogador: '',
                                nome: '',
                                jogada: '',
                                pontos: ''
                            }
                        });
                        // setamos que esse jogador já foi usado
                        j.usado = true;
                    }
                }else{
                    var rodada = $scope.rodada[r];
                    // caso a rodada já exista nessa posição verificamos se o jogador 2 está vazio
                    if (rodada.jogador2.indexjogador === '') {
                        // se o jogador da lista ainda não foir usado
                        if (j.usado === undefined || j.usado === false) {
                            // então adicionamos como jogador 2 na rodada
                            rodada.jogador2.indexjogador = j.indexjogador;
                            rodada.jogador2.nome = j.nome;
                            rodada.jogador2.jogada = j.jogada;
                            // calculamos os pontos do jogador
                            rodada.jogador2.pontos = jokenpo(j.jogada, rodada.jogador1.jogada).pontos;
                            // calculamos a quantidade de moedas do jogador depois na rodada
                            $scope.jogo.jogadores[j.indexjogador].moeda += +(rodada.jogador2.pontos);
                            
                            // JOGADOR 1

                            // e agora com a informação de pontos do jogador 2 calculamos os pontos do jogador 1
                            rodada.jogador1.pontos = jokenpo($scope.rodada[r].jogador1.jogada, j.jogada).pontos;
                            // calculamos a quantidade de moedas do jogador depois na rodada
                            $scope.jogo.jogadores[rodada.jogador1.indexjogador].moeda += +(rodada.jogador1.pontos);
                            j.usado = true;
                        }
                    }
                }
            }
        }
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

    $scope.jogarNovamente = function () {
        reset();
    }

});