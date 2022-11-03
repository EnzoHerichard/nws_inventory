CREATE DATABASE nwsmaterials;
--
-- Structure de la table `materials`
--
USE nwsmaterials;

CREATE TABLE materials(
  idmaterials int(11) NOT NULL AUTO_INCREMENT,
  name varchar(45) DEFAULT NULL,
  description varchar(45) DEFAULT NULL,
  isreserved tinyint(1) DEFAULT 0,
  PRIMARY KEY (idmaterials)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- -----------------------------------------------------

CREATE TABLE reservations(
  idReservation int(11) NOT NULL,
  name int(11) DEFAULT NULL,
  email int(11) DEFAULT NULL,
  dateDeb date DEFAULT NULL,
  dateFin date DEFAULT NULL,
  idMaterials int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `materials`
--
ALTER TABLE materials
  ADD PRIMARY KEY (idmaterials);

--
-- Index pour la table `reservations`
--
ALTER TABLE reservations
  ADD PRIMARY KEY (idReservation),
  ADD KEY idMaterials (idMaterials);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE reservations
  ADD CONSTRAINT reservations_ibfk_1 FOREIGN KEY (idMaterials) REFERENCES materials (idmaterials);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;