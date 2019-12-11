<?php
 
class EncurtadorFirebaseApi {
 

    function shorten_URL ($longUrl) {
        $key = 'AIzaSyCVw1pBKVDiA71TxlDuZb2KdHuXwAEftY8';
        $url = 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=' . $key;
        $data = array(
            "dynamicLinkInfo" => array(
                "domainUriPrefix" => "incub.page.link",
                "link" => $longUrl
            )
        );

        $headers = array('Content-Type: application/json');

        $ch = curl_init ();
        curl_setopt ( $ch, CURLOPT_URL, $url );
        curl_setopt ( $ch, CURLOPT_POST, true );
        curl_setopt ( $ch, CURLOPT_HTTPHEADER, $headers );
        curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt ( $ch, CURLOPT_POSTFIELDS, json_encode($data) );

        $data = curl_exec ( $ch );
        curl_close ( $ch );

        $short_url = json_decode($data);

        if(isset($short_url->error)){
            return $short_url->error->message;
        } else {
            return $short_url->shortLink;
        }

    }
}

$enc = new EncurtadorFireBaseApi();

// Call the function with the URL
echo $enc->shorten_URL('https://www.adelsonguimaraes.com.br/incubus/#/atendimento/@raquelqueiroz&c4ca4238a0b923820dcc509a6f75849b');

    
    
?>


<!-- Read more: http://www.linhadecodigo.com.br/artigo/3559/como-encurtar-urls-utilizando-a-api-do-google-com-php.aspx#ixzz5vAgo6VDW -->