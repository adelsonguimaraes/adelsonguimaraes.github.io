<?php
// control : agenda

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class AgendaControl {
	//atributos
	protected $con;
	protected $obj;
	protected $objDAO;

	//construtor
	public function __construct(Agenda $obj=NULL) {
		$this->con = Conexao::getInstance()->getConexao();
		$this->objDAO = new AgendaDAO($this->con);
		$this->obj = $obj;
	}

	//metodos
	function cadastrar () {
		return $this->objDAO->cadastrar($this->obj);
	}
	function buscarPorId () {
		return $this->objDAO->buscarPorId($this->obj);
	}
	function listar ($idusuario) {
		return $this->objDAO->listar($idusuario);
	}
	function listarOrdenadoPorData ($idusuario) {
		return $this->objDAO->listarOrdenadoPorData($idusuario);
	}
	function atualizar () {
		return $this->objDAO->atualizar($this->obj);
	}
	function importar ($idusuario, $idusuarioantigo) {
		return $this->objDAO->importar ($idusuario, $idusuarioantigo);
	}
	function desativar ($idagenda) {
		return $this->objDAO->desativar($idagenda);
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