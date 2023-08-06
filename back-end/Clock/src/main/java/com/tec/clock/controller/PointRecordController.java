package com.tec.clock.controller;



import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.PointRecord;
import com.tec.clock.dto.resp.PointRecordRespDto;
import com.tec.clock.dto.resp.StoreRespDto;
import com.tec.clock.service.PointRecordService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.List;

/**
 * (PointRecord)表控制层
 *
 * @author TEC * @since 2023-06-04 14:36:26
 */
@CrossOrigin
@RestController
@Controller
@RequestMapping("pointRecord")
public class PointRecordController {
    /**
     * 服务对象
     */
    @Resource
    private PointRecordService pointRecordService;
    @PostMapping("/get")
    public RestResp<PointRecordRespDto> getPointRecord(@RequestBody PointRecordRespDto pointRecordRespDto){
        return pointRecordService.getPointRecord(pointRecordRespDto);
    }

}

