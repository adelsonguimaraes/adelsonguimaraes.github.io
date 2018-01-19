-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.21-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para cfp
CREATE DATABASE IF NOT EXISTS `cfp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cfp`;

-- Copiando estrutura para tabela cfp.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) DEFAULT NULL,
  `tipo` enum('APAGAR','ARECEBER','AMBOS') DEFAULT 'AMBOS',
  `sync` enum('SIM','NAO') DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='Tipo de Despesa ou Recebimento';

-- Copiando dados para a tabela cfp.categoria: ~13 rows (aproximadamente)
DELETE FROM `categoria`;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` (`id`, `descricao`, `tipo`, `sync`, `ativo`, `datacadastro`, `dataedicao`) VALUES
	(1, 'Alimentação', 'APAGAR', 'SIM', 'SIM', '2018-01-18 14:10:24', '2018-01-18 15:56:52'),
	(2, 'Salário', 'ARECEBER', 'SIM', 'SIM', '2018-01-18 14:10:24', '2018-01-18 15:56:52'),
	(3, '13ª Salário', 'ARECEBER', 'SIM', 'SIM', '2018-01-18 14:10:25', '2018-01-18 15:56:52'),
	(4, 'Férias', 'ARECEBER', 'SIM', 'SIM', '2018-01-18 14:10:25', '2018-01-18 15:56:53'),
	(5, 'Vestuário', 'APAGAR', 'SIM', 'SIM', '2018-01-18 14:10:25', '2018-01-18 15:56:53'),
	(6, 'Estudo', 'APAGAR', 'SIM', 'SIM', '2018-01-18 14:10:26', '2018-01-18 15:56:53'),
	(7, 'Higiene Pessoal', 'APAGAR', 'SIM', 'SIM', '2018-01-18 14:10:26', '2018-01-18 15:56:53'),
	(8, 'Transporte', 'APAGAR', 'SIM', 'SIM', '2018-01-18 14:10:27', '2018-01-18 15:56:58'),
	(9, 'Casa', 'APAGAR', 'SIM', 'SIM', '2018-01-18 14:10:27', '2018-01-18 15:56:53'),
	(10, 'Saúde', 'APAGAR', 'SIM', 'SIM', '2018-01-18 14:10:27', '2018-01-18 15:56:54'),
	(11, 'Lazer', 'APAGAR', 'SIM', 'SIM', '2018-01-18 14:10:28', '2018-01-18 15:56:54'),
	(12, 'Outros', 'AMBOS', 'SIM', 'SIM', '2018-01-18 14:10:28', '2018-01-18 15:56:54');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;

-- Copiando estrutura para tabela cfp.conta
CREATE TABLE IF NOT EXISTS `conta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) DEFAULT NULL,
  `idcategoria` int(11) DEFAULT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `parcela` int(11) DEFAULT NULL,
  `indeterminada` enum('SIM','NAO') DEFAULT NULL,
  `tipo` enum('APAGAR','ARECEBER') DEFAULT NULL,
  `status` enum('EMABERTO','FINALIZADO','ATRASADO') DEFAULT NULL,
  `datavencimento` date DEFAULT NULL,
  `sync` enum('SIM','NAO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_conta_usuario` (`idusuario`),
  KEY `FK_conta_categoria` (`idcategoria`),
  CONSTRAINT `FK_conta_categoria` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`id`),
  CONSTRAINT `FK_conta_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='Tabela Master de Conta(a pagar ou a receber)';

-- Copiando dados para a tabela cfp.conta: ~1 rows (aproximadamente)
DELETE FROM `conta`;
/*!40000 ALTER TABLE `conta` DISABLE KEYS */;
/*!40000 ALTER TABLE `conta` ENABLE KEYS */;

-- Copiando estrutura para tabela cfp.contamovimentacao
CREATE TABLE IF NOT EXISTS `contamovimentacao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idconta` int(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `datareferencia` date DEFAULT NULL,
  `sync` enum('SIM','NAO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_contamovimentacao_conta` (`idconta`),
  CONSTRAINT `FK_contamovimentacao_conta` FOREIGN KEY (`idconta`) REFERENCES `conta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Movimentacao das Contas a pagar e receber';

-- Copiando dados para a tabela cfp.contamovimentacao: ~0 rows (aproximadamente)
DELETE FROM `contamovimentacao`;
/*!40000 ALTER TABLE `contamovimentacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `contamovimentacao` ENABLE KEYS */;

-- Copiando estrutura para tabela cfp.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  `ativo` enum('SIM','NAO') DEFAULT NULL,
  `perfil` enum('ADMIN','USUARIO','CONVIDADO') NOT NULL DEFAULT 'USUARIO',
  `pushkey` text,
  `sync` enum('SIM','NAO') DEFAULT NULL,
  `datacadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataedicao` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Usuario do Sistema';

-- Copiando dados para a tabela cfp.usuario: ~0 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `ativo`, `perfil`, `pushkey`, `sync`, `datacadastro`, `dataedicao`) VALUES
	(1, 'Adelson Guimarães', 'adelsonguimaraes@gmail.com', '202cb962ac59075b964b07152d234b70', 'SIM', 'USUARIO', NULL, NULL, '2018-01-09 01:31:38', NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
