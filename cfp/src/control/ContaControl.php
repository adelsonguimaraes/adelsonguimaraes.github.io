<?php
// control : conta

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimaães.
	Data de início: 12/01/2018.
	Data Atual: 12/01/2018.
*/

Class ContaControl {
	//atributos
	protected $con;
	protected $obj;
	protected $objDAO;

	//construtor
	public function __construct(Conta $obj=NULL) {
		$this->con = Conexao::getInstance()->getConexao();
		$this->objDAO = new ContaDAO($this->con);
		$this->obj = $obj;
	}

	//metodos
	function cadastrar () {
		return $this->objDAO->cadastrar($this->obj);
	}
	function buscarPorId () {
		return $this->objDAO->buscarPorId($this->obj);
	}
	function listar () {
		return $this->objDAO->listar();
	}
	function listarContasPorUsuario ($idusuario) {
		return $this->objDAO->listarContasPorUsuario($idusuario);
	}
	function listarContasAtivasPorUsuario ($idusuario) {
		return $this->objDAO->listarContasAtivasPorUsuario($idusuario);
	}
	function listarNotIn ($in, $idusuario) {
		return $this->objDAO->listarNotIn($in, $idusuario);
	}
	function listarContasAPagarPorUsuario ($idusuario) {
		return $this->objDAO->listarContasAPagarPorUsuario($idusuario);
	}
	function listarContasAReceberPorUsuario ($idusuario) {
		return $this->objDAO->listarContasAReceberPorUsuario($idusuario);
	}
	function atualizar () {
		return $this->objDAO->atualizar($this->obj);
	}
	function deletar () {
		return $this->objDAO->deletar($this->obj);
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