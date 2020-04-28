package com.kk.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kk.entity.Goods;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * (Goods)表数据库访问层
 *
 * @author makejava
 * @since 2020-04-25 15:57:21
 */
public interface GoodsDao extends BaseMapper<Goods> {

    @Select("select * from t_goods where update_time >= now()-interval 5 minute")
    List<Goods> findLast5M();

}