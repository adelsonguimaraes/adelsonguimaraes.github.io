<?php
// control : despesa

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 20/06/2016.
	Data Atual: 29/06/2016.
*/

Class DespesaControl {
	//atributos
	protected $con;
	protected $obj;
	protected $objDAO;

	//construtor
	public function __construct(Despesa $obj=NULL) {
		$this->con = Conexao::getInstance()->getConexao();
		$this->objDAO = new DespesaDAO($this->con);
		$this->obj = $obj;
	}

	//metodos
	function cadastrar () {
		return $this->objDAO->cadastrar($this->obj);
	}
	function atualizar () {
		return $this->objDAO->atualizar($this->obj);
	}
	function buscarPorId () {
		return $this->objDAO->buscarPorId($this->obj);
	}
	function listar () {
		return $this->objDAO->listar();
	}
	function listarPaginado ( $start, $limit ) {
	return $this->objDAO->listarPaginado($start, $limit);
	}
	function listarPorUsuario ( $idusuario ) {
	return $this->objDAO->listarPorUsuario( $idusuario );
	}
	function deletar () {
		return $this->objDAO->deletar($this->obj);
	}
	function qtdTotal () {
		return $this->objDAO->qtdTotal();
	}
}

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>