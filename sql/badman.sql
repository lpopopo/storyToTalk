/*
Navicat MySQL Data Transfer

Source Server         : lpopopo
Source Server Version : 80019
Source Host           : localhost:3306
Source Database       : redrock

Target Server Type    : MYSQL
Target Server Version : 80019
File Encoding         : 65001

Date: 2020-05-01 13:50:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for badman
-- ----------------------------
DROP TABLE IF EXISTS `badman`;
CREATE TABLE `badman` (
  `redid` char(48) NOT NULL,
  `nickname` varchar(32) DEFAULT NULL,
  `realname` varchar(8) DEFAULT NULL,
  `stunum` int DEFAULT NULL,
  `class` int DEFAULT NULL,
  `collage` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
