-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 10-06-2026 a las 22:15:49
-- Versión del servidor: 8.0.46
-- Versión de PHP: 8.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pichon_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `id_chat` int NOT NULL,
  `id_usuario1` int NOT NULL,
  `id_usuario2` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `chat`
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
(15, 9, 9),
(16, 11, 4),
(17, 11, 5),
(18, 11, 6),
(19, 11, 9),
(20, 11, 10),
(21, 11, 8),
(22, 11, 7),
(23, 11, 12),
(24, 11, 11),
(25, 7, 10),
(26, 7, 12),
(27, 13, 4),
(28, 13, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id_usuario` int NOT NULL,
  `id_contacto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id_usuario`, `id_contacto`) VALUES
(11, 4),
(11, 5),
(13, 5),
(11, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje`
--

CREATE TABLE `mensaje` (
  `id_mensaje` int NOT NULL,
  `id_chat` int NOT NULL,
  `id_usuario` int NOT NULL,
  `contenido` text NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mensaje`
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
(10, 4, 8, 'asdasd', '2026-06-07 15:27:04'),
(11, 16, 11, 'asdawfaw', '2026-06-08 23:31:14'),
(12, 16, 11, 'holii', '2026-06-09 21:58:09'),
(13, 16, 11, 'holaaa', '2026-06-09 21:58:12'),
(14, 16, 11, 'añoooo', '2026-06-09 21:58:14'),
(15, 23, 11, 'halooo', '2026-06-09 21:58:44'),
(16, 23, 12, 'aloooo', '2026-06-09 21:59:02'),
(17, 22, 11, 'aloooo', '2026-06-10 20:17:26'),
(18, 22, 11, 'hihiiiii', '2026-06-10 20:17:29'),
(19, 22, 7, 'hiiii', '2026-06-10 20:18:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `id` int NOT NULL,
  `genero` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `idioma` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`id`, `genero`, `fecha_nacimiento`, `idioma`, `estado`) VALUES
(10, NULL, NULL, NULL, NULL),
(11, '', NULL, '', 'lol'),
(12, NULL, NULL, NULL, NULL),
(13, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
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
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `username`, `email`, `password`, `alias`, `img`) VALUES
(4, 'facundo', 'fedil96585@qvmao.com', '$2y$10$M9fbsVmr2ZNRCLLOi3KSXuIkpLZiJHN4iSGcWZY7FahsA1brLIBxO', 'faxcundo', '1780839989_0e99dd2f.webp'),
(5, 'alexis', 'asdasdq@asd.com', '$2y$10$22qLcBxbUVGimHqamx7XHOJBa5Jx3cyWivhnQQ6FzrxYNik9NShdW', 'alexis', '1780840011_5c2d8158.gif'),
(6, 'ignacio', 'asdasd@asd.com', '$2y$10$lIu06pZoWjedBGUKRzUJsOAMwDg3FPMhuafA3CavXrhEvPKlWglOS', 'ignacio', '1780840022_176b97ef.webp'),
(7, 'kevin', 'as@kevin.com', '$2y$10$g2fLdefRERbmCZQdGv.qe.T76206OefVcvrYi01BVx7t4Ffoe3yOG', 'kevin chanfle', '1780840043_eae2a7ee.jpg'),
(8, 'duko', 'sanchez@corrupto.com', '$2y$10$VawAK36iLjaq3i4pKGNtLO.udBGupXujOaH1mOomlI190nclMGXAq', 'Duko', '1780840101_0eb5cee9.jpg'),
(9, 'pepe', 'pepelol@hotmail.com', '$2y$10$Rab220B8mi9s3IG4U1vtY.YhzXTno9GAuRBYijxDF/KLKmBCc9pM2', 'pepelol', '1780864631_00ab0de9.jpg'),
(10, 'lolito', 'lolito@lolo.com', '$2y$10$oybGvCAfwUHgAgneH8/zeOWE6H.LY0Nz5AWl9idOz4J/S.oYUa/NK', 'Lolito Garza', '1780951962_51202b01.jpg'),
(11, 'menalex', 'alexismenchaca2005@gmail.com', '$2y$10$HXyACwTbcr0i0u6dZD8VEekvpuDnhY1QKdd0n7lDOpMcs3FWvg0ta', 'menalex', '1781042437_8a4fe1ec.jpeg'),
(12, 'menalex2', 'alexismenchaca2004@gmail.com', '$2y$10$PuSj/cFtpENXdJrPb1bl1.MykdIOjvcADYwiLIpfQBtvHs0DV4Koy', 'demostracion', '1781040919_02559a20.jpeg'),
(13, 'menalex5', 'alex@gmail.com', '$2y$10$6qSBfp7BjLqsHlkahCrsI.wWr9LPksZ4iZLGdRgjuEHJG8oFTFUNm', 'menalex3', '1781122744_cbb989f3.jpeg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id_usuario`,`id_contacto`),
  ADD KEY `fk_contactos_contacto` (`id_contacto`);

--
-- Indices de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`id_mensaje`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  MODIFY `id_mensaje` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD CONSTRAINT `fk_contactos_contacto` FOREIGN KEY (`id_contacto`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_contactos_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `id_perfil` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
