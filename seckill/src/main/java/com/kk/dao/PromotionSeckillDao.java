package com.kk.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kk.entity.PromotionSeckill;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 秒杀促销商品表(PromotionSeckill)表数据库访问层
 *
 * @author makejava
 * @since 2020-04-30 12:41:13
 */
public interface PromotionSeckillDao extends BaseMapper<PromotionSeckill> {

    /**
     * 查找已在活动时间但是未进入开始状态的促销商品
     * @return
     */
    @Select("SELECT * FROM t_promotion_seckill WHERE now() BETWEEN start_time AND end_time AND status=0")
    List<PromotionSeckill> findUnstartSecKill();

    /**
     * 找到过期的活动,但却属于开始状态的商品
     * @return
     */
    @Select("SELECT * FROM t_promotion_seckill WHERE now() > end_time AND status=1")
    List<PromotionSeckill> findExpiretSecKill();


}