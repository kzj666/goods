package com.kk.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.io.Serializable;

/**
 * (Goods)实体类
 *
 * @author makejava
 * @since 2020-04-28 15:09:59
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "t_goods")
public class Goods implements Serializable {
//    private static final long serialVersionUID = -35289697168179836L;
    private static final long serialVersionUID = 751720845248481651L;
    /**
    * 商品id
    */
    private Integer goodsId;
    /**
    * 商品名称
    */
    private String title;
    /**
    * 商品描述
    */
    private String goodsDesc;
    /**
    * 商品别名
    */
    private String subTitle;
    /**
    * 原价(不超过100万)
    */
    private Double originalPrice;
    /**
    * 现价(不超过100.00万)
    */
    private Double currentPrice;
    /**
    * 是否包邮
    */
    private Integer isFreeDelivery;
    /**
    * 商品类别id
    */
    private Integer categoryId;
    /**
    * 最近更新时间
    */
    @TableField(fill = FieldFill.UPDATE)
    private Date updateTime;


    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGoodsDesc() {
        return goodsDesc;
    }

    public void setGoodsDesc(String goodsDesc) {
        this.goodsDesc = goodsDesc;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public Double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(Double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public Integer getIsFreeDelivery() {
        return isFreeDelivery;
    }

    public void setIsFreeDelivery(Integer isFreeDelivery) {
        this.isFreeDelivery = isFreeDelivery;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

}