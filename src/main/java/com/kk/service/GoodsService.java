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

    Goods getGoodById(Integer goodsId);

    int add(List<Goods> goods);
}