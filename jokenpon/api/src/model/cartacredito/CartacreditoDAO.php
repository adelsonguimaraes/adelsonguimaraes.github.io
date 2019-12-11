<?php
// dao : cartacredito

/*
	Projeto: INCUBUS - Controle de Consultoria.
	Project Owner: Raquel Araújo Queiroz.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-02-02T18:48:29.166Z.
	Data Atual: 02/02/2019.
*/

Class CartacreditoDAO {
	//atributos
	private $con;
	private $sql;
	private $obj;
	private $lista = array();
	private $superdao;

	//construtor
	public function __construct($con) {
		$this->con = $con;
		$this->superdao = new SuperDAO('cartacredito');
	}

	//cadastrar
	function cadastrar (cartacredito $obj) {
		$this->sql = sprintf("INSERT INTO cartacredito(idtaxaadministrativa, valor, entrada, parcela)
		VALUES(%d, %f, %f, %f)",
			mysqli_real_escape_string($this->con, $obj->getObjtaxaadministrativa()->getId()),
			mysqli_real_escape_string($this->con, $obj->getValor()),
			mysqli_real_escape_string($this->con, $obj->getEntrada()),
			mysqli_real_escape_string($this->con, $obj->getParcela()));

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
	function atualizar (Cartacredito $obj) {
		$this->sql = sprintf("UPDATE cartacredito SET idtaxaadministrativa = %d, valor = %f, entrada = %f, parcela = %f, dataedicao = '%s' WHERE id = %d ",
			mysqli_real_escape_string($this->con, $obj->getObjtaxaadministrativa()->getId()),
			mysqli_real_escape_string($this->con, $obj->getValor()),
			mysqli_real_escape_string($this->con, $obj->getEntrada()),
			mysqli_real_escape_string($this->con, $obj->getParcela()),
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

	//buscarPorId
	function buscarPorId (Cartacredito $obj) {
		$this->sql = sprintf("SELECT * FROM cartacredito WHERE id = %d",
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
		$this->sql = "SELECT cc.*, ta.taxa as 'taxa', tt.id as 'idmodalidade', tt.descricao as 'modalidade'
		from cartacredito cc
		inner join taxaadministrativa ta on ta.id = cc.idtaxaadministrativa
		inner join tipotaxa tt on tt.id = ta.idtipotaxa
		-- order by cc.id desc
		-- order by cc.valor asc, cc.entrada asc, cc.parcela asc
		order by ta.taxa";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Cartacredito' , 'Listar' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//filtros
	function filtrar ($filtros) {

		$where = "";
		foreach ($filtros as $key => $value) {
			// modalidade
			if ($key === 'modalidade' && $value >0) $where .= " and tt.id =". $value;
			// valor
			if ($key === 'valoracima' && $value >0) $where .= " and cc.valor >=". $value;
			if ($key === 'valorabaixo' && $value >0) $where .= " and cc.valor <=". $value;
			// entrada
			if ($key === 'entradaacima' && $value >0) $where .= " and cc.entrada >=". $value;
			if ($key === 'entradaabaixo' && $value >0) $where .= " and cc.entrada <=". $value;
			// parcela
			if ($key === 'parcelaacima' && $value >0) $where .= " and cc.parcela >=". $value;
			if ($key === 'parcelaabaixo' && $value >0) $where .= " and cc.parcela <=". $value;
		}
			
		$this->sql = "SELECT cc.*, ta.taxa as 'taxa', tt.descricao as 'modalidade'
		from cartacredito cc
		inner join taxaadministrativa ta on ta.id = cc.idtaxaadministrativa
		inner join tipotaxa tt on tt.id = ta.idtipotaxa
		where cc.id >0
		$where
		-- order by cc.id
		-- order by ta.taxa
		order by cc.valor asc, cc.entrada asc, cc.parcela asc";

		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Cartacredito' , 'Listar' ) );
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
		$this->sql = "SELECT * FROM cartacredito limit " . $start . ", " . $limit;
		$result = mysqli_query ( $this->con, $this->sql );

		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Cartacredito' , 'ListarPaginado' ) );
		}else{
			while ( $row = mysqli_fetch_assoc ( $result ) ) {				array_push( $this->lista, $row);
			}

			$this->superdao->setSuccess( true );			$this->superdao->setData( $this->lista );
			$this->superdao->setTotal( $this->qtdTotal() );
		}

		return $this->superdao->getResponse();
	}
	//deletar
	function deletar (Cartacredito $obj) {
		$this->superdao->resetResponse();

		// buscando por dependentes
		$dependentes = $this->superdao->verificaDependentes($obj->getId());
		if ( $dependentes > 0 ) {
			$this->superdao->setMsg( resolve( '0001', $dependentes, get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}

		$this->sql = sprintf("DELETE FROM cartacredito WHERE id = %d",
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
		$this->sql = "SELECT count(*) as quantidade FROM cartacredito";
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