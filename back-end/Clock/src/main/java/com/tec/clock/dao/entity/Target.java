package com.tec.clock.dao.entity;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * (Target)实体类
 *
 * @author TEC
 * @since 2023-05-27 16:32:42
 */
@Data
public class Target implements Serializable {
    private static final long serialVersionUID = -54070880754490106L;
    /**
     * 目标id(主键)
     */
    private Long id;
    /**
     * 用户id
     */
    private Long userId;
    /**
     * 目标所选择的图片
     */
    private String picUrl;
    /**
     * 目标的名称
     */
    private String targetName;
    /**
     * 目标的描述
     */
    private String targetDescribe;
    /**
     * 目标选择的颜色
     */
    private Integer targetColor;
    /**
     * 目标完成后的分数
     */
    private Integer targetPoint;
    /**
     * 目标的截止日期
     */
    private LocalDateTime deadline;
    /**
     * 目标完成的状态
     */
    private Integer status;
    /**
     * 目标为奖励还是惩罚 1-奖励 2-惩罚
     */
    private Integer isReward;
    /**
     * 目标的创建时间
     */
    private LocalDateTime creatTime;

}

