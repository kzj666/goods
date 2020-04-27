package com.kk.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kk.entity.Evaluate;
import com.kk.dao.EvaluateDao;
import com.kk.service.EvaluateService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 评论表(Evaluate)表服务实现类
 *
 * @author makejava
 * @since 2020-04-27 12:48:11
 */
@Service("evaluateService")
public class EvaluateServiceImpl implements EvaluateService {
    @Resource
    private EvaluateDao evaluateDao;

    /**
     * 拿到传入的对象列表，循环插入数据
     * @param evaluates
     * @return
     */
    @Override
    public int addEvaluate(List<Evaluate> evaluates) {
        int count = 0;
        for (Evaluate evaluate : evaluates) {
            evaluateDao.insert(evaluate);
            count++;
        }
        return count;
    }


    @Override
    @Cacheable(value = "evaluates", key = "#goodsId")
    public List<Evaluate> findEvaluates(int goodsId) {
        QueryWrapper<Evaluate> wrapper = new QueryWrapper<>();
        wrapper.eq("goods_id", goodsId);
        return evaluateDao.selectList(wrapper);
    }
}