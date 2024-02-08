SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `parties`;

CREATE TABLE `parties`
(
    `id`         varchar(128),
    `serie_id`   varchar(128) NOT NULL,
    `user_email` varchar(128) NOT NULL,
    `status`     varchar(25),
    `score`      int(2)
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
DEFAULT CHARSET = utf8;