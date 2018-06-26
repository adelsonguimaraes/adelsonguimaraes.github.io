#!/usr/bin/env php
<?php

require_once('./WebSockets.php');

class echoServer extends WebSocketServer {

  protected function process ($user, $message) {
    // processas as mensagens do cliente. No caso, é um eco apenas.
    $this->send($user, $message);
  }

  protected function connected ($user) {
    // inicialização executada quando um cliente é conectado.
  }

  protected function closed ($user) {
    // limpeza executada quando o cliente é desconectado.
  }
}

// cria o servidor na porta 9000 em todas as interfaces.
$echo = new echoServer("0.0.0.0", "9000");

try {
  $echo->run();
} catch ( \Exception $e ) {
  $echo->stdout($e->getMessage());
}