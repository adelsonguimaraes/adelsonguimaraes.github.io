<?php
// model : usuario

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Gerente de Projeto: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:18:31.633Z.
	Data Atual: 26/07/2019.
*/

Class Usuario implements JsonSerializable {
	//atributos
	private $id;
	private $objusuario;
	private $perfil;
	private $nome;
	private $celular;
	private $email;
	private $senha;
	private $porcentagem;
	private $ativo;
	private $auth;
	private $foto;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Usuario $objusuario = NULL,
		$perfil = NULL,
		$nome = NULL,
		$celular = NULL,
		$email = NULL,
		$senha = NULL,
		$porcentagem = NULL,
		$ativo = NULL,
		$auth = NULL,
		$foto = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objusuario	= $objusuario;
		$this->perfil	= $perfil;
		$this->nome	= $nome;
		$this->celular	= $celular;
		$this->email	= $email;
		$this->senha	= $senha;
		$this->porcentagem	= $porcentagem;
		$this->ativo	= $ativo;
		$this->auth	= $auth;
		$this->foto = $foto;
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
	public function getPerfil() {
		return $this->perfil;
	}
	public function setPerfil($perfil) {
		$this->perfil = $perfil;
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
	public function getSenha() {
		return $this->senha;
	}
	public function setSenha($senha) {
		$this->senha = $senha;
		return $this;
	}
	public function getPorcentagem() {
		return $this->porcentagem;
	}
	public function setPorcentagem($porcentagem) {
		$this->porcentagem = $porcentagem;
		return $this;
	}
	public function getAtivo() {
		return $this->ativo;
	}
	public function setAtivo($ativo) {
		$this->ativo = $ativo;
		return $this;
	}
	public function getAuth() {
		return $this->auth;
	}
	public function setAuth($auth) {
		$this->auth = $auth;
		return $this;
	}
	public function getFoto() {
		return $this->foto;
	}
	public function setFoto($foto) {
		$this->foto = $foto;
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
			"perfil"	=> $this->perfil,
			"nome"	=> $this->nome,
			"celular"	=> $this->celular,
			"email"	=> $this->email,
			"senha"	=> $this->senha,
			"porcentagem"	=> $this->porcentagem,
			"ativo"	=> $this->ativo,
			"auth"	=> $this->auth,
			"foto"	=> $this->foto,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>