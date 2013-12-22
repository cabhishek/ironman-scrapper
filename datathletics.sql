CREATE TABLE `athletes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(75) NULL,
  `athlinks_id` int(11) NULL,
  `modified` datetime NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `athletes_fbfc09f1` (`athlinks_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=latin1;

CREATE TABLE `races` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `type` int(4) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=5000 DEFAULT CHARSET=latin1;

CREATE TABLE `athlete_races` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `race_id` int(11) NOT NULL,
  `athlete_id` int(11) NOT NULL,
  `claimed` int(4) DEFAULT NULL,
  `ago` varchar(10) NULL,
  `m_f` varchar(10) NULL,
  `age` int(3) NULL,
  `bib` int(11) NULL, 
  `swim_time` TIME NULL,
  `swim_pace` TIME NULL,
  `swim_ago` varchar(10) NULL,
  `t1` TIME NULL,
  `cycle_time` TIME NULL,
  `cycle_speed` TIME NULL,
  `cycle_ago` varchar(10) NULL,
  `t2` TIME NULL,
  `run_time` TIME NULL,
  `run_pace` TIME NULL,
  `run_ago` varchar(10) NULL,
  `final_time` TIME NULL,
  `created` datetime NULL,
  `modified` datetime NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `race_id_refs_id_91d5196a` FOREIGN KEY (`race_id`) REFERENCES `races` (`id`),
  CONSTRAINT `athlete_id_refs_id_91d5196a` FOREIGN KEY (`athlete_id`) REFERENCES `athletes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3000 DEFAULT CHARSET=latin1;