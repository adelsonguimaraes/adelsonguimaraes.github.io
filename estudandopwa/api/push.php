<?PHP
	function sendMessage(){
		$content = array(
			"en" => 'Mensagem em Portguês'
			);
		
		$fields = array(
			'app_id' => "794ab791-1bac-46a9-9d98-fb2ad442e13d",
			'filters' => array(array("field" => "tag", "key" => "level", "relation" => "=", "value" => "10"),array("operator" => "OR"),array("field" => "amount_spent", "relation" => "=", "value" => "0")),
			'data' => array("foo" => "bar"),
			'contents' => $content
		);
		
		$fields = json_encode($fields);
    	print("\nJSON sent:\n");
    	print($fields);
		
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
	
	$response = sendMessage();
	$return["allresponses"] = $response;
	$return = json_encode( $return);
	
	print("\n\nJSON received:\n");
	print($return);
	print("\n");
?>