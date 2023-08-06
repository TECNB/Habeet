package com.tec.clock.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.*;
import com.tec.clock.dao.entity.Tag;
import com.tec.clock.dao.mapper.PointRecordDao;
import com.tec.clock.dao.mapper.TagDao;
import com.tec.clock.dao.entity.Tag;
import com.tec.clock.dao.mapper.TagDao;
import com.tec.clock.dao.mapper.UserDao;
import com.tec.clock.dto.resp.TagRespDto;
import com.tec.clock.dto.resp.TagRespDto;
import com.tec.clock.service.TagService;
import jakarta.annotation.Resource;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * (Tag)表服务实现类
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
@Service
@RequiredArgsConstructor
public class TagServiceImpl extends ServiceImpl<TagDao, Tag> implements TagService {
    @Resource
    private UserDao userDao;
    @Resource
    private TagDao tagDao;
    @Resource
    private PointRecordDao pointRecordDao;
    @Override
    public RestResp<List<TagRespDto>> getTag(String userEmail) {
        QueryWrapper<User> queryWrapper1=new QueryWrapper<>();
        queryWrapper1.eq("user_email",userEmail);
        User user=userDao.selectOne(queryWrapper1);

        Long userId=user.getUserId();
        QueryWrapper<Tag>queryWrapper2=new QueryWrapper<>();
        queryWrapper2.eq("user_id",userId);

        if(tagDao.selectList(queryWrapper2).isEmpty()){
            TagRespDto tagRespDto=new TagRespDto();
            tagRespDto.setIfTagNull(1);
            List<TagRespDto>tagRespDtoList=new ArrayList<>();
            tagRespDtoList.add(tagRespDto);
            return RestResp.ok(tagRespDtoList);
        }
        
        return RestResp.ok(tagDao.selectList(queryWrapper2).stream()
                .map(v -> TagRespDto.builder()
                        .id(v.getId())
                        .tagName(v.getTagName())
                        .tagPoint(v.getTagPoint())
                        .tagDescribe(v.getTagDescribe())
                        .tagHour(v.getTagHour())
                        .tagMinute(v.getTagMinute())
                        .build()).toList());
    }

    @Override
    public RestResp<TagRespDto> saveTag(TagRespDto tagRespDto) {
        boolean tagPoint2=false;
        boolean tagDescribe2=false;
        boolean tagHour2=false;
        boolean tagMinute2=false;

        String userEmail=tagRespDto.getUserEmail();
        String tagName=tagRespDto.getTagName();
        String tagDescribe=tagRespDto.getTagDescribe();
        Integer tagHour=tagRespDto.getTagHour();
        Integer tagMinute=tagRespDto.getTagMinute();
        Integer tagPoint=tagRespDto.getTagPoint();
        Integer ifTagUpdate=tagRespDto.getIfTagUpdate();
        Date currentTime=new Date();

        QueryWrapper<User>queryWrapper1=new QueryWrapper<>();
        queryWrapper1.eq("user_email",userEmail);
        User user=userDao.selectOne(queryWrapper1);

        Long userId=user.getUserId();

        // 查询是否存在相同的tagName
        QueryWrapper<Tag> queryWrapper2 = new QueryWrapper<>();
        queryWrapper2.eq("tag_name", tagName).eq("user_id",userId);
        Tag existingTag = tagDao.selectOne(queryWrapper2);

        if(existingTag!=null){
            String tagDescribe1=existingTag.getTagDescribe();
            Integer tagPoint1=existingTag.getTagPoint();
            Integer tagHour1=existingTag.getTagHour();
            Integer tagMinute1=existingTag.getTagMinute();

            tagPoint2=tagPoint1.equals(tagPoint);
            tagDescribe2=tagDescribe1.equals(tagDescribe);
            tagHour2=tagHour1.equals(tagHour);
            tagMinute2=tagMinute1.equals(tagMinute);

        }

        if(ifTagUpdate==1){
            if(tagDescribe2&&tagPoint2&&tagHour2&&tagMinute2){
                // 目标已存在，直接返回，ifRepeat为1时代表名字重复
                tagRespDto.setIfRepeat(1);
                return RestResp.ok(tagRespDto);
            }
            Long tagId=tagRespDto.getTagId();
            QueryWrapper<Tag> queryWrapper3 = new QueryWrapper<>();
            queryWrapper3.eq("id", tagId);
            Tag tagUpdate = tagDao.selectOne(queryWrapper3);
            System.out.println("开始更新");

            tagUpdate.setUserId(userId);
            tagUpdate.setTagName(tagName);
            tagUpdate.setTagDescribe(tagDescribe);
            tagUpdate.setTagHour(tagHour);
            tagUpdate.setTagMinute(tagMinute);
            tagUpdate.setTagPoint(tagPoint);
            tagUpdate.setTagColor(0);
            tagUpdate.setCreatTime(currentTime);

            tagDao.update(tagUpdate,queryWrapper3);
            return RestResp.ok(tagRespDto);
        }else{
            if (existingTag != null&&ifTagUpdate==0) {
                // 目标已存在，直接返回，ifRepeat为1时代表名字重复
                tagRespDto.setIfRepeat(1);
                return RestResp.ok(tagRespDto);
            }
        }
        
        Tag tag=new Tag();
        tag.setUserId(userId);
        tag.setTagName(tagName);
        tag.setTagDescribe(tagDescribe);
        tag.setTagHour(tagHour);
        tag.setTagMinute(tagMinute);
        tag.setTagPoint(tagPoint);
        tag.setTagColor(0);
        tag.setCreatTime(currentTime);

        tagDao.insert(tag);

        return RestResp.ok(tagRespDto);
    }

    @Override
    public RestResp<TagRespDto> finishTag(TagRespDto tagRespDto) {
        String tagName= tagRespDto.getTagName();
        Date currentTime=new Date();


        QueryWrapper<Tag>queryWrapper1=new QueryWrapper<>();
        queryWrapper1.eq("tag_name",tagName);
        Tag tag=tagDao.selectOne(queryWrapper1);

        Integer tagPoint = tag.getTagPoint();
        String tagDescribe=tag.getTagDescribe();


        Long userId=tag.getUserId();
        QueryWrapper<User>queryWrapper2=new QueryWrapper<>();
        queryWrapper2.eq("user_id",userId);

        User user =userDao.selectOne(queryWrapper2);

        Integer point =user.getPoint()+tagPoint;

        user.setPoint(point);
        tagRespDto.setTagPoint(point);

        PointRecord pointRecord=new PointRecord();
        pointRecord.setUserId(userId);
        pointRecord.setPoint(tagPoint);
        pointRecord.setPointType(1);
        pointRecord.setPointName(tagName);
        pointRecord.setPointDescribe(tagDescribe);
        pointRecord.setPointDate(currentTime);

        pointRecordDao.insert(pointRecord);
        userDao.update(user,queryWrapper2);

        return RestResp.ok(tagRespDto);
    }

    @Override
    public RestResp<TagRespDto> deleteTag(String tagName) {
        TagRespDto tagRespDto=new TagRespDto();
        QueryWrapper<Tag>queryWrapper1=new QueryWrapper<>();
        queryWrapper1.eq("tag_name",tagName);

        tagDao.delete(queryWrapper1);

        return RestResp.ok(tagRespDto);
    }
}

