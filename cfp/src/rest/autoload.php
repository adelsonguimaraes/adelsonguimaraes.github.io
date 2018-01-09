<?php
/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 20/06/2016.
	Data Atual: 29/06/2016.
*/

//Trata requisição
if(!$_POST){
	if($_GET) {$_POST = $_GET;}
	else{$_POST =  file_get_contents ( 'php://input' );}}
$_POST =  json_decode($_POST, true);

// conexao
require_once("../util/Conexao.php");

// mysql resolve
require_once("../util/ResolveMysqlError.php");

// carrega class
function carregaClasses($class){
	//Verifica se existe Control no nome da classe
	if(strrpos($class, "Control")) {
		require_once("../control/".$class.".php");
	//Verifica se existe DAO no nome da classe
	}else if(strrpos($class, "DAO")) {
		$bean = strtolower(substr($class, 0, strrpos($class, "DAO")));
		require_once "../model/".$bean."/".$class.".php";
 	//se nao for control ou dao é model
 	}else{
		$bean = strtolower($class);
		require_once "../model/".$bean."/".$class.".php";
	}
}

//chama autoload
spl_autoload_register("carregaClasses");

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>