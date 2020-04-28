/* Date: 2019-06-11T14:39:58Z Path: js/bin/other_detail/detail_main.js */
define("detail_dir_dialog", function (t, a, e) {
    function i(t) {
        null === r && (r = new Jumei.ui.Dialog("body", {
            elem: s,
            dragHandle: "#dir_dialog",
            effects: "fade",
            trigger: "dir_dialog"
        })), n || ($("body").trigger("dir_dialog"), n = !0, setTimeout(function () {
            n = !1
        }, 2100), r.on("open", function () {
            var a = $("#dir_dialog"), e = a.find(".no_remind_p");
            e.off("click").on("click", function () {
                var t = $(this);
                t.hasClass("selected") ? t.removeClass("selected") : t.addClass("selected")
            }), a.find("a").off("click").on("click", function () {
                e.hasClass("selected") && Jumei.util.cookie.set("dir_dialog", 1, {exp: "forever"}), r.close(t)
            })
        }))
    }

    var s = '<div id="dir_dialog" class="dir_dialog"><div class="dir_title">提示</div><div class="dir_content">本商品海外发货，预计 15-20 天左右到货。如产生税金，可根据纳税凭证向客服申请报销全部税费</div><div class="dir_no_remind clearfix"><p class="no_remind_p"><s><em></em></s>不再提醒</p></div><div class="dir_btn"><a href="javascript:;">我知道了</a></div></div>',
        r = null, n = !1;
    e.exports = i
}), define("module_cart", function (t, a, e) {
    "use strict";
    var i = {
        add: function (t, a, e) {
            if (t && a) {
                var i = "http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/cart/ajax_add_to_cart";
                $.ajax({
                    url: i,
                    data: {_ajax_: 1, items: t + "," + a + ",1", which_cart: "all", from: "global"},
                    dataType: "jsonp",
                    success: function (t) {
                        e(t)
                    }
                })
            }
        }, get: function (t, a) {
            t && $.ajax({
                url: JM.SITE_MAIN_WEBBASEURL + "ajax_new/getattr?hash_id=" + t,
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "global_attr_callback",
                cache: !0,
                success: function (t) {
                    t.data && a(t.data)
                },
                error: function (t) {
                    alert("请求错误，请刷新重试！")
                }
            })
        }, getComb: function (t, a) {
            $.ajax({
                url: JM.SITE_MAIN_WEBBASEURL + "ajax_new/combination?com_id=" + t,
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "global_comb_callback",
                cache: !0,
                success: function (t) {
                    t && a(t)
                },
                error: function (t) {
                    alert("请求错误，请刷新重试！")
                }
            })
        }
    };
    e.exports = i
}), define("detail_cart", function (t, a, e) {
    "use strict";
    var i = {
        recommend: function (t, a, e) {
            (a.hash_id || a.ids) && $.ajax({
                url: t,
                data: a,
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "global_recom_callback",
                cache: !0,
                success: function (t) {
                    e(t)
                },
                error: function (t) {
                    alert("请求错误，请刷新重试！")
                }
            })
        }
    };
    e.exports = i
}), define("static_return", function (t, a, e) {
    "use strict";
    var i = {};
    i = {
        returnDialog: function () {
            0 === $(".return-dialog").length && $("body").append('<div class="return-dialog"><a class="close"></a><div class="return-content"><div class="return-notice">提示</div><div class="return-text"></div><div class="return-button"><a target="_blank">确认购买</a></div></div></div>'), 0 === $(".return-bg").length && $("body").append("<div class='return-bg'></div>"), $(".return-text").html('<span>亲，本商品不支持退货哦，请确定是否购买～</span><input type="checkbox" name="no_notice" checked = "checked"><label for="checkbox_a1">不再提醒</label> '), $(".return-dialog").css({
                background: "#fff",
                width: "300px",
                height: "225px"
            }), $(".return-dialog").fadeIn(300), $(".return-bg").fadeIn(500), $(".return-dialog a.close").on("click", function (t) {
                t.preventDefault(), $(".return-dialog").fadeOut(300), $(".return-bg").fadeOut(500)
            })
        }
    }, e.exports = i
}), define("detail_app", function (t, a, e) {
    function i() {
        null === r && (r = new Jumei.ui.Dialog("body", {
            elem: s,
            dragHandle: "#app_dialog",
            effects: "fade",
            overlayClose: !0,
            trigger: "app_dialog"
        })), $("body").trigger("app_dialog"), r.on("open", function () {
            $("#app_dialog").children(".close").off("click").on("click", function (t) {
                r.close()
            })
        })
    }

    var s = '<div class="app_dialog" id="app_dialog"><div class="close">×</div><div class="content"><div class="check"></div><div class="tips">本商品为app专享商品，快来下 载聚美客户端享受低价商品吧～</div><div class="qr_code"></div></div></div>',
        r = null;
    e.exports = i
}), define("detail_from", function (t, a, e) {
    "use strict";
    var i = {
        set: function (t) {
            var a = "", e = window.location.href, i = Jumei.util.parseUrl(e);
            return i.from && (a += i.from + "|"), a += t
        }
    };
    e.exports = i
}), define("detail_local", function (t, a, e) {
    "use strict";
    var i = {
        Cookie: Jumei.util.cookie,
        speciallocal: $("#speciallocal").length ? $("#speciallocal").val() : "",
        init: function () {
            var t = $("#local").length ? $("#local").val() : "",
                a = $("#deal_category").length ? $("#deal_category").val() : "";
            if ("0" === ($("#ab_dealcart").length ? $("#ab_dealcart").val() : "0")) this.setBtn(2); else if ("1" === t) if ("retail_global" === a || "combination_global" === a || $("#hid_mallid").length) {
                var e = this.Cookie.get(this.speciallocal) || "";
                e ? this.setBtn(e) : this.getLocal()
            } else this.setBtn(2); else "retail_global" == a || "combination_global" === a || $("#hid_mallid").length ? this.setBtn(1) : this.setBtn(2)
        },
        setBtn: function (t) {
            1 == t ? $(".buy_local").length && ($(".buy_local").children("span").html("立即抢购"), $("#anchorbarBuyBtn").length && $("#anchorbarBuyBtn").html("立即抢购"), $("#ab_dealcart").val("1")) : 2 != t && 3 != t || $(".buy_local").length && ($(".buy_local").children("span").html("加入购物车"), $("#anchorbarBuyBtn").length && $("#anchorbarBuyBtn").html("加入购物车"), $("#ab_dealcart").val("0"))
        },
        getLocal: function () {
            var t = this;
            $.ajax({
                url: "http://www." + JM.CURRENT_SITE_MAIN_WEBBASEURL + "/ajax_new/getcartflag",
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "getcartflag_callback",
                cache: !0,
                success: function (a) {
                    t.Cookie.set(t.speciallocal, a, {exp: 168}), t.setBtn(a)
                },
                error: function (a) {
                    t.setBtn(1)
                }
            })
        }
    };
    e.exports = i
}), define("static_category", function (t, a, e) {
    "use strict";
    var i = navigator.userAgent, s = /(?:Android)/.test(i), r = /(?:iPhone)/.test(i), n = $("#hid_mallid").val(),
        l = $("#hid_hashid").val();
    (s || r) && ("global_mall" === $("#deal_category").val() ? window.location.href = "http://h5.jumei.com/product/detail?item_id=" + n + "&type=global_mall" : "global_pop_mall" === $("#deal_category").val() ? window.location.href = "http://h5.jumei.com/product/detail?item_id=" + n + "&type=global_pop_mall" : "global" === $("#deal_category").val() ? window.location.href = "http://h5.jumei.com/product/detail?item_id=" + l + "&type=global_pop" : "retail_global" === $("#deal_category").val() ? window.location.href = "http://h5.jumei.com/product/detail?item_id=" + l + "&type=global_deal" : "new_combination_global" === $("#deal_category").val() ? window.location.href = "http://h5.jumei.com/product/detail?item_id=" + l + "&type=global_combination_deal" : "new_combination_mall" === $("#deal_category").val() && (window.location.href = "http://h5.jumei.com/product/detail?item_id=" + n + "&type=global_combination_mall"));
    var o;
    1484582400 <= JM.SERVER_TIME && JM.SERVER_TIME < 1486310399 && ("global" === $("#deal_category").val() ? o = '<img src="http://f0.jmstatic.com/btstatic/pc_static/pc-globalpop.png?_force_refresh=1" class="warn_fes">' : "global_pop_mall" === $("#deal_category").val() && (o = '<img src="http://f0.jmstatic.com/btstatic/pc_static/pc-globalpop.png?_force_refresh=1">')), 1484755200 <= JM.SERVER_TIME && JM.SERVER_TIME < 1486396799 && ("global_mall" === $("#deal_category").val() ? o = '<img src="http://f0.jmstatic.com/btstatic/pc_static/pc-self-fes.png?_force_refresh=1" class="warn_fes">' : "retail_global" === $("#deal_category").val() ? o = '<img src="http://f0.jmstatic.com/btstatic/pc_static/pc-self-fes.png?_force_refresh=1" class="warn_fes">' : "new_combination_global" === $("#deal_category").val() ? o = '<img src="http://f0.jmstatic.com/btstatic/pc_static/pc-self-fes.png?_force_refresh=1" class="warn_fes">' : "new_combination_mall" === $("#deal_category").val() && (o = '<img src="http://f0.jmstatic.com/btstatic/pc_static/pc-self-fes.png?_force_refresh=1" class="warn_fes">')), $(".deal_main").append(o)
}), define("static_ads", function (t, a, e) {
    "use strict";

    function i(t) {
        var a = $("#stream_id"), e = $("#deal_img").prop("src"),
            i = (Jumei.util.cookie.get("nickname"), Jumei.util.cookie.get("cookie_uid"), $("#hid_hashid").val() || ""),
            s = $("#category_id").val() || "", r = a.attr("search_product_id"), n = a.attr("search_short_name"),
            l = a.attr("search_brand_id"), o = a.attr("search_category_path") || "", c = a.attr("search_category_id"),
            _ = 2 === t.button_type || 12 === t.button_type ? 1 : 0, d = window.location.href;
        window.__zp_tag_params = {
            pagetype: "detail",
            productId: i,
            stock: _,
            p_zp_prodstype: "53e29afa958a394f21589229dc6613ed",
            p_zp_prods: {
                outerid: i,
                name: n,
                brand: l,
                category: s,
                subCategory: "",
                thirdCategory: c,
                price: t.jumei_price,
                value: t.market_price,
                image: e,
                loc: d,
                stock: "" + _
            }
        }, function (t) {
            var a = {query: [], args: t || {}};
            a.query.push(["_setAccount", "428"]), a.query.push(["_setSiteID", "1"]), (window.__zpSMConfig = window.__zpSMConfig || []).push(a);
            var e = document.createElement("script");
            e.type = "text/javascript", e.async = !0, e.src = ("https:" === document.location.protocol ? "https:" : "http:") + "//cdn.zampda.net/s.js";
            var i = document.getElementsByTagName("script")[0];
            i.parentNode.insertBefore(e, i)
        }(window.__zp_tag_params);
        var p = {
            id: r,
            soldOut: 1 === t.button_type ? 1 : _,
            brand: "",
            category: o,
            categoryId: s,
            name: n,
            price: t.jumei_price,
            imgUrl: e,
            productUrl: d,
            domain: "www",
            promotion: "热卖",
            discount: t.discount / 10,
            origPrice: t.market_price
        };
        window._py = window._py || [], window._py.push(["a", "_d..wY1itoZJBOFwMNeSVmLboP"]), window._py.push(["domain", "stats.ipinyou.com"]), window._py.push(["pi", p]), window._py.push(["e", ""]), function (t) {
            var a, e = t.createElement("script"), i = t.body.getElementsByTagName("script")[0];
            i.parentNode.insertBefore(e, i), a = "https:" == location.protocol, e.src = (a ? "https" : "http") + "://" + (a ? "fm.ipinyou.com" : "fm.p0y.cn") + "/j/adv.js"
        }(document)
    }

    e.exports = i
}), define("static_status", function (t, a, e) {
    "use strict";

    function i(t) {
        if ("pre" == t.sale_forms) {
            var a = t.button_type, e = s(t.start_time), i = s(t.end_time), r = s(t.payment_start_time),
                n = s(t.payment_end_time), l = 0, o = "";
            switch ($(".status_rate .balance").find(".con").html("开始时间：" + r + "<br/>结束时间：" + n), a) {
                case 11:
                    $(".status_rate .deposit").addClass("balbefore").find(".con").html("开售时间：" + e + "<br/>结束时间：" + i);
                    break;
                case 12:
                    l = t.end_time - t.time;
                    var c = parseInt(l / 86400), _ = parseInt(l % 86400 / 3600);
                    o = _ < 1 ? "即将结束" : "剩余时间：" + c + "天" + _ + "小时", $(".status_rate .deposit").addClass("running").find(".con").html(o);
                    break;
                case 14:
                    $(".status_rate .produce").addClass("running"), $(".status_rate .balance").find(".title").html("等待支付尾款");
                    break;
                case 15:
                    l = t.payment_end_time - t.time;
                    var d = parseInt(l / 86400), p = parseInt(l % 86400 / 3600);
                    o = p < 1 ? "即将结束" : "剩余时间：" + d + "天" + p + "小时", $(".status_rate .balance").removeClass("balbefore").addClass("running").find(".con").html(o);
                    break;
                case 16:
                    $(".status_rate .balance").removeClass("balbefore").find(".con").html("已结束")
            }
        }
    }

    function s(t, a) {
        a = a || 0;
        var e = new Date(parseInt(t + "000")), i = e.getFullYear(), s = e.getMonth() + 1, r = e.getDate(),
            n = e.getHours(), l = e.getMinutes(), o = e.getSeconds(), c = e.getMilliseconds();
        return s = s < 10 ? "0" + s : s, r = r < 10 ? "0" + r : r, n = n < 10 ? "0" + n : n, l = l < 10 ? "0" + l : l, o = o < 10 ? "0" + o : o, a ? {
            year: i,
            month: s,
            day: r,
            hour: n,
            minute: l,
            second: o,
            milsec: c
        } : s + "月" + r + "日" + n + ":" + l
    }

    e.exports = i
}), define("static_sku", function (t, a, e) {
    function i(t) {
        var a = t.sku_list, e = $(".single_price"), i = "";
        if (t && a) {
            var r = a.length, n = "", l = 0;
            if (1 === r) for (n = a[0], 1 !== Number(t.show_price_detail) || "global_pop_mall" !== t.item_category && "global_pop" !== t.type || $(".allprice").append('<div class="pop_tax">已含税</div>'), l = 0; l < n.length; l++) {
                var o, c = $("<li></li>"), _ = $('<a href="javascript:;"><span></span></a>'), d = _.children("span"),
                    p = $(".mark_hover"), h = n[l];
                if (_.attr({
                    sku_no: h.sku_no,
                    price: h.jumei_price,
                    market_price: h.market_price,
                    discount: h.discount,
                    booking_price: h.deposit,
                    aprice: h.abroad_price,
                    aurl: h.abroad_url || "",
                    sprice: h.abroad_price_rmb,
                    fprice: h.jumei_price_foreign,
                    salable: h.sellable,
                    payment_price: h.payment_price,
                    tariff: h.tariff || "",
                    tax: h.tax || "",
                    policy: h.refund_policy || "",
                    single_price: h.single_package_price || "",
                    price_detail: h.price_detail || "",
                    sku_img: h.sku_img || "",
                    com_mian_detail: h.combination && "new_combination_global" === t.category ? h.combination.main.price_detail : "",
                    com_vice_detail: h.combination && "new_combination_global" === t.category ? h.combination.vice.price_detail : "",
                    com_mian_name: h.combination && "new_combination_global" === t.category ? h.combination.main.name : "",
                    com_vice_name: h.combination && "new_combination_global" === t.category ? h.combination.vice.name : "",
                    com_mian_quantity: h.combination && "new_combination_global" === t.category ? h.combination.main.quantity : "",
                    com_vice_quantity: h.combination && "new_combination_global" === t.category ? h.combination.vice.quantity : "",
                    com_mian_pic: h.combination && "new_combination_global" === t.category ? h.combination.main.image_url_set : "",
                    com_vice_pic: h.combination && "new_combination_global" === t.category ? h.combination.vice.image_url_set : ""
                }), _.attr("com_mian_detail"), 1 === Number(t.show_price_detail)) {
                    if (o = "" !== h.price_detail ? h.price_detail : "货价 + 税价(增值税 + 消费税)", h.combination && "new_combination_global" === t.category) {
                        if (1 === h.is_default) {
                            var u = h.combination;
                            $("#sh_mark_price").show(), 1 === window.hideCookie && "new_combination_global" === t.category || 1 === window.hideStCookie && 2754 === t.shipping_system_id ? $("#sh_mark_price").children(".rmb_tax").html("") : $("#sh_mark_price").children(".rmb_tax").html(t.title_price_detail + " >");
                            var m = '<div class="com_pri_title"><p class="details">超值套装搭配 : <span class="detail_title">' + u.vice.name + '</span></p><p class="deal_com_price">' + o + '</p></div><div class="com_deal_box clearfix"><div class="clearfix">';
                            m += s(u), m += '<div class="fl com_pro_center_plus">+</div>', m += '<span class="com_tips">库存有限请按照购物车内商品为准</span>', m += "</div></div>", m += '<div class="tax_content"><span>' + t.tax_content_added + "</span></br><span>" + t.tax_content + "</span></div>", p.html(m)
                        }
                    } else if ($("#sh_mark_price").show(), $("#sh_mark_price").children(".rmb_tax").html(t.title_price_detail + " >"), $(".mark_hover").css("width", "315px"), $(".tax_content").css("margin-top", "20px"), 1 === h.is_default) {
                        var f = '<p class="details">价格详情:</p><div class="price_detail"><p class="deal_price">' + h.price_detail + '</p><div class="tax_content"><span>' + t.tax_content_added + "</span></br><span>" + t.tax_content + "</span></div></div>";
                        p.html(f)
                    }
                } else $("#sh_mark_price").hide();
                if ((isNaN(t.jumei_price) || isNaN(t.jumei_price) && 0 === t.is_published_price && 1 === t.button_type) && ($("#sh_mark_price").hide(), $(".jp_cur").html(""), $(".jm_p").find("em").html("")), 0 !== h.single_package_price && "undefined" !== h.single_package_price ? e.html("【单件<em>" + h.single_package_price + "</em>元】") : e.html(""), d.html(h.sku_name), $(".shoping_special").length ? (1 == t.button_type || 0 !== h.sellable && 3 !== t.button_type ? _.addClass("version") : _.addClass("version_gray"), i += _[0].outerHTML) : $("#sizesku").length ? (c.html(_), 1 == t.button_type || 0 !== h.sellable && 3 !== t.button_type || c.addClass("size_disabled"), $("#sizesku").length && c.append("<i>已选中</i>"), i += c[0].outerHTML) : $("#sku_select").length && (c.html(_), 1 !== t.button_type && (0 === h.sellable || 3 === t.button_type || 1 == window.hideCookie && "new_combination_global" === t.category || 1 === window.hideStCookie && 2754 === t.shipping_system_id) && c.addClass("sku_select_no"), i += c[0].outerHTML), i) {
                    if ($("#sizesku").length) {
                        $("#sizesku").show().find(".j_size_wrap").html(i);
                        var b = h.refund_policy, g = $(".mail_policy .detail").find(".day"),
                            v = $("#sizesku").find("li");
                        if (1 == v.length && !v.hasClass("size_disabled") && (v.addClass("size_selected"), t.item_category && b.length > -1)) switch (b) {
                            case"7days":
                                g.html("本商品支持7天无条件退货");
                                break;
                            case"7days_refund":
                                g.html("本商品支持7天拆封无条件退货");
                                break;
                            case"30days":
                                g.html("本商品支持30天无条件退货");
                                break;
                            case"no_refund":
                            default:
                                g.html("本商品不支持退货")
                        }
                    }
                    if ($("#sku_select").length && $(i).length > 1 && $("#sku_select").html(i).parents(".deal_sku").show(), $(".shoping_special").length) {
                        $(".shoping_special").show().children("dd").html(i);
                        var w = $(".shoping_special").children("dd").find("a");
                        1 != w.length || w.hasClass("version_gray") || w.addClass("version_curret")
                    }
                }
            } else if (2 == r) {
                var k = $("#com_pro_wrapper .pro_center_list"), y = $("<select></select>"),
                    x = $('<option value=""></option>');
                for (l = 0; l < a.length; l++) if (n = a[l], 0 !== n.length) {
                    y.append(x.html("请选择型号"));
                    for (var M = 0; M < n.length; M++) x.attr({data_sku: n[M].sku_no}).html(n[M].sku_name), n[M].status || x.attr("disabled", "disabled"), y.append(x);
                    k.eq(l).append(y)
                }
            }
        }
    }

    function s(t) {
        return '<div class="pro_deal_list"><img src="' + t.main.image_url_set + '" height="100" width="100"><p>' + t.main.name + "</p><p>x " + t.main.quantity + '</p></div><div class="pro_deal_list"><img src="' + t.vice.image_url_set + '" height="100" width="100"><p>' + t.vice.name + "</p><p>x " + t.vice.quantity + "</p></div>"
    }

    e.exports = i
}), define("static_price", function (t, a, e) {
    "use strict";

    function i(t) {
        var a = $(".jumei_price"), e = $(".presell_price"), i = $(".jm_price"), r = $(".market_price"),
            n = $(".deposit_price"), l = $("#abroad_price"), o = $(".abroad_price_rmb");
        a.length && a.html(s($.trim(a.html())) + t.jumei_price), e.length && e.html(s($.trim(e.html())) + t.jumei_price), i.length && i.html(s($.trim(i.html())) + t.jumei_price), r.length && r.html(s($.trim(r.html())) + t.market_price), l.html("1" == t.area_currency_symbol_location ? '<em class="currency_arial">' + t.area_currency_symbol + '</em><span class="abroad_price">' + t.abroad_price + "</span>" : '<span class="abroad_price">' + t.abroad_price + '</span><em class="currency_arial">' + t.area_currency_symbol + "</em>"), o.length && o.html(s($.trim(o.html())) + t.abroad_price_rmb), t.discount < 9 && t.discount > 0 ? (r.show(), $(".mk_p").show(), $(".discount").html(t.discount).parent().show()) : ($(".mk_p").hide(), $(".nav_price").hide()), t.abroad_price && t.abroad_price_rmb && t.jumei_price < t.abroad_price_rmb && ($(".price_price_rmb .comp_price").length && $(".price_price_rmb .comp_price").show(), $(".r_second .other_price") && l.parent().show()), n.length && ("" !== t.deposit && 0 !== t.deposit && "" !== t.payment_price && 0 !== t.payment_price ? t.end_time > t.time ? n.html(s($.trim(n.html())) + t.deposit) : n.html('尾款<span class="currency_arial"><em>¥</em>' + t.payment_price + "</span>") : n.hide()), t.deal_tax > 0 && ($("#sh_mark_price").show(), $("#mark_tax").text(t.deal_tax + "%"))
    }

    function s(t) {
        return t.lastIndexOf("??") > -1 ? t.substring(0, t.lastIndexOf("??")) : t
    }

    e.exports = i
}), define("static_btn", ["detail_local"], function (t, a, e) {
    function i(t) {
        var a, e = t.sale_forms, i = t.buyer_number;
        Number(i) > 0 && ($(".buynum").show(), $(".buynum .num_red").html(i)), a = 1 == window.hideCookie && "new_combination_global" === t.category || 1 == window.hideStCookie && 2754 == t.shipping_system_id ? 3 : t.button_type;
        var s = $(".btn_time .time"), d = $(".buy_goods_num .goods_pre_left"), p = 0;
        if (void 0 !== a) {
            "redemption" == e && ($(".deal_right .r_fourth").hide(), $(".deal_tab_nav .nav_fixed_pric").find(".btn").hide()), $(".btn_time").length && (3 === a && $(".btn").css("width", "350px"), $(".btn_time .btn").html(l["b" + a]["btn"]), $(".deal_tab_nav .nav_fixed_pric").find(".btn").html(l["b" + a]["fix"])), $(".deal_right .r_fourth").length && ("new_combination_global" === t.category && 3 === a ? ($(".deal_right .r_fourth").html(o["b" + a]["newComBtn"]), $(".deal_tab_nav .nav_fixed_pric").find(".btn").html(o["b" + a]["newComFix"])) : ($(".deal_right .r_fourth").html(o["b" + a]["btn"]), $(".deal_tab_nav .nav_fixed_pric").find(".btn").html(o["b" + a]["fix"]))), $(".price_btn .comb_btn").length && a <= 2 && $(".price_btn .comb_btn").html(o["b" + a]["combBtn"]), $(".deal_btns .btn").length && ($(".deal_btns .btn").html(c["b" + a]["btn"]), $(".deal_tab_nav .nav_fixed_pric").find(".btn").html(c["b" + a]["fix"])), $("#mall_btn").length && ("new_combination_global" === t.category && 3 === a ? ($("#mall_btn").html(_["b" + a]["newComBtn"]), $(".deal_tab_nav .nav_fixed_pric").find(".btn").html(_["b" + a]["newComFix"])) : ($("#mall_btn").html(_["b" + a]["btn"]), $(".deal_tab_nav .nav_fixed_pric").find(".btn").html(_["b" + a]["fix"])));
            var h = r(t.start_time), u = (r(t.end_time), r(t.payment_start_time)), m = (r(t.payment_end_time), 0);
            switch (a) {
                case 1:
                    "global_mall" == $(".stream_id").attr("search_product_type") ? $("#shop_wish").attr("href", $("#shop_wish").attr("href") + $(".stream_id").attr("search_product_id") + "&itemid=" + $(".stream_id").attr("search_mall_id")) : "global_deal" == $(".stream_id").attr("search_product_type") && $("#shop_wish").attr("href", $("#shop_wish").attr("href") + $(".stream_id").attr("search_product_id") + "&itemid=" + $(".stream_id").attr("search_hash_id")), s.length && s.html('<p>将于 <span class="timer">' + h + "</span> 开售</p>"), t.wish_number > 0 && ($(".people .num").length && $(".people").show().children(".num").show().html("<em>" + t.wish_number + "</em>人已加入心愿单").parents(".buy_goods_num").show(), $("#get_people").length && $("#get_people").show().html("<em>" + t.wish_number + "</em>人已加入心愿单").parent().show()), $("#deal_timer_box").length && ($("#deal_timer_box .tips").html("距开抢还剩"), m = Math.abs(t.start_time - t.time), $(".time_box").attr("diff", m));
                    break;
                case 2:
                    n.init(), !1 === isNaN($("#is_direct_pay").val()) && 0 !== Number($("#is_direct_pay").val()) && "seckill" !== $("#show_category").val() && ($(".buy_local").children("span").html("立即抢购"), $("#anchorbarBuyBtn").length && $("#anchorbarBuyBtn").html("立即抢购")), "1368" != $("#category_id").val() && "429" != $("#category_id").val() && t.buyer_number > 0 && t.buyer_number < 1e5 && ($(".people .num").length && $(".people").show().children(".num").html("<em>" + t.buyer_number + "</em>人已购买").show().parents(".buy_goods_num").show(), $("#get_people").length && $("#get_people").show().html("<em>" + t.buyer_number + "</em>人已购买").parent().show()), m = t.end_time - t.time, s.length && s.find(".tips").html("距特卖结束"), $(".time_box").attr("diff", m);
                    break;
                case 3:
                    if ("global_mall" == $(".stream_id").attr("search_product_type") ? $(".mall_remind_sell").length && $(".mall_remind_sell").attr("href", $(".mall_remind_sell").attr("href") + $(".stream_id").attr("search_product_id") + "&itemid=" + $(".stream_id").attr("search_mall_id")) : "global_deal" == $(".stream_id").attr("search_product_type") && ("undefined" != $("#deal_category").val() && "global" == $("#deal_category").val() ? ($("#remind_sell_aa").attr("href", "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/deal/mobile_subscribe/?type=global_pop_deal&id=" + $(".stream_id").attr("search_product_id") + "&itemid=" + $(".stream_id").attr("search_hash_id")), $(".remind_sell").attr("href", "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/deal/mobile_subscribe/?type=global_pop_deal&id=" + $(".stream_id").attr("search_product_id") + "&itemid=" + $(".stream_id").attr("search_hash_id"))) : "undefined" != $("#deal_category").val() && "global_pop_mall" == $("#deal_category").val() ? $(".remind_sell").attr("href", "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/deal/mobile_subscribe/?type=global_pop_mall&id=" + $(".stream_id").attr("search_product_id") + "&itemid=" + $("#hid_mallid").val()) : ($(".remind_sell").length && $(".remind_sell").attr("href", $(".remind_sell").attr("href") + $(".stream_id").attr("search_product_id") + "&itemid=" + $(".stream_id").attr("search_hash_id")), $("#remind_sell_aa").length && $("#remind_sell_aa").attr("href", $("#remind_sell_aa").attr("href") + $(".stream_id").attr("search_product_id") + "&itemid=" + $(".stream_id").attr("search_hash_id")))), "new_combination_global" !== t.category && t.end_time > t.time) $("#deal_timer_box").length ? $("#deal_timer_box").parent().hide() : s.hide(); else {
                        var f, b = r(t.time, "d"), g = r(t.end_time, "all"), v = r(t.start_time, "all");
                        f = 1 == window.hideCookie && "new_combination_global" === t.category || 1 == window.hideStCookie && 2754 == t.shipping_system_id ? b === v.day ? "今日 " + v.hour + "时" : v.day + "日 " + v.hour + "时" : b === g.day ? "今日 " + g.hour + "时" : g.day + "日 " + g.hour + "时", s.length && s.find(".tips").html("抢光于 "), $(".time_box").html(f), $("#deal_timer_box").length && ($("#deal_timer_box .tips").html("抢光于"), f = 1 == window.hideCookie && "new_combination_global" === t.category ? (b === v.day ? "今日" : v.day + "日") + v.hour + ":" + v.minute + ":" + v.second : (b === g.day ? "今日" : g.day + "日") + g.hour + ":" + g.minute + ":" + g.second, $(".time_box").html(f))
                    }
                    $("#sold_tips").length && $("#sold_tips").show(), $(".detail_sold_out") && $(".detail_sold_out").show(), $(".price_btn .btn").length && ($("#price_sold").show().addClass("two_btn"), $("#price_add").hide(), $(".price_btn .btn").append(o["b" + a]["combBtn"]));
                    break;
                case 11:
                    t.buyer_number, d.length && (p = t.end_buy_number - t.buyer_number) > 0 && d.show().children(".left_num").html(p).parents(".buy_goods_num").show(), s.length && s.html('<p>将于 <span class="timer">' + h + "</span> 开售</p>");
                    break;
                case 12:
                    s.length && !s.hasClass("num_box") && s.addClass("tworows").append('<p class="second">【' + u + "付尾款】</p>"), t.buyer_number > 0 && $("#get_people").length && $("#get_people").show().html("<em>" + t.buyer_number + "</em>人已预定").parent().show(), d.length && (p = t.end_buy_number - t.buyer_number) > 0 && d.show().children(".left_num").html(p).parents(".buy_goods_num").show(), m = t.end_time - t.time, $(".time_box").attr("diff", m);
                    break;
                case 13:
                case 14:
                    s.length && s.html('<p>将于 <span class="timer">' + u + "</span> 支付尾款</p>"), $(".row_soldout").length && $(".row_soldout").show(), $(".pre_sold").length && $(".pre_sold").show();
                    break;
                case 15:
                    $("#paymenturl").val();
                    m = t.payment_end_time - t.time, $(".btn_time .btn").children(".pop_btn").attr("href", "http://i." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/order/list/pre"), s.length && s.find(".tips").html("距付尾款结束仅剩"), $(".time_box").attr("diff", m);
                    break;
                case 16:
                    var w = r(t.payment_end_time, "all");
                    s.length && s.find(".tips").html("结束于"), $(".time_box").html(w.month + "月" + w.day + "日" + w.hour + "时")
            }
            1 !== Number($("#is_show_custserv").val()) ? $(".custom_link").hide() : $(".numtimer_box").css("marginLeft", "0px")
        }
    }

    function s() {
        var t = encodeURIComponent(window.location.href);
        return JM.SITE_MAIN_TOPLEVELDOMAINNAME.indexOf("rd") > 0 ? "http://chat.test." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/custom?groupid=228&proDetail=" + t : "http://chat." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/custom?groupid=228&proDetail=" + t
    }

    function r(t, a) {
        a = a || "g";
        var e = new Date(parseInt(t + "000")), i = e.getFullYear(), s = e.getMonth() + 1, r = e.getDate(),
            n = e.getHours(), l = e.getMinutes(), o = e.getSeconds(), c = e.getMilliseconds(), _ = "";
        switch (s = s < 10 ? "0" + s : s, r = r < 10 ? "0" + r : r, n = n < 10 ? "0" + n : n, l = l < 10 ? "0" + l : l, o = o < 10 ? "0" + o : o, a) {
            case"all":
                _ = {year: i, month: s, day: r, hour: n, minute: l, second: o, milsec: c};
                break;
            case"d":
                _ = r;
                break;
            default:
                _ = s + "月" + r + "日" + n + ":" + l
        }
        return _
    }

    var n = t("detail_local"), l = {
        b11: {
            btn: '<a href="javascript:;" class="pop_btn btn_sold">即将开售</a>',
            fix: '<a href="javascript:;" class="pop_btn pop_btn_disabled fl">即将开售</a>'
        },
        b12: {
            btn: '<a href="javascript:;" class="pop_btn" id="pay_btn" target="_blank">支付定金</a>',
            fix: '<a href="javascript:;" class="pop_btn fl" id="anchorbarBuyBtn">支付定金</a>'
        },
        b13: {
            btn: '<a href="javascript:;" class="pop_btn btn_sold">支付定金</a>',
            fix: '<a href="javascript:;" class="pop_btn pop_btn_disabled fl">支付定金</a>'
        },
        b14: {
            btn: '<a href="javascript:;" class="pop_btn btn_sold">待支付尾款</a>',
            fix: '<a href="javascript:;" class="pop_btn pop_btn_disabled fl">待支付尾款</a>'
        },
        b15: {
            btn: '<a href="javascript:;" class="pop_btn" target="_blank">去支付尾款</a>',
            fix: '<a href="javascript:;" class="pop_btn fl" id="anchorbarBuyBtn">去支付尾款</a>'
        },
        b16: {
            btn: '<a href="javascript:;" class="pop_btn btn_sold">已结束</a>',
            fix: '<a href="javascript:;" class="pop_btn pop_btn_disabled fl">已结束</a>'
        },
        b1: {
            btn: '<a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=global_pop_deal&id=" class="add_wish" id="shop_wish"></a>',
            fix: '<a class="pop_btn add_wish_fixed fl" href="javascript:;" id="anchorbarBuyBtn">加入心愿单</a>'
        },
        b2: {
            btn: '<a href="javascript:;" class="add_cart add_cart_ab buy_local" id="add_cart"><span>????</span></a>',
            fix: '<a href="javascript:;" class="pop_btn fl" id="anchorbarBuyBtn">加入购物车</a>'
        },
        b3: {
            btn: '<a href="javascript:;" class="sell_btn sold_out fl">已抢光</a><a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=global_pop_deal&id=" target="_blank" class="sell_btn remind_sell"></a>',
            fix: '<a class="pop_btn remind_sell_fixed fl" href="" id="anchorbarBuyBtn" target="_blank"></a>'
        }
    }, o = {
        b1: {
            btn: '<a href="javascript:;" class="detail_btn_fom btn_fom_wish" id="shop_wish"><span>加入心愿单</span><i></i></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            combBtn: '<a  class="detail_btn_fom btn_fom_wish" id="wish_comb"><span>加入心愿单</span><i></i></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            fix: '<a href="javascript:;" id="anchorbarBuyBtn" class="fixed_add_hart">加入心愿单</a>'
        },
        b2: {
            btn: '<a href="javascript:;" class="detail_btn_fom btn_fom_add buy_local" id="shop_cart"><span>????</span><i></i></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            combBtn: '<a  class="detail_btn_fom btn_fom_add buy_button buy_local" ><span>加入购物车</span><i></i></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            fix: '<a href="javascript:;" id="anchorbarBuyBtn" class="fixed_buy_now">加入购物车</a>'
        },
        b3: {
            btn: '<a  href="javascript:;" class="detail_btn_fom btn_fom_sold" ><span>已抢光</span><i></i></a><a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=global_deal&id=" target="_blank" class="detail_btn_fom btn_fom_tip" id="remind_sell_aa" ><i class="tip_icon"></i><span>开售提醒</span><i ></i></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            combBtn: '<a  href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=combination&id=" target="_blank" class="detail_btn_fom btn_fom_tip" ><i class="tip_icon"></i><span>开售提醒</span><i ></i></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            fix: '<a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=global_deal&id=" target="_blank" class="new_detail_btn  remind_sell" ></a>',
            newComBtn: '<a  href="javascript:;" class="detail_btn_fom btn_fom_sold" ><span>已抢光</span><i></i></a><a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=global_combination_deal&id=" target="_blank" class="detail_btn_fom btn_fom_tip" id="remind_sell_aa" ><i class="tip_icon"></i><span>开售提醒</span><i ></i></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            newComFix: '<a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=global_combination_deal&id=" target="_blank" class="new_detail_btn  remind_sell" ></a>'
        }
    }, c = {
        b1: {
            btn: '<a href="javascript:;" class="detail_btn wish" id="shop_wish">加入心愿单</a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            fix: '<a href="javascript:;" id="anchorbarBuyBtn" class="detail_btn wish-fixed"><span>加入心愿单</span></a>'
        },
        b2: {
            btn: '<a class="detail_btn buying buy_local" id="shop_cart" target="_blank"><span>????</span></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            fix: '<a href="javascript:;" id="anchorbarBuyBtn" class="detail_btn right_away"><span>加入购物车</span></a>'
        },
        b3: {
            btn: '<a href="javascript:;" class="detail_btn no-select fl" >已抢光</a><a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=global_deal&id=" target="_blank" class="sell_btn remind_sell"></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            fix: '<a href="javascript:;" target="_blank" id="anchorbarBuyBtn" class="sell_btn remind_sell_fixed"></a>'
        },
        b11: {btn: '<a href="javascript:;" class="detail_btn pay_button no_button fl">即将开售</a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>'},
        b12: {btn: '<a href="javascript:;" class="detail_btn pay_button fl" id="pay_btn" target="_blank">支付定金</a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>'},
        b13: {btn: '<a href="javascript:;" class="detail_btn pay_button no_button fl">支付定金</a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>'},
        b14: {btn: '<a href="javascript:;" class="detail_btn pay_button no_button fl">待支付尾款</a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>'},
        b15: {btn: '<a href="http://i.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/order/list/pre" class="detail_btn pay_button fl" target="_blank">去支付尾款</a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>'},
        b16: {btn: '<a href="javascript:;" class="detail_btn pay_button no_button fl" >已结束</a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>'}
    }, _ = {
        b2: {
            btn: '<a href="javascript:;" class="detail_btn_fom btn_fom_add buy_local" id="shop_cart"><span>加入购物车</span><i></i></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            fix: '<a href="javascript:;" class="pop_btn fl" id="anchorbarBuyBtn">加入购物车</a>'
        },
        b3: {
            btn: '<a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=global_mall&id=" class="detail_btn_fom btn_fom_sold remind_sell mall_remind_sell" target="_blank"><span>订阅到货通知</span></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            fix: '<a class="pop_btn remind_sell_fixed remind_sell mall_remind_sell fl" href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=global_mall&id=" target="_blank">订阅到货通知</a>',
            newComBtn: '<a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=global_combination_mall&id=" class="detail_btn_fom btn_fom_sold remind_sell mall_remind_sell" target="_blank"><span>订阅到货通知</span></a><a class="custom_link" target="_blank" href="' + s() + '">联系客服</a>',
            newComFix: '<a class="pop_btn remind_sell_fixed remind_sell mall_remind_sell fl" href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/deal/mobile_subscribe/?type=global_combination_mall&id=" target="_blank">订阅到货通知</a>'
        }
    };
    e.exports = i
}), define("static_cart", function (t, a, e) {
    "use strict"
    ;var i = {
        getData: function (t, a) {
            t && $.ajax({
                url: t,
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "static_callback",
                cache: !0,
                success: function (t) {
                    a(t)
                },
                error: function () {
                    alert("请求错误，请刷新重试")
                }
            })
        }
    };
    e.exports = i
}), define("module_praise", function (t, a, e) {
    "use strict";
    var i = $("#script_koubei"), s = $("#" + i.attr("koubeiWrap")),
        r = (s.length && s.offset().top, i.attr("cssHref"), i.attr("productId")), n = "http://koubei.jumei.com",
        l = n + "/ajax/reports_for_deal_newpage.json", o = i.attr("cssVersion") || 0,
        c = window.jm_webjs_cdn || "http://s0.jmstatic.com/", _ = $(window), d = {
            getCdnCSS: function (t) {
                return c + t + "?" + o
            }, loadRecords: function (t) {
                JM.DEAL_PRAISE && ($("head").append('<link rel="stylesheet" href="http://p0.jmstatic.com/product_report/newKoubei//css/11/jumei_deal_report.css" type="text/css" />'), t && $("head").append('<link rel="stylesheet" href="' + t + '" type="text/css" />'), $.ajax({
                    url: "http://p0.jmstatic.com/product_report/newKoubei/js/js/12/Ajaxpage.js",
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    success: function () {
                    }
                }))
            }, koubeiCallBackfunction: function (t) {
                function a() {
                    var t = $(".report_attr_select");
                    $(".product_report_tab a.selected");
                    t.hover(function () {
                        $(this).find("ul").show()
                    }, function () {
                        $(this).find("ul").hide()
                    }), t.find("a").click(function () {
                        var t = $(this), a = t.parent().parent().parent("div");
                        return a.find(".age_text").html(t.html()).attr("val", t.attr("val")), a.find(">ul").hide(), i(1, !0), !1
                    }), $(".product_report_tab a").click(function () {
                        var t = $(this);
                        t.parent().parent().parent("div");
                        return t.addClass("selected").siblings().removeClass("selected"), i(1, !0), !1
                    })
                }

                function e(t) {
                    var a = $("#reportwrap span.age_text"), e = a.eq(0).attr("val"), i = a.eq(1).attr("val"),
                        s = $(".product_report_tab a.selected").attr("val");
                    return x ? l + "?baby_gender=" + i + "&baby_age=" + e + "&rating=" + s + "&page_number=" + t + "&product_id=" + r + "&t=" + Math.random() : l + "?skin_type=" + i + "&age=" + e + "&rating=" + s + "&page_number=" + t + "&product_id=" + r + "&t=" + Math.random()
                }

                function i(a, i) {
                    i ? $.ajax({
                        url: e(a),
                        dataType: "jsonp",
                        cache: !0,
                        jsonpCallback: "koubeiCallBackfunction",
                        success: function (t) {
                            o(t), t.pageCount > 1 ? p.refactoringPage(a, t.pageCount) : ($(".all_reports_btn").hide(), $(p.opts.pageWrap).hide())
                        },
                        error: function () {
                            alert("网络请求失败，请刷新重试")
                        }
                    }) : (o(t), p.refactoringPage(a))
                }

                function o(t) {
                    if (t.rows.length > 0) {
                        var a, e, i = [];
                        $.each(t.rows, function (s) {
                            var r = t.rows[s];
                            if (i.push('<li class="pfTrends">'), i.push('    <div class="arrow"></div>'), i.push('    <a href="' + r.user_url + '" rel="nofollow" class="avatar" target="_blank"><img src="' + r.avatar_small + '" alt="' + r.nickname + '"></a>'), "0" != r.is_valuable && i.push('    <span class="re_valuable"></span>'), i.push('    <div class="report">'), i.push('        <div class="user_info">'), i.push('            <span class="user_name"><a href="' + r.user_url + '" class="avatar" target="_blank">' + r.nickname + "</a></span>"), r.medals) for (var n in r.medals) {
                                var l = r.medals[n];
                                i.push('            <img src="' + l.icon_url + '" title="' + l.title + '" class="vip_icon">')
                            }
                            if (e = r.hair_type ? '<span class="user_attr"> &#12288;' + r.age + "," + r.skin_type + "," + r.hair_type + "</span>" : '<span class="user_attr"> &#12288;' + r.age + "," + r.skin_type + "</span>", i.push(e), i.push('            <div class="rating_wrap">'), i.push('                <div class="rating">'), i.push('                    <div class="value" rating="' + r.rating + '"></div>'), i.push("                </div>"), i.push("            </div>"), i.push("        </div>"), i.push('        <div class="report_content">'), i.push('            <a href="' + r.report_url + '" class="tit" target="_blank">' + r.title + "</a>"), (a = r.img_thumbs.length) > 0) {
                                i.push('            <div class="thumbImgList">');
                                for (var o = 0; o < a && o < 5; o++) i.push('                <a href="' + r.report_url + '" target="_blank"><img src="' + r.img_thumbs[o] + '"></a>');
                                i.push("            </div>")
                            }
                            i.push('            <div class="desc">'), i.push('                <a href="' + r.report_url + '" target="_blank">' + r.content_abstract_300 + "</a>"), i.push("            </div>"), i.push('            <div class="gray_f1 pt10">'), i.push('                <div class="txtL">'), i.push("                    " + r.view_count + '阅读<em>|</em><span class="redtxt">' + (r.comment_count < 0 ? 0 : r.comment_count) + '</span><b>回复</b><em>|</em><span class="redtxt">' + r.shown_support_count + "</span><b>有用</b>"), i.push("                </div>"), i.push('                <div class="cl"></div>'), i.push("            </div>"), i.push("        </div>"), i.push("    </div>"), i.push("</li>")
                        }), i.push('<div class="cl"></div>'), $("#reports_list_wrap").html(i.join("")), $(p.opts.pageWrap).show(), $(".all_reports_btn").show(), $("div[rating]").each(function () {
                            this.style.width = this.parentNode.clientWidth * ($(this).attr("rating") / 5) + "px"
                        })
                    } else $("#reports_list_wrap").html('<img style="margin:30px 0;" src="http://p0.jmstatic.com/product_report/newKoubei/images/deal/1/no_info.png" />'), $(p.opts.pageWrap).hide(), $(".all_reports_btn").hide()
                }

                if (0 !== t.rows.length) {
                    var c, d, p = window.globalPage, h = t.filters.product_id;
                    if (d = void 0 === t.filters.product_id_new ? t.filters.product_id : t.filters.product_id_new, $(".people").length) {
                        var u = parseInt(t.init_data.comments_count) + parseInt(t.init_data.reporter_count);
                        $(".people").show().find(".comments").show().css({float: "left"}).html(t.init_data.product_report_rating + '分(<a href="#yhkb">' + u + "条评论</a>)")
                    }
                    if ($("#koubei").length) {
                        var m = t.init_data.product_report_rating;
                        $("#koubei").show(), $("#rating_value").css({width: 16 * m}), $("#score").children("em").text(m), $("#kb_num").children("em").text(t.init_data.reporter_count), +t.init_data.comments_count > 0 && $("#dp_num").show().find("a").attr({
                            href: n + "/comment_list-" + d + "-1.html?from=global_deal_mall_reviews",
                            target: "_blank"
                        }).children("em").text(t.init_data.comments_count)
                    }
                    $("#yhkb_link, #yhkb .detail_content, #yhkb .content_text").show(), $("#yhkb").css({"padding-top": "50px"});
                    var f = ['<div class="deal_con product_report" id="product_report">'];
                    f.push('<div id="reportwrap">'), f.push(' <div class="block_title" style="display:none;" id="product_report_title">'), f.push('<span style="display:none;">口碑报告</span>'), f.push(" </div>"), f.push("</div>"), f.push('<div id="commentwrap" style="display: none;">'), f.push('<div class="block_title" id="title_comments" >'), f.push('<span style="display:none;">收货评论</span>'), f.push("</div>"), f.push('<div class="deal_con_content">'), f.push('<ul class="comments" id="ul_comments">'), f.push("</ul>"), f.push('<div class="notice">'), f.push('<a href="#" target="_blank">共有<span id="comment_count"></span>条收货短评，点击查看</a>'), f.push("</div>"), f.push("</div>"), f.push(" </div>"), f.push(" </div>"), f.push('<div class="clearfix"></div>'), s.append(f.join("")).find("#reportwrap").append('<div class="lazy" id="reportload">请稍候，正在加载....</div></div>');
                    var b = $("#reportwrap"), g = $("#reportload"), v = ['<div class="deal_con_content">'];
                    if (v.push('<div class="product_report_ranks clearfix">'), t.rowCount && t.rowCount > 0) {
                        v.push('    <div class="rp_score_l">'), v.push('        <span class="tit"></span>'), v.push("        <div>"), v.push('            <h2 class="record_num">' + t.init_data.product_report_rating + "/5</h2>"), v.push('            <div class="rating">'), v.push('                <div class="value" style="width:' + 16 * t.init_data.product_report_rating + 'px;"></div>'), v.push("            </div>"), v.push("        </div>"), v.push('        <p class="pink"><a class="reda" href="' + n + "/report_list-" + h + '.html" target="_blank">' + t.init_data.reporter_count + '</a>口碑&nbsp;&nbsp;<a class="reda" href="' + n + "/comment_list-" + d + '-1.html" target="_blank">' + t.init_data.comments_count + "</a>短评</p>"), v.push("    </div>"), v.push('    <div class="rp_score_c">');
                        var w = t.init_data.splitrating;
                        if (w) {
                            v.push('        <dl class="rp_histogram">');
                            var k = 0;
                            for (c in w) {
                                var y = w[c];
                                if (k >= 6) break;
                                3 == k && (v.push("        </dl>"), v.push('        <dl class="rp_histogram">')), v.push("            <dd>"), v.push('                <span class="icon_red">' + (k + 1) + '</span><span class="progress_wrap"><span class="bg" style="width:' + 100 * y.score / 5 + '%;"></span><span class="txt">' + y.name + "</span></span>"), v.push("            </dd>"), v.push("            <dt>" + y.score + "</dt>"), k++
                            }
                            v.push("        </dl>")
                        }
                        v.push("    </div>")
                    }
                    v.push('    <div class="rp_score_r"><p>该商品使用起来好用吗？</p>'), v.push("        <p>与超千万聚美用户分享</p>"), v.push("        <p>你的独家心得</p>"), v.push('        <div class="report_share_btn"><a target="_blank" href="' + n + '/user/products#filter=write#page=1">我要写口碑</a>'), v.push("        </div>"), v.push("    </div>"), v.push("</div>"), v.push('  <div class="product_report_filters clearfix">'), v.push('      <div class="product_report_filter">'), v.push('             <div class="report_attr_select">'), v.push('<div class="selected_item">'), v.push('<span class="age_text" id="kb_select_age_tit" val="0">全部年龄</span>'), v.push('<span class="arrow"></span>'), v.push("</div>"), v.push('<ul id="kb_age_select_list_wrap">'), v.push("</ul>"), v.push("</div>"), v.push('<div class="report_attr_select">'), v.push('<div class="selected_item">'), v.push('<span class="age_text" id="kb_select_skin_tit" val="0">全部肤质</span>'), v.push('<span class="arrow"></span>'), v.push("</div>"), v.push('<ul id="kb_skin_select_list_wrap">'), v.push("</ul>"), v.push("</div>"), v.push("</div>"), v.push("</div>"), v.push('<ul id="reports_list_wrap">'), v.push("</ul>"), t.pageCount > 1 && (v.push('<div id="pageSplit">'), v.push("</div>"), v.push('<a href="' + t.product_reviews_url + '" class="all_reports_btn">查看全部口碑报告</a>')), b.append(v.join(""));
                    var x = 0;
                    $.ajax({
                        url: n + "/ajax/getBabyData.html?product_id=" + r,
                        jsonpCallback: "ageCallbackFunction",
                        dataType: "jsonp",
                        cache: !0,
                        success: function (t) {
                            var e, i, s, r, n = [];
                            "failure" == t.product_type ? (e = [["全部年龄", 0], ["0-20岁", 20], ["21-25岁", 21], ["26-30岁", 26], ["31-35岁", 31], ["36-40岁", 36], ["40岁以上", 40]], i = [["全部肤质", 0], ["中性皮肤", 1], ["干性皮肤", 2], ["混合性皮肤", 3], ["油性皮肤", 4], ["敏感性皮肤", 5], ["敏感中性皮肤", 6], ["敏感油性皮肤", 7], ["敏感干性皮肤", 8], ["敏感混合性皮肤", 9]]) : (x = 1, e = [["宝宝年龄", 0], ["0-3个月", 1], ["3-6个月", 2], ["6-12个月", 3], ["1-2岁", 4], ["2岁以上", 5]], i = [["宝宝性别", 0], ["男", 2], ["女", 1]], $("#kb_select_age_tit").html("宝宝年龄"), $("#kb_select_skin_tit").html("宝宝性别"));
                            for (s in e) n.push('<li><a href="javascript:;" type="age" val="' + e[s][1] + '">' + e[s][0] + "</a></li>");
                            $("#kb_age_select_list_wrap").append(n.join("")), n = [];
                            for (r in i) n.push('<li><a href="javascript:;" type="skin" val="' + i[r][1] + '">' + i[r][0] + "</a></li>");
                            $("#kb_skin_select_list_wrap").append(n.join("")), a()
                        },
                        error: function () {
                        }
                    });
                    for (c in t.init_data.rates[r.toString()]) {
                        var M = $("div[rating_av=" + c + "]").get(0);
                        M && (M.style.width = M.parentNode.clientWidth * t.init_data.rates[r.toString()][c].rate + "px")
                    }
                    if ($("div[rating_av_star]").each(function () {
                        this.style.width = this.parentNode.clientWidth * (parseInt($(this).attr("rating_av_star")) / 5) + "px"
                    }), a(), o(t), b.show(), g.hide(), t.pageCount > 1) {
                        var E = function (t) {
                            i(t, !0), _.scrollTop(s.offset().top)
                        };
                        p.initPage({infoTotal: t.rowCount, pageSize: t.rowsPerPage, callback: E, pageNum: 8})
                    }
                }
            }, ajaxRequestKouBeiInfo: function () {
                $.ajax({
                    url: l + "?init=1&product_id=" + r,
                    dataType: "jsonp",
                    jsonpCallback: "koubeiCallBackfunction",
                    cache: !0,
                    success: d.koubeiCallBackfunction
                })
            }
        };
    d.loadRecords();
    var p = $("#anchorbar");
    JM.DEAL_PRAISE && p.length > 0 && $(window).bind("scroll.koubei", function () {
        "fixed" == p.css("position") && (p.data("koubei") || (p.data("koubei", !0), d.ajaxRequestKouBeiInfo(), $(window).unbind("scroll.koubei")))
    })
}), define("detail_other", ["detail_from", "detail_dir_dialog", "detail_app", "static_return"], function (t) {
    "use strict";
    var a = t("detail_from"), e = t("detail_dir_dialog"), i = t("detail_app"), s = t("static_return"), r = {
        init: function () {
            this.specialHandle(), this.addHandle()
        }, specialHandle: function () {
            function t(t) {
                return Jumei.util.findNumIndex(t) > -1 ? t.substring(0, Jumei.util.findNumIndex(t)) : t
            }

            var a = this, e = $(".sku_select"), i = (e.children(), $(".deal_sku_input")),
                s = ($(".deal_sku .warningtip"), i.next()), r = $(document);
            e.on("mouseover", "li", function () {
                $(this).hasClass("sku_select_no") || $(this).addClass("sku_select_hover").siblings().removeClass("sku_select_hover")
            }), i.on("click", function () {
                e.is(":visible") ? l() : n(), a.hideWarning()
            }), s.on("click", function () {
                e.is(":visible") ? l() : n()
            });
            var n = function () {
                e.show(), o()
            }, l = function () {
                e.hide(), r.off("click.sku_select")
            }, o = function () {
                r.on("click.sku_select", function (t) {
                    a.hideWarning();
                    var r = t.target;
                    r !== e[0] && r !== i[0] && r !== s[0] && l()
                })
            };
            e.on("click", "li", function () {
                if (!$(this).hasClass("sku_select_no") && 1 != window.wish) {
                    var a = $(this).find("a"), e = a.attr("sku_no") || "";
                    i.html(a.text()).attr("sku_no", e);
                    var s = a.attr("price") ? a.attr("price") : "",
                        r = a.attr("market_price") ? a.attr("market_price") : "",
                        n = a.attr("discount") ? a.attr("discount") : "", l = a.attr("aprice") ? a.attr("aprice") : "",
                        o = a.attr("sprice") ? a.attr("sprice") : "", c = a.attr("tariff") ? a.attr("tariff") : "",
                        _ = (a.attr("tax") && a.attr("tax"), a.attr("price_detail") ? a.attr("price_detail") : ""),
                        d = (a.attr("aurl") && a.attr("aurl"), a.attr("sku_img") ? a.attr("sku_img") : $("#img_url").val()),
                        p = a.attr("com_mian_detail") ? a.attr("com_mian_detail") : "",
                        h = a.attr("com_vice_detail") ? a.attr("com_vice_detail") : "",
                        u = a.attr("com_mian_name") ? a.attr("com_mian_name") : "",
                        m = a.attr("com_vice_name") ? a.attr("com_vice_name") : "",
                        f = a.attr("com_vice_quantity") ? a.attr("com_vice_quantity") : "",
                        b = a.attr("com_mian_quantity") ? a.attr("com_vice_quantity") : "",
                        g = a.attr("com_mian_pic") ? a.attr("com_mian_pic") : "",
                        v = a.attr("com_vice_pic") ? a.attr("com_vice_pic") : "";
                    $(".jumei_price").length > 0 && ("" !== s ? $(".jumei_price").html(t($.trim($(".jumei_price").html())) + s) : $(".jumei_price").hide()), $(".jm_price").length && ("" !== s ? $(".jm_price").html(t($.trim($(".jm_price").html())) + s) : $(".jm_price").hide()), $(".market_price").length > 0 && ("" !== r ? $(".market_price").html(t($.trim($(".market_price").html())) + r) : $(".market_price").hide()), $(".abroad_price").length > 0 && ("" !== l && 0 !== l && "" !== o && 0 !== o && 0 === Number(JM.DEAL_PRICE) && n < 9 && n > 0 ? ($(".other_price").show(), $(".abroad_price").html(t($.trim($(".abroad_price").html())) + l), $(".abroad_price_rmb").html(t($.trim($(".abroad_price_rmb").html())) + o)) : $(".other_price").hide()), n < 9 && 0 === Number(JM.DEAL_DISCOUNT) && n > 0 ? ($(".discount").html(n).parent().show(), $(".nav_price").show(), $(".market_price").show(), $(".discount").show()) : ($(".discount").parent().hide(), $(".market_price").hide(), $(".nav_price").hide(), $(".discount").hide()), $(".tariff").hide(), "1" == c ? $(".excluding").show() : $(".including").show();
                    var w;
                    if (w = d.indexOf("350_350") > 0 || d.indexOf("800_800") > 0 ? '<img src="' + d + '"  class="ImageStd_350" id="deal_img"/>' : d.indexOf("400_400") > 0 ? '<img src="' + d + '"  class="ImageStd_400" id="deal_img"/>' : '<img src="' + d + '"  class="ImageStd_1000" id="deal_img"/>', $(".preview_product_id").html(w).children().siblings("img").css("display", "none"), $("#sh_mark_price").length && ".com_deal_box".length) {
                        var k = '<div class="clearfix"><div class="pro_deal_list"><img src="' + g + '" height="100" width="100"><p>' + u + "</p><p> x " + f + '</p><div class="com_main_price">' + p + '</div></div><div class="pro_deal_list"><img src="' + v + '" height="100" width="100"><p>' + m + "</p><p> x " + b + '</p><div class="com_vice_price">' + h + '</div></div><div class="fl com_pro_center_plus">+</div><span class="com_tips">库存有限请按照购物车内商品为准</span></div>';
                        $(".detail_title").html(m), $(".com_deal_box ").html(k), _ ? $(".deal_com_price").html(_) : $(".deal_com_price").html("货价 + 税价(增值税 + 消费税)")
                    } else $(".deal_price").text(_)
                }
            })
        }, addHandle: function () {
            var t = this;
            $(".deal_right").on("click", "#shop_cart", function (a) {
                if ("1" == ($("#platform").length ? $("#platform").val() : "0")) return void i();
                if ($(".deal_sku .sku_select").children("li").length && !$(".deal_sku .deal_sku_input").attr("sku_no")) return t.showWarning(), !1;
                var s = $(this);
                1 == $("#directwarehouse").val() || Jumei.util.cookie.get("dir_dialog") ? t.addCart(s) : e(function () {
                    t.addCart(s)
                })
            })
        }, addCart: function (t) {
            var e = $(".stream_id"),
                i = {sku: 0, hash_id: $("#hid_hashid").val(), num: 1, img: $("#deal_img").attr("src")},
                r = $(".deal_sku .sku_select").children("li"), n = $(".deal_sku .deal_sku_input");
            if (r.length > 0) {
                var l = n.attr("sku_no");
                if (!l) return this.showWarning(), !1;
                i.sku = l
            } else i.sku = $("#sku_no").val();
            var o, c, _ = 1, d = $("#ab_dealcart").val(), p = this;
            if ("seckill" == $("#show_category").val()) {
                var h = Jumei.util.cookie.get("uid");
                if (!h || "" === h) {
                    var u = window.location.href;
                    return void(window.location.href = "http://passport." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/account/login?redirect=" + encodeURIComponent(u))
                }
                $(".module-content .module-tip").html(""), p.miaoDialog(), $(".module-button span").on("click", function () {
                    var e = $(".module-text input").val(),
                        s = "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/ajax/validationkillcode";
                    $.ajax({
                        url: s, dataType: "jsonp", type: "get", data: {hash_code: e}, success: function (e) {
                            if ("success" === e.date) if ($(".module-dialog").fadeOut(300), $(".module-bg").fadeOut(500), 1 == d) {
                                _ = 6;
                                var s = i.sku + "," + i.hash_id + ",1", r = a.set("global_deal_new_jiesuan");
                                t.attr({
                                    href: "http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/cart/new_single_items/" + s + "?from=" + r,
                                    target: "_blank"
                                })
                            } else $.ajax({
                                url: "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/ajax/getseckilltoken",
                                type: "get",
                                dataType: "jsonp",
                                data: {sku_no: i.sku, hash_id: i.hash_id},
                                success: function (a) {
                                    var e = {
                                        elem: t,
                                        num: 1,
                                        img: i.img,
                                        sku: i.sku,
                                        hashid: i.hash_id,
                                        token: a.token
                                    };
                                    0 !== Number($("#is_direct_pay").val()) ? window.location.href = "http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/confirm/show?canBack=0&items=" + i.sku + "," + i.hash_id + ",1&from=global_deal_new_jiesuan" : window.GlobalBar.addCart(e)
                                },
                                error: function (t) {
                                    alert("token error!")
                                }
                            }); else $(".module-content .module-tip").html("验证码输入错误"), $(".module-text img").attr("src", "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/ajax/hash_code?from=seckill&time=" + (new Date).getTime())
                        }
                    })
                })
            } else if (0 !== Number($("#is_direct_pay").val())) 0 === Number(JM.REFUND_WINDOW) || 1 !== Number($("#refund_window").val()) || Jumei.util.cookie.get("return") ? window.location.href = "http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/confirm/show?canBack=0&items=" + i.sku + "," + i.hash_id + ",1&from=global_deal_new_jiesuan" : (s.returnDialog(), o = $(".return-button a"), c = $("input[name=no_notice]"), o.on("click", function () {
                $(".return-dialog").fadeOut(300), $(".return-bg").fadeOut(500), c.is(":checked") && !Jumei.util.cookie.get("return") && Jumei.util.cookie.set("return", "no", {exp: "forever"}), window.location.href = "http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/confirm/show?canBack=0&items=" + i.sku + "," + i.hash_id + ",1&from=global_deal_new_jiesuan"
            })); else if (1 == d) {
                _ = 6;
                var m = i.sku + "," + i.hash_id + ",1", f = a.set("global_deal_new_jiesuan");
                t.attr({
                    href: "http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/cart/new_single_items/" + m + "?from=" + f,
                    target: "_blank"
                })
            } else {
                var b = {elem: t, num: 1, img: i.img, sku: i.sku, hashid: i.hash_id};
                0 === Number(JM.REFUND_WINDOW) || 1 !== Number($("#refund_window").val()) || Jumei.util.cookie.get("return") ? window.GlobalBar.addCart(b) : (s.returnDialog(), o = $(".return-button a"), c = $("input[name=no_notice]"), o.on("click", function () {
                    $(".return-dialog").fadeOut(300), $(".return-bg").fadeOut(500), c.is(":checked") && !Jumei.util.cookie.get("return") && Jumei.util.cookie.set("return", "no", {exp: "forever"}), o.off("click"), window.GlobalBar.addCart(b)
                }))
            }
            window.StreamUtil.init(e, {search_sku_id: i.sku, fb_type: _})
        }, showWarning: function () {
            var t = $(".deal_sku .deal_sku_input"), a = $(".deal_sku .warningtip"), e = $(".deal_sku .sku_select");
            t.addClass("warning"), a.show(), e.hide()
        }, hideWarning: function () {
            var t = $(".deal_sku .deal_sku_input"), a = $(".deal_sku .warningtip");
            $(".deal_sku .sku_select");
            t.removeClass("warning"), a.hide()
        }, miaoDialog: function () {
            0 === $(".module-dialog").length && $("body").append('<div class="module-dialog"><a class="close"></a><div class="module-content"><div class="module-text"></div><div class="module-button"></div><div class="module-tip"></div></div></div>'), 0 === $(".module-bg").length && $("body").append("<div class='module-bg'></div>");
            var t = '小美提示<br/><input type="text" placeholder="验证码" autocomplete="off" class="num_code" maxlength="4"><img src="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/ajax/hash_code?from=seckill&time=" + (new Date).getTime() + '"><div class="change">换一换</div>';
            $(".module-button").html("<span>完成</span>").css("margin-top", "45px"), $(".module-text").html(t), $(".module-content").css("padding-top", "44px"), $(".module-dialog").css({
                background: "url('http://images.jumei.com/pc_global/301-bg2.png') no-repeat",
                width: "460px",
                height: "301px"
            }), $(".module-dialog").fadeIn(300), $(".module-bg").fadeIn(500), $(".module-dialog a.close").on("click", function (t) {
                t.preventDefault(), $(".module-dialog").fadeOut(300), $(".module-bg").fadeOut(500)
            }), $(".module-content .change").on("click", function () {
                $(".module-text img").attr("src", "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/ajax/hash_code?from=seckill&time=" + (new Date).getTime())
            })
        }
    };
    $(function () {
        r.init()
    })
}), define("detail_wish", function (t) {
    "use strict";
    var a = new Jumei.app.WishLayer, e = $("#combination_buy").find(".pro_center_list"), i = function () {
        for (var t = 0, a = []; t < e.length; t++) {
            var i, s, r, n, l;
            if (r = $(e[t]), n = r.find("select"), s = r.attr("data_hid"), n.length > 0) {
                if (l = n.find("option:selected"), !(i = l.attr("data_sku"))) return void alert("请选择商品型号")
            } else i = r.attr("data_sku");
            a.push({sku: i, hashid: s})
        }
        return a
    }, s = {
        show: function () {
            var t = $(".deal_sku .deal_sku_input"), a = $(".deal_sku .warningtip"), e = $(".deal_sku .sku_select");
            t.addClass("warning"), a.show(), e.hide()
        }, hide: function () {
            var t = $(".deal_sku .deal_sku_input"), a = $(".deal_sku .warningtip");
            t.removeClass("warning"), a.hide()
        }
    };
    $(".deal_btns").on("click", "#shop_wish", function (t) {
        var e = "", i = $(".shoping_special .version"), s = $(".shoping_special .version_curret");
        if (i.length > 0) {
            if (0 === s.length) return alert("请选择一个规格"), !1;
            e = s.attr("sku_no")
        } else e = $("#sku_no").val();
        var r = $(this);
        r.data("click-time") ? r.data("click-time", r.data("click-time") + 1) : r.data("click-time", 1), r.data("timer") ? alert("您的操作过于频繁，请稍后再试!") : (r.data("timer", setTimeout(function () {
            r.data("timer", null), r.data("click-time", null)
        }, 5e3)), a.checkState({sku: e, hashid: $("#hid_hashid").val()})), t.preventDefault()
    }), $(".r_fourth").on("click", "#shop_wish", function (t) {
        var e = "";
        if ("" !== $("#sku_select").html()) {
            if ("" === (e = $(".deal_sku .deal_sku_input").attr("sku_no") || "")) return s.show(), !1
        } else e = $("#sku_no").val();
        var i = $(this);
        i.data("click-time") ? i.data("click-time", i.data("click-time") + 1) : i.data("click-time", 1), i.data("timer") ? alert("您的操作过于频繁，请稍后再试!") : (i.data("timer", setTimeout(function () {
            i.data("timer", null), i.data("click-time", null)
        }, 5e3)), a.checkState({sku: e, hashid: $("#hid_hashid").val()})), t.preventDefault()
    }), $(".btn_time").on("click", "#shop_wish", function (t) {
        var e = $("#hid_hashid").val() || "", i = "";
        if ($("#sizesku").length) {
            var s = $("#sizesku").find("li.size_selected");
            if (!s.length) return alert("请选择型号"), !1;
            i = s.find("a").attr("sku_no")
        } else i = $("#sku_no").val() || "";
        if ("" === e || "" === i) return alert("页面出现错误，请刷新"), !1;
        var r = $(this);
        r.data("click-time") ? r.data("click-time", r.data("click-time") + 1) : r.data("click-time", 1), r.data("timer") ? alert("您的操作过于频繁，请稍后再试!") : (r.data("timer", setTimeout(function () {
            r.data("timer", null), r.data("click-time", null)
        }, 5e3)), a.checkState({sku: i, hashid: e})), t.preventDefault()
    }), $("#wish_comb").bind("click", function (t) {
        var e = i(), s = $("#combination_buy").attr("cid"), r = {cid: s, list: e}, n = $(this);
        e && s && (n.data("click-time") ? n.data("click-time", n.data("click-time") + 1) : n.data("click-time", 1), n.data("timer") ? alert("您的操作过于频繁，请稍后再试!") : (n.data("timer", setTimeout(function () {
            n.data("timer", null), n.data("click-time", null)
        }, 5e3)), a.checkState(r, "comb")), t.preventDefault())
    })
}), define("detail_list", ["detail_cart", "module_cart"], function (t, a, e) {
    "use strict";
    var i = t("detail_cart"), s = t("module_cart"), r = {
        _flag: !1, element: {}, cartlistTime: null, init: function (t) {
            this.creatRec(t), this.recommend(t)
        }, creatRec: function (t) {
            var a = $('<h2 class="single_tit"></h2><div class="ecope_carousel clearfix" id="carousel"><a href="javascript:;" class="silider_itme s_left cs_prev"></a><div class="cs_wrapper"></div><a href="javascript:;" class="silider_itme s_right cs_next"></a></div>'),
                e = "和以下商品凑单<strong>满";
            "global" !== t.catid && (e += "2件或"), t.price ? e += "<span>" + t.price + "</span>元包邮</strong>" : e = "<strong>向您推荐</strong>", "retail_global" === t.catid && (e = "超值推荐商品"), t.target && t.target.append(a).find(".single_tit").html(e)
        }, initRec: function () {
            this.renderHandle()
        }, recommend: function (t) {
            var a = this, e = {}, s = "";
            "retail_global" == l.catid ? (e = $("#hid_mallid").length ? {
                ids: $("#hid_mallid").val(),
                type: "mall"
            } : {
                ids: $("#hid_hashid").val(),
                type: "deal"
            }, s = JM.SITE_MAIN_WEBBASEURL + "ajax_new/GetGlobalRecommendeds") : (s = JM.SITE_MAIN_WEBBASEURL + "ajax_new/GetCartRecommended", e = {
                hash_id: $("#hid_hashid").val(),
                shippingsystemid: t.sysid,
                category: t.catid
            }), i.recommend(s, e, function (e) {
                var i = e.data || null;
                i && i.length > 0 && (t.target.show(), a.renderRecom(i))
            })
        }, renderRecom: function (t) {
            for (var a, e, i, s = 0, r = $("<ul class='itme clearfix cs_list'></ul>"); s < t.length; s++) {
                a = t[s], e = Math.round(10 * a.market_price) / 10, i = a.customers_price;
                var n, l = a.id || a.hash_id,
                    o = "r_g_co_" + $("#stream_id").attr("search_product_id") + "_1-" + (s + 1);
                n = 0 !== e && 0 === JM.DEAL_PRICE && i / e < .9 ? "<p class='pic_price'><strong><span class='currency_arial'>¥</span>" + i + "</strong>(<span class='pic_price_mak'>¥" + e + "</span>)</p>" : "<p class='pic_price'><strong><span class='currency_arial'>¥</span>" + i + "</strong></p>";
                var c = "<a href='" + JM.SITE_ITEM_WEBBASEURL + l + ".html?from=" + o + "' target='_blank'><div class='pic'><img src='" + a.img_url + "'></div>",
                    _ = "<div class='side_item'>" + a.short_name + "</div>", d = n,
                    p = "<input type='hidden'  value='" + l + "'></a>", h = "<li>" + c + _ + d + p + "</li>", u = $(h);
                u.attr({
                    search_product_type: "global_deal",
                    search_show_id: "0",
                    search_product_id: a.product_id,
                    search_category_id: a.category_v3_3,
                    search_brand_id: a.brand_id,
                    search_hash_id: l,
                    search_sku_id: a.sku_no,
                    search_spu_id: a.spu_id,
                    search_warehouse_id: a.area_code,
                    price: a.customers_price
                }), r.append(u)
            }
            $(".cs_wrapper").append(r);
            new Jumei.ui.Carousel("#carousel", {indexSwitch: !1});
            this.initRec()
        }, renderHandle: function () {
            var t = this;
            t._flag = !1, $(".cs_wrapper .add_cart").bind("click", function (a) {
                a.preventDefault(), t.addHandle($(this))
            })
        }, addHandle: function (t) {
            var a = t.find("~  input").val(), e = this;
            if ("loaded" === t.attr("loaded")) t.find("~  select").length > 0 ? t.find("~  select").show() : (e.addCart(t.attr("data_sku"), a, t), window.StreamUtil.init(t.parents("li"), {
                search_sku_id: t.attr("data_sku"),
                search_spu_id: t.attr("data_spu")
            })); else {
                if (e._flag) return;
                e._flag = !0, s.get(a, function (i) {
                    t.attr("loaded", "loaded"), i = i.sku_list, e.renderSku(a, i, t), e._flag = !1
                })
            }
        }, renderSku: function (t, a, e) {
            var i = this;
            if (a.length > 1) {
                var s = $("<select class='item_mode'></select>");
                s.append("<option>请选择型号</option>");
                for (var r = 0; r < a.length; r++) {
                    var n = "" !== a[r].attribute ? a[r].attribute + "," + a[r].size : a[r].size;
                    1 === a[r].stock && s.append("<option data_spu='" + a[r].spu_id + "' data_sku='" + a[r].sku_no + "'>" + n + "</option>")
                }
                e.after(s), s.css("width", 90).bind("change", function (a) {
                    a.preventDefault();
                    var r = $(this).find("option:selected"), n = r.attr("data_sku"), l = r.attr("data_spu");
                    $(this).hide().find("option:first").attr("selected", !0), i.addCart(n, t, s), window.StreamUtil.init(e.parents("li"), {
                        search_sku_id: n,
                        search_spu_id: l
                    })
                })
            } else e.attr({
                data_sku: a[0].sku_no,
                data_spu: a[0].spu_id
            }), i.addCart(a[0].sku_no, t, e), window.StreamUtil.init(e.parents("li"), {
                search_sku_id: a[0].sku_no,
                search_spu_id: a[0].spu_id
            })
        }, addCart: function (t, a, e) {
            var i = e.parents("li").find("img"), s = {elem: e, img: i.attr("src"), sku: t, hashid: a};
            window.GlobalBar.addCart(s)
        }
    };
    if (JM.DEAL_RECOM) {
        var n = $("#deal_recom"), l = {};
        n.length > 0 && (l.sysid = n.attr("hid_shippingsystemid"), l.catid = n.attr("deal_category") || "retail_global", l.price = Math.round(n.attr("deal_baoyou")), l.target = n, r.init(l))
    }
}), define("detail_shop", ["detail_from", "detail_app", "static_return"], function (t, a, e) {
    "use strict";
    var i = t("detail_from"), s = t("detail_app"), r = t("static_return"), n = {
        init: function () {
            this.renderHandle(), this.specialHandle(), this.addHandle()
        }, renderHandle: function () {
            $("#final_btn").length
        }, specialHandle: function () {
            function t(t) {
                return Jumei.util.findNumIndex(t) > -1 ? t.substring(0, Jumei.util.findNumIndex(t)) : t
            }

            $("#hid_hashid").val();
            $(".shoping_special").on("click", ".version", function () {
                if (!$(this).hasClass("version_curret")) {
                    $(this).addClass("version_curret").siblings(".version").removeClass("version_curret"), $(".deal_sku_tit").length > 0 && $(".deal_sku_tit").html($(".version_curret").attr("sku"));
                    var a = $(this).attr("price") ? $(this).attr("price") : "",
                        e = $(this).attr("market_price") ? $(this).attr("market_price") : "",
                        i = $(this).attr("discount") ? $(this).attr("discount") : "",
                        s = $(this).attr("aprice") ? $(this).attr("aprice") : "",
                        r = $(this).attr("sprice") ? $(this).attr("sprice") : "",
                        n = ($(this).attr("aurl") && $(this).attr("aurl"), $(this).attr("booking_price") ? $(this).attr("booking_price") : ""),
                        l = $(this).attr("payment_price") ? $(this).attr("payment_price") : "",
                        o = $(this).attr("tariff") ? $(this).attr("tariff") : "",
                        c = $(this).attr("price_detail") ? $(this).attr("price_detail") : "",
                        _ = ($(this).attr("tax") && $(this).attr("tax"), $(this).attr("sku_img") ? $(this).attr("sku_img") : $("#img_url").val()),
                        d = $(this).attr("com_mian_detail") ? $(this).attr("com_mian_detail") : "",
                        p = $(this).attr("com_vice_detail") ? $(this).attr("com_vice_detail") : "",
                        h = $(this).attr("com_mian_name") ? $(this).attr("com_mian_name") : "",
                        u = $(this).attr("com_vice_name") ? $(this).attr("com_vice_name") : "",
                        m = $(this).attr("com_vice_quantity") ? $(this).attr("com_vice_quantity") : "",
                        f = $(this).attr("com_mian_quantity") ? $(this).attr("com_vice_quantity") : "",
                        b = $(this).attr("com_mian_pic") ? $(this).attr("com_mian_pic") : "",
                        g = $(this).attr("com_vice_pic") ? $(this).attr("com_vice_pic") : "";
                    $(".jumei_price").length > 0 && ("" !== a ? $(".jumei_price").show().html(t($.trim($(".jumei_price").html())) + a) : $(".jumei_price").hide()), $(".presell_price").length > 0 && ("" !== a ? $(".presell_price").show().html(t($.trim($(".presell_price").html())) + a) : $(".presell_price").hide()), $(".nav_fprice strong").length > 0 && ("" !== a ? $(".nav_fprice strong").show().html(t($.trim($(".nav_fprice strong").html())) + a) : $(".nav_fprice strong").hide()), $(".market_price").length > 0 && ("" !== e ? $(".market_price").show().html(t($.trim($(".market_price").html())) + e) : $(".market_price").hide()), $(".deposit_price").length > 0 && ("" !== n ? $(".deposit_price").show().html(t($.trim($(".deposit_price").html())) + n) : $(".deposit_price").hide()), $(".remain_price").length > 0 && ("" !== l ? $(".remain_price").show().html(t($.trim($(".remain_price").html())) + l) : $(".remain_price").hide()), $(".abroad_price").length > 0 && ("" !== s && 0 !== s && "" !== r && 0 !== r && 0 === Number(JM.DEAL_PRICE) && i < 9 && i > 0 ? ($(".price_price_rmb").find(".comp_price").show(), $(".abroad_price").html(t($.trim($(".abroad_price").html())) + s), $(".abroad_price_rmb").html(t($.trim($(".abroad_price_rmb").html())) + r)) : $(".price_price_rmb").find(".comp_price").hide()), i < 9 && 0 === Number(JM.DEAL_DISCOUNT) && i > 0 ? ($(".discount").html(i), $(".discount").parent().show(), $(".nav_price").show(), $(".market_price").show()) : ($(".discount").parent().hide(), $(".market_price").hide(), $(".nav_price").hide());
                    var v;
                    if (v = _.indexOf("350_350") > 0 || _.indexOf("800_800") > 0 ? '<img src="' + _ + '"  class="gall_preview_w350" id="deal_img" width="350" height="350"/>' : '<img src="' + _ + '"  class="gall_preview" id="deal_img"/>', $(".gall_wrapper").html(v).children().siblings("img").css("display", "none"), $(".tariff").hide(), "1" === o ? $(".excluding").show() : $(".including").show(), $("#sh_mark_price").length && $(".com_main_price").length && $(".com_vice_price").length) {
                        var w = '<div class="clearfix"><div class="pro_deal_list"><img src="' + b + '" height="100" width="100"><p title="' + h + " x " + m + '">' + h + " x " + m + '</p><div class="com_main_price">' + d + '</div></div><div class="pro_deal_list"><img src="' + g + '" height="100" width="100"><p title="' + u + " x " + f + '">' + u + " x " + f + '</p><div class="com_vice_price">' + p + '</div></div><div class="fl com_pro_center_plus">+</div><span class="com_tips">库存有限请按照购物车内商品为准</span></div>';
                        $(".detail_title").html(u), $(".com_deal_box ").html(w)
                    } else $(".deal_price").text(c)
                }
            })
        }, getSku: function () {
            var t = $(".shoping_special .version"), a = $(".shoping_special .version_curret"),
                e = ($("#hid_hashid").val(), "");
            if (t.length > 0) {
                if (0 === a.length) return alert("请选择一个规格"), !1;
                e = a.attr("sku_no")
            } else e = $("#sku_no").val();
            return e
        }, addHandle: function () {
            var t = this;
            $(".product_introduce").on("click", "#shop_cart", function (a) {
                if ("1" == ($("#platform").length ? $("#platform").val() : "0")) return void s();
                var e = {
                    sku: 0, hash_id: $("#hid_hashid").val(), num: 1,
                    img: $("#deal_img").attr("src")
                };
                if (e.sku = t.getSku(), e.sku) {
                    var r = 1;
                    if ("1" === $("#ab_dealcart").val()) {
                        var n = e.sku + "," + e.hash_id + ",1", l = i.set("global_deal_old_jiesuan");
                        r = 6, $(this).attr({
                            href: "http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/cart/new_single_items/" + n + "?from=" + l,
                            target: "_blank"
                        })
                    } else {
                        var o = {elem: this, num: 1, img: e.img, sku: e.sku, hashid: e.hash_id};
                        window.GlobalBar.addCart(o), a.preventDefault()
                    }
                    window.StreamUtil.init($(".stream_id"), {search_sku_id: e.sku, fb_type: r})
                }
            }), $(".deal_btns .btn").on("click", "#pay_btn", function (a) {
                var e = t.getSku(), i = $("#hid_hashid").val();
                if (!e) return !1;
                window.StreamUtil.init($(".stream_id"), {search_sku_id: e, fb_type: 7});
                var s = "http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/presale/add/" + e + "," + i + ",1";
                if (e) if (0 === Number(JM.REFUND_WINDOW) || 1 !== Number($("#refund_window").val()) || Jumei.util.cookie.get("return")) $("#pay_btn").attr("href", s); else {
                    $("#pay_btn").removeAttr("href"), r.returnDialog();
                    var n = $(".return-button a"), l = $("input[name=no_notice]");
                    n.on("click", function () {
                        $(".return-dialog").fadeOut(300), $(".return-bg").fadeOut(500), l.is(":checked") && !Jumei.util.cookie.get("return") && Jumei.util.cookie.set("return", "no", {exp: "forever"}), $(this).attr("href", s)
                    })
                }
            })
        }
    };
    $(".shoping_attribute").length > 0 && n.init()
}), define("detail_group", ["detail_local", "detail_from", "detail_app"], function (t, a, e) {
    "use strict";
    var i = t("detail_local"), s = t("detail_from"), r = t("detail_app"), n = $("#combination_buy"), l = {
        _element: {}, _data: {type: "cb"}, _drawBox: function () {
            var t = this, a = $("#deal_box");
            this.adBox = new Jumei.ui.Dialog("body", {
                elem: "#deal_box",
                effects: "zoom",
                trigger: "DealEvent"
            }), a.find(".alert_give_up,.alert_close").click(function () {
                t.adBox.close()
            }), a.find(".alert_but_btn").click(function () {
                t.addCart($(this))
            })
        }, init: function () {
            this._data.cid = n.attr("cid"), this.renderHandle(), i.init()
        }, renderHandle: function () {
            var t = this;
            n.on("click", ".buy_button", function (a) {
                !parseInt($("#ab_dealcart").val()) && a.preventDefault(), t.bindCart(a, $(this))
            }), n.on("click", "#pay_btn", function (a) {
                t.bindPreSell(a, $(this))
            }), n.find(".pro_center_list select").on("change", function () {
                var t = $(this).children("option:selected"), a = t.attr("tariff") ? t.attr("tariff") : "",
                    e = (t.attr("tax") && t.attr("tax"), t.attr("price_detail") ? t.attr("price_detail") : "");
                $(".tariff").hide(), "1" === a ? $(".excluding").show() : $(".including").show(), $(".com_detail_price").length > -1 && $("select").siblings(".com_detail_price").text(e)
            }), window.GlobalBar._ibar.on("likecartadd", function () {
                t.adBox.close()
            })
        }, bindPreSell: function (t, a) {
            for (var e = n.find(".pro_center_list"), i = 0, s = [], r = "", l = ""; i < e.length; i++) {
                var o, c, _, d, p;
                if (_ = $(e[i]), d = _.find("select"), c = _.attr("data_hid"), d.length > 0) {
                    if (p = d.find("option:selected"), !(o = p.attr("data_sku"))) return t.preventDefault(), void alert("请选择商品型号")
                } else o = _.attr("data_sku");
                0 === i && (l = o), s.push(o + "-" + c)
            }
            this._data.arr = s, window.StreamUtil.init($(".stream_id"), {
                search_sku_id: l,
                fb_type: 7
            }), r = "http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/presale/add/" + this.getItem(this._data), a.attr({
                href: r,
                target: "_blank"
            })
        }, bindCart: function (t, a) {
            var e = n.find(".pro_center_list"), i = $("#platform").length ? $("#platform").val() : "0", s = 0, l = [];
            if ("1" === i) return void r();
            for (; s < e.length; s++) {
                var o, c, _, d, p;
                if (_ = $(e[s]), d = _.find("select"), c = _.attr("data_hid"), d.length > 0) {
                    if (p = d.find("option:selected"), !(o = p.attr("data_sku"))) return alert("请选择商品型号"), void t.preventDefault()
                } else o = _.attr("data_sku");
                0 === s && (this._data.img = _.find("img").attr("src"), o), l.push(o + "-" + c)
            }
            this._data.arr = l, this.addCart(a)
        }, goCart: function () {
            $("body").trigger("DealEvent")
        }, addCart: function (t, a) {
            if ("1" === $("#ab_dealcart").val()) {
                var e = this.getItem(this._data), i = "global_deal_old_jiesuan", r = "";
                JM.CONTROL && "NewDeal" === JM.CONTROL && (i = "global_deal_new_jiesuan"), r = s.set(i), t.attr({
                    href: "http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/cart/new_single_items/" + e + "?from=" + r,
                    target: "_blank"
                })
            } else {
                var n = {elem: t, img: this._data.img, combt: this.getItem(this._data)};
                window.GlobalBar.addCart(n)
            }
        }, getItem: function (t) {
            var a = t.arr.join("^");
            return t.type + "," + t.cid + "," + a + ",1"
        }
    };
    n.length > 0 && l.init()
}), define("detail_bin", function (t) {
    "use strict";
    Jumei.util.hoverIntent($(".sh_mark"), {
        interval: 100, over: function () {
            $(this).find(".mark_layer").fadeIn()
        }, timeout: 120, out: function () {
            $(this).find(".mark_layer").fadeOut()
        }
    });
    var a = $(".advert_newuser"), e = {bottom: "0px", left: "0px"};
    a.length > 0 && (Jumei.util.fixed(a[0], e), a.show(), setTimeout(function () {
        a.animate({height: "35px"}, 500, function () {
            var t = a.find("input").val();
            $(this).html('<img src="' + t + '"/>')
        })
    }, 5e3)), $("#deal_prefer .item").mouseenter(function () {
        $(this).stop().animate({top: "-80px"}, 300)
    }).mouseleave(function () {
        $(this).stop().animate({top: "0px"}, 300)
    });
    var i = $(".jmcjwt #btn"), s = $(".jmcjwt #jmcjwt_img");
    i.click(function () {
        var t = i.attr("status");
        void 0 === t || "" === t || "close" == t ? s.stop(!1, !0).slideDown(300, function () {
            i.attr("status", "open").html("点击收起 -")
        }) : s.stop(!1, !0).slideUp(300, function () {
            i.attr("status", "close").html("点击查看 +")
        })
    });
    var r = $(".deal_en");
    r.text().length > 11 && (r.hide(), $(".area_code_b").css({"margin-top": "10px"})), $("#detailfaq").click(function () {
        var t = JM.SERVER_TIME;
        !JM.DEGRADATION && (t >= 1485449999 && t <= 1485478800 || t >= 1485532800 && t <= 1485565200 || t >= 1485619200 && t <= 1485651600 || t >= 1485705600 && t <= 1485738e3 || t >= 1485792e3 && t <= 1485824400 || t >= 1485878400 && t <= 1485910800 || t >= 1485964800 && t <= 1485997200 || t >= 1485511200 && t <= 1485532800 || t >= 1485597600 && t <= 1485619200 || t >= 1485684e3 && t <= 1485705600 || t >= 1485770400 && t <= 1485792e3 || t >= 1485856800 && t <= 1485878400 || t >= 1485943200 && t <= 1485964800) ? ($(".spring").length <= 0 && $("body").append('<div class="spring"><div class="spring_title"><span class="title">温馨提示</span><div class="close"></div></div><div class="spring_content"><div class="content">春节1月27日-2月1日期间，人工客服时间暂调整为9:00-18:00，2月2日9:00起恢复24小时服务。祝您春节愉快^^</div><div class="close">我知道了</div></div> </div>'), $(".spring_bg").length <= 0 && $("body").append('<div class="spring_bg"></div>'), $(".close").on("click", function () {
            $(".spring_bg").fadeOut(500), $(".spring").fadeOut(300)
        }), $(".spring_bg").fadeIn(300), $(".spring").fadeIn(500)) : ($(".spring_bg").hide(), $(".spring").hide(), Jumei.app.iBar.faq())
    }), $(".my_list_tit").click(function (t) {
        var a = $(this), e = a.offset().top - 35, i = a.parent().find(".my_list_con");
        i.find("img").each(function () {
            var t = $(this), a = t.attr("lazysrc");
            a && t.attr("src", a)
        }), a.hasClass("my_show") ? (a.removeClass("my_show"), i.hide()) : (a.addClass("my_show"), i.show(), $("body,html").stop().animate({scrollTop: e + "px"}, 300))
    })
}), define("detail_cont", function (t) {
    "use strict";
    $(function () {
        if ($("#home_foucs").length > 0) {
            new Jumei.ui.HtmlSlidePlayer("#home_foucs", {autosize: 1, fontsize: 12, time: 5e3, slidearrow: !0})
        }
        new Jumei.ui.TimeCounter($(".time_box"), {
            format: "<span class='icon png'></span><span class='timer_d_sapn'> D<em>天</em></span><span class='timer_info_sapn'>HH<em>:</em>MM<em>:</em>SS</span>",
            dtime: 1e3,
            onStart: function () {
                this.$target.html(this.html)
            },
            onEnd: function () {
                this.$target.siblings().html(""), this.$target.html("已结束")
            }
        }), new Jumei.ui.Lazyload($(".ptb_30 img"), {effects: "fade"});
        window.GlobalBar.init(), $(".people .comments").length && $(".people").on("click", "a", function (t) {
            var a = $("#yhkb").offset().top, e = $("#anchorbar").height();
            $(window).scrollTop(a - e), t.preventDefault()
        });
        var t = $("#anchorbar");
        new Jumei.ui.Anchorbar(t, {height: 20}).on("fixedstart", function () {
            t.addClass("nav_bar_fixed").css({width: "100%", left: "0px"}), t.prev().hide()
        }).on("fixedend", function () {
            t.removeClass("nav_bar_fixed").css({width: "", left: ""})
        }), t.find("li").click(function (t) {
            var a = $(this).find("a").attr("href");
            if (!a) return !0;
            var e = $(a);
            if ("loaded" != e.attr("loaded")) {
                var i = e.find("textarea").val();
                e.attr("loaded", "loaded"), e.find("textarea").parent().html(i), e.find("textarea").css("visibility", "visible")
            }
            $(this).find("a").addClass("current"), $(this).siblings("li").find("a").removeClass("current")
        }), $("#anchorbarBuyBtn").on("click", function (t) {
            $(window).scrollTop($("#body").offset().top), t.preventDefault()
        });
        var a = document.createElement("script");
        a.type = "text/javascript", a.async = !0, a.src = ("https:" == document.location.protocol ? "https://" : "http://") + "v3.jiathis.com/code/jia.js?uid=1405939063755704";
        var e = document.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(a, e)
    })
}), define("static", ["static_cart", "static_btn", "static_price", "static_sku", "static_status", "static_ads", "static_category"], function (t, a, e) {
    "use strict";
    window.hideCookie = Jumei.util.cookie.get(String(JM.actGlobalHideKey)), window.hideStCookie = Jumei.util.cookie.get(String(JM.actGlobalDMHideKey));
    var i = t("static_cart"), s = t("static_btn"), r = t("static_price"), n = t("static_sku"), l = t("static_status"),
        o = t("static_ads");
    t("static_category");
    !function () {
        void 0 !== JM.actGlobalHideKey && "1" === window.hideCookie || "" === window.hideCookie && $.ajax({
            type: "GET",
            url: "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/api/locate",
            dataType: "jsonp",
            success: function (t) {
                1 === t && (window.hideCookie = 1), Jumei.util.cookie.set(String(JM.actGlobalHideKey), t, {exp: "8760"})
            }
        })
    }();
    !function () {
        JM.actGlobalDMHideKey && "" !== window.hideStCookie || $.ajax({
            type: "GET",
            url: "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/api/locate?tag=DM",
            dataType: "jsonp",
            success: function (t) {
                1 === t && (window.hideStCookie = 1), Jumei.util.cookie.set(String(JM.actGlobalDMHideKey), t, {exp: "8760"})
            }
        })
    }(), {
        init: function () {
            "preview" !== ($("#class_flag").val() || "") && this.getData()
        }, getData: function () {
            var t = this, a = JM.SITE_MAIN_WEBBASEURL + "ajax_new/";
            $("#hid_mallid").length ? a += "MallInfo?mall_id=" + $("#hid_mallid").val() : $("#hid_hashid").length && (a += "dealinfo?hash_id=" + $("#hid_hashid").val()), i.getData(a, function (a) {
                $("#sh_mark_price").hide(), void 0 !== a.status && 4 !== a.status || (window.location.href = JM.SITE_MAIN_WEBBASEURL + "global"), (isNaN(a.jumei_price) || isNaN(a.jumei_price) && 0 === a.is_published_price && 1 === a.button_type) && (window.wish = 1), r(a), n(a), s(a), l(a), t.initPage(), o(a), "1" == a.is_show_counter && ($("#add_cart").addClass("zhuangui").css("background", "#ccc"), alert("请到聚美app购买此商品"))
            })
        }, initPage: function () {
            $("#anchorbarBuyBtn").on("click", function (t) {
                $(window).scrollTop($("#body").offset().top), t.preventDefault()
            });
            new Jumei.ui.TimeCounter($(".time_box"), {
                format: "<span class='icon png'></span><span class='timer_d_sapn'> D<em>天</em></span><span class='timer_info_sapn'>HH<em>:</em>MM<em>:</em>SS</span>",
                dtime: 1e3,
                onStart: function () {
                    this.$target.html(this.html)
                },
                onEnd: function () {
                    this.$target.html("<span class='icon png'></span><span class='timer_d_sapn'> 0<em>天</em></span><span class='timer_info_sapn'>00<em>:</em>00<em>:</em>00</span>")
                }
            })
        }
    }.init()
}), define("detail", ["static", "detail_cont", "detail_bin", "detail_group", "detail_shop", "detail_list", "detail_wish", "detail_other", "module_praise"], function (t) {
    "use strict";
    t("static"), t("detail_cont"), t("detail_bin"), t("detail_group"), t("detail_shop"), t("detail_list"), t("detail_wish"), t("detail_other"), t("module_praise")
}), JM.DEBUG, seajs.use(["app", "detail"]);