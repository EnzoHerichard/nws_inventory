-- Adminer 4.8.1 MySQL 8.0.31 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE IF NOT EXISTS nwsmaterials;

USE `nwsmaterials`;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `materials`;
CREATE TABLE `materials` (
  `idmaterials` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `isreserved` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idmaterials`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `materials` (`idmaterials`, `name`, `description`, `isreserved`) VALUES
(2,	'Ipad',	'64go',	0),
(6,	'test',	'test',	0),
(7,	'Pc',	'Lenovo 15pouces',	0),
(8,	'Chargeur Iphone',	'2m',	0);

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `idreservation` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `dateDeb` date DEFAULT NULL,
  `dateFin` date DEFAULT NULL,
  `idmaterials` int DEFAULT NULL,
  PRIMARY KEY (`idreservation`),
  KEY `idMaterials` (`idmaterials`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`idmaterials`) REFERENCES `materials` (`idmaterials`),
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`idmaterials`) REFERENCES `materials` (`idmaterials`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DELIMITER ;;

CREATE TRIGGER `after_reservations_delete` AFTER DELETE ON `reservations` FOR EACH ROW
UPDATE materials 
SET isreserved = 0 WHERE idmaterials = materials.idmaterials;;

DELIMITER ;

-- 2022-11-13 15:23:28
