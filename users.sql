CREATE TABLE IF NOT EXISTS `users` (
 `id` BIGINT NOT NULL AUTO_INCREMENT,
 `fname` VARCHAR(20) NOT NULL,
 `lname` VARCHAR(20) NOT NULL,
 `organizationid` INT ,
 `roleid` INT,
 `email` CHAR(30) NOT NULL UNIQUE,
 `password` VARCHAR(64) NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NULL DEFAULT NULL,
 `isactive` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`)
);

CREATE  INDEX email ON users(email);