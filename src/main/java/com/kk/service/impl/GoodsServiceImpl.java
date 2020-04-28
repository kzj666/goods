package com.kk.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kk.entity.Goods;
import com.kk.dao.GoodsDao;
import com.kk.service.GoodsService;
import com.kk.utils.HtmlParseUtil;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * (Goods)表服务实现类
 *
 * @author makejava
 * @since 2020-04-25 15:57:22
 */
@Service("goodsService")
public class GoodsServiceImpl implements GoodsService {
    @Resource
    private GoodsDao goodsDao;

    /**
     * 拿到传入的对象列表，循环插入数据
     * @param goods
     * @return
     * @throws IOException
     */
    @Override
    public int add(List<Goods> goods) {
        int i = 0;
        for (Goods good : goods) {
            goodsDao.insert(good);
            i++;
        }
        return i;
    }

    /**
     * Cacheable注解的作用是：第一次访问的时候将方法的返回结果放入缓存，
     * 第二次访问的时候不再执行方法内部的代码，而是从缓存中直接提取数据。
     * 此处的两个参数，value代表键值前缀，key代表键值编号，在redis中表示为【goods::1、goods::2】
     * @param goodsId
     * @return
     */
    @Override
    @Cacheable(value = "goods", key = "#goodsId")
    public Goods findGoodById(Integer goodsId) {
        QueryWrapper<Goods> wrapper = new QueryWrapper<>();
        wrapper.eq("goods_id", goodsId);
        return goodsDao.selectOne(wrapper);
    }

    /**
     * 查找最近五分钟更新过的商品
     * @return
     */
    @Override
    public List<Goods> findLast5M() {
        return goodsDao.findLast5M();
    }


}

