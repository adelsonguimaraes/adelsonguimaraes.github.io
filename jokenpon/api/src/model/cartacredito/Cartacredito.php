<?php
// model : cartacredito

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class Cartacredito implements JsonSerializable {
	//atributos
	private $id;
	private $objtaxaadministrativa;
	private $valor;
	private $entrada;
	private $parcela;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Taxaadministrativa $objtaxaadministrativa = NULL,
		$valor = NULL,
		$entrada = NULL,
		$parcela = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objtaxaadministrativa	= $objtaxaadministrativa;
		$this->valor	= $valor;
		$this->entrada	= $entrada;
		$this->parcela	= $parcela;
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
	public function getObjtaxaadministrativa() {
		return $this->objtaxaadministrativa;
	}
	public function setObjtaxaadministrativa($objtaxaadministrativa) {
		$this->objtaxaadministrativa = $objtaxaadministrativa;
		return $this;
	}
	public function getValor() {
		return $this->valor;
	}
	public function setValor($valor) {
		$this->valor = $valor;
		return $this;
	}
	public function getEntrada() {
		return $this->entrada;
	}
	public function setEntrada($entrada) {
		$this->entrada = $entrada;
		return $this;
	}
	public function getParcela() {
		return $this->parcela;
	}
	public function setParcela($parcela) {
		$this->parcela = $parcela;
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
			"objtaxaadministrativa"	=> $this->objtaxaadministrativa,
			"valor"	=> $this->valor,
			"entrada"	=> $this->entrada,
			"parcela"	=> $this->parcela,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>