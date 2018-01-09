<?php
 session_start();

// rest : authentication

/*
    Projeto: CFP - Controle Financeiro Pessoal.
    Project Owner: Adelson Guimarães Monteiro.
    Desenvolvedor: Adelson Guimarães Monteiro.
    Data de início: 20/06/2016.
    Data Atual: 29/06/2016.
*/

//inclui autoload
require_once 'autoload.php';

/*
	Verifica métodos requisitado
*/
switch ($_POST['metodo']) {
    case 'logar':
        logar();
        break;
}

/*
	Metodos
*/

function logar() {

    $con = Conexao::getInstance()->getConexao();

    $data = $_POST['data'];

    $pass= $data['senha'];
    $userName = $data['usuario']; 

    $userName = stripslashes ( strip_tags( trim( $userName ) ) ); 
    $pass = stripslashes ( strip_tags( trim( $pass ) ) ); 

    $userName = mysqli_real_escape_string( $con, $userName ); 
    $pass = mysqli_real_escape_string ( $con ,$pass ); 

    $sql = "SELECT * FROM usuario WHERE usuario='$userName' and senha='$pass'"; 
    $result = array (); 
    if ($resultdb = mysqli_query( $con, $sql )) {
        $count = $resultdb->num_rows; 
        if ($count == 1) {
            if ($row = mysqli_fetch_assoc($resultdb)){
                $result = array(
                    "success"   => true,
                    "msg"       => "logado",
                    "data"      => $usuario = array('idusuario'=>$row['id'],'usuario'=>$row['usuario'], 'nome'=> $row['nome'], 'inatividade'=>'ativo')
                );
            }   
        } else {
            $result = array(
                "success"   => false,
                "msg"       => "Login ou Senha inválidos!",
                "data"      => null
            );
        }   
        $resultdb->close (); 
    }
    echo json_encode($result);
}