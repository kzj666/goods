package com.kk.service;

import com.kk.entity.Goods;
import com.kk.entity.GoodsCover;

import java.io.IOException;
import java.util.List;

/**
 * (GoodsCover)表服务接口
 *
 * @author makejava
 * @since 2020-04-25 02:02:59
 */
public interface GoodsCoverService {

    GoodsCover findCover(Integer goodsId);

    int add(List<GoodsCover> goods);
}