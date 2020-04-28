package com.kk.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kk.dao.GoodsDao;
import com.kk.entity.Goods;
import com.kk.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.annotation.Resource;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private GoodsDao goodsDao;
    @Resource
    private GoodsCoverService goodsCoverService;
    @Resource
    private GoodsDetailService goodsDetailService;
    @Resource
    private GoodsParamService goodsParamService;
    @Resource
    private EvaluateService evaluateService;
    @Autowired
    private TemplateEngine templateEngine;


    @GetMapping("goods")
    public String showGoods(Integer goodsId, Model model) {
        logger.info("goodId=" + goodsId);
        model.addAttribute("good", goodsService.findGoodById(goodsId));
        model.addAttribute("cover", goodsCoverService.findCover(goodsId));
        model.addAttribute("details", goodsDetailService.findDetails(goodsId));
        model.addAttribute("gdparams", goodsParamService.findParams(goodsId));
        model.addAttribute("evaluates", evaluateService.findEvaluates(goodsId));
        return "jumei";
    }

    /**
     * 根据商品id生成对应的静态页面
     * @param goodsId
     * @return
     */
    @ResponseBody
    @GetMapping("/static/{goodsId}")
    public String createHtml(@PathVariable("goodsId") int goodsId) {

        Map<String, Object> map = new HashMap<>();
        map.put("good", goodsService.findGoodById(goodsId));
        map.put("cover", goodsCoverService.findCover(goodsId));
        map.put("details", goodsDetailService.findDetails(goodsId));
        map.put("gdparams", goodsParamService.findParams(goodsId));
        map.put("evaluates", evaluateService.findEvaluates(goodsId));

        // 上下文对象
        Context context = new Context();
        context.setVariables(map);
        // 文件对象
        File file = new File("D:/jumei/goods/" + goodsId + ".html");
        if (file.exists()) {
            // 如果文件存在，则删除
            file.delete();
        }
        PrintWriter printWriter = null;
        try {
            // PrintWriter用来创建一个文件并向文本文件写入数据。可以理解为java中的文件输出
            printWriter = new PrintWriter(file, "UTF-8");
            templateEngine.process("jumei.html", context, printWriter);
        } catch (FileNotFoundException | UnsupportedEncodingException e) {
            e.printStackTrace();
        } finally {
            printWriter.close();
        }
        return "OK";
    }

    /**
     * 一键生成全部静态页面
     * @return
     */
    @ResponseBody
    @GetMapping("/static/all")
    public String createHtml() {

        QueryWrapper<Goods> wrapper = new QueryWrapper<>();
        wrapper.select("goods_id");
        List<Goods> goodsList = goodsDao.selectList(wrapper);
        for (Goods goods : goodsList) {
            Integer goodsId = goods.getGoodsId();
            Map<String, Object> map = new HashMap<>();
            map.put("good", goodsService.findGoodById(goodsId));
            map.put("cover", goodsCoverService.findCover(goodsId));
            map.put("details", goodsDetailService.findDetails(goodsId));
            map.put("gdparams", goodsParamService.findParams(goodsId));
            map.put("evaluates", evaluateService.findEvaluates(goodsId));

            // 上下文对象
            Context context = new Context();
            context.setVariables(map);
            // 文件对象
            File file = new File("D:/jumei/goods/" + goodsId + ".html");
            if (file.exists()) {
                // 如果文件存在，则删除
                file.delete();
            }
            PrintWriter printWriter = null;
            try {
                // PrintWriter用来创建一个文件并向文本文件写入数据。可以理解为java中的文件输出
                printWriter = new PrintWriter(file, "UTF-8");
                templateEngine.process("jumei.html", context, printWriter);
            } catch (FileNotFoundException | UnsupportedEncodingException e) {
                e.printStackTrace();
            } finally {
                printWriter.close();
            }
        }
        return "OK";
    }


}