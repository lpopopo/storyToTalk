/*
Navicat MySQL Data Transfer

Source Server         : e
Source Server Version : 80018
Source Host           : 49.232.157.229:3306
Source Database       : redrock

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2020-04-30 15:37:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for prizenum
-- ----------------------------
DROP TABLE IF EXISTS `prizenum`;
CREATE TABLE `prizenum` (
  `first` int(11) DEFAULT NULL,
  `second` int(11) DEFAULT NULL,
  `third` int(11) DEFAULT NULL,
  `lucky` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of prizenum
-- ----------------------------
INSERT INTO `prizenum` VALUES ('1', '3', '5', '10');
