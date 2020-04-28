package com.kk.scheduler;

/*
@author kzj
@date 2020/4/28 - 14:43
*/

import com.kk.entity.Goods;
import com.kk.service.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 创建一个任务调度，每五分钟进行一次，对更新的商品，重新生成静态页面
 */
@Component
public class StaticTask {

    @Resource
    GoodsService goodsService;
    @Resource
    TemplateEngine templateEngine;
    @Resource
    private GoodsCoverService goodsCoverService;
    @Resource
    private GoodsDetailService goodsDetailService;
    @Resource
    private GoodsParamService goodsParamService;
    @Resource
    private EvaluateService evaluateService;


    @Scheduled(cron = "0 0/5 * * * ? ")
    public void doStatic(){
        List<Goods> last5M = goodsService.findLast5M();
        for (Goods goods : last5M) {
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
            System.out.println("更新了"+goodsId+"商品");
        }
    }

}
