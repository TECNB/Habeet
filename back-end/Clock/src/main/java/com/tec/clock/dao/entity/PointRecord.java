package com.tec.clock.dao.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * (PointRecord)表实体类
 *
 * @author TEC
 * @since 2023-06-04 15:18:06
 */
@SuppressWarnings("serial")
@Data
public class PointRecord implements Serializable {

    private Long id;

    private Long userId;

    private Integer point;

    private Integer pointType;

    private String pointName;

    private String pointDescribe;

    private Date pointDate;

}

