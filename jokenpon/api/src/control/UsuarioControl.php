<?php
// control : usuario

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class UsuarioControl {
	//atributos
	protected $con;
	protected $obj;
	protected $objDAO;

	//construtor
	public function __construct(Usuario $obj=NULL) {
		$this->con = Conexao::getInstance()->getConexao();
		$this->objDAO = new UsuarioDAO($this->con);
		$this->obj = $obj;
	}

	//metodos
	function cadastrar () {
		return $this->objDAO->cadastrar($this->obj);
	}
	function buscarPorId () {
		return $this->objDAO->buscarPorId($this->obj);
	}
	function buscarPorEmail ($email) {
		return $this->objDAO->buscarPorEmail($email);
	}
	function buscarInfoPageConsultor ($usuario, $identificador) {
		return $this->objDAO->buscarInfoPageConsultor($usuario, $identificador);
	}
	function listar () {
		return $this->objDAO->listar();
	}
	function listarPorSuperior ($idusuario) {
		return $this->objDAO->listarPorSuperior($idusuario);
	}
	function atualizar () {
		return $this->objDAO->atualizar($this->obj);
	}
	function atualizarMeusDados () {
		return $this->objDAO->atualizarMeusDados($this->obj);
	}
	function logar ($email, $senha) {
		return $this->objDAO->logar($email, $senha);
	}
	function setAuth ($idusuario) {
		return $this->objDAO->logar($idusuario);
	}
	function auth ($idusuario, $auth) {
		return $this->objDAO->auth($idusuario, $auth);
	}
	function setMenuConsultor ($idusuario) {
		return $this->objDAO->setMenuConsultor($idusuario);
	}
	function getMenu ($idusuario) {
		return $this->objDAO->getMenu($idusuario);
	}
	function deletar () {
		return $this->objDAO->deletar($this->obj);
	}
	function desativar ($idusuario) {
		return $this->objDAO->desativar($idusuario);
	}
	function listarPaginado ($start, $limit) {
	return $this->objDAO->listarPaginado($start, $limit);
	}
	function qtdTotal () {
		return $this->objDAO->qtdTotal();
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>