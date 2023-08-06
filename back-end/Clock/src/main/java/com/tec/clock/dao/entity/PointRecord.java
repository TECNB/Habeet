package com.tec.clock.dao.entity;

import java.util.Date;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import java.io.Serializable;

/**
 * (PointRecord)表实体类
 *
 * @author TEC
 * @since 2023-06-04 15:18:06
 */
@SuppressWarnings("serial")
public class PointRecord implements Serializable {

    private Long id;

    private Long userId;

    private Integer point;

    private Integer pointType;

    private String pointName;

    private String pointDescribe;

    private Date pointDate;


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

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Integer getPointType() {
        return pointType;
    }

    public void setPointType(Integer pointType) {
        this.pointType = pointType;
    }

    public String getPointName() {
        return pointName;
    }

    public void setPointName(String pointName) {
        this.pointName = pointName;
    }

    public String getPointDescribe() {
        return pointDescribe;
    }

    public void setPointDescribe(String pointDescribe) {
        this.pointDescribe = pointDescribe;
    }

    public Date getPointDate() {
        return pointDate;
    }

    public void setPointDate(Date pointDate) {
        this.pointDate = pointDate;
    }

}

