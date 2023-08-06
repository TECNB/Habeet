package com.tec.clock.controller;


import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dto.resp.TargetRespDto;
import com.tec.clock.service.TargetService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * (Target)表控制层
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
@CrossOrigin
@RestController
@RequestMapping("target")
public class TargetController {
    /**
     * 服务对象
     */
    @Resource
    private TargetService targetService;

    @PostMapping("/get")
    public RestResp<List<TargetRespDto>> getTarget(@RequestBody TargetRespDto targetRespDto){
        return targetService.getTarget(targetRespDto);
    }
    @PostMapping("/save")
    public RestResp<TargetRespDto> saveTarget(@RequestBody TargetRespDto targetRespDto){
        return targetService.saveTarget(targetRespDto);
    }
    @PostMapping("/delete")
    public RestResp<TargetRespDto> deleteTarget(@RequestBody TargetRespDto targetRespDto){
        return targetService.deleteTarget(targetRespDto);
    }
}

