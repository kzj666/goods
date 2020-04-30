package com.kk.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.io.Serializable;

/**
 * 秒杀促销商品表(PromotionSeckill)实体类
 *
 * @author makejava
 * @since 2020-04-30 12:44:54
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "t_promotion_seckill")
public class PromotionSeckill implements Serializable {
    private static final long serialVersionUID = -95217998967381059L;
    /**
    * 促销秒杀唯一id
    */
    @TableId(type = IdType.AUTO)
    private Long psId;
    /**
    * 商品id
    */
    private Integer goodsId;
    /**
    * 商品数量
    */
    private Integer psCount;
    /**
    * 活动开始时间
    */
    private Date startTime;
    /**
    * 活动结束时间
    */
    private Date endTime;
    /**
    * 0-未开始 1-进行中 2-已结束
    */
    private Integer status;
    /**
    * 当前价格
    */
    private Double currentPrice;
    /**
    * 促销商品创建时间
    */
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;


    public Long getPsId() {
        return psId;
    }

    public void setPsId(Long psId) {
        this.psId = psId;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public Integer getPsCount() {
        return psCount;
    }

    public void setPsCount(Integer psCount) {
        this.psCount = psCount;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(Double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

}