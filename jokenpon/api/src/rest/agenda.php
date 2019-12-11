<?php
// rest : agenda

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
	case 'listarOrdenadoPorData':
		listarOrdenadoPorData();
		break;
	case 'atualizar':
		atualizar();
		break;
	case 'desativar':
		desativar();
		break;
	case 'deletar':
		deletar();
		break;
}

function cadastrar () {
	$data = $_POST['data'];
	$usuario = $_POST['usuario'];
	$obj = new Agenda(
		NULL,
		new Usuario($usuario['idusuario']),
		new Cliente($data['idcliente']),
		$data['datahora'],
		$data['tipo'],
		stripslashes(strip_tags(trim($data['observacao'])))
	);
	$control = new AgendaControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new AgendaControl(new Agenda($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listar () {
	$data = $_POST["data"];
	$usuario = $_POST['usuario'];
	$idusuario = $usuario["idusuario"];
	if (!empty($data)) $idusuario = $data["idusuario"];
	$control = new AgendaControl();
	$response = $control->listar($idusuario);
	echo json_encode($response);
}
function listarOrdenadoPorData () {
	$data = $_POST["data"];
	$usuario = $_POST['usuario'];
	$idusuario = $usuario["idusuario"];
	if (!empty($data)) $idusuario = $data["idusuario"];
	$control = new AgendaControl();
	$response = $control->listarOrdenadoPorData($idusuario);
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$usuario = $_POST['usuario'];
	$obj = new Agenda(
		$data['id'],
		new Usuario($usuario['idusuario']),
		new Cliente($data['idcliente']),
		$data['datahora'],
		$data['tipo'],
		stripslashes(strip_tags(trim($data['observacao'])))
	);
	$control = new AgendaControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function desativar () {
	$data = $_POST['data'];
	$usuario = $_POST['usuario'];
	$control = new AgendaControl();
	$response = $control->desativar($data['idagenda']);
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Agenda();
	$banco->setId($data['id']);
	$control = new AgendaControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>