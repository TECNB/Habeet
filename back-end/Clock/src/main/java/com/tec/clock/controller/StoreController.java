package com.tec.clock.controller;



import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.Store;
import com.tec.clock.dto.resp.StoreRespDto;
import com.tec.clock.dto.resp.StoreRespDto;
import com.tec.clock.service.StoreService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.List;

/**
 * (Store)表控制层
 *
 * @author makejava
 * @since 2023-04-16 18:56:37
 */
@CrossOrigin
@RestController
@RequestMapping("store")
public class StoreController {
    /**
     * 服务对象
     */
    @Resource
    private StoreService storeService;
    @PostMapping("/get")
    public RestResp<List<StoreRespDto>> getStore(@RequestBody String userEmail){
        return storeService.getStore(userEmail);
    }
    @PostMapping("/save")
    public RestResp<StoreRespDto> saveStore(@RequestBody StoreRespDto storeRespDto){
        return storeService.saveStore(storeRespDto);
    }
    @PostMapping("/delete")
    public RestResp<StoreRespDto> deleteStore(@RequestBody StoreRespDto storeRespDto){
        return storeService.deleteStore(storeRespDto);
    }
}

