<?php
// model : tipo

/*
	Projeto: CFP - (Controle Financeiro Pessoal).
	Project Owner: Adelson Guimarães.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 09/01/2018.
	Data Atual: 09/01/2018.
*/

Class Tipo implements JsonSerializable {
	//atributos
	private $id;
	private $descricao;
	private $uso;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		$descricao = NULL,
		$uso = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->descricao	= $descricao;
		$this->uso	= $uso;
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
	public function getDescricao() {
		return $this->descricao;
	}
	public function setDescricao($descricao) {
		$this->descricao = $descricao;
		return $this;
	}
	public function getUso() {
		return $this->uso;
	}
	public function setUso($uso) {
		$this->uso = $uso;
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
			"descricao"	=> $this->descricao,
			"uso"	=> $this->uso,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>