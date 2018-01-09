<?php
// rest : recebimentoparcela

/*
	Projeto: CFP - (Controle Financeiro Pessoal).
	Project Owner: Adelson Guimarães.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 09/01/2018.
	Data Atual: 09/01/2018.
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
	case 'deletar':
		deletar();
		break;
}

function cadastrar () {
	$data = $_POST['data'];
	$obj = new Recebimentoparcela(
		NULL,
		new Recebimento($data['idrecebimento']),
		$data['valor'],
		$data['valorrecebido'],
		$data['datavencimento'],
		$data['datarecebimento'],
		$data['status']
	);
	$control = new RecebimentoparcelaControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new RecebimentoparcelaControl(new Recebimentoparcela($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listar () {
	$control = new RecebimentoparcelaControl(new Recebimentoparcela);
	$response = $control->listar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Recebimentoparcela(
		$data['id'],
		new Recebimento($data['idrecebimento']),
		$data['valor'],
		$data['valorrecebido'],
		$data['datavencimento'],
		$data['datarecebimento'],
		$data['status']
	);
	$control = new RecebimentoparcelaControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Recebimentoparcela();
	$banco->setId($data['id']);
	$control = new RecebimentoparcelaControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>