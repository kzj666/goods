/* Date: 2018-04-03T15:52:13Z Path: js/app/app.js */
define("env", function (i, e, t) {
    var a = {
        ua: navigator.userAgent.toLowerCase(),
        browser: [["qq", "tencenttraveler "], ["ff", "firefox/"], ["ff", "minefield/"], ["ff", "shiretoko/"], ["opera", "opera/"], ["ie", "msie "], ["chrome", "chrome/"], ["safa", "safari/"], ["qq", "qqbrowser/"]],
        system: [["winxp", "windows nt 5.1"], ["win7", "windows nt 6.1"], ["win8", "windows nt 6.2"], ["vista", "windows nt 6.0"], ["mac", "mac"], ["wince", "windows ce"], ["wince", "windows phone"], ["android", "android"], ["ios", "ipad"], ["ios", "iphone"], ["symbian", "symbianos"], ["linux", "linux"]],
        getSys: function () {
            for (var i = this.system, e = this.ua, t = "", a = 0, n = i.length; a < n; a++) if (e.indexOf(i[a][1]) > -1) {
                t = i[a][0];
                break
            }
            return t
        },
        getBr: function () {
            for (var i = this.ua, e = this.browser, t = "other", a = 0, n = e.length; a < n; a++) if (i.indexOf(e[a][1]) > -1) {
                if ("ie" === (t = e[a][0])) {
                    var r = i.match(/msie ([\w]+)/);
                    r && (t += r[1])
                }
                break
            }
            return t
        },
        getDs: function () {
            return window.screen.width + "_" + window.screen.height
        }
    };
    t.exports = a
}), define("config", ["env"], function (i, e, t) {
    var a = i("env"), n = {}, r = window.location, s = document, o = {v: "1.0"};
    n.getCookie = function (i) {
        var e = new RegExp("(?:^| )" + i + "=([^;]*)(?:;|$)"), t = e.exec(s.cookie);
        return t ? unescape(t[1]) : ""
    }, n.setCookie = function (i, e, t) {
        t || (t = {});
        var a = new Date, n = window.location.hostname.split(".").slice(-2).join(".");
        "number" == typeof t.exp ? a.setTime(a.getTime() + 36e5 * t.exp) : "forever" === t.exp ? a.setFullYear(a.getFullYear() + 50) : null === e ? (e = "", a.setTime(a.getTime() - 36e5)) : a = t.exp instanceof Date ? t.exp : "", s.cookie = i + "=" + escape(e) + (a && "; expires=" + a.toGMTString()) + "; domain=" + (t.domain || n) + "; path=" + (t.path || "/") + (t.secure ? "; secure" : "")
    }, function () {
        var i = n.getCookie("uid"), e = n.getCookie("m_vid");
        i ? (o.uid = o.vid = i, n.setCookie("m_vid", i, {exp: "forever"})) : e ? (o.uid = -1, o.vid = e) : o.uid = o.vid = 0
    }(), o.mid = function () {
        var i = n.getCookie("cookie_uid");
        return i || (i = String((new Date).getTime()) + String(Math.random()).slice(-7), n.setCookie("cookie_uid", i, {exp: 87600})), i
    }(), o.url = decodeURIComponent(r.href), o.ref = s.referrer, o.st = n.getCookie("default_site_25") ? n.getCookie("default_site_25") : "0", o.ds = a.getDs(), o.sys = a.getSys(), o.br = a.getBr(), t.exports = o
}), define("inface", function (i) {
    function e(i, e) {
        return Object.prototype.hasOwnProperty.call(i, e)
    }

    function t(i) {
        if (e(i, "category") && e(i, "action")) {
            var t = {cg: i["category"], at: i["action"], lb: i["label"] || "", vl: i["value"] || "", et: "event"};
            return n._DATAS.push(t), t
        }
        return !1
    }

    function a(i, e, t, a) {
        var s = {et: "jserror", msg: i || "", file: e || "", line: t || 0, num: a || "", lost: r.join(",")};
        return n._DATAS.push(s), s
    }

    var n = window.monitor = {};
    n._DATAS = [];
    var r = [], s = {};
    n.lost = function (i) {
        s.hasOwnProperty(i) || (s[i] = !0, r.push(i))
    }, n.log = function (i, e) {
        if (i || e) {
            var a, r = e.length;
            switch (i) {
                case"custom":
                    if (r === +r) for (a = 0; a < r; a++) n.log("custom", e[a]); else e.et = "custom", n._DATAS.push(e);
                    break;
                case"event":
                    if (r === +r) for (a = 0; a < r; a++) n.log("event", e[a]); else t(e);
                    break;
                default:
                    throw new Error("Not support the data.")
            }
        }
    }, n.error = function (i) {
        if (i instanceof Error) return a(i.message || i.description, i.fileName, i.lineNumber || i.line, i.number)
    }, window.onerror = function (i, e, t) {
        return a(i, e, t), !1
    }
}), define("ibar_main.tpl", function () {
    return Handlebars.template({
        compiler: [6, ">= 2.0.0-beta.1"], main: function (i, e, t, a) {
            var n, r = e.helperMissing, s = "function", o = this.escapeExpression;
            return '<div class="ibar" id="iBar" style="z-index:' + o((n = null != (n = e.zIndex || (null != i ? i.zIndex : i)) ? n : r, typeof n === s ? n.call(i, {
                name: "zIndex",
                hash: {},
                data: a
            }) : n)) + ";height:" + o((n = null != (n = e.winHeight || (null != i ? i.winHeight : i)) ? n : r, typeof n === s ? n.call(i, {
                name: "winHeight",
                hash: {},
                data: a
            }) : n)) + 'px;"><div class="ibar_main_panel"><ul class="ibar_mp_center"><li class="mpbtn_login"><a href="http://passport.' + o((n = null != (n = e.domain || (null != i ? i.domain : i)) ? n : r, typeof n === s ? n.call(i, {
                name: "domain",
                hash: {},
                data: a
            }) : n)) + '/i/account/login"><s></s>登录</a></li><li class="mpbtn_cart"><a href="#" data-plugin="iBarCart"><s></s><span class="text">购物车</span><span class="cart_num">0</span></a></li><li class="mpbtn_asset"><a href="#" data-judgelogin="1" data-plugin="iBarAsset"><s></s>我的财产</a><div class="mp_tooltip">我的财产<s class="icon_arrow_right_black"></s></div></li><li class="mpbtn_favorite"><a href="#" data-judgelogin="1" data-plugin="iBarFavorite"><s></s>我的心愿单</a><div class="mp_tooltip">我的心愿单<s class="icon_arrow_right_black"></s></div></li><!-- <li class="mpbtn_histroy"><a href="#" data-plugin="iBarHistroy"><s></s>我看过的</a><div class="mp_tooltip">我看过的<s class="icon_arrow_right_black"></s></div></li> --><!-- <li class="mpbtn_recharge"><a href="#" data-plugin="iBarRecharge"><s></s><span class="text">充</span></a><div class="mp_tooltip">我要充值<s class="icon_arrow_right_black"></s></div></li> --></ul><ul class="ibar_mp_bottom"><li class="mpbtn_qrcode"><a href="#"><s></s>手机聚美</a><div class="mp_qrcode"><img src="http://p0.jmstatic.com/assets/placeholder.png" data-lazysrc="http://p0.jmstatic.com/assets/qrcode.png?v=2" width="148" height="175" /><s class="icon_arrow_white"></s></div></li><li class="mpbtn_support"><a href="#" data-plugin="iBarFaq"><s></s>客服中心</a><div class="mp_tooltip">客服中心<s class="icon_arrow_right_black"></s></div></li><li class="mpbtn_gotop" id="gotop"><a href="#" class="btn_gotop"><s></s>返回顶部</a><div class="mp_tooltip">返回顶部<s class="icon_arrow_right_black"></s></div></li></ul></div><div class="ibar_login_box  ' + o((n = null != (n = e.statusClassName || (null != i ? i.statusClassName : i)) ? n : r, typeof n === s ? n.call(i, {
                name: "statusClassName",
                hash: {},
                data: a
            }) : n)) + '"><div class="avatar_box"><p class="avatar_imgbox"><img src="' + o((n = null != (n = e.avatar || (null != i ? i.avatar : i)) ? n : r, typeof n === s ? n.call(i, {
                name: "avatar",
                hash: {},
                data: a
            }) : n)) + '" alt="头像" width="62" height="62" /></p>' + o((e.Helper_userinfo || i && i.Helper_userinfo || r).call(i, null != i ? i.userinfo : i, null != i ? i.domain : i, {
                name: "Helper_userinfo",
                hash: {},
                data: a
            })) + '\n        </div><div class="login_btnbox"><a href="http://www.' + o((n = null != (n = e.domain || (null != i ? i.domain : i)) ? n : r, typeof n === s ? n.call(i, {
                name: "domain",
                hash: {},
                data: a
            }) : n)) + '/i/order/list" class="login_order" target="_blank">我的订单</a><a href="http://www.' + o((n = null != (n = e.domain || (null != i ? i.domain : i)) ? n : r, typeof n === s ? n.call(i, {
                name: "domain",
                hash: {},
                data: a
            }) : n)) + '/i/product/fav_products" class="login_favorite" target="_blank">我的收藏</a></div><s class="icon_arrow_white"></s><a href="javascript:;" class="ibar_closebtn" title="关闭"></a></div><div class="ibar_sub_panel"><a href="javascript:;" class="ibar_closebtn" title="关闭"></a><span class="ibar_loading_text">正在为您努力加载数据！</span></div><div class="ibar_tips_box"></div></div>'
        }, useData: !0
    })
}), define("ibar-faq", function (i, e, t) {
    "use strict";
    var a,
        n = $('<div class="dialog_ser"><div class="faq_title"><span class="title">请您选择咨询类型</span><span class="close"><img class="close_ser" src=""></span></div><div class="faq_content" id="faq_content"></div></div>'),
        r = JM.IM_ISSWITCH, s = JM.IM_USERRATE, o = Math.round(100 * Math.random());
    a = 1 === Number(r) && o <= s ? JM.SITE_MAIN_TOPLEVELDOMAINNAME.indexOf("rd") > 0 ? "chatrd.jumeicd.com/" : "chat-im.jumei.com/" : "chat.jumei.com/custom";
    var l = {
        dialog: null,
        manager: function () {
            this.isNewEdition() && n.addClass("dialog_ser_new"), this.addContent(), this.show()
        },
        content: [{be: "售前咨询", fe: '<a href="http://' + a + '?groupid=155" target="faq_view">极速免税店咨询</a>'}, {
            be: "售后咨询",
            fe: '<a href="http://' + a + '?groupid=157" target="faq_view">配送服务</a><a href="http://' + a + '?groupid=158" target="faq_view">售后服务</a><a href="http://' + a + '?groupid=159" target="faq_view">产品问题</a>'
        }, {
            be: "投诉建议",
            fe: '<a href="http://' + a + '?groupid=162" target="faq_view">投诉快递</a><a href="http://' + a + '?groupid=165" target="faq_view">投诉产品</a><a href="http://' + a + '?groupid=116" target="faq_view">投诉客服</a><a href="http://' + a + '?groupid=117" target="faq_view">投诉其他</a>'
        }],
        newContent: [{
            be: "售前咨询",
            fe: '<a href="http://' + a + '?groupid=201" target="faq_view">服饰</a><a href="http://' + a + '?groupid=202" target="faq_view">化妆品</a><a href="http://' + a + '?groupid=203" target="faq_view">母婴</a><a href="http://' + a + '?groupid=204" target="faq_view">轻奢</a>'
        }, {
            be: "售后服务",
            fe: '<a href="http://' + a + '?groupid=206" target="faq_view">快递咨询</a><a href="http://' + a + '?groupid=207" target="faq_view">退货</a><div class="tou_child"><a href="javascript:;" class="tou_tit">产品问题</a><div id="tou_child_list" style="display:none"><a href="http://' + a + '?groupid=209" target="faq_view">服饰</a><a href="http://' + a + '?groupid=210" target="faq_view">化妆品</a><a href="http://' + a + '?groupid=211" target="faq_view">母婴</a><a href="http://' + a + '?groupid=212" target="faq_view">轻奢</a></div></div><p style=" height: 1px; line-height: 1px; margin: 0; clear: both"></p>'
        }],
        isNewEdition: function () {
            return (JM.SERVER_TIME || JM.CLIENT_TIME) >= 1435766400
        },
        show: function () {
            $("body").trigger("FaqEvent")
        },
        addContent: function () {
            for (var i = this.isNewEdition(), e = i ? this.newContent : this.content, t = e.length, r = "", s = this, o = 0; o < t; o++) r += '<li class="li_on"><div class="be">' + e[o].be + '</div><div class="fe clearfix">' + e[o].fe + "</div></li>";
            i && (r += '<li class="li_on_a"><a href="http://' + a + '?groupid=213" target="faq_view">会员服务</a></li><li class="li_on_a"><a href="http://' + a + '?groupid=214" target="faq_view">投诉建议</a></li>'), n.find("#faq_content").html(r), this.dialog = new Jumei.ui.Dialog("body", {
                elem: n,
                dragHandle: ".dialog_ser",
                overlayClose: !0,
                effects: "fade",
                trigger: "FaqEvent"
            }), this.dialog.on("open", function () {
                s.bindEvents()
            })
        },
        bindEvents: function () {
            navigator.userAgent.toLowerCase().match(/\b(ipad)\b/) ? this.ipadClick() : this.pcHover()
        },
        pcHover: function () {
            var i = $(".dialog_ser").find("li"), e = $(".dialog_ser").find(".close"), t = this.dialog;
            i.hover(function () {
                $(this).children(".be").hide(), $(this).addClass("li_on_hover").children(".fe").show()
            }, function () {
                $(this).children(".be").show(), $(this).removeClass("li_on_hover").children(".fe").hide(), $("#tou_child_list").hide()
            }), $(".tou_tit").click(function (i) {
                var e = $(this).siblings("div");
                "none" == e.css("display") ? e.show() : e.hide(), i.stopPropagation()
            }), n.find("a:not(.tou_tit)").on("click", function () {
                i.each(function () {
                    $(this).removeClass("li_on_hover"), $(this).children(".be").show(), $(this).children(".fe").hide()
                }), $("#tou_child_list").hide(), t.close()
            }), e.bind("click", function () {
                t.close()
            })
        },
        ipadClick: function () {
            var i = n.find("li"), e = n.find(".close"), t = this, a = this.isNewEdition(),
                r = a ? this.newContent : this.content, s = r.length, o = t.dialog;
            i.click(function (i) {
                var e = $(this).index();
                t.reset(), e < s && $(this).html(r[e].fe).addClass("li_on_hover")
            }), e.bind("click", function () {
                t.reset(), o.close()
            })
        },
        reset: function () {
            var i = this.isNewEdition(), e = i ? this.newContent : this.content, t = e.length;
            $(".dialog_ser").find("li").each(function (i, a) {
                i < t && $(this).html(e[i].be).removeClass("li_on_hover")
            })
        }
    };
    l.init = function () {
        null == l.dialog ? l.manager() : l.show()
    }, t.exports = l
}), define("ibar-history", function (i, e, t) {
    var a = {
        init: function (i) {
            var e = this;
            e.getHistoryData(function (t) {
                e.renderHtml(t, i.container), e.clearHistory(), e.addCart()
            })
        }, getHistoryData: function (i) {
            var e = "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/ajax/get_view_history?callback=?";
            $.getJSON(e, null, function (e) {
                i.call(this, e)
            })
        }, renderHtml: function (i, e) {
            var t = [];
            if (t.push('<div class="ibar-moudle-wrap ibar_plugin" id="iBarHistroy">'), t.push('<h2 class="ibar_plugin_title"><span class="ibar_plugin_name">最近查看</span></h2>'), t.push('<div class="ibar_plugin_content">'), i && i.length > 0) {
                t.push('<div class="ibar-history-head">共' + i.length + '件商品<a href="javascript:;" id="ibar-btn-clearhistory">清空</a></div>'), t.push('<div class="ibar-moudle-product">');
                for (var a in i) {
                    var n = i[a], r = n.short_name, s = n.type, o = n.deal_hash_id || "", l = n.product_id || "",
                        c = n.url, d = n.image_100, p = (n.buyer_number, n.discounted_price),
                        u = (n.discount, "deal" == s ? o : l), h = "deal" == s ? "deal" : "product";
                    t.push('<div class="imp_item"><a href="' + c + '?from=ibar_view_recent_product" title="' + r + '" target="_blank" class="pic">'), t.push('<img src="' + d + '" width="100" height="100"/></a><p class="tit"><a href="' + c + '?from=ibar_view_recent_product" title="' + r + '" target="_blank">'), t.push(r + '</a></p><p class="price"><em>¥</em>' + p + "</p>"), t.push('<a href="javascript:;" target="_blnak" class="imp-addCart" key="' + u + '" type="' + h + '" img="' + d + '">加入购物车</a>'), t.push('<div class="sku_box"><select class="sku_select"><option value="0">型号选择</option></select></div></div>')
                }
                t.push("</div>")
            } else t.push('<div class="ibar-his-none">您最近没有浏览过小美家商品<br/>亲，快去逛逛吧！</div>');
            t.push("</div>"), t.push("</div>"), e.append(t.join(""))
        }, clearHistory: function () {
            $("#ibar-btn-clearhistory").bind("click", function () {
                $.getJSON("http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/deal/ajax_delete_history?callback=?", null, function () {
                    $("#iBarHistroy .ibar_plugin_content").html('<div class="ibar-his-none">您最近没有浏览过小美家商品<br/>亲，快去逛逛吧！</div>')
                })
            })
        }, getSku: function (i, e) {
            var t = "http://www." + JM.CURRENT_SITE_MAIN_WEBBASEURL + "/i/ajax/get_sku_data";
            $.ajax({
                url: t, data: i, type: "get", dataType: "jsonp", success: function (i) {
                    e.call(this, $.parseJSON(i))
                }
            })
        }, addCart: function () {
            var i = this;
            $(".imp-addCart").click(function () {
                var e = $(this), t = e.attr("key"), a = e.attr("type"), n = e.attr("img"),
                    r = e.next().find(".sku_select"), s = "";
                return i.getSku({id: t, type: a}, function (i) {
                    var o = i.length, l = {
                        elem: null,
                        img: n,
                        sku: null,
                        hashid: "product" == a ? "" : t,
                        num: 1,
                        from: window.getUrlArgs("from") + "|ibar_view_recent_cart_button"
                    };
                    if (1 == o) {
                        if (0 === i[0].sku_sellable) return void e.html("已抢光").addClass("sold_out");
                        l.elem = e, l.sku = i[0].sku_no, Jumei.app.iBar.addCart(l)
                    } else {
                        for (var c in i) i[c].sku_sellable > 0 && (s += '<option value="' + i[c].sku_no + '">' + i[c].sku_attribute + "</option>");
                        "" !== s ? (e.hide(), r.append(s).show()) : e.addClass("sold_out").html("已抢光"), r.change(function () {
                            var i = $(this).val();
                            0 !== i && (l.elem = r, l.sku = i, Jumei.app.iBar.addCart(l))
                        })
                    }
                }), !1
            })
        }
    };
    t.exports = a
}), define("ibar-favorite", function (i, e, t) {
    function a(i) {
        var e, t = i.onSale, a = i.willSale, n = [];
        if (n.push('<div class="ibar-moudle-wrap ibar_plugin" id="iBarFavorite">'), n.push('<h2 class="ibar_plugin_title"><span class="ibar_plugin_name">今日疯抢</span></h2>'), n.push('<div class="ibar_plugin_content">'), t && t.length) {
            n.push('<div class="ibar-moudle-product">');
            for (e in t) {
                var r = t[e].discount > 9.5 ? "" : "<span>" + t[e].discount + "折/</span>", s = "",
                    o = r + t[e].deal_name + "</a>";
                if (t[e] && t[e].sub_items && t[e].sub_items.length > 1) {
                    var l = t[e].sub_items[0], c = t[e].sub_items[1],
                        d = c.sku_no + "-" + c.hash_id + "^" + l.sku_no + "-" + l.hash_id, p = {url: t[e].url};
                    $.extend(t[e], c, p), s = "cb," + t[e].group_id + "," + d + ",1", o = t[e].deal_name + "</a>"
                }
                n.push('<div class="imp_item"><a href="' + t[e].url + '?from=ibar_mywish_onsale" title="' + t[e].deal_name + '" target="_blank" class="pic">'), n.push('<img src="' + t[e].pic + '" width="100" height="100"/></a>'), n.push('<p class="tit"><a href="' + t[e].url + '?from=ibar_mywish_onsale" title="' + t[e].deal_name + '" target="_blank">'), n.push(o), n.push('</p><p class="price"><em>¥</em>' + t[e].discounted_price + "<del>¥" + t[e].original_price + "</del></p>"), s ? n.push('<a href="javascript:;" class="imp-addCart" combt="' + s + '" img="' + t[e].pic + '">加入购物车</a>') : n.push('<a href="javascript:;" class="imp-addCart" sku="' + t[e].sku_no + '" hashid="' + t[e].hash_id + '" img="' + t[e].pic + '">加入购物车</a>'), n.push("</div>")
            }
            n.push("</div>")
        } else a.length ? n.push('<div class="ibar-nothing"><div class="txt">您没有在售中的<br/><span>心愿商品喔！</span></div></div>') : n.push('<div class="ibar-nothing"><div class="txt">您的心愿单没商品<br/><span>快去添加吧</span></div></div>');
        if (t.length || a.length) {
            if (n.push('<div class="ibar-moudle-product soon">'), n.push("<h2>即将开抢</h2>"), a.length) for (e in a) {
                if (a[e] && a[e].sub_items) {
                    var u = a[e].sub_items.length, h = a[e].sub_items[u - 1], _ = {url: a[e].url};
                    $.extend(a[e], h, _)
                }
                var f = 0 === a[e].is_published_price ? "??" : a[e].discounted_price;
                n.push('<div class="imp_item">'), n.push('<div class="imp-starttime">' + a[e].start_time + "开抢</div>"), n.push('<a href="' + a[e].url + '?from=ibar_mywish_willsale" title="' + a[e].deal_name + '"  target="_blank" class="pic">'), n.push('<img src="' + a[e].pic + '" width="100" height="100"/></a><p class="tit"><a href="' + a[e].url + '?from=ibar_mywish_willsale" title="' + a[e].deal_name + '" target="_blank">' + a[e].deal_name + "</a>"), n.push('<p class="wish-num">已有' + a[e].wish_number + "人许愿</p>"), n.push('</p><p class="price"><em>¥</em>' + f + "<del>¥" + a[e].original_price + "</del></p>"), n.push("</div>")
            } else n.push('<div class="ibar-nothing"><div class="txt">没有即将开抢的<br/><span>心愿商品喔！</span></div></div></div>');
            n.push("</div>")
        }
        return n.push("</div></div>"), n.join("")
    }

    var n = {
        init: function (i) {
            $.getJSON("http://i." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/ajax/sidebar_wishdeal?callback=?", null, function (e) {
                var t = a(e);
                i.container.append(t), $(".imp-addCart").click(function (i) {
                    var e = $(this).attr("sku"), t = $(this).attr("hashid"), a = $(this).attr("combt"),
                        n = $(this).attr("img"), r = {};
                    r = a ? {combt: a} : {sku: e, hashid: t};
                    var s = $.extend({}, {elem: $(this), img: n, from: "ibar_addcart", num: 1, which_cart: "all"}, r);
                    Jumei.app.iBar.addCart(s)
                })
            })
        }
    };
    t.exports = n
}), define("ibar-asset", function (i, e, t) {
    function a(i) {
        var e, t = [], a = i.red_envelope_count, n = i.promocards_count, r = i.account, s = i.red_envelope_list,
            o = i.promocards_list;
        if (t.push('<div class="ibar-Asset-wrap ibar-moudle-wrap ibar_plugin" id="iBarAsset">'), t.push('<h2 class="ibar_plugin_title"><span class="ibar_plugin_name">我的财产</span></h2>'), t.push('<div class="ibar_plugin_content">'), t.push('<div class="ia-head-list clearfix">'), t.push('<a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/membership/show_promocards?from=ibar_property_xianjinquan" target="_blank" class="ihl-quan fl"><div class="num">' + n + '</div><div class="text">现金券</div></a>'), t.push('<a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/membership/show_red_envelope?from=ibar_property_hongbao"  target="_blank" class="ihl-hg fl"><div class="num">' + a + '</div><div class="text">红包</div></a>'), t.push('<a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/account/balance?from=ibar_property_yue" target="_blank" class="ihl-money fl"><div class="num">¥' + r + '</div><div class="text">余额</div></div>'), t.push("</a>"), t.push('<div class="ga-expiredsoon">'), t.push('<div class="es-head">即将过期现金券</div>'), o && o.length) {
            t.push('<div class="ia-coupon-list">');
            for (e in o) t.push('<div class="icl-item">'), t.push('<p class="name">' + o[e].title + "</p>"), t.push('<div class="clearfix"><span class="sale fl">' + o[e].satisfied + '</span><span class="pri fr"><em>¥</em>' + o[e].amount + "</span></div>"), t.push('<p class="exprietime">过期时间  ' + o[e].expire_time + "</span></p>"), t.push("</div>");
            o.length > 2 && t.push('<a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/membership/show_promocards?from=ibar_property_xianjinquan_more" target="_blank" class="ga-view-more">查看更多</a>'), t.push("</div>")
        } else t.push('<div class="ia-none">您还没有可用的现金券哦！</div>');
        if (t.push("</div>"), t.push('<div class="ga-expiredsoon">'), t.push('<div class="es-head">即将过期红包</div>'), s && s.length) {
            t.push('<div class="ga-hongbao-list">');
            for (e in s) t.push('<div class="ihl-item">'), t.push('<div class="pri"><em>¥</em>' + s[e].amount + "</span></div>"), t.push('<p class="info">' + s[e].satisfied + "</p>"), t.push('<p class="exprietime">过期时间  ' + s[e].expire_time + "</p>"), t.push("</div>");
            s.length > 2 && t.push('<a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/membership/show_red_envelope?from=ibar_property_hongbao_more" target="_blank" class="ga-view-more">查看更多</a>'), t.push("</div>")
        } else t.push('<div class="ia-none">您还没有可用的红包哦！</div>');
        return t.push("</div>"), t.push("</div></div>"), t.join("")
    }

    var n = {
        init: function (i) {
            $.getJSON("http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/ajax/sidebar_property?callback=?", null, function (e) {
                var t = a(e);
                i.container.append(t)
            })
        }
    };
    t.exports = n
}), define("ibar-cart", function (i, e, t) {
    var a = function (i, e, t) {
            for (var a = 0, n = i, r = 0; r < i.length; r++) if (i.charCodeAt(r) > 256 ? a += 2 : a++, a > e) {
                n = i.slice(0, r) + (t || "…");
                break
            }
            return n
        }, n = {product: "聚美优品", media: "名品特卖", global: {name: "海外直邮", group: !0}, promo_cards: "聚美红包"},
        r = ["product", "media", "global", "promo_cards"], s = function (i, e) {
            var t = null, a = null;
            for (var n in r) {
                if (i === r[n]) return t;
                a = e.find(".ibar_cart_" + r[n]), a.length > 1 ? t = $(a[a.length - 1]) : 1 == a.length && (t = a)
            }
        }, o = function (i) {
            var e = n[i], t = typeof e;
            return "string" === t ? e : "object" === t ? e.name : null
        }, l = function (i) {
            var e = n[i], t = typeof e;
            return "string" !== t && !("object" !== t || !e.group)
        }, c = 0, d = function (i) {
            var e, t, a, n, r, s, o = null;
            return t = parseInt(1e3 * i), t > 0 && (e = parseInt(t / 864e5).toString(), e = e.length > 1 ? e : "0" + e, t %= 864e5, a = parseInt(t / 36e5).toString(), a = a.length > 1 ? a : "0" + a, t %= 36e5, n = parseInt(t / 6e4).toString(), n = n.length > 1 ? n : "0" + n, r = parseInt(t % 6e4 / 100), t = parseInt(r / 10), s = r - 10 * t, t = t.toString().length > 1 ? t : "0" + t, o = {
                minute: n,
                second: t,
                milisec: s
            }), o
        }, p = {
            frame: "<div class='ibar_plugin ibar_cart_content'><div class='ibar_plugin_title'><span class='ibar_plugin_name'>购物车<span class='ibar_cart_timer'></span></span></div><div class='ibar_plugin_content'><div class='ibar_cart_group_container'></div><div class='ibar_cart_handler'><div class='ibar_cart_handler_header clearfix'><span class='ibar_cart_handler_header_left'>共 <span class='ibar_cart_total_quantity ibar_pink'>0</span> 件商品</span><span class='ibar_cart_total_price ibar_pink'></span></div><a class='ibar_cart_go_btn' href='http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/cart/show?from=ibar_cart_button' target='_blank'>去购物车结算</a></div></div></div>",
            dealItem: "<li class='ibar_cart_item clearfix'><div class='ibar_cart_item_pic'><a target='_blank'><img src='' alt=''><span class='ibar_cart_item_tag png'></span></a></div><div class='ibar_cart_item_desc'><span class='ibar_cart_item_name_wrapper'><span class='ibar_cart_item_global'>[极速免税店]</span><a class='ibar_cart_item_name' target='_blank'></a></span><div class='ibar_cart_item_sku ibar_text_ellipsis'><span></span></div><div class='ibar_cart_item_price ibar_pink'><span class='unit_price'></span><span class='unit_plus'> x </span><span class='ibar_cart_item_count'></span></div></div></li>",
            cbitems: "<li class='ibar_cart_cbitems ibar_cart_item'><ul class='clearfix ibar_cart_cbitems_content'></ul><div class='ibar_cart_item_price'><span class='ibar_cb_tips'>组合购买价</span><span class='unit_price ibar_pink'></span><span class='unit_plus'> x </span><span class='ibar_cart_item_count'></span></div></li>",
            cartGroup: "<div class='ibar_cart_group'><div class='ibar_cart_group_header clearfix'><span class='ibar_cart_group_title'></span><span class='ibar_cart_group_shop ibar_text_ellipsis'></span><span class='ibar_cart_group_baoyou ibar_pink'></span></div><ul class='ibar_cart_group_items'></ul></div>",
            loadingText: "<p class='ibar_cart_loading_text'>正在为您努力地加载数据！</p>"
        }, u = function (i) {
            this.element = {}, this.id = i.id || this.id, this.draw(i.container), this.fixIE(), this.initTimer(), this.render(), this.bindEvents()
        };
    u.prototype = {
        id: "iBarCart", draw: function (i) {
            var e = $(p.frame).attr("id", this.id);
            this.element.root = e, this.element.groupContainer = e.find(".ibar_cart_group_container"), this.element.cartTimer = e.find(".ibar_cart_timer"), this.element.handlebar = e.find(".ibar_cart_handler"), this.element.handlebarQuanity = e.find(".ibar_cart_total_quantity"), this.element.handlebarPrice = e.find(".ibar_cart_total_price"), $(i).append(e)
        }, fixIE: function () {
            !!~navigator.userAgent.toLowerCase().indexOf("msie 6.0") && ($(".ibar_cart_group_container").css({height: document.documentElement.clientHeight - 140 + "px"}), this.element.groupContainer.hover(function () {
                $(this).addClass("ibar_cart_group_container_hover_ie6")
            }, function () {
                $(this).removeClass("ibar_cart_group_container_hover_ie6")
            }))
        }, bindEvents: function () {
            var i = this, e = $("#iBar");
            Jumei.app && Jumei.app.iBar && Jumei.app.iBar.cartUpdate(function () {
                i.render()
            }), e.bind("afterreopenplugin", function (e, t) {
                "iBarCart" === t && i.fixHandlerPos()
            })
        }, render: function () {
            this.clear(), this.toggleCartState("loading"), this.getAjaxData({
                _ajax_: 1,
                which_cart: "all"
            }, function (i) {
                Jumei.app && Jumei.app.iBar && Jumei.app.iBar.cartNumberUpdate(i.quantity || 0), i.quantity > 0 ? (this.toggleCartState("show"), this.refreshTimer(i.etime), this.renderGroups(i, this.element.groupContainer), this.refreshHandler(i), this.fixHandlerPos()) : this.toggleCartState("empty")
            }, this)
        }, fixHandlerPos: function () {
            var i, e = this.element, t = e.root.find(".ibar_plugin_content").outerHeight(),
                a = e.handlebar.outerHeight();
            e.groupContainer.css({position: "static"}), i = e.groupContainer.outerHeight(), i + a < t ? (e.groupContainer.css({position: "relative"}), e.handlebar.removeClass("ibar_cart_handler_fixed").addClass("ibar_cart_handler_attached").css({top: i})) : (e.groupContainer.css({position: "absolute"}), e.handlebar.removeClass("ibar_cart_handler_attached").addClass("ibar_cart_handler_fixed").css({top: "auto"}))
        }, toggleCartState: function (i) {
            "empty" === i ? (this.element.groupContainer.addClass("ibar_cart_empty").removeClass("ibar_cart_loding"), this.element.handlebar.hide(), this.element.cartTimer.hide()) : "show" === i ? (this.element.groupContainer.removeClass("ibar_cart_empty").removeClass("ibar_cart_loding"), this.element.handlebar.show(), this.element.cartTimer.show()) : "loading" === i && (this.element.groupContainer.addClass("ibar_cart_loding").append($(p.loadingText)), this.element.handlebar.hide(), this.element.cartTimer.hide())
        }, clear: function (i) {
            this.element.handlebarQuanity.text(0), this.element.handlebarPrice.text("￥0"), this.element.groupContainer.empty()
        }, initTimer: function (i) {
            var e = this, t = this.cartTimerInterval = function () {
                c -= .1;
                var i = d(c);
                i ? e.renderTimer(i.minute, i.second, i.milisec, c) : e.renderTimer(0, 0, 0, c)
            };
            setInterval(t, 100)
        }, renderTimer: function (i, e, t, a) {
            var n = "";
            (n = a > 0 ? "<span class='ibar_pink'>" + i + "分" + e + "." + t + "秒</span>后清空" : "已超时，请尽快结算") && this.element.cartTimer.html(n)
        }, refreshTimer: function (i, e) {
            !e && window.global_cart_count && (window.global_cart_count = i), c = i
        }, refreshHandler: function (i) {
            i && (this.element.handlebarQuanity.text(i.quantity), this.element.handlebarPrice.text("￥" + Number(i.total_amount)))
        }, renderItem: function (i, e) {
            if (i) {
                var t = $(p.dealItem), n = a(i.short_name, 32);
                if ("retail_global" === i.item_category && t.find(".ibar_cart_item_global").css({display: "inline"}), String.prototype.indexOf.call(i.url, "?") === -1 ? i.url = i.url + "?from=ibar_cart" : i.url = i.url + "&from=ibar_cart", t.find(".ibar_cart_item_pic a,.ibar_cart_item_name").attr({
                    title: i.short_name,
                    href: i.url
                }), t.find(".ibar_cart_item_name").html(n), t.find(".ibar_cart_item_pic img").attr({
                    alt: i.short_name,
                    src: i.image_100
                }), i.attribute || i.capacity) {
                    var r = i.attribute + (i.capacity ? " " + i.capacity : "");
                    t.find(".ibar_cart_item_sku span").text("型号：" + r).attr("title", r)
                }
                t.find(".ibar_cart_item_price .unit_price").html("<em>￥</em>" + parseFloat(i.item_discount_price)), t.find(".ibar_cart_item_count").text(i.quantity), i.sale_status && t.find(".ibar_cart_item_tag").addClass("ibar_cart_item_tag_active ibar_cart_item_tag_soldout"), e.append(t)
            }
        }, renderGroups: function (i, e) {
            if (i) for (var t in i) {
                var a = l(t);
                if (o(t)) if (a === !0) for (var n in i[t]) this.renderGroup(t, i[t][n], e); else a === !1 && this.renderGroup(t, i[t], e)
            }
        }, renderGroupBySeq: function (i, e, t) {
            var a = s(e, t);
            a ? a.after(i) : t.prepend(i)
        }, renderGroup: function (i, e, t) {
            if (e && e.items && e.items.length) {
                var a = $(p.cartGroup).addClass("ibar_cart_" + i);
                a.find(".ibar_cart_group_title").text(o(i)), a.find(".ibar_cart_group_baoyou").html(e.delivery_fee_desc), e.name && a.find(".ibar_cart_group_shop").text(e.name).attr("title", e.name + " 发货");
                var n = a.find(".ibar_cart_group_items");
                for (var r in e.items) e.items[r].is_cb ? this.renderCbGroup(n, e.items[r]) : this.renderItem(e.items[r], n);
                this.renderGroupBySeq(a, i, t)
            }
        }, renderCbGroup: function (i, e) {
            var t = null, a = $(p.cbitems);
            a.find(".ibar_cart_item_price .unit_price").text("￥" + Number(e.item_price)), a.find(".ibar_cart_item_count").text(e.quantity), e.sale_status && a.find(".ibar_cart_cbitems").addClass("ibar_cart_gb_gray"), t = a.find(".ibar_cart_cbitems_content");
            for (var n = 0, r = e.sub_items.length; n < r; n++) this.renderItem(e.sub_items[n], t);
            i.append(a)
        }, getAjaxData: function (i, e, t) {
            $.getJSON("http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/ajax/get_cart_data_right?callback=?", i, function (i) {
                i && e.call(t || this, i)
            })
        }
    };
    var h = null;
    u.init = function (i) {
        return null == h && (h = new u(i)), h
    }, t.exports = u
}), define("ibar-recharge", function (i, e, t) {
    var a = function (i) {
            function e() {
                O.find(".gateway_list>li").click(function () {
                    var i = $(this), e = i.find(">input");
                    e.attr("disabled") !== !1 || i.hasClass("weihu") || (e.attr("checked", !0), i.siblings("li").removeClass("ul_on").addClass("ul_off").find(">input").attr("checked", !1), i.removeClass("ul_off").addClass("ul_on"))
                })
            }

            function t() {
                var i = oi.find(".bank-ul").find("li"), e = oi.find(".g-ul").find("li"), t = oi.find(".more-gate"),
                    a = i.filter(":gt(7)").hide();
                a.length ? t.bind("click", function () {
                    t.hasClass("shrink") ? (a.hide(), t.removeClass("shrink")) : (t.addClass("shrink"), a.show())
                }) : t.hide(), e.bind("click", function () {
                    var i = $(this);
                    i.hasClass("selected") || (e.not(i).removeClass("selected"), i.addClass("selected").find("input").trigger("click")), !S && T()
                })
            }

            function a() {
                if (!j) {
                    var i = R;
                    z.bind("focus", function () {
                        $.trim(z.val()) == i && z.val("").removeClass("color-hook")
                    }).bind("blur", function () {
                        $.trim(z.val()) || z.val(i).addClass("color-hook")
                    }).triggerHandler("blur")
                }
            }

            function n() {
                var i = R;
                z.bind("focus", function () {
                    var e = $.trim(z.val());
                    e && e != i && (w(U).show(), F ? (_(W, e), W.filter(":visible").length || U.addClass("show-zi").find(".zoom-in").text(e)) : U.addClass("show-zi").find(".zoom-in").text(e))
                }), z.bind("click", function (i) {
                    i.stopPropagation(), $(this).val() || O.find(".ibar_recharge-contact").trigger("click")
                })
            }

            function r() {
                O.find(".ibar_recharge-contact").bind("click", function (i) {
                    i.stopPropagation(), w(U).show(), F ? W.text(function (i, e) {
                        return e
                    }).show() : U.addClass("show-nh")
                })
            }

            function s() {
                V.delegate("li", "click", function () {
                    var i = $(this), e = $.trim(i.text());
                    z.val(e).removeClass("color-hook"), W.not(i).removeClass("selected"), i.addClass("selected"), U.hide(), m(e) && (k(), !S && T())
                })
            }

            function o() {
                var i = parseInt($.trim(P.text()), 10);
                H.each(function (e, t) {
                    var a = $(t), n = parseInt($.trim(a.find("span").text()), 10);
                    if (i == n) return a.addClass("selected"), !1
                })
            }

            function l() {
                function i(i) {
                    if (i.stopPropagation(), !H.length) return !S && T("请检查手机号填写是否正确。"), !1;
                    q.is(":visible") ? q.hide() : q.show()
                }

                J.bind("click", i), S && $(".ibar_recharge-arrow").bind("click", i), q.delegate("li", "click", function () {
                    var i = $(this), e = $.trim(i.find("span").text());
                    i.hasClass("selected") || (i.addClass("selected"), H.not(i).removeClass("selected"), P.text(e)), m(z.val()) ? k() : Q.text(pi[e] || pi[parseInt(e, 10)]), q.hide()
                })
            }

            function c() {
                $(document).bind("click", function () {
                    U.hide(), q.hide()
                })
            }

            function d(i, e) {
                e !== L ? (U.addClass("show-zi").show(), e > 0 ? U.find(".zoom-in").text(i) : U.hide().removeClass("show-zi"), 13 === e ? m(i) ? (k(), !S && T(), x(!0), setTimeout(function () {
                    U.fadeOut()
                }, 300)) : (U.removeClass("show-zi").addClass("show-pe"), x(!1)) : (x(S), U.removeClass("show-pe")), L = e) : U.hide()
            }

            function p(i, e, t, a) {
                t.preventDefault();
                var n = W, r = t.keyCode, s = n.filter(".selected"), o = n.filter(":visible");
                switch (r) {
                    case 13:
                        return a.val($.trim(s.text())), U.hide(), k(), !S && T(), void 0;
                    case 38:
                        return void u(o, s);
                    case 40:
                        return void h(o, s)
                }
                U.show(), _(n, i), 13 === e ? m(i) ? (k(), !S && T(), x(!0), setTimeout(function () {
                    U.fadeOut()
                }, 300)) : (U.removeClass("show-zi").addClass("show-pe"), x(!1)) : (x(S), U.removeClass("show-pe")), o = n.filter(":visible"), o.length ? U.removeClass("show-zi") : (L == e && (L = 0), d(i, e))
            }

            function u(i, e) {
                var t = i.length;
                if (t) {
                    var a = i.index(e);
                    a = a <= 0 ? t - 1 : a - 1, e.removeClass("selected"), i.eq(a).addClass("selected")
                }
            }

            function h(i, e) {
                var t = i.length;
                if (t) {
                    var a = i.index(e);
                    a = a == t - 1 || a < 0 ? 0 : a + 1, e.removeClass("selected"), i.eq(a).addClass("selected")
                }
            }

            function _(i, e) {
                i.each(function (i, t) {
                    var a = $(t), n = a.text();
                    n.startWith(e) ? a.html(f(e, n)).show() : a.hide()
                })
            }

            function f(i, e) {
                return e.replace(i, '<span class="ibar_pink">' + i + "</span>")
            }

            function m(i) {
                return K.test(i) || X.test(i)
            }

            function v() {
                z.bind("keypress", function (i) {
                    var e = i.keyCode, t = $(this), a = t.val().length;
                    if (!/\d/.test(String.fromCharCode(e)) && e > 9 && !i.ctrlKey) return void i.preventDefault();
                    3 !== a && 8 !== a || 8 == e || t.val(function (i, e) {
                        return e + "-"
                    })
                }), z.bind("keyup", function (i) {
                    var e = $(this), t = e.val(), a = t.length, n = "";
                    w(U), 11 == a && (n = g(t)) && (e.val(n), t = n, a = n.length), F ? p(t, a, i, e) : d(t, a)
                })
            }

            function g(i) {
                if (Z.test(i)) {
                    var e = i.split("");
                    return e.splice(3, 0, "-"), e.splice(8, 0, "-"), e.join("")
                }
                return ""
            }

            function b(i) {
                if (w(U), void 0 !== i) {
                    i = $.trim(i);
                    var e = m(i);
                    return i.length ? e || (U.addClass("show-pe").show(), z.focus()) : (U.addClass("show-np").show(), z.focus()), e
                }
                return !1
            }

            function w(i) {
                return i.removeClass("show-np show-pe show-zi show-nh")
            }

            function x(i) {
                i ? B.attr("disabled", !1).removeClass("disabled") : B.attr("disabled", !0).addClass("disabled")
            }

            function y() {
                return !!li.filter(":checked").length
            }

            function k() {
                var i = $.trim(z.val()).replace(/-/g, ""), e = $.trim(P.text());
                if (D == i && ci) return x(!0), void C(ci, e);
                D = i, $.ajax({
                    url: ii, data: {hp: i}, dataType: ei, success: function (t) {
                        if (t && t[i]) {
                            t = t[i], pi = {};
                            var a = t.sku_list, n = [], r = null, s = null;
                            if (ci = a, Y.text(t.hp_info.province_name + t.hp_info.trade), ri.val(t.hp_info.province_name + t.hp_info.trade), si.val(t.hp_info.mall_id), a) {
                                G.removeClass("show-so"), x(!0);
                                for (var o in a) {
                                    var l = a[o];
                                    pi[l.market_price] = l.customers_price, n.push(parseInt(l.market_price, 10)), parseInt(l.market_price, 10) == parseInt(e, 10) && (r = l), s = l
                                }
                                r || (r = s, P.text(r.market_price)), ti.val(r.sku_no), ai.val(r.customers_price), ni.val(r.market_price), Q.text(r.customers_price), E(n)
                            } else G.addClass("show-so"), x(!1)
                        } else x(!1)
                    }, error: function () {
                    }
                })
            }

            function C(i, e) {
                for (var t in i) {
                    var a = i[t];
                    parseInt(a.market_price, 10) == parseInt(e, 10) && (ti.val(a.sku_no), ai.val(a.customers_price), ni.val(a.market_price), Q.text(a.customers_price))
                }
            }

            function E(i) {
                i = I(i);
                var e = i.length, t = "", a = -1;
                if (e > 1) {
                    t += "<ul>", a = Math.ceil(e / 2) - 1;
                    for (var n = 0; n < e; n++) t += "<li><span>" + i[n] + "</span>元</li>", n == a && (t += '</ul><ul class="last-ul">');
                    t += "</ul>"
                } else 1 == e ? t += '<ul class="last-ul"><li><span>' + i[0] + "</span>元</li></ul>" : t = "暂无数据";
                H = q.html(t).find("li"), o()
            }

            function I(i) {
                var e = i.length, t = [], a = [], n = 0;
                if (e > 1) {
                    for (; n < e; n++) {
                        var r = parseInt(i[n], 10);
                        r < 100 ? a.push(r) : t.push(r)
                    }
                    i = t.concat(a)
                }
                return i
            }

            function M() {
                m(z.val()) || x(!1)
            }

            function T(i) {
                i ? di.show().find("p").html(i)[0].scrollIntoView() : di.hide()
            }

            function A(i) {
                var e = [], t = {};
                if (document.cookie && "" !== document.cookie) {
                    for (var a = document.cookie.split(";"), n = a.length, r = 0; r < n; r++) {
                        var s = $.trim(a[r]);
                        s.indexOf(i) > -1 && (t[s.split("=")[1]] = !0)
                    }
                    for (var o in t) e.push(o);
                    e = e.reverse(), e.length > 10 && (e.length = 10)
                }
                return e
            }

            function N() {
                var i = A("mobile_history"), e = i.length, t = [];
                if (e) {
                    for (var a = 0; a < e; a++) t.push("<li>" + g(i[a]) + "</li>");
                    V.html(t.join("")), W = V.find("li"), F = !!W.length
                }
            }

            i = i || {};
            var S = !1, j = "placeholder" in document.createElement("input"),
                O = i.form ? $(i.form) : $("#ibar_recharge-form"), B = O.find(":submit"), J = O.find(".ibar_recharge-mod"),
                L = 0, D = "", q = O.find(".ibar_recharge-vbox"), P = O.find(".ibar_recharge-val"), H = q.find("li"),
                z = O.find(".ibar_recharge-input").find("input"), R = z.attr("placeholder"),
                U = O.find(".ibar_recharge-tooltip"), V = U.find(".phone-list"), W = V.find("li"), F = !!W.length,
                G = O.find(".sell-status"), Q = G.find(".ibar_recharge-price"), Y = O.find(".ibar_recharge-operator"),
                K = /^1[3-8]\d{1}-\d{4}-\d{4}$/, X = /^1[3-8]\d{9}$/, Z = /^\d{11}$/, ii = "/m/ajax/get_info_skus/",
                ei = "json", ti = O.find('input[name="sku_no[]"]'), ai = O.find('input[name="customers_price[]"]'),
                ni = O.find('input[name="market_price[]"]'), ri = O.find('input[name="province[]"]'),
                si = O.find('input[name="mall_id[]"]'), oi = O.find(".ibar_recharge-gateway"),
                li = oi.find('input[name="gateway"]'), ci = null, di = O.find(".notification"),
                pi = i.priceMap || window.priceMap;
            O.submit(function () {
                return !!b(z.val()) && (S || y() ? void 0 : (T("请选择支付方式。"), !1))
            }), String.prototype.startWith = function (i) {
                return 0 === this.indexOf(i)
            }, {
                init: function (i) {
                    i && (S = i.home), S ? (N(), ii = "//cart.jumei.com" + ii + "?_ajax_=1", ei = "jsonp", ti = O.find('input[name="sku_no"]'), ai = O.find('input[name="customers_price"]'), ni = O.find('input[name="market_price"]'), ri = O.find('input[name="province"]'), si = O.find('input[name="mall_id"]')) : (t(), e(), M()), c(), o(), r(), a(), n(), s(), l(), v()
                }
            }.init({home: i.home})
        },
        n = {frame: "<div class='ibar_plugin ibar_recharge_content'><div class='ibar_plugin_title'><span class='ibar_plugin_name'>手机充话费</span></div><div class='ibar_plugin_content'><form action='//cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/m/forward/' target='_blank' method='get' class='ibar_recharge_form '><div class='ibar_recharge-field ibar_recharge-num' style='*z-index: 3; *position: relative'><label>号码</label><div class='ibar_recharge-input ibar_recharge-fl'><div class='ibar_recharge-iwrapper'><input type='text' maxlength='13' name='hp' placeholder='手机号码' autocomplete='off'></div><i class='ibar_recharge-contact' title='查看充值历史'></i><div class='ibar_recharge-tooltip'><p class='no-phone ibar_pink'>请填写您的手机号码</p><p class='phone-error ibar_pink'>请填写正确的手机号码</p><p class='zoom-in ibar_pink'></p><ul class='phone-list'></ul><p class='no-history ibar_pink'>您还没有充值记录</p></div></div></div><div class='ibar_recharge-field' style='*z-index: 2'><label>面值</label><div class='ibar_recharge-fl ibar_recharge-vwrapper'><p class='ibar_recharge-mod'><span class='ibar_recharge-val'>100</span> 元</p><i class='ibar_recharge-arrow'></i><div class='ibar_recharge-vbox clearfix'><ul><li class='selected'><span>100</span>元</li><li><span>200</span>元</li><li><span>300</span>元</li><li><span>500</span>元</li></ul><ul class='last-ul'><li><span>10</span>元</li><li><span>20</span>元</li><li><span>30</span>元</li><li><span>50</span>元</li></ul></div></div></div><div class='ibar_recharge-field ibar_recharge-pwrapper'><label>售价</label><div class='ibar_recharge-fl'><p><span class='ibar_pink sell-status'><span class='on-sell'><span class='ibar_recharge-price'>98.70 ~ 99.80</span> 元</span><span class='sold-out'>暂时缺货</span></span><span class='ibar_recharge-operator'></span></p><input type='hidden' name='sku_no' value=''><input type='hidden' name='customers_price' value=''><input type='hidden' name='market_price' value=''><input type='hidden' name='from' value='ibar_mobile_recharge'><input type='hidden' name='province' value=''><input type='hidden' name='mall_id' value=''></div></div><div class='ibar_recharge-btn'><input type='submit' value='立即充值'></div></form></div></div>"},
        r = {
            defaultOptions: {
                id: "iBarRecharge",
                home: !0,
                formSelector: ".ibar_recharge_form",
                priceMap: {
                    10: "9.87 ~ 10.07",
                    20: "19.74 ~ 20.10",
                    30: "29.61 ~ 30.00",
                    50: "49.35 ~ 50.00",
                    100: "98.70 ~ 100.00",
                    200: "197.40 ~ 200.00",
                    300: "296.10 ~ 300.00",
                    500: "493.50 ~ 500.00"
                }
            }, _draw: function (i) {
                if (i.container) {
                    var e = $(n.frame).attr("id", i.id);
                    return $(i.container).append(e), e
                }
            }, init: function (i) {
                i = $.extend({}, r.defaultOptions, i);
                var e = r._draw(i);
                return i.form = e.find(i.formSelector), new a(i)
            }
        };
    t.exports = r
}), define("ibar-tips", function (i, e, t) {
    function a(i, e) {
        var t = i.offset().top;
        t -= m.scrollTop(), e.css({top: t + "px"})
    }

    function n() {
        if (r = $("#iBar"), s = r.find("div.ibar_main_panel"), o = s.find("li.mpbtn_cart"), l = o.find("a"), 0 === h) {
            c.append(d);
            var i = $(".tips_cash_box"), e = parseInt(p("tipsOneCookie")), t = function () {
                u("tipsOneCookie", "1", {expires: 1e3, path: "/", domain: b})
            };
            240 < f - _ && (!e || 1 !== e) && (i.show(), a(l, i), setTimeout(function () {
                i.hide(), t(), m.unbind("resize.cashbox")
            }, 15e3), i.is(":visible") && m.bind("resize.cashbox", function () {
                a(l, i)
            }), i.find("a.ibar_closebtn").bind("click", function (e) {
                i.remove(), t(), e.preventDefault(), m.unbind("resize.cashbox")
            }))
        }
    }

    var r, s, o, l, c, d;
    d = '<div class="tips_cash_box"><div class="newuser_tips_cash"><h3>您已获得160元现金券</h3><p>今天之内下单最多立减40元</p><a class="coupon_btn" href="http://passport.jumei.com/i/account/signup" target="_blank">注册领取</a></div><s class="icon_arrow_white"></s><a href="javascript:;" class="ibar_closebtn" title="关闭"></a></div>';
    var p = Jumei.util.cookie.get, u = Jumei.util.cookie.set, h = parseInt(p("register_time")) || 0,
        _ = parseInt(p("first_visit_time")) || 0, f = Math.ceil((new Date).getTime() / 1e3), m = $(window),
        v = window.location.hostname.split("."), g = v.slice(-2), b = g.join("."), w = {
            init: function (i) {
                c = i.container, n()
            }
        };
    t.exports = w
}), define("ibar-monitor", function (i, e, t) {
    "use strict";
    var a = function () {
        window._gaq && $("#iBar div.ibar_main_panel").find("a").bind("mousedown", function () {
            var i = $(this).parent()[0].className, e = i.match(/mpbtn_(\w+)\b/);
            e && "gotop" !== (e = "ibar_" + e[1]) && window._gaq.push(["_trackEvent", e, "clicked"])
        })
    };
    t.exports = a
}), define("ibar-fly", function (i, e, t) {
    var a = $(window), n = {
        targeter: null, bubbler: null, bubbleAni: function (i, e) {
            var t = this;
            i.fadeOut(10, function () {
                i.css({width: "45px", height: "45px"}), setTimeout(function () {
                    var i = t.targeter.offset();
                    i = {left: i.left - a.scrollLeft(), top: i.top - a.scrollTop()}, t.bubbler.css({
                        position: "fixed",
                        display: "block",
                        opacity: 1,
                        top: i.top - 13,
                        left: i.left + 4
                    }).animate({top: i.top - 40, opacity: 0}, {
                        duration: 800, complete: function () {
                            t.bubbler.hide(), e && e()
                        }
                    })
                }, 300)
            })
        }, cartScale: function () {
            var i = this;
            i.targeter.css({zIndex: 9992}), i.targeter.animate({scale: .3}, {
                duration: 100, step: function (e) {
                    i.targeter.css("transform", "scale(" + (1 + e) + ")")
                }
            }).animate({scale: .3}, {
                duration: 500, step: function (e) {
                    i.targeter.css("transform", "scale(" + (1.3 - e) + ")")
                }
            })
        }, main: function (i) {
            var e = this;
            e.targeter = i.targeter, e.starter = i.starter, e.bubbler = i.bubbler;
            var t, n = i.flyer, r = i.start, s = i.target, o = i.complete, l = {left: r.left, top: r.top},
                c = {left: s.left, top: s.top}, d = i.unAnim, p = i.isIE6, u = i.speed ? i.speed : 1,
                h = void 0 === i.bubble || i.bubble, _ = (i.hideDelay && i.hideDelay, !p),
                f = i.targetOffset || {left: 0, top: 0}, m = i.flyerOffset || {left: 0, top: 0},
                v = i.flyerResize || {x: 15, y: 15};
            n.css({
                left: r.left - a.scrollLeft(),
                top: r.top - a.scrollTop(),
                position: _ ? "fixed" : "absolute"
            }), _ ? (l = {
                left: r.left - a.scrollLeft(),
                top: r.top - a.scrollTop()
            }, s && (c = {
                left: parseFloat(s.left - a.scrollLeft() + f.left),
                top: parseFloat(s.top - a.scrollTop() + f.top)
            })) : s && (c = {left: parseFloat(s.left + f.left), top: parseFloat(s.top + f.top)});
            var g = _ ? 0 : a.scrollTop(), b = Math.min(l.top, c.top) - Math.abs(l.left - c.left) * (1 / 3);
            b < g && (l.left == c.left && (b = c.top), b = Math.min(g, Math.min(l.top, c.top))), u = p ? u : u / 2;
            var w = Math.sqrt(Math.pow(l.top - c.top, 2) + Math.pow(l.left - c.left, 2)),
                x = Math.ceil(Math.min(Math.max(Math.log(w) / .05 - 75, 30), 100) / u) + 5,
                y = l.top == b ? 0 : -Math.sqrt((c.top - b) / (l.top - b)), k = (y * l.left - c.left) / (y - 1),
                $ = c.left == k ? 0 : (c.top - b) / Math.pow(c.left - k, 2), C = Math.cos, E = Math.PI,
                I = (Math.min, Math.pow), M = -1;
            if (v && (t = {x: n.width(), y: n.height()}), d) e.bubbleAni(n, o); else var T = setInterval(function () {
                ++M;
                var i = l.left + (c.left - l.left) * M / x,
                    a = 0 === $ ? l.top + (c.top - l.top) * M / x : $ * I(i - k, 2) + b, r = {left: i, top: a};
                if (v) {
                    var s = x / 2, d = v.x - (v.x - t.x) * C(M < s ? 0 : (M - s) / (x - s) * E / 2),
                        p = v.y - (v.y - t.y) * C(M < s ? 0 : (M - s) / (x - s) * E / 2);
                    n.css({width: d + "px", height: p + "px"})
                }
                n.css({
                    left: r.left + m.left + "px",
                    top: r.top + m.top + "px"
                }), M == x - 1 && e.cartScale(), M == x && (clearInterval(T), h ? e.bubbleAni(n, o) : o && o())
            }, 16)
        }
    };
    e.main = function (i) {
        n.main(i)
    }
}), define("ibar-helper", function () {
    var i = window.Handlebars;
    i.registerHelper("Helper_userinfo", function (e, t) {
        var a = "http://passport." + t, n = "";
        return n = e.nickname ? '<ul class="user_info"><li>用户名：' + e.nickname + "</li><li>级&emsp;别：" + e.group + "</li></ul>" : '<p>你好！请&nbsp;<a href="' + a + '/i/account/login">登录</a>&nbsp;|&nbsp;<a href="' + a + '/i/account/signup">注册</a></p>', new i.SafeString(n)
    })
}), define("cart-bar", function (i, e, t) {
    "use strict";
    var a = {
        getScrollNavInfo: function (i, e) {
            var t = {};
            if (i.length > 0) return $.each(i, function (a) {
                var n = $(i[a]).offset().top;
                e >= n && e < $(i[a]).height() + n && (t.id = $(i[a]).attr("id"), t.offsettop = n)
            }), t
        }, navBranchShow: function (i) {
            var e = $(window).scrollTop(), t = a.getScrollNavInfo(i.$navcon, e);
            if ("undefined" != t.id) {
                var n = i.$container.find("#nav_" + t.id);
                e >= t.offsettop && (n.addClass("act"), n.siblings().removeClass("act"))
            } else i.$navbrands.removeClass("act");
            e > 200 ? i.$container.show() : i.$container.hide()
        }, navResizeShow: function (i) {
            var e = i.$container.width();
            if ($(window).width() > i.$body.width() + 2 * (e + 15)) i.$container.css({
                left: "50%",
                "margin-left": .5 * i.$body.width() + 15
            }); else {
                var t = $(window).width() - e - 15;
                i.$container.css({left: t + "px", "margin-left": 0})
            }
        }
    }, n = function (i) {
        this.initElement(i.container, i.navcon, i.body), this.renderHandle()
    };
    n.prototype = {
        initElement: function (i, e, t) {
            this.$container = i, this.$body = t, this.$navcon = e, this.$navback = i.find(".nav_backtotop"), this.$navbrands = i.find(".nav_brands_group")
        }, renderHandle: function () {
            this.$navbrands.length > 0 && this.$navcon.length > 0 ? this.scrollHandle() : this.$container.show(), this.$navback.length > 0 && this.$navback.bind("click", this.backHandle), this.resizeHandle()
        }, scrollHandle: function () {
            var i = this;
            $(window).bind("scroll", function () {
                a.navBranchShow(i)
            }), a.navBranchShow(i)
        }, resizeHandle: function () {
            var i = this;
            $(window).resize(function () {
                a.navResizeShow(i)
            }), a.navResizeShow(i)
        }, backHandle: function () {
            $("html,body").animate({scrollTop: 0}, "easeOutExpo")
        }
    }, n.init = function (i) {
        return new n(i)
    }, t.exports = n
}), define("cart-box", function (i, e, t) {
    "use strict";
    var a = {
        frame: " <div class='cart_content' ><div class='cart_content_zero'>购物车中还没有商品，<br/>快去挑选心爱的商品吧！</div><div class='cart_content_all'><div class='cart_left_time'><span class='cart_diff'></span>后购物袋被清空,请及时结算</div><div class='cart_content_center'></div><div class='con_all'><div class='price_whole'><span>共<span class='num_all'></span>件商品</span><span class='price_gongji'><em style='Microsoft Yahei'>&yen;</em><span class='total_price f_color'></span></span></div><div><a href='http://cart." + JM.CURRENT_SITE_MAIN_WEBBASEURL + "/i/cart/show/?from=home_navbar' class='cart_btn'>去购物车结算</a></div></div></div><span class='recent_deals_strangle'></span></div>",
        dealItem: "<div class='cart_con_over cart_con_single'><div class='single_pic'><a  target='_blank' ><img /></a></div><div class='single_info'><a  target='_blank' class='name'></a><span class='f_color' style='Microsoft Yahei'>&yen;</span><span class='f_color f_price'></span><span>x</span><span class='f_num'></span></div></div>",
        group: "<div class='cart_con_over cart_con_group'></div>",
        groupItem: "<div class='cart_con_single'><div class='single_pic'><a target='_blank'><img /></a></div><div class='single_info'><a></a></div></div>"
    }, n = function (i) {
        this.element = {}, this.draw(i.container), this.initBox(i.container), this.render()
    };
    n.prototype = {
        draw: function (i) {
            var e = $(a.frame);
            this.element.parentE = i, this.element.root = e, this.element.numicon = i.find(".nav_cart_num"), this.element.contentNull = e.find(".cart_content_zero"), this.element.contentAll = e.find(".cart_content_all"), this.element.groupContainer = e.find(".cart_content_center"), this.element.recentContainer = e.find(".recent_deals_strangle"), this.element.handlebarQuanity = e.find(".num_all"), this.element.handlebarPrice = e.find(".total_price"), this.element.cart_diff = e.find(".cart_diff"), i.find(".cart_content").length < 1 && $(i).append(e)
        }, initBox: function (i) {
            var e = this;
            Jumei.util.hoverIntent(i, {
                interval: 80, over: function () {
                    e.render(), e.element.root.show(), e.element.root.hover(function () {
                        $(this).find(".cart_con_over").hover(function () {
                            $(this).addClass("single_hover")
                        }, function () {
                            $(this).removeClass("single_hover")
                        })
                    }, function () {
                    })
                }, timeout: 120, out: function () {
                    e.element.root.hide()
                }
            })
        }, render: function () {
            var i = this;
            $.getJSON("http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/ajax/get_cart_data/?callback=?", {
                _ajax_: 1,
                which_cart: "all"
            }, function (e) {
                "string" == typeof e && (e = $.parseJSON(e)), i.clear(), e.quantity > 0 ? (i.toggleCartState(!0), i.refreshTimer(e, i.element.cart_diff), i.renderGroup(e, i.element.groupContainer), i.refreshHandler(e), i.refreshNum(e)) : i.toggleCartState(!1)
            })
        }, toggleCartState: function (i) {
            i ? (this.element.contentNull.hide(), this.element.contentAll.show()) : (this.element.contentNull.show(), this.element.contentAll.hide())
        }, clear: function () {
            this.element.handlebarQuanity.text(0), this.element.handlebarPrice.text(0), this.element.groupContainer.empty(), this.element.numicon.hide()
        }, refreshTimer: function (i, e) {
            var t = i.etime;
            t > 0 ? e.attr("diff", t) : e.parent().html("已超过购物车商品保留时间，请尽快结算。"), "undefined" != typeof cartCounter && window.cartCounter.stop(), window.cartCounter = new Jumei.ui.TimeCounter(this.element.cart_diff, {
                format: "MM分SS.TT",
                dtime: 100,
                onStart: function () {
                    this.$target.html(this.html)
                },
                onEnd: function () {
                    this.$target.html("已超过购物车商品保留时间，请尽快结算。")
                }
            })
        }, refreshHandler: function (i) {
            i && (this.element.handlebarQuanity.text(i.quantity), this.element.handlebarPrice.text(i.total_amount))
        }, refreshNum: function (i) {
            if (i) {
                var e = i.quantity;
                if (0 === e) this.element.numicon.hide(); else {
                    var t = 1 * e >= 100 ? "99+" : e;
                    this.element.numicon.show().html(t), 1 * e >= 100 && this.element.numicon.css({
                        "background-size": "25px 20px",
                        width: "25px"
                    }), window.IbarNum = e, Jumei.app.iBar.cartNumberUpdate(e)
                }
            }
        }, updateUrl: function (i, e) {
            return i.indexOf("?") > -1 ? i += "&from=" + e : i += "?from=" + e, i
        }, renderItem: function (i, e) {
            if (i) {
                var t = $(a.dealItem);
                i.url = this.updateUrl(i.url, "home_index_scrollbar_cart"), t.find(".single_pic a,.single_info a").attr({
                    title: i.short_name,
                    href: i.url
                }), t.find(".single_pic img").attr({
                    alt: i.short_name,
                    src: i.image_100
                }), t.find(".single_info a").html(i.short_name), t.find(".single_info .f_price").text(i.item_discount_price), t.find(".single_info .f_num").text(i.quantity), e.append(t)
            }
        }, renderCpItem: function (i, e) {
            if (i) {
                var t = $(a.groupItem);
                i.url = this.updateUrl(i.url, "home_index_scrollbar_cart"), t.find(".single_pic a,.single_info a").attr({
                    title: i.short_name,
                    href: i.url
                }), t.find(".single_pic img").attr({
                    alt: i.short_name,
                    src: i.image_100
                }), t.find(".single_info a").html(i.short_name + "<em>x" + i.quantity + "</em>"), e.append(t)
            }
        }, renderCp: function (i, e) {
            if (i) {
                for (var t = $(a.group), n = i.sub_items, r = 0; r < n.length; r++) this.renderCpItem(n[r], t);
                var s = "<div class='group_count'><span>组合购买价 </span><span class='group_count_price'><em>¥" + i.item_price + "</em>x" + i.quantity + "</span></div>";
                t.append(s), e.append(t)
            }
        }, renderGroup: function (i, e) {
            var t, a = 0;
            if (i) {
                var n = i["details"];
                for (var r in n) n[r].is_cb ? (a++, "1" == n[r].is_cb && this.renderCp(n[r], e)) : this.renderItem(n[r], e);
                t = 80 * n.length + 80 * a, t > 240 ? e.css("height", "240px") : e.css("height", t)
            }
            this.checkHeight()
        }, checkHeight: function () {
            var i = $(window).height() - (this.element.parentE.offset().top - $(document).scrollTop()) - this.element.root.height(),
                e = this.element.parentE.offset().top - this.element.root.offset().top;
            i < 5 && this.element.root.css("top", i - 20), this.element.recentContainer && this.element.recentContainer.css("top", e < 0 ? Math.abs(e - 20) : e + 20)
        }
    }, n.init = function (i) {
        return new n(i)
    }, t.exports = n
}), define("site_ibar", function (i, e, t) {
    "use strict";
    var a = {
        _bar: null, _load: !1, _param: {num: 1, from: "", which_cart: "all"}, init: function () {
            this._bar = new Jumei.app.iBar({addCartAjaxUrl: "http://cart." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/cart/ajax_add_to_cart"})
        }, addCart: function (i) {
            var e = $.extend({}, this._param, i);
            e.from = this.getFrom(), Jumei.app.iBar.addCart(e), !this._load && this._bar && (this._load = !0, this._bar.on("carterror", function (i) {
                alert(i.pluginName)
            }))
        }, getFrom: function () {
            var i = "", e = window.location.href, t = Jumei.util.parseUrl(e), a = Jumei.util.cookie.get("cookie_uid");
            return t.from && (i += t.from + "|"), i += "cs_" + a
        }
    };
    t.exports = window.GlobalBar = a
}), define("site_cart", function (i) {
    "use strict";
    var e = Jumei.util, t = navigator.userAgent.toLowerCase(), a = t.match(/ms(ie)\s(\d+\.\d)/),
        n = (null !== a && a[1], e.cookie.get("site_visit")),
        r = "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/api/webinit";
    n || $.ajax({
        url: r, dataType: "jsonp", success: function (i) {
            e.cookie.set("site_visit", "1")
        }
    })
}), define("monitor", ["inface", "config"], function (i, e, t) {
    function a(i) {
        return Object.prototype.toString.call(i)
    }

    function n(i) {
        var e;
        if (null === i) return null;
        switch (a(i)) {
            case"[object String]":
            case"[object Number]":
            case"[object Boolean]":
                e = i;
                break;
            case"[object Array]":
                e = [];
                for (var t = i.length - 1; t >= 0; t--) e[t] = n(i[t]);
                break;
            case"[object RegExp]":
                e = new RegExp(i.source, (i.ignoreCase ? "i" : "") + (i.global ? "g" : "") + (i.multiline ? "m" : ""));
                break;
            case"[object Date]":
                e = new Date(i.valueOf());
                break;
            case"[object Error]":
                i = e;
                break;
            case"[object Object]":
                e = {};
                for (var r in i) c(i, r) && (e[r] = n(i[r]));
                break;
            default:
                throw new Error("Not support the type.")
        }
        return e
    }

    function r(i, e) {
        if (!e) return i;
        for (var t in e) c(e, t) && (i[t] = e[t]);
        return i
    }

    function s() {
        return ("" + Math.random()).slice(-6)
    }

    function o(i) {
        if (void 0 === i || "string" != typeof i) return "";
        var e = i.indexOf(";jsessionid=");
        if (e >= 0) return i.substr(0, e);
        do {
            if ((e = i.indexOf("?", e)) < 0) break;
            if ("?" !== i.charAt(e + 1)) break;
            e += 2
        } while (e >= 0);
        return e < 0 ? i : i.substr(0, e)
    }

    function l(i) {
        if ("[object Object]" !== Object.prototype.toString.call(i)) return "";
        var e = [];
        for (var t in i) if (c(i, t)) if ("[object Array]" === a(i[t])) for (var n = 0, r = i[t].length; n < r; n++) e.push(t + "=" + encodeURIComponent(i[t][n])); else e.push(t + "=" + encodeURIComponent(i[t]));
        return e.join("&")
    }

    function c(i, e) {
        return Object.prototype.hasOwnProperty.call(i, e)
    }

    function d(i, e, t) {
        if (t || (t = function () {
        }), !e) return t();
        var a = l(e), n = i + (i.indexOf("?") < 0 ? "?" : "&") + a, r = new Image(1, 1);
        r.onload = r.onerror = r.onabort = function () {
            t(), r.onload = r.onerror = r.onabort = null, r = null
        }, r.src = n
    }

    function p() {
        if (f && !v) {
            var i = h._DATAS.shift();
            if (i) {
                v = !0;
                var e = n(u);
                o(i.url), "jserror" === i.et && (i.file = o(i.file)), e = r(e, i), e.rnd = s(), d(_, e, function () {
                    v = !1, p()
                })
            }
        }
    }

    i("inface");
    var u = i("config"), h = window.monitor, _ = "http://click.srv.jumei.com:80/jm.gif", f = !0, m = {};
    m.getCookie = function (i) {
        var e = new RegExp("(?:^| )" + i + "=([^;]*)(?:;|$)"), t = e.exec(document.cookie);
        return t ? unescape(t[1]) : ""
    };
    var v = !1, g = h._DATAS.push;
    h._DATAS.push = function () {
        g.apply(h._DATAS, arguments), p()
    }, h.boot = function (i) {
        f = i !== !1
    }, f && h._DATAS.push({
        et: "page", url: function (i) {
            var e = u.url, t = 1 == $(".buy_local").length;
            if (!i || !t) return e;
            var a = $("#category_id").length ? $("#category_id").val() : "",
                n = $("#speciallocal").length ? $("#speciallocal").val() : "", r = 2;
            return 1368 != a && (r = m.getCookie(n) || "1"), e.indexOf("?") > -1 ? e += "&btn=" + r : e += "?btn=" + r, e
        }(!0)
    }), t.exports = h
}), define("ibar", ["ibar-helper", "ibar_main.tpl", "ibar-fly", "ibar-monitor", "ibar-tips", "ibar-recharge", "ibar-cart", "ibar-asset", "ibar-favorite", "ibar-history", "ibar-faq"], function (i, e, t) {
    "use strict";
    i("ibar-helper");
    var a, n, r, s, o, l, c, d, p, u, h, _, f, m, v, g, b, w, x, y, k, C, E, I, M = i("ibar_main.tpl"),
        T = i("ibar-fly"), A = i("ibar-monitor"), N = i("ibar-tips"),
        S = window.location.host.split(".").slice(-2).join("."), j = JM.SITE_MAIN_TOPLEVELDOMAINNAME,
        O = JM.SITE_MAIN_TOPLEVELDOMAINNAME, B = !0, J = {
            iBarRecharge: i("ibar-recharge"),
            iBarCart: i("ibar-cart"),
            iBarAsset: i("ibar-asset"),
            iBarFavorite: i("ibar-favorite"),
            iBarHistroy: i("ibar-history"),
            iBarFaq: i("ibar-faq")
        }, L = {zIndex: 9990, compactWidth: 1050, addCartAjaxUrl: "http://cart." + O + "/i/cart/ajax_add_to_cart"},
        D = ["普通会员", "黄金会员", "白金会员", "钻石会员"], q = JM.HIDE_GWC_HTML || !1, P = Jumei.util, H = P.throttle, z = $(window),
        R = $(document.body), U = !0, V = 0, W = 0, F = [],
        G = !!~navigator.userAgent.toLowerCase().indexOf("msie 6.0"), Q = "ipad" === Jumei.ua.device, Y = {
            getCookie: function (i) {
                i = " " + i + "=";
                var e = document.cookie, t = e.indexOf(i), a = e.indexOf(";", t), n = "";
                return ~t && (~a || (a = e.length), n = e.slice(t + i.length, a)), decodeURIComponent(n)
            }, createiBar: function (i) {
                var e, t, a, n = Y.getCookie("nickname"), r = "status_logout",
                    s = "http://p0.jmstatic.com/assets/avatar_nonesign.jpg", o = z.height();
                i.isLogin = "" !== n, i.isLogin && (s = Y.getCookie("avatar_small"), t = Y.getCookie("privilege_group"), t = D[parseInt(t)], r = "status_login"), a = {
                    topDomain: S,
                    domain: j,
                    zIndex: i.zIndex,
                    avatar: s,
                    height: o,
                    statusClassName: r,
                    userinfo: {nickname: n, group: t}
                }, e = window.Handlebars.compilePlus(M, a), R.append(e), s || $.ajax({
                    url: "http://www." + j + "/i/ajax/syncCookie",
                    dataType: "jsonp",
                    success: function (i) {
                        i.avatar_small && ($("#iBar .avatar_imgbox img")[0].src = i.avatar_small)
                    }
                })
            }, createAnimElem: function () {
                return $('<div style="width:45px;height:45px;border-radius:50%;background:#fff;position:absolute;display:none;overflow:hidden;border:1px solid #ed145b;z-index:10002;"><img width="45" height="45"></div>')
            }, configAnim: function (i) {
                var e = i.animElem, t = (i.sourceElem, i.numProxyElem), a = i.sourcePos, n = i.targetPos,
                    r = i.animElem.width(), s = i.sourceElem.width() / 2 - r / 2, o = {top: a.top, left: a.left + s},
                    l = {top: a.top - r - 10, left: o.left};
                e.css({
                    position: "absolute",
                    display: "block",
                    top: o.top + "px",
                    left: o.left + "px",
                    opacity: 0
                }).animate({top: l.top + "px", opacity: 1}, 300, function () {
                    var i = $(this);
                    T.main({
                        flyer: i,
                        starter: null,
                        bubbler: t,
                        targeter: $("li.mpbtn_cart a s"),
                        start: l,
                        target: n,
                        unAnim: !1,
                        bubble: !0,
                        speed: 4,
                        isIE6: G,
                        hideDelay: "",
                        targetOffset: {left: 12, top: 28},
                        complete: function () {
                            K.cartNumberUpdate(V), i.remove()
                        }
                    })
                })
            }, getAddCartData: function (i) {
                var e, t, n = "http://cart." + O + "/i/cart/new_items/", r = "", s = 0;
                if (i.multiple) {
                    for (e = i.sku.length; s < e; s++) t = 0 === parseInt(i.hashid[s]) ? "" : i.hashid[s], r += i.sku[s] + "," + t + "," + i.num[s] + "|";
                    r = r.slice(0, r.length - 1)
                } else i.combt ? r = i.combt : (t = 0 === parseInt(i.hashid) ? "" : i.hashid, r = i.sku + "," + t + "," + i.num);
                q ? window.location.href = n + r + "?from=" + i.from : $.ajax({
                    url: I,
                    data: {_ajax_: 1, items: r, which_cart: i.which_cart, from: i.from, token: i.token},
                    dataType: "jsonp",
                    success: function (e) {
                        if ("success" === e.type) V = e.cart_item_number, i.callback(), a.trigger("likecartadd"); else if ("fail" === e.type) {
                            0 === $(".module-dialog").length && $("body").append('<div class="module-dialog"><a class="close"></a><div class="module-content"><div class="module-text"></div><div class="module-button"></div></div></div>'), 0 === $(".module-bg").length && $("body").append("<div class='module-bg'></div>"), $(".module-content").css("padding-top", "140px"), $(".module-content .module-tip").html(""), $(".module-text").html(e.error_msg), $(".module-button").html("<span class='ok'>我知道了</span>").css("margin-top", "0px"), $(".module-dialog").css({
                                background: "url('http://images.jumei.com/pc_global/301-bg.png') no-repeat",
                                width: "521px",
                                height: "321px"
                            }), $(".module-dialog a.close,.module-button span.ok").on("click", function (i) {
                                i.preventDefault(), $(".module-dialog").fadeOut(300), $(".module-bg").fadeOut(500)
                            }), $(".module-dialog").fadeIn(300), $(".module-bg").fadeIn(500)
                        } else a.trigger("likecarterror", e.error_msg)
                    },
                    error: function () {
                        window.location.href = n + r + "?from=" + i.from
                    }
                })
            }, addCartCallback: function (i) {
                var e, t = $.isArray(i.num) ? i.num.length : i.num, a = $(i.elem), n = a.offset(), r = o.offset(), s = {};
                n.top = n.top - a.outerHeight(), a.is(":hidden") && (a.css({
                    visibility: "hidden",
                    display: "block"
                }), n = a.offset(), n.top = n.top - a.outerHeight(), a.css({
                    visibility: "",
                    display: "none"
                })), _ || (_ = $('<div style="width:13px;height:13px;line-height:13px;z-index:9991;border-radius:50%;background:#ed145b;position:absolute;display:none;overflow:hidden;border:2px solid #ed145b;color:#fff;text-align: center"/>'), R.append(_)), _.text(t), h || (h = Y.createAnimElem()), e = h.clone(), e.find("img")[0].src = i.img, R.append(e), s = {
                    animElem: e,
                    sourceElem: a,
                    numProxyElem: _,
                    sourcePos: n,
                    targetPos: r
                }, Y.configAnim(s)
            }, slideMainPanel: function (i) {
                var e = i ? C + "px" : "0px";
                n.is(":animated") && n.stop(!0, !0), n.animate({left: e}, 200)
            }, slideCartItem: function (i) {
                var e = i ? 0 - C + "px" : "0px", t = function () {
                    o[i ? "addClass" : "removeClass"]("mpbtn_cart_compact")
                };
                o.is(":animated") && o.stop(!0, !0), o.animate({left: e}, 200, t)
            }, initMainPanel: function (i) {
                var e, t = z.width();
                a.unbind("mouseenter.slidemainpanel mouseleave.slidemainpanel touchstart.slidemainpanel"), t < i.compactWidth ? (e = parseInt(n.css("left")), 0 === e && Y.slideMainPanel(!0), Y.slideCartItem(!0), Y.bindMainPanelSlide()) : (e = parseInt(o.css("left")), Y.slideMainPanel(!1), 0 !== e && Y.slideCartItem(!1))
            }, bindMainPanelSlide: function () {
                var i, e = function () {
                    clearTimeout(void 0);
                    var e = parseInt(n.css("left")), t = function () {
                        Y.slideMainPanel(!1), Y.slideCartItem(!1)
                    };
                    0 !== e && (Q ? t() : i = setTimeout(t, 200))
                }, t = function () {
                    clearTimeout(i);
                    var e = parseInt(n.css("left")), t = function () {
                        Y.slideMainPanel(!0), Y.slideCartItem(!0)
                    };
                    U && 0 === e && (Q ? t() : i = setTimeout(t, 200))
                };
                Q ? a.bind("touchstart.slidemainpanel", e).bind("touchstart.slidemainpanel", t) : a.bind("mouseenter.slidemainpanel", e).bind("mouseleave.slidemainpanel", t)
            }, initPluginLayout: function () {
                var i, e, t = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
                    a = ".ibar .ibar_sub_panel .ibar_plugin_content", n = z.height() - 39;
                n = Math.max(n, 600), i = "height:" + n + "px;overflow-y:auto;", e = document.createElement("style"), e.type = "text/css", void 0 !== e.textContent ? e.textContent = a + "{" + i + "}" : e.styleSheet.addRule(a, i, 0), t.appendChild(e)
            }, reComputedPluginLayout: function (i) {
                var e = i.find(".ibar_plugin_title"), t = i.find(".ibar_plugin_content"), a = z.height();
                t.css({height: a - e.outerHeight() + "px", "overflow-y": "auto"})
            }, initPlugins: function (i) {
                var e, t = $(i), n = $(i).attr("data-plugin"), r = F.length, s = 0;
                if (n && J[n]) if (e = $("#" + n), l.children("div").hide(), p.filter(".current").removeClass("current"), t.addClass("current"), e.length) {
                    if (e.show(), a.trigger("likepanelopen", n), "iBarCart" === n && V !== W) for (W = V; s < r; s++) F[s]();
                    Y.reComputedPluginLayout(e), a.trigger("afterreopenplugin", n)
                } else setTimeout(function () {
                    J[n].init({container: l});
                    var i = $("#" + n);
                    i.length && z.height() < 650 && Y.reComputedPluginLayout(i), a.trigger("likepanelopen", n)
                }, 10)
            }, slideCallback: function (i) {
                Y.initPlugins(i), R.bind("click.closesubpanel", function (i) {
                    var e = i.target;
                    e === a[0] || $.contains(a[0], e) || (Y.slideSubPanel(), R.unbind("click.closeloginbox"), Q ? a.trigger("touchstart.slidemainpanel") : a.trigger("mouseleave.slidemainpanel"))
                })
            }, slideSubPanel: function (i) {
                var e, t = l.is(":visible");
                i && (e = $(i).parents("li").find("div.mp_tooltip"), e.length && e.stop(!0, !0).css("visibility", "hidden")), t ? i ? Y.initPlugins(i) : (l.animate({left: "0px"}, 250, function () {
                    l.hide(), m.is(":hidden") && c.is(":hidden") && (U = !0), p.filter(".current").removeClass("current"), Q ? a.trigger("touchstart.slidemainpanel") : a.trigger("mouseleave.slidemainpanel")
                }), R.unbind("click.closesubpanel")) : (l.children("div").hide(), U = !1, l.css("display", "block").animate({left: 0 - E + "px"}, 200, function () {
                    Y.slideCallback(i)
                }))
            }, showTooltip: function () {
                var i = this;
                b = setTimeout(function () {
                    var e, t = $(i).find("div.mp_tooltip");
                    t.length && (e = parseInt(t.css("left")), t.css({
                        left: e - 30 + "px",
                        opacity: 0,
                        visibility: "visible"
                    }).animate({left: e + "px", opacity: 1}, 300))
                }, 150)
            }, hideTooltip: function () {
                var i, e = $(this).find("div.mp_tooltip");
                e.length && (clearTimeout(b), i = parseInt(e.css("left")), e.animate({
                    left: i - 30 + "px",
                    opacity: 0
                }, 300, function () {
                    e.css({visibility: "hidden", left: "", opacity: ""})
                }))
            }, showSignBox: function (i) {
                var e = $(i), t = e.offset().top;
                t -= z.scrollTop(), c.css({
                    top: t + "px",
                    display: "block"
                }), U = !1, R.bind("click.closeloginbox", function (i) {
                    var e = i.target;
                    e === a[0] || $.contains(a[0], e) || (Y.hideSignBox(), R.unbind("click.closeloginbox"))
                })
            }, hideSignBox: function () {
                c.is(":visible") && (c.hide(), R.unbind("click.hideloginbox"), m.is(":hidden") && l.is(":hidden") && (U = !0))
            }, showQrcode: function () {
                clearTimeout(k), U = !1, y = setTimeout(function () {
                    var i;
                    m.show(), v && (i = v.attr("data-lazysrc"), v[0].src = i, v.removeAttr("data-lazysrc"), v = null)
                }, 150)
            }, hideQrcode: function () {
                clearTimeout(y), k = setTimeout(function () {
                    m.hide(), c.is(":hidden") && l.is(":hidden") && (U = !0)
                }, 150)
            }, initCartNum: function () {
                var i = "http://cart." + j + "/i/ajax/get_cart_data_right";
                $.ajax({
                    url: i,
                    data: {show_type: "all_quantity", _ajax_: 1, which_cart: "all"},
                    dataType: "jsonp",
                    success: function (i) {
                        i && K.cartNumberUpdate(i.quantity)
                    }
                })
            }, initDom: function () {
                a = $("#iBar"), n = a.find("div.ibar_main_panel"), r = n.find("li"), s = n.find("li.mpbtn_login").find("a"), o = n.find("li.mpbtn_cart"), l = a.find("div.ibar_sub_panel"), g = a.find("div.ibar_tips_box"), c = a.find("div.ibar_login_box");
                var i = window.IbarNum && window.IbarNum >= 100 ? "99+" : window.IbarNum || 0;
                d = n.find("span.cart_num").html(i), p = n.find("ul.ibar_mp_center").find("a"), f = n.find("li.mpbtn_qrcode"), m = n.find("div.mp_qrcode"), v = m.find("img"), u = n.find("li.mpbtn_support").find("a")
            }, initEvent: function (i) {
                p.bind("click", function (e) {
                    var t = $(this), a = void 0 !== t.attr("data-plugin"), n = parseInt(t.attr("data-judgelogin"));
                    a && (1 === n ? i.isLogin ? Y.slideSubPanel(this) : (Y.hideSignBox(), Y.showSignBox(this)) : Y.slideSubPanel(this)), e.preventDefault()
                }).bind("mouseleave", function () {
                    clearTimeout(w), x = setTimeout(function () {
                        Y.hideSignBox()
                    }, 200)
                });
                var e = this;
                u.on("click", function (i) {
                    var t = JM.SERVER_TIME;
                    t >= 1485449999 && t <= 1485478800 || t >= 1485532800 && t <= 1485565200 || t >= 1485619200 && t <= 1485651600 || t >= 1485705600 && t <= 1485738e3 || t >= 1485792e3 && t <= 1485824400 || t >= 1485878400 && t <= 1485910800 || t >= 1485964800 && t <= 1485997200 || t >= 1485511200 && t <= 1485532800 || t >= 1485597600 && t <= 1485619200 || t >= 1485684e3 && t <= 1485705600 || t >= 1485770400 && t <= 1485792e3 || t >= 1485856800 && t <= 1485878400 || t >= 1485943200 && t <= 1485964800 ? (e.springDialog(), $(".spring_bg").fadeIn(300), $(".spring").fadeIn(500)) : ($(".spring_bg").hide(), $(".spring").hide(), J.iBarFaq.init()), i.preventDefault()
                }), Q || r.bind("mouseenter", Y.showTooltip).bind("mouseleave", Y.hideTooltip), f.bind("mouseenter", Y.showQrcode).bind("mouseleave", Y.hideQrcode), Q ? s.bind("touchstart", function () {
                    Y.showSignBox(this)
                }) : (s.bind("mouseenter", function () {
                    var i = this;
                    clearTimeout(x), w = setTimeout(function () {
                        Y.showSignBox(i)
                    }, 200)
                }), c.bind("mouseenter", function () {
                    clearTimeout(x)
                }).bind("mouseleave", function () {
                    clearTimeout(w), x = setTimeout(function () {
                        Y.hideSignBox()
                    }, 200)
                })), c.find("a.ibar_closebtn").bind("click", function (i) {
                    Y.hideSignBox(), i.preventDefault()
                }), l.find("a.ibar_closebtn").bind("click", function (i) {
                    Y.slideSubPanel(), i.preventDefault()
                })
            }, init: function (i) {
                q || ($("html,body").css("height", "100%"), Y.createiBar(i), Y.initDom(),
                    P.fixed(a[0], {
                        top: "0px",
                        right: "0px"
                    }), a.css("display", "block"), I = i.addCartAjaxUrl, C = n.outerWidth(), E = l.outerWidth(), Y.initPluginLayout(), void 0 !== window.__cartNumber__ && K.cartNumberUpdate(window.__cartNumber__), window.__initiBar__ = !0, Y.initEvent(i), Y.initMainPanel(i), z.bind("resize.ibar", H(function () {
                    l.is(":visible") && (l.css({
                        display: "none",
                        left: "0px"
                    }), R.unbind("click.closesubpanel")), Y.initMainPanel(i), a.css("height", z.height() + "px")
                }, 50)), new Jumei.ui.Gotop({fixed: !1}), A())
            }, springDialog: function () {
                $(".spring").length <= 0 && $("body").append('<div class="spring"><div class="spring_title"><span class="title">温馨提示</span><div class="close"></div></div><div class="spring_content"><div class="content">春节1月27日-2月1日期间，人工客服时间暂调整为9:00-18:00，2月2日9:00起恢复24小时服务。祝您春节愉快^_^</div><div class="close">我知道了</div></div> </div>'), $(".spring_bg").length <= 0 && $("body").append('<div class="spring_bg"></div>'), $(".close").on("click", function () {
                    $(".spring_bg").fadeOut(500), $(".spring").fadeOut(300)
                })
            }
        }, K = function (i) {
            var e = $.extend({}, L, i);
            this.__o__ = e, $(function () {
                Y.init(e)
            })
        };
    K.addCart = function (i) {
        B && (B = !1, i.callback = function () {
            Y.addCartCallback(i)
        }, Y.getAddCartData(i), setTimeout(function () {
            B = !0
        }, 2e3))
    }, K.cartUpdate = function (i) {
        "function" == typeof i && F.push(i)
    }, K.cartNumberUpdate = function (i) {
        i = i && 1 * i >= 100 ? "99+" : i, d && d.text(i)
    }, K.faq = function (i) {
        J.iBarFaq.init()
    }, K.tips = N, K.prototype = {
        on: function (i, e) {
            if (this.__o__) {
                var t = this;
                a.bind("like" + i, function (a, n) {
                    a.type = i, "string" == typeof n && (a.pluginName = n), e.call(t, a), a.stopPropagation()
                })
            }
            return this
        }, un: function (i) {
            return this.__o__ && this.__o__.target.unbind("like" + i), this
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.app = window.Jumei.app || {}, window.Jumei.app.iBar = K
}), define("wish", function (i, e, t) {
    "use strict";
    var a = {
            iframe: "<div class='wish_content' style='display:none'><div class='wish_close'>关闭</div><div class='wish_layer'><p class='wish_tit'>订阅成功</p><div class='wish_layer_wrap'></div></div></div>",
            success: "<p class='wish_success_tips'><i></i>成功加入心愿单！</p><div class='wish_ok_wrap'>小美会在开团前第一时间发送：短信通知至<b></b></div><p class='wish_cancel'><a href='http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/wishdeal/willsale' target='_blank'>已订阅的开团提醒</a></p><div ><input type='button' value='确定' class='wish_subscribe'/></div>",
            login: "<p class='wish_layer_tips wish_home_tip'> <span class='wish_tip_img'></span><span class='wish_tip_text'>您尚未登陆哦！</span></p><p class='wish_layer_tips  wish_home_stip'>请在聚美优品网站登陆后，成功绑定手机后</p><p class='wish_layer_tips  wish_home_stip'>尝试重新加入心愿单</p><p style='text-align:center'><a href='' class='wish_a_login'><span class='wish_home_btn'>去登录</span></a></p>",
            iphone: "<p class='wish_layer_tips wish_home_tip'><span class='wish_tip_img'></span><span class='wish_tip_text'>您尚未绑定手机</span></p><p class='wish_layer_tips wish_home_stip'>请在聚美优品网站绑定手机后，返回本页面</p><p class='wish_layer_tips wish_home_stip'>尝试重新加入心愿单</p><p class='wish_btn wish_btn_p'><a href='' target='_blank'><span class='wish_home_btn wish_dis_p'>绑定手机</span></a></p><p class='wish_btn wish_btn_bind'><span class='wish_home_btn wish_dis_p wish_btn_refresh'>已绑定，重新尝试</span></p><p class='wish_btn wish_btn_bind'><span class='wish_home_btn wish_dis_p wish_btn_cancel'>取消</span></p>"
        }, n = "http://www." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/",
        r = "http://i." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/wishdeal/ajax_add_jsonp", s = {data: null, type: "com"},
        o = function (i, e) {
            var t = $.extend({}, s, e);
            this.__o__ = t, this.__o__.target = i, this.element = {}, this.wishbox = null, this.init(this.__o__)
        };
    o.prototype = {
        init: function (i) {
            this.drawBox(i)
        }, drawBox: function (i) {
            if ($(".wish_content").length < 1) {
                var e = $(a.iframe);
                this.element.wishContent = e, this.element.wishClose = e.find(".wish_close"), this.element.wishLayer = e.find(".wish_layer"), this.element.wishTit = e.find(".wish_tit"), this.element.layerWap = e.find(".wish_layer_wrap"), $("body").append(e), this.wishbox = new Jumei.ui.Dialog("body", {
                    elem: ".wish_content",
                    effects: "zoom",
                    trigger: "WishEvent"
                })
            }
        }, showBox: function (i) {
            var e = this, t = {}, r = "";
            switch (i) {
                case"login":
                    t = {
                        width: "350px",
                        height: "228px"
                    }, $(".wish_content,.wish_layer").css(t), this.element.wishTit.html("温馨提示");
                    var s = location.href;
                    r = "http://passport." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/account/login/?redirect=" + encodeURIComponent(s), this.element.layerWap.html(a[i]), this.element.layerWap.find(".wish_a_login").attr({href: r}), $("body").trigger("WishEvent");
                    break;
                case"iphone":
                    t = {
                        width: "350px",
                        height: "235px"
                    }, $(".wish_content,.wish_layer").css(t), this.element.wishTit.html("温馨提示"), r = n + "i/account/mobile_bind_status", this.element.layerWap.html(a[i]), this.element.layerWap.find(".wish_btn_p a").attr({href: r}).bind("click", function (i) {
                        $(this).hide(), e.element.layerWap.find(".wish_btn_bind").show()
                    }), this.element.layerWap.find(".wish_btn_refresh").bind("click", function (i) {
                        e.phoneBind()
                    }), $("body").trigger("WishEvent");
                    break;
                case"success":
                    this.element.layerWap.html(a[i]), e.__o__.iphone ? t = {
                        width: "350px",
                        height: "228px"
                    } : (t = {
                        width: "350px",
                        height: "150px"
                    }, this.element.layerWap.find(".wish_ok_wrap").hide()), $(".wish_content,.wish_layer").css(t), this.element.layerWap.find(".wish_ok_wrap b").html(e.__o__.iphone ? e.__o__.iphone : ""), $("body").trigger("WishEvent")
            }
            $(".wish_close,.wish_btn_cancel,.wish_subscribe").click(function () {
                e.wishbox.close()
            })
        }, addWish: function () {
            var i, e = this;
            if ("com" == this.__o__.type) i = this.__o__.data.sku + "," + this.__o__.data.hashid + ",1"; else if ("comb" == this.__o__.type) {
                var t = this.__o__.data.list;
                i = t[0].sku + "," + t[0].hashid + ",1," + this.__o__.data.cid + "," + t[1].sku + "," + t[1].hashid
            }
            i && $.ajax({
                url: r, type: "get", data: {item: i, _ajax_: 1}, dataType: "jsonp", success: function (i) {
                    0 === i.errno ? (e.__o__.iphone = i.data.mobile, e.showBox("success")) : alert("请求错误，请刷新重试！")
                }, error: function () {
                    alert("请求地址错误，请刷新重试！")
                }
            })
        }, phoneBind: function () {
            var i = this;
            $.ajax({
                url: n + "i/account/ajax_is_mobile_bind2?callback=?", dataType: "jsonp", success: function (e) {
                    e ? (i.__o__ = $.extend(i.__o__, e), i.addWish()) : alert("数据错误！")
                }, error: function () {
                    alert("请求错误，请刷新重试！")
                }
            })
        }, checkState: function (i, e) {
            i && (e && (this.__o__.type = e), this.__o__.data = i, "" !== Jumei.util.cookie.get("uid") ? this.phoneBind() : this.showBox("login"))
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.app = window.Jumei.app || {}, window.Jumei.app.WishLayer = o
}), define("cart", ["cart-box", "cart-bar"], function (i, e, t) {
    "use strict";
    var a = {CartBox: i("cart-box"), CartBar: i("cart-bar")}, n = {isCart: JM.GLOBAL_HEAD, isBar: !1},
        r = ($(window), $(".home_nav_bar")), s = $(".product_introduce,.brand_list_box"), o = $(".global_wrapper"),
        l = (r.find(".li_cart_content"), $(".cart_flag_all").find(".cart_box")), c = {
            showCart: function () {
                l.length && (l.addClass("cart_box_hover"), a.CartBox.init({container: l}))
            }, showBar: function () {
                r.length > 0 && a.CartBar.init({container: r, navcon: s, body: o})
            }, init: function (i) {
                i.isCart && c.showCart()
            }
        };
    new function (i) {
        var e = $.extend({}, n, i);
        this.__o__ = e, c.init(e)
    }
}), define("site", ["monitor", "ui", "site_cart", "site_ibar"], function (i) {
    "use strict";
    i("monitor"), i("ui"), i("site_cart"), i("site_ibar"), {
        init: function () {
            this.initList(), this.initLogin()
        }, initList: function () {
            $(".h_more_width").hover(function () {
                $(this).find(".j_back").css("background", "#fff"), $(this).find(".menu_list").stop(!0, !0).slideDown("fast")
            }, function () {
                $(this).find(".j_back").css("background", "none"), $(this).find(".menu_list").stop(!0, !0).slideUp("fast")
            }), $(".j_menu_arrow").hover(function () {
                $(this).find(".h_arrow_menu").show()
            }, function () {
                $(this).find(".h_arrow_menu").hide()
            }), $(".a_menu_span").hover(function () {
                $(this).find("span").show()
            }, function () {
                $(this).find("span").hide()
            });
            var i = $("#bookmark_us");
            i.length > 0 && i.click(function () {
                Jumei.util.addFavorite("http://www.jumei.com", "聚美优品 – 中国知名正品化妆品限时特卖网")
            });
            var e = this;
            $("#footer_faq").click(function (i) {
                var t = JM.SERVER_TIME;
                !JM.DEGRADATION && (t >= 1485449999 && t <= 1485478800 || t >= 1485532800 && t <= 1485565200 || t >= 1485619200 && t <= 1485651600 || t >= 1485705600 && t <= 1485738e3 || t >= 1485792e3 && t <= 1485824400 || t >= 1485878400 && t <= 1485910800 || t >= 1485964800 && t <= 1485997200 || t >= 1485511200 && t <= 1485532800 || t >= 1485597600 && t <= 1485619200 || t >= 1485684e3 && t <= 1485705600 || t >= 1485770400 && t <= 1485792e3 || t >= 1485856800 && t <= 1485878400 || t >= 1485943200 && t <= 1485964800) ? (e.springDialog(), $(".spring_bg").fadeIn(300), $(".spring").fadeIn(500)) : ($(".spring_bg").hide(), $(".spring").hide(), Jumei.app.iBar.faq()), i.preventDefault()
            })
        }, initLogin: function () {
            var i = Jumei.util, e = "", t = "", a = i.cookie.get("referer_site"),
                n = "http://passport." + JM.SITE_MAIN_TOPLEVELDOMAINNAME + "/i/site/refer",
                r = "http://passport." + JM.CURRENT_SITE_MAIN_WEBBASEURL + "/account/logout",
                s = i.parseUrl(window.location.href);
            null != i.cookie.get("nickname") && (e = decodeURIComponent(i.cookie.get("nickname")), e = i.clipstring(e, 12)), null !== e && "" !== e && $("#head_login").length > 0 && ($("#head_login .new_login").hide(), t = '<li>欢迎您，<a href="http://www.' + JM.SITE_MAIN_TOPLEVELDOMAINNAME + '/i/order/list" target="_blank"><span style="color: #ED145B;">' + e + '</span></a><span style="padding:0 5px;">[<a href="' + r + '" style="padding:0;">退出</a>]</span></li>', $("#head_login").prepend(t)), s && s.referer && s.referer && s.referer != a && ($.ajax({
                url: n,
                data: {refer: s.referer},
                dataType: "jsonp",
                success: function (i) {
                }
            }), i.cookie.set("referer_site", s.referer, {exp: 24}))
        }, springDialog: function () {
            $(".spring").length <= 0 && $("body").append('<div class="spring"><div class="spring_title"><span class="title">温馨提示</span><div class="close"></div></div><div class="spring_content"><div class="content">春节1月27日-2月1日期间，人工客服时间暂调整为9:00-18:00，2月2日9:00起恢复24小时服务。祝您春节愉快^^</div><div class="close">我知道了</div></div> </div>'), $(".spring_bg").length <= 0 && $("body").append('<div class="spring_bg"></div>'), $(".close").on("click", function () {
                $(".spring_bg").fadeOut(500), $(".spring").fadeOut(300)
            })
        }
    }.init()
}), define("stream-inc", function (i) {
    "use strict";

    function e(i, e) {
        return Object.prototype.hasOwnProperty.call(i, e)
    }

    var t = {
        fb_type: 1,
        search_product_id: 0,
        search_category_id: 0,
        search_brand_id: 0,
        search_page: 0,
        search_pos: 0,
        price: 0,
        search_product_type: "global_deal",
        search_show_id: 0,
        result_cnt: 0,
        platform: 1,
        search_hash_id: 0,
        search_sku_id: 0,
        search_spu_id: 0,
        search_warehouse_id: 0
    }, a = {
        fb_type: "ftype",
        search_product_id: "spd",
        search_category_id: "scd",
        search_brand_id: "sbd",
        search_page: "spage",
        search_pos: "spos",
        price: "price",
        search_product_type: "spt",
        search_show_id: "ssd",
        result_cnt: "rc",
        search_hash_id: "hid",
        search_sku_id: "sku",
        search_spu_id: "spu",
        search_warehouse_id: "swd"
    }, n = {
        init: function (i, e) {
            n.send(i, e)
        }, send: function (i, e) {
            var r = t;
            for (var s in r) i.attr(s) && (r[s] = i.attr(s));
            var o = $.extend({}, r, e), l = {stream: "global", vl: n.format(o, a)};
            return window.monitor && window.monitor.log("custom", l), !0
        }, format: function (i, t) {
            var a, n = [];
            if (arguments.length > 1) for (a in t) if (e(i, a)) {
                var r = t[a];
                r != a && (i[r] = i[a], delete i[a])
            }
            for (a in i) n.push(a + "|" + i[a]);
            return n.join("^")
        }
    };
    window.StreamUtil = n
}), define("app", ["stream-inc", "site", "cart", "wish", "ibar"], function (i) {
    i("stream-inc"), i("site"), i("cart"), i("wish"), i("ibar")
});