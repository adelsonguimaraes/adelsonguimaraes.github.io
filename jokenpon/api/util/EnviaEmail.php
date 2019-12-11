<?php

if (!function_exists("PHPMailer")) {
	// require_once('PHPMailer_5.2.2/class.phpmailer.php');
	require_once("phpmailer/PHPMailerAutoload.php");
}

require_once(__DIR__ . "/../src/rest/autoload.php");

class EnviaEmail {
	// atributos
	private $usuario = 'incubus=adelsonguimaraes.com.br';
	private $senha = 'incubus@2019';
	private $remetente;
	private $emails;
	private $assunto;
	private $mensagem;

	function __construct 
	(
		$remetente = NULL,
		$assunto = NULL,
		$emails = NULL,
		$mensagem = NULL,
		$anexo = NULL
	)
	{
		$this->remetente = $remetente;
		$this->assunto = $assunto;
		$this->emails = $emails;
		$this->mensagem = $mensagem;
		$this->anexo = $anexo;
	}

	// metodos
	public function getUsuario () {
		return $this->usuario;
	}
	public function setUsuario ( $usuario ) {
		$this->usuario = $usuario;
		return $this;
	}
	public function getSenha () {
		return $this->senha;
	}
	public function setSenha ( $senha ) {
		$this->senha = $senha;
		return $this;
	}
	public function getRemetente () {
		return $this->remetente;
	}
	public function setRemetente ( $remetente ) {
		$this->remetente = $remetente;
		return $this;
	}
	public function getEmails () {
		return $this->emails;
	}
	public function setEmails ( $emails ) {
		$this->emails = $emails;
		return $this;
	}
	public function getAssunto () {
		return $this->assunto;
	}
	public function setAssunto ( $assunto ) {
		$this->assunto = $assunto;
		return $this;
	}
	public function getMensagem () {
		return $this->mensagem;
	}
	public function setMensagem ( $mensagem ) {
		$this->mensagem = $mensagem;
		return $this;
	}

	public function enviar () {
		// echo '<pre>';
		if ( empty($this->emails) ) return false; // se não haver emails
		
		$Host = 'SMTP.adelsonguimaraes.com.br';//.substr(strstr($this->usuario, '@'), 1); //'mail.dominio.com.br';
		$Username = $this->usuario;
		$Password = $this->senha;
		$Port = "587";

		$mail = null;
		unset($mail);
		$mail = new PHPMailer();

		$body = $this->mensagem;
		$mail->IsSMTP(); // telling the class to use SMTP


		$mail->SMTPOptions = array(
		    'ssl' => array(
		        'verify_peer' => false,
		        'verify_peer_name' => false,
		        'allow_self_signed' => true
		    )
		);

		$mail->Host = $Host; // SMTP server
		// $mail->SMTPDebug = 1; // enables SMTP debug information (for testing)
		// 1 = errors and messages1
		// 2 = messages only
		$mail->SMTPAuth = true; // enable SMTP authentication
		$mail->AuthType = 'PLAIN';
		$mail->SMTPSecure = "";
		$mail->Port = $Port; // set the SMTP port for the service server
		$mail->Username = $Username; // account username
		$mail->Password = $Password; // account password
		$mail->CharSet = 'UTF-8';

		$mail->SetFrom( str_replace("=", "@", $this->usuario), $this->remetente );
		$mail->Subject = $this->assunto;
		$mail->MsgHTML($body);
		
		if ( !empty($this->anexo) && filesize( $this->anexo ) < 10485760 ) { // caso não exceda o limite 10MB
			$mail->AddAttachment( $this->anexo );
		}

		foreach ( $this->emails as $key ) {
			$mail->AddAddress( trim($key), "" );
		}

		// chamando a classe de email log
		$obj = new Logemail();
		$obj->setAssunto($this->assunto)
			->setConteudo($this->mensagem)
			->setDestinatario(implode(', ', $this->emails));

		if(!$mail->Send()) { // caso de erro
			$response = $mail->ErrorInfo;

			// salvando no log
			$obj->setStatus('ERRO')
				->setRetorno($mail->ErrorInfo);
			$control = new LogemailControl($obj);
			$resp = $control->cadastrar();
			if ($resp['success']==false) return $resp;

		} else { // caso sucesso no envio
			$response = true;
			
			// salvando no log
			$obj->setStatus('ENVIADO')
				->setRetorno("Email enviado com sucesso");
			$control = new LogemailControl($obj);
			$resp = $control->cadastrar();
			if ($resp['success']==false) return $resp;
		}

		return $response;
	}


}

// $data = array(
// 	"nome"=>"Adelson Guimarães",
// 	"email"=>"adelsonguimaraes@gmail.com",
// 	"celular"=>"92991905809",
// 	"interesse"=>"IMOVEL",
// 	"valor"=>25000.00,
// 	"entrada"=>100,
// 	"parcela"=>400
// );

// $consultor = array("nome"=>"Raquel Queiroz", "perfil"=>"LIDER", "celular"=>92999999999);

// enviando menu informando consultor
// require_once "../util/GenericFunctions.php";
// require_once "../src/email/avisa_consultor_cadastro_atendimento.php";
// $html = ob_get_contents();
// ob_end_clean();

// echo $html;
// exit;

// // como usar
// $obj = new EnviaEmail();
// $obj->setRemetente('Incubus')
// 	->setAssunto('Consultoria de Vendas')
// 	->setEmails(array('adelsonguimaraes@gmail.com'))
// 	->setMensagem($html);
// echo $obj->enviar();

// como tratar o erro
// if ($obj->enviar()===true) {
// 	echo "enviado com sucesso";
// }else{
// 	echo "erro";
// }


?>
