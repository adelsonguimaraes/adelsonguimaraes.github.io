<?php
// model : usuario

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimaães.
	Data de início: 12/01/2018.
	Data Atual: 12/01/2018.
*/

Class Usuario implements JsonSerializable {
	//atributos
	private $id;
	private $nome;
	private $email;
	private $senha;
	private $ativo;
	private $perfil;
	private $pushkey;
	private $sync;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		$nome = NULL,
		$email = NULL,
		$senha = NULL,
		$ativo = NULL,
		$perfil = NULL,
		$pushkey = NULL,
		$sync = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->nome	= $nome;
		$this->email	= $email;
		$this->senha	= $senha;
		$this->ativo	= $ativo;
		$this->perfil	= $perfil;
		$this->pushkey	= $pushkey;
		$this->sync = $sync;
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
	public function getNome() {
		return $this->nome;
	}
	public function setNome($nome) {
		$this->nome = $nome;
		return $this;
	}
	public function getEmail() {
		return $this->email;
	}
	public function setEmail($email) {
		$this->email = $email;
		return $this;
	}
	public function getSenha() {
		return $this->senha;
	}
	public function setSenha($senha) {
		$this->senha = $senha;
		return $this;
	}
	public function getAtivo() {
		return $this->ativo;
	}
	public function setAtivo($ativo) {
		$this->ativo = $ativo;
		return $this;
	}
	public function getPerfil() {
		return $this->perfil;
	}
	public function setPerfil($perfil) {
		$this->perfil = $perfil;
		return $this;
	}
	public function getPushkey() {
		return $this->pushkey;
	}
	public function setPushkey($pushkey) {
		$this->pushkey = $pushkey;
		return $this;
	}
	public function getSync() {
		return $this->sync;
	}
	public function setSync($sync) {
		$this->sync = $sync;
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
			"nome"	=> $this->nome,
			"email"	=> $this->email,
			"senha"	=> $this->senha,
			"ativo"	=> $this->ativo,
			"perfil"	=> $this->perfil,
			"pushkey"	=> $this->pushkey,
			"sync"	=> $this->sync,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>