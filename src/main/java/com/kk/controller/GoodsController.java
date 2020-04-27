package com.kk.controller;

import com.kk.dao.GoodsParamDao;
import com.kk.entity.Goods;
import com.kk.entity.GoodsCover;
import com.kk.entity.GoodsParam;
import com.kk.service.*;
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

    Logger logger = LoggerFactory.getLogger(com.kk.controller.GoodsController.class);




    @Resource
    private GoodsService goodsService;
    @Resource
    private GoodsCoverService goodsCoverService;
    @Resource
    private GoodsDetailService goodsDetailService;
    @Resource
    private GoodsParamService goodsParamService;
    @Resource
    private EvaluateService evaluateService;


    @GetMapping("goods")
    public String showGoods(Integer goodsId, Model model) {
        logger.info("goodId="+goodsId);
        model.addAttribute("good", goodsService.findGoodById(goodsId));
        model.addAttribute("cover", goodsCoverService.findCover(goodsId));
        model.addAttribute("details", goodsDetailService.findDetails(goodsId));
        model.addAttribute("gdparams", goodsParamService.findParams(goodsId));
        model.addAttribute("evaluates", evaluateService.findEvaluates(goodsId));
        return "jumei";
    }

}