<?php
// model : cliente

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class Cliente implements JsonSerializable {
	//atributos
	private $id;
	private $objusuario;
	private $nome;
	private $celular;
	private $email;
	private $interesse;
	private $valor;
	private $entrada;
	private $parcela;
	private $observacao;
	private $status;
	private $verhome;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Usuario $objusuario = NULL,
		$nome = NULL,
		$celular = NULL,
		$email = NULL,
		$interesse = NULL,
		$valor = NULL,
		$entrada = NULL,
		$parcela = NULL,
		$observacao = NULL,
		$status = NULL,
		$verhome = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objusuario	= $objusuario;
		$this->nome	= $nome;
		$this->celular	= $celular;
		$this->email	= $email;
		$this->interesse = $interesse;
		$this->valor = $valor;
		$this->entrada = $entrada;
		$this->parcela = $parcela;
		$this->observacao = $observacao;
		$this->status	= $status;
		$this->verhome = $verhome;
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
	public function getNome() {
		return $this->nome;
	}
	public function setNome($nome) {
		$this->nome = $nome;
		return $this;
	}
	public function getCelular() {
		return $this->celular;
	}
	public function setCelular($celular) {
		$this->celular = $celular;
		return $this;
	}
	public function getEmail() {
		return $this->email;
	}
	public function setEmail($email) {
		$this->email = $email;
		return $this;
	}
	public function getInteresse() {
		return $this->interesse;
	}
	public function setInteresse($interesse) {
		$this->interesse = $interesse;
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
	public function getObservacao() {
		return $this->observacao;
	}
	public function setObservacao($observacao) {
		$this->observacao = $observacao;
		return $this;
	}
	public function getStatus() {
		return $this->status;
	}
	public function setStatus($status) {
		$this->status = $status;
		return $this;
	}
	public function getVerhome() {
		return $this->verhome;
	}
	public function SetVerhome($verhome) {
		$this->verhome = $verhome;
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
			"nome"	=> $this->nome,
			"celular"	=> $this->celular,
			"email"	=> $this->email,
			"interesse" => $this->interesse,
			"valor" => $this->valor,
			"entrada" => $this->entrada,
			"parcela" => $this->parcela,
			"observacao" => $this->observacao,
			"status"	=> $this->status,
			"verhome"	=> $this->verhome,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>