<?php
// rest : cartacredito

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
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
	case 'filtrar':
		filtrar();
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
	$obj = new Cartacredito(
		NULL,
		new Taxaadministrativa($data['idtaxaadministrativa']),
		$data['valor'],
		$data['entrada'],
		$data['parcela']
	);
	$control = new CartacreditoControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new CartacreditoControl(new Cartacredito($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listar () {
	$control = new CartacreditoControl(new Cartacredito);
	$response = $control->listar();
	echo json_encode($response);
}
function filtrar () {
	$data = $_POST['data'];
	$control = new CartacreditoControl();
	$response = $control->filtrar($data);
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Cartacredito(
		$data['id'],
		new Taxaadministrativa($data['idtaxaadministrativa']),
		$data['valor'],
		$data['entrada'],
		$data['parcela']
	);
	$control = new CartacreditoControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Cartacredito();
	$banco->setId($data['id']);
	$control = new CartacreditoControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>