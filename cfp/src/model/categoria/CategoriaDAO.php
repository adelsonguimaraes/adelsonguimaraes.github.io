<?php
// dao : categoria

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimaães.
	Data de início: 12/01/2018.
	Data Atual: 12/01/2018.
*/

Class CategoriaDAO {
	//atributos
	private $con;
	private $sql;
	private $obj;
	private $lista = array();
	private $superdao;

	//construtor
	public function __construct($con) {
		$this->con = $con;
		$this->superdao = new SuperDAO('categoria');
	}

	//cadastrar
	function cadastrar (categoria $obj) {
		$this->sql = sprintf("INSERT INTO categoria(descricao, tipo, sync, ativo, datacadastro, dataedicao)
		VALUES('%s', '%s', '%s', '%s', '%s', '%s')",
			mysqli_real_escape_string($this->con, $obj->getDescricao()),
			mysqli_real_escape_string($this->con, $obj->getTipo()),
			mysqli_real_escape_string($this->con, !empty($obj->getSync()) ? $obj->getSync() : 'NAO'),
			mysqli_real_escape_string($this->con, !empty($obj->getAtivo()) ? $obj->getAtivo() : 'SIM'),
			mysqli_real_escape_string($this->con, !empty($obj->getDatacadastro()) ? $obj->getDatacadastro() : date('Y-m-d H:i:s')),
			mysqli_real_escape_string($this->con, !empty($obj->getDataedicao()) ? $obj->getDataedicao() : date('Y-m-d H:i:s'))
		);

		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Cadastrar' ) );
		}else{
			$id = mysqli_insert_id( $this->con );

			$this->superdao->setSuccess( true );
			$this->superdao->setData( $id );
		}
		return $this->superdao->getResponse();
	}

	//atualizar
	function atualizar (Categoria $obj) {
		$this->sql = sprintf("UPDATE categoria SET descricao = '%s', tipo = '%s', sync = '%s', ativo = '%s', dataedicao = '%s' WHERE id = %d ",
			mysqli_real_escape_string($this->con, $obj->getDescricao()),
			mysqli_real_escape_string($this->con, $obj->getTipo()),
			mysqli_real_escape_string($this->con, !empty($obj->getSync()) ? $obj->getSync() : 'NAO'),
			mysqli_real_escape_string($this->con, !empty($obj->getAtivo()) ? $obj->getAtivo() : 'SIM'),
			mysqli_real_escape_string($this->con, !empty($obj->getDataedicao()) ? $obj->getDataedicao() : date('Y-m-d H:i:s')),
			mysqli_real_escape_string($this->con, $obj->getId()));
		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Atualizar' ) );
		}else{
			$this->superdao->setSuccess( true );
			$this->superdao->setData( true );
		}
		return $this->superdao->getResponse();
	}

	//buscarPorId
	function buscarPorId (Categoria $obj) {
		$this->sql = sprintf("SELECT * FROM categoria WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'BuscarPorId' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				$this->obj = $row;
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->obj );
		}
		return $this->superdao->getResponse();
	}

	//listar
	function listar () {
		$this->sql = "SELECT * FROM categoria";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Categoria' , 'Listar' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	function listarNotIn ($in) {
		
		$s = '';
		if (count($in) > 0) {
			$s = 'where id not in(';
			foreach ($in as $key) {
				$s .= $key['id'] . ',';
			}
			$s = substr($s, 0, -1);
			$s .= ')';
		}
		
		$this->sql = "SELECT * from categoria $s";
		
		$result = mysqli_query ( $this->con, $this->sql );
		
		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Categoria' , 'listarPorNotIn' ) );
		}else{
			while ( $row = mysqli_fetch_assoc ( $result ) ) {				
				array_push( $this->lista, $row);
			}

			$this->superdao->setSuccess( true );			
			$this->superdao->setData( $this->lista );
			$this->superdao->setTotal( count($this->lista) );
		}

		return $this->superdao->getResponse();
	}

	//listar paginado
	function listarPaginado($start, $limit) {
		$this->sql = "SELECT * FROM categoria limit " . $start . ", " . $limit;
		$result = mysqli_query ( $this->con, $this->sql );

		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Categoria' , 'ListarPaginado' ) );
		}else{
			while ( $row = mysqli_fetch_assoc ( $result ) ) {				
				array_push( $this->lista, $row);
			}

			$this->superdao->setSuccess( true );			$this->superdao->setData( $this->lista );
			$this->superdao->setTotal( $this->qtdTotal() );
		}

		return $this->superdao->getResponse();
	}
	function listarCategoriaContasAPagar () {
		$this->sql = "SELECT * FROM categoria where tipo = 'APAGAR' or tipo = 'AMBOS'";
		$result = mysqli_query ( $this->con, $this->sql );

		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Categoria' , 'ListarPaginado' ) );
		}else{
			while ( $row = mysqli_fetch_assoc ( $result ) ) {				array_push( $this->lista, $row);
			}

			$this->superdao->setSuccess( true );			$this->superdao->setData( $this->lista );
			$this->superdao->setTotal( $this->qtdTotal() );
		}

		return $this->superdao->getResponse();
	}
	//deletar
	function deletar (Categoria $obj) {
		$this->superdao->resetResponse();

		// buscando por dependentes
		$dependentes = $this->superdao->verificaDependentes($obj->getId());
		if ( $dependentes > 0 ) {
			$this->superdao->setMsg( resolve( '0001', $dependentes, get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}

		$this->sql = sprintf("DELETE FROM categoria WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$result = mysqli_query($this->con, $this->sql);

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}

		$this->superdao->setSuccess( true );
		$this->superdao->setData( true );

		return $this->superdao->getResponse();
	}

	//quantidade total
	function qtdTotal() {
		$this->sql = "SELECT count(*) as quantidade FROM categoria";
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

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>