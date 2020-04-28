package com.kk.controller.CatchController;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.kk.dao.GoodsDetailDao;
import com.kk.dao.GoodsParamDao;
import com.kk.entity.*;
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
 * 实现---爬取的数据，加入数据表中
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
    @Resource
    private EvaluateService evaluateService;


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
        return "爬取了" + count + "";
    }

    @Resource
    GoodsDetailDao goodsDetailDao;
    /**
     * 未实现
     * @return
     * @throws IOException
     */
    @ResponseBody
    @GetMapping("addDetail")
    public void addDetail() throws IOException {
        QueryWrapper<GoodsDetail> wrapper = new QueryWrapper<>();
        /*
        // 第一步
        wrapper.select("gd_pic_url","gd_order");
        // 查出数据库中已有的60条数据作为模板
        List<GoodsDetail> details = goodsDetailDao.selectList(wrapper);
        // 循环插入，但是未设置goodsId(现将数据库中goodsId字段设置为可为null)
        for (int i = 0; i < 404; i++) {
            for (GoodsDetail detail : details) {
                goodsDetailDao.insert(detail);
            }
            System.out.println((i+1)+"个60条插完");
        }
        */
        // 第二步
        int count = 0;
        for (int i = 1; i < 24251; i++) {
            GoodsDetail detail = new GoodsDetail();
            int goodsId = (((i-1)/10)+1);
            UpdateWrapper<GoodsDetail> wrapper1 = new UpdateWrapper<>();
            wrapper1.set("goods_id", goodsId).eq("gd_id", i);
            count += goodsDetailDao.update(detail, wrapper1);
            System.out.println("更新数据数："+count);
        }
    }

    /**
     * 插入商品评论到Evaluate对象对应的t_evaluatem表中
     * @return
     * @throws IOException
     */
    @ResponseBody
    @GetMapping("addEvaluate")
    public String addEvaluate() throws IOException {
        long begin = System.currentTimeMillis();
        int count = 0;
        for (int f = 0; f < 406; f++) {
            System.out.println("第"+(f+1)+"个六件商品的10条评论插完");
            for (int i = 0; i < 6; i++) {
                // 拿到第i页的评论 对象列表
                List<Evaluate> evaluates = HtmlParseUtil.parseGoodsEvaluate(i);
                count += evaluateService.addEvaluate(evaluates);
            }
        }

        long end = System.currentTimeMillis();
        System.out.println("爬数据插数据用时：" + (end - begin) + "毫秒");
        return "插入了" + count + "条评论。"+"用时：" + (end - begin) + "毫秒";
    }
}