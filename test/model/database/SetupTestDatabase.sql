DROP DATABASE IF EXISTS testeduwrite;
CREATE DATABASE testeduwrite;
USE testeduwrite;


CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schoolId` int(11) NOT NULL,
  `semester` enum('Fall','Spring') NOT NULL,
  `year` int(11) NOT NULL,
  `name` varchar(300) NOT NULL,
  `number` int(11) NOT NULL,
  `department` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `number` (`number`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

INSERT INTO `courses` (`id`, `schoolId`, `semester`, `year`, `name`, `department`, `number`) VALUES
(1, 1, 'Spring', 2012, 'Distributed Systems', 'CS', 425),
(2, 1, 'Spring', 2012, 'Computer Security I', 'CS', 461),
(3, 1, 'Spring', 2012, 'Software Engineering II', 'CS', 428),
(4, 1, 'Spring', 2012, 'Database Systems', 'CS', 411),
(5, 1, 'Spring', 2012, 'Computer Architecture II', 'CS', 232);


CREATE TABLE IF NOT EXISTS `enrollment` (
  `userId` int(30) NOT NULL,
  `courseId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`courseId`),
  KEY `netid` (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

INSERT INTO `enrollment` (`studentId`, `courseId`) VALUES
(1, 1),
(2, 1),
(1, 2);


CREATE TABLE IF NOT EXISTS `lectures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `day` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;



CREATE TABLE IF NOT EXISTS `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `padId` varchar(255) NOT NULL,
  `lectureId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`userId`,`padId`,`lectureId`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

INSERT INTO `notes` (`id`, `userId`, `padId`, `lectureId`, `title`) VALUES
(1, 0, 'pad1', 1, 'title1'),
(2, 0, 'pad2', 1, 'title2');


CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Student'),
(2, 'Professor'),
(3, 'Moderator'),
(4, 'Admin');


INSERT INTO `lectures` (`id`, `courseId`,`name`, `day`) VALUES
(1, 4,'name1', '2012-03-05'),
(2, 2,'name2', '2012-03-08'),
(3, 2,'name3', '2012-03-06');

CREATE TABLE IF NOT EXISTS `roles_users` (
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  KEY `role_id` (`roleId`,`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

INSERT INTO `roles_users` (`roleId`, `userId`) VALUES
(1, 1),
(2, 2);


CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

INSERT INTO `users` (`id`, `email`, `password`, `created`) VALUES
(1, 'a@gmail.com', '$2a$10$QesN9MWZwQtnbPl1vE7Dou0VXi5ZH00iDaA.0CaJrVt34lG7XozWW', CURRENT_TIMESTAMP()),
(2, 'b@gmail.com', '$2a$10$QesN9MWZwQtnbPl1vE7Dou0VXi5ZH00iDaA.0CaJrVt34lG7XozWW', CURRENT_TIMESTAMP());
