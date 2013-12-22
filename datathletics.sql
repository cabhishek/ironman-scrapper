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

CREATE TABLE `athlete_races` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `race_id` int(11) NOT NULL,
  `athlete_id` int(11) NOT NULL,
  `m_f` varchar(10) NULL,
  `age` int(3) NULL,
  `bib` int(11) NULL, 
  `swim_time` datetime NULL,
  `swim_pace` datetime NULL,
  `swim_ago` datetime  NULL,
  `t1` datetime NULL,
  `cycle_time` datetime NULL,
  `cycle_pace` datetime NULL,
  `cycle_ago` datetime NULL,
  `t2` datetime NULL,
  `race_time` datetime NULL,
  `race_pace` datetime NULL,
  `race_ago` datetime NULL,
  `final_time` datetime NULL,
  `created` datetime NULL,
  `modified` datetime NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `race_id_refs_id_91d5196a` FOREIGN KEY (`race_id`) REFERENCES `races` (`id`),
  CONSTRAINT `athlete_id_refs_id_91d5196a` FOREIGN KEY (`athlete_id`) REFERENCES `athletes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1798030304 DEFAULT CHARSET=latin1;