package com.tec.clock.dao.entity;

import java.util.Date;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import java.io.Serializable;

/**
 * (Store)表实体类
 *
 * @author TEC
 * @since 2023-06-02 14:17:46
 */
@SuppressWarnings("serial")
public class Store implements Serializable {
    //标签id(主键)
    private Long id;
    //用户id
    private Long userId;
    //标签所选择的图片
    private String picUrl;
    //标签的名称
    private String storeName;
    //标签的描述
    private String storeDescribe;
    //标签选择的颜色
    private Integer storeColor;
    //标签完成后的分数
    private Integer storePoint;
    //标签的所需要的时间--小时
    private Integer storeHour;
    //标签的所需要的时间--分钟
    private Integer storeMinute;
    //标签的创建时间
    private Date creatTime;


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

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getStoreDescribe() {
        return storeDescribe;
    }

    public void setStoreDescribe(String storeDescribe) {
        this.storeDescribe = storeDescribe;
    }

    public Integer getStoreColor() {
        return storeColor;
    }

    public void setStoreColor(Integer storeColor) {
        this.storeColor = storeColor;
    }

    public Integer getStorePoint() {
        return storePoint;
    }

    public void setStorePoint(Integer storePoint) {
        this.storePoint = storePoint;
    }

    public Integer getStoreHour() {
        return storeHour;
    }

    public void setStoreHour(Integer storeHour) {
        this.storeHour = storeHour;
    }

    public Integer getStoreMinute() {
        return storeMinute;
    }

    public void setStoreMinute(Integer storeMinute) {
        this.storeMinute = storeMinute;
    }

    public Date getCreatTime() {
        return creatTime;
    }

    public void setCreatTime(Date creatTime) {
        this.creatTime = creatTime;
    }

}

