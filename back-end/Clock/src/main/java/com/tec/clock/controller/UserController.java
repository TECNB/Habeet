package com.tec.clock.controller;



import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.User;
import com.tec.clock.dto.resp.UserRespDto;
import com.tec.clock.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

/**
 * (User)表控制层
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
@CrossOrigin
@RestController
@RequestMapping("user")
public class UserController  {
    /**
     * 服务对象
     */
    @Resource
    private UserService userService;
    @Resource
    private JavaMailSender javaMailSender;

    //读取yml文件中username的值并赋值给form
    @Value("${spring.mail.username}")
    private String from;

    @PostMapping("/home")
    public RestResp<UserRespDto> checkEmail(@RequestBody String userEmail){
        return userService.checkEmail(userEmail);
    }
    @PostMapping("/login")
    public RestResp<UserRespDto> checkPassword(@RequestBody UserRespDto userRespDto){
        return userService.checkPassword(userRespDto);
    }
    @PostMapping("/sign")
    public RestResp<UserRespDto> sign(@RequestBody UserRespDto userRespDto){
        return userService.sign(userRespDto);
    }
    @PostMapping("/code")
    public RestResp<Integer> getCode(@RequestBody UserRespDto userRespDto){
        return userService.getCode(userRespDto);
    }
    @PostMapping("/wxLogin")
    public RestResp<UserRespDto> wxLogin(@RequestBody String code){
        return userService.wxLogin(code);
    }
    @PostMapping("/uploadFile")
    public RestResp<UserRespDto> uploadFile(@RequestParam("file") MultipartFile[] files){
        return userService.uploadFile(files);
    }
}

