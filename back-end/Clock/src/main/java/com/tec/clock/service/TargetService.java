package com.tec.clock.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.Target;
import com.tec.clock.dto.resp.TargetRespDto;

import java.util.List;

/**
 * (Target)表服务接口
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
public interface TargetService extends IService<Target> {

    RestResp<List<TargetRespDto>> getTarget(TargetRespDto targetRespDto);

    RestResp<TargetRespDto> saveTarget(TargetRespDto targetRespDto);

    RestResp<TargetRespDto> deleteTarget(TargetRespDto targetRespDto);

}

