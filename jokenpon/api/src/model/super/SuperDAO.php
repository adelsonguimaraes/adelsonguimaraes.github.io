<?php
// dao : super

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class SuperDAO {
	//atributos
	private $con;
	private $tabela;
	private $success = false;
	private $data;
	private $msg;
	private $total = 0;

	//construtor
	public function __construct( $tabela ) {
		$this->con = Conexao::getInstance()->getConexao();		$this->tabela = $tabela;
	}

	/*Gets Sets*
	* @return mixed
	*/
	public function getTabela()
	{
		return $this->tabela;
	}

	/**
	* @param mixed $tabela
	* @return SuperDAO
	*/
	public function setTabela($tabela)
	{
		$this->tabela = $tabela;
		return $this;
	}

	/**
	* @return mixed
	*/
	public function getSuccess()
	{
		return $this->success;
	}

	/**
	* @param mixed $success
	* @return SuperDAO
	*/
	public function setSuccess($success)
	{
	    $this->success = $success;
	    return $this;
	}

	/**
	* @return mixed
	*/
	public function getData()
	{
	    return $this->data;
	}

	/**
	* @param mixed $data
	* @return SuperDAO
	*/
	public function setData($data)
	{
	    $this->data = $data;
		return $this;
	}

	/**
	* @return mixed
	*/
	public function getMsg()
	{
	    return $this->msg;
	}

	/**
	* @param mixed $msg
	* @return SuperDAO
	*/
	public function setMsg($msg)
	{
		$this->msg = $msg;
		return $this;
	}

	public function getTotal () {
		return $this->total;
	}

	public function setTotal ( $total ) {
		$this->total = $total;
		return $this->total;
	}

	//verifica dependentes
	function verificaDependentes( $id )
	{
	    $count = 0;
	    $nome_banco = "";
	    if ($resultado = mysqli_query($this->con, "SELECT DATABASE()")) {
	        $nome_banco = mysqli_fetch_row( $resultado );
	    }

	    $this->sql = "SELECT TABLE_NAME, COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE";
	    $this->sql .= " WHERE TABLE_SCHEMA = '" . $nome_banco[0] . "' AND REFERENCED_TABLE_NAME = '" . $this->tabela . "' GROUP BY TABLE_NAME";
	    $result = mysqli_query($this->con, $this->sql);
	    if ( !$result ) die ( mysqli_error( $this->con) );

	    while ( $row = mysqli_fetch_object( $result ) ) {
	        $this->sql = "SELECT COUNT(*) AS total FROM $row->TABLE_NAME WHERE $row->COLUMN_NAME = $id";
	        $result2 = mysqli_query( $this->con, $this->sql );
	        if ( !$result2 ) die ( mysqli_error( $this->con ) );
	        $row2 = mysqli_fetch_object( $result2 );
	        $count = $count + $row2->total;
	    }

		return $count;
	}

	//cadastrar
	function resetResponse () {
		$this->success = false;
		$this->data = "";
		$this->msg = "";
		$this->total = 0;
	}

	//cadastrar
	function getResponse () {
		return array( 'success' => $this->success, 'data' => $this->data, 'msg' => $this->msg, 'total' => $this->total );
	}

}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>