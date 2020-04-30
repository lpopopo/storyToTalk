/*
Navicat MySQL Data Transfer

Source Server         : e
Source Server Version : 80018
Source Host           : 49.232.157.229:3306
Source Database       : redrock

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2020-04-30 15:36:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for story
-- ----------------------------
DROP TABLE IF EXISTS `story`;
CREATE TABLE `story` (
  `redid` char(48) NOT NULL,
  `frist_1` int(11) DEFAULT (0),
  `frist_2` int(11) DEFAULT (0),
  `frist_3` int(11) DEFAULT (0),
  `frist_4` int(11) DEFAULT (0),
  `frist_5` int(11) DEFAULT (0),
  `second_1` int(11) DEFAULT (0),
  `second_2` int(11) DEFAULT (0),
  `second_3` int(11) DEFAULT (0),
  `second_4` int(11) DEFAULT (0),
  `second_5` int(11) DEFAULT (0),
  `third_1` int(11) DEFAULT (0),
  `third_2` int(11) DEFAULT (0),
  `third_3` int(11) DEFAULT (0),
  `third_4` int(11) DEFAULT (0),
  `third_5` int(11) DEFAULT (0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
