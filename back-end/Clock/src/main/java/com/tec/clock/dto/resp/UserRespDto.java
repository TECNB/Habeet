package com.tec.clock.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRespDto  {
    private Long userId;

    private String userName;

    private byte[] picData;

    private String picUrl;

    private String userEmail;

    private String userPassword;

    private String userCode;

    private Integer completeTarget;

    private Integer point;

    private Integer ifUpdate;

    private String openId;

}
