package com.tec.clock.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.PointRecord;
import com.tec.clock.dao.entity.Target;
import com.tec.clock.dao.entity.User;
import com.tec.clock.dao.mapper.PointRecordDao;
import com.tec.clock.dao.mapper.TargetDao;
import com.tec.clock.dao.mapper.UserDao;
import com.tec.clock.dto.resp.TargetRespDto;
import com.tec.clock.dto.resp.TargetRespDto;
import com.tec.clock.service.TargetService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * (Target)表服务实现类
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
@Service
@RequiredArgsConstructor
public class TargetServiceImpl extends ServiceImpl<TargetDao, Target> implements TargetService {

    @Resource
    private UserDao userDao;
    @Resource
    private TargetDao targetDao;
    @Resource
    private PointRecordDao pointRecordDao;

    @Override
    public RestResp<List<TargetRespDto>> getTarget(TargetRespDto targetRespDto1) {
        String userEmail=targetRespDto1.getUserEmail();
        Integer ifTargetUpdate=targetRespDto1.getIfTargetUpdate();

        //这里的statusFlag1是用来判断限时的target是否为空的
        AtomicBoolean statusFlag1= new AtomicBoolean(false);
        //这里的statusFlag2是用来判断随时的target是否为空的
        AtomicBoolean statusFlag2= new AtomicBoolean(false);

        QueryWrapper<User>queryWrapper1=new QueryWrapper<>();
        queryWrapper1.eq("user_email",userEmail);
        User user=userDao.selectOne(queryWrapper1);

        Long userId=user.getUserId();
        QueryWrapper<Target>queryWrapper2=new QueryWrapper<>();
        queryWrapper2.eq("user_id",userId);

        if(targetDao.selectList(queryWrapper2).isEmpty()){
            TargetRespDto targetRespDto=new TargetRespDto();
            targetRespDto.setIfTargetNull(2);
            List<TargetRespDto>targetRespDtoList=new ArrayList<>();
            targetRespDtoList.add(targetRespDto);
            return RestResp.ok(targetRespDtoList);
        }

        // 获取当前时间的LocalDateTime对象
        LocalDateTime currentTime = LocalDateTime.now();

        List<Target> targetList = targetDao.selectList(queryWrapper2);
        targetList.forEach(target -> {
            int status=target.getStatus();

            if(status==1){
                statusFlag1.set(true);
            }else if(status==0){
                statusFlag2.set(true);
            }

            LocalDateTime deadline = target.getDeadline();
            // 如果Deadline早于当前时间，则将status更改为3
            if (deadline != null && deadline.isBefore(currentTime)&&target.getStatus()!=2) {
                target.setStatus(3);
                targetDao.updateById(target);  // 更新记录
            }else if(deadline != null && deadline.isAfter(currentTime)&&target.getStatus()!=1&&target.getStatus()!=2){
                target.setStatus(1);
                targetDao.updateById(target);  // 更新记录
            }else if(deadline == null &&target.getStatus()!=0&&target.getStatus()!=2){
                target.setStatus(0);
                targetDao.updateById(target);  // 更新记录
            }
        });
        QueryWrapper<Target>queryWrapper3=new QueryWrapper<>();
        if(ifTargetUpdate==1){
            queryWrapper3.eq("user_id",userId).ge("status",0).le("status",1);
        }else{
            queryWrapper3.eq("user_id",userId);
        }

        if(statusFlag1.get() ==false&&statusFlag2.get() ==false){
            return RestResp.ok(targetDao.selectList(queryWrapper3).stream()
                    .map(v -> TargetRespDto.builder()
                            .targetId(v.getId())
                            .targetName(v.getTargetName())
                            .targetPoint(v.getTargetPoint())
                            .targetDescribe(v.getTargetDescribe())
                            .deadline(v.getDeadline())
                            .status(v.getStatus())
                            .ifTargetNull(2)
                            .build()).toList());
        }else if(statusFlag1.get() ==false){
            return RestResp.ok(targetDao.selectList(queryWrapper3).stream()
                    .map(v -> TargetRespDto.builder()
                            .targetId(v.getId())
                            .targetName(v.getTargetName())
                            .targetPoint(v.getTargetPoint())
                            .targetDescribe(v.getTargetDescribe())
                            .deadline(v.getDeadline())
                            .status(v.getStatus())
                            .ifTargetNull(1)
                            .build()).toList());
        }else if(statusFlag2.get() ==false){
            return RestResp.ok(targetDao.selectList(queryWrapper3).stream()
                    .map(v -> TargetRespDto.builder()
                            .targetId(v.getId())
                            .targetName(v.getTargetName())
                            .targetPoint(v.getTargetPoint())
                            .targetDescribe(v.getTargetDescribe())
                            .deadline(v.getDeadline())
                            .status(v.getStatus())
                            .ifTargetNull(0)
                            .build()).toList());
        }
        return RestResp.ok(targetDao.selectList(queryWrapper3).stream()
                .map(v -> TargetRespDto.builder()
                        .targetId(v.getId())
                        .targetName(v.getTargetName())
                        .targetPoint(v.getTargetPoint())
                        .targetDescribe(v.getTargetDescribe())
                        .deadline(v.getDeadline())
                        .status(v.getStatus())
                        .build()).toList());
    }

