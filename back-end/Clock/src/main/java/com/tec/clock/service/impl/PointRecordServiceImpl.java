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
import com.tec.clock.dto.resp.PointRecordRespDto;
import com.tec.clock.service.PointRecordService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import static java.lang.Math.max;

/**
 * (PointRecord)表服务实现类
 *
 * @author TEC
 * @since 2023-06-04 14:36:30
 */
@Service
@RequiredArgsConstructor
public class PointRecordServiceImpl extends ServiceImpl<PointRecordDao, PointRecord> implements PointRecordService {

    @Resource
    private UserDao userDao;
    @Resource
    private PointRecordDao pointRecordDao;
    @Resource
    private TargetDao targetDao;


    @Override
    public RestResp<PointRecordRespDto> getPointRecord(PointRecordRespDto pointRecordRespDto) {
        String userEmail=pointRecordRespDto.getUserEmail();
        String userTimeP=pointRecordRespDto.getUserTimeP();
        Double userTimeType=0.0;
        Integer pointAll=0;
        Integer pointAllBefore=0;
        Double pointAverage=0.0;
        Integer countDays=1;
        Double diffNum=-1.0;
        Integer max=0;
        Double targetNum=0.0;
        // 创建 Calendar 对象
        Calendar calendar = Calendar.getInstance();

        // 设置日期为当前日期
        calendar.setTime(new Date());

        // 设置小时、分钟和秒
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);

        // 获取修改后的 Date 对象
        Date currentTime = calendar.getTime();

        //得到userId和completeTarget
        QueryWrapper<User> queryWrapper1=new QueryWrapper<>();
        queryWrapper1.eq("user_email",userEmail);
        User user=userDao.selectOne(queryWrapper1);
        Long userId=user.getUserId();
        Double completeTarget= 0.0;


        QueryWrapper<PointRecord>queryWrapper2=new QueryWrapper<>();
        queryWrapper2.eq("user_id",userId);

        QueryWrapper<Target>queryWrapper3=new QueryWrapper<>();
        queryWrapper3.eq("user_id",userId);

        List<PointRecord>List=pointRecordDao.selectList(queryWrapper2);

        List<Target>List1=targetDao.selectList(queryWrapper3);


        if("过去一周".equals(userTimeP)){
            userTimeType=7.0;
        }else if("过去一天".equals(userTimeP)){
            userTimeType=1.0;
        }else if("过去一月".equals(userTimeP)){
            userTimeType=30.0;
        }
        for(Target list:List1){
            // 获取 targetTime 的 LocalDateTime 对象
            LocalDateTime targetTime = list.getDeadline();
            if(targetTime!=null){
                // 将 LocalDateTime 转换为 Date
                Date targetDate = Date.from(targetTime.atZone(ZoneId.systemDefault()).toInstant());
                // 计算两者之间的差异
                long timeDiff = currentTime.getTime() - targetDate.getTime();
                double dayDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
                if(dayDiff<=userTimeType) {
                    targetNum++;
                }
            }
        }
        for (PointRecord list:List){
            if(list.getPointType()!=2){
                Date pointDate=list.getPointDate();
                Long timeDiff=currentTime.getTime() - pointDate.getTime();
                Double dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
                //获取期间的分数和平均分数的逻辑
                if(dayDiff<=userTimeType){
                    //获取期间的每天连续分数的天数的逻辑
                    //差一天，就是连续得分
                    if(list.getPointType()==0){
                        completeTarget++;
                    }

                    Double dayDiffDiff=diffNum-dayDiff;
                    if(dayDiffDiff.compareTo(1.0)==0){
                        diffNum=dayDiff;
                        countDays++;
                        //选择最大的连续天数
                        max=max(max,countDays);
                    }else{
                        //连续输入相同数字的情况
                        if(dayDiff.equals(diffNum)){
                            diffNum=dayDiff;
                        }else{
                            diffNum=dayDiff;
                            countDays=1;
                        }
                    }
                    if(dayDiff==1.0&&userTimeType==1.0){
                        max=1;
                    }
                    pointAll= pointAll+list.getPoint();
                    pointAverage=(double)pointAll/userTimeType;
                    // 四舍五入保留一位小数
                    pointAverage = Math.round(pointAverage * 10) / 10.0;

                }else if(dayDiff<=userTimeType*2&&dayDiff>userTimeType){
                    pointAllBefore=pointAllBefore+list.getPoint();
                }
            }
        }

        Double completeTargetRate=Math.floor((completeTarget/targetNum)*100);
        if (targetNum==0||targetNum<completeTarget){
            completeTargetRate=100.0;
        }

        //获取分数进步的逻辑
        Integer progress =pointAll-pointAllBefore;
        if(progress<0){
            progress=Math.abs(progress);
            pointRecordRespDto.setIfProgress(0);
        }
        pointRecordRespDto.setProgress(progress);


        pointRecordRespDto.setPointAll(pointAll);
        pointRecordRespDto.setPointInsistence(max);
        pointRecordRespDto.setPointAverage(pointAverage);
        pointRecordRespDto.setCompleteTarget(Integer.valueOf(completeTarget.intValue()));
        pointRecordRespDto.setCompleteTargetRate(completeTargetRate);


        return RestResp.ok(pointRecordRespDto);
    }
}

