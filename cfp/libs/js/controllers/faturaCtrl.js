
var faturaCtrl = function ( $scope ) {
	$scope.faturas = [
		{
			id:1,
			'descricao':'Tenis',
			'vencimento':'01/11/2016',
			'valor':50.00,
			'status':'EM ABERTO'
		},
		{
			id:2,
			'descricao':'Televisão',
			'vencimento':'01/11/2016',
			'valor':50.00,
			'status':'EM ABERTO'
		},
		{
			id:3,
			'descricao':'Computador',
			'vencimento':'01/11/2016',
			'valor':50.00,
			'status':'EM ABERTO'
		}
	];
};

angular.module( 'cfp' )
	.controller( 'faturaCtrl', faturaCtrl );