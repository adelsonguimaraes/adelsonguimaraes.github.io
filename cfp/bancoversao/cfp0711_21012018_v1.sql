-- --------------------------------------------------------
-- Servidor:                     cfp.mysql.uhserver.com
-- Versão do servidor:           5.6.26-log - MySQL Community Server (GPL)
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              9.4.0.5174
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para cfp
CREATE DATABASE IF NOT EXISTS `cfp` /*!40100 DEFAULT CHARACTER SET latin1 */;
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

-- Copiando dados para a tabela cfp.categoria: ~12 rows (aproximadamente)
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='Tabela Master de Conta(a pagar ou a receber)';

-- Copiando dados para a tabela cfp.conta: ~3 rows (aproximadamente)
DELETE FROM `conta`;
/*!40000 ALTER TABLE `conta` DISABLE KEYS */;
INSERT INTO `conta` (`id`, `idusuario`, `idcategoria`, `descricao`, `valor`, `parcela`, `indeterminada`, `tipo`, `status`, `datavencimento`, `sync`, `datacadastro`, `dataedicao`) VALUES
	(8, 2, 8, 'Gasolina', 100.00, 1, 'NAO', 'APAGAR', 'EMABERTO', '2018-01-19', 'SIM', '2018-01-19 05:44:12', '2018-01-19 05:44:32'),
	(10, 1, 8, 'Concerto Carro Motor', 185.00, 3, 'NAO', 'APAGAR', 'EMABERTO', '2018-02-15', 'SIM', '2018-01-19 05:57:40', '2018-01-21 07:02:12'),
	(11, 5, 6, 'Faculdade', 219.79, 6, 'NAO', 'APAGAR', 'EMABERTO', '2018-01-30', 'SIM', '2018-01-19 10:48:53', '2018-01-19 10:56:58'),
	(12, 2, 9, 'energia', 500.00, 0, 'NAO', 'APAGAR', 'EMABERTO', '2018-01-19', 'SIM', '2018-01-19 11:19:13', '2018-01-19 23:20:11');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='Usuario do Sistema';

-- Copiando dados para a tabela cfp.usuario: ~1 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `ativo`, `perfil`, `pushkey`, `sync`, `datacadastro`, `dataedicao`) VALUES
	(1, 'Adelson Guimarães', 'adelsonguimaraes@gmail.com', '202cb962ac59075b964b07152d234b70', 'SIM', 'USUARIO', NULL, NULL, '2018-01-09 01:31:38', NULL),
	(2, 'Dayane Felix', 'dayane.felix3938@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'SIM', 'USUARIO', NULL, NULL, '2018-01-19 19:40:27', NULL),
	(3, 'Niltons Caldas', 'niltonbox@gmail.com', '202cb962ac59075b964b07152d234b70', 'SIM', 'USUARIO', NULL, NULL, '2018-01-19 21:57:46', NULL),
	(4, 'Samuelson Brito', 'samuelsonma@gmail.com', '202cb962ac59075b964b07152d234b70', 'SIM', 'USUARIO', NULL, NULL, '2018-01-20 00:20:55', NULL),
	(5, 'Raquel Queiroz', 'raquelaraujoqueiroz1@gmail.com', '202cb962ac59075b964b07152d234b70', 'SIM', 'USUARIO', NULL, NULL, '2018-01-20 00:41:55', NULL),
	(6, 'Zelinda Guimarães', 'zelindadeguimaraes@gmail.com', '202cb962ac59075b964b07152d234b70', 'SIM', 'USUARIO', NULL, NULL, '2018-01-20 15:37:39', NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
