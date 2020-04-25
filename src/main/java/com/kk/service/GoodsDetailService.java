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

    List<GoodsDetail> findDetails(Integer goodsId);

}