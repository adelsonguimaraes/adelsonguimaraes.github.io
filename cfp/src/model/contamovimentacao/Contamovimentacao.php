<?php
// model : contamovimentacao

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimaães.
	Data de início: 12/01/2018.
	Data Atual: 12/01/2018.
*/

Class Contamovimentacao implements JsonSerializable {
	//atributos
	private $id;
	private $objconta;
	private $valor;
	private $datareferencia;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Conta $objconta = NULL,
		$valor = NULL,
		$datareferencia = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objconta	= $objconta;
		$this->valor	= $valor;
		$this->datareferencia	= $datareferencia;
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
	public function getObjconta() {
		return $this->objconta;
	}
	public function setObjconta($objconta) {
		$this->objconta = $objconta;
		return $this;
	}
	public function getValor() {
		return $this->valor;
	}
	public function setValor($valor) {
		$this->valor = $valor;
		return $this;
	}
	public function getDatareferencia() {
		return $this->datareferencia;
	}
	public function setDatareferencia($datareferencia) {
		$this->datareferencia = $datareferencia;
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
			"objconta"	=> $this->objconta,
			"valor"	=> $this->valor,
			"datareferencia"	=> $this->datareferencia,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>