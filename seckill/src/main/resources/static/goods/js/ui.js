/* Date: 2018-04-03T15:52:12Z Path: js/ui/ui.js */
define("drag", function (e, t, i) {
    "use strict";
    var n, o = {left: ["left"], top: ["top"], right: ["left", "Width"], bottom: ["top", "Height"]},
        a = {axis: null, container: null, handle: null, moveHand: !0, proxy: !1, refresh: !0},
        r = navigator.userAgent.toLowerCase(), l = r.match(/ms(ie)\s(\d+\.\d)/), s = l && "ie" === l[1],
        c = s && "6.0" === l[2], u = {
            getPosition: function (e, t) {
                var i = e.css("position");
                if ("static" === i) return "auto";
                if ("relative" === i) return "0px";
                var n, a, r, l, s = o[t][0], c = Jumei.util.capitalize(s), u = e.offset()[s],
                    d = "right" === t || "bottom" === t, f = 0;
                return "absolute" === i ? (n = e[0].offsetParent, "BODY" !== n.tagName && "HTML" !== n.tagName || (n = window), a = $(n), $.isWindow(n) || (f = parseFloat(a.css("border" + c + "Width"))), r = a.offset()[s] + f) : (a = $(window), r = a["scroll" + c]()), u -= r, d ? (l = o[t][1], a["inner" + l]() - e["outer" + l]() - u + "px") : u + "px"
            }, getBoundary: function (e, t) {
                var i, n, o = $.isWindow(e[0]), a = 0, r = 0, l = 0, s = 0, c = e.offset(), d = t.offset(),
                    f = t.css("top"), h = t.css("left");
                return "auto" === f && (f = u.getPosition(t, "top")), "auto" === h && (h = u.getPosition(t, "left")), o ? (i = e.scrollTop(), n = e.scrollLeft()) : (i = c.top, n = c.left, a = e.css("borderTopWidth"), r = e.css("borderRightWidth"), l = e.css("borderBottomWidth"), s = e.css("borderLeftWidth"), "medium" === a && (a = "0px"), "medium" === r && (r = "0px"), "medium" === l && (l = "0px"), "medium" === s && (s = "0px"), a = parseFloat(a), r = parseFloat(r), l = parseFloat(l), s = parseFloat(s)), i = i - d.top + parseFloat(f), n = n - d.left + parseFloat(h), {
                    top: i + a,
                    right: n + e.outerWidth() - t.outerWidth() - r,
                    left: n + s,
                    bottom: i + e.outerHeight() - t.outerHeight() - l
                }
            }, copyPosition: function (e, t) {
                var i = e.offset(), n = t.offset(), o = t.css("top"), a = t.css("left");
                "auto" === o && (o = u.getPosition(t, "top")), "auto" === a && (a = u.getPosition(t, "left")), t.animate({
                    top: i.top - n.top + parseInt(o) + "px",
                    left: i.left - n.left + parseInt(a) + "px"
                })
            }, createProxy: function (e) {
                var t = e.target, i = t.offset(), o = t.css("zIndex");
                return o ? o = parseInt(o) + 1 : (t.css("zIndex", "1"), o = "2"), n || (n = $('<div class="ecope_drag_proxy" style="position:absolute;border:2px dashed #a0a1a2;"/>')), n.css({
                    top: i.top + "px",
                    left: i.left + "px",
                    cursor: e.moveHand ? "move" : "",
                    width: e.width - 4 + "px",
                    height: e.height - 4 + "px",
                    zIndex: o
                }), n
            }
        }, d = function (e, t) {
            if (e = $(e).eq(0), t = t || {}, e.length) {
                var i, n, o, r, l, d = $.extend({}, a, t), f = e.css("position"),
                    h = "fixed" === f || c && void 0 !== e[0].style.getExpression("top"), p = e[0].ownerDocument,
                    m = p.defaultView || p.parentWindow, g = $(m), v = d.handle ? $(d.handle) : e, _ = s ? v : $(p),
                    w = d.container ? $(d.container) : null, x = 0, y = this, b = d.axis, E = !1, k = d.proxy,
                    z = d.refresh, I = "getSelection" in m ? function () {
                        m.getSelection().removeAllRanges()
                    } : function () {
                        try {
                            p.selection.empty()
                        } catch (e) {
                        }
                    }, T = function (t) {
                        d.isDown = !0;
                        var a, m, x, E = e;
                        d.width = e.outerWidth(), d.height = e.outerHeight(), z || "static" === (f = e.css("position")) && E.css("position", "relative"), k && (n = u.createProxy(d), E = n.appendTo(p.body), s && (_ = n)), d.handle = _, a = E.css("left"), m = E.css("top"), x = E.offset(), "auto" === m && (m = u.getPosition(e, "top")), "auto" === a && (a = u.getPosition(e, "left")), z || (l = {
                            left: a,
                            top: m
                        }), y.left = a = parseInt(a), y.top = m = parseInt(m), y.offsetLeft = x.left, y.offsetTop = x.top, o = t.pageX - a, r = t.pageY - m, (!i && w || h) && (i = u.getBoundary(h ? g : w, E)), b && ("x" === b ? r = !1 : "y" === b && (o = !1)), s && _[0].setCapture(), _.on("mousemove.drag", S).on("mouseup.drag", H), s && _.on("losecapture.drag", H), c && h && !k && e[0].style.removeExpression("top"), v.trigger("likedragstart"), Jumei.ui.Drop && Jumei.ui.Drop.refresh(), t.stopPropagation(), t.preventDefault()
                    }, S = function (t) {
                        if (d.isDown && ++x % 2 != 0) {
                            var a, l, s, c, u, f, h = t.pageX, p = t.pageY, m = t.offsetX, g = t.offsetY,
                                _ = k ? n[0].style : e[0].style;
                            I(), E = !0, void 0 === m && (m = t.originalEvent.layerX, g = t.originalEvent.layerY), o && (a = h - o, i && (s = i.left, c = i.right, a = a < s ? s : a > c ? c : a), _.left = a + "px", y.left = a, y.offsetLeft = h - m), r && (l = p - r, i && (u = i.top, f = i.bottom, l = l < u ? u : l > f ? f : l), _.top = l + "px", y.top = l, y.offsetTop = p - g), e.trigger("likedrag", [h, p]), !Jumei.ui.Drop || t.target !== v[0] && "ecope_drag_proxy" !== t.target.className || Jumei.ui.Drop.fire(d, t, !0), t.stopPropagation()
                        }
                    }, H = function (t) {
                        void 0 === t.offsetX && (t.offsetX = t.originalEvent.layerX, t.offsetY = t.originalEvent.layerY), d.isDown = !1, s && _.off("losecapture.drag"), _.off("mousemove.drag mouseup.drag"), s && _[0].releaseCapture(), E ? (k ? z ? u.copyPosition(n, e) : e.css("position", "static" === f ? "" : f) : z || e.css(l), c && h && !k && e[0].style.setExpression("top", "fuckIE6=document.documentElement.scrollTop+" + (y.top - g.scrollTop()) + '+"px"'), E = !1, Jumei.ui.Drop && Jumei.ui.Drop.fire(d, t, !1)) : z || "static" !== f || e.css("position", ""), k && n.remove(), v.trigger("likedragend"), t.stopPropagation()
                    };
                z && "static" === f && e.css("position", "relative"), d.moveHand && v.css("cursor", "move"), v.on("mousedown.drag", T), d.originHandle = v, d.target = e, y.__o__ = d
            }
        };
    d.prototype = {
        destroy: function () {
            if (this.__o__) {
                var e = this.__o__;
                e.originHandle.css("cursor", "").off("mousedown.drag likedragstart likedragend"), e.isDown && e.handle.trigger("mouseup"), e.target.off("likedrag"), this.__o__ = e = null, delete this.__o__
            }
        }, on: function (e, t) {
            if (!this.__o__) return this;
            var i = this, n = this.__o__;
            return ("drag" === e ? n.target : n.originHandle).on("like" + e, function (o, a, r) {
                o.type = e, o.drag = n.target[0], a && (o.pageX = a, o.pageY = r), t.call(i, o), o.stopPropagation()
            }), this
        }, un: function (e) {
            if (!this.__o__) return this;
            var t = this.__o__;
            return ("drag" === e ? t.target : t.originHandle).off("like" + e), this
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.ui = window.Jumei.ui || {}, window.Jumei.ui.Drag = d
}), define("menuaim", function (e, t, i) {
    "use strict";

    function n(e, t) {
        var i = e, n = null, o = [], a = null, r = null, l = $.extend({
            rowSelector: "> li",
            submenuSelector: "*",
            submenuDirection: "right",
            tolerance: 75,
            enter: $.noop,
            exit: $.noop,
            activate: $.noop,
            deactivate: $.noop,
            exitMenu: $.noop
        }, t), s = l.exit, c = null;
        l.exit = function (e) {
            function t() {
                n && l.deactivate(n), n = null
            }

            c && clearTimeout(c);
            var i = o[o.length - 1], a = o[0];
            i && a && i.x - a.x > 0 ? c = setTimeout(function () {
                s(e, t)
            }, u) : s(e, t)
        };
        var u = 300, d = function (e) {
            o.push({x: e.pageX, y: e.pageY}), o.length > 3 && o.shift()
        }, f = function () {
            r && clearTimeout(r), l.exitMenu(this) && (n && l.deactivate(n), n = null)
        }, h = function () {
            r && clearTimeout(r), l.enter(this), v(this)
        }, p = function () {
            l.exit(this)
        }, m = function () {
            g(this)
        }, g = function (e) {
            e != n && (n && l.deactivate(n), l.activate(e), n = e)
        }, v = function (e) {
            var t = _();
            t ? r = setTimeout(function () {
                v(e)
            }, t) : g(e)
        }, _ = function () {
            function e(e, t) {
                return (t.y - e.y) / (t.x - e.x)
            }

            if (!n || !$(n).is(l.submenuSelector)) return 0;
            var t = i.offset(), r = {x: t.left, y: t.top - l.tolerance}, s = {x: t.left + i.outerWidth(), y: r.y},
                c = {x: t.left, y: t.top + i.outerHeight() + l.tolerance}, d = {x: t.left + i.outerWidth(), y: c.y},
                f = o[o.length - 1], h = o[0];
            if (!f) return 0;
            if (h || (h = f), h.x < t.left || h.x > d.x || h.y < t.top || h.y > d.y) return 0;
            if (a && f.x == a.x && f.y == a.y) return 0;
            var p = s, m = d;
            "left" == l.submenuDirection ? (p = c, m = r) : "below" == l.submenuDirection ? (p = d, m = c) : "above" == l.submenuDirection && (p = r, m = s);
            var g = e(f, p), v = e(f, m), _ = e(h, p), w = e(h, m);
            return g < _ && v > w ? (a = f, u) : (a = null, 0)
        };
        i.mouseleave(f).find(l.rowSelector).mouseenter(h).mouseleave(p).click(m), $(document).mousemove(d)
    }

    var o = function (e, t) {
        n(e, t)
    };
    window.Jumei = window.Jumei || {}, window.Jumei.ui = window.Jumei.ui || {}, window.Jumei.ui.menuAim = o
}), define("timer", function (e, t, i) {
    "use strict";
    var n = {
        format: "<em>DD</em><em>HH</em><em>MM</em><em>SS</em>",
        dtime: 1e3,
        scroll: !0,
        attrName: "diff",
        onStart: function () {
        },
        onEnd: function () {
        }
    }, o = {
        start: function (e, t) {
            var i = this.getDiffs(e.selector, e.attrName);
            e._timer = setInterval(function () {
                if (i.length > 0 && o.dealTimer(e, i), e.diffs && e.diffs.length > 0) for (var t = 0; t < e.diffs.length; t++) o.dealTimer(e.diffs[t].option, e.diffs[t].data)
            }, e.dtime)
        }, dealTimer: function (e, t) {
            for (var i = {}, n = 0; n < t.length; n++) {
                var a = t[n].diff = t[n].diff - e.dtime / 1e3;
                e.scroll && !o.bindScroll(t[n].$selector) || (i.$target = t[n].$selector, i.dif = a, a && a > 0 ? (i.html = Jumei.util.getDifTime(a, e.format), e.onStart.apply(i)) : (e.onEnd.apply(i), t.splice(n, 1), n--))
            }
        }, getDiffs: function (e, t) {
            var i = [];
            return e.each(function () {
                $(this).attr(t) && $(this).attr(t) > 0 && i.push({$selector: $(this), diff: $(this).attr(t)})
            }), i
        }, bindScroll: function (e) {
            var t = $(window), i = t.scrollTop(), n = i + t.height(), o = e.offset();
            return o.top + 30 > i && o.top < n
        }
    }, a = function (e, t) {
        var i = $.extend({}, n, t);
        i.selector = e, this.__o = i, o.start(this.__o)
    };
    a.prototype = {
        stop: function () {
            clearInterval(this.__o._timer)
        }, add: function (e, t) {
            var i = $.extend({}, n, t), a = {data: o.getDiffs(e, i.attrName), option: i};
            this.__o.diffs instanceof Array ? this.__o.diffs.push(a) : this.__o.diffs = [a]
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.ui = window.Jumei.ui || {}, window.Jumei.ui.TimeCounter = a
}), define("tab", function () {
    "use strict";
    var e = {auto: !1, duration: 200, easing: "swing", effects: null, interval: 3e3, init: null, trigger: "click"},
        t = {
            initLayout: function (e) {
                var t, i, n, o, a = e.contentElem, r = e.boxElem, l = r.outerWidth(), s = r.outerHeight(),
                    c = parseInt(e.menuElem.filter("data-index"));
                return "slideX" === e.effects ? (t = l, i = "width", n = "left", o = "left") : (t = s, i = "height", n = "top", o = "none"), e.wrapElem.css({
                    overflow: "hidden",
                    position: "relative",
                    width: l + "px",
                    height: s + "px"
                }), a.css(i, t * r.length + "px").css("position", "absolute"), c && a.css(n, "-" + t * c + "px"), r.css({
                    float: o,
                    display: "block"
                }), t
            }, initMenu: function (e) {
                var i, n = t.patterns[e.effects], o = e.contentElem, a = e.menuElem, r = e.trigger;
                a.each(function (e) {
                    $(this).attr("data-index", e)
                }), "click" === r ? a.on("click.tab", function (t) {
                    o.is(":animated") && o.stop(!0, !0), n(e, this)
                }) : "mouseenter" === r && a.on("mouseenter.tab", function () {
                    var t = this;
                    i = setTimeout(function () {
                        o.is(":animated") && o.stop(!0, !0), n(e, t)
                    }, 50)
                }).on("mouseleave.tab", function () {
                    clearTimeout(i), i = null
                })
            }, clear: function (e) {
                clearInterval(e.timer), e.timer = null
            }, autoRun: function (e) {
                e.timer = setInterval(function () {
                    t.patterns[e.effects](e)
                }, e.interval)
            }
        };
    t.patterns = {
        normal: function (e, t) {
            var i, n = e.menuElem, o = e.boxElem, a = n.length, r = n.filter(".current"),
                l = parseInt(r.attr("data-index"));
            a--, t ? (t = $(t), i = parseInt(t.attr("data-index"))) : (i = l === a ? 0 : l + 1, t = n.eq(i)), r.removeClass("current"), t.addClass("current").trigger("likeinit"), o.eq(l).hide(), o.eq(i).show(), e.target.trigger("likechange")
        }
    }, $.each({slideX: ["left", "width"], slideY: ["top", "height"]}, function (e, i) {
        var n = i[0], o = i[1];
        t.patterns[e] = function (e, t) {
            var i, a, r, l, s = e.boxElem, c = e.menuElem, u = e.contentElem, d = e.size, f = c.length,
                h = c.filter(".current"), p = parseInt(h.attr("data-index")), m = parseInt(u.css(o)),
                g = parseInt(u.position()[n]), v = 1, _ = {}, w = !1, x = function () {
                    e.target.trigger("likechange")
                };
            if (f--, void 0 !== t) {
                if (t = $(t), (l = parseInt(t.attr("data-index"))) === p) return;
                l > p ? (w = !1, v = l - p) : (w = !0, v = p - l)
            } else l = w ? p - 1 : p === f ? 0 : p + 1, t = c.eq(l);
            r = d * v, w ? g += r : (g -= r, p === f && (i = s.first(), a = m + "px", x = function () {
                u.css(n, "0px"), i.css("position", "").css(n, ""), e.target.trigger("likechange")
            })), _[n] = g + "px", h.removeClass("current"), t.addClass("current").trigger("likeinit"), i && i.css("position", "relative").css(n, a), u.animate(_, e.duration, e.easing, x)
        }
    });
    var i = function (i, n) {
        if (i = $(i).eq(0), n = n || {}, i.length) {
            var o = $.extend({}, e, n), a = o.effects || "normal", r = t;
            o.effects = a, o.target = i, o.menuElem = i.children("ul.tab_menu").children("li"), o.wrapElem = i.children("div.tab_wrapper"), o.contentElem = o.wrapElem.children("div.tab_content"), o.boxElem = o.contentElem.children("div.tab_box"), r.initMenu(o), a && "normal" !== a && (o.size = r.initLayout(o)), o.init && (o.init.call(i[0]), delete o.init), o.auto && (i.on("mouseenter.tab", function () {
                t.clear(o)
            }).on("mouseleave.tab", function () {
                t.autoRun(o)
            }), t.autoRun(o)), this.__o__ = o
        }
    };
    i.prototype = {
        destroy: function () {
            if (this.__o__) {
                var e = this.__o__;
                e.auto && (t.clear(e), e.target.off("mouseenter.tab mouseleave.tab")), e.target.off("likechange"), e.menuElem.off("click.tab mouseenter.tab mouseleave.tab"), this.__o__ = e = null, delete this.__o__
            }
        }, on: function (e, t) {
            if (!this.__o__) return this;
            var i = this, n = i.__o__, o = "init" === e, a = n.menuElem;
            return (o ? a.not(".current") : n.target)[o ? "one" : "on"]("like" + e, function (o) {
                var r = a.filter(".current");
                o.index = r.attr("data-index"), o.target = n.boxElem[o.index], o.menu = r[0], o.type = e, t.call(i, o), o.stopPropagation()
            }), this
        }, un: function (e) {
            return this.__o__ && this.__o__.target.off("like" + e), this
        }, pause: function () {
            var e = this.__o__;
            e && (t.clear(e), e.auto && e.target.off("mouseleave.tab"))
        }, play: function () {
            var e = this.__o__;
            e && (t.autoRun(e), e.auto && e.target.on("mouseleave.tab", function () {
                t.autoRun(e)
            }))
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.ui = window.Jumei.ui || {}, window.Jumei.ui.Tab = i
}), define("switchable", function () {
    "use strict";
    var e = {
        auto: !0,
        interval: 3e3,
        duration: 600,
        index: !0,
        customIndex: !1,
        nav: !0,
        effects: "fade",
        imglazyload: !1,
        easing: "swing",
        init: null
    };
    ~navigator.userAgent.toLowerCase().indexOf("msie 6.0") && document.execCommand("BackgroundImageCache", !1, !0);
    var t = {
        switchHandle: function (e, i) {
            var n = e.effects, o = !1, a = "number" == typeof i ? i : $(i).attr("data-index"), r = t.patterns[n];
            void 0 === a && (o = !!~i.className.indexOf("prev")), e.isAnim || r(e, a, o)
        }, loadImg: function (e) {
            $("img", e).each(function () {
                var t = $(e).attr("data-lazysrc");
                if (t) return void $(e).css("background-image", "url(" + t + ")").removeAttr("data-lazysrc");
                var i = $(this), n = i.attr("data-lazysrc");
                n && (this.src = n, i.removeAttr("data-lazysrc"))
            })
        }, initIndex: function (e) {
            var i, n = 0, o = "", a = e.itemElem.length, r = e.index;
            if ("expandSlideX" === e.effects && a--, e.customIndex) i = e.target.find(".sc_index a"), i.each(function () {
                $(this).attr("data-index", n)
            }); else {
                for (; n < a; n++) o += '<a href="#"' + (0 === n ? ' class="current"' : "") + (r ? "" : ' style="display:none"') + ' data-index="' + n + '">' + (n + 1) + "</a>";
                i = $('<div class="sc_index">' + o + "</div>").appendTo(e.target).find("a")
            }
            return (r || e.customIndex) && i.on("click.switchable", function (i) {
                !$(this).hasClass("current") && t.switchHandle(e, this), i.preventDefault()
            }), i
        }, initNav: function (e) {
            var i, n, o = e.target;
            return e.nav ? (n = '<a href="#" class="sc_prev" style="display:none"></a><a href="#" class="sc_next" style="display:none"></a>', i = $(n).appendTo(o), o.on("mouseenter.switchable", function () {
                i.show()
            }).on("mouseleave.switchable", function () {
                i.hide()
            })) : i = $("a.sc_prev,a.sc_next", o), i.on("click.switchable", function (i) {
                t.switchHandle(e, this), i.preventDefault()
            }), i
        }, initLayout: function (e) {
            var t, i, n, o = e.itemElem, a = o.outerWidth(), r = o.outerHeight(), l = e.effects,
                s = "expandSlideX" === l, c = "0px";
            return 2 === o.length && (l = e.effects = "slideX", s = !1), "slideX" === l || s ? (t = a, i = "width", n = "left") : "slideY" === l && (t = r, i = "height", n = "none"), s && (o.each(function (e) {
                $(this).attr("data-index", e)
            }), e.index = !1), e.containerElem.css({
                overflow: "hidden",
                position: "relative",
                width: a + "px",
                height: r + "px"
            }), o.css({
                float: n,
                display: "block"
            }), s && (e.containerElem.css("overflow", "visible"), e.listElem.prepend(o.last().clone()), c = 0 - t + "px", o = e.itemElem = e.listElem.children("li")), e.listElem.css(i, t * o.length + "px").css({
                position: "absolute",
                top: "0px",
                left: c
            }), t
        }, clear: function (e) {
            clearInterval(e.timer), e.timer = null
        }, autoRun: function (e) {
            e.timer = setInterval(function () {
                t.patterns[e.effects](e, void 0, !1)
            }, e.interval)
        }, addElems: function (e, t, i) {
            for (var n = e.size, o = e.listElem, a = parseInt(o.css("width")), r = parseInt(o.css("left")), l = t.length, s = 0; s < l; s++) o[i ? "prepend" : "append"](t[s]), a += n, i && (r -= n), o.css({
                width: a + "px",
                left: r + "px"
            })
        }, removeElems: function (e, t, i) {
            for (var n = e.size, o = e.listElem, a = parseInt(o.css("width")), r = parseInt(o.css("left")), l = t.length, s = 0; s < l; s++) a -= n, i || (r += n), t[s].remove(), o.css({
                width: a + "px",
                left: r + "px"
            });
            l && (e.itemElem = o.children("li"))
        }, refreshItem: function (e, i, n) {
            var o, a, r, l, s, c = (e.size, e.itemElem), u = e.indexElem, d = (e.listElem, i), f = c.length > u.length,
                h = [], p = [];
            return f ? (p.push(c[n ? "last" : "first"]()), o = c.eq(n ? 0 : d + 1)) : o = c.eq(d), a = parseInt(o.attr("data-index")), d !== a && (o = c.filter(function () {
                var e = $(this).attr("data-index");
                return (e = +e) === d
            })), r = o[n ? "prev" : "next"](), r.length || (l = c[n ? "last" : "first"](), f && (l = l[n ? "prev" : "next"]()), s = l.clone(), h.push(s), p.push(l)), t.addElems(e, h, n), function () {
                e.isAnim = !1, t.removeElems(e, p, n), e.target.trigger("likechange")
            }
        }, patterns: {
            fade: function (e, t, i) {
                var n, o, a = e.itemElem, r = e.indexElem, l = r.filter(".current"), s = parseInt(l.attr("data-index")),
                    c = a.length - 1;
                s !== t && (void 0 === t && (t = i ? 0 === s ? c : s - 1 : s === c ? 0 : s + 1), n = a.eq(s), o = a.eq(t), o.css("display", "block").trigger("loadimg").next().trigger("loadimg"), e.isAnim = !0, n.fadeOut(e.duration, e.easing, function () {
                    e.isAnim = !1, n.css("zIndex", "1"), o.css("zIndex", "2"), e.target.trigger("likechange")
                }), r.eq(s).removeClass("current"), r.eq(t).addClass("current").trigger("likeinit"))
            }
        }, init: function (e) {
            "fade" !== e.effects ? e.size = t.initLayout(e) : e.itemElem.css({
                position: "absolute",
                display: "none",
                zIndex: "1",
                top: "0px",
                left: "0px"
            }).eq(0).css({
                display: "block",
                zIndex: "2"
            }), e.indexElem = t.initIndex(e), e.navElem = t.initNav(e), e.imglazyload && e.itemElem.slice(2).one("loadimg", function () {
                t.loadImg(this)
            }), e.init && (e.init.call(e.target[0]), delete e.init), e.auto && (e.target.on("mouseenter.switchable", function () {
                t.clear(e)
            }).on("mouseleave.switchableauto", function () {
                t.autoRun(e)
            }), t.autoRun(e))
        }
    };
    $.each({slideX: ["left", "width"], slideY: ["top", "height"], expandSlideX: ["left", "width"]}, function (e, i) {
        var n = i[0], o = i[1];
        t.patterns[e] = function (i, a, r) {
            var l, s, c, u = i.itemElem, d = i.listElem, f = i.indexElem, h = f.length - 1, p = void 0 !== a,
                m = f.filter(".current"), g = parseInt(m.attr("data-index")), v = i.size, _ = parseFloat(d.css(o)),
                w = parseFloat(d.css(n)), x = 1, y = {}, b = function () {
                    i.isAnim = !1, i.target.trigger("likechange")
                };
            a = +a, g !== a && (p ? a > g ? (r = !1, x = a - g) : (r = !0, x = g - a) : a = r ? 0 === g ? h : g - 1 : g === h ? 0 : g + 1, c = v * x, r ? ("expandSlideX" === e ? b = t.refreshItem(i, a, r) : 0 === g && (l = u.last(), s = "-" + _ + "px", b = function () {
                i.isAnim = !1, d.css(n, "-" + (_ - v) + "px"), l.css("position", "").css(n, ""), i.target.trigger("likechange")
            }), w = parseFloat(d.css(n)), w += c) : ("expandSlideX" === e ? b = t.refreshItem(i, a, r) : g === h && (l = u.first(), s = _ + "px", b = function () {
                i.isAnim = !1, d.css(n, "0px"), l.css("position", "").css(n, ""), i.target.trigger("likechange")
            }), w = parseFloat(d.css(n)), w -= c), y[n] = w + "px", l && l.css("position", "relative").css(n, s), i.isAnim = !0, d.animate(y, i.duration, i.easing, b), u.eq(a).trigger("loadimg").next().trigger("loadimg"), f.eq(g).removeClass("current"), f.eq(a).addClass("current").trigger("likeinit"))
        }
    });
    var i = function (i, n) {
        if (i = $(i).eq(0), n = n || {}, i.length) {
            var o = $.extend({}, e, n), a = i.children("div.sc_container"), r = a.children("ul"), l = r.children("li");
            this.__o__ = o, l.length < 2 || ($.extend(o, {
                target: i,
                containerElem: a,
                listElem: r,
                itemElem: l,
                indexElem: null,
                navElem: null,
                size: null,
                timer: null,
                isAnim: !1
            }), t.init(o))
        }
    };
    i.prototype = {
        destroy: function () {
            if (this.__o__) {
                var e = this.__o__, i = e.target;
                e.auto && t.clear(e), i.off("mouseenter.switchable").off("mouseleave.switchable").off("mouseleave.switchableauto").off("likechange"), e.nav && e.navElem.remove(), e.index && e.indexElem.remove(), e.imglazyload && e.itemElem.slice(2).off("loadimg"), this.__o__ = e = null, delete this.__o__
            }
        }, on: function (e, t) {
            if (!this.__o__) return this;
            var i = this, n = i.__o__, o = "init" === e, a = n.indexElem;
            return (o ? a.not(".current") : n.target)[o ? "one" : "on"]("like" + e, function (o) {
                o.index = parseInt(a.filter(".current").attr("data-index")), o.target = n.itemElem[o.index], o.type = e, t.call(i, o), o.stopPropagation()
            }), this
        }, un: function (e) {
            return this.__o__ && this.__o__.target.off("like" + e), this
        }, change: function (e) {
            this.__o__ && t.switchHandle(this.__o__, +e)
        }, pause: function () {
            var e = this.__o__;
            e && (t.clear(e), e.auto && e.target.off("mouseleave.switchableauto"))
        }, play: function () {
            var e = this.__o__;
            e && (t.autoRun(e), e.auto && e.target.on("mouseleave.switchableauto", function () {
                t.autoRun(e)
            }))
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.ui = window.Jumei.ui || {}, window.Jumei.ui.Switchable = i
}), define("scrollloader", function (e, t, i) {
    "use strict";
    var n = {
        create: null,
        container: window,
        load: null,
        appendContainer: null,
        cells: 8,
        scrollType: "normal",
        serialize: function (e) {
            return e
        }
    }, o = 0, a = {
        load: function (e) {
            var t, i;
            e.isLoading = !0, e.loadEnd ? e.data.length ? a.create(e) : (e.container.off("scroll." + e.customEventName).off("resize." + e.customEventName), e.target.trigger("likecreateend").off("likecreateafter").off("likecreateend")) : e.data.length <= e.cells ? (t = e.load(), i = function (t) {
                t && (t = e.serialize(t), t.length ? (e.data = e.data.concat(t), a.create(e)) : e.target.trigger("likecreateend"))
            }, t && ("function" == typeof t.then ? t.then(i, function () {
                e.target.trigger("likeerror")
            }) : i(t))) : a.create(e)
        }, create: function (e) {
            for (var t, i = e.data, n = e.target, o = e.appendContainer || e.target, r = "", l = 0; l < e.cells; l++) i.length && (t = i.shift()) && (r += e.create(t));
            if ("" !== r && (n.trigger("likecreatebefore", [i]), o.append(r), n.trigger("likecreateafter", [i]), e.initHeight)) {
                if (n.outerHeight() + n.offset().top < e.initHeight) return void a.load(e);
                e.initHeight = null
            }
            e.isLoading = !1
        }, bindScroll: function (e) {
            e.container.on("scroll." + e.customEventName, function () {
                if (!e.isLoading) {
                    var t = e.container.scrollTop(), i = e.target.offset().top, n = e.target.outerHeight() + i,
                        o = n - 1.5 * e.containerHeight;
                    o && t >= o && ("normal" === e.scrollType ? a.load(e) : "top" === e.scrollType && t < n && a.load(e))
                }
            })
        }, bindResize: function (e) {
            e.container.on("resize." + e.customEventName, function () {
                e.containerHeight = e.container.height()
            })
        }, init: function (e) {
            var t = e.container.scrollTop(), i = e.containerHeight + t, n = e.target.offset().top;
            a.bindScroll(e), a.bindResize(e), n <= i && (a.load(e), e.initHeight = t + Math.round(1.5 * e.containerHeight))
        }
    }, r = function (e, t) {
        if (e = $(e).eq(0), t = t || {}, e.length) {
            var i = $.extend({}, n, t);
            this.__o__ = i, i.container = $(i.container), i.appendContainer = i.appendContainer ? $(i.appendContainer) : null, o++, $.extend(i, {
                target: e,
                containerHeight: i.container.height(),
                data: [],
                isLoading: !1,
                loadEnd: !1,
                createEnd: !1,
                initHeight: null,
                customEventName: "scrollload" + o
            }), a.init(i)
        }
    };
    r.prototype = {
        destroy: function () {
            var e = this.__o__;
            e.container.off("scroll." + e.customEventName).off("resize." + e.customEventName), e.target.off("likecreateafter").off("likecreateend"), this.__o__ = e = null, delete this.__o__
        }, on: function (e, t) {
            if (this.__o__) {
                var i = this;
                this.__o__.target.on("like" + e, function (n, o) {
                    n.type = e, n.extraData = o, t.call(i, n), n.stopPropagation()
                })
            }
            return this
        }, un: function (e) {
            return this.__o__ && this.__o__.target.off("like" + e), this
        }, loadEnd: function () {
            this.__o__.loadEnd = !0
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.ui = window.Jumei.ui || {}, window.Jumei.ui.ScrollLoader = r
}), define("lazyload", function () {
    "use strict";
    var e = {
        effects: null,
        type: "img",
        trigger: "scroll",
        container: window,
        axis: "y",
        threshold: 0,
        duration: 400,
        attrName: "data-lazysrc"
    }, t = $(window);
    $.fn.__offset__ = function () {
        var e = {top: 0, left: 0}, t = this[0];
        return t && 1 === t.nodeType ? {top: t.offsetTop, left: t.offsetLeft} : e
    };
    var i = {
        triggerHandle: function (e, t) {
            var i = e.threshold, n = e.scroll;
            return t.offsetReverse >= n - i && t.offsetForward <= e.size + n + i
        }, load: {
            img: function (e, t, n) {
                var o, a = e.attrName;
                "IMG" === t[0].tagName && (o = t.attr(a)) && (e.effects && n && t.css("visibility", "hidden").one("load", function () {
                    i.effects[e.effects](e, this)
                }), t[0].src = o, t.removeAttr(a))
            }, dom: function (e, t) {
                var i, n = t.val();
                "TEXTAREA" === t[0].tagName && (i = t.parent(), i.html(n), i.trigger("likeload"), t.remove())
            }
        }, loadHandle: function (e) {
            var n, o, a, r, l, s, c = 0, u = e.data.o, d = u.elems, f = !1, h = u.type, p = u.container,
                m = $.isWindow(p[0]), g = "y" === u.axis, v = g ? "top" : "left", _ = g ? "height" : "width",
                w = g ? "outerHeight" : "outerWidth", x = g ? "scrollTop" : "scrollLeft",
                y = m ? "offset" : "__offset__", b = i.triggerHandle;
            for (u.scroll = p[x](), u.size = p[_](), u.isReverse = u.scroll < u.originalScroll, u.originalScroll = u.scroll, e && "scroll" !== (s = e.type) && "resize" !== s && (f = !0); c < d.length; c++) {
                if (r = $(d[c]), f) n = f; else {
                    if (l = r.parent(), !l.length) continue;
                    a = l[y]()[v], o = {offsetForward: a, offsetReverse: a + l[w]()}, n = b(u, o)
                }
                n && (n = !1, i.load[h](u, r, "scroll" === s), d.splice(c--, 1))
            }
            d && !d.length && (p.off(s + ".lazyload"), t.off("resize.lazyload"), d = null)
        }
    };
    i.effects = {
        fade: function (e, t) {
            $(t).css({display: "none", visibility: ""}).fadeIn(e.duration)
        }
    }, $.each({slideX: ["left", "width"], slideY: ["top", "height"]}, function (e, t) {
        var n = t[0], o = t[1];
        i.effects[e] = function (e, t) {
            t = $(t);
            var i = t.parent(), a = {}, r = {}, l = function () {
                t.css({position: "", top: "", left: ""}), i.css({overflow: "", position: ""})
            };
            a[n] = "-" + t[o]() + "px", r[n] = "0px", i.css({
                overflow: "hidden",
                position: "relative"
            }), t.css({position: "relative", visibility: ""}).css(a).animate(r, e.duration, l)
        }
    });
    var n = function (n, o) {
        if (n = $(n), o = o || {}, n.length) {
            var a = $.extend({}, e, o), r = $.makeArray(n), l = "scroll" === a.trigger, s = $(a.container),
                c = $.isWindow(s[0]), u = l ? s : n;
            r && r.length && (a.container = s, a.elems = r, a.originalScroll = 0, a.isReverse = null, u[l ? "on" : "one"](a.trigger + ".lazyload", {o: a}, i.loadHandle), c && t.on("resize.lazyload", {o: a}, i.loadHandle), l && i.loadHandle({
                type: "scroll",
                data: {o: a}
            }), a.target = n, this.__o__ = a)
        }
    };
    n.prototype = {
        on: function (e, t) {
            if (!this.__o__) return this;
            var i = this.__o__, n = this, o = i.target, a = "img" === i.type ? e : "like" + e, r = function (i) {
                $(this).off(a), i.type = e, t.call(n, i), i.stopPropagation()
            };
            return "img" === i.type ? o.on(a, r) : o.each(function () {
                $(this).parent().on(a, r)
            }), this
        }, load: function () {
            i.loadHandle({type: "scroll", data: {o: this.__o__}})
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.ui = window.Jumei.ui || {}, window.Jumei.ui.Lazyload = n
}), define("htmlslider", function (e) {
    "use strict";
    Jumei.using("ui").HtmlSlidePlayer = function (e, i) {
        this.obj = e, this.n = 0, this.j = 0, this.first_show = 1;
        var n, o = this, a = this.obj,
            r = {fontsize: 12, right: 10, bottom: 15, time: 5e3, autosize: 0, slidearrow: !1, dot: !0};
        this.config = $.extend(r, i), this.count = $(a + " li").length, this.factory = function () {
            var e = $("<div class='slide_control'></div>");
            $(a).prepend(e), this.config.dot || e.hide(), $(a + " li").css({
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }).hide().each(function (t) {
                e.append("<a>" + (t + 1) + "</a>")
            }), this.count <= 1 && e.hide(), this.resetclass(a + " .slide_control a", 0);
            var t = $(a + " li").first(), i = $("img[lazyload]", t);
            $.each(i, function (e) {
                $(this).attr("src", $(this).attr("lazyload")).removeAttr("lazyload")
            }), t.length > 0 && t.attr("lazyload") && t.css("background-image", "url(" + t.attr("lazyload") + ")").removeAttr("lazyload"), this.slide(), this.slidearrow(), n = setInterval(this.autoplay, this.config.time), $(a + " .slide_control a").eq(0).triggerHandler("mouseover")
        }, this.slidearrow = function () {
            var e, t;
            if (this.config.slidearrow && this.count > 1) e = $('<em class="slidearrow slidearrow_l"><</em>'), t = $('<em class="slidearrow slidearrow_r">></em>'), $(a).append(e).append(t); else {
                var i = $(a).find(".img_slider_btn");
                i.length && (e = i.eq(0), t = i.eq(1))
            }
            t && e && (t.bind("click", function () {
                o.n == o.count - 1 ? $(a + " .slide_control a").eq(0).triggerHandler("mouseover") : $(a + " .slide_control a").eq(o.n + 1).triggerHandler("mouseover")
            }), e.bind("click", function () {
                0 === o.n ? $(a + " .slide_control a").eq(o.count - 1).triggerHandler("mouseover") : $(a + " .slide_control a").eq(o.n - 1).triggerHandler("mouseover")
            }))
        }, this.slide = function () {
            t.lazyhover($(a + " .slide_control a"), function () {
                if (o.j = $(this).text() - 1, o.n = o.j, !(o.j >= o.count)) {
                    if (o.first_show) o.first_show = 0, $(a + " li").eq(o.j).show().siblings("li").hide(); else {
                        var e, t = $(a + " li").eq(o.j);
                        o.count >= o.j + 1 && (e = $(a + " li").eq(o.j + 1)), t.fadeIn("200").siblings("li").fadeOut("200");
                        var i = $("img[lazyload]", t);
                        $.each(i, function (e) {
                            $(this).attr("src", $(this).attr("lazyload")).removeAttr("lazyload")
                        });
                        var n, r = t.attr("lazyload");
                        if (r || (n = t.find("a"), r = n.attr("lazyload")), void 0 !== r && (n ? n.css("background", "url(" + r + ") no-repeat center 0").removeAttr("lazyload") : t.css("background-image", "url(" + r + ")").removeAttr("lazyload"), void 0 !== e && e.length >= 1)) {
                            var l, s = e.attr("lazyload");
                            s || (l = e.find("a"), s = n.attr("lazyload")), void 0 !== s && (l ? l.css("background", "url(" + s + ") no-repeat center 0").removeAttr("lazyload") : e.css("background-image", "url(" + s + ")").removeAttr("lazyload"))
                        }
                    }
                    o.resetclass(a + " .slide_control a", o.j)
                }
            }, 200, 500)
        };
        var l = $(a + " li").length;
        $(a)[0].onmouseover = function (e) {
            clearInterval(n), l > 1 && $(a + " .img_slider_btn").css("display", "block")
        }, $(a)[0].onmouseout = function (e) {
            n = setInterval(o.autoplay, o.config.time), l > 1 && $(a + " .img_slider_btn").hide()
        }, this.autoplay = function () {
            o.n = o.n >= o.count - 1 ? 0 : ++o.n, $(a + " .slide_control a").eq(o.n).triggerHandler("mouseover")
        }, this.resetclass = function (e, t) {
            $(e).removeClass("mall_dot_hover").addClass("mall_dot"), $(e).eq(t).addClass("mall_dot_hover")
        }, this.factory()
    };
    var t = {
        lazyhover: function (e, t, i, n) {
            var o, a = 1, r = function (i) {
                return clearTimeout(o), a || e.removeData("timer"), a ? t.apply(i) : null
            }, l = i || 0, s = n || 500, c = function (t) {
                o && clearTimeout(o), o = setTimeout(function () {
                    r(t)
                }, a ? l : s), e.data("timer", o)
            };
            return e.hover(function () {
                a = 1, c(this)
            }, function () {
                a = 0, c(this)
            }), e
        }
    }
}), define("dialog", ["drag"], function (e, t, i) {
    "use strict";
    e("drag");
    var n, o, a, r, l, s, c, u, d = {
            autoClose: null,
            content: "Hello world : )",
            title: null,
            yesText: "确定",
            noText: "取消",
            yesFn: null,
            noFn: null,
            width: "320px",
            height: "auto",
            top: null,
            left: null,
            trigger: "click",
            overlay: !0,
            overlayClose: !1,
            lock: !1,
            effects: null,
            zIndex: 9999,
            drag: !1,
            topWindow: !1,
            elem: null,
            dragHandle: null
        }, f = "margin:0;padding:0;display:none;position:absolute;top:0;left:0;bottom:0;right:0;",
        h = !!~navigator.userAgent.toLowerCase().indexOf("msie 6.0"),
        p = !!~navigator.userAgent.toLowerCase().indexOf("firefox");
    $.fn.wheel = function (e, t) {
        var i = p ? "DOMMouseScroll.dialog" : "mousewheel.dialog", n = function (e) {
            var t = e.originalEvent, i = {};
            return "wheelDelta" in t ? i.wheelDelta = Math.round(t.wheelDelta) : "detail" in t && (i.wheelDelta = 40 * -t.detail), i
        };
        "on" === e ? this.on(i, function (e) {
            $.extend(e, n(e));
            t.call(this, e)
        }) : "off" === e && this.off(i)
    };
    var m = {
        appendIframe: function (e) {
            var t;
            $("select").length && !e.children("iframe.ecope_bg_iframe").length && (t = $('<iframe class="ecope_bg_iframe" frameborder="0" tabindex="-1" src="javascript:false;" style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;border:0 none;filter:alpha(opacity=0)"/>', a), e.prepend(t))
        }, createDialogBox: function (e) {
            if (!e.dialogElem) {
                var t = '<div class="ecope_dialog"style="' + f + "z-index:" + n++ + ';overflow-x:hidden;overflow-y:auto;"><div class="ecope_overlay" style="' + f + 'z-index:1;width:100%;height:100;"></div></div>';
                e.dialogElem = $(t, a), e.overlayElem = e.dialogElem.find("div.ecope_overlay")
            }
            h && m.appendIframe(e.dialogElem), u.append(e.dialogElem)
        }, createDialogContent: function (e) {
            var t, i, n, o, r, l = e.dialogElem, s = e.wrapElem, c = e.btnClose, u = e.btnYes, d = e.btnNo;
            if (e.elem) return l.append(e.elem), void e.elem.css({zIndex: 2, position: "absolute"});
            t = $.isFunction(e.yesFn), i = $.isFunction(e.noFn) || e.noFn === !0, n = t || i, r = function (t) {
                m.close(e), t && t.preventDefault()
            }, s || (o = '<div class="dg_wrapper" style="position:absolute;z-index:2;"><a href="###" class="dg_btn_close">&times;</a><div class="dg_header"' + (e.title ? "" : ' style="display:none"') + ">" + e.title + '</div><div class="dg_content">' + e.content + '</div><div class="dg_footer"' + (n ? "" : ' style="display:none"') + '><a href="###" class="dg_btn_no"' + (i ? "" : ' style="display:none"') + ">" + e.noText + '</a><a href="###" class="dg_btn_yes"' + (t ? "" : ' style="display:none"') + ">" + e.yesText + "</a></div></div>", s = $(o, a)), l.append(s), u = s.find("a.dg_btn_yes"), d = s.find("a.dg_btn_no"), t && u.on("click.dialog", function (t) {
                e.yesFn.call(l[0], t) !== !1 && m.close(e), t.preventDefault()
            }), i && (r = function (t) {
                e.noFn.call(l[0], t) !== !1 && m.close(e), this.href && t.preventDefault()
            }, d.on("click.dialog", r)), c = s.find("a.dg_btn_close"), e.lock ? c.hide() : (c.show(), c.on("click.dialog", r)), e.wrapElem = s, e.btnClose = c, e.btnYes = u, e.btnNo = d
        }, heightOverflow: function (e) {
            var t = e.elem || e.wrapElem, i = l.height(), n = t.outerHeight(), o = {};
            return n - i > 30 ? (e.overlayElem.css("height", n + 60 + "px"), o.top = "30px", o.marginTop = "", u.wheel("off")) : (e.overlayElem.css("height", "100%"), m.disableMouseWheel()), o
        }, resize: function (e) {
            var t = e.data.o, i = t.elem || t.wrapElem, n = l.width(), o = l.height(), a = l.scrollTop(),
                r = l.scrollLeft(), s = i.outerWidth(), c = i.outerHeight(), u = n / 2, d = o / 2, f = {}, p = {};
            t.top || t.left || (f.top = d + "px", f.left = u + "px", f.marginTop = "-" + c / 2 + "px", f.marginLeft = "-" + s / 2 + "px"), p = m.heightOverflow(t), h && t.dialogElem.css({
                top: a + "px",
                left: r + "px",
                width: n + "px",
                height: o + "px"
            }), p.top && (f.top = p.top, f.marginTop = p.marginTop), i.css(f)
        }, disableMouseWheel: function () {
            u.wheel("on", function (e) {
                e.preventDefault(), e.stopPropagation()
            })
        }, layout: function (e) {
            c.css({width: "100%", height: "100%", position: "relative", overflow: "hidden"});
            var t, i, n = e.dialogElem, o = e.overlayElem, a = e.elem || e.wrapElem, r = {}, s = {}, u = l.width(),
                d = l.height(), f = u / 2, p = d / 2, g = l.scrollTop(), v = l.scrollLeft(),
                _ = {visibility: "hidden", display: "block"};
            n.css("position", h ? "absolute" : "fixed"), o.css("opacity", e.overlay ? "" : "0"), n.css(_), o.css(_), a.css(_), h && n.css({
                top: g + "px",
                left: v + "px",
                width: u + "px",
                height: d + "px"
            }), e.elem || a.css({
                width: e.width,
                height: e.height
            }), t = a.outerWidth(), i = a.outerHeight(), r.position = "absolute", r.top = p + "px", r.left = f + "px", r.marginTop = "-" + i / 2 + "px", r.marginLeft = "-" + t / 2 + "px", s = m.heightOverflow(e), s.top ? (r.top = s.top, r.marginTop = s.marginTop) : (e.top && (r.top = e.top, r.marginTop = ""), e.bottom && (r.bottom = e.bottom, r.top = "auto", r.marginTop = "")), e.left && (r.left = e.left, r.marginLeft = ""), e.right && (r.right = e.right, r.left = "auto", r.marginLeft = ""),
                a.css(r)
        }, bindDrag: function (e) {
            if (e.drag) {
                var t = e.dragHandle || e.wrapElem.find("div.dg_header");
                t.length && t.is(":visible") && (e.dragObject = new Jumei.ui.Drag(e.wrapElem, {handle: t}))
            }
        }, patterns: function (e, t, i) {
            var n = e.elem || e.wrapElem, o = n[0].style, a = o.top, r = o.left, l = "from", s = "to", c = "Out",
                u = (n.offset(), parseInt(a)), d = parseInt(r), f = n.outerWidth(), h = n.outerHeight(), p = {},
                m = {opacity: "", width: "", height: "", overflow: "", top: a, left: r};
            switch (i && (l = "to", s = "from", c = "In", m.display = "none"), t) {
                case"fade":
                    p[l] = {opacity: "0", top: u - 50 + "px"}, p[s] = {opacity: "1", top: u + "px"}, p.duration = 200;
                    break;
                case"slide":
                    p[l] = {top: 0 - h / 2 + "px"}, p[s] = {top: u + "px"}, p.easing = "ease" + c + "Strong";
                    break;
                case"zoom":
                    p[l] = {
                        opacity: "0",
                        left: d + f / 2 + "px",
                        top: u + h / 2 + "px",
                        width: "0px",
                        height: "0px"
                    }, p[s] = {
                        opacity: "1",
                        left: d + "px",
                        top: u + "px",
                        width: f + "px",
                        height: h + "px"
                    }, p.duration = 200, p.easing = "ease" + c
            }
            return [p, m]
        }, open: function (e) {
            var t, i = e.dialogElem, n = e.overlayElem, o = e.elem || e.wrapElem, a = e.effects, r = function (t) {
                return function () {
                    o.css(t), m.bindDrag(e), e.elem || e.btnYes.is(":visible") && e.btnYes[0].focus(), l.on("resize.dialog", {o: e}, m.resize), e.target.trigger("likeopen")
                }
            };
            i.css("visibility", "visible"), a ? (t = function () {
                var t = $.Deferred(), i = n.css("opacity");
                return e.overlay ? n.css({visibility: "", opacity: "0"}).animate({opacity: i}, 200, function () {
                    t.resolve()
                }) : t.resolve(), t.promise()
            }, t().then(function () {
                var t = m.patterns(e, a, !1), i = t[0];
                i.complete = r(t[1]), o.css({
                    visibility: "",
                    overflow: "zoom" === a ? "hidden" : ""
                }).css(i["from"]).animate(i["to"], i.duration, i.easing, i.complete)
            })) : (e.overlay && n.css("visibility", ""), r({visibility: ""})())
        }, close: function (e, t) {
            var i, n, o = e.dialogElem, a = e.overlayElem, r = e.elem || e.wrapElem, d = e.effects;
            e.timer && (clearTimeout(e.timer), e.timer = null), n = function () {
                e.drag && (e.dragObject.destroy(), e.dragObject = null), e.wrapElem && (e.btnYes.off("click.dialog"), e.btnNo.off("click.dialog"), e.btnClose.off("click.dialog")), $("div.ecope_dialog").length || (c.css({
                    width: "",
                    height: "",
                    position: "",
                    overflow: ""
                }), u.wheel("off"), l.off("resize.dialog"), s.off("keyup.dialog")), e.overlayClose && a.off("click.dialog"), e.target.trigger("likeclose"), "function" == typeof t && t()
            }, d ? (i = function () {
                var t = $.Deferred(), i = m.patterns(e, d, !0), a = i[0];
                return a.complete = function () {
                    r.css(i[1]), o.remove(), n(), t.resolve()
                }, r.css("overflow", "zoom" === d ? "hidden" : "").css(a["from"]).animate(a["to"], a.duration, a.easing, a.complete), t.promise()
            }, i().then(function () {
                if (e.overlay) {
                    var t = a.css("opacity");
                    a.animate({opacity: "0"}, 200, function () {
                        a.css({display: "none", opacity: t}), e.elem && e.elem.hide()
                    })
                }
            })) : (o.remove(), e.elem && e.elem.hide(), n())
        }, init: function (e, t) {
            m.createDialogBox(e), m.createDialogContent(e), m.layout(e), m.open(e), e.overlayClose && e.overlayElem.on("click.dialog", function () {
                m.close(e)
            }), e.lock || s.on("keyup.dialog", function (t) {
                27 === t.which && m.close(e)
            }), e.autoClose && (e.timer = setTimeout(function () {
                m.close(e)
            }, e.autoClose))
        }
    }, g = function (e, t) {
        if (e = $(e), t = t || {}, e.length) {
            var i = $.extend({}, d, t);
            o = i.topWindow ? window.top : window, a = o.document, r = a.documentElement, l = $(o), s = $(a), c = $(r), u = $(a.body), n = i.zIndex, i.elem && (i.elem = $(i.elem).eq(0), i.elem.length || (i.elem = null)), i.dragHandle && (i.dragHandle = $(i.dragHandle).eq(0), i.dragHandle.length || (i.dragHandle = null)), e.on(i.trigger + ".dialog", function () {
                m.init(i)
            }), i.target = e, this.__o__ = i
        }
    };
    g.prototype = {
        destroy: function () {
            if (this.__o__) {
                var e = this, t = this.__o__, i = function () {
                    t.elem && (t.elem.hide(), u.append(t.elem)), t.overlayElem = t.dialogElem = null, t.target.off(t.trigger + ".dialog likeopen likeclose"), delete e.__o__
                };
                t.dialogElem.is(":visible") ? this.close(i) : i()
            }
        }, on: function (e, t) {
            if (this.__o__) {
                var i = this;
                i.__o__.target.on("like" + e, function (n) {
                    var o = i.__o__.dialogElem;
                    o && o.length && (n.type = e, n.target = o[0], t.call(i, n)), n.stopPropagation()
                })
            }
            return this
        }, un: function (e) {
            return this.__o__ && this.__o__.target.off("like" + e), this
        }, close: function (e) {
            return this.__o__ && m.close(this.__o__, e), this
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.ui = window.Jumei.ui || {}, window.Jumei.ui.Dialog = g
}), define("carousel", function () {
    "use strict";
    var e = {
        index: 0,
        indexSwitch: !1,
        imglazyload: !1,
        duration: 600,
        easing: "easeInStrong",
        singleSlide: !1,
        vertical: !1
    }, t = {
        loadImg: function (e, t) {
            var i, n, o = e.wrapOffset, a = o + e.wrapSize, r = t.offset()[e.posName];
            return !!(r >= o && r < a && (n = t.find("img"), i = n.attr("data-lazysrc"))) && (n[0].src = i, n.removeAttr("data-lazysrc"), !0)
        }, lazyLoad: function (e) {
            for (var i = e.beLoaded, n = 0; n < i.length; n++) t.loadImg(e, i[n]) && i.splice(n--, 1)
        }, slide: function (e, i) {
            var n, o, a, r = e.target, l = e.listElem, s = Math.abs(parseInt(l.css(e.posName))), c = e.wrapSize,
                u = e.listSize - c, d = e.singleSlide, f = e.itemSize, h = {};
            if (i) {
                if (0 === s) return;
                d ? (n = f, s === f && (a = "liketoStart")) : c >= s ? (n = s, a = "liketoStart") : n = c, o = "+="
            } else {
                if (s >= u) return;
                d ? (n = f, s + f >= u && (a = "liketoEnd")) : s + c >= u ? (n = u - s, a = "liketoEnd") : n = c, o = "-="
            }
            h[e.posName] = o + n + "px", l.animate(h, e.duration, e.easing, function () {
                e.imglazyload && t.lazyLoad(e), a && r.trigger(a)
            })
        }, switchHandle: function (e, i, n) {
            var o, a, r, l, s, c, u, d, f = e.target, h = e.posName, p = e.listElem, m = e.itemSize, g = {};
            e.slide && (d = e.wrapSize, o = Math.abs(parseInt(p.css(h))), a = o + d / 2, r = Math.floor(i.offset()[h]) - e.wrapOffset + o, l = e.listSize - d, r > a ? (s = r - a, s < m ? s = m : s % m != 0 && (s -= s % m), o + s >= l && (s = l - o, u = "liketoEnd"), c = "-=") : 0 !== o && (s = a - r, s % m != 0 && (s -= s % m), s >= o && (s = o, u = "liketoStart"), c = "+="), s ? (g[h] = c + s + "px", p.animate(g, e.duration, e.easing, function () {
                e.imglazyload && t.lazyLoad(e), u && f.trigger(u), f.trigger("likeslided", [i[0], i.attr("data-index")])
            })) : e.imglazyload && t.lazyLoad(e)), e.indexSwitch && n && f.trigger("likechange", [i[0], i.attr("data-index")])
        }, init: function (e) {
            var i = e.listElem, n = e.imglazyload, o = e.indexSwitch, a = e.index, r = {};
            e.wrapElem.css({
                overflow: "hidden",
                position: "relative"
            }), r[e.sizeName] = e.listSize + "px", r[e.posName] = "0px", i.css("position", "absolute").css(r), n && (e.beLoaded = []), e.itemElem.each(function (i) {
                var r = $(this);
                o && (r.attr("data-index", i), a === i && r.addClass("current")), n && !t.loadImg(e, r) && e.beLoaded.push(r)
            }), o && (i.on("click.carousel", "li", function () {
                var n = $(this);
                i.stop(!0, !0), !n.hasClass("current") && n.parent().hasClass("cs_list") && (t.switchHandle(e, n, !0), i.find("li.current").removeClass("current"), n.addClass("current"))
            }), a && t.switchHandle(e, e.itemElem.eq(+e.index))), e.slide && (e.prevElem.on("click.carousel", function (n) {
                i.stop(!0, !0), t.slide(e, !0), n.preventDefault()
            }), e.nextElem.on("click.carousel", function (n) {
                i.stop(!0, !0), t.slide(e), n.preventDefault()
            })), setTimeout(function () {
                e.target.trigger("likelayout")
            }, 50)
        }
    }, i = function (i, n) {
        i = $(i).first(), n = n || {};
        var o, a = $.extend({}, e, n);
        this.__o__ = a, a.index = +a.index, $.extend(a, {
            target: i,
            wrapElem: i.find("div.cs_wrapper"),
            listElem: i.find("ul.cs_list"),
            prevElem: i.find("a.cs_prev"),
            nextElem: i.find("a.cs_next"),
            itemElem: null,
            itemSize: null,
            listSize: null,
            wrapSize: null,
            wrapOffset: null,
            beLoaded: null,
            slide: null,
            sizeName: null,
            posName: null
        }), a.vertical ? (a.sizeName = "height", a.posName = "top") : (a.sizeName = "width", a.posName = "left"), o = "outer" + Jumei.util.capitalize(a.sizeName), a.itemElem = a.listElem.children("li"), a.itemSize = a.itemElem[o](), a.listSize = a.itemSize * a.itemElem.length, a.wrapSize = a.wrapElem[o](), a.wrapOffset = Math.floor(a.wrapElem.offset()[a.posName]), a.listSize <= a.wrapSize ? (a.prevElem.hide(), a.nextElem.hide(), a.slide = !1) : (a.prevElem.show(), a.nextElem.show(), a.slide = !0), t.init(a)
    };
    i.prototype = {
        destroy: function () {
            if (this.__o__) {
                var e = this.__o__;
                e.target.off("likechange liketoStart liketoEnd"), e.listElem.off("click.carousel"), e.prevElem.off("click.carousel"), e.nextElem.off("click.carousel"), e.itemElem.filter(".current").removeClass("current"), this.__o__ = e = null, delete this.__o__
            }
        }, on: function (e, t) {
            if (this.__o__) {
                var i = this;
                this.__o__.target.on("like" + e, function (n, o, a) {
                    o && (n.target = o, n.index = +a), n.type = e, t.call(i, n), n.stopPropagation()
                })
            }
            return this
        }, un: function (e, t) {
            return this.__o__ && this.__o__.target.off("like" + e), this
        }, change: function (e) {
            var i = this.__o__, n = i.itemElem.eq(e), o = i.listElem;
            return n.hasClass("current") || (o.stop(!0, !0), t.switchHandle(i, n), o.find("li.current").removeClass("current"), n.addClass("current")), this
        }, splice: function (e, i, n) {
            var o, a, r, l, s = this.__o__, c = s.listElem, u = s.itemElem.length;
            o = s.itemElem.eq(i), o.after(e), a = s.itemElem = c.children("li"), r = a.length, l = r - u + i + 1, s.listWidth = s.itemWidth * r, c.css("width", s.listWidth + "px"), a.each(function (e) {
                var t = $(this);
                t.attr("data-index", e), e < l && e > i && s.beLoaded.push(t)
            }), t.lazyLoad(this.__o__), $.isFunction(n) && n.call(this, o)
        }, prepend: function (e, t) {
            var i, n, o, a = this.__o__, r = a.listElem, l = a.itemElem.length, s = parseInt(r.css("left"));
            r.prepend(e), i = a.itemElem = r.children("li"), n = i.length, o = n - l, a.listWidth = a.itemWidth * n, r.css({
                width: a.listWidth + "px",
                left: s - a.itemWidth * o + "px"
            }), i.each(function (e) {
                var t = $(this);
                t.attr("data-index", e), e < o && a.beLoaded.push(t)
            }), $.isFunction(t) && t.call(this)
        }, append: function (e, t) {
            var i, n, o, a = this.__o__, r = a.listElem, l = a.itemElem.length;
            for (r.append(e), i = a.itemElem = r.children("li"), n = i.length, a.listWidth = a.itemWidth * n, r.css("width", a.listWidth + "px"), o = l - 1; o < n; o++) a.beLoaded.push(i.eq(o).attr("data-index", o));
            $.isFunction(t) && t.call(this)
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.ui = window.Jumei.ui || {}, window.Jumei.ui.Carousel = i
}), define("gotop", function () {
    var e, t = {position: {bottom: "0px", right: "0px"}, fixed: !0, isAnim: !1}, i = !1, n = !0, o = $(window),
        a = Math.round(o.height() / 2), r = function () {
            e.is(":animated") && e.stop(!0, !0)
        }, l = function () {
            o.bind("scroll.gotop", function () {
                $(this).scrollTop() > a ? i || (i = !0, r(), e.css("visibility", "visible"), e.fadeIn()) : i && (i = !1, r(), e.fadeOut(400, function () {
                    e.css({visibility: "hidden", display: "block"})
                }))
            })
        }, s = function () {
            o.unbind("scroll.gotop")
        }, c = function (t) {
            e.find("a.btn_gotop").bind("click.gotop", function (i) {
                var n;
                e.hide(), t.isAnim ? (n = Math.round(.33 * o.scrollTop()), s(), $("body,html").animate({scrollTop: 0}, n, "easeOutStrong", function () {
                    l()
                })) : o.scrollTop(0), i.preventDefault()
            })
        }, u = function (i, o) {
            $.isPlainObject(i) && (o = i, i = null), o = o || {};
            var a, r = $.extend({}, t, o), s = r.position;
            e = $("#gotop"), e.length || (n = !1, e = $('<div class="gotop" id="gotop" style="display:none;"><a href="javascript:;" class="btn_gotop">返回顶部</a></div>')), r.fixed && (i && (i = $(i).eq(0), a = Math.round(i.outerWidth() / 2), e.css({marginLeft: a + parseInt(s.left) + "px"}), s.left = "50%"), n || e.appendTo(document.body), Jumei.util.fixed(e[0], s)), l(), c(r), r.target = i, this.__o__ = r
        };
    u.prototype = {
        position: function (t) {
            var i, n = this.__o__.target;
            n && (i = Math.round(n.outerWidth() / 2), e.css({marginLeft: i + parseInt(t.left) + "px"}), t.left = "50%"), Jumei.util.fixed(e[0], t)
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.ui = window.Jumei.ui || {}, window.Jumei.ui.Gotop = u
}), define("anchorbar", function (e, t, i) {
    "use strict";
    var n = navigator.userAgent.toLowerCase(), o = n.match(/ms(ie)\s(\d+\.\d)/),
        a = null !== o && "ie" === o[1] && "6.0" === o[2], r = document.documentElement, l = $("body,html"),
        s = $(document.body), c = $(window),
        u = {hash: !1, fixedHeight: !1, animation: !1, zIndex: 1001, height: 0, lazy: !1}, d = {
            createPlaceholderElem: function (e) {
                var t, i, n, o, a, r, l, s, c, u, d, f = e.target, h = f.css("position");
                "absolute" !== h && (i = f.outerWidth(), n = f.outerHeight(), o = f.css("marginTop"), a = f.css("marginRight"), r = f.css("marginBottom"), l = f.css("marginLeft"), s = f.css("top"), c = f.css("right"), u = f.css("bottom"), d = f.css("left"), t = '<div style="width:' + i + "px;height:" + n + "px;padding:0;margin:" + o + " " + a + " " + r + " " + l + ";top:" + s + ";right:" + c + ";bottom:" + u + ";left:" + d + ';"/>', e.placeholderElem = $(t))
            }, reComuputedOffset: function (e) {
                for (var t = e.offsets, i = e.targetElems, n = e.targetElems.length, o = e.height, a = 0; a < n; a++) t[a] = i[a].offset().top - o;
                e.minScrollTop = t[e.minIndex], e.maxScrollTop = t[e.maxIndex] + i[e.maxIndex].outerHeight()
            }, monitorScroll: function (e, t) {
                var i, n, o, a = e.anchorElems, r = e.offsets, l = r.length, s = e.target.find("a.current"), c = 0;
                if (e.minScrollTop > t || e.maxScrollTop < t) s.removeClass("current"), e.hash && (window.location.hash = "#anchorbarfixed"); else for (; c < l; c++) if (i = r[c], n = r[c + 1], o = a[c], i <= t && (void 0 === n || n > t)) {
                    o.hasClass("current") || (s.removeClass("current"), o.addClass("current"), e.hash && (window.location.hash = o[0].getAttribute("href")));
                    break
                }
            }, bindClick: function (e, t, i) {
                t.on("click.anchorbar", function (n) {
                    if (e.animation) {
                        var a = e.offsets[i], r = Math.round(.33 * a);
                        r < 200 ? r = 200 : r > 600 && (r = 600), null !== o && "ie" === o[1] && parseInt(o[2]) < 9 ? l.scrollTop(a) : l.animate({scrollTop: a + 1}, r, "easeOutStrong", function () {
                            e.hash && (window.location.hash = t[0].getAttribute("href"))
                        }), n.preventDefault()
                    }
                })
            }, lazyContent: function (e) {
                for (var t, i = e.targetElems, n = c.scrollTop(), o = n + c.height(), a = 0; a < i.length; a++) if (t = i[a], "loaded" !== t.attr("loaded")) {
                    var r = t.offset();
                    if (r.top - 200 > n && r.top < o || r.top > n && r.top < o) {
                        var l = t.find("textarea").val();
                        t.attr("loaded", "loaded"), t.find("textarea").parent().html(l), t.find("textarea").css("visibility", "visible")
                    }
                }
            }, bindScroll: function (e) {
                c.on("scroll.anchorbar", function () {
                    var t = c.scrollTop(), i = e.target;
                    e.animation || e.lazy || d.lazyContent(e), e.fixed ? (e.fixedHeight || d.reComuputedOffset(e), t <= e.targetOffsetTop ? (e.fixed = !1, i.css({
                        position: "",
                        top: "",
                        left: "",
                        zIndex: ""
                    }), a && (e.placeholderElem.before(i), i[0].style.removeExpression("top")), null != e.placeholderElem && e.placeholderElem.remove(), i.trigger("likefixedend")) : d.monitorScroll(e, t)) : t > e.targetOffsetTop && (e.fixed = !0, i.css({
                        position: "fixed",
                        top: "0px",
                        left: e.targetOffsetLeft + "px",
                        zIndex: e.zIndex
                    }).before(e.placeholderElem).trigger("likefixedstart"), a && (i.css("position", "absolute"), s.append(i), i[0].style.setExpression("top", 'fuckIE6=document.documentElement.scrollTop + "px"')))
                })
            }, init: function (e) {
                var t, i, n, o = e.height, l = 0, s = 0, c = 0;
                e.items.each(function () {
                    var a = $(this), r = this.hash;
                    r.length > 1 && (i = $(r), i.length && (t = i.offset().top - o, e.offsets[c] = t, d.bindClick(e, a, c), e.anchorElems.push(a), e.targetElems.push(i), l ? t < l && (l = t, e.minIndex = c) : (l = t, e.minIndex = c), t > s && (s = t, n = i, e.maxIndex = c), c++))
                }), e.minScrollTop = l, e.maxScrollTop = s + n.outerHeight(), d.createPlaceholderElem(e), a && "fixed" !== r.currentStyle.backgroundAttachment && (r.style.backgroundImage = "url(about:blank)", r.style.backgroundAttachment = "fixed"), d.bindScroll(e)
            }
        }, f = function (e, t) {
            e = $(e);
            var i = $.extend({}, u, t), n = e.offset();
            this.__o__ = i, $.extend(i, {
                target: e,
                items: e.find("a"),
                fixed: !1,
                anchorElems: [],
                targetElems: [],
                offsets: [],
                minScrollTop: null,
                maxScrollTop: null,
                minIndex: null,
                maxIndex: null,
                placeholderElem: null,
                targetOffsetTop: n.top,
                targetOffsetLeft: n.left
            }), i.height || (i.height = e.outerHeight()), d.init(i)
        };
    f.prototype = {
        destroy: function () {
            if (this.__o__) {
                var e = this.__o__;
                e.target.off("likefixedstart likefixedend"), e.items.off("click.anchorbar"), c.off("scroll.anchorbar"), e.placeholderElem.remove(), this.__o__ = e = null, delete this.__o__
            }
        }, on: function (e, t) {
            if (!this.__o__) return this;
            var i = this;
            return i.__o__.target.on("like" + e, function (n) {
                n.type = e, t.call(i, n), n.stopPropagation()
            }), this
        }, un: function (e) {
            return this.__o__ && this.__o__.target.off("like" + e), this
        }
    }, window.Jumei = window.Jumei || {}, window.Jumei.ui = window.Jumei.ui || {}, window.Jumei.ui.Anchorbar = f
}), define("ipad-event", function () {
    "use strict";
    var e = "ipad" === Jumei.ua.device, t = $.event.special,
        i = {mouseenter: "mouseleave", mouseover: "mouseout", mouseleave: "mouseenter", mouseout: "mouseover"};
    e && (t["mouseenter"] = t["mouseover"] = {
        bindType: "touchstart", delegateType: "touchstart", handle: function (e) {
            var t = this, n = e.handleObj, o = n.origType, a = i[o], r = n.touchStatus;
            r && r !== a ? n.touchStatus = a : (n.touchStatus = e.type = o, n.handler.call(t, e))
        }
    }, t["mouseleave"] = t["mouseout"] = {
        bindType: "touchstart", delegateType: "touchstart", handle: function (e) {
            var t, n, o, a = 0, r = this, l = e.handleObj, s = l.origType, c = i[s], u = (l.touchStatus, r[$.expando]);
            if (void 0 !== u && (t = $.cache[u]) && (t = t.events)) for (t = t.touchstart, n = t.length; a < n; a++) o = t[a], o.origType === c && o.touchStatus === s && (o.touchStatus = e.type = s, l.handler.call(r, e))
        }
    }, t["click"] = {bindType: "touchstart", delegateType: "touchstart"})
}), define("easing", function () {
    var e = Math.pow, t = (Math.sin, Math.PI), i = {
        linear: function (e) {
            return e
        }, easeIn: function (e) {
            return e * e
        }, easeOut: function (e) {
            return (2 - e) * e
        }, easeBoth: function (e) {
            return (e *= 2) < 1 ? .5 * e * e : .5 * (1 - --e * (e - 2))
        }, easeInStrong: function (e) {
            return e * e * e * e
        }, easeOutStrong: function (e) {
            return 1 - --e * e * e * e
        }, easeBothStrong: function (e) {
            return (e *= 2) < 1 ? .5 * e * e * e * e : .5 * (2 - (e -= 2) * e * e * e)
        }, easeOutQuart: function (t) {
            return -(e(t - 1, 4) - 1)
        }, easeInOutExpo: function (t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * e(2, 10 * (t - 1)) : .5 * (2 - e(2, -10 * --t))
        }, easeOutExpo: function (t) {
            return 1 === t ? 1 : 1 - e(2, -10 * t)
        }, swing: function (e) {
            return .5 - Math.cos(e * t) / 2
        }, swingFrom: function (e) {
            return e * e * (2.70158 * e - 1.70158)
        }, swingTo: function (e) {
            return (e -= 1) * e * (2.70158 * e + 1.70158) + 1
        }, backIn: function (e) {
            return 1 === e && (e -= .001), e * e * (2.70158 * e - 1.70158)
        }, backOut: function (e) {
            return (e -= 1) * e * (2.70158 * e + 1.70158) + 1
        }, bounce: function (e) {
            var t = 7.5625;
            return e < 1 / 2.75 ? t * e * e : e < 2 / 2.75 ? t * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? t * (e -= 2.25 / 2.75) * e + .9375 : t * (e -= 2.625 / 2.75) * e + .984375
        }, doubleSqrt: function (e) {
            return Math.sqrt(Math.sqrt(e))
        }
    };
    $.extend($.easing, i)
}), define("ua", function (e, t, i) {
    "use strict";
    var n = [/ms(ie)\s(\d+\.\d)/, /(trident)\/\d+\.\d.+?rv\:(\d+\.\d)/, /(chrome)\/(\d+\.\d+)/, /(firefox)\/(\d+\.\d+)/, /version\/(\d+\.\d+)(?:\.\d)?.+?(safari)/, /(opera)(?:.*version)\/([\d.]+)/],
        o = navigator.userAgent.toLowerCase(), a = {};
    !function () {
        for (var e, t, i, r = n.length, l = 0; l < r && !(e = o.match(n[l])); l++) ;
        e || (e = []), t = e[1] || "", i = e[2] || 0, t && ("safari" === i && (i = t, t = "safari"), "trident" === t && (t = "ie"), a.browser = t, a.browserVersion = i)
    }(), function () {
        var e, t = o.match(/mac\s(os\sx)|(windows)\snt/);
        t && (t[1] ? e = t[1].replace(/\s/, "_") : t[2] && (e = t[2]), a.os = e)
    }(), function () {
        var e, t = o.match(/macintosh|ipad|windows/);
        t && (e = t[0], "windows" === e && (e = "pc"), a.device = e)
    }(), window.Jumei = window.Jumei || {}, window.Jumei.ua = a
}), define("util", function () {
    "use strict";
    window.Jumei = window.Jumei || {}, Jumei.using = function () {
        var e, t, i, n, o = arguments, a = this;
        if (i = o[0], n = o[1], i && i.indexOf(".")) for (t = i.split("."), e = "Jumei" == t[0] ? 1 : 0; e < t.length; e++) {
            if (!a[t[e]] && n) return null;
            a[t[e]] = a[t[e]] || {}, a = a[t[e]]
        } else a[i] = a[i] || {};
        return a
    }, function (e) {
        e.cookie = {
            set: function (e, t, i) {
                i || (i = {});
                var n = new Date, o = window.location.hostname.split(".").slice(-2).join("."), a = i.exp;
                "number" == typeof a ? n.setTime(n.getTime() + 36e5 * a) : "forever" === a ? n.setFullYear(n.getFullYear() + 50) : null === t ? (t = "", n.setTime(n.getTime() - 36e5)) : n = a instanceof Date ? a : "", document.cookie = e + "=" + encodeURIComponent(t) + (n && "; expires=" + n.toUTCString()) + "; domain=" + (i.domain || o) + "; path=" + (i.path || "/") + (i.secure ? "; secure" : "")
            }, get: function (e) {
                e += "=";
                for (var t, i = (document.cookie || "").split(";"), n = e.length, o = i.length; o--;) if (t = i[o].replace(/^\s+/, ""), t.slice(0, n) === e) return decodeURIComponent(t.slice(n)).replace(/\s+$/, "");
                return ""
            }
        }
    }(Jumei.using("util")), function (e) {
        $.extend(e, {
            throttle: function (e, t) {
                var i;
                return function () {
                    var n = this, o = arguments;
                    clearTimeout(i), i = setTimeout(function () {
                        e.apply(n, o)
                    }, t)
                }
            }, fixed: function (e, t) {
                var i, n, o, a, r, l = document.documentElement, s = e.style,
                    c = !!~navigator.userAgent.toLowerCase().indexOf("msie 6.0");
                t ? (n = t.top, o = t.bottom, a = t.right, r = t.left) : (n = "0px", r = "0px"), void 0 !== r ? s.left = r : s.right = a, c ? ("fixed" !== l.currentStyle.backgroundAttachment && (l.style.backgroundImage = "url(about:blank)", l.style.backgroundAttachment = "fixed"), void 0 !== n ? t = parseInt(n) : void 0 !== o && (i = e.offsetHeight, i || (s.visibility = "hidden", s.display = "block", i = e.offsetHeight, s.visibility = "", s.display = "none"), t = l.clientHeight - i - parseInt(o), window.onresize = function () {
                    t = l.clientHeight - i - parseInt(o), s.setExpression("top", "fuckIE6=document.documentElement.scrollTop + " + t + ' + "px"')
                }), "BODY" !== e.parentNode.tagName && document.body.appendChild(e), s.position = "absolute", s.setExpression("top", "fuckIE6=document.documentElement.scrollTop + " + t + ' + "px"')) : (s.position = "fixed", void 0 !== n ? s.top = n : s.bottom = o)
            }, capitalize: function (e) {
                var t = e.charAt(0);
                return t.toUpperCase() + e.replace(t, "")
            }, parseUrl: function (e, t) {
                e = e || (t ? window.location.hash : window.location.search);
                var i, n, o, a, r, l, s = t ? "#" : "?", c = {}, u = 0;
                if (!~e.indexOf(s) || e.slice(-1) === s) return c;
                for (i = e.slice(e.indexOf(s) + 1), n = i.split("&"), o = n.length; u < o; u++) a = n[u], r = a.indexOf("="), l = a.slice(0, r), c[l] = a.slice(r + 1);
                return c
            }, findNumIndex: function (e) {
                for (var t, i = 0; i < e.length; i++) if (t = e.charAt(i), t.match(/^\d$/g)) return i;
                return -1
            }, reallength: function (e) {
                return e.replace(/[^\x00-\xff]/g, "^^").length
            }, clipstring: function (e, t) {
                if (!e || !t) return "";
                var i = 0, n = 0, o = "";
                for (n = 0; n < e.length; n++) {
                    if (e.charCodeAt(n) > 255 ? i += 2 : i++, i > t) return o + "..";
                    o += e.charAt(n)
                }
                return e
            }, replaceNotNumber: function (e) {
                return e = e.replace(/[^\d.]/g, ""), e = e.replace(/^\./g, ""), e = e.replace(/\.{2,}/g, "."), e.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
            }, gotoAnchor: function (e) {
                var t = $(e);
                if (!(t.length < 0)) {
                    var i = $(window), n = $(window.document.documentElement);
                    navigator.userAgent.toLowerCase().indexOf("webkit") > -1 && (n = $(window.document.body));
                    var o = t.offset(), a = o.top - i.scrollTop();
                    i.height() - a < t.outerHeight() && n.animate({scrollTop: o.top}, "normal")
                }
            }, getDifTime: function (e, t) {
                var i, n, o, a, r,
                    l = {DD: "00", D: "0", HH: "00", MM: "00", SS: "00", TT: "00", H: "0", M: "0", S: "0", T: "0"};
                return e = parseInt(1e3 * e), n = e, n > 0 ? (i = parseInt(n / 864e5).toString(), l.DD = l.D = i, i.toString().length < 2 && (l.DD = "0" + i), n %= 864e5, o = parseInt(n / 36e5).toString(), l.HH = l.H = o, o.toString().length < 2 && (l.HH = "0" + o), n %= 36e5, a = parseInt(n / 6e4).toString(), l.MM = l.M = a, a.toString().length < 2 && (l.MM = "0" + a), r = parseInt(n % 6e4 / 100), n = parseInt(r / 10), l.TT = l.T = r - 10 * n, l.SS = l.S = n, n.toString().length < 2 && (l.SS = "0" + n), t.replace(/\b[DHMST]+\b/g, function (e) {
                    return l[e] || 0
                })) : ""
            }, addFavorite: function (e, t) {
                try {
                    window.external.addFavorite(e, t)
                } catch (i) {
                    try {
                        window.sidebar.addPanel(t, e, "")
                    } catch (e) {
                        alert("您的浏览器不支持点击收藏，请按快捷键Ctrl+d收藏聚美优品")
                    }
                }
            }, hoverIntent: function (e, t) {
                var i = {interval: 100, sensitivity: 6, timeout: 0};
                i = $.extend(i, t);
                var n, o, a, r, l = function (e) {
                    n = e.pageX, o = e.pageY
                }, s = function (e, t) {
                    if (t.hoverIntent_t = clearTimeout(t.hoverIntent_t), Math.sqrt((a - n) * (a - n) + (r - o) * (r - o)) < i.sensitivity) return $(t).off("mousemove.hoverIntent", l), t.hoverIntent_s = !0, i.over.apply(t, [e]);
                    a = n, r = o, t.hoverIntent_t = setTimeout(function () {
                        s(e, t)
                    }, i.interval)
                }, c = function (e, t) {
                    return t.hoverIntent_t = clearTimeout(t.hoverIntent_t), t.hoverIntent_s = !1, i.out.apply(t, [e])
                }, u = function (e) {
                    var t = $.extend({}, e), n = this;
                    n.hoverIntent_t && (n.hoverIntent_t = clearTimeout(n.hoverIntent_t)), "mouseenter" === e.type ? (a = t.pageX, r = t.pageY, $(n).on("mousemove.hoverIntent", l), n.hoverIntent_s || (n.hoverIntent_t = setTimeout(function () {
                        s(t, n)
                    }, i.interval))) : ($(n).off("mousemove.hoverIntent", l), n.hoverIntent_s && (n.hoverIntent_t = setTimeout(function () {
                        c(t, n)
                    }, i.timeout)))
                };
                return e.on({"mouseenter.hoverIntent": u, "mouseleave.hoverIntent": u}, i.selector)
            }
        })
    }(Jumei.using("util"))
}), define("ui", ["util", "ua", "easing", "ipad-event", "anchorbar", "gotop", "carousel", "dialog", "htmlslider", "lazyload", "scrollloader", "switchable", "tab", "timer", "menuaim"], function (e) {
    e("util"), e("ua"), e("easing"), e("ipad-event"), e("anchorbar"), e("gotop"), e("carousel"), e("dialog"), e("htmlslider"), e("lazyload"), e("scrollloader"), e("switchable"), e("tab"), e("timer"), e("menuaim")
});