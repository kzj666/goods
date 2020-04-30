package com.kk.service;

import com.kk.entity.Order;
import java.util.List;

/**
 * 订单表(Order)表服务接口
 *
 * @author makejava
 * @since 2020-05-01 00:34:29
 */
public interface OrderService {

    /**
     * 根据订单编号查出订单
     * @param orderNo
     * @return
     */
    Order findByOrderId(String orderNo);

}