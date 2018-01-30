<?php

$jogadas = array(
    array("id"=> 1, "descricao" => "Pedra", "vence" => 3),
    array("id"=> 2, "descricao" => "Papel", "vence" => 1),
    array("id"=> 3, "descricao" => "Tesoura", "vence" => 2)
);

$players = array (
    'João', 'Pedro'
);

$x = 0;
$j1Total = 0;
$j2Total = 0;

function rodada ($x, $players, $jogadas, $j1Total, $j2Total) {
    if ($x < 10) {
        $x++;
        // sleep(1);
        echo "Jogadores<br>";
        // sleep(1);
        echo $players[0] . ' VS ' . $players[1] . '<br>';
        // sleep(1);
        echo $x . 'a Rodada.<br>';
        // sleep(2000);
        $j1 = $jogadas[rand(0, 2)];
        $j2 = $jogadas[rand(0, 2)];
        $jvencedor = '';
        if ($j1['vence'] === $j2['id']) {
            $j1Total++;
            $jvencedor = $players[0] . ' Venceu a Rodada e recebeu + 1 ponto!';
        }else if ($j1['id'] === $j2['id']){
            $jvencedor = 'Empate + 1 ponto para ambos!';
            $j1Total++;
            $j2Total++;
        }else{
            $jvencedor = $players[1] . ' Venceu a Rodada  e recebeu + 1 ponto!';
            $j2Total++;
        }
        echo  $players[0] . ': ' . $j1['descricao'] . ' x ' .$j2['descricao'] . ' :' . $players[1] . ' - ' . $jvencedor . '<br>';
        
        rodada($x, $players, $jogadas, $j1Total, $j2Total);
    }else{
        if ($j1Total > $j2Total) {
            echo $players[0] . ' foi o grande vencedor ' . $j1Total . ' x ' . $j2Total;
        }else if ($j1Total < $j2Total){
            echo $players[1] . ' foi o grande vencedor ' . $j2Total . ' x ' . $j1Total;
        }else {
            echo 'Empate ' .$players[0] . ' : ' . $j2Total . ' x ' . $j1Total . ' : ' . $players[1];
        }
    }
}
rodada (0, $players, $jogadas, $j1Total, $j2Total);

?>