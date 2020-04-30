package com.kk.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kk.entity.Order;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * 订单表(Order)表数据库访问层
 *
 * @author makejava
 * @since 2020-05-01 00:34:29
 */
public interface OrderDao extends BaseMapper<Order> {


}