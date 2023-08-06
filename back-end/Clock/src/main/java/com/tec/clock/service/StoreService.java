package com.tec.clock.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.Store;
import com.tec.clock.dto.resp.StoreRespDto;
import com.tec.clock.dto.resp.TagRespDto;

import java.util.List;

/**
 * (Store)表服务接口
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
public interface StoreService extends IService<Store> {

    RestResp<StoreRespDto> saveStore(StoreRespDto storeRespDto);

    RestResp<List<StoreRespDto>> getStore(String userEmail);

    RestResp<StoreRespDto> deleteStore(StoreRespDto storeRespDto);

}

