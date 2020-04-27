package com.kk.utils;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kk.dao.GoodsDao;
import com.kk.entity.*;
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
    private static int L = 0;
    private static int J = 1;

    /**
     * 此方法是爬取口红的标题和价格的方法，p是页数，动态传入
     *
     * @param p
     * @return
     * @throws IOException
     */
    public static List<Goods> parseGoodsTitleAndPrice(int p) throws IOException {

        String url = "http://search.jumei.com/?filter=0-11-" + p + "&search=%E5%8F%A3%E7%BA%A2&bid=4&site=gz";

        Document document = Jsoup.parse(new URL(url), 30000);
        Elements elements = document.getElementsByClass("s_l_name");
        Elements elements2 = document.getElementsByClass("search_list_price");
        ArrayList<Goods> list = new ArrayList<>();
        // 将爬到的数据放入对象集合中
        for (int i = 0; i < elements.size(); i++) {
            Goods goods = new Goods();
            goods.setGoodsId(i + 1);
            String a = elements.get(i).getElementsByTag("a").text();
            // 现价
            String span = elements2.get(i).getElementsByTag("span").eq(0).text();
            // 原价
            String del = elements2.get(i).getElementsByTag("del").eq(0).text().replace("¥", "");
            // 判断原价是否为空，为空则不爬该条记录
            if (!del.isEmpty()) {
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

    /**
     * 爬封面图片地址,插入到ArrayList<GoodsCover>数组后返回
     *
     * @param p
     * @return
     * @throws IOException
     */
    public static List<GoodsCover> parseGoodsCover(int p) throws IOException {

        String url = "http://search.jumei.com/?filter=0-11-" + p + "&search=%E5%8F%A3%E7%BA%A2&bid=4&site=gz";

        Document document = Jsoup.parse(new URL(url), 30000);
        Elements elements = document.getElementsByClass("item_wrap_right");
        ArrayList<GoodsCover> list = new ArrayList<>();
        // 将爬到的数据放入对象集合中
        for (int i = 0; i < elements.size(); i++) {
            GoodsCover goodsCover = new GoodsCover();
            String picHref = elements.get(i).getElementsByTag("img").attr("src");
            if (!picHref.isEmpty()) {
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

    /**
     * 拿到各商品的主页跳转链接，放入ArrayList<String>链接列表中后返回
     *
     * @param p
     * @return
     * @throws IOException
     */
    public static List<String> parseGoodsUrl(int p) throws IOException {

        String url = "http://search.jumei.com/?filter=0-11-" + p + "&search=%E5%8F%A3%E7%BA%A2&bid=4&site=gz";

        Document document = Jsoup.parse(new URL(url), 30000);
        Elements elements = document.getElementsByClass("item_wrap_right");
        ArrayList<String> hrefs = new ArrayList<>();
        for (Element element : elements) {
            String h = element.getElementsByTag("a").attr("href");
            hrefs.add(h);
        }
//        System.out.println(hrefs);
        return hrefs;
    }

    /**
     * 利用传入的链接列表，遍历进入各商品主页面，拿到商品的商品参数，放入ArrayList<GoodsParam>列表后返回
     *
     * @param list
     * @return
     * @throws IOException
     */
    public static List<GoodsParam> parseGoodsParam(List<String> list) throws IOException {
        int count = 0;
        int num = 0;
        ArrayList<GoodsParam> paramsList = new ArrayList<>();

        for (String url : list) {
            Document document = Jsoup.parse(new URL(url), 30000);
            // 拿到每个页面商品信息的div元素
            Elements element1 = document.getElementsByClass("deal_con_content");
            Elements element2 = document.getElementsByClass("deal_specs");

            if (!element1.isEmpty()) {
                L++;
                count++;
                for (Element element : element1) {
                    Elements trs = element.getElementsByTag("tr");
                    for (Element tr : trs) {
                        // 每一个属性。一个属性一条记录，对应一个实例对象
                        GoodsParam goodsParam = new GoodsParam();
                        goodsParam.setGpId(K);
                        goodsParam.setGporder(J++);
                        goodsParam.setGoodsId(L);
                        goodsParam.setGpParamname(tr.getElementsByTag("td").eq(0).text());
                        goodsParam.setGpParamvalue(tr.getElementsByTag("td").eq(1).text());
                        K++;
                        paramsList.add(goodsParam);
                    }
                    J = 1;
                }
            } else if (!element2.isEmpty()) {
                L++;
                num++;
                for (Element element : element2) {
                    Elements trs = element.getElementsByTag("tr");
                    for (Element tr : trs) {
                        GoodsParam goodsParam = new GoodsParam();
                        goodsParam.setGpId(K);
                        goodsParam.setGporder(J++);
                        goodsParam.setGoodsId(L);
                        goodsParam.setGpParamname(tr.getElementsByTag("th").text());
                        goodsParam.setGpParamvalue(tr.getElementsByTag("td").text());
                        K++;
                        paramsList.add(goodsParam);
                    }
                    J = 1;
                }
            }
        }
        System.out.println("count=" + count);
        System.out.println("num=" + num);
        System.out.println("总共" + L + "个商品");
        return paramsList;
    }




    public static List<Evaluate> parseGoodsEvaluate(int i)throws NullPointerException{
        final String GET_COMMENTS_URL = "https://club.jd.com/comment/productPageComments.action?callback=fetchJSON_comment98&productId=100006262957&score="+i+"&sortType=5&page=0&pageSize=10&isShadowSku=0&fold=1";
        HttpRequest request = HttpUtil.createGet(GET_COMMENTS_URL);
        // 伪造成火狐
        request.header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0");
        request.header("Referer", "https://item.jd.com/100006262957.html");
        // 拿到json数据
        String resJson = StrUtil.sub(request.execute().body(), 20, -2);
        // 将json数据转化为Json对象
        JSONObject jsonObject = JSON.parseObject(resJson);
        // 将Json对象转换成数组
        JSONArray comments = jsonObject.getJSONArray("comments");
        JSONArray zans = jsonObject.getJSONArray("zans");
        ArrayList<String> list1 = new ArrayList<>();
        ArrayList<String> list2 = new ArrayList<>();
        ArrayList<Evaluate> list3 = new ArrayList<>();


        try {
            comments.forEach(comment -> list1.add(((JSONObject) comment).get("content").toString()));
            comments.forEach(zan -> list2.add(((JSONObject) zan).get("usefulVoteCount").toString()));
        } catch (Exception e) {
            e.printStackTrace();
        }

        for (int j = 0; j < list1.size(); j++) {
            Evaluate evaluate = new Evaluate();
            evaluate.setContent(list1.get(j));
            evaluate.setStarts(Integer.parseInt(list2.get(j)));
            evaluate.setGoodsId(K);
            list3.add(evaluate);
        }
        K++;
//        System.out.println("list3长度="+list3.size());

        return list3;
    }

}