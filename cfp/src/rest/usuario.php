<?php
// rest : usuario

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimaães.
	Data de início: 12/01/2018.
	Data Atual: 12/01/2018.
*/

//inclui autoload
require_once 'autoload.php';

//verifica requisição
switch ($_POST['metodo']) {
	case 'cadastrar':
		cadastrar();
		break;
	case 'buscarPorId':
		buscarPorId();
		break;
	case 'listar':
		listar();
		break;
	case 'atualizar':
		atualizar();
		break;
	case 'atualizarSenha':
		atualizarSenha();
		break;
	case 'deletar':
		deletar();
		break;
}

function cadastrar () {
	$data = $_POST['data'];
	$obj = new Usuario(
		NULL,
		$data['nome'],
		$data['email'],
		$data['senha'],
		$data['ativo'],
		$data['perfil'],
		$data['pushkey']
	);
	$control = new UsuarioControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new UsuarioControl(new Usuario($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listar () {
	$control = new UsuarioControl(new Usuario);
	$response = $control->listar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Usuario(
		$data['id'],
		$data['nome'],
		$data['email'],
		$data['senha'],
		$data['ativo'],
		$data['perfil'],
		$data['pushkey'],
		$data['sync'],
		$data['datacastro'],
		$data['dataedicao']
	);
	$control = new UsuarioControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function atualizarSenha () {
	$data = $_POST['data'];
	$control = new UsuarioControl();
	echo json_encode( $control->atualizarSenha($data) );
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Usuario();
	$banco->setId($data['id']);
	$control = new UsuarioControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>