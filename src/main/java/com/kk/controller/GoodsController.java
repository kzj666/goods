package com.kk.controller;

import com.kk.entity.Goods;
import com.kk.entity.GoodsCover;
import com.kk.service.GoodsCoverService;
import com.kk.service.GoodsDetailService;
import com.kk.service.GoodsParamService;
import com.kk.service.GoodsService;
import com.kk.utils.HtmlParseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

/**
 * (Goods)表控制层
 *
 * @author makejava
 * @since 2020-04-24 16:12:33
 */
@Controller
public class GoodsController {

    Logger logger = LoggerFactory.getLogger(GoodsController.class);

    @Resource
    private GoodsService goodsService;
    @Resource
    private GoodsCoverService goodsCoverService;
    @Resource
    private GoodsDetailService goodsDetailService;
    @Resource
    private GoodsParamService goodsParamService;


    @GetMapping("goods")
    public String showGoods(Integer goodsId, Model model) {
        logger.info("goodId="+goodsId);
        model.addAttribute("good", goodsService.getGoodById(goodsId));
        model.addAttribute("cover", goodsCoverService.findCover(goodsId));
        model.addAttribute("details", goodsDetailService.findDetails(goodsId));
        model.addAttribute("gdparams", goodsParamService.findParams(goodsId));
        return "jumei";
    }

//    @ResponseBody
//    @GetMapping("add")
//    public String add() throws IOException {
//        long begin = System.currentTimeMillis();
//        int count = 0;
//        //爬到数据
//        for (int i = 1; i < 88; i++) {
//            // 按页爬取数据
//            List<Goods> list = HtmlParseUtil.parseJM(i);
//            count += goodsService.add(list);
//        }
//        long end = System.currentTimeMillis();
//        System.out.println("爬数据插数据用时：" + (end - begin) + "毫秒");
//        return "爬取了" + count + "条数据，并插入数据库";
//    }
//
//    @ResponseBody
//    @GetMapping("addCover")
//    public String addCover() throws IOException {
//        long begin = System.currentTimeMillis();
//        int count = 0;
//        //爬到数据
//        for (int i = 1; i < 80; i++) {
//            // 按页爬取数据
//            List<GoodsCover> list = HtmlParseUtil.parseJMCover(i);
//            count += goodsCoverService.add(list);
//        }
//        long end = System.currentTimeMillis();
//        System.out.println("爬数据插数据用时：" + (end - begin) + "毫秒");
//        return "爬取了" + count + "条图片url数据，并插入数据库";
//    }

}