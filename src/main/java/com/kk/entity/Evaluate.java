package com.kk.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.io.Serializable;

/**
 * 评论表(Evaluate)实体类
 *
 * @author makejava
 * @since 2020-04-27 12:48:10
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "t_evaluate")
public class Evaluate implements Serializable {
    private static final long serialVersionUID = 493571531235396984L;
    /**
    * 评论id
    */
    @TableId(type = IdType.AUTO)
    private Integer evaluateId;
    /**
    * 评论内容
    */
    private Object content;
    /**
    * 点赞数
    */
    private Integer starts;
    /**
    * 评论时间
    */
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
    /**
    * 商品id
    */
    private Integer goodsId;


    public Integer getEvaluateId() {
        return evaluateId;
    }

    public void setEvaluateId(Integer evaluateId) {
        this.evaluateId = evaluateId;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }

    public Integer getStarts() {
        return starts;
    }

    public void setStarts(Integer starts) {
        this.starts = starts;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

}