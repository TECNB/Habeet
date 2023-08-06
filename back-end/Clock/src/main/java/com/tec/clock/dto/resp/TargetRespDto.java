package com.tec.clock.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TargetRespDto {
    /**
     * 目标id(主键)
     */
    private Long id;
    /**
     * 用户id
     */
    private Long userId;

    private String userEmail;

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
     * 前端目标传来的字符串deadlineString
     */
    private String deadlineString;

    /**
     * 目标是否是得到分数
     */
    private Integer ifPoints;

    private Integer ifTargetNull;

    private Integer ifTargetUpdate;

    private  Long targetId;
}
