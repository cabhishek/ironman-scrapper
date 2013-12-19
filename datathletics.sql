CREATE TABLE `athletes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(75) NULL,
  `athlinks_id` int(11) NULL,
  `modified` datetime NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1798030304 DEFAULT CHARSET=latin1;

CREATE TABLE `races` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `year` int(4) NOT NULL,
  `race_date` datetime NULL,
  `location` varchar(75) NULL,
  `athlinks_event_id` int(11) NULL,
  `athlinks_course_id` int(11) NULL,
  `web_link` varchar(75) NULL,
  `modified` datetime NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `races_fbfc09f1` (`athlinks_event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1798030304 DEFAULT CHARSET=latin1;

/* CREATE TABLE `audit_logs_auditlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip_address` char(15) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `text` longtext,
  PRIMARY KEY (`id`),
  KEY `audit_logs_auditlog_fbfc09f1` (`user_id`),
  CONSTRAINT `user_id_refs_id_91d5196a` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=352 DEFAULT CHARSET=latin1; */