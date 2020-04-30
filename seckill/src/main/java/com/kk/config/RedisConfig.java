package com.kk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisKeyValueTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Component;

/*
@author kzj
@date 2020/4/30 - 14:54
*/
@Component
public class RedisConfig {

    /**
     * 配置redis中对key和value的序列化规则
     * @param redisConnectionFactory
     * @return
     */
    @Bean
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory){
        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);
        // 设置Value的序列化方式为json
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        // 设置key的序列化方式为String
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        return redisTemplate;
    }

}
