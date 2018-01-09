<?php
// dao : fluxodespesa

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 20/06/2016.
	Data Atual: 29/06/2016.
*/

Class FluxodespesaDAO {
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
	function cadastrar (Fluxodespesa $obj) {
		$this->sql = sprintf("INSERT INTO fluxodespesa(iditemdespesa, valor)
		VALUES(%d, %f)",
			mysqli_real_escape_string($this->con, $obj->getObjdespesa()->getId()),
			mysqli_real_escape_string($this->con, $obj->getValor()));
		if(!mysqli_query($this->con, $this->sql)) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Cadastrar) | Erro('.mysqli_error($this->con).')');
		}
		return mysqli_insert_id($this->con);
	}

	//buscarPorId
	function buscarPorId (Fluxodespesa $obj) {
		$this->sql = sprintf("SELECT * FROM fluxodespesa WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(BuscarPorId) | Erro('.mysqli_error($this->con).')');
		}
		while($row = mysqli_fetch_object($resultSet)) {
			//classe despesa
			$controlDespesa = new DespesaControl(new Despesa($row->iditemdespesa));
			$objDespesa = $controlDespesa->buscarPorId();
			$this->obj = new Fluxodespesa($row->id, $objDespesa, $row->valor, $row->datacadastro, $row->dataedicao);
		}
		return $this->obj;
	}

	//listar
	function listar (Fluxodespesa $obj) {
		$this->sql = "SELECT * FROM fluxodespesa";
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class(Banco) | Metodo(Listar) | Erro('.mysqli_error($this->con).')');
		}
		while($row = mysqli_fetch_object($resultSet)) {
			//classe despesa
			$controlDespesa = new DespesaControl(new Despesa($row->iditemdespesa));
			$objDespesa = $controlDespesa->buscarPorId();
			$this->obj = new Fluxodespesa($row->id, $objDespesa, $row->valor, $row->datacadastro, $row->dataedicao);
			array_push($this->lista, $this->obj);
		}
		return $this->lista;
	}

	//atualizar
	function atualizar (Fluxodespesa $obj) {
		$this->sql = sprintf("UPDATE fluxodespesa SET iditemdespesa = %d, valor = %f, dataedicao = '%s' WHERE id = %d ",
			mysqli_real_escape_string($this->con, $obj->getObjdespesa()->getId()),
			mysqli_real_escape_string($this->con, $obj->getValor()),
			mysqli_real_escape_string($this->con, date('Y-m-d')),
			mysqli_real_escape_string($this->con, $obj->getId()));
		if(!mysqli_query($this->con, $this->sql)) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Atualizar) | Erro('.mysqli_error($this->con).')');
		}
		return mysqli_insert_id($this->con);
	}

	//deletar
	function deletar (Fluxodespesa $obj) {
		$this->sql = sprintf("DELETE FROM fluxodespesa WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Deletar) | Erro('.mysqli_error($this->con).')');
		}
		return true;
	}

	//listar paginado
	function listarPaginado($start, $limit) {
		$this->sql = "SELECT * FROM fluxodespesa limit " . $start . ", " . $limit;
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
		$this->sql = "SELECT count(*) as quantidade FROM fluxodespesa";
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