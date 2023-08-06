package com.tec.clock.dao.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * (Target)实体类
 *
 * @author TEC
 * @since 2023-05-27 16:32:42
 */
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


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPicUrl() {
        return picUrl;
    }

    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl;
    }

    public String getTargetName() {
        return targetName;
    }

    public void setTargetName(String targetName) {
        this.targetName = targetName;
    }

    public String getTargetDescribe() {
        return targetDescribe;
    }

    public void setTargetDescribe(String describe) {
        this.targetDescribe = describe;
    }

    public Integer getTargetColor() {
        return targetColor;
    }

    public void setTargetColor(Integer targetColor) {
        this.targetColor = targetColor;
    }

    public Integer getTargetPoint() {
        return targetPoint;
    }

    public void setTargetPoint(Integer targetPoint) {
        this.targetPoint = targetPoint;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getIsReward() {
        return isReward;
    }

    public void setIsReward(Integer isReward) {
        this.isReward = isReward;
    }

    public LocalDateTime getCreatTime() {
        return creatTime;
    }

    public void setCreatTime(LocalDateTime creatTime) {
        this.creatTime = creatTime;
    }

}

