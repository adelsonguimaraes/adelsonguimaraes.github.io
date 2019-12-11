<?php
// control : logemail

/*
	Projeto: INCUBUS - Gestão de Consultoria de Vendas.
	Project Owner: Raquel Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-08-07T23:16:08.179Z.
	Data Atual: 08/08/2019.
*/

Class LogemailControl {
	//atributos
	protected $con;
	protected $obj;
	protected $objDAO;

	//construtor
	public function __construct(Logemail $obj=NULL) {
		$this->con = Conexao::getInstance()->getConexao();
		$this->objDAO = new LogemailDAO($this->con);
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