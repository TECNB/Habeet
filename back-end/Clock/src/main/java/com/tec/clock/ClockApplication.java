package com.tec.clock;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Slf4j
@SpringBootApplication
@MapperScan("com.tec.clock.dao.mapper")
@ServletComponentScan
@EnableTransactionManagement
public class ClockApplication {

    public static void main(String[] args) {

        SpringApplication.run(ClockApplication.class, args);
        log.info("项目启动成功！！！");
    }

}
