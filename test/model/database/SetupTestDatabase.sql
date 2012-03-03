DROP DATABASE IF EXISTS testeduwrite;
CREATE DATABASE testeduwrite;
USE testeduwrite;


CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) NOT NULL,
  `term` varchar(20) NOT NULL,
  `name` varchar(300) NOT NULL,
  `course_number` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `number` (`course_number`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

CREATE TABLE IF NOT EXISTS `lectures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `day` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

CREATE TABLE IF NOT EXISTS `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `note_id` varchar(255) NOT NULL,
  `lecture_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`,`note_id`,`lecture_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;


INSERT INTO `courses` (`id`, `school_id`, `term`, `name`, `course_number`) VALUES
(1, 1, 'Spring 2012', 'Distributed Systems', 'CS 425'),
(2, 1, 'Spring 2012', 'Computer Security I', 'CS 461'),
(3, 1, 'Spring 2012', 'Software Engineering II', 'CS 428'),
(4, 1, 'Spring 2012', 'Database Systems', 'CS 411'),
(5, 1, 'Spring 2012', 'Computer Architecture II', 'CS 232');

INSERT INTO `lectures` (`id`, `course_id`, `day`) VALUES
(1, 4, '2012-03-05'),
(2, 2, '2012-03-08'),
(3, 2, '2012-03-06');

INSERT INTO `notes` (`id`, `user_id`, `note_id`, `lecture_id`) VALUES
(1, 0, '', 1),
(2, 0, '', 1);

INSERT INTO `users` (`id`, `email`, `password`, `created`) VALUES
(1, 'a@gmail.com', '$2a$10$QesN9MWZwQtnbPl1vE7Dou0VXi5ZH00iDaA.0CaJrVt34lG7XozWW', CURRENT_TIMESTAMP()),
(2, 'b@gmail.com', '$2a$10$QesN9MWZwQtnbPl1vE7Dou0VXi5ZH00iDaA.0CaJrVt34lG7XozWW', CURRENT_TIMESTAMP());

