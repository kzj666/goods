package com.kk.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 商品参数表(GoodsParam)实体类
 *
 * @author makejava
 * @since 2020-04-25 03:12:49
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "t_goods_param")
public class GoodsParam implements Serializable {
    private static final long serialVersionUID = 540872448727343966L;
    /**
    * 商品参数表id
    */
    private Integer gpId;
    /**
    * 商品参数名
    */
    private String gpParamname;
    /**
    * 商品参数值
    */
    private String gpParamvalue;
    /**
    * 商品id
    */
    private Integer goodsId;
    /**
    * 参数排序规则
    */
    private Integer gpOrder;


    public Integer getGpId() {
        return gpId;
    }

    public void setGpId(Integer gpId) {
        this.gpId = gpId;
    }

    public String getGpParamname() {
        return gpParamname;
    }

    public void setGpParamname(String gpParamname) {
        this.gpParamname = gpParamname;
    }

    public String getGpParamvalue() {
        return gpParamvalue;
    }

    public void setGpParamvalue(String gpParamvalue) {
        this.gpParamvalue = gpParamvalue;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public Integer getGporder() {
        return gpOrder;
    }

    public void setGporder(Integer gpOrder) {
        this.gpOrder = gpOrder;
    }

}