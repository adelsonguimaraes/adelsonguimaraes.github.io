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
	case 'listarNotIn':
		listarNotIn();
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
	// metodo de sincronização
	case 'sync':
		sync();
		break;
}

function cadastrar () {
	$data = $_POST['data'];
	$obj = new Categoria(
		NULL,
		$data['descricao'],
		$data['tipo'],
		$data['sync'],
		$data['ativo'],
		$data['datacadastro'],
		$data['dataedicao']
	);
	$control = new CategoriaControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Categoria(
		$data['id'],
		$data['descricao'],
		$data['tipo'],
		$data['sync'],
		$data['ativo'],
		$data['datacadastro'],
		$data['dataedicao']
	);
	$control = new CategoriaControl($obj);
	$response = $control->atualizar();
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
function listarNotIn() {
	$in = $_POST['data'];
	$control = new CategoriaControl();
	$response = $control->listarNotIn($in);
	echo json_encode($response);
}
function listarCategoriaContasAPagar () {
	$control = new CategoriaControl();
	$response = $control->listarCategoriaContasAPagar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Categoria();
	$banco->setId($data['id']);
	$control = new CategoriaControl($banco);
	echo json_encode($control->deletar());
}

function sync () {
	$data = $_POST['data'];
	$cadastrados = array();
	$response = array('success'=>true, 'msg'=>'[Categoria]: Syncronizado com Sucesso', 'data'=>[]);
	foreach($data as $key) {
		switch ($key['metodo']) {
			case 'cadastrar': {
				// chama cadastrar e recebe o response
				$obj = new Categoria(
					NULL,
					$key['data']['descricao'],
					$key['data']['tipo'],
					$key['data']['sync'],
					$key['data']['ativo'],
					$key['data']['datacadastro'],
					$key['data']['dataedicao']
				);
				$control = new CategoriaControl($obj);
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
				$obj = new Categoria(
					$key['data']['id'],
					$key['data']['descricao'],
					$key['data']['tipo'],
					$key['data']['sync'],
					$key['data']['ativo'],
					$key['data']['datacadastro'],
					$key['data']['dataedicao']
				);
				$control = new CategoriaControl($obj);
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