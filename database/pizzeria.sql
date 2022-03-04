-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 04. Mrz 2022 um 13:58
-- Server-Version: 10.4.17-MariaDB
-- PHP-Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `pizzeria`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bestellung`
--

CREATE TABLE `bestellung` (
  `bID` int(3) NOT NULL,
  `datum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bestellung_koch`
--

CREATE TABLE `bestellung_koch` (
  `pID` int(3) NOT NULL,
  `bID` int(3) NOT NULL,
  `fertig` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bestellung_kunde`
--

CREATE TABLE `bestellung_kunde` (
  `pID` int(3) NOT NULL,
  `bID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bestellung_pizza`
--

CREATE TABLE `bestellung_pizza` (
  `pNr` int(3) NOT NULL,
  `bID` int(3) NOT NULL,
  `position` int(11) NOT NULL,
  `menge` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `koch`
--

CREATE TABLE `koch` (
  `pID` int(3) NOT NULL,
  `sterne` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `koch`
--

INSERT INTO `koch` (`pID`, `sterne`) VALUES
(100, 5),
(101, 2),
(102, 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kunde`
--

CREATE TABLE `kunde` (
  `pID` int(3) NOT NULL,
  `plz` varchar(10) NOT NULL,
  `telNr` varchar(50) NOT NULL,
  `straße` varchar(50) NOT NULL,
  `hausNr` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `kunde`
--

INSERT INTO `kunde` (`pID`, `plz`, `telNr`, `straße`, `hausNr`) VALUES
(103, '60318', '069/432991', 'Spohrstraße', 11),
(104, '60311', '069/185662', 'Töngesgasse', 12),
(105, '60594', '069/1001281', 'Gartenstraße', 7),
(106, '60322', '069/312232', 'Baustraße', 5),
(107, '35463', '0641/123465', 'Tulpenweg', 23);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `person`
--

CREATE TABLE `person` (
  `pID` int(3) NOT NULL,
  `name` varchar(50) NOT NULL,
  `vorname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `person`
--

INSERT INTO `person` (`pID`, `name`, `vorname`) VALUES
(100, 'Müller', 'Fabian'),
(101, 'Fromm', 'Katja'),
(102, 'Hader', 'Valentin'),
(103, 'Wacker', 'Daniela'),
(104, 'Klein', 'Arnold'),
(105, 'Becker', 'Kurt'),
(106, 'Lenz', 'Andreas'),
(107, 'Stein', 'Phillip');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pizza`
--

CREATE TABLE `pizza` (
  `pNr` int(11) NOT NULL,
  `bezeichnung` varchar(50) NOT NULL,
  `preis` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `pizza`
--

INSERT INTO `pizza` (`pNr`, `bezeichnung`, `preis`) VALUES
(200, 'Salami', 5),
(201, 'Margherita', 4.5),
(202, 'Funghi', 5.5),
(203, 'Hawaii', 6),
(204, 'Vegataria', 7),
(205, '4-Käse', 8.5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pizza_zutat`
--

CREATE TABLE `pizza_zutat` (
  `pNr` int(3) NOT NULL,
  `zNr` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `pizza_zutat`
--

INSERT INTO `pizza_zutat` (`pNr`, `zNr`) VALUES
(200, 300),
(200, 304),
(201, 300),
(201, 301),
(202, 300),
(202, 308),
(203, 300),
(203, 305),
(203, 306),
(204, 301),
(204, 307),
(204, 308),
(204, 309),
(204, 310),
(205, 300),
(205, 301),
(205, 302),
(205, 303);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zutat`
--

CREATE TABLE `zutat` (
  `zNr` int(3) NOT NULL,
  `bezeichnung` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `zutat`
--

INSERT INTO `zutat` (`zNr`, `bezeichnung`) VALUES
(300, 'Gouda'),
(301, 'Mozzarella'),
(302, 'Edamer'),
(303, 'Bergkäse'),
(304, 'Salami'),
(305, 'Schinken'),
(306, 'Annanas'),
(307, 'Zwiebeln'),
(308, 'Champignons'),
(309, 'Tomaten'),
(310, 'Zucchini');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `bestellung`
--
ALTER TABLE `bestellung`
  ADD PRIMARY KEY (`bID`);

--
-- Indizes für die Tabelle `bestellung_koch`
--
ALTER TABLE `bestellung_koch`
  ADD PRIMARY KEY (`pID`,`bID`),
  ADD UNIQUE KEY `pID` (`pID`,`bID`),
  ADD KEY `bestellung_koch_ibfk_1` (`bID`);

--
-- Indizes für die Tabelle `bestellung_kunde`
--
ALTER TABLE `bestellung_kunde`
  ADD PRIMARY KEY (`pID`,`bID`),
  ADD KEY `bestellung_kunde_ibfk_2` (`bID`);

--
-- Indizes für die Tabelle `bestellung_pizza`
--
ALTER TABLE `bestellung_pizza`
  ADD PRIMARY KEY (`pNr`,`bID`),
  ADD KEY `bestellung_pizza_ibfk_1` (`bID`);

--
-- Indizes für die Tabelle `koch`
--
ALTER TABLE `koch`
  ADD PRIMARY KEY (`pID`);

--
-- Indizes für die Tabelle `kunde`
--
ALTER TABLE `kunde`
  ADD PRIMARY KEY (`pID`);

--
-- Indizes für die Tabelle `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`pID`);

--
-- Indizes für die Tabelle `pizza`
--
ALTER TABLE `pizza`
  ADD PRIMARY KEY (`pNr`);

--
-- Indizes für die Tabelle `pizza_zutat`
--
ALTER TABLE `pizza_zutat`
  ADD PRIMARY KEY (`pNr`,`zNr`),
  ADD KEY `zNr` (`zNr`);

--
-- Indizes für die Tabelle `zutat`
--
ALTER TABLE `zutat`
  ADD PRIMARY KEY (`zNr`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `bestellung`
--
ALTER TABLE `bestellung`
  MODIFY `bID` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `kunde`
--
ALTER TABLE `kunde`
  MODIFY `pID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT für Tabelle `pizza`
--
ALTER TABLE `pizza`
  MODIFY `pNr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=206;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `bestellung_koch`
--
ALTER TABLE `bestellung_koch`
  ADD CONSTRAINT `FK` FOREIGN KEY (`pID`) REFERENCES `koch` (`pID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bestellung_koch_ibfk_1` FOREIGN KEY (`bID`) REFERENCES `bestellung` (`bID`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `bestellung_kunde`
--
ALTER TABLE `bestellung_kunde`
  ADD CONSTRAINT `bestellung_kunde_ibfk_1` FOREIGN KEY (`pID`) REFERENCES `kunde` (`pID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bestellung_kunde_ibfk_2` FOREIGN KEY (`bID`) REFERENCES `bestellung` (`bID`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `bestellung_pizza`
--
ALTER TABLE `bestellung_pizza`
  ADD CONSTRAINT `bestellung_pizza_ibfk_1` FOREIGN KEY (`bID`) REFERENCES `bestellung` (`bID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bestellung_pizza_ibfk_2` FOREIGN KEY (`pNr`) REFERENCES `pizza` (`pNr`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `koch`
--
ALTER TABLE `koch`
  ADD CONSTRAINT `pID` FOREIGN KEY (`pID`) REFERENCES `person` (`pID`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `kunde`
--
ALTER TABLE `kunde`
  ADD CONSTRAINT `kunde_ibfk_1` FOREIGN KEY (`pID`) REFERENCES `person` (`pID`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `pizza_zutat`
--
ALTER TABLE `pizza_zutat`
  ADD CONSTRAINT `pizza_zutat_ibfk_1` FOREIGN KEY (`pNr`) REFERENCES `pizza` (`pNr`),
  ADD CONSTRAINT `pizza_zutat_ibfk_2` FOREIGN KEY (`zNr`) REFERENCES `zutat` (`zNr`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
