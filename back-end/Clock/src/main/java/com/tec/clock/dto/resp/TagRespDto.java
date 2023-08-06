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
public class TagRespDto {
    /**
     * 标签id(主键)
     */
    private Long id;
    /**
     * 用户id
     */
    private Long userId;
    /**
     * 标签所选择的图片
     */
    private String picUrl;
    /**
     * 标签的名称
     */
    private String tagName;
    /**
     * 标签的描述
     */
    private String tagDescribe;
    /**
     * 标签选择的颜色
     */
    private Integer tagColor;
    /**
     * 标签完成后的分数
     */
    private Integer tagPoint;
    /**
     * 标签的所需要的时间--小时
     */
    private Integer tagHour;
    /**
     * 标签的所需要的时间--分钟
     */
    private Integer tagMinute;
    /**
     * 标签的创建时间
     */
    private Date creatTime;

    private String userEmail;

    private Integer ifRepeat;

    private Integer ifTagNull;

    private Integer ifTagUpdate;

    private Long tagId;
}
