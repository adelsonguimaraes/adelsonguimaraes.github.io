<?php
/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class Conexao {
	private $con;

	protected function __construct () {
		// $this->con = mysqli_connect("mysql.adelsonguimaraes.com.br","adelsonguimarae4","1ncubu5@2019", "adelsonguimaraes4");
		$this->con = mysqli_connect("localhost","root","", "incubus");
		if (mysqli_connect_error()) {
			echo "Falha na conexão com MySQL: " . mysqli_connect_error();
		}
	}
	public static function getInstance () {
		static $instance = null;
		if (null === $instance){
			$instance = new static();
		}
		return $instance;
	}
	public function getConexao () {
		mysqli_query($this->con, "SET NAMES 'utf8'");
		mysqli_query($this->con, 'SET character_set_connection=utf8');
		mysqli_query($this->con, 'SET character_set_client=utf8');
		mysqli_query($this->con, 'SET character_set_result=utf8');
		return $this->con;
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>