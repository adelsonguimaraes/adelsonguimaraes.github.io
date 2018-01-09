<?php
// model : recebimentoparcela

/*
	Projeto: CFP - (Controle Financeiro Pessoal).
	Project Owner: Adelson Guimarães.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 09/01/2018.
	Data Atual: 09/01/2018.
*/

Class Recebimentoparcela implements JsonSerializable {
	//atributos
	private $id;
	private $objrecebimento;
	private $valor;
	private $valorrecebido;
	private $datavencimento;
	private $datarecebimento;
	private $status;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Recebimento $objrecebimento = NULL,
		$valor = NULL,
		$valorrecebido = NULL,
		$datavencimento = NULL,
		$datarecebimento = NULL,
		$status = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objrecebimento	= $objrecebimento;
		$this->valor	= $valor;
		$this->valorrecebido	= $valorrecebido;
		$this->datavencimento	= $datavencimento;
		$this->datarecebimento	= $datarecebimento;
		$this->status	= $status;
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
	public function getObjrecebimento() {
		return $this->objrecebimento;
	}
	public function setObjrecebimento($objrecebimento) {
		$this->objrecebimento = $objrecebimento;
		return $this;
	}
	public function getValor() {
		return $this->valor;
	}
	public function setValor($valor) {
		$this->valor = $valor;
		return $this;
	}
	public function getValorrecebido() {
		return $this->valorrecebido;
	}
	public function setValorrecebido($valorrecebido) {
		$this->valorrecebido = $valorrecebido;
		return $this;
	}
	public function getDatavencimento() {
		return $this->datavencimento;
	}
	public function setDatavencimento($datavencimento) {
		$this->datavencimento = $datavencimento;
		return $this;
	}
	public function getDatarecebimento() {
		return $this->datarecebimento;
	}
	public function setDatarecebimento($datarecebimento) {
		$this->datarecebimento = $datarecebimento;
		return $this;
	}
	public function getStatus() {
		return $this->status;
	}
	public function setStatus($status) {
		$this->status = $status;
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
			"objrecebimento"	=> $this->objrecebimento,
			"valor"	=> $this->valor,
			"valorrecebido"	=> $this->valorrecebido,
			"datavencimento"	=> $this->datavencimento,
			"datarecebimento"	=> $this->datarecebimento,
			"status"	=> $this->status,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>