package com.kk.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * (GoodsCover)实体类
 *
 * @author makejava
 * @since 2020-04-25 02:02:57
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "t_goods_cover")
public class GoodsCover implements Serializable {
    private static final long serialVersionUID = 839283699530456688L;
    /**
    * 商品封面图id
    */
    @TableId(type = IdType.AUTO)
    private Integer gcId;
    /**
    * 商品id
    */
    private Integer goodsId;
    /**
    * 商品封面图url
    */
    private String gcPicUrl;
    /**
    * 商品缩略图url
    */
    private String gcThumbUrl;
    /**
    * 图片排序规则
    */
    private Integer gcOrder;


    public Integer getGcId() {
        return gcId;
    }

    public void setGcId(Integer gcId) {
        this.gcId = gcId;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public String getGcPicUrl() {
        return gcPicUrl;
    }

    public void setGcPicUrl(String gcPicUrl) {
        this.gcPicUrl = gcPicUrl;
    }

    public String getGcThumbUrl() {
        return gcThumbUrl;
    }

    public void setGcThumbUrl(String gcThumbUrl) {
        this.gcThumbUrl = gcThumbUrl;
    }

    public Integer getGcOrder() {
        return gcOrder;
    }

    public void setGcOrder(Integer gcOrder) {
        this.gcOrder = gcOrder;
    }

}