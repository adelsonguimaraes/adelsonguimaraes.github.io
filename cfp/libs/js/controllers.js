//controllers

(function () {
	
	"use strict"

	var login = function (obj) {
		
		obj.senha = md5(obj.senha);
		console.log(obj);

	}


	angular
		.module('cfp')
		.controller('loginCtrl', login);

})();