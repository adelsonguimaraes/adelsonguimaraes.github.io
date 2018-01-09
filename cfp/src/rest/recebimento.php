<?php
// rest : recebimento

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 20/06/2016.
	Data Atual: 29/06/2016.
*/

//inclui autoload
require_once 'autoload.php';

//verifica requisição
switch ($_POST['metodo']) {
	case 'cadastrar':
		cadastrar();
		break;
	case 'atualizar':
		atualizar();
		break;
	case 'buscarPorId':
		buscarPorId();
		break;
	case 'listar':
		listar();
		break;
	case 'listarPorUsuario':
		listarPorUsuario();
		break;
	case 'deletar':
		deletar();
		break;
}

function cadastrar () {
	$data = $_POST['data'];
	$obj = new Recebimento(
		NULL,
		new Usuario($data['idusuario']),
		$data['descricao'],
		$data['valor'],
		$data['dataarrecadacao'],
		$data['tipo'],
		$data['ativo']
	);
	$control = new RecebimentoControl($obj);
	$response = $control->cadastrar();
	echo json_encode( $response );
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Recebimento(
		$data['id'],
		new Usuario($data['idusuario']),
		$data['descricao'],
		$data['valor'],
		$data['dataarrecadacao'],
		$data['tipo'],
		$data['ativo']
	);
	$control = new RecebimentoControl($obj);
	$response = $control->atualizar();
	echo json_encode( $response );
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new RecebimentoControl(new Recebimento($data['id']));
	$response = $control->buscarPorId();
	echo json_encode( $response );
}
function listar () {
	$control = new RecebimentoControl(new Recebimento);
	$response = $control->listar();
	echo json_encode( $response );
}
function listarPorUsuario () {
	$usuario = json_decode( $_POST['usuario'] );
	$control = new RecebimentoControl();
	$response = $control->listarPorUsuario( $usuario['idusuario'] );
	echo json_encode( $response );
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Recebimento();
	$banco->setId($data['id']);
	$control = new RecebimentoControl($banco);
	$response = $control->deletar();
	echo json_encode( $response );
}


// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>