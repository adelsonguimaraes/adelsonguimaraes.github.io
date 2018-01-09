/*
	Filtros
*/

function nomeProprio () {
	return function (input) {
		return input;
		// var listaNomes = input.split(" ");
		// var listaNomeFormat = listaNomes.map(function (nome) {
		// 	return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
		// });
		// return listaNomeFormat.join(" ");
	}
};

function cpf () {
	return function (input) {
		if (!input) return input;
		var cpf = input.substring(0, 3) + '.' + input.substring(3, 6) + '.' + input.substring(6, 9) + '-' + input.substring(9);
		return cpf;
	}
};

function cnpj () {
	return function (input) {
		if (!input) return input;
		var cnpj = input.substring(0, 2) + '.' + input.substring(2, 5) + '.' + input.substring(5, 8) + '/' + input.substring(8, 12) + '-' + input.substring(12);
		return cnpj;
	}
};

function cep () {
	return function (input) {
		if (!input) return input;
		var cep = input.substring(0, 5) + '-' + input.substring(5);
		return cep;
	}
};

function tel () {
	return function (input) {
		if (!input) return input;
		var tel = '(' + input.substring(0, 2) + ') ' + input.substring(2, 6) + '-' + input.substring(6);
		return tel;
	}
};

function fax () {
	return function (input) {
		if (!input) return input;
		var fax = '(' + input.substring(0, 2) + ') ' + input.substring(2, 6) + '-' + input.substring(6);
		return fax;
	}
};

function cel () {
	return function (input) {
		if (!input) return input;
		var cel = '(' + input.substring(0, 2) + ') ' + input.substring(2, 7) + '-' + input.substring(7);
		return cel;
	}
};

function data ($timeout) {
	return function (input) {
		if(!input || typeof(input) == 'object') return input;
		var data = input.substring(8, 10) + '/' + input.substring(5, 7) + '/' + input.substring(0, 4) + input.substring(10);
		return data;
	}
}

angular
	.module('cfp')
	.filter('nomeProprio', nomeProprio)
	.filter('cpf', cpf)
	.filter('cnpj', cnpj)
	.filter('cep', cep)
	.filter('tel', tel)
	.filter('fax', fax)
	.filter('cel', cel)
	.filter('data', data)