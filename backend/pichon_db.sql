-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 17-06-2026 a las 19:27:44
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
(1, 1, 2),
(2, 2, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 1),
(6, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id_usuario` int NOT NULL,
  `id_contacto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje`
--

CREATE TABLE `mensaje` (
  `id_mensaje` int NOT NULL,
  `id_chat` int NOT NULL,
  `id_usuario` int NOT NULL,
  `contenido` text NOT NULL,
  `fecha` datetime NOT NULL,
  `leido` tinyint(1) NOT NULL DEFAULT '0',
  `tipo` varchar(10) NOT NULL DEFAULT 'text',
  `archivo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(1, NULL, NULL, NULL, NULL),
(2, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL),
(4, NULL, NULL, NULL, NULL);

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
  `img` varchar(255) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `activado` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `username`, `email`, `password`, `alias`, `img`, `token`, `activado`) VALUES
(1, 'facundo', 'facundo@hotmail.com', '$2y$10$YE3IGd3IuxEhqhefqTUUHub6q3a73mBhdM2az0C0ZnX.QEacAKUXq', 'facundo', '', '', 0),
(2, 'alexis', 'alexis@hotmail.com', '$2y$10$u3pAl30Kdrc5I8qYrRisRu5NSgwIdXKRx3Fkn40XPSZFYeKjQQmfO', 'alexis', '', '', 0),
(3, 'ignacio', 'ignacio@hotmail.com', '$2y$10$W/0czXBLERu6xrx8sA7EbeYCmG2SiSQhbVKF1BNIklhoC9JpQCI/O', 'ignacio', '', '', 0),
(4, 'kevin', 'kevin@hotmail.com', '$2y$10$8Z14s0OGns5qdk.MjhyLjOGvz/p9vVvLsgXeyQUG4CebUBowy0VVi', 'kevin', '', '', 0);

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
  MODIFY `id_chat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  MODIFY `id_mensaje` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
