package com.kk.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.io.Serializable;

/**
 * 订单表(Order)实体类
 *
 * @author makejava
 * @since 2020-05-01 01:58:54
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName(value = "t_order")
public class Order implements Serializable {
    private static final long serialVersionUID = -84905195222762975L;
    /**
    * 订单id
    */
    @TableId(type = IdType.AUTO)
    private Integer orderId;
    /**
    * 订单业务编号
    */
    private String orderNo;
    /**
    * 订单状态（0表示已创建，1表示已支付，2表示已发货，3表示已收货，4表示已评价）
    */
    private Integer orderStatus;
    /**
    * 收件人名称
    */
    private String recvName;
    /**
    * 收件人地址
    */
    private String recvAddress;
    /**
    * 联系方式
    */
    private String recvMobile;
    /**
    * 邮费
    */
    private Double postage;
    /**
    * 实付款
    */
    private Double amount;
    /**
    * 订单创建时间
    */
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;


    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public Integer getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(Integer orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getRecvName() {
        return recvName;
    }

    public void setRecvName(String recvName) {
        this.recvName = recvName;
    }

    public String getRecvAddress() {
        return recvAddress;
    }

    public void setRecvAddress(String recvAddress) {
        this.recvAddress = recvAddress;
    }

    public String getRecvMobile() {
        return recvMobile;
    }

    public void setRecvMobile(String recvMobile) {
        this.recvMobile = recvMobile;
    }

    public Double getPostage() {
        return postage;
    }

    public void setPostage(Double postage) {
        this.postage = postage;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

}