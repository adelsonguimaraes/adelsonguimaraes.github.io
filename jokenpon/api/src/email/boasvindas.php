<?php
    header('Content-Type: text/html; charset=utf-8');
    ob_start();
?>

<a href="https://www.adelsonguimaraes.com.br/incubus/" style="text-decoration:none;">
    <div style="border: 1px solid black; height: 480px; width: 600px; padding:10px; background: #4c347b;">
        <div style="padding:15px; width:100%; color: #fff; text-align: center; font-size: 35px;font-family: sans-serif;">BEM VINDO AO INCUBUS!!!</div>
        <div style="display: flex; padding: 10px;">
            <img height="120" width="20%" style="margin-top: 70px;" src="https://www.adelsonguimaraes.com.br/incubus/libs/img/icons/icon-512x512.png" alt="">
            <div style="flex:1; padding: 10px; color:#fff;font-size: 18px; font-family: sans-serif; text-align: justify;">
                Olá <?php echo $data['nome'];?>, você foi convidado para acessar o Sistema de Gerenciamento de Consultoria de Vendas.
                <br><br>
                Seus dados de acesso são:
                <br>
                email: <?php echo $data['email'];?>
                <br>
                senha: incubus@123
                <br><br>
                Para acessar basta clicar nesta mensagem.
                <br><br>
                Atenciosamente,
                <br>
                <?php echo $usuario['nome'];?>
                <br>
                Supervisora de Vendas
                <br>
                Contato: <?php echo formatCel($usuario['celular']);?>
                
            </div>
        </div>
    </div>
</a>