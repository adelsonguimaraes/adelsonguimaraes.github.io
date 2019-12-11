<?php

/*
    Paths de todos os caminhos por tipo de arquivo
*/
class uploadFiles {
    private $paths = array(
        "image" => __DIR__ .  "/../uploads/img",
        "audio" => "/../uploads/audio",
        "outhers" => "/../uploads/outhers"
    );

    private $errosUpload = array(
        "1" => array(
            "erro"=> "UPLOAD_ERR_INI_SIZE",
            "descricao"=> "O arquivo enviado excede a diretiva upload_max_filesize no php.ini."
        ),
        "2" => array(
            "erro"=> "UPLOAD_ERR_FORM_SIZE",
            "descricao"=> "O arquivo enviado excede a diretiva MAX_FILE_SIZE especificada no formulário HTML."
        ),
        "3" => array(
            "erro"=> "UPLOAD_ERR_PARTIAL",
            "descricao"=> "O arquivo enviado foi apenas parcialmente carregado"
        ),
        "4" => array(
            "erro"=> "UPLOAD_ERR_NO_FILE",
            "descricao"=> "Nenhum arquivo foi enviado"
        ),
        "6" => array(
            "erro"=> "UPLOAD_ERR_NO_TMP_DIR",
            "descricao"=> "Faltando uma pasta temporária. Introduzido no PHP 5.0.3."
        ),
        "7" => array(
            "erro"=> "UPLOAD_ERR_CANT_WRITE",
            "descricao"=> "Falha ao gravar o arquivo no disco. Introduzido no PHP 5.1.0."
        ),
        "8" => array(
            "erro"=> "UPLOAD_ERR_EXTENSION",
            "descricao"=> "Uma extensão PHP parou o upload do arquivo. O PHP não fornece uma maneira de determinar qual extensão causou a parada do upload do arquivo; Examinar a lista de extensões carregadas com phpinfo () pode ajudar."
        )
    );
    
    private function getPathForType ($type) {
        $type = explode('/', $type);
        $path = $this->paths['outhers'];
        foreach ($this->paths as $key => $value) {
            if ($key == $type[0]){
                $path = $value;
            }
        }
        return $path;
    }

    // função de upload de arquivos
    public function upload () {
        
        $response = array( 'success'=>false, 'data'=>array(), 'msg'=>'' );
        $totalError = 0;
        $totalSuccess = 0;
        $count = 0;

        try {

            foreach ($_FILES as $key) {
                
                $count++;
                $location = $this->getPathForType($key['type']);
                $datetime = new DateTime();
                $extension = pathinfo($key['name'], PATHINFO_EXTENSION);
                $uploadfile = $count.$datetime->format('dmYHis') . '.' .$extension; // nome dinâmico do arquivo
                $uploadfilename = $key['tmp_name'];

                if (!file_exists($location)) {
                    mkdir($location, 0777, true);
                    chmod($location, 0777);
                };
                
                if(move_uploaded_file($uploadfilename, $location.'/'.$uploadfile)){
                        $response['success'] = true; 
                        $pathFile = $location.'/'.$uploadfile;
                        array_push($response['data'], substr($pathFile, strrpos($pathFile, '/uploads')));
                        $totalSuccess++;
                } else {
                        $response['msg'] .= 'Ocorreu um erro ao enviar ' . $uploadfile;
                        $totalError++;
                }
                // usleep(1000000); // 1 segundo entre os uploads
            };

        }catch(Exception $e){
            $response['msg'] .= 'Ocorreu um erro ' . $e;
            $totalError++;
        }

        $response['erros'] = $totalError;
        $response['suc'] = $totalSuccess;

        return $response;
    }
    public function upload2 ($files, $unique) {

        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300); //300 seconds = 5 minutes

        $response = array( 'success'=>false, 'data'=>array(), 'msg'=>'' );
        $totalError = 0;
        $totalSuccess = 0;
        $count = 0;

        try {

            foreach ($files as $key) {

                $path = $key->base64;
                
                $image_parts = explode(";base64,", $path);
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);

                $count++;
                $datetime = new DateTime();
                if (empty($unique)) {
                    $path = __DIR__ .  "/../uploads/img/".$count.$datetime->format('dmYHis').".".$image_type;
                }else{
                    $path = __DIR__ .  "/../uploads/img/".$unique.".".$image_type;
                }
                file_put_contents( $path, $image_base64);

                $infoimg = getimagesize($path);
                $img = null;

                switch ($infoimg['mime']) {
                    case 'image/png':
                        $img = imagecreatefrompng($path);
                        break;
                    case 'image/jpeg':
                        $img = imagecreatefromjpeg($path);
                        break;
                    case 'image/gif':
                        $img = imagecreatefromgif($path);
                        break;
                }

                $newHeight = 1000;
                $newWidth = 1000;

                if ($img) {
                    //Resimensiona a imagem
                    $originalWidth  = imageSX($img);
                    $originalHeight = imageSY($img);

                    if($originalWidth > $originalHeight)
                    {
                        $widthRatio = $newWidth;
                        $heightRatio = $originalHeight*($newHeight / $originalWidth);
                    }

                    if($originalWidth < $originalHeight)
                    {
                        $widthRatio = $originalWidth*($newWidth / $originalHeight);
                        $heightRatio = $newHeight;
                    }

                    if($originalWidth == $originalHeight)
                    {
                        $widthRatio = $newWidth;
                        $heightRatio = $newHeight;
                    }

                    $resizedImg = imagecreatetruecolor($widthRatio, $heightRatio);

                    imagecopyresampled($resizedImg, $img, 0, 0, 0, 0, $widthRatio, $heightRatio, $originalWidth, $originalHeight);

                    switch ($infoimg['mime']) {
                        case 'image/png':
                            imagepng($resizedImg, $path);
                        break;
                        case 'image/jpeg':
                            imagejpeg($resizedImg, $path);
                        break;
                        case 'image/gif':
                            imagegif($resizedImg, $path);
                        break;
                    }

                    $img = $resizedImg = null;

                    array_push($response['data'], substr($path, strrpos($path, '/uploads')));
                    $totalSuccess++;

                }
                // sleep(2);
            }

        }catch(Exception $e){
            $response['msg'] .= 'Ocorreu um erro ' . $e;
            $totalError++;
        }

        $response['erros'] = $totalError;
        $response['suc'] = $totalSuccess;

        return $response;
    }
};


?>