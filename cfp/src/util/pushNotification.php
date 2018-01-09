<?php

/*
    push
*/ 
// require_once ('Conexao.php');


Class pushNotification {
	private $con;
	private $title = 'Titulo não foi definido';
	private $msg = 'Mensagem não foi definida';
	private $data = NULL;

	public function __construct ( $title=NULL, $msg=NULL, $data=NULL ) {
		$this->con = Conexao::getInstance()->getConexao();
		$this->title = ($title != NULL) ? $title : $this->title;
		$this->msg = ($msg != NULL) ? $msg : $this->msg;
		$this->data = $data;
	}

	public function pushPorAtividade ( $idatividade ) {

		// seleciona todos os usuarios que tem participam da atividade
	    $sql = "SELECT u.*, atv.* FROM atividade atv";
	    $sql .= " INNER JOIN atividadefase atvfase ON atvfase.idatividade = atv.id";
	    $sql .= " INNER JOIN atividadefasefuncionario atvfasefunc ON atvfasefunc.idfase = atvfase.id";
	    $sql .= " INNER JOIN usuario u ON u.idpessoafisica = atvfasefunc.idfuncionario AND u.pushkey IS NOT NULL";
	    $sql .= " WHERE atv.id = $idatividade GROUP BY u.id";
	    $result = mysqli_query( $this->con, $sql );

	    if (!$result) {
		    echo "Erro " . mysqli_error( $con );
		} else {
		    while ($row = mysqli_fetch_assoc($result)) {
		    	$ids = array();
		        array_push( $ids, $row['pushkey'] );    
		        $atv = json_encode(array( "id"=>$idatividade, "descricao"=>$row['descricao'], "totalandamento"=>__totalAndamento() ));
		        $data = array('title'=> $this->title, 
		        	'message' => $this->msg, 
		        	'data'=>$this->data, 
		        	'url'=>'andamentoTimeline/' . $atv
		        );
		        $this->sendGoogleCloudMessage(  $data, $ids );
		    }
		}

		function __totalAndamento ($idatividade) {
			$sql = "SELECT COUNT(*) AS total FROM atividadeandamento WHERE idatividade = $idatividade";
			$result = mysqli_query( $this->con, $sql );
			if (!$result) {
			    echo "Erro " . mysqli_error( $con );
			} else {
				if ( $row = mysql_fetch_assoc($result) ) return $row['total'];
			}
		};
	}

	public function pushPorFuncionario ( $idfuncionario ) {

		// seleciona todos os usuarios que tem participam da atividade
	    $sql = "SELECT * FROM usuario WHERE idpessoafisica = $idfuncionario";
	    $result = mysqli_query( $this->con, $sql );

	    if (!$result) {
		    echo "Erro " . mysqli_error( $con );
		} else {
		    $ids = array();
		    while ($row = mysqli_fetch_assoc($result)) {
		        array_push( $ids, $row['pushkey'] );    
		        $data = ['title'=> $this->title ,'message' => $this->msg, 'data'=>$this->data, 'url'=>'atividade'];
		        $this->sendGoogleCloudMessage(  $data, $ids );
		    }
		}
	}

	function sendGoogleCloudMessage( $data, $ids ) {

	    // Insert real GCM API key from Google APIs Console
	    // https://code.google.com/apis/console/        
	    $apiKey = 'AIzaSyA4qJg2mntKmWt20Sb5Mmv1yEKSqOzmNec';

	    // Define URL to GCM endpoint
	    $url = 'https://gcm-http.googleapis.com/gcm/send';

	    // Set GCM post variables (device IDs and push payload)     
	    $post = array(
	                    'registration_ids'  => $ids,
	                    'data'              => $data,
	                    );

	    // Set CURL request headers (authentication and type)       
	    $headers = array( 
	                        'Authorization: key=' . $apiKey,
	                        'Content-Type: application/json'
	                    );

	    // Initialize curl handle       
	    $ch = curl_init();

	    // Set URL to GCM endpoint      
	    curl_setopt( $ch, CURLOPT_URL, $url );

	    // Set request method to POST       
	    curl_setopt( $ch, CURLOPT_POST, true );

	    // Set our custom headers       
	    curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers );

	    // Get the response back as string instead of printing it       
	    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

	    // Set JSON post data
	    curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode( $post ) );

	    // Actually send the push   
	    $result = curl_exec( $ch );

	    // Error handling
	    if ( curl_errno( $ch ) )
	    {
	        echo 'GCM error: ' . curl_error( $ch );
	    }

	    // Close curl handle
	    curl_close( $ch );

	    // Debug GCM response       
	    // echo $result;
	}
}
?>