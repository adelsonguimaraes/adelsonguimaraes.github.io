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
	case 'listarContasPorUsuario':
		listarContasPorUsuario();
		break;
	case 'listarNotIn':
		listarNotIn();
		break;
	case 'listarContasAPagarPorUsuario':
		listarContasAPagarPorUsuario();
		break;
	case 'listarContasAReceberPorUsuario':
		listarContasAReceberPorUsuario();
		break;
	case 'atualizar':
		atualizar();
		break;
	case 'deletar':
		echo json_encode(array('success'=>true, 'msg'=>'', 'data'=>''));
		// deletar();
		break;
	// metodo de sincronização
	case 'sync':
		sync();
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
		$data['datavencimento'],
		$data['sync'],
		$data['ativo'],
		$data['datacadastro'],
		$data['dataedicao']
	);
	$control = new ContaControl($obj);
	$response = $control->cadastrar();
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
		$data['datavencimento'],
		$data['sync'],
		$data['ativo'],
		$data['datacadastro'],
		$data['dataedicao']
	);
	$control = new ContaControl($obj);
	$response = $control->atualizar();
	
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
function listarContasPorUsuario() {
	$usuario = $_POST['usuario'];
	$control = new ContaControl();
	$response = $control->listarContasPorUsuario($usuario['idusuario']);
	echo json_encode($response);
}
function listarNotIn() {
	$in = $_POST['data'];
	$usuario = $_POST['usuario'];
	$control = new ContaControl();
	$response = $control->listarNotIn($in, $usuario['idusuario']);
	echo json_encode($response);
}
function listarContasAPagarPorUsuario() {
	$usuario = $_POST['usuario'];
	$control = new ContaControl();
	$response = $control->listarContasAPagarPorUsuario($usuario['idusuario']);
	echo json_encode($response);
}
function listarContasAReceberPorUsuario() {
	$usuario = $_POST['usuario'];
	$control = new ContaControl();
	$response = $control->listarContasAReceberPorUsuario($usuario['idusuario']);
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Conta();
	$banco->setId($data['id']);
	$control = new ContaControl($banco);
	echo json_encode($control->deletar());
}

function sync () {
	$data = $_POST['data'];
	$cadastrados = array();
	$response = array('success'=>true, 'msg'=>'[Conta]: Syncronizado com Sucesso', 'data'=>[]);
	foreach($data as $key) {
		switch ($key['metodo']) {
			case 'cadastrar': {
				// chama cadastrar e recebe o response
				$obj = new Conta(
					NULL,
					new Usuario($key['data']['idusuario']),
					new Categoria($key['data']['idcategoria']),
					$key['data']['descricao'],
					$key['data']['valor'],
					$key['data']['parcela'],
					$key['data']['indeterminada'],
					$key['data']['tipo'],
					$key['data']['status'],
					$key['data']['datavencimento'],
					$key['data']['sync'],
					$key['data']['datacadastro'],
					$key['data']['dataedicao']
				);
				$control = new ContaControl($obj);
				$resp = $control->cadastrar();

				// se retornar um erro
				if ($resp['success'] === false) die (json_encode($resp));
				//sob-escreve o id com o atualizado
				$key['data']['id'] = $resp['data'];
				// adiciona ao array de cadastrados
				array_push($cadastrados, $key['data']);
				break;
			}
			case 'atualizar': {
				$obj = new Conta(
					$key['data']['id'],
					new Usuario($key['data']['idusuario']),
					new Categoria($key['data']['idcategoria']),
					$key['data']['descricao'],
					$key['data']['valor'],
					$key['data']['parcela'],
					$key['data']['indeterminada'],
					$key['data']['tipo'],
					$key['data']['status'],
					$key['data']['datavencimento'],
					$key['data']['sync'],
					$key['data']['datacadastro'],
					$key['data']['dataedicao']
				);
				$control = new ContaControl($obj);
				$resp = $control->atualizar();
				// se retornar um erro
				if ($resp['success'] === false) die (json_encode($resp));
				// se tudo ok segue o laço
				break;
			}
		}
	}
	$response['data'] = $cadastrados;
	echo json_encode($response);
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>