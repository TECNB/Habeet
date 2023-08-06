package com.tec.clock.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.*;
import com.tec.clock.dao.entity.Store;
import com.tec.clock.dao.entity.Store;
import com.tec.clock.dao.mapper.PointRecordDao;
import com.tec.clock.dao.mapper.StoreDao;
import com.tec.clock.dao.mapper.StoreDao;
import com.tec.clock.dao.mapper.UserDao;
import com.tec.clock.dto.resp.StoreRespDto;
import com.tec.clock.dto.resp.StoreRespDto;
import com.tec.clock.service.StoreService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * (Store)表服务实现类
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
@Service
@RequiredArgsConstructor
public class StoreServiceImpl extends ServiceImpl<StoreDao, Store> implements StoreService {
    @Resource
    private UserDao userDao;

    @Resource
    private StoreDao storeDao;
    @Resource
    private PointRecordDao pointRecordDao;
    @Override
    public RestResp<List<StoreRespDto>> getStore(String userEmail) {
        QueryWrapper<User> queryWrapper1=new QueryWrapper<>();
        queryWrapper1.eq("user_email",userEmail);
        User user=userDao.selectOne(queryWrapper1);

        Long userId=user.getUserId();
        QueryWrapper<Store>queryWrapper2=new QueryWrapper<>();
        queryWrapper2.eq("user_id",userId);

        if(storeDao.selectList(queryWrapper2).isEmpty()){
            StoreRespDto storeRespDto=new StoreRespDto();
            storeRespDto.setIfStoreNull(1);
            List<StoreRespDto>storeRespDtoList=new ArrayList<>();
            storeRespDtoList.add(storeRespDto);
            return RestResp.ok(storeRespDtoList);
        }
        return RestResp.ok(storeDao.selectList(queryWrapper2).stream()
                .map(v -> StoreRespDto.builder()
                        .storeId(v.getId())
                        .storeName(v.getStoreName())
                        .storePoint(v.getStorePoint())
                        .storeDescribe(v.getStoreDescribe())
                        .storeHour(v.getStoreHour())
                        .storeMinute(v.getStoreMinute())
                        .build()).toList());
    }


    @Override
    public RestResp<StoreRespDto> saveStore(StoreRespDto storeRespDto) {
        boolean storePoint2=false;
        boolean storeDescribe2=false;
        boolean storeHour2=false;
        boolean storeMinute2=false;
        
        String userEmail=storeRespDto.getUserEmail();
        String storeName=storeRespDto.getStoreName();
        String storeDescribe=storeRespDto.getStoreDescribe();
        Integer storeHour=storeRespDto.getStoreHour();
        Integer storeMinute=storeRespDto.getStoreMinute();
        Integer storePoint=storeRespDto.getStorePoint();
        Integer ifStoreUpdate=storeRespDto.getIfStoreUpdate();
        Date currentTime=new Date();

        QueryWrapper<User> queryWrapper1=new QueryWrapper<>();
        queryWrapper1.eq("user_email",userEmail);
        User user=userDao.selectOne(queryWrapper1);

        Long userId=user.getUserId();

        // 查询是否存在相同的storeName
        QueryWrapper<Store> queryWrapper2 = new QueryWrapper<>();
        queryWrapper2.eq("store_name", storeName).eq("user_id",userId);
        Store existingStore = storeDao.selectOne(queryWrapper2);
        
        if(existingStore!=null){
            String storeDescribe1=existingStore.getStoreDescribe();
            Integer storePoint1=existingStore.getStorePoint();
            Integer storeHour1=existingStore.getStoreHour();
            Integer storeMinute1=existingStore.getStoreMinute();

            storePoint2=storePoint1.equals(storePoint);
            storeDescribe2=storeDescribe1.equals(storeDescribe);
            storeHour2=storeHour1.equals(storeHour);
            storeMinute2=storeMinute1.equals(storeMinute);

        }

        
        if(ifStoreUpdate==1){
            if(storeDescribe2&&storePoint2&&storeHour2&&storeMinute2){
                // 目标已存在，直接返回，ifRepeat为1时代表名字重复
                storeRespDto.setIfRepeat(1);
                return RestResp.ok(storeRespDto);
            }
            Long storeId=storeRespDto.getStoreId();
            QueryWrapper<Store> queryWrapper3 = new QueryWrapper<>();
            queryWrapper3.eq("id", storeId);
            Store storeUpdate = storeDao.selectOne(queryWrapper3);
            System.out.println("开始更新");

            storeUpdate.setUserId(userId);
            storeUpdate.setStoreName(storeName);
            storeUpdate.setStoreDescribe(storeDescribe);
            storeUpdate.setStoreHour(storeHour);
            storeUpdate.setStoreMinute(storeMinute);
            storeUpdate.setStorePoint(storePoint);
            storeUpdate.setStoreColor(0);
            storeUpdate.setCreatTime(currentTime);

            storeDao.update(storeUpdate,queryWrapper3);
            return RestResp.ok(storeRespDto);
        }else {
            if (existingStore != null&&ifStoreUpdate==0) {
                // 目标已存在，直接返回，ifRepeat为1时代表名字重复
                storeRespDto.setIfRepeat(1);
                return RestResp.ok(storeRespDto);
            }
        }

        Store store=new Store();
        store.setUserId(userId);
        store.setStoreName(storeName);
        store.setStoreDescribe(storeDescribe);
        store.setStoreHour(storeHour);
        store.setStoreMinute(storeMinute);
        store.setStorePoint(storePoint);
        store.setStoreColor(0);
        store.setCreatTime(currentTime);

        storeDao.insert(store);

        return RestResp.ok(storeRespDto);
    }

    @Override
    public RestResp<StoreRespDto> deleteStore(StoreRespDto storeRespDto) {
        String storeName= storeRespDto.getStoreName();
        Date currentTime=new Date();

        Integer point=0;
        QueryWrapper<Store>queryWrapper1=new QueryWrapper<>();
        queryWrapper1.eq("store_name",storeName);
        Store store=storeDao.selectOne(queryWrapper1);

        Integer storePoint = store.getStorePoint();
        String storeDescribe=store.getStoreDescribe();
        Long userId=store.getUserId();

        QueryWrapper<User>queryWrapper2=new QueryWrapper<>();
        queryWrapper2.eq("user_id",userId);

        User user =userDao.selectOne(queryWrapper2);

        if(user.getPoint()-storePoint>=0){
            point =user.getPoint()-storePoint;
            storeRespDto.setIfEnough(1);
        }else{
            storeRespDto.setIfEnough(0);
        }
        if (storeRespDto.getIfEnough()==1){
            user.setPoint(point);
            storeRespDto.setStorePoint(point);
            userDao.update(user,queryWrapper2);

            PointRecord pointRecord=new PointRecord();
            pointRecord.setUserId(userId);
            pointRecord.setPoint(storePoint);
            pointRecord.setPointType(2);
            pointRecord.setPointName(storeName);
            pointRecord.setPointDescribe(storeDescribe);
            pointRecord.setPointDate(currentTime);

            pointRecordDao.insert(pointRecord);

            storeDao.delete(queryWrapper1);
        }

        return RestResp.ok(storeRespDto);
    }
}

