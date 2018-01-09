<?php
// dao : fluxorecebimento

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 20/06/2016.
	Data Atual: 29/06/2016.
*/

Class FluxorecebimentoDAO {
	//atributos
	private $con;
	private $sql;
	private $obj;
	private $lista = array();

	//construtor
	public function __construct($con) {
		$this->con = $con;
	}

	//cadastrar
	function cadastrar (Fluxorecebimento $obj) {
		$this->sql = sprintf("INSERT INTO fluxorecebimento(idrecebimento, valor)
		VALUES(%d, %f)",
			mysqli_real_escape_string($this->con, $obj->getObjrecebimento()->getId()),
			mysqli_real_escape_string($this->con, $obj->getValor()));
		if(!mysqli_query($this->con, $this->sql)) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Cadastrar) | Erro('.mysqli_error($this->con).')');
		}
		return mysqli_insert_id($this->con);
	}

	//buscarPorId
	function buscarPorId (Fluxorecebimento $obj) {
		$this->sql = sprintf("SELECT * FROM fluxorecebimento WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(BuscarPorId) | Erro('.mysqli_error($this->con).')');
		}
		while($row = mysqli_fetch_object($resultSet)) {
			//classe recebimento
			$controlRecebimento = new RecebimentoControl(new Recebimento($row->idrecebimento));
			$objRecebimento = $controlRecebimento->buscarPorId();
			$this->obj = new Fluxorecebimento($row->id, $objRecebimento, $row->valor, $row->datacadastro, $row->dataedicao);
		}
		return $this->obj;
	}

	//listar
	function listar (Fluxorecebimento $obj) {
		$this->sql = "SELECT * FROM fluxorecebimento";
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class(Banco) | Metodo(Listar) | Erro('.mysqli_error($this->con).')');
		}
		while($row = mysqli_fetch_object($resultSet)) {
			//classe recebimento
			$controlRecebimento = new RecebimentoControl(new Recebimento($row->idrecebimento));
			$objRecebimento = $controlRecebimento->buscarPorId();
			$this->obj = new Fluxorecebimento($row->id, $objRecebimento, $row->valor, $row->datacadastro, $row->dataedicao);
			array_push($this->lista, $this->obj);
		}
		return $this->lista;
	}

	//atualizar
	function atualizar (Fluxorecebimento $obj) {
		$this->sql = sprintf("UPDATE fluxorecebimento SET idrecebimento = %d, valor = %f, dataedicao = '%s' WHERE id = %d ",
			mysqli_real_escape_string($this->con, $obj->getObjrecebimento()->getId()),
			mysqli_real_escape_string($this->con, $obj->getValor()),
			mysqli_real_escape_string($this->con, date('Y-m-d')),
			mysqli_real_escape_string($this->con, $obj->getId()));
		if(!mysqli_query($this->con, $this->sql)) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Atualizar) | Erro('.mysqli_error($this->con).')');
		}
		return mysqli_insert_id($this->con);
	}

	//deletar
	function deletar (Fluxorecebimento $obj) {
		$this->sql = sprintf("DELETE FROM fluxorecebimento WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Deletar) | Erro('.mysqli_error($this->con).')');
		}
		return true;
	}

	//listar paginado
	function listarPaginado($start, $limit) {
		$this->sql = "SELECT * FROM fluxorecebimento limit " . $start . ", " . $limit;
		$result = mysqli_query ( $this->con, $this->sql );
		if (! $result) {
			die ( '[ERRO]: ' . mysqli_error ( $this->con ) );
		}
		$this->lista = array();
		while ( $row = mysqli_fetch_assoc ( $result ) ) {
			$this->lista=$row;
		}
		//teste
		return $this->lista;
	}
	//quantidade total
	function qtdTotal() {
		$this->sql = "SELECT count(*) as quantidade FROM fluxorecebimento";
		$result = mysqli_query ( $this->con, $this->sql );
		if (! $result) {
			die ( '[ERRO]: ' . mysqli_error ( $this->con ) );
		}
		$total = 0;
		while ( $row = mysqli_fetch_object ( $result ) ) {
			$total = $row->quantidade;
		}
		return $total;
	}
}

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>