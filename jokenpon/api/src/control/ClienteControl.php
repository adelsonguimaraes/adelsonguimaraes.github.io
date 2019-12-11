<?php
// control : cliente

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class ClienteControl {
	//atributos
	protected $con;
	protected $obj;
	protected $objDAO;

	//construtor
	public function __construct(Cliente $obj=NULL) {
		$this->con = Conexao::getInstance()->getConexao();
		$this->objDAO = new ClienteDAO($this->con);
		$this->obj = $obj;
	}

	//metodos
	function cadastrar () {
		return $this->objDAO->cadastrar($this->obj);
	}
	function atualizar () {
		return $this->objDAO->atualizar($this->obj);
	}
	function atualizarVerHome ($id) {
		return $this->objDAO->atualizarVerHome($id);
	}
	function compartilhar ($idusuario, $idconsultor, $idcliente) {
		return $this->objDAO->compartilhar ($idusuario, $idconsultor, $idcliente);
	}
	function descompartilhar ($idusuario, $idconsultor, $idcliente) {
		return $this->objDAO->descompartilhar ($idusuario, $idconsultor, $idcliente);
	}
	function importar ($idusuario, $idusuarioantigo) {
		return $this->objDAO->importar ($idusuario, $idusuarioantigo);
	}
	function buscarPorId () {
		return $this->objDAO->buscarPorId($this->obj);
	}
	function buscarClienteExistente ($email, $celular) {
		return $this->objDAO->buscarClienteExistente($email, $celular);
	}
	function listarTudo ($idusuario) {
		return $this->objDAO->listarTudo($idusuario);
	}
	function listarVerNaHome ($idusuario) {
		return $this->objDAO->listarVerNaHome($idusuario);
	}
	function listarParaCompartilhar ($idusuario, $idconsultor) {
		return $this->objDAO->listarParaCompartilhar ($idusuario, $idconsultor);
	}
	function filtrar ($idusuario, $data) {
		return $this->objDAO->filtrar($idusuario, $data);
	}	
	function deletar () {
		return $this->objDAO->deletar($this->obj);
	}
	function listarPaginado ($idusuario, $start, $limit) {
		return $this->objDAO->listarPaginado($idusuario, $start, $limit);
	}
	function listarCompartilhadosPaginado ($idusuario, $start, $limit) {
		return $this->objDAO->listarCompartilhadosPaginado($idusuario, $start, $limit);
		}
	function qtdTotal () {
		return $this->objDAO->qtdTotal();
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>