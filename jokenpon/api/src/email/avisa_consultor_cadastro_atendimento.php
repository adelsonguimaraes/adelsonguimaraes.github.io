<?php
    header('Content-Type: text/html; charset=utf-8');
    ob_start();
?>

<div style="border: 1px solid black; height: 480px; width: 600px; padding:10px; background: #4c347b;">
    <div style="padding:15px; width:100%; color: #fff; text-align: center; font-size: 32px;font-family: sans-serif;">NOVO CADASTRO VIA ATENDIMENTO</div>
    <div style="display: flex; padding: 10px;">
        <img height="120" width="20%" style="margin: 10px; margin-top: 70px;" src="https://www.adelsonguimaraes.com.br/incubus/libs/img/icons/icon-512x512.png" alt="">
        <div style="flex:1; padding: 10px; color:#fff !important;font-size: 16px; font-family: sans-serif; text-align: justify;">
            Olá, há uma nova solicitação de simulação via sua página de atendimento.
            <br><br>
            Dados da Solicitação:
            <hr>
            <br>
            Cliente: <?php echo $data['nome'];?>
            <br>
            Celular: <?php echo formatCel($data['celular']);?>
            <br>
            Email: <?php echo $data['email'];?>
            <br>
            Interesse: <?php echo formatInteresse($data['interesse']);?>
            <br>
            Valor: <?php echo formatMoeda($data['valor']);?>
            <br>
            Entrada: <?php echo formatMoeda($data['entrada']);?>
            <br>
            Parcela: <?php echo formatMoeda($data['parcela']);?>
            <br><br>
            As informações foram capturadas e salvas no sistema.
            
        </div>
    </div>
</div>