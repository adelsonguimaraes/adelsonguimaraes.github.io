<?php
// model : despesaparcela

/*
	Projeto: CFP - (Controle Financeiro Pessoal).
	Project Owner: Adelson Guimarães.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 09/01/2018.
	Data Atual: 09/01/2018.
*/

Class Despesaparcela implements JsonSerializable {
	//atributos
	private $id;
	private $objdespesa;
	private $valor;
	private $valorpago;
	private $datavencimento;
	private $datapagamento;
	private $status;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Despesa $objdespesa = NULL,
		$valor = NULL,
		$valorpago = NULL,
		$datavencimento = NULL,
		$datapagamento = NULL,
		$status = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objdespesa	= $objdespesa;
		$this->valor	= $valor;
		$this->valorpago	= $valorpago;
		$this->datavencimento	= $datavencimento;
		$this->datapagamento	= $datapagamento;
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
	public function getObjdespesa() {
		return $this->objdespesa;
	}
	public function setObjdespesa($objdespesa) {
		$this->objdespesa = $objdespesa;
		return $this;
	}
	public function getValor() {
		return $this->valor;
	}
	public function setValor($valor) {
		$this->valor = $valor;
		return $this;
	}
	public function getValorpago() {
		return $this->valorpago;
	}
	public function setValorpago($valorpago) {
		$this->valorpago = $valorpago;
		return $this;
	}
	public function getDatavencimento() {
		return $this->datavencimento;
	}
	public function setDatavencimento($datavencimento) {
		$this->datavencimento = $datavencimento;
		return $this;
	}
	public function getDatapagamento() {
		return $this->datapagamento;
	}
	public function setDatapagamento($datapagamento) {
		$this->datapagamento = $datapagamento;
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
			"objdespesa"	=> $this->objdespesa,
			"valor"	=> $this->valor,
			"valorpago"	=> $this->valorpago,
			"datavencimento"	=> $this->datavencimento,
			"datapagamento"	=> $this->datapagamento,
			"status"	=> $this->status,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>