package com.kk.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kk.entity.GoodsDetail;
import com.kk.dao.GoodsDetailDao;
import com.kk.service.GoodsDetailService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.management.Query;
import java.util.List;

/**
 * 商品详情表(GoodsDetail)表服务实现类
 *
 * @author makejava
 * @since 2020-04-25 03:12:38
 */
@Service("goodsDetailService")
public class GoodsDetailServiceImpl implements GoodsDetailService {
    @Resource
    private GoodsDetailDao goodsDetailDao;

    /**
     * 根据商品id查商品详情图
     * @param goodsId
     * @return
     */
    @Override
    @Cacheable(value = "details", key = "#goodsId")
    public List<GoodsDetail> findDetails(Integer goodsId) {
        QueryWrapper<GoodsDetail> wrapper = new QueryWrapper<>();
        wrapper.eq("goods_id", goodsId)
                .orderByAsc("gd_order");
        return goodsDetailDao.selectList(wrapper);
    }
}