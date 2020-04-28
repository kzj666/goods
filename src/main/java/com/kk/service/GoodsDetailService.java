package com.kk.service;

import com.kk.entity.GoodsDetail;
import com.kk.entity.GoodsParam;

import java.util.List;

/**
 * 商品详情表(GoodsDetail)表服务接口
 *
 * @author makejava
 * @since 2020-04-25 03:12:38
 */
public interface GoodsDetailService {

    /**
     * 根据商品id查商品详情图
     * @param goodsId
     * @return
     */
    List<GoodsDetail> findDetails(Integer goodsId);

}