-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.25-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.4.0.5174
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para cfp
CREATE DATABASE IF NOT EXISTS `cfp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cfp`;

-- Copiando estrutura para tabela cfp.despesa
CREATE TABLE IF NOT EXISTS `despesa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) DEFAULT NULL,
  `idtipo` int(11) DEFAULT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_despesas_usuario` (`idusuario`),
  KEY `FK_despesas_tipo` (`idtipo`),
  CONSTRAINT `FK_despesas_tipo` FOREIGN KEY (`idtipo`) REFERENCES `tipo` (`id`),
  CONSTRAINT `FK_despesas_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela de despesas do usuario';

-- Copiando dados para a tabela cfp.despesa: ~0 rows (aproximadamente)
DELETE FROM `despesa`;
/*!40000 ALTER TABLE `despesa` DISABLE KEYS */;
/*!40000 ALTER TABLE `despesa` ENABLE KEYS */;

-- Copiando estrutura para tabela cfp.despesaparcela
CREATE TABLE IF NOT EXISTS `despesaparcela` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iddespesa` int(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `valorpago` decimal(10,2) DEFAULT NULL,
  `datavencimento` date DEFAULT NULL,
  `datapagamento` date DEFAULT NULL,
  `status` enum('EMABERTO','PAGO','ATRASADO') DEFAULT 'EMABERTO',
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_despesaparcela_despesas` (`iddespesa`),
  CONSTRAINT `FK_despesaparcela_despesas` FOREIGN KEY (`iddespesa`) REFERENCES `despesa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Parcelas de uma Despesa';

-- Copiando dados para a tabela cfp.despesaparcela: ~0 rows (aproximadamente)
DELETE FROM `despesaparcela`;
/*!40000 ALTER TABLE `despesaparcela` DISABLE KEYS */;
/*!40000 ALTER TABLE `despesaparcela` ENABLE KEYS */;

-- Copiando estrutura para tabela cfp.recebimento
CREATE TABLE IF NOT EXISTS `recebimento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) DEFAULT NULL,
  `idtipo` int(11) DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_recebimento_usuario` (`idusuario`),
  KEY `FK_recebimento_tipo` (`idtipo`),
  CONSTRAINT `FK_recebimento_tipo` FOREIGN KEY (`idtipo`) REFERENCES `tipo` (`id`),
  CONSTRAINT `FK_recebimento_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Recebimentos do Usuário';

-- Copiando dados para a tabela cfp.recebimento: ~0 rows (aproximadamente)
DELETE FROM `recebimento`;
/*!40000 ALTER TABLE `recebimento` DISABLE KEYS */;
/*!40000 ALTER TABLE `recebimento` ENABLE KEYS */;

-- Copiando estrutura para tabela cfp.recebimentoparcela
CREATE TABLE IF NOT EXISTS `recebimentoparcela` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idrecebimento` int(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `valorrecebido` decimal(10,2) DEFAULT NULL,
  `datavencimento` date DEFAULT NULL,
  `datarecebimento` date DEFAULT NULL,
  `status` enum('EMABERTO','RECEBIDO','ATRASADO') DEFAULT 'EMABERTO',
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_recebimentoparcela_recebimento` (`idrecebimento`),
  CONSTRAINT `FK_recebimentoparcela_recebimento` FOREIGN KEY (`idrecebimento`) REFERENCES `recebimento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Parelas de Recebimento';

-- Copiando dados para a tabela cfp.recebimentoparcela: ~0 rows (aproximadamente)
DELETE FROM `recebimentoparcela`;
/*!40000 ALTER TABLE `recebimentoparcela` DISABLE KEYS */;
/*!40000 ALTER TABLE `recebimentoparcela` ENABLE KEYS */;

-- Copiando estrutura para tabela cfp.tipo
CREATE TABLE IF NOT EXISTS `tipo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) DEFAULT NULL,
  `uso` enum('RECEBIMENTO','DESPESA','AMBOS') DEFAULT 'AMBOS',
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tipo de Despesa ou Recebimento';

-- Copiando dados para a tabela cfp.tipo: ~0 rows (aproximadamente)
DELETE FROM `tipo`;
/*!40000 ALTER TABLE `tipo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo` ENABLE KEYS */;

-- Copiando estrutura para tabela cfp.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT NULL,
  `authentication` varchar(50) DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Usuario do Sistema';

-- Copiando dados para a tabela cfp.usuario: ~0 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
