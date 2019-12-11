<?php
// rest : cliente

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
$_POST['metodo']();

function cadastrar () {
	$data = $_POST['data'];
	$usuario = $_POST['usuario'];
	$obj = new Cliente(
		NULL,
		new Usuario($usuario['idusuario']),
		stripslashes(strip_tags(trim($data['nome']))),
		stripslashes(strip_tags(trim($data['celular']))),
		stripslashes(strip_tags(trim($data['email']))),
		stripslashes(strip_tags(trim($data['interesse']))),
		stripslashes(strip_tags(trim($data['valor']))),
		stripslashes(strip_tags(trim($data['entrada']))),
		stripslashes(strip_tags(trim($data['parcela']))),
		stripslashes(strip_tags(trim($data['observacao']))),
		stripslashes(strip_tags(trim($data['status'])))
	);
	$control = new ClienteControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}

// auto cadastro do cliente via pagina de atendimento do consultor
function cadastroViaAtendimento () {
	$data = $_POST['data'];
	
	// verifcando se o email e telefone já foram cadastrados no sistema
	$clienteControl = new ClienteControl();
	$resp = $clienteControl->buscarClienteExistente ($data['email'], $data['celular']);
	if ($resp['success']===false) die (json_encode($resp));
	if (!empty($resp['data'])) {
		$resp['success'] = false;
		$resp['msg'] = "Seus dados já foram registados no nosso sistema, em breve entraremos em contato.";
		die (json_encode($resp));
	}

	// consultor
	$controlUsuario = new UsuarioControl(new Usuario($data['idusuario']));
	$resp = $controlUsuario->buscarPorId();
	if ($resp['success']===false) die (json_encode($resp));
	$consultor = (array) $resp['data'];

	// envia email cliente
	if (!empty($data['email'])) {
		// enviando menu informando consultor
		require_once "../email/cliente_cadastro_atendimento.php";
		$html = ob_get_contents();
		ob_end_clean();

		$obj = new EnviaEmail();
		$obj->setRemetente('Incubus')
		->setAssunto('ATENDIMENTO - SOLICITAÇÃO RECEBIDA')
		->setEmails(array($data['email']))
		->setMensagem($html);
		
		// verificando se o envio do email irá gerar erro
		if ($obj->enviar()!==true) {
			$resp['success'] = false;
			$resp['msg'] = "Email informado não é válido.";
			die (json_encode($resp));
		}
	}else{
		$resp['success'] = false;
		$resp['msg'] = "Email informado não é válido.";
		die (json_encode($resp));
	}


	$obj = new Cliente(
		NULL,
		new Usuario($data['idusuario']),
		stripslashes(strip_tags(trim($data['nome']))),
		stripslashes(strip_tags(trim($data['celular']))),
		stripslashes(strip_tags(trim($data['email']))),
		stripslashes(strip_tags(trim($data['interesse']))),
		stripslashes(strip_tags(trim($data['valor']))),
		stripslashes(strip_tags(trim($data['entrada']))),
		stripslashes(strip_tags(trim($data['parcela']))),
		stripslashes(strip_tags(trim("CADASTRO VIA PAGINA ATENDIMENTO")))
	);
	$control = new ClienteControl($obj);
	$resp = $control->cadastrar();
	if ($resp['success']===false) die (json_encode($resp));
	$idcliente = $resp['data'];

	// atualiza para cliente aparecer na home do consultor
	$control = new ClienteControl();
	$resp = $control->atualizarVerHome($idcliente);
	if ($resp['success']===false) die (json_encode($resp));

	// enviando email informando consultor
	require_once "../email/avisa_consultor_cadastro_atendimento.php";
	$html = ob_get_contents();
	ob_end_clean();

	$obj = new EnviaEmail();
	$obj->setRemetente('Incubus')
	->setAssunto('ATENDIMENTO - NOVA SIMULAÇÃO - COD. ' . $idcliente)
	->setEmails(array($consultor['email']))
	->setMensagem($html);
	$obj->enviar();

	echo json_encode($resp);
}

function buscarPorId () {
	$data = $_POST['data'];
	$control = new ClienteControl(new Cliente($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listarTudo () {
	$data = $_POST["data"];
	$usuario = $_POST['usuario'];
	$idusuario = $usuario["idusuario"];
	if (!empty($data["idusuario"])) $idusuario = $data["idusuario"];
	$control = new ClienteControl();
	$response = $control->listarTudo($idusuario);
	echo json_encode($response);
}
function listarPaginado () {
	$data = $_POST["data"];
	$usuario = $_POST['usuario'];
	$idusuario = $usuario["idusuario"];
	if (!empty($data["idusuario"])) $idusuario = $data["idusuario"];
	$control = new ClienteControl();
	$response = $control->listarPaginado($idusuario, $data["start"], $data["limit"]);
	echo json_encode($response);
}
function listarCompartilhadosPaginado () {
	$data = $_POST["data"];
	$usuario = $_POST['usuario'];
	$idusuario = $usuario["idusuario"];
	if (!empty($data["idusuario"])) $idusuario = $data["idusuario"];
	$control = new ClienteControl();
	$response = $control->listarCompartilhadosPaginado($idusuario, $data["start"], $data["limit"]);
	echo json_encode($response);
}
function listarVerNaHome () {
	$data = $_POST['data'];
	$control = new ClienteControl();
	$response = $control->listarVerNaHome($data['idusuario']);
	echo json_encode($response);
}
function listarParaCompartilhar () {
	$data = $_POST['data'];
	$usuario = $_POST['usuario'];
	$control = new ClienteControl();
	$response = $control->listarParaCompartilhar($usuario['idusuario'], $data['idconsultor']);
	echo json_encode($response);
}
function filtrar () {
	$data = $_POST['data'];
	$usuario = $_POST['usuario'];
	$control = new ClienteControl();
	$response = $control->filtrar($usuario['idusuario'], $data);
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Cliente(
		$data['id'],
		new Usuario($data['idusuario']),
		stripslashes(strip_tags(trim($data['nome']))),
		stripslashes(strip_tags(trim($data['celular']))),
		stripslashes(strip_tags(trim($data['email']))),
		stripslashes(strip_tags(trim($data['interesse']))),
		stripslashes(strip_tags(trim($data['valor']))),
		stripslashes(strip_tags(trim($data['entrada']))),
		stripslashes(strip_tags(trim($data['parcela']))),
		stripslashes(strip_tags(trim($data['observacao']))),
		stripslashes(strip_tags(trim($data['status']))),
		($data['verhome'] ? 'SIM' : 'NAO')
	);
	$control = new ClienteControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Cliente();
	$banco->setId($data['id']);
	$control = new ClienteControl($banco);
	echo json_encode($control->deletar());
}

// compartilhando clientes
function compartilhar () {
	$data = $_POST["data"];
	$usuario = $_POST["usuario"];
	
	// adicionando compartilhamento
	foreach ($data['clientes'] as $key) {
		$control = new ClienteControl();
		$resp = $control->compartilhar($usuario['idusuario'], $data['idconsultor'], $key['id']);
		if ($resp['success']===false) die (json_encode($resp));
	}

	// removendo compartilhamento
	foreach ($data['removidos'] as $key) {
		$control = new ClienteControl();
		$resp = $control->descompartilhar($usuario['idusuario'], $data['idconsultor'], $key['id']);
		if ($resp['success']===false) die (json_encode($resp));
	}

	echo json_encode($resp);
	
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>