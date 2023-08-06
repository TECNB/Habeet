package com.tec.clock.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.User;
import com.tec.clock.dto.resp.UserRespDto;
import org.springframework.web.multipart.MultipartFile;

/**
 * (User)表服务接口
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
public interface UserService extends IService<User> {

    RestResp<UserRespDto> checkEmail(String userEmail);

    RestResp<UserRespDto> checkPassword(UserRespDto userRespDto);

    RestResp<UserRespDto> sign(UserRespDto userRespDto);

    RestResp<Integer> getCode(UserRespDto userRespDto);

    RestResp<UserRespDto> wxLogin(String code);

    RestResp<UserRespDto> uploadFile(MultipartFile[] files);
}

