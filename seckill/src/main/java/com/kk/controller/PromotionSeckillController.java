package com.kk.controller;

import com.kk.dao.PromotionSeckillDao;
import com.kk.entity.Goods;
import com.kk.entity.GoodsParam;
import com.kk.entity.Order;
import com.kk.entity.PromotionSeckill;
import com.kk.exception.SecKillException;
import com.kk.service.GoodsParamService;
import com.kk.service.GoodsService;
import com.kk.service.OrderService;
import com.kk.service.PromotionSeckillService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 秒杀促销商品表(PromotionSeckill)表控制层
 *
 * @author makejava
 * @since 2020-04-30 12:41:14
 */
@Controller
public class PromotionSeckillController {
    /**
     * 服务对象
     */
    @Resource
    private PromotionSeckillDao promotionSeckillDao;
    @Resource
    private PromotionSeckillService promotionSeckillService;
    @Resource
    private GoodsService goodsService;
    @Resource
    private GoodsParamService goodsParamService;
    @Resource
    private OrderService orderService;

    /**
     * 跳转到秒杀页面
     * @param psId
     * @param model
     * @return
     */
    @GetMapping("seckillpage")
    public String toSecKillPage(@RequestParam("psId") Long psId, Model model){
        PromotionSeckill seckill = promotionSeckillDao.selectById(psId);
        Integer goodsId = seckill.getGoodsId();
        Goods good = goodsService.findGoodById(goodsId);
        List<GoodsParam> gdparams = goodsParamService.findParams(goodsId);
        model.addAttribute("psId", psId);
        model.addAttribute("good", good);
        model.addAttribute("gdparams", gdparams);
        return "seckill";
    }

    /**
     * 处理秒杀下单请求
     * @param psId
     * @param userId
     * @return
     */
    @GetMapping("seckill")
    @ResponseBody
    public Map processSecKill(Long psId, String userId){
        HashMap result = new HashMap();
        try {
            // 处理秒杀下单请求
            promotionSeckillService.processSecKill(psId, userId, 1);
            // 将订单放入消息队列中
            String orderNo = promotionSeckillService.SendOrderToQueue(userId);
            HashMap<String, String> data = new HashMap<>();
            data.put("orderNo", orderNo);
            result.put("code", "0");
            result.put("message", "success");
            result.put("data", data);
        } catch (SecKillException e) {
            result.put("code", "500");
            result.put("message", e.getMessage());
        }
        return result;
    }


    @GetMapping("checkorder")
    public String checkOrder(String orderNo, Model model){
        Order order = orderService.findByOrderNo(orderNo);
        // 如果订单已经生成，则跳转到订单页面
        if (order != null) {
            model.addAttribute("order", order);
            return "order";
        }
        // 如果订单未生成，则跳转到等待页面
        else {
            model.addAttribute("orderNo", orderNo);
            return "waiting";
        }
    }

}