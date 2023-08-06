package com.tec.clock.controller;



import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.Tag;
import com.tec.clock.dto.resp.TagRespDto;
import com.tec.clock.dto.resp.TagRespDto;
import com.tec.clock.dto.resp.TargetRespDto;
import com.tec.clock.service.TagService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.List;

/**
 * (Tag)表控制层
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
@CrossOrigin
@RestController
@RequestMapping("tag")
public class TagController {
    /**
     * 服务对象
     */
    @Resource
    private TagService tagService;

    @PostMapping("/get")
    public RestResp<List<TagRespDto>> getTag(@RequestBody String userEmail){
        return tagService.getTag(userEmail);
    }
    @PostMapping("/save")
    public RestResp<TagRespDto> saveTag(@RequestBody TagRespDto tagRespDto){
        return tagService.saveTag(tagRespDto);
    }
    @PostMapping("/finish")
    public RestResp<TagRespDto> finishTag(@RequestBody TagRespDto tagRespDto){
        return tagService.finishTag(tagRespDto);
    }
    @PostMapping("/delete")
    public RestResp<TagRespDto> deleteTarget(@RequestBody String tagName){
        return tagService.deleteTag(tagName);
    }
}

