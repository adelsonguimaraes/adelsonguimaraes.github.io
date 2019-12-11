<?php
// dao : cliente

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class ClienteDAO {
	//atributos
	private $con;
	private $sql;
	private $obj;
	private $lista = array();
	private $superdao;

	//construtor
	public function __construct($con) {
		$this->con = $con;
		$this->superdao = new SuperDAO('cliente');
	}

	//cadastrar
	function cadastrar (cliente $obj) {
		$this->sql = sprintf("INSERT INTO cliente(idusuario, nome, celular, email, interesse, valor, entrada, parcela, observacao)
		VALUES(%d, '%s', '%s', '%s', '%s', %f, %f, %f, '%s')",
			mysqli_real_escape_string($this->con, $obj->getObjusuario()->getId()),
			mysqli_real_escape_string($this->con, $obj->getNome()),
			mysqli_real_escape_string($this->con, $obj->getCelular()),
			mysqli_real_escape_string($this->con, $obj->getEmail()),
			mysqli_real_escape_string($this->con, $obj->getInteresse()),
			mysqli_real_escape_string($this->con, $obj->getValor()),
			mysqli_real_escape_string($this->con, $obj->getEntrada()),
			mysqli_real_escape_string($this->con, $obj->getParcela()),
			mysqli_real_escape_string($this->con, $obj->getObservacao()));

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
	function atualizar (Cliente $obj) {
		$this->sql = sprintf("UPDATE cliente SET idusuario = %d, nome = '%s', celular = '%s', email = '%s', interesse = '%s', valor = %f, entrada = %f, parcela = %f, observacao = '%s', status = '%s', verhome = '%s', dataedicao = '%s' WHERE id = %d ",
			mysqli_real_escape_string($this->con, $obj->getObjusuario()->getId()),
			mysqli_real_escape_string($this->con, $obj->getNome()),
			mysqli_real_escape_string($this->con, $obj->getCelular()),
			mysqli_real_escape_string($this->con, $obj->getEmail()),
			mysqli_real_escape_string($this->con, $obj->getInteresse()),
			mysqli_real_escape_string($this->con, $obj->getValor()),
			mysqli_real_escape_string($this->con, $obj->getEntrada()),
			mysqli_real_escape_string($this->con, $obj->getParcela()),
			mysqli_real_escape_string($this->con, $obj->getObservacao()),
			mysqli_real_escape_string($this->con, $obj->getStatus()),
			mysqli_real_escape_string($this->con, $obj->getVerhome()),
			mysqli_real_escape_string($this->con, date('Y-m-d H:i:s')),
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

	// atualizar ver na home
	function atualizarVerHome ($id) {
		$this->sql = "UPDATE cliente SET verhome = 'SIM' WHERE id = $id";
		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Atualizar' ) );
		}else{
			$this->superdao->setSuccess( true );
			$this->superdao->setData( true );
		}
		return $this->superdao->getResponse();
	}

	// compartilhar
	function compartilhar ($idusuario, $idconsultor, $idcliente) {
		$this->sql ="UPDATE cliente SET idusuariocompartilhado = $idconsultor WHERE id = $idcliente AND idusuario =$idusuario";
		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), "Cliente", 'Compartilhar' ) );
		}else{
			$this->superdao->setSuccess( true );
			$this->superdao->setData( true );
		}
		return $this->superdao->getResponse();
	}

	// remover compartilhamento
	function descompartilhar ($idusuario, $idconsultor, $idcliente) {
		$this->sql ="UPDATE cliente SET idusuariocompartilhado = NULL WHERE id = $idcliente AND idusuario =$idusuario AND idusuariocompartilhado = $idconsultor";
		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), "Cliente", 'Descompartilhar' ) );
		}else{
			$this->superdao->setSuccess( true );
			$this->superdao->setData( true );
		}
		return $this->superdao->getResponse();
	}

	// importar
	function importar ($idusuario, $idusuarioantigo) {
		$this->sql = "UPDATE cliente SET idusuario = $idusuario  WHERE idusuario = $idusuarioantigo";
		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), "Cliente", 'importar' ) );
		}else{
			$this->superdao->setSuccess( true );
			$this->superdao->setData( true );
		}
		return $this->superdao->getResponse();
	}

	//buscarPorId
	function buscarPorId (Cliente $obj) {
		$this->sql = sprintf("SELECT * FROM cliente WHERE id = %d",
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
	
	//buscarPorId
	function buscarClienteExistente ($email, $celular) {
		$this->sql = "SELECT * FROM cliente WHERE email = '$email' AND celular = '$celular'";
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
	function listarTudo ($idusuario) {
		$this->sql = "SELECT * FROM cliente where
		idusuario = $idusuario and (status = 'PROSPECTO' or status = 'RETORNO')
		order by status = 'PROSPECT' asc, status = 'RETORNO', datacadastro desc";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Cliente' , 'listarTudo' ) );
		}else{
			while($row = mysqli_fetch_assoc($result)) {
				$row['verhome'] = ($row['verhome']==='SIM' ? true : false);
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//listar
	function listarVerNaHome ($idusuario) {
		$this->sql = "SELECT * 
		FROM cliente 
		where idusuario = $idusuario and verhome = 'SIM' AND idusuariocompartilhado IS NULL";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Cliente' , 'Listar' ) );
		}else{
			while($row = mysqli_fetch_assoc($result)) {
				$row['verhome'] = ($row['verhome']==='SIM' ? true : false);
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	// listarParaCompartilhar
	function listarParaCompartilhar ($idusuario, $idconsultor) {
		$this->sql = "SELECT c.*
		FROM cliente c
		WHERE c.idusuario = $idusuario AND (c.idusuariocompartilhado IS NULL OR c.idusuariocompartilhado = $idconsultor)";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Cliente' , 'listarParaCompartilhar' ) );
		}else{
			while($row = mysqli_fetch_assoc($result)) {
				$row['checked'] = empty($row['idusuariocompartilhado']) ? false : true;
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//filtrar
	function filtrar ($idusuario, $data) {
		$start = $data["start"];
		$limit = $data["limit"];

		$whereString = "";
		if (!empty($data['nome'])) $whereString .= "and nome like '%" . $data['nome'] . "%'";
		if (!empty($data['celular'])) $whereString .= " and celular = '" . $data['celular'] . "'";
		if (!empty($data['interesse'])) $whereString .= " and interesse like '%" . $data['interesse'] . "%'";
		if ($data['status']!=="TODOS") $whereString .= " and status = '" . $data['status'] . "'";

		$this->sql = "SELECT * FROM cliente where
		idusuario = $idusuario
		$whereString
		order by datacadastro desc
		limit  $start , $limit";

		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Cliente' , 'Listar' ) );
		}else{
			while($row = mysqli_fetch_assoc($result)) {
				$row['verhome'] = ($row['verhome']==='SIM' ? true : false);
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//listar paginado
	function listarPaginado($idusuario, $start, $limit) {
		$this->sql = "SELECT * FROM cliente where
		idusuario = $idusuario and (status = 'PROSPECTO' or status = 'RETORNO')
		order by status = 'PROSPECT' asc, status = 'RETORNO', datacadastro desc
		limit  $start , $limit";
		$result = mysqli_query ( $this->con, $this->sql );

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Cliente' , 'Listar' ) );
		}else{
			while($row = mysqli_fetch_assoc($result)) {
				$row['verhome'] = ($row['verhome']==='SIM' ? true : false);
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//listar paginado
	function listarCompartilhadosPaginado($idusuario, $start, $limit) {
		$this->sql = "SELECT * FROM cliente 
		WHERE idusuariocompartilhado = $idusuario and (status = 'PROSPECTO' or status = 'RETORNO')
		order by status = 'PROSPECT' asc, status = 'RETORNO', datacadastro desc
		limit  $start , $limit";
		$result = mysqli_query ( $this->con, $this->sql );

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Cliente' , 'Listar' ) );
		}else{
			while($row = mysqli_fetch_assoc($result)) {
				$row['verhome'] = ($row['verhome']==='SIM' ? true : false);
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//deletar
	function deletar (Cliente $obj) {
		$this->superdao->resetResponse();

		// buscando por dependentes
		$dependentes = $this->superdao->verificaDependentes($obj->getId());
		if ( $dependentes > 0 ) {
			$this->superdao->setMsg( resolve( '0001', $dependentes, get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}

		$this->sql = sprintf("DELETE FROM cliente WHERE id = %d",
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
		$this->sql = "SELECT count(*) as quantidade FROM cliente";
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