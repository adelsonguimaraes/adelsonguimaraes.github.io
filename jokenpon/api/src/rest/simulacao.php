<?php
// rest : simulacao

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

//inclui autoload
require_once 'autoload.php';
set_time_limit(0);

function loopExecution () {
	$data = $_POST['data'];
	$obj = new Simulacao(
		NULL,
		new Cliente(1)
	);
	$control = new SimulacaoControl($obj);
	$resp = $control->cadastrar();
	if ($resp['success']===false) die(json_encode($resp));
}

// $x=0;
// while ($x<6) {
	// loopExecution();
// 	sleep(10); // descansa a cada 60 segundos
// 	$x++;
// }
loopExecution();

exit;

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
	$obj = new Simulacao(
		NULL,
		new Cliente($data['idcliente']),
		$data['valorcliente'],
		$data['entradacliente'],
		$data['parcelacliente'],
		$data['valoirfinal'],
		$data['entradafinal'],
		$data['parcelafinal'],
		$data['taxaadministrativa']
	);
	$control = new SimulacaoControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new SimulacaoControl(new Simulacao($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listar () {
	$control = new SimulacaoControl(new Simulacao);
	$response = $control->listar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Simulacao(
		$data['id'],
		new Cliente($data['idcliente']),
		$data['valorcliente'],
		$data['entradacliente'],
		$data['parcelacliente'],
		$data['valoirfinal'],
		$data['entradafinal'],
		$data['parcelafinal'],
		$data['taxaadministrativa']
	);
	$control = new SimulacaoControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Simulacao();
	$banco->setId($data['id']);
	$control = new SimulacaoControl($banco);
	echo json_encode($control->deletar());
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>