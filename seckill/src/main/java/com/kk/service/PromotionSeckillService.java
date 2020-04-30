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

    /**
     * 处理秒杀请求的方法
     * @param psId
     * @param userId
     * @param num
     * @throws SecKillException
     */
    void processSecKill(Long psId, String userId, Integer num) throws SecKillException;

    /**
     * 将订单信息发送给队列
     * @param userId
     * @return 返回uuid的订单编号
     */
    String SendOrderToQueue(String userId);

}