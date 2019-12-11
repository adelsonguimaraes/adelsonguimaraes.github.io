<?php
// dao : usuario

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class UsuarioDAO {
	//atributos
	private $con;
	private $sql;
	private $obj;
	private $lista = array();
	private $superdao;

	//construtor
	public function __construct($con) {
		$this->con = $con;
		$this->superdao = new SuperDAO('usuario');
	}

	//cadastrar
	function cadastrar (usuario $obj) {
		$this->sql = sprintf("INSERT INTO usuario(idsuperior, nome, email, senha, porcentagem)
		VALUES(%d, '%s', '%s', md5('%s'), %f)",
			mysqli_real_escape_string($this->con, $obj->getObjusuario()),
			mysqli_real_escape_string($this->con, $obj->getNome()),
			mysqli_real_escape_string($this->con, $obj->getEmail()),
			mysqli_real_escape_string($this->con, $obj->getSenha()),
			mysqli_real_escape_string($this->con, $obj->getPorcentagem()));

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
	function atualizar (Usuario $obj) {
		$this->sql = sprintf("UPDATE usuario SET nome = '%s', email = '%s', porcentagem = %f, dataedicao = '%s' WHERE id = %d ",
			mysqli_real_escape_string($this->con, $obj->getNome()),
			mysqli_real_escape_string($this->con, $obj->getEmail()),
			mysqli_real_escape_string($this->con, $obj->getPorcentagem()),
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

	//atualizar meus dados
	function atualizarMeusDados (Usuario $obj) {

		$this->sql = "UPDATE usuario SET nome = '" . $obj->getNome() . "'";
		$this->sql .= ", email = '" . $obj->getEmail() . "'";
		$this->sql .= ", celular = '" . $obj->getCelular() . "'";
		if (!empty($obj->getSenha())) $this->sql .= ", senha = '" . $obj->getSenha() . "'";
		if (!empty($obj->getFoto())) $this->sql .= ", foto = '" . $obj->getFoto() . "'";
		$this->sql .= ", dataedicao = '" . date('Y-m-d H:i:s') . "'";
		$this->sql .= " WHERE id = " . $obj->getId();

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
	function buscarPorId (Usuario $obj) {
		$this->sql = sprintf("SELECT * FROM usuario WHERE id = %d",
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
	function buscarPorEmail ($email) {
		$this->sql = "SELECT * FROM usuario WHERE email = '$email'";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'buscarPorEmail' ) );
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
	function buscarInfoPageConsultor ($usuario, $identificador) {
		$this->sql = "SELECT id, nome, email, celular, foto, perfil
		FROM usuario 
		WHERE CONCAT('@', REPLACE(LOWER(nome), ' ', '')) = '$usuario'
		AND CONCAT('&', MD5(id)) = '$identificador'
		AND ativo = 'SIM'";

		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), "UsuarioDAO", 'buscarInfoPageConsultor' ) );
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
		$this->sql = "SELECT * FROM usuario";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Usuario' , 'Listar' ) );
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
		$this->sql = "SELECT * FROM usuario limit " . $start . ", " . $limit;
		$result = mysqli_query ( $this->con, $this->sql );

		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Usuario' , 'ListarPaginado' ) );
		}else{
			while ( $row = mysqli_fetch_assoc ( $result ) ) {				array_push( $this->lista, $row);
			}

			$this->superdao->setSuccess( true );			$this->superdao->setData( $this->lista );
			$this->superdao->setTotal( $this->qtdTotal() );
		}

		return $this->superdao->getResponse();
	}

	function listarPorSuperior($idusuario) {
		$this->sql = "SELECT * 
		FROM usuario u
		WHERE u.idsuperior = $idusuario
		AND u.ativo = 'SIM'";
		$result = mysqli_query ( $this->con, $this->sql );

		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Usuario' , 'listarPorSuperior' ) );
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

	/* Logar */
	function logar ( $email, $senha ) {

		$this->sql = "SELECT * 
		from usuario 
		where email = '$email' and senha = '$senha'";
		$result = mysqli_query( $this->con, $this->sql );

		$this->superdao->resetResponse();
		
		if( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Logar' ) );
		}else{
			// caso não retorne objeto mysql result, usuario não encontrado
			$usuario = '';
			while( $row = mysqli_fetch_object( $result) ) {
				$usuario = array(
					'idusuario'=>$row->id,
					'nome'=>$row->nome,
					'email'=>$row->email,
					'celular'=>$row->celular,
					'perfil'=>$row->perfil,
					'foto'=>$row->foto,
					'auth'=>$row->auth
				);
			}
			if ( $usuario === '' ) {
				$this->superdao->setMsg( "Usuário ou Senha incorretos!" );
				return $this->superdao->getResponse();
			}
			
			// atualizando Autenticação
			$resp = $this->setAuth($usuario['idusuario']);
			if ($resp['success']===false) return ($resp);
			$usuario['auth'] = $resp['data']->auth;

			// getando o menu do usuário
			$resp = $this->getMenu ($usuario['idusuario']);
			$usuario['menus'] = $resp['data'];
			
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $usuario );
		}
		return $this->superdao->getResponse();
	}

	function setAuth ($idusuario) {
		$this->sql = "UPDATE usuario u SET u.auth = MD5(CONCAT(u.nome, u.email, u.senha)) WHERE u.id = $idusuario";
		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'setAuth' ) );
		}else{
			$id = mysqli_insert_id( $this->con );

			$resp = $this->buscarPorId (new Usuario($idusuario));
			if ($resp['success']===false) return ($resp);
			$usuario = $resp['data'];

			$this->superdao->setSuccess( true );
			$this->superdao->setData( $usuario );
		}
		return $this->superdao->getResponse();
	}

	// verificando authenticação do usuário
	function auth ($idusuario, $auth) {
		
		$this->sql = "SELECT u.* 
		FROM usuario u
		WHERE u.id = $idusuario AND u.auth = '$auth' AND u.ativo = 'SIM'";

		$result = mysqli_query( $this->con, $this->sql );

		$this->superdao->resetResponse();
		
		if( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Usuário', 'Auth' ) );
		}else{
			// caso não retorne objeto mysql result, usuario não encontrado
			$usuario = '';
			while( $row = mysqli_fetch_object( $result) ) {
				$usuario = $row;	
			}
			if ( $usuario === '' ) {
				$this->superdao->setMsg( "Usuário não autenticado!" );
				return $this->superdao->getResponse();
			}
			
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $usuario );
		}
		return $this->superdao->getResponse();
	}

	function setMenuConsultor ($idusuario) {
		$this->sql = "INSERT INTO menu_usuario (idmenu, idusuario) 
		SELECT m.id, $idusuario
		FROM menu m
		WHERE m.perfil = 'VENDEDOR'";
		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), "UsuarioDAO", 'setMenuConsultor' ) );
		}else{
			$id = mysqli_insert_id( $this->con );

			$this->superdao->setSuccess( true );
			$this->superdao->setData( true );
		}
		return $this->superdao->getResponse();
	}

	function getMenu ($idusuario) {
		$this->sql = "SELECT m.*
		FROM menu_usuario mu
		INNER JOIN menu m ON m.id = mu.idmenu
		WHERE mu.idusuario = $idusuario
		ORDER BY m.ordenador ASC";

		$result = mysqli_query( $this->con, $this->sql );

		$this->superdao->resetResponse();
		
		if( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Usuário', 'getMenu' ) );
		}else{
			// caso não retorne objeto mysql result, usuario não encontrado
			$menus = array();
			while( $row = mysqli_fetch_object( $result) ) {
				array_push($menus, $row);	
			}
			if ( empty($menus) ) {
				$this->superdao->setMsg( "Usuário não tem menu!" );
				return $this->superdao->getResponse();
			}
			
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $menus );
		}
		return $this->superdao->getResponse();
	}

	//deletar
	function deletar (Usuario $obj) {
		$this->superdao->resetResponse();

		// buscando por dependentes
		$dependentes = $this->superdao->verificaDependentes($obj->getId());
		if ( $dependentes > 0 ) {
			$this->superdao->setMsg( resolve( '0001', $dependentes, get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}

		$this->sql = sprintf("DELETE FROM usuario WHERE id = %d",
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

	function desativar ($idusuario) {
		$this->superdao->resetResponse();

		$this->sql = "UPDATE usuario SET ativo = 'NAO' WHERE id = $idusuario";
		$result = mysqli_query($this->con, $this->sql);

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Desativar' ));
			return $this->superdao->getResponse();
		}

		$this->superdao->setSuccess( true );
		$this->superdao->setData( true );

		return $this->superdao->getResponse();
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

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>