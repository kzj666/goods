package com.kk.service;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kk.entity.Goods;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * (Goods)表服务接口
 *
 * @author makejava
 * @since 2020-04-25 15:57:22
 */
public interface GoodsService{
    /**
     * 爬取数据插入
     * @param goods
     * @return
     */
    int add(List<Goods> goods);


    /**
     * 根据商品id查询
     * @param goodsId
     * @return
     */
    Goods findGoodById(Integer goodsId);

    /**
     * 查找最近五分钟更新过的商品
     * @return
     */
    List<Goods> findLast5M();


}