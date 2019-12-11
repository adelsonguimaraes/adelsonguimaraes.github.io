<?php
session_start();

// header("Access-Control-Allow-Origin: *");

/* Inclui a Class de autoLoad */
require_once 'autoload.php';

/*
  Backup do Banco
*/
// require_once("../../util/dump.php");

// require_once '../../../api/util/Conexao.php';
//var_dump(json_decode($_POST['data']));
/*
	Verifica métodos requisitado
*/

// switch ($_POST['metodo']) {
    // case 'logar':
    //     logar();
    //     break;
        
    // case 'trocarempresa':
    //    	trocarEmpresa();
    //    	break;
    // case 'mudarsenha':
    //     mudarSenha();
    //     break;

    // case 'salvaempresafavorita':
    //     salvaEmpresaFavorita();
    //     break;
        
    // case 'listaempresasusuario': 
    // 	listarEmpresasUsuario();

    // default:
    //     break;
// }
$_POST['metodo']();

/*
	Metodos
*/

function logar() {

    $con = Conexao::getInstance()->getConexao();

    $data = $_POST['data'];

    $senha= $data['senha'];
    $email = $data['email']; 

    $email = stripslashes       ( strip_tags( trim( $email ) ) ); 
    $senha = stripslashes ( strip_tags( trim( $senha ) ) ); 

    $email = mysqli_real_escape_string( $con, $email ); 
    $senha = mysqli_real_escape_string ( $con ,$senha ); 
    
    $usuarioControl = new UsuarioControl();
	$response = $usuarioControl->logar($email, $senha);
	// echo $dados;
	// exit;
	// if ( $dados['success'] == false ) return $dados;

	// $result = array("success"=>false, "msg"=>"Usuario ou Senha incorretos!", "data"=>"");
	
	// if($dados) {
	// 	$result = array(
	//     		"success"   => true,
	//     		"msg"       => "logado",
	//     		"data"      => $usuario = array('idusuario'=>$dados->idusuario,'usuario'=>$dados->usuario, 'idperfilusuarioempresa'=>$dados->idperfilusuarioempresa, 'idempresa'=>$dados->idempresa, 'nomeempresa'=>$dados->nomeempresa, 'trocarempresa'=>'', 'inatividade'=>'ativo')
	//     );
	// }

    echo json_encode( $response );
}

function mudarSenha() {

    $con = Conexao::getInstance()->getConexao();

    $data = $_POST;

    $idusuario = $data['idusuario'];
    $senhaatual= $data['senhaatual'];
    $novasenha = $data['novasenha'];

    $usuarioControl = new UsuarioControl();
    $response = $usuarioControl->mudarSenha($idusuario, $senhaatual, $novasenha);

    echo json_encode( $response );
}

function auth () {
    $usuario = $_POST['usuario'];
    $control = new UsuarioControl();
    if (empty($usuario['auth'])) die (json_encode(array("success"=>false, "msg"=>"Usuário não autenticado!")));
    echo json_encode($control->auth($usuario['idusuario'], $usuario['auth']));
}

function getMenu() {
    $usuario = $_POST["usuario"];
    $usuarioControl = new UsuarioControl();
    echo json_encode($usuarioControl->getMenu($usuario["idusuario"]));
}