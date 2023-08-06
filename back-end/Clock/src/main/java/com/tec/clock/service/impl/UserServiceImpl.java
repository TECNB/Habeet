package com.tec.clock.service.impl;

import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tec.clock.core.common.resp.RestResp;
import com.tec.clock.dao.entity.Tag;
import com.tec.clock.dao.entity.User;
import com.tec.clock.dao.mapper.TagDao;
import com.tec.clock.dao.mapper.UserDao;
import com.tec.clock.dto.resp.UserRespDto;
import com.tec.clock.service.UserService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Random;

/**
 * (User)表服务实现类
 *
 * @author makejava
 * @since 2023-04-16 18:56:43
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl extends ServiceImpl<UserDao, User> implements UserService {

    @Resource
    private UserDao userDao;
    @Resource
    private TagDao tagDao;
    @Resource
    private JavaMailSender javaMailSender;

    @Value("${server.root.path}")
    private String serverRootPath; // 在application.yml中配置服务器根目录的路径
    @Value("${server.domain}")
    private String serverDomain; // 服务器域名

    //读取yml文件中username的值并赋值给form
    @Value("${spring.mail.username}")
    private String from;
    Integer ifUpdate;
    String userEmailAll;

    StringBuilder code = new StringBuilder();

    @Override
    public RestResp<UserRespDto> checkEmail(String userEmail) {
        QueryWrapper<User>queryWrapper=new QueryWrapper<>();
        userEmailAll=userEmail;
        queryWrapper.eq("user_email", userEmail);
        User user = userDao.selectOne(queryWrapper);
        System.out.println(userEmail);


        if(user!=null){
            String userPassword=user.getUserPassword();
            if(userPassword!=null){
                return RestResp.ok(UserRespDto.builder()
                        .userEmail(userEmail)
                        .build());
            }
        }else if(user==null){
            User user1=new User();
            user1.setUserEmail(userEmail);
            user1.setCreatTime(LocalDateTime.now());
            userDao.insert(user1);
        }

        return null;
    }

    @Override
    public RestResp<UserRespDto> checkPassword(UserRespDto userRespDto) {
        String userEmail=userRespDto.getUserEmail();
        String userPassword=userRespDto.getUserPassword();

        QueryWrapper<User>queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("user_email",userEmail).eq("user_password", userPassword);
        User user = userDao.selectOne(queryWrapper);

        int Point=user.getPoint();
        int CompleteTarget=user.getCompleteTarget();
        String UserName=user.getUserName();
        String picUrl=user.getPicUrl();
        if(user!=null){
            return RestResp.ok(UserRespDto.builder()
                    .userName(UserName)
                    .userPassword(userPassword)
                    .point(Point)
                    .completeTarget(CompleteTarget)
                    .picUrl(picUrl)
                    .build());
        }
        return null;
    }

    @Override
    public RestResp<UserRespDto> sign(UserRespDto userRespDto) {
        String userEmail=userRespDto.getUserEmail();
        String userName=userRespDto.getUserName();
        String userPassword=userRespDto.getUserPassword();
        String userCode=userRespDto.getUserCode();
        String picUrl=userRespDto.getPicUrl();

        if(picUrl.equals("https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0")){
            picUrl="/static/Avatar.png";
        }

        ifUpdate=userRespDto.getIfUpdate();
        Date currentTime=new Date();

        QueryWrapper<User>queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("user_email",userEmail);

        User user = userDao.selectOne(queryWrapper);
        Long userId=user.getUserId();


        if(userCode.contentEquals(code)){
            if(ifUpdate==0){
                //设立注册后的初始信息
                User user2=new User();
                user2.setUserPassword(userPassword);
                user2.setUserName(userName);
                user2.setCompleteTarget(0);
                user2.setPoint(0);

                userDao.update(user2,queryWrapper);

                //这里设置了首次注册的用户的标签信息，防止初始界面tag-menu为空
                Tag tag=new Tag();
                tag.setUserId(userId);
                tag.setTagName("学习");
                tag.setTagDescribe("保持专注");
                tag.setTagHour(1);
                tag.setTagMinute(30);
                tag.setTagPoint(3);
                tag.setTagColor(0);
                tag.setCreatTime(currentTime);

                tagDao.insert(tag);
            }else if(ifUpdate==1){
                //设立注册后的初始信息
                User user2=new User();
                user2.setUserPassword(userPassword);

                userDao.update(user2,queryWrapper);
            }else if(ifUpdate==2){
                //设立注册后的初始信息
                User user2=new User();
                user2.setPicUrl(picUrl);
                user2.setUserName(userName);
                user2.setUserPassword("WX");
                user2.setCompleteTarget(0);
                user2.setPoint(0);

                userDao.update(user2,queryWrapper);

                //这里设置了首次注册的用户的标签信息，防止初始界面tag-menu为空
                Tag tag=new Tag();
                tag.setUserId(userId);
                tag.setTagName("学习");
                tag.setTagDescribe("保持专注");
                tag.setTagHour(1);
                tag.setTagMinute(30);
                tag.setTagPoint(3);
                tag.setTagColor(0);
                tag.setCreatTime(currentTime);

                tagDao.insert(tag);
            }else if(ifUpdate==3){
                //设立注册后的初始信息
                User user2=new User();
                user2.setPicUrl(picUrl);
                user2.setUserName(userName);

                userDao.update(user2,queryWrapper);
            }


            return RestResp.ok(UserRespDto.builder()
                    .userPassword(userPassword)
                    .userName(userName)
                    .build());
        }
        return null;
    }


    @Override
    public RestResp<Integer> getCode(UserRespDto userRespDto) {

        String userEmail1=userRespDto.getUserEmail();
        ifUpdate=userRespDto.getIfUpdate();
        // 构建一个邮件对象
        SimpleMailMessage message = new SimpleMailMessage();
        // 设置邮件发送者
        message.setFrom(from);
        // 设置邮件接收者
        message.setTo(userEmail1);

        // 设置邮件的正文
        Random random = new Random();
        code = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int r = random.nextInt(10);
            code.append(r);
        }
        System.out.println(code);
        if(ifUpdate==0){
            // 设置邮件的主题
            message.setSubject("注册验证码");
            String text = "欢迎注册Habeet，您的验证码为：" + code + ",请勿泄露给他人。";
            message.setText(text);
        }else if(ifUpdate==1){
            // 设置邮件的主题
            message.setSubject("更改密码验证码");
            String text = "正在修改Habeet的账号密码，您的验证码为：" + code + ",请勿泄露给他人。";
            message.setText(text);
        }

        // 发送邮件
        try {
            javaMailSender.send(message);
            System.out.println("发送邮件成功");
            return RestResp.ok(1);
        } catch (MailException e) {
            e.printStackTrace();
        }
        return RestResp.ok(0);
    }

    @Override
    public RestResp<UserRespDto> wxLogin(String code) {
        String authUrl="https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code";
        String appId="wxdc4b9b90a1a0aae0";
        String secret="df2f12e6a0d01f4e545be489020819fb";
        authUrl=authUrl+"&appid="+appId+"&secret="+secret+"&js_code="+code;

        String result= HttpUtil.get(authUrl);
        JSONObject jsonObject= JSONUtil.parseObj(result);

        System.out.println(result);

        String openId=jsonObject.getStr("openid");
        return RestResp.ok(UserRespDto.builder()
                .openId(openId)
                .build());
    }

    @Override
    public RestResp<UserRespDto> uploadFile(MultipartFile[] files) {
        String filePath=null;
        String fileName;
        String filePathAll=null;
        byte[] imageData = new byte[0];
        // 遍历上传的多个文件
        for (MultipartFile file : files) {
            // 生成文件名：userEmail.jpg
            fileName = userEmailAll+ "." + "jpeg";

            // 生成文件保存路径
            filePath = serverRootPath + fileName;

            try {
                // 将图片转换为二进制数据流
                System.out.println("开始二进制流存入数据库");
                imageData = file.getBytes();
                // 将文件保存到服务器指定目录
                //file.transferTo(new File(filePath));
                System.out.println("imageData："+imageData);

                // 将二进制数据流存入数据库
                QueryWrapper<User>queryWrapper=new QueryWrapper<>();
                queryWrapper.eq("user_email",userEmailAll);

                User user = new User();
                user.setPicData(imageData);
                userDao.update(user,queryWrapper);
                System.out.println("存入数据库结束");

            } catch (IOException e) {
                e.printStackTrace();
                // 处理文件上传失败的情况
                System.out.println("文件上传失败");
                return null;
            }
        }

        // 处理文件上传成功的情况
        return RestResp.ok(UserRespDto.builder().picData(imageData).build());
    }
}

