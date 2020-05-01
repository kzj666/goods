package com.kk.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.kk.dao.GoodsDao;
import com.kk.dao.OrderDao;
import com.kk.entity.Goods;
import com.kk.entity.Order;
import com.kk.entity.PromotionSeckill;
import com.kk.dao.PromotionSeckillDao;
import com.kk.exception.SecKillException;
import com.kk.service.OrderService;
import com.kk.service.PromotionSeckillService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

/**
 * 秒杀促销商品表(PromotionSeckill)表服务实现类
 *
 * @author makejava
 * @since 2020-04-30 12:41:13
 */
@Service("promotionSeckillService")
public class PromotionSeckillServiceImpl implements PromotionSeckillService {
    @Resource
    private PromotionSeckillDao promotionSeckillDao;
    @Resource
    private RedisTemplate redisTemplate;
    @Resource
    private RabbitTemplate rabbitTemplate;
    @Resource
    private OrderService orderService;

    /**
     * 查找已在活动时间但是未进入开始状态的促销商品
     * @return
     */
    @Override
    public List<PromotionSeckill> findUnstartSecKill() {
        return promotionSeckillDao.findUnstartSecKill();
    }

    /**
     * 找到过期的活动,但却属于开始状态的商品
     * @return
     */
    @Override
    public List<PromotionSeckill> findExpiretSecKill() {
        return promotionSeckillDao.findExpiretSecKill();
    }

    /**
     * 设置活动状态开启
     * @param promotionSeckill
     */
    @Override
    public void updateStatus(PromotionSeckill promotionSeckill) {
        promotionSeckillDao.updateById(promotionSeckill);
    }

    /**
     * 处理秒杀请求的方法
     * @param psId
     * @param userId
     * @param num
     * @throws SecKillException
     */
    @Override
    public void processSecKill(Long psId, String userId, Integer num) throws SecKillException {
        // 根据psId查出活动商品信息
        PromotionSeckill ps = promotionSeckillDao.selectById(psId);
        if (null == ps){
            throw new SecKillException("秒杀活动不存在");
        }
        if (ps.getStatus() == 0){
            throw new SecKillException("秒杀活动未开始");
        }else if (ps.getStatus() == 2){
            throw new SecKillException("秒杀活动已结束");
        }
        // 抢购成功，将商品弹出列表
        Integer goodsId = (Integer)redisTemplate.opsForList().leftPop("seckill:count:" + ps.getPsId());
        if (goodsId != null) {
            // 此处判断该用户是否已经抢购过本商品
            Boolean isExist = redisTemplate.opsForSet().isMember("seckill:user:" + ps.getPsId(), userId);
            if(!isExist){
                System.out.println("恭喜您，抢购成功！");
                redisTemplate.opsForSet().add("seckill:user:"+ps.getPsId(),userId);
            }else {
                // 如果该用户已经抢购过了，则要对 因他的访问而从list弹出的商品 进行补偿
                redisTemplate.opsForList().rightPush("seckill:count:" + ps.getPsId(), ps.getGoodsId());
                throw new SecKillException("您已抢购过本商品，不可重复抢购");
            }
        }else {
            throw new SecKillException("该商品已被抢光");
        }
    }

     /**
     * 将秒杀订单信息发送给队列
     * @param userId
     * @return 返回uuid的订单编号
     */
    @Override
    public String SendOrderToQueue(String userId){
        System.out.println("准备向队列发送信息");
        HashMap data = new HashMap();
        data.put("userId", userId);
        String orderNo = UUID.randomUUID().toString();
        data.put("orderNo",orderNo );
        // put其他订单消息
        rabbitTemplate.convertAndSend("exchange-order", null, data);
        return orderNo;
    }

    /**
     * 查询订单是否生成
     * @param orderNo
     * @return
     */
    public Order checkOrder(String orderNo){
        return orderService.findByOrderNo(orderNo);
    }

}