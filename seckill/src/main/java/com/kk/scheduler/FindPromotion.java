package com.kk.scheduler;

/*
@author kzj
@date 2020/4/30 - 14:07
*/


import com.kk.entity.PromotionSeckill;
import com.kk.service.PromotionSeckillService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * 将活动商品放入redis的List数据库中
 */
@Component
public class FindPromotion {

    /**
     * 解决超发的问题的思路
     * 活动开启后，将活动商品个数加入redis的list数据库中
     * 用户抢购成功，则将对应的商品弹出list，同时set中增加抢购成功的用户key
     * 这样当list弹出失败时，表示商品已被抢购完
     */

    @Resource
    private PromotionSeckillService promotionSeckillService;
    @Resource
    RedisTemplate redisTemplate;

    @Scheduled(cron = "0/5 * * * * ? ")
    public void startKill(){
        List<PromotionSeckill> secKills = promotionSeckillService.findUnstartSecKill();
        for (PromotionSeckill secKill : secKills) {
            System.out.println("秒杀活动已启动");
            // 删掉redis中以前重复的活动任务
            redisTemplate.delete("seckill:count"+secKill.getPsId());
            // 将活动商品一个个放入redis的列表中，value为goodsId
            for (Integer i = 0; i < secKill.getPsCount(); i++) {
                redisTemplate.opsForList().rightPush("seckill:count:"+secKill.getPsId(), secKill.getGoodsId());
            }
            secKill.setStatus(1);
            promotionSeckillService.updateStatus(secKill);
        }
    }


    /**
     * 5秒一次的任务调度，查找超时的活动商品，将其状态设置为过时，并清除其在redis的list中的记录
     */
    @Scheduled(cron = "0/5 * * * * ? ")
    public void endKill(){
        List<PromotionSeckill> expiretSecKills = promotionSeckillService.findExpiretSecKill();
        for (PromotionSeckill expiretSecKill : expiretSecKills) {
            System.out.println("秒杀活动已结束");
            expiretSecKill.setStatus(2);
            promotionSeckillService.updateStatus(expiretSecKill);
            redisTemplate.delete("seckill:count:"+expiretSecKill.getPsId());
        }
    }
}
