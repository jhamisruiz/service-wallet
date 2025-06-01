-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mariadb_database
-- Tiempo de generación: 01-06-2025 a las 04:27:33
-- Versión del servidor: 11.3.2-MariaDB-1:11.3.2+maria~ubu2204
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_wallet_epayco`
--
CREATE DATABASE IF NOT EXISTS `db_wallet_epayco` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_wallet_epayco`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `documento`, `nombres`, `apellidos`, `email`, `celular`, `created_at`) VALUES
(1, '876543213', 'jhoel jh', 'castillo', 'jh@email.com', '987654321', '2025-05-31 19:55:41'),
(2, '934532334', 'jon', 'does editado', 'does@email.com', '5674323', '2025-05-31 21:33:03'),
(3, '43256712', 'juan', 'perez perez', 'perez@email.com', '987657543', '2025-06-01 01:50:17'),
(5, '87666776', 'ami', 'rr', 'email@e.com', '345345663', '2025-06-01 03:53:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

DROP TABLE IF EXISTS `pago`;
CREATE TABLE `pago` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `estado` enum('pendiente','confirmado','fallido') DEFAULT 'pendiente',
  `token` varchar(6) NOT NULL,
  `session_id` varchar(64) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `confirmed_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`id`, `id_cliente`, `valor`, `estado`, `token`, `session_id`, `created_at`, `confirmed_at`) VALUES
(1, 1, 111.00, 'confirmado', 'qwerty', 'JQwd8CmeSgm_otL5CnHIcLPJFig', '2025-05-31 22:08:16', '2025-05-31 23:44:55'),
(2, 1, 1000.00, 'confirmado', 'AD6444', 'JQwd8CmeSgm_otL5CnHIcLPJFig', NULL, '2025-06-01 00:07:03'),
(3, 1, 200.00, 'confirmado', 'JT1510', 'JQwd8CmeSgm_otL5CnHIcLPJFig', '2025-06-01 01:54:30', '2025-06-01 01:55:39'),
(4, 3, 200.00, 'pendiente', 'JT3010', 'JQwd8CmeSgm_otL5CnHIcLPJFig', '2025-06-01 01:58:17', NULL),
(5, 1, 342.00, 'pendiente', 'JT1010', 'JQwd8CmeSgm_otL5CnHIcLPJFig', '2025-06-01 03:59:16', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recarga`
--

DROP TABLE IF EXISTS `recarga`;
CREATE TABLE `recarga` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recarga`
--

INSERT INTO `recarga` (`id`, `id_cliente`, `valor`, `fecha`) VALUES
(1, 1, 1000.00, '2025-05-31 21:22:11'),
(2, 1, 230.00, '2025-06-01 01:57:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `id_wallet` int(11) NOT NULL,
  `transaction_type` enum('RECARGA','PAGO') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_date` datetime DEFAULT current_timestamp(),
  `status` enum('COMPLETADA','PENDIENTE','FALLIDA') NOT NULL DEFAULT 'PENDIENTE',
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_wallet_cliente`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `vista_wallet_cliente`;
CREATE TABLE `vista_wallet_cliente` (
`id` int(11)
,`saldo` decimal(10,2)
,`id_cliente` int(11)
,`documento` varchar(20)
,`nombres` varchar(100)
,`apellidos` varchar(100)
,`email` varchar(100)
,`celular` varchar(20)
,`created_at` datetime
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `wallet`
--

DROP TABLE IF EXISTS `wallet`;
CREATE TABLE `wallet` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `saldo` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `wallet`
--

INSERT INTO `wallet` (`id`, `id_cliente`, `saldo`) VALUES
(1, 1, 3017.82),
(2, 2, 0.00),
(3, 3, 0.00),
(5, 5, 0.00);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_wallet_cliente`
--
DROP TABLE IF EXISTS `vista_wallet_cliente`;

DROP VIEW IF EXISTS `vista_wallet_cliente`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vista_wallet_cliente`  AS SELECT `w`.`id` AS `id`, `w`.`saldo` AS `saldo`, `c`.`id` AS `id_cliente`, `c`.`documento` AS `documento`, `c`.`nombres` AS `nombres`, `c`.`apellidos` AS `apellidos`, `c`.`email` AS `email`, `c`.`celular` AS `celular`, `c`.`created_at` AS `created_at` FROM (`wallet` `w` join `cliente` `c` on(`w`.`id_cliente` = `c`.`id`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id`),
  ADD KEY `valor` (`valor`),
  ADD KEY `fk_id_cliente_pago` (`id_cliente`);

--
-- Indices de la tabla `recarga`
--
ALTER TABLE `recarga`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_transactions_id_wallet` (`id_wallet`),
  ADD KEY `idx_transactions_date` (`transaction_date`);

--
-- Indices de la tabla `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_wallet_cliente` (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `recarga`
--
ALTER TABLE `recarga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `fk_id_cliente_pago` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recarga`
--
ALTER TABLE `recarga`
  ADD CONSTRAINT `fk_id_recarga_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_wallet`) REFERENCES `wallet` (`id`);

--
-- Filtros para la tabla `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `fk_id_wallet_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
