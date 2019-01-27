/*******************************************
		Controller de Home
*******************************************/
var homeCtrl = function ($scope, $rootScope, $location, genericAPI, $uibModal, SweetAlert, $timeout, $interval) {

	//verifica sessao
	// if(!$rootScope.usuario) {
	// 	$location.path('/login');
	// 	return false;
	// }

	$scope.cards = [
		{
			'nome': 'Adam',
			'pontos': -5,
			'src':'libs/img/adam.PNG',
			'desativado':false
		},
		{
			'nome': 'Eve',
			'pontos': -5,
			'src':'libs/img/eve.PNG',
			'desativado':false
		},
		{
			'nome': 'Alquimista',
			'pontos': 10,
			'src':'libs/img/alquimista.PNG',
			'desativado':false
		},
		{
			'nome': 'Bruxa',
			'pontos': 10,
			'src':'libs/img/bruxa.PNG',
			'desativado':false
		},
		{
			'nome': 'Diaba',
			'pontos': 10,
			'src':'libs/img/diaba.PNG',
			'desativado':false
		},
		{
			'nome': 'Dino Verde',
			'pontos': 15,
			'src':'libs/img/dinoverde.PNG',
			'desativado':false
		},
		{
			'nome': 'Elfo',
			'pontos': -10,
			'src':'libs/img/elfo.PNG',
			'desativado':false
		},
		{
			'nome': 'Frango',
			'pontos': 20,
			'src':'libs/img/frango.PNG',
			'desativado':false
		},
		{
			'nome': 'Lamina',
			'pontos': 20,
			'src':'libs/img/lamina.PNG',
			'desativado':false
		},
		{
			'nome': 'Maneiro',
			'pontos': -5,
			'src':'libs/img/maneiro.PNG',
			'desativado':false
		},
		{
			'nome': 'Melodia',
			'pontos': 10,
			'src':'libs/img/melodia.PNG',
			'desativado':false
		},
		{
			'nome': 'Mercenário',
			'pontos': 10,
			'src':'libs/img/mercenario.PNG',
			'desativado':false
		},
		{
			'nome': 'Squido',
			'pontos': -999,
			'src':'libs/img/polvo.PNG',
			'desativado':false
		},
		{
			'nome': 'Quarterback',
			'pontos': -15,
			'src':'libs/img/quarterback.PNG',
			'desativado':false
		},
		{
			'nome': 'Raver',
			'pontos': 10,
			'src':'libs/img/raver.PNG',
			'desativado':false
		},
		{
			'nome': 'Steampunk',
			'pontos': 10,
			'src':'libs/img/steampunk.PNG',
			'desativado':false
		},
		{
			'nome': 'Vontade',
			'pontos': 25,
			'src':'libs/img/vontade.PNG',
			'desativado':false
		},
		{
			'nome': 'Smoking',
			'pontos': 25,
			'src':'libs/img/smoking.PNG',
			'desativado':false
		}
	];

	var setado = 0;
	$scope.interrogacoes = 10;
	$scope.pista = 0;
	$scope.time = '00:01:00';
	$scope.iniciado = false;
	var interval = null;

	var reset = function () {
		$scope.interrogacoes = 10;
		$scope.pista = 0;
		setado = 0;
		$scope.iniciado = false;
		$scope.time = '00:01:00';
		for (c of $scope.cards) {
			c.desativado = false;
		}
		$interval.cancel(interval);
		
	}

	$scope.iniciar = function () {
		$scope.iniciado = true;
		interval = $interval(function() {
			$scope.time = moment($scope.time, 'HH:mm:ss').subtract('1', "second").format('HH:mm:ss');
			if ($scope.time === '00:00:00') {
				SweetAlert.swal({ 
					html: true, 
					title: "Tempo Esgotado!", 
					text: 'Você demorou de mais o tempo acabou!', 
					type: "error" 
				});
				reset();
			}
		}, 1000);
	}

	$scope.segredos = [
		"\"Eu estava lá, todos estavam, mas poucos vão querer falar alguma coisa... afinal quem nunca..\"",
		"\"É meu amigo, o rombo foi grande, eles estão agora atrás de quem cometeu esse furo.. alguém vai ter problemas...\"",
		"\"Eu não estava lá... eu juro... não me olhe com essa cara de desconfiado, mas eu ouvi coisas... disseram que foi um grande roubo no Banco dos Diamantes.. bem.. foi o que eu ouvi..\"",
		"\"Naquela noite a cidade sofria um blackout, uma forte chuva atingia a cidade de Peak a Mars Eletric ninguém via nada eu estava ilhado próximo ao banco dos diamantes esperando o temporal passar, então eu vi, ele aproveitou pra saquear o banco, tudo por causa daquela roupa cara...\""
	];

	var verificaDeativados = function (x, setado) {
		if (+x === +setado) {
			return true;
		}
		for (var i=0; i<$scope.cards.length;i++) {
			if ($scope.cards[i].desativado && +i=== +x) {
				return true;
			}
		}
		return false;
	}

	var setaPersonagem = function () {
		var x = setado;
		while (verificaDeativados(x, setado)) {
			x = (Math.random() * 17).toFixed(0);
		}
		setado = x;
	}
	setaPersonagem();

	$scope.clicado = function (card, index) {
		if (card.desativado === true) return false;
		if (+index === +setado) {
			card.desativado = true;
			SweetAlert.swal({ 
				html: true, 
				title: "Achou um Segredo!", 
				text: '<b>'+card.nome+':</b> ' + $scope.segredos[$scope.pista], 
				type: "success" 
			});
			$scope.pista++;
			if ($scope.pista>=5) {
				SweetAlert.swal({ 
					html: true, 
					title: "Incrível!!!", 
					text: '<b>Parabéns você venceu!<br>O Frango fez um grande rombo no banco de diamantes só pra conseguir essa roupa!</b><br><br><div class="segredo"><img src="'+$scope.cards[7].src+'"></div>',
					type: "success" 
				});
				reset();
			}
		}else{
			$scope.interrogacoes--;
			SweetAlert.swal({ 
				html: true, 
				title: "Interrogou a pessoa errada!", 
				text: '<b>'+card.nome+':</b> ' + "Sinto muito... seu segredo não está comigo...", 
				type: "warning" 
			});

			if ($scope.interrogacoes===0) {
				SweetAlert.swal({ html: true, title: "Não deu!", text: "Acabaram suas tentativas o jogo foi reiniciado!", type: "error" });
				reset();
			}
		}
		setaPersonagem();
	}
}


angular
	.module('cfp')
	.controller('homeCtrl', homeCtrl);