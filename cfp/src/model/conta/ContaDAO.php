<?php
// dao : conta

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimaães.
	Data de início: 12/01/2018.
	Data Atual: 12/01/2018.
*/

Class ContaDAO {
	//atributos
	private $con;
	private $sql;
	private $obj;
	private $lista = array();
	private $superdao;

	//construtor
	public function __construct($con) {
		$this->con = $con;
		$this->superdao = new SuperDAO('conta');
	}

	//cadastrar
	function cadastrar (conta $obj) {
		$this->sql = sprintf("INSERT INTO conta(idusuario, idcategoria, descricao, valor, parcela, indeterminada, tipo, status, datavencimento, sync, ativo, datacadastro, dataedicao)
		VALUES(%d, %d, '%s', %f, %d, '%s', '%s', '%s', '%s', '%s', '%s',  '%s', '%s')",
			mysqli_real_escape_string($this->con, $obj->getObjusuario()->getId()),
			mysqli_real_escape_string($this->con, $obj->getObjcategoria()->getId()),
			mysqli_real_escape_string($this->con, $obj->getDescricao()),
			mysqli_real_escape_string($this->con, $obj->getValor()),
			mysqli_real_escape_string($this->con, $obj->getParcela()),
			mysqli_real_escape_string($this->con, $obj->getIndeterminada()),
			mysqli_real_escape_string($this->con, $obj->getTipo()),
			mysqli_real_escape_string($this->con, !empty($obj->getStatus()) ? $obj->getStatus() : 'EMABERTO' ),
			mysqli_real_escape_string($this->con, substr($obj->getDatavencimento(),0,10) ),
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
	function atualizar (Conta $obj) {
		$this->sql = sprintf("UPDATE conta SET idusuario = %d, idcategoria = %d, descricao = '%s', valor = %f, parcela = %d, indeterminada = '%s', tipo = '%s', status = '%s', datavencimento = '%s', sync = '%s', ativo = '%s', dataedicao = '%s' WHERE id = %d ",
		mysqli_real_escape_string($this->con, $obj->getObjusuario()->getId()),
		mysqli_real_escape_string($this->con, $obj->getObjcategoria()->getId()),
		mysqli_real_escape_string($this->con, $obj->getDescricao()),
		mysqli_real_escape_string($this->con, $obj->getValor()),
		mysqli_real_escape_string($this->con, $obj->getParcela()),
		mysqli_real_escape_string($this->con, $obj->getIndeterminada()),
		mysqli_real_escape_string($this->con, $obj->getTipo()),
		mysqli_real_escape_string($this->con, $obj->getStatus()),
		mysqli_real_escape_string($this->con, substr($obj->getDatavencimento(),0,10) ),
		mysqli_real_escape_string($this->con, $obj->getSync()),
		mysqli_real_escape_string($this->con, $obj->getAtivo()),
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
	function buscarPorId (Conta $obj) {
		$this->sql = sprintf("SELECT * FROM conta WHERE id = %d",
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
		$this->sql = "SELECT * FROM conta";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Conta' , 'Listar' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//listar paginado
	function listarPaginado($start, $limit) {
		$this->sql = "SELECT * FROM conta limit " . $start . ", " . $limit;
		$result = mysqli_query ( $this->con, $this->sql );

		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Conta' , 'ListarPaginado' ) );
		}else{
			while ( $row = mysqli_fetch_assoc ( $result ) ) {				
				array_push( $this->lista, $row);
			}

			$this->superdao->setSuccess( true );			
			$this->superdao->setData( $this->lista );
			$this->superdao->setTotal( $this->qtdTotal() );
		}

		return $this->superdao->getResponse();
	}

	function listarContasPorUsuario($idusuario) {
		$this->sql = "SELECT c.*, cat.descricao as 'categoria' 
		from conta c
		inner join categoria cat on cat.id = c.idcategoria
		where c.idusuario = $idusuario";
		
		$result = mysqli_query ( $this->con, $this->sql );
		
		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Conta' , 'listarContasPorUsuario' ) );
		}else{
			while ( $row = mysqli_fetch_assoc ( $result ) ) {				
				array_push( $this->lista, $row);
			}

			$this->superdao->setSuccess( true );			
			$this->superdao->setData( $this->lista );
			$this->superdao->setTotal( $this->qtdTotal() );
		}

		return $this->superdao->getResponse();
	}

	function listarNotIn ($in, $idusuario) {
		
		$s = '';
		if (count($in) > 0) {
			$s = 'id not in(';
			foreach ($in as $key) {
				$s .= $key['id'] . ',';
			}
			$s = substr($s, 0, -1);
			$s .= ') and';
		}
		
		$this->sql = "SELECT * from conta where $s idusuario = $idusuario";

		$result = mysqli_query ( $this->con, $this->sql );
		
		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Conta' , 'listarPorNotIn' ) );
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

	function listarContasAPagarPorUsuario ($idusuario) {
		$this->sql = "SELECT * from conta where idusuario = $idusuario and tipo ='APAGAR'";

		$result = mysqli_query ( $this->con, $this->sql );
		
		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Conta' , 'ListarPaginado' ) );
		}else{
			while ( $row = mysqli_fetch_assoc ( $result ) ) {				
				array_push( $this->lista, $row);
			}

			$this->superdao->setSuccess( true );			
			$this->superdao->setData( $this->lista );
			$this->superdao->setTotal( $this->qtdTotal() );
		}

		return $this->superdao->getResponse();
	}

	function listarContasAReceberPorUsuario ($idusuario) {
		$this->sql = "SELECT * from conta where idusuario = $idusuario and tipo ='ARECEBER'";

		$result = mysqli_query ( $this->con, $this->sql );
		
		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Conta' , 'listarContasAReceberPorUsuario' ) );
		}else{
			while ( $row = mysqli_fetch_assoc ( $result ) ) {				
				array_push( $this->lista, $row);
			}

			$this->superdao->setSuccess( true );			
			$this->superdao->setData( $this->lista );
			$this->superdao->setTotal( $this->qtdTotal() );
		}

		return $this->superdao->getResponse();
	}
	
	//deletar
	function deletar (Conta $obj) {
		$this->superdao->resetResponse();

		// buscando por dependentes
		$dependentes = $this->superdao->verificaDependentes($obj->getId());
		if ( $dependentes > 0 ) {
			$this->superdao->setMsg( resolve( '0001', $dependentes, get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}

		$this->sql = sprintf("DELETE FROM conta WHERE id = %d",
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
		$this->sql = "SELECT count(*) as quantidade FROM conta";
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