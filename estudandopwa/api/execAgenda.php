<?php
    // aqui vamos fazer nosso executador de agendamentos
    // irá verificar se existem agendamentos que precisam ser informados ao usuário

    require_once 'push.php';

    date_default_timezone_set('America/Manaus');
    $script_tz = date_default_timezone_get();

    $agendas = array(
        array(
            "data" => "2019-08-26",
            "horario" => "15:40:00",
            "notification" => array(
                "id" => 1,
                "headings" => array("en" => "Agendamento hoje 26/08/2019 às 16:00h"),
                "subtitle" => array("en" => "Reunião Agendada com Senhor Marcos"),
                "contents" => array("en" => "Reunião com intuito de verficar as necessidades do cliente com seu investimento."),
                "data" => null
            )
        ),
        array(
            "data" => "2019-08-26",
            "horario" => "15:40:00",
            "notification" => array(
                "id" => 1,
                "headings" => array("en" => "Agendamento hoje 26/08/2019 às 17:00h"),
                "subtitle" => array("en" => "Reunião Agendada com Senhor Marcos"),
                "contents" => array("en" => "Reunião com intuito de verficar as necessidades do cliente com seu investimento."),
                "data" => null
            )
        ),
        array(
            "data" => "2019-08-26",
            "horario" => "15:40:00",
            "notification" => array(
                "id" => 1,
                "headings" => array("en" => "Agendamento hoje 26/08/2019 às 20:00h"),
                "subtitle" => array("en" => "Reunião Agendada com Senhor Marcos"),
                "contents" => array("en" => "Reunião com intuito de verficar as necessidades do cliente com seu investimento."),
                "data" => null
            )
        )
    );

    $agenda = $agendas[rand(0, 2)];

    $datahorario = new DateTime($agenda['data'] . ' ' . $agenda['horario']);
    $dataagora = new DateTime();
    $interval = $datahorario->diff($dataagora);

    // if ($interval->format("%I") < 60 && $interval->format("%D") === "00" && $interval->format("%H") === "00") {
        $response = sendMessage($agenda["notification"]);
    // }
?>