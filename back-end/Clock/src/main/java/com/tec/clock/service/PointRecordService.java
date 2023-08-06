package com.tec.clock.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.PointRecord;
import com.tec.clock.dto.resp.PointRecordRespDto;


/**
 * (PointRecord)表服务接口
 *
 * @author TEC
 * @since 2023-06-04 14:36:30
 */
public interface PointRecordService extends IService<PointRecord> {

    RestResp<PointRecordRespDto> getPointRecord(PointRecordRespDto pointRecordRespDto);

}

