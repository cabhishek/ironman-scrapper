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
  `qualifier_id` int(11) NOT NULL,
  `athlinks_event_id` int(11) NULL,
  `athlinks_course_id` int(11) NULL,
  `date` VARCHAR(75)  NULL,
  `month` VARCHAR(75) NULL,
  `location` VARCHAR(75) NULL,
  `race_type` VARCHAR(75) NULL,
  `registered_athletes` int(11) NULL,
  `starting_athletes` int(11) NULL,
  `finishing_athletes` int(11) NULL,
  `qualifying_slots` int(11) NULL,
  `sunrise` VARCHAR(75) NULL,
  `sunset` VARCHAR(75) NULL,
  `high_temp` DECIMAL(8,2) NULL,
  `low_temp` DECIMAL(8,2) NULL,
  `dew_point` DECIMAL(8,2) NULL,
  `high_humidity` DECIMAL(8,2) NULL,
  `low_humidity` DECIMAL(8,2) NULL,
  `precipitation_inches` DECIMAL(8,2) NULL,
  `peak_wind_speed` DECIMAL(8,2) NULL,
  `cloud_cover` DECIMAL(8,2) NULL,
  `starting_elevation` DECIMAL(8,2) NULL,
  `max_elevation` DECIMAL(8,2) NULL,
  `gross_elevation_gain` DECIMAL(8,2) NULL,
  `water_temperature` DECIMAL(8,2) NULL,
  `water_body` VARCHAR(75) NULL,
  `water_type` VARCHAR(75) NULL,
  `swim_start_location` VARCHAR(75) NULL,
  `swim_start_type` VARCHAR(75) NULL,
  `current` VARCHAR(75) NULL,
  `wetsuit_legal` VARCHAR(75) NULL,
  `temp_bike` DECIMAL(8,2) NULL,
  `starting_elevation_bike` DECIMAL(8,2) NULL,
  `max_elevation_bike` DECIMAL(8,2) NULL,
  `gross_elevation_gain_bike` DECIMAL(8,2) NULL,
  `temp_run` DECIMAL(8,2) NULL,
  `starting_elevation_run` DECIMAL(8,2) NULL,
  `max_elevation_run` DECIMAL(8,2) NULL,
  `gross_elevation_gain_run` DECIMAL(8,2) NULL,
  `modified` datetime NOT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `races_fbfc09f1` (`athlinks_event_id`),
  KEY `qualifier_id_233fbfc09f1` (`qualifier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5000 DEFAULT CHARSET=latin1;

CREATE TABLE `qualifiers` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`qualifier_id` int(11) NOT NULL,
`name` VARCHAR(75) NOT NULL,
`month` VARCHAR(75) NOT NULL,
`location` VARCHAR(75) NOT NULL,
`zip_code` int(11) NOT NULL,
`race_type` VARCHAR(75) NOT NULL,
`qualifying_slots` int(11) NULL,
`sunrise` VARCHAR(75) NULL,
`sunset` VARCHAR(75) NULL,
`avg_high_temp` DECIMAL(5,2) NULL,
`avg_low_temp` DECIMAL(5,2) NULL,
`avg_high_humidity` DECIMAL(5,2) NULL,
`avg_low_humidity` DECIMAL(5,2) NULL,
`avg_high_dew_point` DECIMAL(5,2) NULL,
`avg_peak_wind_speed` DECIMAL(5,2) NULL,
`probability_of_precipitation` DECIMAL(5,2) NULL,
`probability_of_cloudcover` DECIMAL(5,2) NULL,
`starting_elevation` DECIMAL(5,2) NULL,
`max_elevation` DECIMAL(5,2) NULL,
`gross_evelation_gain` DECIMAL(5,2) NULL,
`avg_water_temperature` DECIMAL(5,2) NULL,
`water_body` VARCHAR(75) NULL,
`water_type` VARCHAR(75) NULL,
`swim_start_location` VARCHAR(75) NULL,
`swim_start_type` VARCHAR(75) NULL,
`current` VARCHAR(75) NULL,
`wetsuit_legal` VARCHAR(75) NULL,
`avg_temp_bike` DECIMAL(5,2) NULL,
`starting_elevation_bike` DECIMAL(5,2) NULL,
`max_elevation_bike` DECIMAL(5,2) NULL,
`gross_elevation_gain_bike` DECIMAL(5,2) NULL,
`avg_temp_run` DECIMAL(5,2) NULL,
`starting_elevation_run` DECIMAL(5,2) NULL,
`max_elevation_run` DECIMAL(5,2) NULL,
`gross_elevation_gain_run` DECIMAL(5,2) NULL,
`modified` datetime NOT NULL,
`created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `qulifier_id_refs_id_91d5196a` FOREIGN KEY (`qualifier_id`) REFERENCES `races` (`qualifier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4000 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=2000 DEFAULT CHARSET=latin1;
