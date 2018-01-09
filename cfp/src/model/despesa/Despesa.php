<?php
// model : despesa

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 20/06/2016.
	Data Atual: 29/06/2016.
*/

Class Despesa implements JsonSerializable {
	//atributos
	private $id;
	private $objusuario;
	private $descricao;
	private $valor;
	private $quantidade;
	private $prestacoes;
	private $dataaquisicao;
	private $datavencimento;
	private $ativo;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Usuario $objusuario = NULL,
		$descricao = NULL,
		$valor = NULL,
		$quantidade = NULL,
		$prestacoes = NULL,
		$dataaquisicao = NULL,
		$datavencimento = NULL,
		$ativo = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objusuario	= $objusuario;
		$this->descricao	= $descricao;
		$this->valor	= $valor;
		$this->quantidade	= $quantidade;
		$this->prestacoes	= $prestacoes;
		$this->dataaquisicao	= $dataaquisicao;
		$this->datavencimento	= $datavencimento;
		$this->ativo	= $ativo;
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
	public function getObjusuario() {
		return $this->objusuario;
	}
	public function setObjusuario($objusuario) {
		$this->objusuario = $objusuario;
		return $this;
	}
	public function getDescricao() {
		return $this->descricao;
	}
	public function setDescricao($descricao) {
		$this->descricao = $descricao;
		return $this;
	}
	public function getValor() {
		return $this->valor;
	}
	public function setValor($valor) {
		$this->valor = $valor;
		return $this;
	}
	public function getQuantidade() {
		return $this->quantidade;
	}
	public function setQuantidade($quantidade) {
		$this->quantidade = $quantidade;
		return $this;
	}
	public function getPrestacoes() {
		return $this->prestacoes;
	}
	public function setPrestacoes($prestacoes) {
		$this->prestacoes = $prestacoes;
		return $this;
	}
	public function getDataaquisicao() {
		return $this->dataaquisicao;
	}
	public function setDataaquisicao($dataaquisicao) {
		$this->dataaquisicao = $dataaquisicao;
		return $this;
	}
	public function getDatavencimento() {
		return $this->datavencimento;
	}
	public function setDatavencimento($datavencimento) {
		$this->datavencimento = $datavencimento;
		return $this;
	}
	public function getAtivo() {
		return $this->ativo;
	}
	public function setAtivo($ativo) {
		$this->ativo = $ativo;
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
			"objusuario"	=> $this->objusuario,
			"descricao"	=> $this->descricao,
			"valor"	=> $this->valor,
			"quantidade"	=> $this->quantidade,
			"prestacoes"	=> $this->prestacoes,
			"dataaquisicao"	=> $this->dataaquisicao,
			"datavencimento"	=> $this->datavencimento,
			"ativo"	=> $this->ativo,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>