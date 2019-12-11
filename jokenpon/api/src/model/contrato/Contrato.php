<?php
// model : contrato

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class Contrato implements JsonSerializable {
	//atributos
	private $id;
	private $objsimulacao;
	private $codigo;
	private $dacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Simulacao $objsimulacao = NULL,
		$codigo = NULL,
		$dacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objsimulacao	= $objsimulacao;
		$this->codigo	= $codigo;
		$this->dacadastro	= $dacadastro;
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
	public function getObjsimulacao() {
		return $this->objsimulacao;
	}
	public function setObjsimulacao($objsimulacao) {
		$this->objsimulacao = $objsimulacao;
		return $this;
	}
	public function getCodigo() {
		return $this->codigo;
	}
	public function setCodigo($codigo) {
		$this->codigo = $codigo;
		return $this;
	}
	public function getDacadastro() {
		return $this->dacadastro;
	}
	public function setDacadastro($dacadastro) {
		$this->dacadastro = $dacadastro;
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
			"objsimulacao"	=> $this->objsimulacao,
			"codigo"	=> $this->codigo,
			"dacadastro"	=> $this->dacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>