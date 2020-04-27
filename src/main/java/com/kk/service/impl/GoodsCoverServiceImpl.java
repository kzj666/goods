package com.kk.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kk.entity.Goods;
import com.kk.entity.GoodsCover;
import com.kk.dao.GoodsCoverDao;
import com.kk.service.GoodsCoverService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

/**
 * (GoodsCover)表服务实现类
 *
 * @author makejava
 * @since 2020-04-25 02:02:59
 */
@Service("goodsCoverService")
public class GoodsCoverServiceImpl implements GoodsCoverService {
    @Resource
    private GoodsCoverDao goodsCoverDao;

    /**
     * 拿到传入的对象列表，循环插入数据
     * @param goodsCovers
     * @return
     */
    @Override
    public int add(List<GoodsCover> goodsCovers) {
        int i = 0;
        for (GoodsCover goodsCover : goodsCovers) {
            goodsCoverDao.insert(goodsCover);
            i++;
        }
        return i;
    }

    @Override
    @Cacheable(value = "covers", key = "#goodsId")
    public GoodsCover findCover(Integer goodsId) {
        QueryWrapper<GoodsCover> wrapper = new QueryWrapper<>();
        wrapper.eq("goods_id", goodsId);
        return goodsCoverDao.selectOne(wrapper);
    }


}