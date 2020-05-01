package com.kk.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kk.entity.Goods;
import com.kk.entity.Order;
import com.kk.dao.OrderDao;
import com.kk.service.OrderService;
import com.rabbitmq.client.Channel;
import com.sun.org.apache.xpath.internal.operations.Or;
import org.springframework.amqp.rabbit.annotation.*;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * 订单表(Order)表服务实现类
 * 在本类中实现订单从队列中取出，
 * @author makejava
 * @since 2020-05-01 00:34:29
 */
@Service("orderService")
public class OrderServiceImpl implements OrderService {
    @Resource
    private OrderDao orderDao;

    /**
     * 根据订单编号查出订单
     * @param orderNo
     * @return
     */
    @Override
    public Order findByOrderNo(String orderNo) {
        QueryWrapper<Order> wrapper = new QueryWrapper<>();
        wrapper.eq("order_no", orderNo);
        return orderDao.selectOne(wrapper);
    }


    /**
     * 将订单从队列中取出，生成数据库订单数据
     * @param data
     * @param channel
     * @param headers
     */
    @RabbitListener(
            bindings = @QueueBinding(
                    value = @Queue(value = "queue-order"),
                    exchange = @Exchange(value = "exchange-order" ,type = "fanout")
            )
    )
    @RabbitHandler
    public void handleMessage(@Payload Map data, Channel channel, @Headers Map<String, Object> headers){
        System.out.println("获得订单的数据"+data);

        try {
            // 创建订单前还有支付，物流系统的对接，日志登记等等额外操作
            Thread.sleep(10000);
            Order order = new Order();
            order.setOrderNo(data.get("orderNo").toString());
            order.setAmount(19.8);
            order.setOrderStatus(0);
            order.setRecvName("kzj");
            order.setRecvMobile("1353117xxxx");
            order.setRecvAddress("北京三里屯");
            order.setPostage(0d);
            orderDao.insert(order);
            Long tag = (Long)headers.get(AmqpHeaders.DELIVERY_TAG);
            // false表示不进行批量接收，只根据tag所指向的消息
            channel.basicAck(tag, false);
            System.out.println(data.get("orderNo")+"订单已创建");
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}