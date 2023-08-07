/*
 Navicat Premium Data Transfer

 Source Server         : Habeet
 Source Server Type    : MySQL
 Source Server Version : 50562
 Source Host           : 42.192.90.134:3306
 Source Schema         : clock

 Target Server Type    : MySQL
 Target Server Version : 50562
 File Encoding         : 65001

 Date: 07/08/2023 14:05:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for point_record
-- ----------------------------
DROP TABLE IF EXISTS `point_record`;
CREATE TABLE `point_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `point` int(11) NOT NULL,
  `point_type` int(11) NOT NULL,
  `point_name` varchar(255) NOT NULL,
  `point_describe` varchar(255) NOT NULL,
  `point_date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1687029716591562754 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for store
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '标签id(主键)',
  `user_id` bigint(20) unsigned NOT NULL COMMENT '用户id',
  `pic_url` varchar(255) DEFAULT NULL COMMENT '标签所选择的图片',
  `store_name` varchar(50) NOT NULL COMMENT '标签的名称',
  `store_describe` varchar(255) NOT NULL COMMENT '标签的描述',
  `store_color` int(11) NOT NULL COMMENT '标签选择的颜色',
  `store_point` int(11) NOT NULL COMMENT '标签完成后的分数',
  `store_hour` int(11) NOT NULL COMMENT '标签的所需要的时间--小时',
  `store_minute` int(11) NOT NULL COMMENT '标签的所需要的时间--分钟',
  `creat_time` datetime NOT NULL COMMENT '标签的创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1687029978173526019 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '标签id(主键)',
  `user_id` bigint(20) unsigned NOT NULL COMMENT '用户id',
  `pic_url` varchar(255) DEFAULT NULL COMMENT '标签所选择的图片',
  `tag_name` varchar(50) NOT NULL COMMENT '标签的名称',
  `tag_describe` varchar(255) NOT NULL COMMENT '标签的描述',
  `tag_color` int(11) NOT NULL COMMENT '标签选择的颜色',
  `tag_point` int(11) NOT NULL COMMENT '标签完成后的分数',
  `tag_hour` int(11) NOT NULL COMMENT '标签的所需要的时间--小时',
  `tag_minute` int(11) NOT NULL COMMENT '标签的所需要的时间--分钟',
  `creat_time` datetime NOT NULL COMMENT '标签的创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1687051698557145092 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for target
-- ----------------------------
DROP TABLE IF EXISTS `target`;
CREATE TABLE `target` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '目标id(主键)',
  `user_id` bigint(20) unsigned NOT NULL COMMENT '用户id',
  `pic_url` varchar(255) DEFAULT NULL COMMENT '目标所选择的图片',
  `target_name` varchar(50) NOT NULL COMMENT '目标的名称',
  `target_describe` varchar(255) NOT NULL COMMENT '目标的描述',
  `target_color` int(11) NOT NULL COMMENT '目标选择的颜色',
  `target_point` int(11) DEFAULT NULL COMMENT '目标完成后的分数',
  `deadline` datetime DEFAULT NULL COMMENT '目标的截止日期',
  `status` int(11) NOT NULL COMMENT '目标完成的状态',
  `is_reward` tinyint(4) DEFAULT NULL COMMENT '目标为奖励还是惩罚 1-奖励 2-惩罚',
  `creat_time` datetime NOT NULL COMMENT '目标的创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1688115671537127427 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `pic_data` blob,
  `pic_url` mediumtext,
  `complete_target` int(11) DEFAULT NULL,
  `point` int(11) DEFAULT NULL,
  `creat_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
