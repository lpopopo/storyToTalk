/*
Navicat MySQL Data Transfer

Source Server         : e
Source Server Version : 80018
Source Host           : 49.232.157.229:3306
Source Database       : redrock

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2020-04-30 15:35:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for usergetprize
-- ----------------------------
DROP TABLE IF EXISTS `usergetprize`;
CREATE TABLE `usergetprize` (
  `redid` char(48) NOT NULL,
  `prizelevel` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
