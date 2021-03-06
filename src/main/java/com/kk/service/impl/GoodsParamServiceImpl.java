package com.kk.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kk.entity.GoodsCover;
import com.kk.entity.GoodsParam;
import com.kk.dao.GoodsParamDao;
import com.kk.service.GoodsParamService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * (GoodsParam)表服务实现类
 *
 * @author makejava
 * @since 2020-04-25 03:12:49
 */
@Service("goodsParamService")
public class GoodsParamServiceImpl implements GoodsParamService {
    @Resource
    private GoodsParamDao goodsParamDao;

    /**
     * 拿到传入的对象列表，循环插入数据
     * @param goodsParams
     * @return
     */
    @Override
    public int add(List<GoodsParam> goodsParams) {
        int i = 0;
        for (GoodsParam goodsParam : goodsParams) {
            goodsParamDao.insert(goodsParam);
            i++;
        }
        return i;
    }


    /**
     * 根据商品id查评论
     * @param goodsId
     * @return
     */
    @Override
    @Cacheable(value = "params", key = "#goodsId")
    public List<GoodsParam> findParams(Integer goodsId) {
        QueryWrapper<GoodsParam> wrapper = new QueryWrapper<>();
        wrapper.eq("goods_id", goodsId)
                .orderByAsc("gp_order");
        return goodsParamDao.selectList(wrapper);
    }


}