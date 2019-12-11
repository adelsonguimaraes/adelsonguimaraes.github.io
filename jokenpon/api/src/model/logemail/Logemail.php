<?php
// model : logemail

/*
	Projeto: INCUBUS - Gestão de Consultoria de Vendas.
	Project Owner: Raquel Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-08-07T23:16:08.179Z.
	Data Atual: 08/08/2019.
*/

Class Logemail implements JsonSerializable {
	//atributos
	private $id;
	private $idclasse;
	private $classe;
	private $assunto;
	private $conteudo;
	private $destinatario;
	private $status;
	private $retorno;
	private $datacadastro;

	//constutor
	public function __construct
	(
		$id = NULL,
		$idclasse = NULL,
		$classe = NULL,
		$assunto = NULL,
		$conteudo = NULL,
		$destinatario = NULL,
		$status = NULL,
		$retorno = NULL,
		$datacadastro = NULL
	)
	{
		$this->id	= $id;
		$this->idclasse	= $idclasse;
		$this->classe	= $classe;
		$this->assunto	= $assunto;
		$this->conteudo	= $conteudo;
		$this->destinatario	= $destinatario;
		$this->status	= $status;
		$this->retorno	= $retorno;
		$this->datacadastro	= $datacadastro;
	}

	//Getters e Setters
	public function getId() {
		return $this->id;
	}
	public function setId($id) {
		$this->id = $id;
		return $this;
	}
	public function getIdclasse() {
		return $this->idclasse;
	}
	public function setIdclasse($idclasse) {
		$this->idclasse = $idclasse;
		return $this;
	}
	public function getClasse() {
		return $this->classe;
	}
	public function setClasse($classe) {
		$this->classe = $classe;
		return $this;
	}
	public function getAssunto() {
		return $this->assunto;
	}
	public function setAssunto($assunto) {
		$this->assunto = $assunto;
		return $this;
	}
	public function getConteudo() {
		return $this->conteudo;
	}
	public function setConteudo($conteudo) {
		$this->conteudo = $conteudo;
		return $this;
	}
	public function getDestinatario() {
		return $this->destinatario;
	}
	public function setDestinatario($destinatario) {
		$this->destinatario = $destinatario;
		return $this;
	}
	public function getStatus() {
		return $this->status;
	}
	public function setStatus($status) {
		$this->status = $status;
		return $this;
	}
	public function getRetorno() {
		return $this->retorno;
	}
	public function setRetorno($retorno) {
		$this->retorno = $retorno;
		return $this;
	}
	public function getDatacadastro() {
		return $this->datacadastro;
	}
	public function setDatacadastro($datacadastro) {
		$this->datacadastro = $datacadastro;
		return $this;
	}

	//Json Serializable
	public function JsonSerialize () {
		return [
			"id"	=> $this->id,
			"idclasse"	=> $this->idclasse,
			"classe"	=> $this->classe,
			"assunto"	=> $this->assunto,
			"conteudo"	=> $this->conteudo,
			"destinatario"	=> $this->destinatario,
			"status"	=> $this->status,
			"retorno"	=> $this->retorno,
			"datacadastro"	=> $this->datacadastro
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>