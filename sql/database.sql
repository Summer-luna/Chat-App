CREATE DATABASE chatDB;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_display_name` varchar(255) NOT NULL,
  `user_avatar_url` blob,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message_content` varchar(255) NOT NULL,
  `message_date` datetime NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `messages_ibfk_1` (`user_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



