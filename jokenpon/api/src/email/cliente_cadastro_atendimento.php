<?php
    header('Content-Type: text/html; charset=utf-8');
    ob_start();
?>

<div style="border: 1px solid black; height: 480px; width: 600px; padding:10px; background: #4c347b;">
    <div style="padding:15px; width:100%; color: #fff; text-align: center; font-size: 32px;font-family: sans-serif;">SOLICITAÇÃO DE SIMULAÇÃO</div>
    <div style="display: flex; padding: 10px;">
        <img height="120" width="20%" style="margin: 10px; margin-top: 70px;" src="https://www.adelsonguimaraes.com.br/incubus/libs/img/icons/icon-512x512.png" alt="">
        <div style="flex:1; padding: 10px; color:#fff;font-size: 16px; font-family: sans-serif; text-align: justify;">
            Olá <?php echo $data['nome'];?>, sua solicitação foi recebida, e assim que possível entrarei em contato.
            <br><br>
            Dados da Solicitação:
            <hr>
            <br>
            Interesse: <?php echo formatInteresse($data['interesse']);?>
            <br>
            Valor: <?php echo formatMoeda($data['valor']);?>
            <br>
            Entrada: <?php echo formatMoeda($data['entrada']);?>
            <br>
            Parcela: <?php echo formatMoeda($data['parcela']);?>
            <br><br>
            <hr>
            Atenciosamente,
            <br>
            <?php echo $consultor['nome'];?>
            <br>
            <?php echo formatCargo($consultor['perfil']);?>
            <br>
            Contato: <?php echo formatCel($consultor['celular']);?>
            
        </div>
    </div>
</div>