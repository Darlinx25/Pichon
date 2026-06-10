-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Jun 08, 2026 at 08:54 PM
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
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id_chat` int NOT NULL,
  `id_usuario1` int NOT NULL,
  `id_usuario2` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id_chat`, `id_usuario1`, `id_usuario2`) VALUES
(1, 8, 4),
(2, 7, 4),
(3, 7, 5),
(4, 8, 8),
(5, 8, 7),
(6, 8, 5),
(7, 7, 6),
(8, 7, 7),
(9, 8, 6),
(10, 9, 4),
(11, 9, 7),
(12, 9, 8),
(13, 9, 5),
(14, 9, 6),
(15, 9, 9);

-- --------------------------------------------------------

--
-- Table structure for table `contactos`
--

CREATE TABLE `contactos` (
  `id_usuario` int NOT NULL,
  `id_contacto` int NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_contacto`),
  CONSTRAINT `fk_contactos_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_contactos_contacto` FOREIGN KEY (`id_contacto`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `perfil`
--

CREATE TABLE `perfil` (
  `id` int NOT NULL,
  `genero` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `idioma` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `perfil`
--

INSERT INTO `perfil` (`id`, `genero`, `fecha_nacimiento`, `idioma`, `estado`) VALUES
(10, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alias` varchar(30) NOT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `username`, `email`, `password`, `alias`, `img`) VALUES
(4, 'facundo', 'fedil96585@qvmao.com', '$2y$10$M9fbsVmr2ZNRCLLOi3KSXuIkpLZiJHN4iSGcWZY7FahsA1brLIBxO', 'faxcundo', '1780839989_0e99dd2f.webp'),
(5, 'alexis', 'asdasdq@asd.com', '$2y$10$22qLcBxbUVGimHqamx7XHOJBa5Jx3cyWivhnQQ6FzrxYNik9NShdW', 'alexis', '1780840011_5c2d8158.gif'),
(6, 'ignacio', 'asdasd@asd.com', '$2y$10$lIu06pZoWjedBGUKRzUJsOAMwDg3FPMhuafA3CavXrhEvPKlWglOS', 'ignacio', '1780840022_176b97ef.webp'),
(7, 'kevin', 'as@kevin.com', '$2y$10$g2fLdefRERbmCZQdGv.qe.T76206OefVcvrYi01BVx7t4Ffoe3yOG', 'kevin chanfle', '1780840043_eae2a7ee.jpg'),
(8, 'duko', 'sanchez@corrupto.com', '$2y$10$VawAK36iLjaq3i4pKGNtLO.udBGupXujOaH1mOomlI190nclMGXAq', 'Duko', '1780840101_0eb5cee9.jpg'),
(9, 'pepe', 'pepelol@hotmail.com', '$2y$10$Rab220B8mi9s3IG4U1vtY.YhzXTno9GAuRBYijxDF/KLKmBCc9pM2', 'pepelol', '1780864631_00ab0de9.jpg'),
(10, 'lolito', 'lolito@lolo.com', '$2y$10$oybGvCAfwUHgAgneH8/zeOWE6H.LY0Nz5AWl9idOz4J/S.oYUa/NK', 'Lolito Garza', '1780951962_51202b01.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`);

--
-- Indexes for table `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`id_mensaje`);

--
-- Indexes for table `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `mensaje`
--
ALTER TABLE `mensaje`
  MODIFY `id_mensaje` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `id_perfil` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
