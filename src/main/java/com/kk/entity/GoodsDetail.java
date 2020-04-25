package com.kk.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 商品详情表(GoodsDetail)实体类
 *
 * @author makejava
 * @since 2020-04-25 03:12:38
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "t_goods_detail")
public class GoodsDetail implements Serializable {
    private static final long serialVersionUID = 466453923486251630L;
    /**
    * 商品详情id
    */
    private Integer gdId;
    /**
    * 商品id
    */
    private Integer goodsId;
    /**
    * 实拍图url
    */
    private String gdPicUrl;
    /**
    * 图片排序规则
    */
    private Integer gdOrder;


    public Integer getGdId() {
        return gdId;
    }

    public void setGdId(Integer gdId) {
        this.gdId = gdId;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public String getGdPicUrl() {
        return gdPicUrl;
    }

    public void setGdPicUrl(String gdPicUrl) {
        this.gdPicUrl = gdPicUrl;
    }

    public Integer getGdOrder() {
        return gdOrder;
    }

    public void setGdOrder(Integer gdOrder) {
        this.gdOrder = gdOrder;
    }

}