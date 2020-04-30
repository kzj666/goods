package com.kk.controller;

import com.kk.dao.PromotionSeckillDao;
import com.kk.entity.Goods;
import com.kk.entity.GoodsParam;
import com.kk.entity.PromotionSeckill;
import com.kk.exception.SecKillException;
import com.kk.service.GoodsParamService;
import com.kk.service.GoodsService;
import com.kk.service.PromotionSeckillService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping("seckill")
    @ResponseBody
    public Map processSecKill(Long psId, String userId){
        HashMap<String, String> result = new HashMap<>();
        try {
            promotionSeckillService.processSecKill(psId, userId, 1);
            result.put("code", "0");
            result.put("message", "success");
        } catch (SecKillException e) {
            result.put("code", "500");
            result.put("message", e.getMessage());
        }
        return result;
    }




}