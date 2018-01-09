<?php
// rest : despesaparcela

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
	$obj = new Despesaparcela(
		NULL,
		new Despesa($data['iddespesa']),
		$data['valor'],
		$data['valorpago'],
		$data['datavencimento'],
		$data['datapagamento'],
		$data['status']
	);
	$control = new DespesaparcelaControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new DespesaparcelaControl(new Despesaparcela($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listar () {
	$control = new DespesaparcelaControl(new Despesaparcela);
	$response = $control->listar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Despesaparcela(
		$data['id'],
		new Despesa($data['iddespesa']),
		$data['valor'],
		$data['valorpago'],
		$data['datavencimento'],
		$data['datapagamento'],
		$data['status']
	);
	$control = new DespesaparcelaControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Despesaparcela();
	$banco->setId($data['id']);
	$control = new DespesaparcelaControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>