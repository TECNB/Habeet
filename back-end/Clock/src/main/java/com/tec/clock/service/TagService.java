package com.tec.clock.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.Tag;
import com.tec.clock.dto.resp.TagRespDto;
import com.tec.clock.dto.resp.TargetRespDto;

import java.util.List;

/**
 * (Tag)表服务接口
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
public interface TagService extends IService<Tag> {

    RestResp<List<TagRespDto>> getTag(String userEmail);

    RestResp<TagRespDto> saveTag(TagRespDto tagRespDto);

    RestResp<TagRespDto> finishTag(TagRespDto tagRespDto);

    RestResp<TagRespDto> deleteTag(String tagName);
}