    @Override
    public RestResp<TargetRespDto> saveTarget(TargetRespDto targetRespDto) {
        boolean targetPoint2=false;
        boolean targetDescribe2=false;
        //deadline2是用来判断时间是否重复的flag，而deadline1是原本数据的截止时间，deadline是传进来的截止时间
        boolean deadline2=false;

        String userEmail=targetRespDto.getUserEmail();
        String targetName=targetRespDto.getTargetName();
        String targetDescribe=targetRespDto.getTargetDescribe();
        String deadlineString=targetRespDto.getDeadlineString();
        Integer ifTargetUpdate=targetRespDto.getIfTargetUpdate();
        Long targetId=targetRespDto.getTargetId();

        LocalDateTime deadline = LocalDateTime.now();
        if(deadlineString.isEmpty()){
            deadline=null;
        }


        Integer targetPoint=targetRespDto.getTargetPoint();
        // 获取当前时间的LocalDateTime对象
        LocalDateTime currentTime = LocalDateTime.now();

        //先通过userEmail查询user表，得到userId
        QueryWrapper<User>queryWrapper1=new QueryWrapper<>();
        queryWrapper1.eq("user_email",userEmail);
        User user=userDao.selectOne(queryWrapper1);

        Long userId=user.getUserId();

        
        // 查询是否存在相同的targetName
        QueryWrapper<Target> queryWrapper2 = new QueryWrapper<>();
        queryWrapper2.eq("target_name", targetName).eq("user_id",userId).ge("status",0).le("status",1);

        Target existingTarget = targetDao.selectOne(queryWrapper2);


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        try {
            deadline = LocalDateTime.parse(deadlineString, formatter);
            // 解析成功
            // 在这里可以使用解析后的 deadline 变量
        } catch (DateTimeParseException e) {
            // 解析失败
            // 在这里处理解析失败的情况
            deadline=targetRespDto.getDeadline();
        }

        if(existingTarget!=null){
            String targetDescribe1=existingTarget.getTargetDescribe();
            Integer targetPoint1=existingTarget.getTargetPoint();
            LocalDateTime deadline1=existingTarget.getDeadline();

            targetPoint2=targetPoint1.equals(targetPoint);
            targetDescribe2=targetDescribe1.equals(targetDescribe);
            System.out.println(deadline1);
            System.out.println(deadline);
            if(deadline1==null){
                deadline2=false;
            }else if(deadline==null&&deadline1==null){
                deadline2=true;
            }else{
                deadline2=deadline1.equals(deadline);
            }

        }

        //这是点进目标进行修改的情况
        if(ifTargetUpdate==1){
            if(targetPoint2&&targetDescribe2&&deadline2){
                // 目标已存在，直接返回，ifRepeat为1时代表名字重复
                targetRespDto.setStatus(4);
                return RestResp.ok(targetRespDto);
            }

            targetId=targetRespDto.getTargetId();
            QueryWrapper<Target> queryWrapper3 = new QueryWrapper<>();
            queryWrapper3.eq("id", targetId);
            Target targetUpdate = targetDao.selectOne(queryWrapper3);
            System.out.println("开始更新");

            targetUpdate.setUserId(userId);
            targetUpdate.setTargetName(targetName);
            targetUpdate.setTargetDescribe(targetDescribe);
            targetUpdate.setDeadline(deadline);
            targetUpdate.setTargetPoint(targetPoint);
            targetUpdate.setTargetColor(0);
            targetUpdate.setCreatTime(currentTime);

            if(deadline==null){
                targetRespDto.setStatus(0);
            }else if(deadline.isBefore(currentTime)){
                targetRespDto.setStatus(3);
            }else{
                targetRespDto.setStatus(1);
            }

            targetRespDto.setDeadline(deadline);

            targetDao.update(targetUpdate,queryWrapper3);
            return RestResp.ok(targetRespDto);
        }else{  //这是建立目标的情况
            if (existingTarget != null&&existingTarget.getStatus()!=2&&existingTarget.getStatus()!=3&&targetPoint2&&targetDescribe2&&deadline2) {
                targetRespDto.setStatus(4);
                return RestResp.ok(targetRespDto);
            }
        }

        //再开始target相关数据的插入
        Target target=new Target();
        target.setUserId(userId);
        target.setTargetName(targetName);
        target.setTargetDescribe(targetDescribe);
        target.setDeadline(deadline);
        target.setTargetPoint(targetPoint);
        target.setTargetColor(0);
        if(deadline==null){
            target.setStatus(0);
            targetRespDto.setStatus(0);
        }else if(deadline.isBefore(currentTime)){
            target.setStatus(3);
            targetRespDto.setStatus(3);
        }else{
            target.setStatus(1);
            targetRespDto.setStatus(1);
        }
        target.setCreatTime(currentTime);

        targetRespDto.setDeadline(deadline);


        targetDao.insert(target);

        return RestResp.ok(targetRespDto);
    }

