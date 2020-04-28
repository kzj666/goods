package com.kk.config.myBatisPlusConfig;

import com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

//@Configuration
public class MyBatisPlusConfig {

    //SQL执行效率插件
    @Bean
    @Profile({"dev","test"})// 设置只在 dev test 环境开启，保证我们的效率
    public PerformanceInterceptor performanceInterceptor() {
        PerformanceInterceptor performanceInterceptor = new PerformanceInterceptor();
        // ms设置sql执行的最大时间，如果超过了则不执行，报错
        performanceInterceptor.setMaxTime(500);
        // 是否格式化代码
        performanceInterceptor.setFormat(true);
        return performanceInterceptor;
    }

}