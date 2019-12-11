<?php
// rest : logemail

/*
	Projeto: INCUBUS - Gestão de Consultoria de Vendas.
	Project Owner: Raquel Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-08-07T23:16:08.179Z.
	Data Atual: 08/08/2019.
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
	$obj = new Logemail(
		NULL,
		$data['idclasse'],
		$data['classe'],
		$data['assunto'],
		$data['conteudo'],
		$data['destinatario'],
		$data['status'],
		$data['retorno']
	);
	$control = new LogemailControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new LogemailControl(new Logemail($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listar () {
	$control = new LogemailControl(new Logemail);
	$response = $control->listar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Logemail(
		$data['id'],
		$data['idclasse'],
		$data['classe'],
		$data['assunto'],
		$data['conteudo'],
		$data['destinatario'],
		$data['status'],
		$data['retorno']
	);
	$control = new LogemailControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Logemail();
	$banco->setId($data['id']);
	$control = new LogemailControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>