    @Override
    public RestResp<TargetRespDto> deleteTarget(TargetRespDto targetRespDto) {
        Long userId=0L;
        Integer ifPoints =targetRespDto.getIfPoints();
        String targetName= targetRespDto.getTargetName();
        Date currentTime=new Date();
        String userEmail=targetRespDto.getUserEmail();
        Long targetId=targetRespDto.getTargetId();

        QueryWrapper<User>queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("user_email",userEmail);
        User user1=userDao.selectOne(queryWrapper);

        userId=user1.getUserId();

        QueryWrapper<Target>queryWrapper1=new QueryWrapper<>();
        queryWrapper1.eq("target_name",targetName).eq("user_id",userId).eq("id",targetId);
        Target target=targetDao.selectOne(queryWrapper1);

        Integer targetPoint = target.getTargetPoint();
        String targetDescribe=target.getTargetDescribe();


        if(ifPoints==1){
            userId=target.getUserId();
            QueryWrapper<User>queryWrapper2=new QueryWrapper<>();
            queryWrapper2.eq("user_id",userId);

            User user =userDao.selectOne(queryWrapper2);

            Integer point =user.getPoint()+targetPoint;
            Integer completeTarget=user.getCompleteTarget();

            user.setPoint(point);
            user.setCompleteTarget(completeTarget+1);

            targetRespDto.setTargetPoint(point);
            userDao.update(user,queryWrapper2);

            PointRecord pointRecord=new PointRecord();
            pointRecord.setUserId(userId);
            pointRecord.setPoint(targetPoint);
            pointRecord.setPointType(0);
            pointRecord.setPointName(targetName);
            pointRecord.setPointDescribe(targetDescribe);
            pointRecord.setPointDate(currentTime);

            pointRecordDao.insert(pointRecord);

            target.setStatus(2);
            System.out.println(target.getStatus());
            targetDao.update(target,queryWrapper1);
        }else if(ifPoints==0){
            targetDao.delete(queryWrapper1);
        }

        return RestResp.ok(targetRespDto);
    }
}

