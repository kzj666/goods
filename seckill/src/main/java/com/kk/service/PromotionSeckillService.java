package com.kk.service;

import com.kk.entity.PromotionSeckill;
import com.kk.exception.SecKillException;
import sun.rmi.server.InactiveGroupException;

import java.util.List;

/**
 * 秒杀促销商品表(PromotionSeckill)表服务接口
 *
 * @author makejava
 * @since 2020-04-30 12:41:13
 */
public interface PromotionSeckillService {


    void processSecKill(Long psId, String userId, Integer num) throws SecKillException;

    /**
     * 查找已在活动时间但是未进入开始状态的促销商品
     * @return
     */
    List<PromotionSeckill> findUnstartSecKill();

    /**
     * 找到过期的活动,但却属于开始状态的商品
     * @return
     */
    List<PromotionSeckill> findExpiretSecKill();

    /**
     * 设置活动状态
     * @param promotionSeckill
     */
    void updateStatus(PromotionSeckill promotionSeckill);

}