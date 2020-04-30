/*
Navicat MySQL Data Transfer

Source Server         : e
Source Server Version : 80018
Source Host           : 49.232.157.229:3306
Source Database       : redrock

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2020-04-30 15:35:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `redid` char(48) NOT NULL,
  `nickname` varchar(32) DEFAULT NULL,
  `realname` varchar(8) DEFAULT NULL,
  `stunum` int(11) DEFAULT NULL,
  `class` int(11) DEFAULT NULL,
  `collage` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
