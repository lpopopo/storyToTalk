/*
Navicat MySQL Data Transfer

Source Server         : e
Source Server Version : 80018
Source Host           : 49.232.157.229:3306
Source Database       : redrock

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2020-04-30 15:37:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for card
-- ----------------------------
DROP TABLE IF EXISTS `card`;
CREATE TABLE `card` (
  `redid` char(48) NOT NULL,
  `county` int(11) DEFAULT (0),
  `process` int(11) DEFAULT (0),
  `democracy` int(11) DEFAULT (0),
  `science` int(11) DEFAULT (0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
