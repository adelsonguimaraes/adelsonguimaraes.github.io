<?php
// model : taxaadministrativa

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class Taxaadministrativa implements JsonSerializable {
	//atributos
	private $id;
	private $objtipotaxa;
	private $codigo;
	private $taxa;
	private $porcentagem;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Tipotaxa $objtipotaxa = NULL,
		$codigo = NULL,
		$taxa = NULL,
		$porcentagem = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objtipotaxa	= $objtipotaxa;
		$this->codigo	= $codigo;
		$this->taxa	= $taxa;
		$this->porcentagem	= $porcentagem;
		$this->datacadastro	= $datacadastro;
		$this->dataedicao	= $dataedicao;
	}

	//Getters e Setters
	public function getId() {
		return $this->id;
	}
	public function setId($id) {
		$this->id = $id;
		return $this;
	}
	public function getObjtipotaxa() {
		return $this->objtipotaxa;
	}
	public function setObjtipotaxa($objtipotaxa) {
		$this->objtipotaxa = $objtipotaxa;
		return $this;
	}
	public function getCodigo() {
		return $this->codigo;
	}
	public function setCodigo($codigo) {
		$this->codigo = $codigo;
		return $this;
	}
	public function getTaxa() {
		return $this->taxa;
	}
	public function setTaxa($taxa) {
		$this->taxa = $taxa;
		return $this;
	}
	public function getPorcentagem() {
		return $this->porcentagem;
	}
	public function setPorcentagem($porcentagem) {
		$this->porcentagem = $porcentagem;
		return $this;
	}
	public function getDatacadastro() {
		return $this->datacadastro;
	}
	public function setDatacadastro($datacadastro) {
		$this->datacadastro = $datacadastro;
		return $this;
	}
	public function getDataedicao() {
		return $this->dataedicao;
	}
	public function setDataedicao($dataedicao) {
		$this->dataedicao = $dataedicao;
		return $this;
	}

	//Json Serializable
	public function JsonSerialize () {
		return [
			"id"	=> $this->id,
			"objtipotaxa"	=> $this->objtipotaxa,
			"codigo"	=> $this->codigo,
			"taxa"	=> $this->taxa,
			"porcentagem"	=> $this->porcentagem,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>