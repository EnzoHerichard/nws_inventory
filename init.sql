DROP DATABASE IF EXISTS `nwsmaterials`;
CREATE DATABASE nwsmaterials;

USE `nwsmaterials`;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `materials`;
CREATE TABLE `materials` (
  `idmaterials` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `isreserved` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idmaterials`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `materials` (`idmaterials`, `name`, `description`, `isreserved`) VALUES
(1,	'Ipad',	'64go',	0),
(2,	'test',	'test',	0),
(3,	'Pc',	'Lenovo 15pouces',	0),
(4,	'Chargeur Iphone',	'2m',	0);

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `idreservation` int NOT NULL AUTO_INCREMENT,
  /* `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,*/
  `idStudent` int DEFAULT NULL,
  `dateDeb` date DEFAULT NULL,
  `dateFin` date DEFAULT NULL,
  `idmaterials` int DEFAULT NULL,
  PRIMARY KEY (`idreservation`),
  FOREIGN KEY (`idmaterials`) REFERENCES `materials` (`idmaterials`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `reservations` (`idreservation`, `idStudent`, `dateDeb`, `dateFin`,`idmaterials`) VALUES
(1,	2,'2022-12-02',	'2022-12-03',1);

DELIMITER ;;

CREATE TRIGGER `after_reservations_delete` AFTER DELETE ON `reservations` FOR EACH ROW
UPDATE materials 
SET isreserved = 0 WHERE idmaterials = materials.idmaterials;;

DELIMITER ;

-- 2022-11-13 15:23:28
