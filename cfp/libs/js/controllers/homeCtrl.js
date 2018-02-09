/*******************************************
		Controller de Home
*******************************************/
var homeCtrl = function ($scope, $rootScope, $location, genericAPI) {

	//verifica sessao
	if(!$rootScope.usuario) {
		$location.path('/login');
		return false;
	}

	$scope.feeds = [
		{
			'id': 1,
			'feed': {
				'title':'Alteração de Senha',
				'text': 'Ao navegar pelo sistema uma verificação de segurança será feita em sua conta para verificar se a senha incial foi atualizada, por motivos de segurança, saiba que é importante fazer a atualização da senha pois muitos usuários receberam senhas inciais, e para evitar a fragilidade do sistema atualize sua senha.',
				'img': './libs/img/feeds/alterarsenha.png'
			},
			'author': {
				'name':'Sistema de Controle Financeiro Pessoal',
				'avatar':'./libs/img/icons/moneybreak-512x512.png'
			},
			'datacadastro':'2018-02-09 15:42:30'
		},
		{
			'id': 2,
			'feed': {
				'title':'Meus Dados',
				'text': 'Ao clicar no nome de usuário é exibido uma janela, onde é possível consultar os dados do usuário, email, nome, a versão do sistema, é possível acionar o botão para alterar a senha e fazer o deslogamento do sistema.',
				'img': './libs/img/feeds/meusdados.png'
			},
			'author': {
				'name':'Sistema de Controle Financeiro Pessoal',
				'avatar':'./libs/img/icons/moneybreak-512x512.png'
			},
			'datacadastro':'2018-02-09 16:44:30'
		},
		{
			'id': 3,
			'feed': {
				'title':'Menu Rodapé',
				'text': 'A navegação entre os menus se tornou mais simplificada, com o menu no rodapé, tendo em destaque botões para as principais funções do sistema, na ordem da direita para esquerda, Cronograma, Despesa, Recebimentos e Outros.',
				'img': './libs/img/feeds/menu.png'
			},
			'author': {
				'name':'Sistema de Controle Financeiro Pessoal',
				'avatar':'./libs/img/icons/moneybreak-512x512.png'
			},
			'datacadastro':'2018-02-09 16:49:25'
		},
		{
			'id': 4,
			'feed': {
				'title':'Menu Topo',
				'text': 'Na parte superior da tela encontra-se o menu de topo, a esquerda a Sigla do sistema que pode ser clicada para ter acesso a tela de Informações, e a direita o nome do usuário que também pode ser clicado para ter acesso a tela de dados do usuário.',
				'img': './libs/img/feeds/menutopo.png'
			},
			'author': {
				'name':'Sistema de Controle Financeiro Pessoal',
				'avatar':'./libs/img/icons/moneybreak-512x512.png'
			},
			'datacadastro':'2018-02-09 16:54:28'
		}
	];

	$scope.expand = function (e) {
		$('#'+e).is(":visible") ? $('#'+e).hide() : $('#'+e).slideToggle();
	}
}


angular
	.module('cfp')
	.controller('homeCtrl', homeCtrl);