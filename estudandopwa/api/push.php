<?PHP
	function sendMessage($configs){
		// $content = array(
		// 	"pt_br" => 'Mensagem em Portguês'
		// 	);

		$fields = array(
			'app_id' => "794ab791-1bac-46a9-9d98-fb2ad442e13d",
			'filters' => array(array("field" => "tag", "key" => "level", "relation" => "=", "value" => "10"),array("operator" => "OR"),array("field" => "amount_spent", "relation" => "=", "value" => "0")),
			'headings' => $configs['headings'],
			'subtitle' => $configs['subtitle'],
			'contents' => $configs['contents'],
			'data' => $configs['data'],
			'chrome_web_icon'=> "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfqWL3RP0CcHldwr9_JfFJ1A1oJG4o3wqgjJLR83I4ZZEK-YmR",
			'wp_wns_sound' => "closure.mp3",
			'web_buttons' => array(
				array("id"=>"acessar", "text"=>"Acessar", "icon"=>'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/1024px-WPVG_icon_2016.svg.png', "url"=>"do_not_open"),
				array("id"=>"depois", "text"=>"Depois", "icon"=>'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1024px-Facebook_icon.svg.png', "url"=>"https://facebook.com/?_osp=do_not_open"),
			),
			'include_player_ids' => array("19d88885-5508-4203-adb5-73aa88212d80") // enviar para usuários específicos
		);
		
		$fields = json_encode($fields);
    	// print("\nJSON sent:\n");
    	// print($fields);
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
												   'Authorization: Basic MDQ2OWE2YjYtMGQzYy00MmNmLTgwNjgtMDRlZWI2ZTU5NWE0'));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

		$response = curl_exec($ch);
		curl_close($ch);
		
		return $response;
	}

	// variáveis utilizadads nas informações do conteúdo
	// $configs = array(
	// 	"headings" => array("en"=>"Notification Background"),
	// 	"subtitle" => array("en" => "Teste de notificação em background"),
	// 	"contents" => array("en" => "Essa notificação foi enviada quando o navegador estava fechado"),
	// 	"data" => array("site"=>"www.adelsonguimaraes.com.br/estudandopwa")
	// );
	
	// $response = sendMessage($configs);
	// $return["allresponses"] = $response;
	// $return = json_encode( $return);
	
	// print("\n\nJSON received:\n");
	// print($return);
	// print("\n");
?>