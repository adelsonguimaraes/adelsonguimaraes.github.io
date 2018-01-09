<?php
// rest : fluxodespesa

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
	$obj = new Fluxodespesa(
		NULL,
		new Despesa($data['iditemdespesa']),
		$data['valor']
	);
	$control = new FluxodespesaControl($obj);
	$id = $control->cadastrar();
	echo $id;
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new FluxodespesaControl(new Fluxodespesa($data['id']));
	$obj = $control->buscarPorId();
	if(!empty($obj)) {
		echo json_encode($obj);
	}
}
function listar () {
	$control = new FluxodespesaControl(new Fluxodespesa);
	$lista = $control->listar();
	if(!empty($lista)) {
		echo json_encode($lista);
	}
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Fluxodespesa(
		$data['id'],
		new Despesa($data['iditemdespesa']),
		$data['valor']
	);
	$control = new FluxodespesaControl($obj);
	$id = $control->atualizar();
	echo $id;
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Fluxodespesa();
	$banco->setId($data['id']);
	$control = new FluxodespesaControl($banco);
	echo $control->deletar();
}


// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>