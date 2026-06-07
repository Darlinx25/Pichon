-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Jun 07, 2026 at 03:30 PM
-- Server version: 8.0.46
-- PHP Version: 8.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pichon_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `mensaje`
--

CREATE TABLE `mensaje` (
  `id_mensaje` int NOT NULL,
  `id_chat` int NOT NULL,
  `id_usuario` int NOT NULL,
  `contenido` text NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mensaje`
--

INSERT INTO `mensaje` (`id_mensaje`, `id_chat`, `id_usuario`, `contenido`, `fecha`) VALUES
(1, 6, 8, 'asd', '2026-06-07 14:09:57'),
(2, 5, 8, 'asdasd', '2026-06-07 14:10:09'),
(3, 5, 7, 'asdasd', '2026-06-07 14:10:15'),
(4, 5, 8, 'hola', '2026-06-07 14:10:19'),
(5, 5, 7, 'asdasd', '2026-06-07 14:19:13'),
(6, 5, 8, 'hola que tal tu como estas', '2026-06-07 14:19:19'),
(7, 5, 7, 'dime si eres felis', '2026-06-07 14:19:23'),
(8, 4, 8, 'asd', '2026-06-07 15:26:58'),
(9, 4, 8, 'asdasd', '2026-06-07 15:27:02'),
(10, 4, 8, 'asdasd', '2026-06-07 15:27:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`id_mensaje`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mensaje`
--
ALTER TABLE `mensaje`
  MODIFY `id_mensaje` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
