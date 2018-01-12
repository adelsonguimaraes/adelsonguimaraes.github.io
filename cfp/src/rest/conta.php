<?php
// rest : conta

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
	case 'listarContasAPagarPorUsuario':
		listarContasAPagarPorUsuario();
		break;
	case 'atualizar':
		atualizar();
		break;
	case 'deletar':
		deletar();
		break;
}

function cadastrar () {

	$data = $_POST['data'];
	
	$obj = new Conta(
		NULL,
		new Usuario($data['idusuario']),
		new Categoria($data['idcategoria']),
		$data['descricao'],
		$data['valor'],
		$data['parcela'],
		$data['indeterminada'],
		$data['tipo'],
		$data['status'],
		$data['datavencimento']
	);
	$control = new ContaControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new ContaControl(new Conta($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listar () {
	$control = new ContaControl(new Conta);
	$response = $control->listar();
	echo json_encode($response);
}
function listarContasAPagarPorUsuario() {
	$usuario = $_POST['usuario'];
	$control = new ContaControl();
	$response = $control->listarContasAPagarPorUsuario($usuario['idusuario']);
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Conta(
		$data['id'],
		new Usuario($data['idusuario']),
		new Categoria($data['idcategoria']),
		$data['descricao'],
		$data['valor'],
		$data['parcela'],
		$data['indeterminada'],
		$data['tipo'],
		$data['status'],
		$data['datavencimento']
	);
	$control = new ContaControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Conta();
	$banco->setId($data['id']);
	$control = new ContaControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>