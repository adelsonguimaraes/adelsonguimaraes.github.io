<?php
// model : conta

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimaães.
	Data de início: 12/01/2018.
	Data Atual: 12/01/2018.
*/

Class Conta implements JsonSerializable {
	//atributos
	private $id;
	private $objusuario;
	private $objcategoria;
	private $descricao;
	private $valor;
	private $parcela;
	private $indeterminada;
	private $tipo;
	private $status;
	private $datavencimento;
	private $sync;
	private $ativo;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Usuario $objusuario = NULL,
		Categoria $objcategoria = NULL,
		$descricao = NULL,
		$valor = NULL,
		$parcela = NULL,
		$indeterminada = NULL,
		$tipo = NULL,
		$status = NULL,
		$datavencimento = NULL,
		$sync = NULL,
		$ativo = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objusuario	= $objusuario;
		$this->objcategoria	= $objcategoria;
		$this->descricao	= $descricao;
		$this->valor	= $valor;
		$this->parcela	= $parcela;
		$this->indeterminada	= $indeterminada;
		$this->tipo	= $tipo;
		$this->status	= $status;
		$this->datavencimento	= $datavencimento;
		$this->sync = $sync;
		$this->ativo = $ativo;
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
	public function getObjcategoria() {
		return $this->objcategoria;
	}
	public function setObjcategoria($objcategoria) {
		$this->objcategoria = $objcategoria;
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
	public function getParcela() {
		return $this->parcela;
	}
	public function setParcela($parcela) {
		$this->parcela = $parcela;
		return $this;
	}
	public function getIndeterminada() {
		return $this->indeterminada;
	}
	public function setIndeterminada($indeterminada) {
		$this->indeterminada = $indeterminada;
		return $this;
	}
	public function getTipo() {
		return $this->tipo;
	}
	public function setTipo($tipo) {
		$this->tipo = $tipo;
		return $this;
	}
	public function getStatus() {
		return $this->status;
	}
	public function setStatus($status) {
		$this->status = $status;
		return $this;
	}
	public function getDatavencimento() {
		return $this->datavencimento;
	}
	public function setDatavencimento($datavencimento) {
		$this->datavencimento = $datavencimento;
		return $this;
	}
	public function getSync() {
		return $this->sync;
	}
	public function setSync($sync) {
		$this->sync = $sync;
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
			"objcategoria"	=> $this->objcategoria,
			"descricao"	=> $this->descricao,
			"valor"	=> $this->valor,
			"parcela"	=> $this->parcela,
			"indeterminada"	=> $this->indeterminada,
			"tipo"	=> $this->tipo,
			"status"	=> $this->status,
			"datavencimento"	=> $this->datavencimento,
			"sync" 	=> $this->sync,
			"ativo" => $this->ativo,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>