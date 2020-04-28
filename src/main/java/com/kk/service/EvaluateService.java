package com.kk.service;

import com.kk.entity.Evaluate;
import java.util.List;

/**
 * 评论表(Evaluate)表服务接口
 *
 * @author makejava
 * @since 2020-04-27 12:48:11
 */
public interface EvaluateService {
    /**
     * 爬数据插入
     * @param evaluates
     * @return
     */
    int addEvaluate(List<Evaluate> evaluates);

    /**
     * 根据商品id查商品评论
     * @param goodsId
     * @return
     */
    List<Evaluate> findEvaluates(int goodsId);

}