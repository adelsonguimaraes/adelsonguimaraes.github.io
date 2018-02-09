<?php
//  session_start();

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
    $data = $_POST['data'];
    $control = new UsuarioControl();
    echo json_encode($control->auth($data));
}
