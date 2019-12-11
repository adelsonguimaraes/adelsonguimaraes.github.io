<?php
// model : simulacao

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class Simulacao implements JsonSerializable {
	//atributos
	private $id;
	private $objcliente;
	private $valorcliente;
	private $entradacliente;
	private $parcelacliente;
	private $valoirfinal;
	private $entradafinal;
	private $parcelafinal;
	private $taxaadministrativa;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Cliente $objcliente = NULL,
		$valorcliente = NULL,
		$entradacliente = NULL,
		$parcelacliente = NULL,
		$valoirfinal = NULL,
		$entradafinal = NULL,
		$parcelafinal = NULL,
		$taxaadministrativa = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objcliente	= $objcliente;
		$this->valorcliente	= $valorcliente;
		$this->entradacliente	= $entradacliente;
		$this->parcelacliente	= $parcelacliente;
		$this->valoirfinal	= $valoirfinal;
		$this->entradafinal	= $entradafinal;
		$this->parcelafinal	= $parcelafinal;
		$this->taxaadministrativa	= $taxaadministrativa;
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
	public function getObjcliente() {
		return $this->objcliente;
	}
	public function setObjcliente($objcliente) {
		$this->objcliente = $objcliente;
		return $this;
	}
	public function getValorcliente() {
		return $this->valorcliente;
	}
	public function setValorcliente($valorcliente) {
		$this->valorcliente = $valorcliente;
		return $this;
	}
	public function getEntradacliente() {
		return $this->entradacliente;
	}
	public function setEntradacliente($entradacliente) {
		$this->entradacliente = $entradacliente;
		return $this;
	}
	public function getParcelacliente() {
		return $this->parcelacliente;
	}
	public function setParcelacliente($parcelacliente) {
		$this->parcelacliente = $parcelacliente;
		return $this;
	}
	public function getValoirfinal() {
		return $this->valoirfinal;
	}
	public function setValoirfinal($valoirfinal) {
		$this->valoirfinal = $valoirfinal;
		return $this;
	}
	public function getEntradafinal() {
		return $this->entradafinal;
	}
	public function setEntradafinal($entradafinal) {
		$this->entradafinal = $entradafinal;
		return $this;
	}
	public function getParcelafinal() {
		return $this->parcelafinal;
	}
	public function setParcelafinal($parcelafinal) {
		$this->parcelafinal = $parcelafinal;
		return $this;
	}
	public function getTaxaadministrativa() {
		return $this->taxaadministrativa;
	}
	public function setTaxaadministrativa($taxaadministrativa) {
		$this->taxaadministrativa = $taxaadministrativa;
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
			"objcliente"	=> $this->objcliente,
			"valorcliente"	=> $this->valorcliente,
			"entradacliente"	=> $this->entradacliente,
			"parcelacliente"	=> $this->parcelacliente,
			"valoirfinal"	=> $this->valoirfinal,
			"entradafinal"	=> $this->entradafinal,
			"parcelafinal"	=> $this->parcelafinal,
			"taxaadministrativa"	=> $this->taxaadministrativa,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>