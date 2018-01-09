<?php
// dao : usuario

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 20/06/2016.
	Data Atual: 29/06/2016.
*/

Class UsuarioDAO {
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
	function cadastrar (Usuario $obj) {
		$this->sql = sprintf("INSERT INTO usuario(nome, usuario, senha, ativo)
		VALUES('%s', '%s', '%s', '%s')",
			mysqli_real_escape_string($this->con, $obj->getNome()),
			mysqli_real_escape_string($this->con, $obj->getUsuario()),
			mysqli_real_escape_string($this->con, $obj->getSenha()),
			mysqli_real_escape_string($this->con, $obj->getAtivo()));
		if(!mysqli_query($this->con, $this->sql)) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Cadastrar) | Erro('.mysqli_error($this->con).')');
		}
		return mysqli_insert_id($this->con);
	}

	//buscarPorId
	function buscarPorId (Usuario $obj) {
		$this->sql = sprintf("SELECT * FROM usuario WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(BuscarPorId) | Erro('.mysqli_error($this->con).')');
		}
		while($row = mysqli_fetch_object($resultSet)) {
			$this->obj = new Usuario($row->id, $row->nome, $row->usuario, $row->senha, $row->ativo, $row->datacadastro, $row->dataedicao);
		}
		return $this->obj;
	}

	//listar
	function listar (Usuario $obj) {
		$this->sql = "SELECT * FROM usuario";
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class(Banco) | Metodo(Listar) | Erro('.mysqli_error($this->con).')');
		}
		while($row = mysqli_fetch_object($resultSet)) {
			$this->obj = new Usuario($row->id, $row->nome, $row->usuario, $row->senha, $row->ativo, $row->datacadastro, $row->dataedicao);
			array_push($this->lista, $this->obj);
		}
		return $this->lista;
	}

	//atualizar
	function atualizar (Usuario $obj) {
		$this->sql = sprintf("UPDATE usuario SET nome = '%s', usuario = '%s', senha = '%s', ativo = '%s', dataedicao = '%s' WHERE id = %d ",
			mysqli_real_escape_string($this->con, $obj->getNome()),
			mysqli_real_escape_string($this->con, $obj->getUsuario()),
			mysqli_real_escape_string($this->con, $obj->getSenha()),
			mysqli_real_escape_string($this->con, $obj->getAtivo()),
			mysqli_real_escape_string($this->con, date('Y-m-d')),
			mysqli_real_escape_string($this->con, $obj->getId()));
		if(!mysqli_query($this->con, $this->sql)) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Atualizar) | Erro('.mysqli_error($this->con).')');
		}
		return mysqli_insert_id($this->con);
	}

	//deletar
	function deletar (Usuario $obj) {
		$this->sql = sprintf("DELETE FROM usuario WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Deletar) | Erro('.mysqli_error($this->con).')');
		}
		return true;
	}

	//listar paginado
	function listarPaginado($start, $limit) {
		$this->sql = "SELECT * FROM usuario limit " . $start . ", " . $limit;
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
		$this->sql = "SELECT count(*) as quantidade FROM usuario";
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