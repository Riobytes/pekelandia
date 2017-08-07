-- phpMyAdmin SQL Dump
-- version 4.0.10.18
-- https://www.phpmyadmin.net
--
-- Servidor: localhost:3306
-- Tiempo de generación: 07-08-2017 a las 17:46:31
-- Versión del servidor: 5.5.54-38.6-log
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `ceipeke2_prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE IF NOT EXISTS `cargo` (
  `ID_CARGO` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPCION` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `ESTADO` int(11) NOT NULL,
  `REMUNERACION` double NOT NULL,
  `ALIMENTACION` double NOT NULL,
  `FONDO` double NOT NULL,
  PRIMARY KEY (`ID_CARGO`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=19 ;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`ID_CARGO`, `DESCRIPCION`, `ESTADO`, `REMUNERACION`, `ALIMENTACION`, `FONDO`) VALUES
(15, 'Maestra', 0, 280, 100, 23),
(16, 'Auxiliar', 0, 280, 100, 23),
(17, 'Administradora', 0, 280, 100, 23),
(18, 'Maestra/Directora', 0, 280, 100, 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_fac`
--

CREATE TABLE IF NOT EXISTS `detalle_fac` (
  `ID_REFRIGERIO` int(11) NOT NULL,
  `ID_FACTURA` int(11) NOT NULL,
  `ID_DETALLE` int(11) NOT NULL AUTO_INCREMENT,
  `ID_MATRICULA` int(11) DEFAULT NULL,
  `FECHA` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `CANTIDAD` int(11) DEFAULT NULL,
  `VALOR_UNITARIO` float DEFAULT NULL,
  `IVA` float DEFAULT NULL,
  `HORA` time DEFAULT NULL,
  `SUB_TOTAL` float NOT NULL,
  `TOTAL_FACTURA` float NOT NULL,
  PRIMARY KEY (`ID_DETALLE`),
  KEY `FK_RELATIONSHIP_11` (`ID_REFRIGERIO`),
  KEY `FK_RELATIONSHIP_12` (`ID_FACTURA`),
  KEY `FK_RELATIONSHIP_14` (`ID_MATRICULA`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=15 ;

--
-- Volcado de datos para la tabla `detalle_fac`
--

INSERT INTO `detalle_fac` (`ID_REFRIGERIO`, `ID_FACTURA`, `ID_DETALLE`, `ID_MATRICULA`, `FECHA`, `CANTIDAD`, `VALOR_UNITARIO`, `IVA`, `HORA`, `SUB_TOTAL`, `TOTAL_FACTURA`) VALUES
(6, 7, 2, 15, '23/7/2017', 1, 110, 13.2, '09:15:00', 13.2, 123.2),
(6, 8, 3, 15, '23/7/2017', 1, 110, 13.2, '09:20:00', 13.2, 123.2),
(6, 9, 4, 15, '23/7/2017', 1, 85, 10.2, '09:26:00', 10.2, 95.2),
(7, 10, 5, 15, '23/7/2017', 1, 85, 10.2, '09:26:00', 10.2, 95.2),
(7, 11, 6, 15, '23/7/2017', 1, 85, 10.2, '09:31:00', 10.2, 95.2),
(6, 12, 7, 15, '23/7/2017', 1, 110, 13.2, '09:32:00', 13.2, 123.2),
(6, 13, 8, 15, '23/7/2017', 1, 110, 13.2, '10:03:00', 13.2, 123.2),
(6, 14, 9, 15, '23/7/2017', 1, 75, 9, '11:37:00', 9, 84),
(6, 15, 10, 15, '23/7/2017', 1, 75, 9, '12:03:00', 9, 84),
(6, 16, 11, 15, '30/7/2017', 1, 110, 13.2, '22:35:00', 13.2, 123.2),
(6, 18, 13, 15, '30/7/2017', 1, 75, 9, '22:36:00', 9, 84),
(6, 19, 14, 15, '31/7/2017', 1, 110, 13.2, '11:55:00', 13.2, 123.2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disponibilidad_matri`
--

CREATE TABLE IF NOT EXISTS `disponibilidad_matri` (
  `COD` int(11) NOT NULL AUTO_INCREMENT,
  `ESTADO` varchar(5) CHARACTER SET latin1 DEFAULT NULL,
  `ID_PERIODO` int(11) NOT NULL,
  `APORTE_PATRONAL` double NOT NULL,
  `APORTE_PERSONAL` double NOT NULL,
  PRIMARY KEY (`COD`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `disponibilidad_matri`
--

INSERT INTO `disponibilidad_matri` (`COD`, `ESTADO`, `ID_PERIODO`, `APORTE_PATRONAL`, `APORTE_PERSONAL`) VALUES
(1, 'si', 1, 12.15, 9.45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE IF NOT EXISTS `estudiantes` (
  `CEDULA` varchar(10) CHARACTER SET latin1 NOT NULL,
  `ID_JORNADA` int(11) DEFAULT NULL,
  `ID_REFRIGERIO` int(11) DEFAULT NULL,
  `NOMBRE` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `FECHA_NACIMIENTO` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `ANIOS` int(11) DEFAULT NULL,
  `MESES` int(11) DEFAULT NULL,
  `DIAS` int(11) NOT NULL,
  `SEXO` char(1) CHARACTER SET latin1 DEFAULT NULL,
  `TALLA` float DEFAULT NULL,
  `PESO` float DEFAULT NULL,
  `TORAX` float DEFAULT NULL,
  `ALIMENTOS_EXCLUIDOS` varchar(800) CHARACTER SET latin1 DEFAULT NULL,
  `PROBLEMAS_SALUD` varchar(800) CHARACTER SET latin1 DEFAULT NULL,
  `ALERGIAS` varchar(800) CHARACTER SET latin1 DEFAULT NULL,
  `MEDICACION` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `PEDIATRA` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `TEL_PEDIATRA` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `PERSO_RECIBIR_NINO` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `TEL_EMERGENCIA` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `OBSERVACIONES` varchar(800) CHARACTER SET latin1 DEFAULT NULL,
  `CENTRO_EDU_ANTERIOR` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `ESTADO` int(11) NOT NULL,
  PRIMARY KEY (`CEDULA`),
  KEY `FK_RELATIONSHIP_4` (`ID_JORNADA`),
  KEY `FK_RELATIONSHIP_9` (`ID_REFRIGERIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`CEDULA`, `ID_JORNADA`, `ID_REFRIGERIO`, `NOMBRE`, `FECHA_NACIMIENTO`, `ANIOS`, `MESES`, `DIAS`, `SEXO`, `TALLA`, `PESO`, `TORAX`, `ALIMENTOS_EXCLUIDOS`, `PROBLEMAS_SALUD`, `ALERGIAS`, `MEDICACION`, `PEDIATRA`, `TEL_PEDIATRA`, `PERSO_RECIBIR_NINO`, `TEL_EMERGENCIA`, `OBSERVACIONES`, `CENTRO_EDU_ANTERIOR`, `ESTADO`) VALUES
('0101643757', 4, 6, 'BERMEO JIMÉNEZ LUIS ALEJANDRO', '2016-03-10', 1, 5, 22, 'M', 1, 1, 1, 's', 's', 's', 's', 's', '2', 's', '2', 's', 's', 0),
('0102260098', 4, 6, 'q', '1988-04-01', 29, 4, 8, 'M', 1, 1, 1, 'q', 'q', 'q', 'q', 'q', '1', 'q', '1', 'q', 'q', 0),
('0104453949', 4, 6, 'q', '1988-04-24', 29, 3, 0, 'u', 1, 1, 1, '1', 'q', 'q', 'q', 'q', '1', 'q', '1', 'q', 'q', 0),
('0401197298', 4, 6, 'AGUILAR GORDÓN DARWIN EUGENIO', '2017-01-04', 0, 6, 0, 'M', 1, 2, 3, 's', 'a', 's', 'd', 'a', '323', 'a', '2442', 's', 'd', 0),
('0604262956', 4, 6, 'lenin velas', '2016-02-01', 1, 6, 1, 'M', 1, 2, 3, 'a', 'a', 'sd', 'd', 'd', '4325435345', 'f', '4354354354', 'f', 'f', 0),
('0700849235', 4, 6, 'BELLO SOTOMAYOR FREDDY JOHNNY', '1988-04-24', 29, 3, 0, 'u', 1, 1, 1, '1', '1', '1', '1', 'sdad', '213413', 'adsasd', '43241', 'dsad', 'dasd', 0),
('0802245761', 4, 6, 'CABRERA NAZARENO ROGER PAUL', '2000-08-01', 16, 11, 0, 'M', 2, 2, 2, '2', 's', 's', 's', 's', '', 's', '33', 's', 's', 0),
('1001180064', 4, 6, 'BELLO SOTOMAYOR FREDDY JOHNNY', '1988-04-24', 29, 3, 0, 'M', 1, 1, 1, '1', '1', '1', '1', 'sdad', '213413', 'adsasd', '43241', 'dsad', 'dasd', 0),
('1400313365', 4, 6, 'BARRERA VERA CARMEN INÉS', '2015-04-24', 1, 3, 0, 'M', 1, 1, 1, 's', 'd', 'f', 'd', 'S', '23232', 'sd', '4433443', 's', 's', 0),
('1500244825', 4, 6, 'h', '1988-04-24', 29, 3, 8, 'M', 6, 6, 6, 'j', 'j', 'j', 'j', 'j', '2222', 'j', '2', 'j', 'j', 0),
('1713627071', 4, 7, 'ACURIO DEL PINO SANTIAGO MARTÍN', '2017-02-28', 0, 5, 0, 'M', 1, 2, 3, 'a', 's', 'd', 'f', 'sads', '324324235', 'd', '4354354354', 'd', 'd', 0),
('1803538246', 4, 6, 'ALVARADO PAREDES JOSÉ LUIS', '2011-02-01', 6, 6, 0, 'M', 1, 2, 3, 'a', 's', 'f', 'd', 'a', '23234', 'dsa', '42423', 'ds', 'ss', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estu_padres`
--

CREATE TABLE IF NOT EXISTS `estu_padres` (
  `CEDULA` varchar(10) CHARACTER SET latin1 NOT NULL,
  `CI_PADRE` varchar(10) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`CEDULA`,`CI_PADRE`),
  KEY `FK_RELATIONSHIP_7` (`CI_PADRE`),
  KEY `FK_ESTUDIANTE` (`CEDULA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `estu_padres`
--

INSERT INTO `estu_padres` (`CEDULA`, `CI_PADRE`) VALUES
('1713627071', '0200982163'),
('1803538246', '0301506044'),
('1400313365', '0500681697'),
('0401197298', '0702648551'),
('1400313365', '0800726424'),
('1713627071', '0913537742'),
('1803538246', '1102955406'),
('0604262956', '1704997012'),
('0604262956', '1714818299'),
('0401197298', '1715241434');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE IF NOT EXISTS `factura` (
  `ID_FACTURA` int(11) NOT NULL AUTO_INCREMENT,
  `CI_PADRE` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `RUC` varchar(13) CHARACTER SET latin1 DEFAULT NULL,
  `NUM_AUTORIZACION` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `NOMBRE_EMPRESA` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `DIRECCION_EMPRE` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `TELF_EMPRESA` varchar(10) CHARACTER SET latin1 NOT NULL,
  `NUM_FAC` int(11) NOT NULL,
  PRIMARY KEY (`ID_FACTURA`),
  KEY `FK_RELATIONSHIP_13` (`CI_PADRE`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=20 ;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`ID_FACTURA`, `CI_PADRE`, `RUC`, `NUM_AUTORIZACION`, `NOMBRE_EMPRESA`, `DIRECCION_EMPRE`, `TELF_EMPRESA`, `NUM_FAC`) VALUES
(6, '0301506044', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1904),
(7, '1704997012', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1905),
(8, '1714818299', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1906),
(9, '1704997012', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1907),
(10, '1704997012', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1907),
(11, '1704997012', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1908),
(12, '1714818299', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1909),
(13, '1714818299', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1910),
(14, '1714818299', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1911),
(15, '1704997012', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1912),
(16, '1704997012', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1913),
(17, '1714818299', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1914),
(18, '1714818299', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1914),
(19, '1704997012', '0603256272001', '1120297906', 'Centro de Educacion Inicial Pekelandia', 'Junin 13-25 y Joaquin Chiriboga', '2943584', 1915);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instituto`
--

CREATE TABLE IF NOT EXISTS `instituto` (
  `ID_INSTITUTO` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE_INSTITUTO` varchar(50) CHARACTER SET latin1 NOT NULL,
  `NOMBRE_PROPIERTARIO` varchar(50) CHARACTER SET latin1 NOT NULL,
  `DIRECCION_INSTITUTO` varchar(100) CHARACTER SET latin1 NOT NULL,
  `NUM_FAC_INICIO` int(11) NOT NULL,
  `NUM_FINAL_FINAL` int(11) NOT NULL,
  `NUM_ACTUAL` int(11) NOT NULL,
  `TELF_INSTITUTO` varchar(10) CHARACTER SET latin1 NOT NULL,
  `RUC` varchar(13) CHARACTER SET latin1 NOT NULL,
  `NUM_AUTORIZACION` varchar(15) CHARACTER SET latin1 NOT NULL,
  `IVA` int(11) NOT NULL,
  PRIMARY KEY (`ID_INSTITUTO`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `instituto`
--

INSERT INTO `instituto` (`ID_INSTITUTO`, `NOMBRE_INSTITUTO`, `NOMBRE_PROPIERTARIO`, `DIRECCION_INSTITUTO`, `NUM_FAC_INICIO`, `NUM_FINAL_FINAL`, `NUM_ACTUAL`, `TELF_INSTITUTO`, `RUC`, `NUM_AUTORIZACION`, `IVA`) VALUES
(1, 'Centro de Educacion Inicial Pekelandia', 'ERAZO VELA MARIA BELEN', 'Junin 13-25 y Joaquin Chiriboga', 1900, 2000, 1916, '2943584', '0603256272001', '1120297906', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornada`
--

CREATE TABLE IF NOT EXISTS `jornada` (
  `ID_JORNADA` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPCION_JORNADA` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `ESTADO` int(11) NOT NULL,
  PRIMARY KEY (`ID_JORNADA`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `jornada`
--

INSERT INTO `jornada` (`ID_JORNADA`, `DESCRIPCION_JORNADA`, `ESTADO`) VALUES
(4, 'Diurna', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matricula`
--

CREATE TABLE IF NOT EXISTS `matricula` (
  `CEDULA` varchar(10) CHARACTER SET latin1 NOT NULL,
  `ID_NIVEL` int(11) NOT NULL,
  `ID_MATRICULA` int(11) NOT NULL AUTO_INCREMENT,
  `FECHA` date DEFAULT NULL,
  `ESTADO_MAT` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `ID_PARALELO` int(11) NOT NULL,
  `ID_PERIODO` int(11) NOT NULL,
  PRIMARY KEY (`ID_MATRICULA`),
  KEY `FK_RELATIONSHIP_3` (`ID_NIVEL`),
  KEY `FK_PARALELO_MATRI` (`ID_PARALELO`),
  KEY `FK_PERIORO_MATRICULA` (`ID_PERIODO`),
  KEY `FK_estudiante_matricula` (`CEDULA`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=32 ;

--
-- Volcado de datos para la tabla `matricula`
--

INSERT INTO `matricula` (`CEDULA`, `ID_NIVEL`, `ID_MATRICULA`, `FECHA`, `ESTADO_MAT`, `ID_PARALELO`, `ID_PERIODO`) VALUES
('0604262956', 1, 15, '2017-08-02', 'Pendiente', 9, 1),
('1713627071', 1, 16, '2017-07-18', 'Aceptado', 9, 1),
('0401197298', 1, 17, '2017-07-18', 'Aceptado', 10, 1),
('1803538246', 1, 18, '2017-07-23', 'Aceptado', 9, 1),
('1400313365', 1, 19, '2017-07-31', 'Pendiente', 0, 1),
('0700849235', 1, 20, '2017-07-31', 'Pendiente', 0, 1),
('1001180064', 1, 21, '2017-07-31', 'Pendiente', 0, 1),
('0104453949', 1, 22, '2017-07-31', 'Pendiente', 0, 1),
('0102260098', 1, 28, '2017-07-31', 'Pendiente', 0, 1),
('1500244825', 1, 29, '2017-08-01', 'Pendiente', 0, 1),
('0802245761', 1, 30, '2017-08-01', 'Pendiente', 0, 1),
('0101643757', 1, 31, '2017-08-01', 'Pendiente', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel`
--

CREATE TABLE IF NOT EXISTS `nivel` (
  `ID_NIVEL` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPCION_NIVEL` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `PRECIO` double(10,2) NOT NULL,
  `ESTADO` int(11) NOT NULL,
  `MENSUALIDAD` double NOT NULL,
  PRIMARY KEY (`ID_NIVEL`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `nivel`
--

INSERT INTO `nivel` (`ID_NIVEL`, `DESCRIPCION_NIVEL`, `PRECIO`, `ESTADO`, `MENSUALIDAD`) VALUES
(1, 'Nivel 1', 85.00, 0, 50),
(2, 'Nivel 2 (3 a 4)', 85.00, 0, 50),
(3, 'Nivel 2 (4 a 5)', 85.00, 0, 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE IF NOT EXISTS `noticias` (
  `ID_NOTICIA` int(11) NOT NULL AUTO_INCREMENT,
  `TITULO` varchar(300) CHARACTER SET latin1 DEFAULT NULL,
  `RESUMEN` text CHARACTER SET latin1,
  `NOTICIA` text COLLATE utf8_spanish_ci,
  `FECHA_NOTICIA` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `ESTADO` int(11) NOT NULL,
  PRIMARY KEY (`ID_NOTICIA`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=14 ;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`ID_NOTICIA`, `TITULO`, `RESUMEN`, `NOTICIA`, `FECHA_NOTICIA`, `ESTADO`) VALUES
(1, 'Inscripciones abiertas:', 'Las inscripciones para el proximo anio lectivo 2017 - 2018 seran desde', 'Las inscripciones para el proximo anio lectivo 2017 - 2018 seran desde martes 2 de mayo hasta el viernes 19 de mayo, en el horario de 8h00 hasta las 12h00, recuerden que nuestro cupos son limitados... les esperamos', '06/14/2017', 0),
(2, 'Curso vacacional:', 'El CEI Pekelandia ofrecera en el mes de julio el curso vacacional', 'El CEI Pekelandia ofrecera en el mes de julio el curso vacacional que tendra, mini chefs, giras de observacion, pintura, musica, manualidades y mucho mas... tambien tenemos servicio de lunch.', '02-05-2017', 0),
(7, 'Concierto de rocola bacalao', 'Hoy hay concierto', 'Se presenta en las canchas de la escuela xy, manana juegos de diverciones', '06/15/2017', 1),
(11, 'ddddd', 'ssss', 'sdsa das sadsa', '05/31/2017', 1),
(12, 'Consola ip', 'Nueva tecnologia', 'dsadsa dasdsa fdgfdg sadsad dasdsa fdgfd sadasd dfddsf fdgfdg asdsad fdgfdg asdsa fdfsd sadsada', '05-07-2017', 0),
(13, 'Vacacional ', 'gira de la primera semana del vacacional', 'Visitaremos el PAE anio', '05-07-2017', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `padres`
--

CREATE TABLE IF NOT EXISTS `padres` (
  `CI_PADRE` varchar(10) CHARACTER SET latin1 NOT NULL,
  `ID_TIPO` int(11) DEFAULT NULL,
  `NOMBRE` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `LUGAR_TRABAJO` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `DIRECCION_TRABAJO` varchar(300) CHARACTER SET latin1 DEFAULT NULL,
  `TEL_PADRE` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `EMAIL` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `DIRECCION_DOMICILIO` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `TIPO_VIVIENDA` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `TEL_AUX` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`CI_PADRE`),
  KEY `FK_RELATIONSHIP_8` (`ID_TIPO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `padres`
--

INSERT INTO `padres` (`CI_PADRE`, `ID_TIPO`, `NOMBRE`, `LUGAR_TRABAJO`, `DIRECCION_TRABAJO`, `TEL_PADRE`, `EMAIL`, `DIRECCION_DOMICILIO`, `TIPO_VIVIENDA`, `TEL_AUX`) VALUES
('0200982163', 1, 'AGUAGUINA MOYÓN GLADYS EUGENIA', 'dsfsdf', 'dsfdsf', '3536547647', 'fgfdgfd', 'sdfdsfdsf', 'Propia', '234234324'),
('0301506044', 1, 'ÁLVAREZ GARCÍA ERIKA FERNANDA', 'd', 'f', '4234234', 'cx', 'czxcxzc', 'Arrendada', '324324'),
('0500681697', 1, 'BARRIGA BEDOYA LEÓNARDO XAVIER', 'ds', 'ss', '4444445555', 'dddddd', 'dsadsada', 'Propia', '3223523'),
('0702648551', 1, 'AGUILAR HEREDIA ELEUTERIO EDULFO', 'q', 'sda', '345435', 'gdfgfd', 'gdfgfd', 'Propia', '434546546'),
('0800726424', 2, 'BEDOYA MEDINA JOHNNY FERNANDO', 'sdffff', 'ddd', '343533553', 'dsadasdsa', 'dasdsad', 'Arrendada', '5465476787'),
('0913537742', 2, 'AGUAYO URGILES JULIO ALEJANDRO', 'dsad', 'dsfdsf', '5443654645', 'dfgdfsdfds', 'adssadsadsa', 'Arrendada', '3253654654'),
('1102955406', 2, 'ÁLVAREZ LOAIZA AUGUSTO LEÓNARDO', 'dasd', 'f', '32432', 'sad', 'fsds', 'Propia', '32'),
('1704997012', 2, 'ACEVEDO PALACIO SONIA CECILIA', 'dsads', 'fdgf', '456547457', 'fdgfdg', 'gfdgfd', 'Arrendada', '43645654'),
('1714818299', 1, 'ACOSTA VASQUEZ DAVID JOSE', 'dsfdsf', 'gfdgfdg', '4354654646', 'lvcorreos@gmail.com', 'dsfdfgfdgfdgfdg', 'Propia', '4354365765'),
('1715241434', 2, 'AGUILAR PAZMIÑO SHEILA DAYAN', 'asdsafd', 'gfdgfd', '43543', 'fdgfd', 'gfdgfd', 'Arrendada', '345435');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paralelos`
--

CREATE TABLE IF NOT EXISTS `paralelos` (
  `ID_PARALELO` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPCION_PARA` varchar(5) CHARACTER SET latin1 NOT NULL,
  `CANTIDAD_ESTU` int(11) NOT NULL,
  `ID_NIVEL` int(11) NOT NULL,
  `ID_PERIODO` int(11) NOT NULL,
  `ESTADO` int(11) NOT NULL,
  PRIMARY KEY (`ID_PARALELO`),
  KEY `FK_NIVEL_PARALELO` (`ID_NIVEL`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=12 ;

--
-- Volcado de datos para la tabla `paralelos`
--

INSERT INTO `paralelos` (`ID_PARALELO`, `DESCRIPCION_PARA`, `CANTIDAD_ESTU`, `ID_NIVEL`, `ID_PERIODO`, `ESTADO`) VALUES
(9, 'A', 5, 1, 1, 0),
(10, 'B', 6, 1, 1, 0),
(11, 'A', 3, 2, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `para_personal`
--

CREATE TABLE IF NOT EXISTS `para_personal` (
  `ID_PARALELO_PER` int(11) NOT NULL,
  `CEDULA_PER` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`ID_PARALELO_PER`,`CEDULA_PER`),
  KEY `FK_PERSO_PAR` (`CEDULA_PER`),
  KEY `FK_PARALELO_PER` (`ID_PARALELO_PER`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `para_personal`
--

INSERT INTO `para_personal` (`ID_PARALELO_PER`, `CEDULA_PER`) VALUES
(9, '1303753618'),
(10, '1706172648'),
(11, '1103037048');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodo`
--

CREATE TABLE IF NOT EXISTS `periodo` (
  `ID_PERIODO` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPCION_PERI` varchar(50) CHARACTER SET latin1 NOT NULL,
  `ESTADO` int(11) NOT NULL,
  PRIMARY KEY (`ID_PERIODO`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `periodo`
--

INSERT INTO `periodo` (`ID_PERIODO`, `DESCRIPCION_PERI`, `ESTADO`) VALUES
(1, '2017-2018', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE IF NOT EXISTS `personal` (
  `CEDULA` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `NOMBRE` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `FECHA_NACI` date NOT NULL,
  `DIRECCION_DOMI` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `CELULAR` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `FECHA_INGRESO_INST` date NOT NULL,
  `CARGO` int(11) NOT NULL,
  `SUELDO` double NOT NULL,
  `CONTRATO` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `APORTE_IESS` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `ESTADO` int(11) NOT NULL,
  PRIMARY KEY (`CEDULA`),
  KEY `Fk_cargo_personal` (`CARGO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`CEDULA`, `NOMBRE`, `FECHA_NACI`, `DIRECCION_DOMI`, `CELULAR`, `FECHA_INGRESO_INST`, `CARGO`, `SUELDO`, `CONTRATO`, `APORTE_IESS`, `ESTADO`) VALUES
('0100967652', 'ABRIL ABRIL CARLOS ENRIQUE', '1994-07-06', 'dsadsad', '3254543534', '2017-07-01', 17, 0, 'SI', 'NO', 0),
('1103037048', 'ACARO CASTILLO NARCISA DEL LOURDES', '2001-02-01', 'gddfgfdg', '4536576876', '2017-07-01', 18, 0, 'SI', 'SI', 0),
('1303753618', 'ABAD NIETO PABLO MARCELO', '1985-07-10', 'La primavera', '0999885544', '2017-03-06', 15, 0, 'SI', 'SI', 0),
('1706172648', 'ABATA REINOSO BELLA NARCISA DEL PILAR', '2017-02-07', 'fdgdfgfdg', '5464776868', '2017-07-03', 16, 0, 'SI', 'SI', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refrigerio`
--

CREATE TABLE IF NOT EXISTS `refrigerio` (
  `ID_REFRIGERIO` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPCION_REFRI` varchar(40) CHARACTER SET latin1 DEFAULT NULL,
  `PRECIO` float DEFAULT NULL,
  `ESTADO` int(11) NOT NULL,
  PRIMARY KEY (`ID_REFRIGERIO`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `refrigerio`
--

INSERT INTO `refrigerio` (`ID_REFRIGERIO`, `DESCRIPCION_REFRI`, `PRECIO`, `ESTADO`) VALUES
(6, 'Servicio de Refrigerio', 25, 0),
(7, 'Sin servicio de refrigerio', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE IF NOT EXISTS `tipo` (
  `ID_TIPO` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPCION_TIPO` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `ESTADO` int(11) NOT NULL,
  PRIMARY KEY (`ID_TIPO`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `tipo`
--

INSERT INTO `tipo` (`ID_TIPO`, `DESCRIPCION_TIPO`, `ESTADO`) VALUES
(1, 'Padre', 0),
(2, 'Madre', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `ID_USER` int(11) NOT NULL AUTO_INCREMENT,
  `USER` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `CONTRASENIA` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`ID_USER`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=9 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID_USER`, `USER`, `CONTRASENIA`) VALUES
(8, 'Admin', 'd033e22ae348aeb5660fc2140aec35850c4da997');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_fac`
--
ALTER TABLE `detalle_fac`
  ADD CONSTRAINT `detalle_fac_ibfk_1` FOREIGN KEY (`ID_REFRIGERIO`) REFERENCES `refrigerio` (`ID_REFRIGERIO`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_fac_ibfk_2` FOREIGN KEY (`ID_FACTURA`) REFERENCES `factura` (`ID_FACTURA`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_fac_ibfk_3` FOREIGN KEY (`ID_MATRICULA`) REFERENCES `matricula` (`ID_MATRICULA`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`ID_JORNADA`) REFERENCES `jornada` (`ID_JORNADA`) ON UPDATE CASCADE,
  ADD CONSTRAINT `estudiantes_ibfk_2` FOREIGN KEY (`ID_REFRIGERIO`) REFERENCES `refrigerio` (`ID_REFRIGERIO`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `estu_padres`
--
ALTER TABLE `estu_padres`
  ADD CONSTRAINT `estu_padres_ibfk_1` FOREIGN KEY (`CEDULA`) REFERENCES `estudiantes` (`CEDULA`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estu_padres_ibfk_2` FOREIGN KEY (`CI_PADRE`) REFERENCES `padres` (`CI_PADRE`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`CI_PADRE`) REFERENCES `padres` (`CI_PADRE`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD CONSTRAINT `matricula_ibfk_1` FOREIGN KEY (`ID_NIVEL`) REFERENCES `nivel` (`ID_NIVEL`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `matricula_ibfk_2` FOREIGN KEY (`ID_PERIODO`) REFERENCES `periodo` (`ID_PERIODO`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `matricula_ibfk_3` FOREIGN KEY (`CEDULA`) REFERENCES `estudiantes` (`CEDULA`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `padres`
--
ALTER TABLE `padres`
  ADD CONSTRAINT `padres_ibfk_1` FOREIGN KEY (`ID_TIPO`) REFERENCES `tipo` (`ID_TIPO`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paralelos`
--
ALTER TABLE `paralelos`
  ADD CONSTRAINT `paralelos_ibfk_1` FOREIGN KEY (`ID_NIVEL`) REFERENCES `nivel` (`ID_NIVEL`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `para_personal`
--
ALTER TABLE `para_personal`
  ADD CONSTRAINT `para_personal_ibfk_1` FOREIGN KEY (`ID_PARALELO_PER`) REFERENCES `paralelos` (`ID_PARALELO`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `para_personal_ibfk_2` FOREIGN KEY (`CEDULA_PER`) REFERENCES `personal` (`CEDULA`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `personal_ibfk_1` FOREIGN KEY (`CARGO`) REFERENCES `cargo` (`ID_CARGO`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
