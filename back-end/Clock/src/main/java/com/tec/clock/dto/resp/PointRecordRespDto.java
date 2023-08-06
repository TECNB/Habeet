package com.tec.clock.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PointRecordRespDto {
    private Long id;

    private Long userId;

    private Integer point;

    private Integer pointType;

    private String pointName;

    private String pointDescribe;

    private Date pointDate;

    private String userEmail;

    private String userTimeP;

    private Integer pointAll;

    private Integer progress;

    private Integer pointInsistence;

    private Double pointAverage;

    private Integer completeTarget;

    private Double completeTargetRate;

    private Integer ifProgress;
}
