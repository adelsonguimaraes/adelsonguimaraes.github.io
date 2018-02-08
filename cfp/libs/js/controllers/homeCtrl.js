/*******************************************
		Controller de Home
*******************************************/
var homeCtrl = function ($scope, $rootScope, $location, genericAPI) {

	//verifica sessao
	if(!$rootScope.usuario) {
		// $location.path('/login');
		// return false;
	}

	$scope.feeds = [
		{
			'id': 1,
			'feed': {
				'title':'God of War',
				'text': 'God of War é um jogo eletrônico de ação-aventura desenvolvido pela SIE Santa Monica Studio e será publicado pela Sony Interactive Entertainment para PlayStation 4 em 20 de abril de 2018.[1] Será o oitavo jogo da série God of War e a sequência dos eventos ocorridos em God of War III. O título será um recomeço para a franquia e vai levar a série para o mundo da mitologia nórdica (todos os jogos anteriores tinham como cenário a mitologia grega). Kratos retorna como o protagonista e agora tem ao seu lado um filho chamado Atreus. Kratos atua como um mentor e protetor de Atreus e tem de dominar a raiva que o impulsionou por muitos anos.',
				'img': 'http://s3.amazonaws.com/digitaltrends-uploads-prod/2017/12/God-of-War.jpg'
			},
			'author': {
				'name':'Sistema de Controle Financeiro Pessoal',
				'avatar':'./libs/img/icons/moneybreak-512x512.png'
			},
			'datacadastro':'2018-02-07 21:11:25'
		},
		{
			'id': 2,
			'feed': {
				'title':'Mario Tênis 2018',
				'text': 'A Nintendo anunciou Mario Tennis Aces para o Switch em sua última Direct, conferência online em que revela novidades para seus produtos. O game chega ao console ainda no primeiro semestre e terá inúmeros cenários novos e um modo história.',
				'img': 'http://static2.businessinsider.com/image/5a577eaba75e2025008b4df8-1440/screen%20shot%202018-01-11%20at%20100808%20am.png'
			},
			'author': {
				'name':'Sistema de Controle Financeiro Pessoal',
				'avatar':'./libs/img/icons/moneybreak-512x512.png'
			},
			'datacadastro':'2018-02-07 21:11:25'
		},
		{
			'id': 3,
			'feed': {
				'title':'Assassin\'s Creed 2018',
				'text': 'Depois de uma semana cheia de rumores, a Ubisoft confirmou oficialmente quando teremos um novo game da série Assassin\'s Creed. O próximo título vai sair antes de março de 2018, que é quando acaba o ano fiscal da companhiaA informação foi confirmada durante a conferência para revelar os resultados financeiros da companhia. Para acompanhar o anúncio, o Twitter oficial da franquia no Reino Unido ainda compartilhou o gif abaixo, com a fala: "Afie a sua lâmina. Os assassinos vão sair das sombras em breve',
				'img': 'http://sm.ign.com/ign_br/video/x/xbox-games/xbox-games-with-gold-for-february-2018-revealed-ign-news_t5mu.jpg'
			},
			'author': {
				'name':'Sistema de Controle Financeiro Pessoal',
				'avatar':'./libs/img/icons/moneybreak-512x512.png'
			},
			'datacadastro':'2018-02-07 21:11:25'
		},
		{
			'id': 3,
			'feed': {
				'title':'Assassin\'s Creed 2018',
				'text': 'Depois de uma semana cheia de rumores, a Ubisoft confirmou oficialmente quando teremos um novo game da série Assassin\'s Creed. O próximo título vai sair antes de março de 2018, que é quando acaba o ano fiscal da companhiaA informação foi confirmada durante a conferência para revelar os resultados financeiros da companhia. Para acompanhar o anúncio, o Twitter oficial da franquia no Reino Unido ainda compartilhou o gif abaixo, com a fala: "Afie a sua lâmina. Os assassinos vão sair das sombras em breve',
				'img': 'http://sm.ign.com/ign_br/video/x/xbox-games/xbox-games-with-gold-for-february-2018-revealed-ign-news_t5mu.jpg'
			},
			'author': {
				'name':'Sistema de Controle Financeiro Pessoal',
				'avatar':'./libs/img/icons/moneybreak-512x512.png'
			},
			'datacadastro':'2018-02-07 21:11:25'
		},
		{
			'id': 3,
			'feed': {
				'title':'Assassin\'s Creed 2018',
				'text': 'Depois de uma semana cheia de rumores, a Ubisoft confirmou oficialmente quando teremos um novo game da série Assassin\'s Creed. O próximo título vai sair antes de março de 2018, que é quando acaba o ano fiscal da companhiaA informação foi confirmada durante a conferência para revelar os resultados financeiros da companhia. Para acompanhar o anúncio, o Twitter oficial da franquia no Reino Unido ainda compartilhou o gif abaixo, com a fala: "Afie a sua lâmina. Os assassinos vão sair das sombras em breve',
				'img': 'http://sm.ign.com/ign_br/video/x/xbox-games/xbox-games-with-gold-for-february-2018-revealed-ign-news_t5mu.jpg'
			},
			'author': {
				'name':'Sistema de Controle Financeiro Pessoal',
				'avatar':'./libs/img/icons/moneybreak-512x512.png'
			},
			'datacadastro':'2018-02-07 21:11:25'
		},
		{
			'id': 3,
			'feed': {
				'title':'Assassin\'s Creed 2018',
				'text': 'Depois de uma semana cheia de rumores, a Ubisoft confirmou oficialmente quando teremos um novo game da série Assassin\'s Creed. O próximo título vai sair antes de março de 2018, que é quando acaba o ano fiscal da companhiaA informação foi confirmada durante a conferência para revelar os resultados financeiros da companhia. Para acompanhar o anúncio, o Twitter oficial da franquia no Reino Unido ainda compartilhou o gif abaixo, com a fala: "Afie a sua lâmina. Os assassinos vão sair das sombras em breve',
				'img': 'http://sm.ign.com/ign_br/video/x/xbox-games/xbox-games-with-gold-for-february-2018-revealed-ign-news_t5mu.jpg'
			},
			'author': {
				'name':'Sistema de Controle Financeiro Pessoal',
				'avatar':'./libs/img/icons/moneybreak-512x512.png'
			},
			'datacadastro':'2018-02-07 21:11:25'
		},
		{
			'id': 3,
			'feed': {
				'title':'Assassin\'s Creed 2018',
				'text': 'Depois de uma semana cheia de rumores, a Ubisoft confirmou oficialmente quando teremos um novo game da série Assassin\'s Creed. O próximo título vai sair antes de março de 2018, que é quando acaba o ano fiscal da companhiaA informação foi confirmada durante a conferência para revelar os resultados financeiros da companhia. Para acompanhar o anúncio, o Twitter oficial da franquia no Reino Unido ainda compartilhou o gif abaixo, com a fala: "Afie a sua lâmina. Os assassinos vão sair das sombras em breve',
				'img': 'http://sm.ign.com/ign_br/video/x/xbox-games/xbox-games-with-gold-for-february-2018-revealed-ign-news_t5mu.jpg'
			},
			'author': {
				'name':'Sistema de Controle Financeiro Pessoal',
				'avatar':'./libs/img/icons/moneybreak-512x512.png'
			},
			'datacadastro':'2018-02-07 21:11:25'
		}
	];

	$scope.expand = function (e) {
		$('#'+e).is(":visible") ? $('#'+e).hide() : $('#'+e).slideToggle();
	}
}


angular
	.module('cfp')
	.controller('homeCtrl', homeCtrl);