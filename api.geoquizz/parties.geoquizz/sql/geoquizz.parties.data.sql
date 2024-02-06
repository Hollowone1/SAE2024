-- Adminer 4.8.1 MySQL 5.5.5-10.3.11-MariaDB-1:10.3.11+maria~bionic dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE TABLE parties (
                         id uuid PRIMARY KEY,
                         series_id uuid NOT NULL REFERENCES series(id),
                         user_id uuid NOT NULL REFERENCES auth.users(id),
                         token uuid NOT NULL,
                         token_expires_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         started_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         ended_at timestamp with time zone,
                         score integer,
                         is_public boolean NOT NULL DEFAULT false
);

CREATE TABLE party_images (
                              id uuid PRIMARY KEY,
                              party_id uuid NOT NULL REFERENCES parties(id),
                              image_id uuid NOT NULL REFERENCES items(id),
                              answer_latitude numeric(10, 8) NOT NULL,
                              answer_longitude numeric(11, 8) NOT NULL,
                              answer_time timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              is_correct boolean NOT NULL DEFAULT false
);



-- Adminer 4.8.1 MySQL 5.5.5-10.3.11-MariaDB-1:10.3.11+maria~bionic dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
