package com.tec.clock.dao.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * (User)表实体类
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
@TableName("user")
@Data
public class User implements Serializable {


    private Long userId;
    
    private String userName;

    private byte[] picData;
    
    private String picUrl;
    
    private String userPassword;

    private String userEmail;
    
    private Integer completeTarget;
    
    private Integer point;
    
    private LocalDateTime creatTime;

}

