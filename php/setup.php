<?php
  // Set login/pass/path to db
  $DB_PATH = "mysql:host=localhost;charset=utf8";
  $DB_USER = "root";
  $DB_PASSWORD = "root";
  $DB_NAME = "camagru_hponcet";

  try {
    $db = new PDO($DB_PATH, $DB_USER, $DB_PASSWORD);
    // exception mode for PDO object
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Create database if not created
    $sql = "CREATE DATABASE IF NOT EXISTS ".$DB_NAME.";";
    // use exec() because no results are returned
    $db->exec($sql);
    // Create tables
    $sql = "USE ".$DB_NAME.";
        CREATE TABLE `img` (`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,`url` varchar(255) NOT NULL,`name` varchar(255) NOT NULL,`user_id` int(11) NOT NULL,`pseudo` varchar(255) NOT NULL,`date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,`like_count` int(11) NOT NULL, `public` BOOLEAN DEFAULT false) ENGINE=MyISAM DEFAULT CHARSET=utf8;
        CREATE TABLE `users` (`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,`firstname` varchar(255),`lastname` varchar(255),`pseudo` varchar(255) NOT NULL,`password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL) ENGINE=MyISAM DEFAULT CHARSET=utf8;
        CREATE TABLE `comments` (`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,`pseudo` varchar(255) NOT NULL,`content` longtext NOT NULL,`date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,`img_id` int(11) NOT NULL) ENGINE=MyISAM DEFAULT CHARSET=utf8;
        CREATE TABLE `likes` (`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,`user_id` int(11) NOT NULL,`img_id` int(11) NOT NULL) ENGINE=MyISAM DEFAULT CHARSET=utf8;";
    $db->exec($sql);
  }
  catch(PDOException $e)
  {
    echo $e->getMessage();
    die();
  }
  session_start();
?>
