package com.kk.utils;

import com.kk.dao.GoodsDao;
import com.kk.entity.Goods;
import com.kk.entity.GoodsCover;
import com.kk.entity.GoodsParam;
import com.kk.service.GoodsService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
@Component
public class HtmlParseUtil {

    private static int K = 1;

    // 此方法是爬取口红的名称和价格的方法
    // p是页数，动态传入
    public static List<Goods> parseJM(int p) throws IOException {

        String url = "http://search.jumei.com/?filter=0-11-"+p+"&search=%E5%8F%A3%E7%BA%A2&bid=4&site=gz";

        Document document = Jsoup.parse(new URL(url), 30000);
        Elements elements = document.getElementsByClass("s_l_name");
        Elements elements2 = document.getElementsByClass("search_list_price");
        ArrayList<Goods> list = new ArrayList<>();
        // 将爬到的数据放入对象集合中
        for (int i = 0; i < elements.size(); i++) {
            Goods goods = new Goods();
            goods.setGoodsId(i+1);
            String a = elements.get(i).getElementsByTag("a").text();
            // 现价
            String span = elements2.get(i).getElementsByTag("span").eq(0).text();
            // 原价
            String del = elements2.get(i).getElementsByTag("del").eq(0).text().replace("¥", "");
            // 判断原价是否为空，为空则不爬该条记录
            if(!del.isEmpty()) {
                Double oprice = Double.parseDouble(span);
                Double dprice = Double.parseDouble(del);
                goods.setTitle(a);
                goods.setGoodsDesc(a);
                goods.setCurrentPrice(oprice);
                goods.setOriginalPrice(dprice);
                goods.setIsFreeDelivery(1);
                goods.setCategoryId(112233);
                list.add(goods);
            }
        }
        return list;
    }
    public static List<GoodsCover> parseJMCover(int p) throws IOException {

        String url = "http://search.jumei.com/?filter=0-11-"+p+"&search=%E5%8F%A3%E7%BA%A2&bid=4&site=gz";

        Document document = Jsoup.parse(new URL(url), 30000);
        Elements elements = document.getElementsByClass("item_wrap_right");
        ArrayList<GoodsCover> list = new ArrayList<>();
        // 将爬到的数据放入对象集合中
        for (int i = 0; i < elements.size(); i++) {
            GoodsCover goodsCover = new GoodsCover();
            String picHref = elements.get(i).getElementsByTag("img").attr("src");
            if(!picHref.isEmpty()){
                goodsCover.setGcId(K);
                goodsCover.setGcOrder(1);
                goodsCover.setGcPicUrl(picHref);
                goodsCover.setGcThumbUrl(picHref);
                goodsCover.setGoodsId(K);
                K++;
                list.add(goodsCover);
            }
        }
        return list;
    }
}