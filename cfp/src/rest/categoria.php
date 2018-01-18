<?php
// rest : categoria

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
	case 'listarCategoriaContasAPagar':
		listarCategoriaContasAPagar();
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
	$obj = new Categoria(
		NULL,
		$data['descricao'],
		$data['tipo'],
		$data['sync'],
		$data['datacadastro'],
		$data['dataedicao']
	);
	$control = new CategoriaControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new CategoriaControl(new Categoria($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listar () {
	$control = new CategoriaControl();
	$response = $control->listar();
	echo json_encode($response);
}
function listarCategoriaContasAPagar () {
	$control = new CategoriaControl();
	$response = $control->listarCategoriaContasAPagar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Categoria(
		$data['id'],
		$data['descricao'],
		$data['tipo'],
		$data['sync'],
		$data['datacadastro'],
		$data['dataedicao']
	);
	$control = new CategoriaControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Categoria();
	$banco->setId($data['id']);
	$control = new CategoriaControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>