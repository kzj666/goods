package com.kk.service;

import com.kk.entity.GoodsCover;
import com.kk.entity.GoodsParam;
import java.util.List;

/**
 * (GoodsParam)表服务接口
 *
 * @author makejava
 * @since 2020-04-25 03:12:49
 */
public interface GoodsParamService {

    /**
     * 爬数据插入
     * @param goodsParams
     * @return
     */
    int add(List<GoodsParam> goodsParams);

    /**
     * 根据商品id查评论
     * @param goodsId
     * @return
     */
    List<GoodsParam> findParams(Integer goodsId);
}