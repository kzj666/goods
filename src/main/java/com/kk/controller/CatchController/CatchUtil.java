package com.kk.controller;

import com.kk.dao.GoodsParamDao;
import com.kk.entity.Goods;
import com.kk.entity.GoodsCover;
import com.kk.entity.GoodsDetail;
import com.kk.entity.GoodsParam;
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
@RequestMapping("insert")
public class CatchUtil {

    Logger logger = LoggerFactory.getLogger(CatchUtil.class);

    @Resource
    private GoodsService goodsService;
    @Resource
    private GoodsCoverService goodsCoverService;
    @Resource
    private GoodsDetailService goodsDetailService;
    @Resource
    private GoodsParamService goodsParamService;


    /**
     * 插入商品标题和描述到Goods对象对应的t_goods表中
     * @return
     * @throws IOException
     */
    @ResponseBody
    @GetMapping("addTitle")
    public String addTitle() throws IOException {
        long begin = System.currentTimeMillis();
        int count = 0;
        //爬到数据
        for (int i = 1; i < 88; i++) {
            // 按页爬取数据
            List<Goods> list = HtmlParseUtil.parseGoodsTitleAndPrice(i);
            count += goodsService.add(list);
        }
        long end = System.currentTimeMillis();
        System.out.println("爬数据插数据用时：" + (end - begin) + "毫秒");
        return "爬取了" + count + "条数据，并插入数据库";
    }

    /**
     * 插入商品封面到GoodsCover对象对应的t_goods_Cover表中
     * @return
     * @throws IOException
     */
    @ResponseBody
    @GetMapping("addCover")
    public String addCover() throws IOException {
        long begin = System.currentTimeMillis();
        int count = 0;
        //爬到数据
        for (int i = 1; i < 80; i++) {
            // 按页爬取数据
            List<GoodsCover> list = HtmlParseUtil.parseGoodsCover(i);
            count += goodsCoverService.add(list);
        }
        long end = System.currentTimeMillis();
        System.out.println("爬数据插数据用时：" + (end - begin) + "毫秒");
        return "爬取了" + count + "条图片url数据，并插入数据库";
    }

    /**
     * 插入商品参数到GoodsParam对象对应的t_goods_param表中
     * @return
     * @throws IOException
     */
    @ResponseBody
    @GetMapping("addParam")
    public String addParam() throws IOException {
        long begin = System.currentTimeMillis();
        int count = 0;
        //爬到数据
        for (int i = 1; i < 88; i++) {
            // 按页爬取到每个商品页的跳转链接
            List<String> list = HtmlParseUtil.parseGoodsUrl(i);
            List<GoodsParam> params = HtmlParseUtil.parseGoodsParam(list);
            count += goodsParamService.add(params);
        }
        long end = System.currentTimeMillis();
        System.out.println("爬数据插数据用时：" + (end - begin) + "毫秒");
        return "爬取了" + count +"";
    }




    /**
     * 插入商品详情图片到GoodsDetial对象对应的t_goods_detail表中
     * @return
     * @throws IOException
     *//*
    @ResponseBody
    @GetMapping("addDetail")
    public String addDetail() throws IOException {
        long begin = System.currentTimeMillis();
        int count = 0;
        //爬到数据
        for (int i = 1; i < 2; i++) {
            List<String> list = HtmlParseUtil.parseGoodsUrl(i);
            List<GoodsDetail> details = HtmlParseUtil.parseGoodsPic(list);
        }
        long end = System.currentTimeMillis();
        System.out.println("爬数据插数据用时：" + (end - begin) + "毫秒");
        return "爬取了" + count +"";
    }*/



}