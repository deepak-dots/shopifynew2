! function() {
    function isMoblieBrowser() {
        var e, o = !1;
        try {
            e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (o = !0)
        } catch (e) {
            console.log(e)
        }
        return o
    }
    var method;
    "undefined" == typeof Shopify && (window.Shopify = {}), void 0 === Shopify.getCart && (Shopify.getCart = function(t, e) {
        e ? "function" == typeof t ? t(e) : "function" == typeof Shopify.onCartUpdate && Shopify.onCartUpdate(e) : jQuery.getJSON("/cart.js", function(e, o) {
            "function" == typeof t ? t(e) : Shopify.onCartUpdate(e)
        })
    }), "undefined" == typeof SLVRShopify && (SLVRShopify = {}), SLVRShopify.preload = function(e, o) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t];
            SLVRShopify.loadImage(SLVRShopify.getSizedImageUrl(i, o))
        }
    }, SLVRShopify.loadImage = function(e) {
        (new Image).src = e
    }, SLVRShopify.getSizedImageUrl = function(e, o) {
        if (null == o) return e;
        if ("master" == o) return SLVRShopify.removeProtocol(e);
        var t = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
        if (null != t) {
            var i = e.split(t[0]),
                n = t[0];
            return SLVRShopify.removeProtocol(i[0] + "_" + o + n)
        }
        return null
    }, SLVRShopify.removeProtocol = function(e) {
        return e.replace(/http(s)?:/, "")
    };
    for (var noop = function() {}, methods = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], length = methods.length, console = window.console = window.console || {}; length--;) method = methods[length], console[method] || (console[method] = noop);

    function floatToString(e, o) {
        var t = e.toFixed(o).toString();
        return t.match(/^\.\d+/) ? "0" + t : t
    }

    function attributeToString(e) {
        return "string" != typeof e && "undefined" === (e += "") && (e = ""), jQuery.trim(e)
    }
    SLVRShopify.money_format = "${{amount}}", SLVRShopify.formatMoney = function(e, o) {
        if ("undefined" != typeof Shopify && void 0 !== Shopify.formatMoney) return Shopify.formatMoney(e, o);
        "string" == typeof e && (e = e.replace(".", ""));
        var t = "",
            i = /\{\{\s*(\w+)\s*\}\}/,
            n = o || this.money_format;

        function a(e, o) {
            return void 0 === e ? o : e
        }

        function s(e, o, t, i) {
            if (o = a(o, 2), t = a(t, ","), i = a(i, "."), isNaN(e) || null == e) return 0;
            var n = (e = (e / 100).toFixed(o)).split(".");
            return n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + t) + (n[1] ? i + n[1] : "")
        }
        switch (n.match(i)[1]) {
            case "amount":
                t = s(e, 2);
                break;
            case "amount_no_decimals":
                t = s(e, 0);
                break;
            case "amount_with_comma_separator":
                t = s(e, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                t = s(e, 0, ".", ",")
        }
        return n.replace(i, t)
    }, SLVRShopify.resizeImage = function(o, e) {
        try {
            if ("original" == e) return o;
            var t = o.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
            return t[1] + "_" + e + "." + t[2]
        } catch (e) {
            return o
        }
    };
    var loadjscssfile = function(e, o) {
            if ("js" == o)(t = document.createElement("script")).setAttribute("type", "text/javascript"), t.setAttribute("src", e);
            else if ("css" == o) {
                var t;
                (t = document.createElement("link")).setAttribute("rel", "stylesheet"), t.setAttribute("type", "text/css"), t.setAttribute("href", e)
            }
            void 0 !== t && document.getElementsByTagName("head")[0].appendChild(t)
        },
        list_cart_variants = [];

    function loadProductFromCart(o) {
        o.ajax({
            dataType: "json",
            url: "/cart.js",
            success: function(e) {
                var t = [];
                o.each(e.items, function(e, o) {
                    t.push(o.id)
                }), list_cart_variants = t
            }
        })
    }
    var SLVRSettings = {
            loadSettings: function(o, e) {
                o("#slvr-qv-cartform .slvr-qv-product-options").append('<div id="slvr-qv-addcart-msg" class="slvr-qv-addcart-msg" style="position: absolute !important; margin-top:15px"></div>'), null != e.cart_notify_add_format && null != e.cart_notify_in_format && (product_in_cart = e.cart_notify_add_format.replace("*", '<a href="/cart"  class="slvr-qv-msg-cart-link">').replace("%", "</a>"), product_added = e.cart_notify_in_format.replace("*", '<a href="/cart"  class="slvr-qv-msg-cart-link">').replace("%", "</a>"));

                var t = ".fancyox-view-detail .zoomWrapper img {  display: block;   }",
                    i = document.head || document.getElementsByTagName("head")[0],
                    n = document.createElement("style");
                null != e.cart_color && (t += " a.slvr-qv-cartbtn-config, input.slvr-qv-cartbtn-config {background:none repeat scroll 0 0 " + e.cart_color + " !important;}", o(".slvr-qv-cartbtn").addClass("slvr-qv-cartbtn-config"));

                null != e.sale_icon_color && (t += "  .slvr-qv-sale-settings {background-color:" + e.sale_icon_color + " !important;}", o("#slvr-qv-sale").addClass("slvr-qv-sale-settings"));
                null != e.link_color && (t += "  #slvr-qv-right a {color:" + e.link_color + ";}");
                null != e.title_color && (t += "  #slvr-qv-title strong {color:" + e.title_color + ";}");
                n.type = "text/css", n.styleSheet ? n.styleSheet.cssText = t : n.appendChild(document.createTextNode(t)), i.appendChild(n);
                var a = o(".slvr-qv-button");
                a.parent().parent().addClass("slvr-qv-image"),
                a.text(e.bnt_text);
                // a.hover(function() {
                //     o(this).css({
                //         color: e.bnt_text_hover,
                //         background: e.bnt_color_hover
                //     })
                // },
                // function() {
                //     o(this).css({
                //         color: e.bnt_text_color,
                //         "background-color": e.bnt_color
                //     })
                // }),
                // a.css({
                //     "font-family": "auto" != e.bnt_text_font ? e.bnt_text_font : "",
                //     "font-size": e.bnt_text_fontsize,
                //     top: "top" == e.bnt_possition ? "20%" : "bottom" == e.bnt_possition ? "80%" : "5%0",
                //     color: e.bnt_text_color,
                //     "background-color": e.bnt_color
                // }), isMoblieBrowser() || isTablet() ? e.btn_mobile_display && "normal" != e.btn_mobile_display ? "always_show" == e.btn_mobile_display ? (o('.slvr-qv-image a[href*="/products/"]').off("click"), o('.slvr-qv-image a[href*="/products/"]').click(function(e) {
                //     e.preventDefault()
                // }), o(".slvr-qv-button").parent().show(), o(".slvr-qv-button").css("opacity", "1")) : (o('.slvr-qv-image a[href*="/products/"]').click(function(e) {
                //     e.preventDefault()
                // }), SLVRShopify.click_to_view = function() {
                //     o(this).unbind("click.click_to_view"), o('.slvr-qv-image a[href*="/products/"]').off("click"), o('.slvr-qv-image a[href*="/products/"]').click(function(e) {
                //         e.preventDefault()
                //     }), o('.slvr-qv-image a[href*="/products/"]', this).off("click"), o(".slvr-qv-button", this).trigger("click"), o(this).bind("click.click_to_view", SLVRShopify.click_to_view)
                // }, o(".slvr-qv-image").bind("click.click_to_view", SLVRShopify.click_to_view)) : (o('.slvr-qv-image a[href*="/products/"]').click(function(e) {
                //     e.preventDefault()
                // }), o(".slvr-qv-image").click(function(e) {
                //     o(".slvr-qv-image .slvr-qv-button").parent().hide(), o(".slvr-qv-button .slvr-qv-button").css("opacity", "0"), o(".slvr-qv-button", this).parent().show(), o(".slvr-qv-button", this).css("opacity", "1"), o('.slvr-qv-image a[href*="/products/"]').off("click"), o('.slvr-qv-image a[href*="/products/"]').click(function(e) {
                //         e.preventDefault()
                //     }), o('.slvr-qv-image a[href*="/products/"]', this).off("click")
                // })) : o(".slvr-qv-image").hover(function() {
                //     o(".slvr-qv-button", this).parent().show()
                // }, function() {
                //     o(".slvr-qv-button", this).parent().hide()
                // })
            }
        },
        SLVRBase64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function(e) {
                var o, t, i, n, a, s, r, c = "",
                    l = 0;
                for (e = SLVRBase64._utf8_encode(e); l < e.length;) n = (o = e.charCodeAt(l++)) >> 2, a = (3 & o) << 4 | (t = e.charCodeAt(l++)) >> 4, s = (15 & t) << 2 | (i = e.charCodeAt(l++)) >> 6, r = 63 & i, isNaN(t) ? s = r = 64 : isNaN(i) && (r = 64), c = c + this._keyStr.charAt(n) + this._keyStr.charAt(a) + this._keyStr.charAt(s) + this._keyStr.charAt(r);
                return c
            },
            decode: function(e) {
                var o, t, i, n, a, s, r = "",
                    c = 0;
                for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < e.length;) o = this._keyStr.indexOf(e.charAt(c++)) << 2 | (n = this._keyStr.indexOf(e.charAt(c++))) >> 4, t = (15 & n) << 4 | (a = this._keyStr.indexOf(e.charAt(c++))) >> 2, i = (3 & a) << 6 | (s = this._keyStr.indexOf(e.charAt(c++))), r += String.fromCharCode(o), 64 != a && (r += String.fromCharCode(t)), 64 != s && (r += String.fromCharCode(i));
                return r = SLVRBase64._utf8_decode(r)
            },
            _utf8_encode: function(e) {
                e = e.replace(/\r\n/g, "\n");
                for (var o = "", t = 0; t < e.length; t++) {
                    var i = e.charCodeAt(t);
                    i < 128 ? o += String.fromCharCode(i) : (127 < i && i < 2048 ? o += String.fromCharCode(i >> 6 | 192) : (o += String.fromCharCode(i >> 12 | 224), o += String.fromCharCode(i >> 6 & 63 | 128)), o += String.fromCharCode(63 & i | 128))
                }
                return o
            },
            _utf8_decode: function(e) {
                for (var o = "", t = 0, i = c1 = c2 = 0; t < e.length;)(i = e.charCodeAt(t)) < 128 ? (o += String.fromCharCode(i), t++) : 191 < i && i < 224 ? (c2 = e.charCodeAt(t + 1), o += String.fromCharCode((31 & i) << 6 | 63 & c2), t += 2) : (c2 = e.charCodeAt(t + 1), c3 = e.charCodeAt(t + 2), o += String.fromCharCode((15 & i) << 12 | (63 & c2) << 6 | 63 & c3), t += 3);
                return o
            }
        },
        settings;

    function slvrqvImageZoom(e, o, t, i) {
        var c, n;
        "function" != typeof Object.create && (Object.create = function(e) {
            function o() {}
            return o.prototype = e, new o
        }), n = {
            init: function(e, o) {
                var t = this;
                t.elem = o, t.$elem = c(o), t.imageSrc = t.$elem.data("zoom-image") ? t.$elem.data("zoom-image") : t.$elem.attr("src"), t.options = c.extend({}, c.fn.elevateZoom.options, e), t.options.tint && (t.options.lensColour = "none", t.options.lensOpacity = "1"), "inner" == t.options.zoomType && (t.options.showLens = !1), t.$elem.parent().removeAttr("title").removeAttr("alt"), t.zoomImage = t.imageSrc, t.refresh(1), c("#" + t.options.gallery + " a").click(function(e) {
                    return t.options.galleryActiveClass && (c("#" + t.options.gallery + " a").removeClass(t.options.galleryActiveClass), c(this).addClass(t.options.galleryActiveClass)), e.preventDefault(), c(this).data("zoom-image") ? t.zoomImagePre = c(this).data("zoom-image") : t.zoomImagePre = c(this).data("image"), t.swaptheimage(c(this).data("image"), t.zoomImagePre), !1
                })
            },
            refresh: function(e) {
                var o = this;
                setTimeout(function() {
                    o.fetch(o.imageSrc)
                }, e || o.options.refresh)
            },
            fetch: function(e) {
                var o = this,
                    t = new Image;
                t.onload = function() {
                    o.largeWidth = t.width, o.largeHeight = t.height, o.startZoom(), o.currentImage = o.imageSrc, o.options.onZoomedImageLoaded(o.$elem)
                }, t.src = e
            },
            startZoom: function() {
                var t = this;
                if (t.nzWidth = t.$elem.width(), t.nzHeight = t.$elem.height(), t.isWindowActive = !1, t.isLensActive = !1, t.isTintActive = !1, t.overWindow = !1, t.options.imageCrossfade && (t.zoomWrap = t.$elem.wrap('<div style="height:' + t.nzHeight + "px;width:" + t.nzWidth + 'px;" class="zoomWrapper" />')), t.zoomLock = 1, t.scrollingLock = !1, t.changeBgSize = !1, t.currentZoomLevel = t.options.zoomLevel, t.nzOffset = t.$elem.offset(), t.widthRatio = t.largeWidth / t.currentZoomLevel / t.nzWidth, t.heightRatio = t.largeHeight / t.currentZoomLevel / t.nzHeight, "window" == t.options.zoomType && (t.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " + String(t.options.zoomWindowBgColour) + ";width: " + String(t.options.zoomWindowWidth) + "px;height: " + String(t.options.zoomWindowHeight) + "px;float: left;background-size: " + t.largeWidth / t.currentZoomLevel + "px " + t.largeHeight / t.currentZoomLevel + "px;display: none;z-index:100;border: " + String(t.options.borderSize) + "px solid " + t.options.borderColour + ";background-repeat: no-repeat;position: absolute;"), "inner" == t.options.zoomType) {
                    var e = t.$elem.css("border-left-width");
                    t.zoomWindowStyle = "overflow: hidden;margin-left: " + String(e) + ";margin-top: " + String(e) + ";background-position: 0px 0px;width: " + String(t.nzWidth) + "px;height: " + String(t.nzHeight) + "px;float: left;display: none;cursor:" + t.options.cursor + ";px solid " + t.options.borderColour + ";background-repeat: no-repeat;position: absolute;"
                }
                "window" == t.options.zoomType && (t.nzHeight < t.options.zoomWindowWidth / t.widthRatio ? lensHeight = t.nzHeight : lensHeight = String(t.options.zoomWindowHeight / t.heightRatio), t.largeWidth < t.options.zoomWindowWidth ? lensWidth = t.nzWidth : lensWidth = t.options.zoomWindowWidth / t.widthRatio, t.lensStyle = "background-position: 0px 0px;width: " + String(t.options.zoomWindowWidth / t.widthRatio) + "px;height: " + String(t.options.zoomWindowHeight / t.heightRatio) + "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" + t.options.lensOpacity + ";filter: alpha(opacity = " + 100 * t.options.lensOpacity + "); zoom:1;width:" + lensWidth + "px;height:" + lensHeight + "px;background-color:" + t.options.lensColour + ";cursor:" + t.options.cursor + ";border: " + t.options.lensBorderSize + "px solid " + t.options.lensBorderColour + ";background-repeat: no-repeat;position: absolute;"), t.tintStyle = "display: block;position: absolute;background-color: " + t.options.tintColour + ";filter:alpha(opacity=0);opacity: 0;width: " + t.nzWidth + "px;height: " + t.nzHeight + "px;", t.lensRound = "", "lens" == t.options.zoomType && (t.lensStyle = "background-position: 0px 0px;float: left;display: none;border: " + String(t.options.borderSize) + "px solid " + t.options.borderColour + ";width:" + String(t.options.lensSize) + "px;height:" + String(t.options.lensSize) + "px;background-repeat: no-repeat;position: absolute;"), "round" == t.options.lensShape && (t.lensRound = "border-top-left-radius: " + String(t.options.lensSize / 2 + t.options.borderSize) + "px;border-top-right-radius: " + String(t.options.lensSize / 2 + t.options.borderSize) + "px;border-bottom-left-radius: " + String(t.options.lensSize / 2 + t.options.borderSize) + "px;border-bottom-right-radius: " + String(t.options.lensSize / 2 + t.options.borderSize) + "px;"), t.zoomContainer = c('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + t.nzOffset.left + "px;top:" + t.nzOffset.top + "px;height:" + t.nzHeight + "px;width:" + t.nzWidth + 'px;"></div>'), c("body").append(t.zoomContainer), t.options.containLensZoom && "lens" == t.options.zoomType && t.zoomContainer.css("overflow", "hidden"), "inner" != t.options.zoomType && (t.zoomLens = c("<div class='zoomLens' style='" + t.lensStyle + t.lensRound + "'>&nbsp;</div>").appendTo(t.zoomContainer).click(function() {
                    t.$elem.trigger("click")
                }), t.options.tint && (t.tintContainer = c("<div/>").addClass("tintContainer"), t.zoomTint = c("<div class='zoomTint' style='" + t.tintStyle + "'></div>"), t.zoomLens.wrap(t.tintContainer), t.zoomTintcss = t.zoomLens.after(t.zoomTint), t.zoomTintImage = c('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + t.nzWidth + "px; height: " + t.nzHeight + 'px;" src="' + t.imageSrc + '">').appendTo(t.zoomLens).click(function() {
                    t.$elem.trigger("click")
                }))), isNaN(t.options.zoomWindowPosition) ? t.zoomWindow = c("<div style='z-index:999;left:" + t.windowOffsetLeft + "px;top:" + t.windowOffsetTop + "px;" + t.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function() {
                    t.$elem.trigger("click")
                }) : t.zoomWindow = c("<div style='z-index:999;left:" + t.windowOffsetLeft + "px;top:" + t.windowOffsetTop + "px;" + t.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo(t.zoomContainer).click(function() {
                    t.$elem.trigger("click")
                }), t.zoomWindowContainer = c("<div/>").addClass("zoomWindowContainer").css("width", t.options.zoomWindowWidth), t.zoomWindow.wrap(t.zoomWindowContainer), "lens" == t.options.zoomType && t.zoomLens.css({
                    backgroundImage: "url('" + t.imageSrc + "')"
                }), "window" == t.options.zoomType && t.zoomWindow.css({
                    backgroundImage: "url('" + t.imageSrc + "')"
                }), "inner" == t.options.zoomType && t.zoomWindow.css({
                    backgroundImage: "url('" + t.imageSrc + "')"
                }), isMoblieBrowser() || (t.$elem.bind("touchmove", function(e) {
                    e.preventDefault();
                    var o = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    t.setPosition(o)
                }), t.zoomContainer.bind("touchmove", function(e) {
                    "inner" == t.options.zoomType && t.showHideWindow("show"), e.preventDefault();
                    var o = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    t.setPosition(o)
                }), t.zoomContainer.bind("touchend", function(e) {
                    t.showHideWindow("hide"), t.options.showLens && t.showHideLens("hide"), t.options.tint && "inner" != t.options.zoomType && t.showHideTint("hide")
                }), t.$elem.bind("touchend", function(e) {
                    t.showHideWindow("hide"), t.options.showLens && t.showHideLens("hide"), t.options.tint && "inner" != t.options.zoomType && t.showHideTint("hide")
                }), t.options.showLens && (t.zoomLens.bind("touchmove", function(e) {
                    e.preventDefault();
                    var o = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    t.setPosition(o)
                }), t.zoomLens.bind("touchend", function(e) {
                    t.showHideWindow("hide"), t.options.showLens && t.showHideLens("hide"), t.options.tint && "inner" != t.options.zoomType && t.showHideTint("hide")
                })), t.$elem.bind("mousemove", function(e) {
                    0 == t.overWindow && t.setElements("show"), t.lastX === e.clientX && t.lastY === e.clientY || (t.setPosition(e), t.currentLoc = e), t.lastX = e.clientX, t.lastY = e.clientY
                }), t.zoomContainer.bind("mousemove", function(e) {
                    0 == t.overWindow && t.setElements("show"), t.lastX === e.clientX && t.lastY === e.clientY || (t.setPosition(e), t.currentLoc = e), t.lastX = e.clientX, t.lastY = e.clientY
                }), "inner" != t.options.zoomType && t.zoomLens.bind("mousemove", function(e) {
                    t.lastX === e.clientX && t.lastY === e.clientY || (t.setPosition(e), t.currentLoc = e), t.lastX = e.clientX, t.lastY = e.clientY
                }), t.options.tint && "inner" != t.options.zoomType && t.zoomTint.bind("mousemove", function(e) {
                    t.lastX === e.clientX && t.lastY === e.clientY || (t.setPosition(e), t.currentLoc = e), t.lastX = e.clientX, t.lastY = e.clientY
                }), "inner" == t.options.zoomType && t.zoomWindow.bind("mousemove", function(e) {
                    t.lastX === e.clientX && t.lastY === e.clientY || (t.setPosition(e), t.currentLoc = e), t.lastX = e.clientX, t.lastY = e.clientY
                }), t.zoomContainer.add(t.$elem).mouseenter(function() {
                    0 == t.overWindow && t.setElements("show")
                }).mouseleave(function() {
                    t.scrollLock || t.setElements("hide")
                }), "inner" != t.options.zoomType && t.zoomWindow.mouseenter(function() {
                    t.overWindow = !0, t.setElements("hide")
                }).mouseleave(function() {
                    t.overWindow = !1
                }), t.options.zoomLevel, t.options.minZoomLevel ? t.minZoomLevel = t.options.minZoomLevel : t.minZoomLevel = 2 * t.options.scrollZoomIncrement, t.options.scrollZoom && t.zoomContainer.add(t.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function(e) {
                    t.scrollLock = !0, clearTimeout(c.data(this, "timer")), c.data(this, "timer", setTimeout(function() {
                        t.scrollLock = !1
                    }, 250));
                    var o = e.originalEvent.wheelDelta || -1 * e.originalEvent.detail;
                    return e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), 0 < o / 120 ? t.currentZoomLevel >= t.minZoomLevel && t.changeZoomLevel(t.currentZoomLevel - t.options.scrollZoomIncrement) : t.options.maxZoomLevel ? t.currentZoomLevel <= t.options.maxZoomLevel && t.changeZoomLevel(parseFloat(t.currentZoomLevel) + t.options.scrollZoomIncrement) : t.changeZoomLevel(parseFloat(t.currentZoomLevel) + t.options.scrollZoomIncrement), !1
                }))
            },
            setElements: function(e) {
                var o = this;
                if (!o.options.zoomEnabled) return !1;
                "show" == e && o.isWindowSet && ("inner" == o.options.zoomType && o.showHideWindow("show"), "window" == o.options.zoomType && o.showHideWindow("show"), o.options.showLens && o.showHideLens("show"), o.options.tint && "inner" != o.options.zoomType && o.showHideTint("show")), "hide" == e && ("window" == o.options.zoomType && o.showHideWindow("hide"), o.options.tint || o.showHideWindow("hide"), o.options.showLens && o.showHideLens("hide"), o.options.tint && o.showHideTint("hide"))
            },
            setPosition: function(e) {
                var o = this;
                if (!o.options.zoomEnabled) return !1;
                o.nzHeight = o.$elem.height(), o.nzWidth = o.$elem.width(), o.nzOffset = o.$elem.offset(), o.options.tint && "inner" != o.options.zoomType && (o.zoomTint.css({
                    top: 0
                }), o.zoomTint.css({
                    left: 0
                })), o.options.responsive && !o.options.scrollZoom && o.options.showLens && (o.nzHeight < o.options.zoomWindowWidth / o.widthRatio ? lensHeight = o.nzHeight : lensHeight = String(o.options.zoomWindowHeight / o.heightRatio), o.largeWidth < o.options.zoomWindowWidth ? lensWidth = o.nzWidth : lensWidth = o.options.zoomWindowWidth / o.widthRatio, o.widthRatio = o.largeWidth / o.nzWidth, o.heightRatio = o.largeHeight / o.nzHeight, "lens" != o.options.zoomType && (o.nzHeight < o.options.zoomWindowWidth / o.widthRatio ? lensHeight = o.nzHeight : lensHeight = String(o.options.zoomWindowHeight / o.heightRatio), o.options.zoomWindowWidth < o.options.zoomWindowWidth ? lensWidth = o.nzWidth : lensWidth = o.options.zoomWindowWidth / o.widthRatio, o.zoomLens.css("width", lensWidth), o.zoomLens.css("height", lensHeight), o.options.tint && (o.zoomTintImage.css("width", o.nzWidth), o.zoomTintImage.css("height", o.nzHeight))), "lens" == o.options.zoomType && o.zoomLens.css({
                    width: String(o.options.lensSize) + "px",
                    height: String(o.options.lensSize) + "px"
                })), o.zoomContainer.css({
                    top: o.nzOffset.top
                }), o.zoomContainer.css({
                    left: o.nzOffset.left
                }), o.mouseLeft = parseInt(e.pageX - o.nzOffset.left), o.mouseTop = parseInt(e.pageY - o.nzOffset.top), "window" == o.options.zoomType && (o.Etoppos = o.mouseTop < o.zoomLens.height() / 2, o.Eboppos = o.mouseTop > o.nzHeight - o.zoomLens.height() / 2 - 2 * o.options.lensBorderSize, o.Eloppos = o.mouseLeft < 0 + o.zoomLens.width() / 2, o.Eroppos = o.mouseLeft > o.nzWidth - o.zoomLens.width() / 2 - 2 * o.options.lensBorderSize), "inner" == o.options.zoomType && (o.Etoppos = o.mouseTop < o.nzHeight / 2 / o.heightRatio, o.Eboppos = o.mouseTop > o.nzHeight - o.nzHeight / 2 / o.heightRatio, o.Eloppos = o.mouseLeft < 0 + o.nzWidth / 2 / o.widthRatio, o.Eroppos = o.mouseLeft > o.nzWidth - o.nzWidth / 2 / o.widthRatio - 2 * o.options.lensBorderSize), o.mouseLeft <= 0 || o.mouseTop < 0 || o.mouseLeft > o.nzWidth || o.mouseTop > o.nzHeight ? o.setElements("hide") : (o.options.showLens && (o.lensLeftPos = String(o.mouseLeft - o.zoomLens.width() / 2), o.lensTopPos = String(o.mouseTop - o.zoomLens.height() / 2)), o.Etoppos && (o.lensTopPos = 0), o.Eloppos && (o.windowLeftPos = 0, o.lensLeftPos = 0, o.tintpos = 0), "window" == o.options.zoomType && (o.Eboppos && (o.lensTopPos = Math.max(o.nzHeight - o.zoomLens.height() - 2 * o.options.lensBorderSize, 0)), o.Eroppos && (o.lensLeftPos = o.nzWidth - o.zoomLens.width() - 2 * o.options.lensBorderSize)), "inner" == o.options.zoomType && (o.Eboppos && (o.lensTopPos = Math.max(o.nzHeight - 2 * o.options.lensBorderSize, 0)), o.Eroppos && (o.lensLeftPos = o.nzWidth - o.nzWidth - 2 * o.options.lensBorderSize)), "lens" == o.options.zoomType && (o.windowLeftPos = String(-1 * ((e.pageX - o.nzOffset.left) * o.widthRatio - o.zoomLens.width() / 2)), o.windowTopPos = String(-1 * ((e.pageY - o.nzOffset.top) * o.heightRatio - o.zoomLens.height() / 2)), o.zoomLens.css({
                    backgroundPosition: o.windowLeftPos + "px " + o.windowTopPos + "px"
                }), o.changeBgSize && (o.nzHeight > o.nzWidth ? ("lens" == o.options.zoomType && o.zoomLens.css({
                    "background-size": o.largeWidth / o.newvalueheight + "px " + o.largeHeight / o.newvalueheight + "px"
                }), o.zoomWindow.css({
                    "background-size": o.largeWidth / o.newvalueheight + "px " + o.largeHeight / o.newvalueheight + "px"
                })) : ("lens" == o.options.zoomType && o.zoomLens.css({
                    "background-size": o.largeWidth / o.newvaluewidth + "px " + o.largeHeight / o.newvaluewidth + "px"
                }), o.zoomWindow.css({
                    "background-size": o.largeWidth / o.newvaluewidth + "px " + o.largeHeight / o.newvaluewidth + "px"
                })), o.changeBgSize = !1), o.setWindowPostition(e)), o.options.tint && "inner" != o.options.zoomType && o.setTintPosition(e), "window" == o.options.zoomType && o.setWindowPostition(e), "inner" == o.options.zoomType && o.setWindowPostition(e), o.options.showLens && (o.fullwidth && "lens" != o.options.zoomType && (o.lensLeftPos = 0), o.zoomLens.css({
                    left: o.lensLeftPos + "px",
                    top: o.lensTopPos + "px"
                })))
            },
            showHideWindow: function(e) {
                var o = this;
                "show" == e && (o.isWindowActive || (o.options.zoomWindowFadeIn ? o.zoomWindow.stop(!0, !0, !1).fadeIn(o.options.zoomWindowFadeIn) : o.zoomWindow.show(), o.isWindowActive = !0)), "hide" == e && o.isWindowActive && (o.options.zoomWindowFadeOut ? o.zoomWindow.stop(!0, !0).fadeOut(o.options.zoomWindowFadeOut) : o.zoomWindow.hide(), o.isWindowActive = !1)
            },
            showHideLens: function(e) {
                var o = this;
                "show" == e && (o.isLensActive || (o.options.lensFadeIn ? o.zoomLens.stop(!0, !0, !1).fadeIn(o.options.lensFadeIn) : o.zoomLens.show(), o.isLensActive = !0)), "hide" == e && o.isLensActive && (o.options.lensFadeOut ? o.zoomLens.stop(!0, !0).fadeOut(o.options.lensFadeOut) : o.zoomLens.hide(), o.isLensActive = !1)
            },
            showHideTint: function(e) {
                var o = this;
                "show" == e && (o.isTintActive || (o.options.zoomTintFadeIn ? o.zoomTint.css({
                    opacity: o.options.tintOpacity
                }).animate().stop(!0, !0).fadeIn("slow") : (o.zoomTint.css({
                    opacity: o.options.tintOpacity
                }).animate(), o.zoomTint.show()), o.isTintActive = !0)), "hide" == e && o.isTintActive && (o.options.zoomTintFadeOut ? o.zoomTint.stop(!0, !0).fadeOut(o.options.zoomTintFadeOut) : o.zoomTint.hide(), o.isTintActive = !1)
            },
            setLensPostition: function(e) {},
            setWindowPostition: function(e) {
                var o = this;
                if (isNaN(o.options.zoomWindowPosition)) o.externalContainer = c("#" + o.options.zoomWindowPosition), o.externalContainerWidth = o.externalContainer.width(), o.externalContainerHeight = o.externalContainer.height(), o.externalContainerOffset = o.externalContainer.offset(), o.windowOffsetTop = o.externalContainerOffset.top, o.windowOffsetLeft = o.externalContainerOffset.left;
                else switch (o.options.zoomWindowPosition) {
                    case 1:
                        o.windowOffsetTop = o.options.zoomWindowOffety, o.windowOffsetLeft = +o.nzWidth;
                        break;
                    case 2:
                        o.options.zoomWindowHeight > o.nzHeight && (o.windowOffsetTop = -1 * (o.options.zoomWindowHeight / 2 - o.nzHeight / 2), o.windowOffsetLeft = o.nzWidth);
                        break;
                    case 3:
                        o.windowOffsetTop = o.nzHeight - o.zoomWindow.height() - 2 * o.options.borderSize, o.windowOffsetLeft = o.nzWidth;
                        break;
                    case 4:
                        o.windowOffsetTop = o.nzHeight, o.windowOffsetLeft = o.nzWidth;
                        break;
                    case 5:
                        o.windowOffsetTop = o.nzHeight, o.windowOffsetLeft = o.nzWidth - o.zoomWindow.width() - 2 * o.options.borderSize;
                        break;
                    case 6:
                        o.options.zoomWindowHeight > o.nzHeight && (o.windowOffsetTop = o.nzHeight, o.windowOffsetLeft = -1 * (o.options.zoomWindowWidth / 2 - o.nzWidth / 2 + 2 * o.options.borderSize));
                        break;
                    case 7:
                        o.windowOffsetTop = o.nzHeight, o.windowOffsetLeft = 0;
                        break;
                    case 8:
                        o.windowOffsetTop = o.nzHeight, o.windowOffsetLeft = -1 * (o.zoomWindow.width() + 2 * o.options.borderSize);
                        break;
                    case 9:
                        o.windowOffsetTop = o.nzHeight - o.zoomWindow.height() - 2 * o.options.borderSize, o.windowOffsetLeft = -1 * (o.zoomWindow.width() + 2 * o.options.borderSize);
                        break;
                    case 10:
                        o.options.zoomWindowHeight > o.nzHeight && (o.windowOffsetTop = -1 * (o.options.zoomWindowHeight / 2 - o.nzHeight / 2), o.windowOffsetLeft = -1 * (o.zoomWindow.width() + 2 * o.options.borderSize));
                        break;
                    case 11:
                        o.windowOffsetTop = o.options.zoomWindowOffety, o.windowOffsetLeft = -1 * (o.zoomWindow.width() + 2 * o.options.borderSize);
                        break;
                    case 12:
                        o.windowOffsetTop = -1 * (o.zoomWindow.height() + 2 * o.options.borderSize), o.windowOffsetLeft = -1 * (o.zoomWindow.width() + 2 * o.options.borderSize);
                        break;
                    case 13:
                        o.windowOffsetTop = -1 * (o.zoomWindow.height() + 2 * o.options.borderSize), o.windowOffsetLeft = 0;
                        break;
                    case 14:
                        o.options.zoomWindowHeight > o.nzHeight && (o.windowOffsetTop = -1 * (o.zoomWindow.height() + 2 * o.options.borderSize), o.windowOffsetLeft = -1 * (o.options.zoomWindowWidth / 2 - o.nzWidth / 2 + 2 * o.options.borderSize));
                        break;
                    case 15:
                        o.windowOffsetTop = -1 * (o.zoomWindow.height() + 2 * o.options.borderSize), o.windowOffsetLeft = o.nzWidth - o.zoomWindow.width() - 2 * o.options.borderSize;
                        break;
                    case 16:
                        o.windowOffsetTop = -1 * (o.zoomWindow.height() + 2 * o.options.borderSize), o.windowOffsetLeft = o.nzWidth;
                        break;
                    default:
                        o.windowOffsetTop = o.options.zoomWindowOffety, o.windowOffsetLeft = o.nzWidth
                }
                o.isWindowSet = !0, o.windowOffsetTop = o.windowOffsetTop + o.options.zoomWindowOffety, o.windowOffsetLeft = o.windowOffsetLeft + o.options.zoomWindowOffetx, o.zoomWindow.css({
                    top: o.windowOffsetTop
                }), o.zoomWindow.css({
                    left: o.windowOffsetLeft
                }), "inner" == o.options.zoomType && (o.zoomWindow.css({
                    top: 0
                }), o.zoomWindow.css({
                    left: 0
                })), o.windowLeftPos = String(-1 * ((e.pageX - o.nzOffset.left) * o.widthRatio - o.zoomWindow.width() / 2)), o.windowTopPos = String(-1 * ((e.pageY - o.nzOffset.top) * o.heightRatio - o.zoomWindow.height() / 2)), o.Etoppos && (o.windowTopPos = 0), o.Eloppos && (o.windowLeftPos = 0), o.Eboppos && (o.windowTopPos = -1 * (o.largeHeight / o.currentZoomLevel - o.zoomWindow.height())), o.Eroppos && (o.windowLeftPos = -1 * (o.largeWidth / o.currentZoomLevel - o.zoomWindow.width())), o.fullheight && (o.windowTopPos = 0), o.fullwidth && (o.windowLeftPos = 0), "window" != o.options.zoomType && "inner" != o.options.zoomType || (1 == o.zoomLock && (o.widthRatio <= 1 && (o.windowLeftPos = 0), o.heightRatio <= 1 && (o.windowTopPos = 0)), o.largeHeight < o.options.zoomWindowHeight && (o.windowTopPos = 0), o.largeWidth < o.options.zoomWindowWidth && (o.windowLeftPos = 0), o.options.easing ? (o.xp || (o.xp = 0), o.yp || (o.yp = 0), o.loop || (o.loop = setInterval(function() {
                    o.xp += (o.windowLeftPos - o.xp) / o.options.easingAmount, o.yp += (o.windowTopPos - o.yp) / o.options.easingAmount, o.scrollingLock ? (clearInterval(o.loop), o.xp = o.windowLeftPos, o.yp = o.windowTopPos, o.xp = -1 * ((e.pageX - o.nzOffset.left) * o.widthRatio - o.zoomWindow.width() / 2), o.yp = -1 * ((e.pageY - o.nzOffset.top) * o.heightRatio - o.zoomWindow.height() / 2), o.changeBgSize && (o.nzHeight > o.nzWidth ? ("lens" == o.options.zoomType && o.zoomLens.css({
                        "background-size": o.largeWidth / o.newvalueheight + "px " + o.largeHeight / o.newvalueheight + "px"
                    }), o.zoomWindow.css({
                        "background-size": o.largeWidth / o.newvalueheight + "px " + o.largeHeight / o.newvalueheight + "px"
                    })) : ("lens" != o.options.zoomType && o.zoomLens.css({
                        "background-size": o.largeWidth / o.newvaluewidth + "px " + o.largeHeight / o.newvalueheight + "px"
                    }), o.zoomWindow.css({
                        "background-size": o.largeWidth / o.newvaluewidth + "px " + o.largeHeight / o.newvaluewidth + "px"
                    })), o.changeBgSize = !1), o.zoomWindow.css({
                        backgroundPosition: o.windowLeftPos + "px " + o.windowTopPos + "px"
                    }), o.scrollingLock = !1, o.loop = !1) : (o.changeBgSize && (o.nzHeight > o.nzWidth ? ("lens" == o.options.zoomType && o.zoomLens.css({
                        "background-size": o.largeWidth / o.newvalueheight + "px " + o.largeHeight / o.newvalueheight + "px"
                    }), o.zoomWindow.css({
                        "background-size": o.largeWidth / o.newvalueheight + "px " + o.largeHeight / o.newvalueheight + "px"
                    })) : ("lens" != o.options.zoomType && o.zoomLens.css({
                        "background-size": o.largeWidth / o.newvaluewidth + "px " + o.largeHeight / o.newvaluewidth + "px"
                    }), o.zoomWindow.css({
                        "background-size": o.largeWidth / o.newvaluewidth + "px " + o.largeHeight / o.newvaluewidth + "px"
                    })), o.changeBgSize = !1), o.zoomWindow.css({
                        backgroundPosition: o.xp + "px " + o.yp + "px"
                    }))
                }, 16))) : (o.changeBgSize && (o.nzHeight > o.nzWidth ? ("lens" == o.options.zoomType && o.zoomLens.css({
                    "background-size": o.largeWidth / o.newvalueheight + "px " + o.largeHeight / o.newvalueheight + "px"
                }), o.zoomWindow.css({
                    "background-size": o.largeWidth / o.newvalueheight + "px " + o.largeHeight / o.newvalueheight + "px"
                })) : ("lens" == o.options.zoomType && o.zoomLens.css({
                    "background-size": o.largeWidth / o.newvaluewidth + "px " + o.largeHeight / o.newvaluewidth + "px"
                }), o.largeHeight / o.newvaluewidth < o.options.zoomWindowHeight ? o.zoomWindow.css({
                    "background-size": o.largeWidth / o.newvaluewidth + "px " + o.largeHeight / o.newvaluewidth + "px"
                }) : o.zoomWindow.css({
                    "background-size": o.largeWidth / o.newvalueheight + "px " + o.largeHeight / o.newvalueheight + "px"
                })), o.changeBgSize = !1), o.zoomWindow.css({
                    backgroundPosition: o.windowLeftPos + "px " + o.windowTopPos + "px"
                })))
            },
            setTintPosition: function(e) {
                var o = this;
                o.nzOffset = o.$elem.offset(), o.tintpos = String(-1 * (e.pageX - o.nzOffset.left - o.zoomLens.width() / 2)), o.tintposy = String(-1 * (e.pageY - o.nzOffset.top - o.zoomLens.height() / 2)), o.Etoppos && (o.tintposy = 0), o.Eloppos && (o.tintpos = 0), o.Eboppos && (o.tintposy = -1 * (o.nzHeight - o.zoomLens.height() - 2 * o.options.lensBorderSize)), o.Eroppos && (o.tintpos = -1 * (o.nzWidth - o.zoomLens.width() - 2 * o.options.lensBorderSize)), o.options.tint && (o.fullheight && (o.tintposy = 0), o.fullwidth && (o.tintpos = 0), o.zoomTintImage.css({
                    left: o.tintpos + "px"
                }), o.zoomTintImage.css({
                    top: o.tintposy + "px"
                }))
            },
            swaptheimage: function(e, o) {
                var t = this,
                    i = new Image;
                t.options.loadingIcon && c.slvrfancybox.showLoading(), t.options.onImageSwap(t.$elem), i.onload = function() {
                    t.largeWidth = i.width, t.largeHeight = i.height, t.zoomImage = o, t.zoomWindow.css({
                        "background-size": t.largeWidth + "px " + t.largeHeight + "px"
                    }), t.zoomWindow.css({
                        "background-size": t.largeWidth + "px " + t.largeHeight + "px"
                    }), t.swapAction(e, o)
                }, i.src = o
            },
            swapAction: function(e, o) {
                var t = this,
                    i = new Image;
                if (i.onload = function() {
                        t.nzHeight = i.height, t.nzWidth = i.width, t.options.onImageSwapComplete(t.$elem), t.doneCallback()
                    }, i.src = e, t.currentZoomLevel = t.options.zoomLevel, t.options.maxZoomLevel = !1, "lens" == t.options.zoomType && t.zoomLens.css({
                        backgroundImage: "url('" + o + "')"
                    }), "window" == t.options.zoomType && t.zoomWindow.css({
                        backgroundImage: "url('" + o + "')"
                    }), "inner" == t.options.zoomType && t.zoomWindow.css({
                        backgroundImage: "url('" + o + "')"
                    }), t.currentImage = o, t.options.imageCrossfade) {
                    var n = t.$elem,
                        a = n.clone();
                    if (t.$elem.attr("src", e), t.$elem.after(a), a.stop(!0).fadeOut(t.options.imageCrossfade, function() {
                            c(this).remove()
                        }), t.$elem.width("auto").removeAttr("width"), t.$elem.height("auto").removeAttr("height"), n.fadeIn(t.options.imageCrossfade), t.options.tint && "inner" != t.options.zoomType) {
                        var s = t.zoomTintImage,
                            r = s.clone();
                        t.zoomTintImage.attr("src", o), t.zoomTintImage.after(r), r.stop(!0).fadeOut(t.options.imageCrossfade, function() {
                            c(this).remove()
                        }), s.fadeIn(t.options.imageCrossfade), t.zoomTint.css({
                            height: t.$elem.height()
                        }), t.zoomTint.css({
                            width: t.$elem.width()
                        })
                    }
                    t.zoomContainer.css("height", t.$elem.height()), t.zoomContainer.css("width", t.$elem.width()), "inner" == t.options.zoomType && (t.options.constrainType || (t.zoomWrap.parent().css("height", t.$elem.height()), t.zoomWrap.parent().css("width", t.$elem.width()), t.zoomWindow.css("height", t.$elem.height()), t.zoomWindow.css("width", t.$elem.width()))), t.options.imageCrossfade && (t.zoomWrap.css("height", t.$elem.height()), t.zoomWrap.css("width", t.$elem.width()))
                } else t.$elem.attr("src", e), t.options.tint && (t.zoomTintImage.attr("src", o), t.zoomTintImage.attr("height", t.$elem.height()), t.zoomTintImage.css({
                    height: t.$elem.height()
                }), t.zoomTint.css({
                    height: t.$elem.height()
                })), t.zoomContainer.css("height", t.$elem.height()), t.zoomContainer.css("width", t.$elem.width()), t.options.imageCrossfade && (t.zoomWrap.css("height", t.$elem.height()), t.zoomWrap.css("width", t.$elem.width()));
                t.options.constrainType && ("height" == t.options.constrainType && (t.zoomContainer.css("height", t.options.constrainSize), t.zoomContainer.css("width", "auto"), t.options.imageCrossfade ? (t.zoomWrap.css("height", t.options.constrainSize), t.zoomWrap.css("width", "auto"), t.constwidth = t.zoomWrap.width()) : (t.$elem.css("height", t.options.constrainSize), t.$elem.css("width", "auto"), t.constwidth = t.$elem.width()), "inner" == t.options.zoomType && (t.zoomWrap.parent().css("height", t.options.constrainSize), t.zoomWrap.parent().css("width", t.constwidth), t.zoomWindow.css("height", t.options.constrainSize), t.zoomWindow.css("width", t.constwidth)), t.options.tint && (t.tintContainer.css("height", t.options.constrainSize), t.tintContainer.css("width", t.constwidth), t.zoomTint.css("height", t.options.constrainSize), t.zoomTint.css("width", t.constwidth), t.zoomTintImage.css("height", t.options.constrainSize), t.zoomTintImage.css("width", t.constwidth))), "width" == t.options.constrainType && (t.zoomContainer.css("height", "auto"), t.zoomContainer.css("width", t.options.constrainSize), t.options.imageCrossfade ? (t.zoomWrap.css("height", "auto"), t.zoomWrap.css("width", t.options.constrainSize), t.constheight = t.zoomWrap.height()) : (t.$elem.css("height", "auto"), t.$elem.css("width", t.options.constrainSize), t.constheight = t.$elem.height()), "inner" == t.options.zoomType && (t.zoomWrap.parent().css("height", t.constheight), t.zoomWrap.parent().css("width", t.options.constrainSize), t.zoomWindow.css("height", t.constheight), t.zoomWindow.css("width", t.options.constrainSize)), t.options.tint && (t.tintContainer.css("height", t.constheight), t.tintContainer.css("width", t.options.constrainSize), t.zoomTint.css("height", t.constheight), t.zoomTint.css("width", t.options.constrainSize), t.zoomTintImage.css("height", t.constheight), t.zoomTintImage.css("width", t.options.constrainSize))))
            },
            doneCallback: function() {
                var e = this;
                c.slvrfancybox.hideLoading(), e.nzOffset = e.$elem.offset(), e.nzWidth = e.$elem.width(), e.nzHeight = e.$elem.height(), c.slvrfancybox.slvrupdate(), e.currentZoomLevel = e.options.zoomLevel, e.widthRatio = e.largeWidth / e.nzWidth, e.heightRatio = e.largeHeight / e.nzHeight, "window" == e.options.zoomType && (e.nzHeight < e.options.zoomWindowWidth / e.widthRatio ? lensHeight = e.nzHeight : lensHeight = String(e.options.zoomWindowHeight / e.heightRatio), e.options.zoomWindowWidth < e.options.zoomWindowWidth ? lensWidth = e.nzWidth : lensWidth = e.options.zoomWindowWidth / e.widthRatio, e.zoomLens && (e.zoomLens.css("width", lensWidth), e.zoomLens.css("height", lensHeight)))
            },
            getCurrentImage: function() {
                return this.zoomImage
            },
            getGalleryList: function() {
                var o = this;
                return o.gallerylist = [], o.options.gallery ? c("#" + o.options.gallery + " a").each(function() {
                    var e = "";
                    c(this).data("zoom-image") ? e = c(this).data("zoom-image") : c(this).data("image") && (e = c(this).data("image")), e == o.zoomImage ? o.gallerylist.unshift({
                        href: "" + e,
                        title: c(this).find("img").attr("title")
                    }) : o.gallerylist.push({
                        href: "" + e,
                        title: c(this).find("img").attr("title")
                    })
                }) : o.gallerylist.push({
                    href: "" + o.zoomImage,
                    title: c(this).find("img").attr("title")
                }), o.gallerylist
            },
            changeZoomLevel: function(e) {
                var o = this;
                o.scrollingLock = !0, o.newvalue = parseFloat(e).toFixed(2), newvalue = parseFloat(e).toFixed(2), maxheightnewvalue = o.largeHeight / (o.options.zoomWindowHeight / o.nzHeight * o.nzHeight), maxwidthtnewvalue = o.largeWidth / (o.options.zoomWindowWidth / o.nzWidth * o.nzWidth), "inner" != o.options.zoomType && (maxheightnewvalue <= newvalue ? (o.heightRatio = o.largeHeight / maxheightnewvalue / o.nzHeight, o.newvalueheight = maxheightnewvalue, o.fullheight = !0) : (o.heightRatio = o.largeHeight / newvalue / o.nzHeight, o.newvalueheight = newvalue, o.fullheight = !1), maxwidthtnewvalue <= newvalue ? (o.widthRatio = o.largeWidth / maxwidthtnewvalue / o.nzWidth, o.newvaluewidth = maxwidthtnewvalue, o.fullwidth = !0) : (o.widthRatio = o.largeWidth / newvalue / o.nzWidth, o.newvaluewidth = newvalue, o.fullwidth = !1), "lens" == o.options.zoomType && (maxheightnewvalue <= newvalue ? (o.fullwidth = !0, o.newvaluewidth = maxheightnewvalue) : (o.widthRatio = o.largeWidth / newvalue / o.nzWidth, o.newvaluewidth = newvalue, o.fullwidth = !1))), "inner" == o.options.zoomType && (maxheightnewvalue = parseFloat(o.largeHeight / o.nzHeight).toFixed(2), maxwidthtnewvalue = parseFloat(o.largeWidth / o.nzWidth).toFixed(2), newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue), newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue), maxheightnewvalue <= newvalue ? (o.heightRatio = o.largeHeight / newvalue / o.nzHeight, newvalue > maxheightnewvalue ? o.newvalueheight = maxheightnewvalue : o.newvalueheight = newvalue, o.fullheight = !0) : (o.heightRatio = o.largeHeight / newvalue / o.nzHeight, newvalue > maxheightnewvalue ? o.newvalueheight = maxheightnewvalue : o.newvalueheight = newvalue, o.fullheight = !1), maxwidthtnewvalue <= newvalue ? (o.widthRatio = o.largeWidth / newvalue / o.nzWidth, newvalue > maxwidthtnewvalue ? o.newvaluewidth = maxwidthtnewvalue : o.newvaluewidth = newvalue, o.fullwidth = !0) : (o.widthRatio = o.largeWidth / newvalue / o.nzWidth, o.newvaluewidth = newvalue, o.fullwidth = !1)), scrcontinue = !1, "inner" == o.options.zoomType && (o.nzWidth > o.nzHeight && (o.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, o.fullheight = !0, o.fullwidth = !0)), o.nzHeight > o.nzWidth && (o.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, o.fullheight = !0, o.fullwidth = !0))), "inner" != o.options.zoomType && (scrcontinue = !0), scrcontinue && (o.zoomLock = 0, o.changeZoom = !0, o.options.zoomWindowHeight / o.heightRatio <= o.nzHeight && (o.currentZoomLevel = o.newvalueheight, "lens" != o.options.zoomType && "inner" != o.options.zoomType && (o.changeBgSize = !0, o.zoomLens.css({
                    height: String(o.options.zoomWindowHeight / o.heightRatio) + "px"
                })), "lens" != o.options.zoomType && "inner" != o.options.zoomType || (o.changeBgSize = !0)), o.options.zoomWindowWidth / o.widthRatio <= o.nzWidth && ("inner" != o.options.zoomType && o.newvaluewidth > o.newvalueheight && (o.currentZoomLevel = o.newvaluewidth), "lens" != o.options.zoomType && "inner" != o.options.zoomType && (o.changeBgSize = !0, o.zoomLens.css({
                    width: String(o.options.zoomWindowWidth / o.widthRatio) + "px"
                })), "lens" != o.options.zoomType && "inner" != o.options.zoomType || (o.changeBgSize = !0)), "inner" == o.options.zoomType && (o.changeBgSize = !0, o.nzWidth > o.nzHeight && (o.currentZoomLevel = o.newvaluewidth), o.nzHeight > o.nzWidth && (o.currentZoomLevel = o.newvaluewidth))), o.setPosition(o.currentLoc)
            },
            closeAll: function() {
                self.zoomWindow && self.zoomWindow.hide(), self.zoomLens && self.zoomLens.hide(), self.zoomTint && self.zoomTint.hide()
            },
            changeState: function(e) {
                "enable" == e && (this.options.zoomEnabled = !0), "disable" == e && (this.options.zoomEnabled = !1)
            }
        }, (c = e).fn.elevateZoom = function(o) {
            return this.each(function() {
                var e = Object.create(n);
                e.init(o, this), c.data(this, "elevateZoom", e)
            })
        }, c.fn.elevateZoom.options = {
            zoomActivation: "hover",
            zoomEnabled: !0,
            preloading: 1,
            zoomLevel: 1,
            scrollZoom: !1,
            scrollZoomIncrement: .1,
            minZoomLevel: !1,
            maxZoomLevel: !1,
            easing: !1,
            easingAmount: 12,
            lensSize: 200,
            zoomWindowWidth: 400,
            zoomWindowHeight: 400,
            zoomWindowOffetx: 0,
            zoomWindowOffety: 0,
            zoomWindowPosition: 1,
            zoomWindowBgColour: "#fff",
            lensFadeIn: !1,
            lensFadeOut: !1,
            debug: !1,
            zoomWindowFadeIn: !1,
            zoomWindowFadeOut: !1,
            zoomWindowAlwaysShow: !1,
            zoomTintFadeIn: !1,
            zoomTintFadeOut: !1,
            borderSize: 4,
            showLens: !0,
            borderColour: "#888",
            lensBorderSize: 1,
            lensBorderColour: "#000",
            lensShape: "square",
            zoomType: "window",
            containLensZoom: !1,
            lensColour: "white",
            lensOpacity: .4,
            lenszoom: !1,
            tint: !1,
            tintColour: "#333",
            tintOpacity: .4,
            gallery: !1,
            galleryActiveClass: "zoomGalleryActive",
            imageCrossfade: !1,
            constrainType: !1,
            constrainSize: !1,
            loadingIcon: "data:image/gif;base64,R0lGODlhGAAYAKUAAAQCBISChERCRMTCxCQiJKSipGRiZBQSFJSSlFRSVOTi5DQyNLSytHRydAwKDIyKjExKTMzOzCwqLKyqrBwaHJyanFxaXPz+/Dw6PHx6fGxqbOzq7Ly6vAQGBISGhERGRMzKzCQmJKSmpGRmZBQWFJSWlFRWVDQ2NLS2tHR2dAwODIyOjExOTNTS1CwuLKyurBweHJyenFxeXDw+PHx+fOzu7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCQA2ACwAAAAAGAAYAAAG/kCbcEg8DCIhonJJyXyEH4XCIAxVnsshLQJKRhUjW6d12XSyQkukVbF9qZrLZYAWAl5rwXekqskXSyEZAgA2MxERDF8yCHIxQh0kKkIrHCgIEgAILRESMS8kERc1FAAHBKiFJhysKCkEHiOFQgIMLCqoIQQwQy4lrBwyaB25MAdKABAiKDNoADAEJLM2Khgn1gK8dR0qDt0OACsi4+MZdTbQugQhMCXjE+MB59C5uxR6AhACFOfcKv8qptmgoMFDsywdoDlYosLEgxUrqGTBhYrCmSoeEEBsQECACzvUQhwgsU7XMRsJVjwIgAEAixQNDsxIQGLBjJYJUWkjMYLFUEIKKVJoUGHBwgkJM2YkoUZh0hIZQSU4SLVRDQ4cZAmYsrOMiRQYL1CyYwIAu68c6EBo04De1qg0AJ24KVHKABSAxMowKUSGBxLklGFjwqxMEACH5BAkJADQALAAAAAAYABgAhQQCBISChERCRMTGxCQiJKSipGRmZBQSFOzu7DQyNJSWlFRSVLSytHR2dNze3AwKDIyKjExKTCwqLGxubBwaHDw6PLy6vMzOzKyqrPz6/JyenFxaXHx+fAQGBISGhERGRCQmJKSmpGxqbBQWFDQ2NJyanLS2tHx6fOTi5AwODIyOjExOTCwuLHRydBweHDw+PLy+vNTS1Pz+/FxeXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+QJpwSDwwYCCicjmavISvS2wjJHiey2HLYiLQBJfLjNaxOC6ArHBlsUC+0vEMhcKohR1N+/WKiQ8XDg4sSwQiFWkkbRoffhscdG80CRoiQhwhIQEgABwwFiAKBSMmKBcjFAoZMjIUNCsFmQUGBCcbaUIVJR8iCKwyAx1CEh6ZIQtqLL8ILbhCAAKiJGoHKBkKB0MpLAks3K53KQQpD+QAJyrp6ZZ3LgQgBO8UHCoQ6i13NBTx/C4jFS8qCByRr0OKgweFDaGwoEUCNR0IuMim5MGHBhiRZREXj4JCGi4mnMA4w0WCJEM6jHgw4h08ihdbiEgAoMKGDSkkVDiwzwVOgA7uJAo5sECAsBE3VzzgA6JlUyEpKKTIEuGmi6UCJADg9zELgZsfyAh4keQAPHBqSNwk2GGsBBoA3LnIl6ICyg4vBNyVmm+JBBIU1QQBACH5BAkJADMALAAAAAAYABgAhQQCBISGhERCRMzKzCQiJGRiZKSmpBQSFPz+/DQyNHRydFRSVNza3JyenLy6vAwKDIyOjNTS1CwqLGxqbBwaHDw6PHx6fFxaXExKTKyurOTi5MTCxAQGBIyKjERGRMzOzCQmJGRmZKyqrBQWFDQ2NHR2dFRWVNze3KSipLy+vAwODJSSlNTW1CwuLGxubBweHDw+PHx+fFxeXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+wJlwSDw0RASicnkokIQVh2MhfMUqS2LIgHrNog7TjCP6pABZoQdlsHylYtMn0kgLARCDgQQ2qVIRAxJLLxcJaC0iKBAwUgslczFCEhAXQhMQEC4EAAp6BAEQIwYRGwcjAQwaJyMzApkrHSYvLgtoQiSMMhGrGhkcQgQKmRAeaRInqxEywEMAJDEdLWkHGwwBB0MPIBLcEq12BCEXJhcLIyEl6uqWdgMI8PAfEyUKFgolMnYzEfHwDAdaJBjYIpsdWi4STkgy5IAAE4OyAHhB4MGSByQuaISRRgWBjxSazRhRjhyGEQQoEOEw4gFKECAIGMxIDgQAEDAEcKDw4gFOBQIvAHCgCFSICgEtgB3ISeLBxxEvwamgoCJLgpwjboLI+pGAyCwUciaYAeDpjAMxVdrBCaMqBwJbyVL0YueBBLVvCYDbWXWfkhE99wUBACH5BAkJADMALAAAAAAYABgAhQQCBISChERCRMTCxCQiJKSipGRiZBQSFFRSVDQyNLSytOTi5JSWlHRydAwKDExKTMzOzCwqLKyqrBwaHFxaXDw6PLy6vIyKjGxqbPz+/JyenHx6fAQGBERGRMzKzCQmJKSmpBQWFFRWVDQ2NLS2tOTm5JyanHR2dAwODExOTNTS1CwuLKyurBweHFxeXDw+PLy+vIyOjGxubAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+wJlwSETFTBOicnlArIQJUOEhbMlGS6IodkmOQCAqx2SRALLCSiyGmUWns5TFEkMLAaf1Kip5oCQWJB9LEw8RQhFrG18FHRgWMA1CHwEiQiInJy4TAAZcLRsbIQwWLAcHGxCqBzMVmScNDyEuAmdCKwEjFDAQKhAFti0uGw0nFWgfvRADFLZ3KxgNg1kHJBAbKEMOLdwtBNl2LRQp5A8HKRTp6R12MwoL8PAKCBQiLuvtFvHwMA4f///AoSHg4p4LES2KrHiRJEuEEgsMOBPC4YOAFwIOZXGRoaOHF0MOVMD4IgGKAwJnOAgRokDHjheEEMBYgVMIAgQ43OQwgUBJCwAvPHQsccbBCgJnOOBsoZQASwIfWHWCQSGLtw8oAHxwCgBqznYocCZpGmLGAbHtbn5V+qEsAG8J7ehkNaNrW4oTUrYTsrNdEAAh+QQJCQA2ACwAAAAAGAAYAIUEAgSEgoREQkTMyswkIiRkYmSkpqTk5uQUEhRUUlQ0MjR0cnSUkpTc2ty0srT8+vwMCgxMSkwsKiwcGhxcWlw8Ojx8enyMjozU0tRsbmysrqzs7uycmpzk4uS8urwEBgSEhoRERkTMzswkJiRkZmSsqqwUFhRUVlQ0NjR0dnTc3ty0trT8/vwMDgxMTkwsLiwcHhxcXlw8Pjx8fnz08vScnpwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/kCbcEhsWQImonLZCo2EkstFJpwUXktiJLVIvqQCGwBk4ACyQsUidbJFL2GBwWBBCwGFVEryFkAYcwRLCBUwQgR6VwwXFTEGJQWHKS5CIRQUIUkJelYZCAFlLQgZHh4rCG4nMZcoCC4VRBILCi4apR4XH0ImERSqWFkEtxouukMABAknhlktBisZLUMfJtXV0nYTJyERISEIKAIyMgICwGgGGCLqGAYV5OMyCnY2JesD6xofE/z8EPQwfPk6MYHIPgLYlowYMODEGSIATBAgMCJJlhMdVHRwgGIIBIoUYUBAkNAGCg4hLmhUoaKODYkEYEiDSY3AhwEsDiBQ4CDjTIAz1Eyc+Rjzw0QTNViwYCAmgYEEWSaMGNECwAgCJibQYPHgiZ0WEwsaxWrDgtIV9GjaGJsEQgMWG4xloYbNaEUhFRxQoLdEotwsQQAAIfkECQkANgAsAAAAABgAGACFBAIEhIKEREJExMLEJCIkpKKkZGJk5OLkFBIUlJKUNDI0VFJUtLK0dHJ01NLUDAoMjIqMTEpMLCosrKqsbGpsHBocnJqcPDo8zMrM/P78XFpcvLq8fH583NrcBAYEhIaEREZEJCYkpKakZGZk5ObkFBYUlJaUNDY0VFZUdHZ01NbUDA4MjI6MTE5MLC4srK6sbG5sHB4cnJ6cPD48zM7MvL68AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv5Am3BIfIwoJaJy+TjFhKFUSiEsoSRL4kmjWdlCjdTJBkhBAoAslCv4SscXFouiFgJa3FhU/AiwIE9KKxJJNhUaKC0SYQoLECwaQjEjbTYuAjMKXjNcCAtdDSwBKysGBSIFXjEzmDMSKzMuRCEGEiAWIrloQisKmAKBSzGnIhYgaUQlFzMIaisJBQYPQwAPK9bXdTYlEawzMysxBOMhBBXaCRs1G+wm5OPm2jLs9DIepPge2hUt/f2FQh5UIOAlC4F1C5BRKwEPoJIWDmjQEEEloB4CIWI8QFBQnwsIMwLQiEgDRpVyBLeN8/CCRAQGHWj0EhFxQxoPFRDcHCcuQ0eGAh8OdOBApoWFCFnEhVhBwGeBEiqEhtDGNF4MnyJswDhwQIY2hgT0Nc2Q9UGNDg70qfFQopmNqz+FKJDRQpsSABMOVFITBAAh+QQJCQA1ACwAAAAAGAAYAIUEAgSEgoREQkTEwsQkIiSkpqRkYmTk4uQUEhSUkpRUUlQ0MjTU0tS8urx0dnQMCgyMioxMSkzMyswsKiysrqxsamwcGhycmpxcWlw8Ojz8/vwEBgSEhoRERkTExsQkJiSsqqxkZmTk5uQUFhSUlpRUVlQ0NjTc3ty8vrx8fnwMDgyMjoxMTkzMzswsLiy0srRsbmwcHhycnpxcXlw8PjwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/SLVRcEjcsBQqonK5+YyEFgzmI0R0CEviR0B71GLSSQ0wc1QAWShN4KpFS+KFw4FJCwGLNQI8m2xgcxZMI0k1CDQ0GWBTAnMRUCUZUAQEFhs1LlwPNB0PZRUPKgoQKxBJCAQflCMPEzFEBAoENAErtjBoNRsxqh8IaSOkKwE0uUMqMQReWSopEArLY6GhKpd2CAIZJtrIlKmVdjUcBeTkHJSqlIJ2EOXkEBsq8vLWaRYdEQL5v0MPFgSFlsQAUaCDsTsjvD3JEqGBwwRihDzglSqGhQQh7tSYkMKEgxcoHGasMSKdCgAFNGj4cEECjQItUCCYQMJhATQbLCBAQ0PlT4EPJw5ASMGghYMxHSAIWAJAgkoDFg6cSDBiAAMJr+zMUCkBQIygK2oYaMEgQTgZKmm4kWp2w4sWAw4qmUChAhSwQlyseBSOCAASHiTZCQIAIfkECQkANgAsAAAAABgAGACFBAIEhIKEREJExMLEJCIkpKKkZGZk5OLkFBIUNDI0lJKUVFJUtLK0dHZ01NLU9Pb0DAoMjIqMLCosrKqsbG5sHBocPDo8XFpcTEpMzMrM7OrsnJ6cvLq8fH58BAYEhIaEREZEJCYkpKakbGpsFBYUNDY0lJaUVFZUtLa0fHp83N7c/P78DA4MjI6MLC4srK6sdHJ0HB4cPD48XF5czM7M7O7sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv5Am3BI9JQsEKJy6SElbQiZoCJklajLIYlA8NhIAlnMBsBcFoBslUuNim2hywmkHsa4LEQ45llcZghMJCxCEAQhMVFTCRcXJUIkGC5CFWxelV0uCR5mJx4sIDANDUkIh1wkTYFaMhUJFA0pDRdpNh4xIYerSySiDSMJtUMsd09LEAYwIMYAECzOLF51CBaaLi4Qd1y5WGoULeAtCjDbXATdWQ3gES0RDZ8s8Xl1XwIW9xa7NiUDDxRqFUwokCGM0oYVCFGokSGiYYAQQwTUQLjCgYAOF4SkCQEjwYgCIiYUOCHEBEINIzwoUKGCQAQOFhRwEMFCQgCQJtJIQNEiUFMJFQcyEKBBIwAFDhwMkJGRwsISAAwOqDhRgYaDDyQYcEAxps4CoAwAVKXxwcYFpGXrtJCawEbVq7Y2cHhRUAkBEzMoEQ0gREIHOvSIAPjA4VGdIAAh+QQJCQA1ACwAAAAAGAAYAIUEAgSEgoREQkTMyswkIiRkYmSkoqTk5uQUEhQ0MjR0cnSUlpRUUlTc2ty0trQMCgyMiozU0tQsKixsamwcGhw8Ojx8enxcWlxMTkysqqycnpzk4uS8vrwEBgSEhoRERkTMzswkJiRkZmSkpqT8/vwUFhQ0NjR0dnScmpxUVlTc3ty8urwMDgyMjozU1tQsLixsbmwcHhw8Pjx8fnxcXlwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/SLVRcEgExAgdonLZKT2EjxCBBQ0hlsQSAVl7bKkAk6yCHbK2lBpLSqXIBK/y8Eh4eKedikxGVTb7XiExUVMhbxJCLBUhQhRoSY5IJTEACQIVHQ8mF5xJCARSBCVNV2YSCCEMFykXHwBCHTFSVmUsqzQMIa9ELEdPWB0MKSZJjazHpbUJEiHMDw0k0dEccjU0J9gKJzQH0tED1QXa2BYFBBMw6ROMcggmCfAvfUIvGS4FZSUzMya7QyUQVGxQoaGMiRYtICggMKRChIEbHFQ4wUDIKwIFXlyAgLAFBiEBBIKg0cFDBBAxZmRIEGDEAi8KOM54FULDDCoJBoBYEWPFTooTIkaMuFAjzIQESwCMiBABA4UVDiyw0JDBQBo5GE4aAFDC54kaDAyMUFAtAAgQcbr+rNGhxQgU/pbEaEG0htqvNQgoIFOtyIkRSOUEAQAh+QQJCQA2ACwAAAAAGAAYAIUEAgSEgoREQkTEwsQkIiRkYmSkoqTk4uQUEhRUUlQ0MjR0cnSUkpS0srTMzswMCgyMioxMSkwsKixsamz8+vwcGhxcWlw8Ojx8enzMysysqqycnpy8urwEBgSEhoRERkTExsQkJiRkZmSkpqTk5uQUFhRUVlQ0NjR0dnSUlpTU0tQMDgyMjoxMTkwsLixsbmz8/vwcHhxcXlw8Pjx8fny8vrwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/kCbcEgExAgdonLZKT2EjxBhJWw+l8MSAWl7bKm2IwE7XG0rtpWUijiTh+KHd2qUJpWnkQXQJYRiUVMlUiVQIWg2AzAwGRc2g0gVFR0VWwAdITMCM0koi4sbJSUIRA8lKxUXmjMKfDYCDp8BZA8zmhcVrlUiJBQJZAAnMyF3jxEtLREmEm99RzExHQMH1NQjzR8W2toRINXUGs0t2iYyFhExMuYyJiHNKxIh8iFXQhIbIBZkCBMiLkslaDhwoIIBGQkoEspAZOPEABUqHGg4MSGCED4x2kVIiGHBDCEYBtYwAQADhwYxXqRwsQBCAEoyFqCYgDHFAlISGtQYEWOETQERJliwaCHEhQV3SgCkqMHhAwINBiasgEC10JsPHDgwAFDCwIgJr4QWaLYgq7sSI77a6ICBRQBdS2LQIGoDQVqwYQooaJb0BQNmb4IAACH5BAkJADYALAAAAAAYABgAhQQCBISChERCRMzKzCQiJGRiZKSipPz6/BQSFFRSVDQyNLSytNza3HRydJSSlAwKDExKTNTS1CwqLGxqbKyqrBwaHFxaXDw6PLy6vIyOjOTi5Hx+fJyanAQGBISGhERGRMzOzCQmJGRmZKSmpPz+/BQWFFRWVDQ2NLS2tNze3HR2dJSWlAwODExOTNTW1CwuLGxubKyurBweHFxeXDw+PLy+vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+QJtwSATICB2icilbmYSPEIEl7JQeSyKHdHjZHoSp8EjIDmEkUs3GklIR4Yq5ykgnwFOjNKl8ORIANhBpKQhuJVIlVSVUNhQpKQsKAAtpIRUVHRVhAAAlYQSBEykakBkSFBuBUFcsMiFSMkMXKKUaMGYdBFJiRSYDDB9mRgQlqzYIHxDKLSFzNpoIJdMdCyAgEdcczwo0At40ChjY5CPcNOACJzImFu0JsnMPMpgVV0QhGQstZggJLWWUIGiAoWAAMzIszLDwQZEQBTEKolihYIYAIYFKQJBxwYJHC15sTMCAIkaLDhNGGKgwY0OIGSomWPngsUUgGR5EUJFgYIRKgxIZHDBUoeKiDQIf4hXxMGIEDQQZMlh40EBFAwTPaDQNAACqVBsniCZ4JkKlM68WoImIeWxJhQbCkEVNa6NCAgnPlACwsCGgmSAAIfkECQkANgAsAAAAABgAGACFBAIEhIKEREJExMLEJCIkZGJkpKKk5OLkFBIUlJKUVFJUNDI01NLUdHJ0tLa0DAoMjIqMTEpMzMrMLCosbGpsHBocnJqcXFpcPDo8/P783NrcfH58vL68BAYEhIaEREZExMbEJCYkZGZkpKak7OrsFBYUlJaUVFZUNDY0dHZ0vLq8DA4MjI6MTE5MzM7MLC4sbG5sHB4cnJ6cXF5cPD483N7cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv5Am3BILGlIE6JyWfFEhK1MpiHslB5LouegSSqkKWGMQMgOZ4fayPbNhFfkirnKORw+7RSATOgsX04ANjRpA20NCAQhJVUlK0IWDC4GLwAWaS8qIBVjMQAAJXyCBS4ukgEhJjCCVRUPcIoEMUMLI5IuFGYdZCExj0QACioSAmYAYyWsNgg0AjQ0H2VzACuvDw8AMirbHCoQczZjIbwxI9sO2wngY7yyFS0tCvCzcx0r9/fKNgQbMh9mDzBgYKQEgQgDI0ZQyVLimYAFv2xMsJBwBIQJLTAIEYQARYUJDmlIm5HQggAAF1hAKNGCQowPFxTYW/BMo40KKS5gIcCCxUcGBClSREBx4cICISUWEAQGoycKBA1StHhw4sKJiFlQsEjQgFrQJxOK0gB3QuWsFVGfdGgRU5+SEgVsrvgqhBk9cERa3s0SBAA7",
            cursor: "default",
            responsive: !0,
            onComplete: c.noop,
            onZoomedImageLoaded: function() {},
            onImageSwap: c.noop,
            onImageSwapComplete: c.noop
        }
    }

    function slvrqvFancybox(n, t, q, p) {
        "use strict";
        var a = q("html"),
            s = q(n),
            l = q(t),
            B = q.slvrfancybox = function() {
                B.open.apply(this, arguments)
            },
            r = navigator.userAgent.match(/msie/i),
            c = null,
            d = t.createTouch !== p,
            g = function(e) {
                return e && e.hasOwnProperty && e instanceof q
            },
            m = function(e) {
                return e && "string" === q.type(e)
            },
            M = function(e) {
                return m(e) && 0 < e.indexOf("%")
            },
            R = function(e, o) {
                var t = parseInt(e, 10) || 0;
                return o && M(e) && (t = B.getViewport()[o] / 100 * t), Math.ceil(t)
            },
            O = function(e, o) {
                return R(e, o) + "px"
            };
        q.extend(B, {
            version: "2.1.5",
            defaults: {
                padding: 15,
                margin: 20,
                width: 800,
                height: 600,
                minWidth: 100,
                minHeight: 100,
                maxWidth: 9999,
                maxHeight: 9999,
                pixelRatio: 2,
                autoSize: !0,
                autoHeight: !1,
                autoWidth: !1,
                autoResize: !0,
                autoCenter: !d,
                fitToView: !0,
                aspectRatio: !1,
                topRatio: .5,
                leftRatio: .5,
                scrolling: "auto",
                wrapCSS: "",
                arrows: !0,
                closeBtn: !0,
                closeClick: !1,
                nextClick: !1,
                mouseWheel: !0,
                autoPlay: !1,
                playSpeed: 3e3,
                preload: 3,
                modal: !1,
                loop: !0,
                ajax: {
                    dataType: "html",
                    headers: {
                        "X-slvr-fancybox": !0
                    }
                },
                iframe: {
                    scrolling: "auto",
                    preload: !0
                },
                swf: {
                    wmode: "transparent",
                    allowfullscreen: "true",
                    allowscriptaccess: "always"
                },
                keys: {
                    next: {
                        13: "left",
                        34: "up",
                        39: "left",
                        40: "up"
                    },
                    prev: {
                        8: "right",
                        33: "down",
                        37: "right",
                        38: "down"
                    },
                    close: [27],
                    play: [32],
                    toggle: [70]
                },
                direction: {
                    next: "left",
                    prev: "right"
                },
                scrollOutside: !0,
                index: 0,
                type: null,
                href: null,
                content: null,
                title: null,
                tpl: {
                    wrap: '<div class="slvr-fancybox-wrap" tabIndex="-1"><div class="slvr-fancybox-skin"><div class="slvr-fancybox-outer"><div class="slvr-fancybox-inner"></div></div></div></div>',
                    image: '<img class="slvr-fancybox-image" src="{href}" alt="" />',
                    iframe: '<iframe id="slvr-fancybox-frame{rnd}" name="slvr-fancybox-frame{rnd}" class="slvr-fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (r ? ' allowtransparency="true"' : "") + "></iframe>",
                    error: '<p class="slvr-fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                    closeBtn: '<a title="Close" class="slvr-fancybox-item slvr-fancybox-close" href="javascript:;"></a>',
                    next: '<a title="Next" class="slvr-fancybox-nav slvr-fancybox-next" href="javascript:;"><span></span></a>',
                    prev: '<a title="Previous" class="slvr-fancybox-nav slvr-fancybox-prev" href="javascript:;"><span></span></a>'
                },
                openEffect: "fade",
                openSpeed: 250,
                openEasing: "swing",
                openOpacity: !0,
                openMethod: "zoomIn",
                closeEffect: "fade",
                closeSpeed: 250,
                closeEasing: "swing",
                closeOpacity: !0,
                closeMethod: "zoomOut",
                nextEffect: "elastic",
                nextSpeed: 250,
                nextEasing: "swing",
                nextMethod: "changeIn",
                prevEffect: "elastic",
                prevSpeed: 250,
                prevEasing: "swing",
                prevMethod: "changeOut",
                helpers: {
                    overlay: !0,
                    title: !0
                },
                onCancel: q.noop,
                beforeLoad: q.noop,
                afterLoad: q.noop,
                beforeShow: q.noop,
                afterShow: q.noop,
                beforeChange: q.noop,
                beforeClose: q.noop,
                afterClose: q.noop
            },
            group: {},
            opts: {},
            previous: null,
            coming: null,
            current: null,
            isActive: !1,
            isOpen: !1,
            isOpened: !1,
            wrap: null,
            skin: null,
            outer: null,
            inner: null,
            player: {
                timer: null,
                isActive: !1
            },
            ajaxLoad: null,
            imgPreload: null,
            transitions: {},
            helpers: {},
            open: function(d, h) {
                if (d && (q.isPlainObject(h) || (h = {}), !1 !== B.close(!0))) return q.isArray(d) || (d = g(d) ? q(d).get() : [d]), q.each(d, function(e, o) {
                    var t, i, n, a, s, r, c, l = {};
                    "object" === q.type(o) && (o.nodeType && (o = q(o)), g(o) ? (l = {
                        href: o.data("slvr-fancybox-href") || o.attr("href"),
                        title: o.data("slvr-fancybox-title") || o.attr("title"),
                        isDom: !0,
                        element: o
                    }, q.metadata && q.extend(!0, l, o.metadata())) : l = o), t = h.href || l.href || (m(o) ? o : null), i = h.title !== p ? h.title : l.title || "", !(a = (n = h.content || l.content) ? "html" : h.type || l.type) && l.isDom && ((a = o.data("slvr-fancybox-type")) || (a = (s = o.prop("class").match(/slvr-fancybox\.(\w+)/)) ? s[1] : null)), m(t) && (a || (B.isImage(t) ? a = "image" : B.isSWF(t) ? a = "swf" : "#" === t.charAt(0) ? a = "inline" : m(o) && (a = "html", n = o)), "ajax" === a && (t = (r = t.split(/\s+/, 2)).shift(), c = r.shift())), n || ("inline" === a ? t ? n = q(m(t) ? t.replace(/.*(?=#[^\s]+$)/, "") : t) : l.isDom && (n = o) : "html" === a ? n = t : a || t || !l.isDom || (a = "inline", n = o)), q.extend(l, {
                        href: t,
                        type: a,
                        content: n,
                        title: i,
                        selector: c
                    }), d[e] = l
                }), B.opts = q.extend(!0, {}, B.defaults, h), h.keys !== p && (B.opts.keys = !!h.keys && q.extend({}, B.defaults.keys, h.keys)), B.group = d, B._start(B.opts.index)
            },
            cancel: function() {
                var e = B.coming;
                e && !1 !== B.trigger("onCancel") && (B.hideLoading(), B.ajaxLoad && B.ajaxLoad.abort(), B.ajaxLoad = null, B.imgPreload && (B.imgPreload.onload = B.imgPreload.onerror = null), e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), B.coming = null, B.current || B._afterZoomOut(e))
            },
            close: function(e) {
                B.cancel(), !1 !== B.trigger("beforeClose") && (B.unbindEvents(), B.isActive && (B.isOpen && !0 !== e ? (B.isOpen = B.isOpened = !1, B.isClosing = !0, q(".slvr-fancybox-item, .slvr-fancybox-nav").remove(), B.wrap.stop(!0, !0).removeClass("slvr-fancybox-opened"), B.transitions[B.current.closeMethod]()) : (q(".slvr-fancybox-wrap").stop(!0).trigger("onReset").remove(), B._afterZoomOut())))
            },
            play: function(e) {
                var o = function() {
                        clearTimeout(B.player.timer)
                    },
                    t = function() {
                        o(), B.current && B.player.isActive && (B.player.timer = setTimeout(B.next, B.current.playSpeed))
                    },
                    i = function() {
                        o(), l.unbind(".player"), B.player.isActive = !1, B.trigger("onPlayEnd")
                    };
                !0 === e || !B.player.isActive && !1 !== e ? B.current && (B.current.loop || B.current.index < B.group.length - 1) && (B.player.isActive = !0, l.bind({
                    "onCancel.player beforeClose.player": i,
                    "onUpdate.player": t,
                    "beforeLoad.player": o
                }), t(), B.trigger("onPlayStart")) : i()
            },
            next: function(e) {
                var o = B.current;
                o && (m(e) || (e = o.direction.next), B.jumpto(o.index + 1, e, "next"))
            },
            prev: function(e) {
                var o = B.current;
                o && (m(e) || (e = o.direction.prev), B.jumpto(o.index - 1, e, "prev"))
            },
            jumpto: function(e, o, t) {
                var i = B.current;
                i && (e = R(e), B.direction = o || i.direction[e >= i.index ? "next" : "prev"], B.router = t || "jumpto", i.loop && (e < 0 && (e = i.group.length + e % i.group.length), e %= i.group.length), i.group[e] !== p && (B.cancel(), B._start(e)))
            },
            reposition: function(e, o) {
                var t, i = B.current,
                    n = i ? i.wrap : null;
                n && (t = B._getPosition(o), e && "scroll" === e.type ? (delete t.position, n.stop(!0, !0).animate(t, 200)) : (n.css(t), i.pos = q.extend({}, i.dim, t)))
            },
            update: function(o) {
                var t = o && o.type,
                    i = !t || "orientationchange" === t;
                i && (clearTimeout(c), c = null), B.isOpen && !c && (c = setTimeout(function() {
                    var e = B.current;
                    e && !B.isClosing && (B.wrap.removeClass("slvr-fancybox-tmp"), (i || "load" === t || "resize" === t && e.autoResize) && B._setDimension(), "scroll" === t && e.canShrink || B.reposition(o), B.trigger("onUpdate"), c = null)
                }, i && !d ? 0 : 300))
            },
            SLVRupdate: function(o) {
                var t = o && o.type;
                if (clearTimeout(c), c = null, B.isOpen && !c) {
                    var e = 0;
                    e = q("#slvr-qv-left").outerHeight() > q(".slvr-fancybox-inner").outerHeight() ? 345 : 0, 0 == q("#slvr-qv-zoomcontainer").outerHeight() && q("#slvr-qv-left").outerHeight() !== q(".slvr-fancybox-inner").outerHeight() && (0 == e && (e = 345), q("#slvr-qv-zoomcontainer").height(q("#slvr-qv-zoomImg").outerHeight())), c = setTimeout(function() {
                        var e = B.current;
                        e && !B.isClosing && (B.wrap.removeClass("slvr-fancybox-tmp"), B._setDimension(), "scroll" === t && e.canShrink || B.reposition(o), B.trigger("onUpdate"), c = null, B.hideLoading())
                    }, e)
                }
            },
            toggle: function(e) {
                B.isOpen && (B.current.fitToView = "boolean" === q.type(e) ? e : !B.current.fitToView, d && (B.wrap.removeAttr("style").addClass("slvr-fancybox-tmp"), B.trigger("onUpdate")), B.update())
            },
            hideLoading: function() {
                l.unbind(".loading"), q("#slvr-fancybox-loading").remove()
            },
            showLoading: function() {
                var e, o;
                B.hideLoading(), e = q('<div id="slvr-fancybox-loading"><div></div></div>').click(B.cancel).appendTo("body"), l.bind("keydown.loading", function(e) {
                    27 === (e.which || e.keyCode) && (e.preventDefault(), B.cancel())
                }), B.defaults.fixed || (o = B.getViewport(), e.css({
                    position: "absolute",
                    top: .5 * o.h + o.y,
                    left: .5 * o.w + o.x
                }))
            },
            getViewport: function() {
                var e = B.current && B.current.locked || !1,
                    o = {
                        x: s.scrollLeft(),
                        y: s.scrollTop()
                    };
                return e ? (o.w = e[0].clientWidth, o.h = e[0].clientHeight) : (o.w = d && n.innerWidth ? n.innerWidth : s.width(), o.h = d || n.innerHeight ? n.innerHeight : s.height()), o
            },
            unbindEvents: function() {
                B.wrap && g(B.wrap) && B.wrap.unbind(".fb"), l.unbind(".fb"), s.unbind(".fb")
            },
            bindEvents: function() {
                var o, c = B.current;
                c && (s.bind("orientationchange.fb" + (d ? "" : " resize.fb") + (c.autoCenter && !c.locked ? " scroll.fb" : ""), B.update), (o = c.keys) && l.bind("keydown.fb", function(t) {
                    var i = t.which || t.keyCode,
                        e = t.target || t.srcElement;
                    if (27 === i && B.coming) return !1;
                    t.ctrlKey || t.altKey || t.shiftKey || t.metaKey || e && (e.type || q(e).is("[contenteditable]")) || q.each(o, function(e, o) {
                        return 1 < c.group.length && o[i] !== p ? (B[e](o[i]), t.preventDefault(), !1) : -1 < q.inArray(i, o) ? (B[e](), t.preventDefault(), !1) : void 0
                    })
                }), q.fn.mousewheel && c.mouseWheel && B.wrap.bind("mousewheel.fb", function(e, o, t, i) {
                    for (var n, a = e.target || null, s = q(a), r = !1; s.length && !(r || s.is(".slvr-fancybox-skin") || s.is(".slvr-fancybox-wrap"));) r = (n = s[0]) && !(n.style.overflow && "hidden" === n.style.overflow) && (n.clientWidth && n.scrollWidth > n.clientWidth || n.clientHeight && n.scrollHeight > n.clientHeight), s = q(s).parent();
                    0 === o || r || 1 < B.group.length && !c.canShrink && (0 < i || 0 < t ? B.prev(0 < i ? "down" : "left") : (i < 0 || t < 0) && B.next(i < 0 ? "up" : "right"), e.preventDefault())
                }))
            },
            trigger: function(t, e) {
                var o, i = e || B.coming || B.current;
                if (i) {
                    if (q.isFunction(i[t]) && (o = i[t].apply(i, Array.prototype.slice.call(arguments, 1))), !1 === o) return !1;
                    i.helpers && q.each(i.helpers, function(e, o) {
                        o && B.helpers[e] && q.isFunction(B.helpers[e][t]) && B.helpers[e][t](q.extend(!0, {}, B.helpers[e].defaults, o), i)
                    }), l.trigger(t)
                }
            },
            isImage: function(e) {
                return m(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
            },
            isSWF: function(e) {
                return m(e) && e.match(/\.(swf)((\?|#).*)?$/i)
            },
            _start: function(e) {
                var o, t, i, n, a, s = {};
                if (e = R(e), !(o = B.group[e] || null)) return !1;
                if (n = (s = q.extend(!0, {}, B.opts, o)).margin, a = s.padding, "number" === q.type(n) && (s.margin = [n, n, n, n]), "number" === q.type(a) && (s.padding = [a, a, a, a]), s.modal && q.extend(!0, s, {
                        closeBtn: !1,
                        closeClick: !1,
                        nextClick: !1,
                        arrows: !1,
                        mouseWheel: !1,
                        keys: null,
                        helpers: {
                            overlay: {
                                closeClick: !1
                            }
                        }
                    }), s.autoSize && (s.autoWidth = s.autoHeight = !0), "auto" === s.width && (s.autoWidth = !0), "auto" === s.height && (s.autoHeight = !0), s.group = B.group, s.index = e, B.coming = s, !1 !== B.trigger("beforeLoad")) {
                    if (i = s.type, t = s.href, !i) return B.coming = null, !(!B.current || !B.router || "jumpto" === B.router) && (B.current.index = e, B[B.router](B.direction));
                    if (B.isActive = !0, "image" !== i && "swf" !== i || (s.autoHeight = s.autoWidth = !1, s.scrolling = "visible"), "image" === i && (s.aspectRatio = !0), "iframe" === i && d && (s.scrolling = "scroll"), s.wrap = q(s.tpl.wrap).addClass("slvr-fancybox-" + (d ? "mobile" : "desktop") + " slvr-fancybox-type-" + i + " slvr-fancybox-tmp " + s.wrapCSS).appendTo(s.parent || "body"), q.extend(s, {
                            skin: q(".slvr-fancybox-skin", s.wrap),
                            outer: q(".slvr-fancybox-outer", s.wrap),
                            inner: q(".slvr-fancybox-inner", s.wrap)
                        }), q.each(["Top", "Right", "Bottom", "Left"], function(e, o) {
                            s.skin.css("padding" + o, O(s.padding[e]))
                        }), B.trigger("onReady"), "inline" === i || "html" === i) {
                        if (!s.content || !s.content.length) return B._error("content")
                    } else if (!t) return B._error("href");
                    "image" === i ? B._loadImage() : "ajax" === i ? B._loadAjax() : "iframe" === i ? B._loadIframe() : B._afterLoad()
                } else B.coming = null
            },
            _error: function(e) {
                q.extend(B.coming, {
                    type: "html",
                    autoWidth: !0,
                    autoHeight: !0,
                    minWidth: 0,
                    minHeight: 0,
                    scrolling: "no",
                    hasError: e,
                    content: B.coming.tpl.error
                }), B._afterLoad()
            },
            _loadImage: function() {
                var e = B.imgPreload = new Image;
                e.onload = function() {
                    this.onload = this.onerror = null, B.coming.width = this.width / B.opts.pixelRatio, B.coming.height = this.height / B.opts.pixelRatio, B._afterLoad()
                }, e.onerror = function() {
                    this.onload = this.onerror = null, B._error("image")
                }, e.src = B.coming.href, !0 !== e.complete && B.showLoading()
            },
            _loadAjax: function() {
                var t = B.coming;
                B.showLoading(), B.ajaxLoad = q.ajax(q.extend({}, t.ajax, {
                    url: t.href,
                    error: function(e, o) {
                        B.coming && "abort" !== o ? B._error("ajax", e) : B.hideLoading()
                    },
                    success: function(e, o) {
                        "success" === o && (t.content = e, B._afterLoad())
                    }
                }))
            },
            _loadIframe: function() {
                var e = B.coming,
                    o = q(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", d ? "auto" : e.iframe.scrolling).attr("src", e.href);
                q(e.wrap).bind("onReset", function() {
                    try {
                        q(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                    } catch (e) {}
                }), e.iframe.preload && (B.showLoading(), o.one("load", function() {
                    q(this).data("ready", 1), d || q(this).bind("load.fb", B.update), q(this).parents(".slvr-fancybox-wrap").width("100%").removeClass("slvr-fancybox-tmp").show(), B._afterLoad()
                })), e.content = o.appendTo(e.inner), e.iframe.preload || B._afterLoad()
            },
            _preloadImages: function() {
                var e, o, t = B.group,
                    i = B.current,
                    n = t.length,
                    a = i.preload ? Math.min(i.preload, n - 1) : 0;
                for (o = 1; o <= a; o += 1) "image" === (e = t[(i.index + o) % n]).type && e.href && ((new Image).src = e.href)
            },
            _afterLoad: function() {
                var e, t, o, i, n, a, s = B.coming,
                    r = B.current,
                    c = "slvr-fancybox-placeholder";
                if (B.hideLoading(), s && !1 !== B.isActive) {
                    if (!1 === B.trigger("afterLoad", s, r)) return s.wrap.stop(!0).trigger("onReset").remove(), void(B.coming = null);
                    switch (r && (B.trigger("beforeChange", r), r.wrap.stop(!0).removeClass("slvr-fancybox-opened").find(".slvr-fancybox-item, .slvr-fancybox-nav").remove()), B.unbindEvents(), t = (e = s).content, o = s.type, i = s.scrolling, q.extend(B, {
                        wrap: e.wrap,
                        skin: e.skin,
                        outer: e.outer,
                        inner: e.inner,
                        current: e,
                        previous: r
                    }), n = e.href, o) {
                        case "inline":
                        case "ajax":
                        case "html":
                            e.selector ? t = q("<div>").html(t).find(e.selector) : g(t) && (t.data(c) || t.data(c, q('<div class="' + c + '"></div>').insertAfter(t).hide()), t = t.show().detach(), e.wrap.bind("onReset", function() {
                                q(this).find(t).length && t.hide().replaceAll(t.data(c)).data(c, !1)
                            }));
                            break;
                        case "image":
                            t = e.tpl.image.replace("{href}", n);
                            break;
                        case "swf":
                            t = '<object id="slvr-fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + n + '"></param>', a = "", q.each(e.swf, function(e, o) {
                                t += '<param name="' + e + '" value="' + o + '"></param>', a += " " + e + '="' + o + '"'
                            }), t += '<embed src="' + n + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>"
                    }
                    g(t) && t.parent().is(e.inner) || e.inner.append(t), B.trigger("beforeShow"), e.inner.css("overflow", "yes" === i ? "scroll" : "no" === i ? "hidden" : i), B._setDimension(), B.reposition(), B.isOpen = !1, B.coming = null, B.bindEvents(), B.isOpened ? r.prevMethod && B.transitions[r.prevMethod]() : q(".slvr-fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(), B.transitions[B.isOpened ? e.nextMethod : e.openMethod](), B._preloadImages()
                }
            },
            _setDimension: function() {
                var e, o, t, i, n, a, s, r, c, l, d, h, p, g, m, u, f, w = B.getViewport(),
                    A = 0,
                    v = B.wrap,
                    y = B.skin,
                    z = B.inner,
                    b = B.current,
                    x = b.width,
                    C = b.height,
                    S = b.minWidth,
                    k = b.minHeight,
                    W = b.maxWidth,
                    E = b.maxHeight,
                    L = b.scrolling,
                    T = b.scrollOutside ? b.scrollbarWidth : 0,
                    I = b.margin,
                    H = R(I[1] + I[3]),
                    Q = R(I[0] + I[2]);
                if (v.add(y).add(z).width("auto").height("auto").removeClass("slvr-fancybox-tmp"), n = H + (t = R(y.outerWidth(!0) - y.width())), a = Q + (i = R(y.outerHeight(!0) - y.height())), s = M(x) ? (w.w - n) * R(x) / 100 : x, r = M(C) ? (w.h - a) * R(C) / 100 : C, "iframe" === b.type) {
                    if (u = b.content, b.autoHeight && 1 === u.data("ready")) try {
                        u[0].contentWindow.document.location && (z.width(s).height(9999), f = u.contents().find("body"), T && f.css("overflow-x", "hidden"), r = f.outerHeight(!0))
                    } catch (e) {}
                } else(b.autoWidth || b.autoHeight) && (z.addClass("slvr-fancybox-tmp"), b.autoWidth || z.width(s), b.autoHeight || z.height(r), b.autoWidth && (s = z.width()), b.autoHeight && (r = z.height()), z.removeClass("slvr-fancybox-tmp"));
                if (x = R(s), C = R(r), d = s / r, S = R(M(S) ? R(S, "w") - n : S), W = R(M(W) ? R(W, "w") - n : W), k = R(M(k) ? R(k, "h") - a : k), c = W, l = E = R(M(E) ? R(E, "h") - a : E), b.fitToView && (W = Math.min(w.w - n, W), E = Math.min(w.h - a, E)), g = w.w - H, m = w.h - Q, b.aspectRatio ? (W < x && (C = R((x = W) / d)), E < C && (x = R((C = E) * d)), x < S && (C = R((x = S) / d)), C < k && (x = R((C = k) * d))) : (x = Math.max(S, Math.min(x, W)), b.autoHeight && "iframe" !== b.type && (z.width(x), C = z.height()), C = Math.max(k, Math.min(C, E))), b.fitToView)
                    if (z.width(x).height(C), v.width(x + t), h = v.width(), p = v.height(), b.aspectRatio)
                        for (;
                            (g < h || m < p) && S < x && k < C && !(19 < A++);) C = Math.max(k, Math.min(E, C - 10)), (x = R(C * d)) < S && (C = R((x = S) / d)), W < x && (C = R((x = W) / d)), z.width(x).height(C), v.width(x + t), h = v.width(), p = v.height();
                    else x = Math.max(S, Math.min(x, x - (h - g))), C = Math.max(k, Math.min(C, C - (p - m)));
                T && "auto" === L && C < r && x + t + T < g && (x += T), z.width(x).height(C), v.width(x + t), h = v.width(), p = v.height(), e = (g < h || m < p) && S < x && k < C, o = b.aspectRatio ? x < c && C < l && x < s && C < r : (x < c || C < l) && (x < s || C < r), q.extend(b, {
                    dim: {
                        width: O(h),
                        height: O(p)
                    },
                    origWidth: s,
                    origHeight: r,
                    canShrink: e,
                    canExpand: o,
                    wPadding: t,
                    hPadding: i,
                    wrapSpace: p - y.outerHeight(!0),
                    skinSpace: y.height() - C
                }), !u && b.autoHeight && k < C && C < E && !o && z.height("auto")
            },
            _getPosition: function(e) {
                var o = B.current,
                    t = B.getViewport(),
                    i = o.margin,
                    n = B.wrap.width() + i[1] + i[3],
                    a = B.wrap.height() + i[0] + i[2],
                    s = {
                        position: "absolute",
                        top: i[0],
                        left: i[3]
                    };
                return o.autoCenter && o.fixed && !e && a <= t.h && n <= t.w ? s.position = "fixed" : o.locked || (s.top += t.y, s.left += t.x), s.top = O(Math.max(s.top, s.top + (t.h - a) * o.topRatio)), s.left = O(Math.max(s.left, s.left + (t.w - n) * o.leftRatio)), s
            },
            _afterZoomIn: function() {
                var o = B.current;
                o && (B.isOpen = B.isOpened = !0, B.wrap.css("overflow", "visible").addClass("slvr-fancybox-opened"), B.update(), (o.closeClick || o.nextClick && 1 < B.group.length) && B.inner.css("cursor", "pointer").bind("click.fb", function(e) {
                    q(e.target).is("a") || q(e.target).parent().is("a") || (e.preventDefault(), B[o.closeClick ? "close" : "next"]())
                }), o.closeBtn && q(o.tpl.closeBtn).appendTo(B.skin).bind("click.fb", function(e) {
                    e.preventDefault(), B.close()
                }), o.arrows && 1 < B.group.length && ((o.loop || 0 < o.index) && q(o.tpl.prev).appendTo(B.outer).bind("click.fb", B.prev), (o.loop || o.index < B.group.length - 1) && q(o.tpl.next).appendTo(B.outer).bind("click.fb", B.next)), B.trigger("afterShow"), o.loop || o.index !== o.group.length - 1 ? B.opts.autoPlay && !B.player.isActive && (B.opts.autoPlay = !1, B.play()) : B.play(!1))
            },
            _afterZoomOut: function(e) {
                e = e || B.current, q(".slvr-fancybox-wrap").trigger("onReset").remove(), q.extend(B, {
                    group: {},
                    opts: {},
                    router: !1,
                    current: null,
                    isActive: !1,
                    isOpened: !1,
                    isOpen: !1,
                    isClosing: !1,
                    wrap: null,
                    skin: null,
                    outer: null,
                    inner: null
                }), B.trigger("afterClose", e)
            }
        }), B.transitions = {
            getOrigPosition: function() {
                var e = B.current,
                    o = e.element,
                    t = e.orig,
                    i = {},
                    n = 50,
                    a = 50,
                    s = e.hPadding,
                    r = e.wPadding,
                    c = B.getViewport();
                return !t && e.isDom && o.is(":visible") && ((t = o.find("img:first")).length || (t = o)), g(t) ? (i = t.offset(), t.is("img") && (n = t.outerWidth(), a = t.outerHeight())) : (i.top = c.y + (c.h - a) * e.topRatio, i.left = c.x + (c.w - n) * e.leftRatio), ("fixed" === B.wrap.css("position") || e.locked) && (i.top -= c.y, i.left -= c.x), i = {
                    top: O(i.top - s * e.topRatio),
                    left: O(i.left - r * e.leftRatio),
                    width: O(n + r),
                    height: O(a + s)
                }
            },
            step: function(e, o) {
                var t, i, n = o.prop,
                    a = B.current,
                    s = a.wrapSpace,
                    r = a.skinSpace;
                "width" !== n && "height" !== n || (t = o.end === o.start ? 1 : (e - o.start) / (o.end - o.start), B.isClosing && (t = 1 - t), i = e - ("width" === n ? a.wPadding : a.hPadding), B.skin[n](R("width" === n ? i : i - s * t)), B.inner[n](R("width" === n ? i : i - s * t - r * t)))
            },
            zoomIn: function() {
                var e = B.current,
                    o = e.pos,
                    t = e.openEffect,
                    i = "elastic" === t,
                    n = q.extend({
                        opacity: 1
                    }, o);
                delete n.position, i ? (o = this.getOrigPosition(), e.openOpacity && (o.opacity = .1)) : "fade" === t && (o.opacity = .1), B.wrap.css(o).animate(n, {
                    duration: "none" === t ? 0 : e.openSpeed,
                    easing: e.openEasing,
                    step: i ? this.step : null,
                    complete: B._afterZoomIn
                })
            },
            zoomOut: function() {
                var e = B.current,
                    o = e.closeEffect,
                    t = "elastic" === o,
                    i = {
                        opacity: .1
                    };
                t && (i = this.getOrigPosition(), e.closeOpacity && (i.opacity = .1)), B.wrap.animate(i, {
                    duration: "none" === o ? 0 : e.closeSpeed,
                    easing: e.closeEasing,
                    step: t ? this.step : null,
                    complete: B._afterZoomOut
                })
            },
            changeIn: function() {
                var e, o = B.current,
                    t = o.nextEffect,
                    i = o.pos,
                    n = {
                        opacity: 1
                    },
                    a = B.direction;
                i.opacity = .1, "elastic" === t && (e = "down" === a || "up" === a ? "top" : "left", "down" === a || "right" === a ? (i[e] = O(R(i[e]) - 200), n[e] = "+=200px") : (i[e] = O(R(i[e]) + 200), n[e] = "-=200px")), "none" === t ? B._afterZoomIn() : B.wrap.css(i).animate(n, {
                    duration: o.nextSpeed,
                    easing: o.nextEasing,
                    complete: B._afterZoomIn
                })
            },
            changeOut: function() {
                var e = B.previous,
                    o = e.prevEffect,
                    t = {
                        opacity: .1
                    },
                    i = B.direction;
                "elastic" === o && (t["down" === i || "up" === i ? "top" : "left"] = ("up" === i || "left" === i ? "-" : "+") + "=200px"), e.wrap.animate(t, {
                    duration: "none" === o ? 0 : e.prevSpeed,
                    easing: e.prevEasing,
                    complete: function() {
                        q(this).trigger("onReset").remove()
                    }
                })
            }
        }, B.helpers.overlay = {
            defaults: {
                closeClick: !0,
                speedOut: 200,
                showEarly: !0,
                css: {},
                locked: !d,
                fixed: !0
            },
            overlay: null,
            fixed: !1,
            el: q("html"),
            create: function(e) {
                e = q.extend({}, this.defaults, e), this.overlay && this.close(), this.overlay = q('<div class="slvr-fancybox-overlay"></div>').appendTo(B.coming ? B.coming.parent : e.parent), this.fixed = !1, e.fixed && B.defaults.fixed && (this.overlay.addClass("slvr-fancybox-overlay-fixed"), this.fixed = !0)
            },
            open: function(e) {
                var o = this;
                e = q.extend({}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(e), this.fixed || (s.bind("resize.overlay", q.proxy(this.update, this)), this.update()), e.closeClick && this.overlay.bind("click.overlay", function(e) {
                    if (q(e.target).hasClass("slvr-fancybox-overlay")) return B.isActive ? B.close() : o.close(), !1
                }), this.overlay.css(e.css).show()
            },
            close: function() {
                var e, o;
                s.unbind("resize.overlay"), this.el.hasClass("slvr-fancybox-lock") && (q(".slvr-fancybox-margin").removeClass("slvr-fancybox-margin"), e = s.scrollTop(), o = s.scrollLeft(), this.el.removeClass("slvr-fancybox-lock"), s.scrollTop(e).scrollLeft(o)), q(".slvr-fancybox-overlay").remove().hide(), q.extend(this, {
                    overlay: null,
                    fixed: !1
                })
            },
            update: function() {
                var e, o = "100%";
                this.overlay.width(o).height("100%"), r ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), l.width() > e && (o = l.width())) : l.width() > s.width() && (o = l.width()), this.overlay.width(o).height(l.height())
            },
            onReady: function(e, o) {
                var t = this.overlay;
                q(".slvr-fancybox-overlay").stop(!0, !0), t || this.create(e), e.locked && this.fixed && o.fixed && (t || (this.margin = l.height() > s.height() && q("html").css("margin-right").replace("px", "")), o.locked = this.overlay.append(o.wrap), o.fixed = !1), !0 === e.showEarly && this.beforeShow.apply(this, arguments)
            },
            beforeShow: function(e, o) {
                var t, i;
                o.locked && (!1 !== this.margin && (q("*").filter(function() {
                    return "fixed" === q(this).css("position") && !q(this).hasClass("slvr-fancybox-overlay") && !q(this).hasClass("slvr-fancybox-wrap")
                }).addClass("slvr-fancybox-margin"), this.el.addClass("slvr-fancybox-margin")), t = s.scrollTop(), i = s.scrollLeft(), this.el.addClass("slvr-fancybox-lock"), s.scrollTop(t).scrollLeft(i)), this.open(e)
            },
            onUpdate: function() {
                this.fixed || this.update()
            },
            afterClose: function(e) {
                this.overlay && !B.coming && this.overlay.fadeOut(e.speedOut, q.proxy(this.close, this))
            }
        }, B.helpers.title = {
            defaults: {
                type: "float",
                position: "bottom"
            },
            beforeShow: function(e) {
                var o, t, i = B.current,
                    n = i.title,
                    a = e.type;
                if (q.isFunction(n) && (n = n.call(i.element, i)), m(n) && "" !== q.trim(n)) {
                    switch (o = q('<div class="slvr-fancybox-title slvr-fancybox-title-' + a + '-wrap">' + n + "</div>"), a) {
                        case "inside":
                            t = B.skin;
                            break;
                        case "outside":
                            t = B.wrap;
                            break;
                        case "over":
                            t = B.inner;
                            break;
                        default:
                            t = B.skin, o.appendTo("body"), r && o.width(o.width()), o.wrapInner('<span class="child"></span>'), B.current.margin[2] += Math.abs(R(o.css("margin-bottom")))
                    }
                    o["top" === e.position ? "prependTo" : "appendTo"](t)
                }
            }
        }, q.fn.slvrfancybox = function(a) {
            var s, r = q(this),
                c = this.selector || "",
                e = function(e) {
                    var o, t, i = q(this).blur(),
                        n = s;
                    e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || i.is(".slvr-fancybox-wrap") || (o = a.groupAttr || "data-slvr-fancybox-group", (t = i.attr(o)) || (o = "rel", t = i.get(0)[o]), t && "" !== t && "nofollow" !== t && (n = (i = (i = c.length ? q(c) : r).filter("[" + o + '="' + t + '"]')).index(this)), a.index = n, !1 !== B.open(i, a) && e.preventDefault())
                };
            return s = (a = a || {}).index || 0, c && !1 !== a.live ? l.undelegate(c, "click.fb-start").delegate(c + ":not('.slvr-fancybox-item, .slvr-fancybox-nav')", "click.fb-start", e) : r.unbind("click.fb-start").bind("click.fb-start", e), this.filter("[data-slvr-fancybox-start=1]").trigger("click"), this
        }, q.fn.slvrshowLoading = function() {
            B.showLoading()
        }, q.fn.slvrhideLoading = function() {
            B.hideLoading()
        }, l.ready(function() {
            var e, o, t, i;
            q.scrollbarWidth === p && (q.scrollbarWidth = function() {
                var e = q('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                    o = e.children(),
                    t = o.innerWidth() - o.height(99).innerWidth();
                return e.remove(), t
            }), q.support.fixedPosition === p && (q.support.fixedPosition = (t = q('<div style="position:fixed;top:20px;"></div>').appendTo("body"), i = 20 === t[0].offsetTop || 15 === t[0].offsetTop, t.remove(), i)), q.extend(B.defaults, {
                scrollbarWidth: q.scrollbarWidth(),
                fixed: q.support.fixedPosition,
                parent: q("body")
            }), e = q(n).width(), a.addClass("slvr-fancybox-lock-test"), o = q(n).width(), a.removeClass("slvr-fancybox-lock-test"), q("<style type='text/css'>.slvr-fancybox-margin{margin-right:" + (o - e) + "px;}</style>").appendTo("head")
        })
    }
    var enable_mobile = !1,
        moneyFormat, add_to_cart_text, unavailable_text = "Unavailable",
        noimage, overlay_lock = !1,
        loadScript = function(e, o) {
            var t = document.createElement("script");
            t.type = "text/javascript", t.readyState ? t.onreadystatechange = function() {
                "loaded" != t.readyState && "complete" != t.readyState || (t.onreadystatechange = null, o())
            } : t.onload = function() {
                o()
            }, t.src = e, document.getElementsByTagName("head")[0].appendChild(t)
        };

    function preloadQV(e, o) {
        var t = o.attr("handle");
        return e.ajax({
            dataType: "json",
            url: "/products/" + t + ".js"
        }).done(function(e) {
            SLVRShopify.preload(e.images, "large"), SLVRShopify.preload(e.images)
        })
    }

    function findQVContainer(e, o) {
        return 1 < e('a[href*="/products/"]', o.parent()).has('img[src*="/products/"] , img[src*="/no-image"]').length || 50 < o.parent().width() - o.width() ? o : findQVContainer(e, o.parent())
    }
    var initQuickViewContent = function(e) {
            for (var o = e('a[href*="/products/"]:not([href*=".jp"]):not(form a[href*="/products/"]):not(.related-products a[href*="/products/"]):not(.not-slvr-qv a[href*="/products/"]):not([href*=".JP"]):not([href*=".png"]):not([href*=".PNG"])').has('img[src*="/products/"]:not([class*="not-slvr-qv"]), img[src*="/no-image"],img[data-srcset*="/products/"]:not([class*="not-slvr-qv"])'), t = 0; t < o.length; ++t) {
                var i = o.eq(t),
                    n = i.attr("href").split("/"),
                    a = n[n.length - 1].split("?")[0];
                null != collection_handle && (a = i.attr("href").split("?")[0] + ".js");
                var s = i.parent();
                try {
                    s = findQVContainer(e, i.parent())
                } catch (e) {
                    console.log("error when get product container "), console.log(e)
                }
                null != s && null != s || (s = i.parent()), 0 == e(".slvr-qv-button", s).length && s.append('<div class="slvr-qv-button-wrap" style="display: none !important;" ><a class="slvr-qv-button"  href="#slvr-qv-showqv" handle="?" ></a></div>'.replace("?", a))
            }
        },
        product_in_cart = 'This product in <a href="/cart"  class="slvr-qv-msg-cart-link">cart</a> already.',
        product_added = 'Item added to cart! <a href="/cart"  class="slvr-qv-msg-cart-link">View Cart</a>.',
        collection_handle, target;

    function loadData(e, o) {
        if (void 0 !== o.enable_mobile && (enable_mobile = o.enable_mobile), isMoblieBrowser() && !enable_mobile) return !1;
        collection_handle = o.collection_handle, "yes" == o.autoconfig && initQuickViewContent(e), slvrqvFancybox(window, document, e, void 0), slvrqvImageZoom(e, window, document, void 0);
        var t = o.jsondata;
        return moneyFormat = o.moneyFormat, console.log("collection_handle : " + collection_handle), console.log("enable_mobile : " + enable_mobile), noimage = o.noimage, console.log("no image : " + noimage), add_to_cart_text = e(".slvr-qv-cartbtn").val(), e("#slvr-qv-unavailable").length && (unavailable_text = e("#slvr-qv-unavailable").text()), isMoblieBrowser() || isTablet() ? overlay_lock = !0 : o.overlay_lock && (overlay_lock = o.overlay_lock), settings = e.parseJSON(SLVRBase64.decode(t)), console.log("Disable QV : " + settings.qv_disable), SLVRSettings.loadSettings(e, settings), "on" == settings.qv_disable && (e(".slvr-qv-button-wrap").removeClass("slvr-qv-button-wrap"), e(".slvr-qv-button").removeClass("slvr-qv-button")), !0
    }

    function createCartForm(e, o, t) {
        var i = e("#slvr-qv-add-item-form", t);
        if (0 != i.length) {
            var n = e("#slvr-qv-variant-options", e(".slvr-qv-product-options", i));
            n.empty(), n.append('<div > <select id="slvr-qv-product-selected" name="id" class="slvr-qv-hidden"> </select> </div>');
            var a = e("#slvr-qv-product-selected", n);
            a.empty();
            var s = o.variants,
                r = !1;
            e.each(s, function(e, o) {
                var t = "";
                console.log(o);
                o.available && 0 == r && (r = !0, t = 'selected="selected"'), a.append('<option value="' + o.id + '" ' + t + 'data-qty="' + o.inventory_quantity +'" data-policy="' + o.inventory_policy +'" data-value="' + o.title +'">' + o.title + " - " + SLVRShopify.formatMoney(o.price, moneyFormat) + "</option>")
            }), e("#slvr-qv-quantity", t).val("1"), e("#slvr-qv-sold-out").addClass("slvr-qv-hidden"), o.available ? (e(".slvr-qv-cartbtn").removeClass("slvr-qv-hidden"), e(".slvr-qv-cartbtn").removeClass("disabled").removeAttr("disabled").val(add_to_cart_text)) : (e(".slvr-qv-cartbtn").removeClass("slvr-qv-hidden"), e(".slvr-qv-cartbtn").val(e("#slvr-qv-sold-out").text()).addClass("disabled").attr("disabled", "disabled")), formatVariantOption(e, o)
        }
    }

    function showIfProductAdd(e, o) {
        -1 != e.inArray(o, list_cart_variants) && (e("#slvr-qv-addcart-msg").html(product_in_cart), e("#slvr-qv-addcart-msg").fadeIn(1e3))
    }

    function convert_currency() {
        try {
            "undefined" != typeof Currency && void 0 !== Currency.convertAll && Currency.convertAll(Currency.shopCurrency, Currency.currentCurrency)
        } catch (e) {
            console.log(e)
        }
    }

    function formatVariantOption(n, i) {
        var a = n("#slvr-qv-showqv");
        var tax = $("#tax").val();
        try {
            new Shopify.OptionSelectors("slvr-qv-product-selected", {
                product: i,
                onVariantSelected: function(e, o) {
                    n("#slvr-qv-addcart-msg").hide();
                    var t = "";
                    null != settings.price_color && null != settings.price_color && (t = settings.price_color);
                    var i = n("#slvr-qv-showqv");
                    var product_price = e.price * tax;
					var compare_price = e.compare_at_price * tax;
                    e ? (e.available ? (showIfProductAdd(n, e.id), n(".slvr-qv-cartbtn").removeClass("disabled").removeAttr("disabled").val(add_to_cart_text)) : n(".slvr-qv-cartbtn").val(n("#slvr-qv-sold-out").text()).addClass("disabled").attr("disabled", "disabled"), e.compare_at_price > e.price ? n(".slvr-qv-price-container", i).html('<span class="slvr-qv-product-price" style="color:' + t + ' !important;">' + SLVRShopify.formatMoney(product_price, moneyFormat) + '&nbsp;<del class="slvr-qv-product-compare-price">' + SLVRShopify.formatMoney(compare_price, moneyFormat) + "</del></span>") : n(".slvr-qv-price-container", i).html('<span class="slvr-qv-product-price"  style="color:' + t + ' !important;">' + SLVRShopify.formatMoney(product_price, moneyFormat) + "</span>")) : n(".slvr-qv-cartbtn").val(unavailable_text).addClass("disabled").attr("disabled", "disabled")
                    //e ? (e.available ? (showIfProductAdd(n, e.id), n(".slvr-qv-cartbtn").removeClass("disabled").removeAttr("disabled").val(add_to_cart_text)) : n(".slvr-qv-cartbtn").val(n("#slvr-qv-sold-out").text()).addClass("disabled").attr("disabled", "disabled"), e.compare_at_price > e.price ? n(".slvr-qv-price-container", i).html('<span class="slvr-qv-product-price" style="color:' + t + ' !important;">' + SLVRShopify.formatMoney(e.price, moneyFormat) + '&nbsp;<del class="slvr-qv-product-compare-price">' + SLVRShopify.formatMoney(e.compare_at_price, moneyFormat) + "</del></span>") : n(".slvr-qv-price-container", i).html('<span class="slvr-qv-product-price"  style="color:' + t + ' !important;">' + SLVRShopify.formatMoney(e.price, moneyFormat) + "</span>")) : n(".slvr-qv-cartbtn").val(unavailable_text).addClass("disabled").attr("disabled", "disabled")
                }
            })
        } catch (e) {
            console.log(e)
        }
        1 == i.options.length && "Title" != i.options[0] && 0 == n(".selector-wrapper:eq(0) label", a).length && n(".selector-wrapper:eq(0)", a).prepend("<label>" + i.options[0] + "</label>");
        var s = !1,
            e = i.variants;
        n.each(e, function(e, t) {
            if (t.available && 0 == s) {
                s = !0;
                var o = i.options;
                n.each(o, function(e, o) {
                    n(".single-option-selector:eq(" + e + ")", a).val(t.options[e]).trigger("change")
                })
            }
        }), n("#slvr-qv-variant-options").removeClass("slvr-qv-hidden"), 1 == i.variants.length && -1 < i.variants[0].title.indexOf("Default") && n("#slvr-qv-variant-options").addClass("slvr-qv-hidden"),
        jQuery('.single-option-selector').prettyDropdown({classic: true,selectedMarker: ''}).refresh()
        //_addNotifyMe(i)
    }

    function _addNotifyMe(o) {
      var variants = o.variants, el = document.querySelector('#prettydropdown-slvr-qv-product-selected-option-0');
      el && variants.forEach(function(variant) {
        //console.log(variant.inventory_policy);
        if(variant.available == true) {
          var sel = "li[data-value='" + variant.option1 + "']",opt = document.querySelector('.slvr-qv-product-'+variant.id),el = document.querySelector(sel),
          dqel = 'data-'+variant.id+'-qty', dpel= 'data-'+variant.id+'-policy', dvel = 'data-'+variant.id+'-value';
          var qty = opt.getAttribute(dqel),
          policy = opt.getAttribute(dpel),
          val = opt.getAttribute(dvel);
          if(qty == 0 &&  policy == "continue" && val == variant.option1) {
            el.classList.add('notify-me')
            var itxt = el.innerText;
            el.innerText = variant.option1.toUpperCase() + " - Out of stock";
          }
        }
      });
    }

    function truncate(e, o) {
        var t = (o = (o = (o = e("<div/>").html(o).text()).replace(/\r?\n/g, "")).replace(/<!--\n?.*\n?-->/, "")).split(" ");
        return o = 30 < t.length ? t.splice(0, 30).join(" ") + "..." : o
    }

    function truncateNode(e) {
        if (0 == e.children().length && 0 < target) {
            var o = e.text().trim().split(/\s+/),
                t = o.length - target;
            0 < t ? target = 0 : 0 < e.text().trim().length && (target -= o.length);
            var i = 0 <= t ? o.splice(0, t).join(" ") + "..." : "";
            0 < i.length ? e.text(i) : e.remove()
        } else if (0 < e.children().length && 0 < target) {
            for (var n = e.children().length - 1; - 1 < n; --n) truncateNode(e.children("*:eq(" + n + ")"));
            truncateNode(e)
        }
    }

    function createDesc(e, o, t) {
        settings.des_num || (settings.des_num = 30);
        var i = e("#slvr-qv-des");
        i.off(), i.empty();
        var n = e("<div/>").html(o.description);
        target = n.text().split(/\s+/).length - settings.des_num, n.text().split(/\s+/).length > settings.des_num && truncateNode(n, n.text().split(/\s+/).length - settings.des_num), 0 == settings.des_num ? i.html("") : i.html(n.html()), i.append('<div class="clear-both"></div')
    }

    function createDetail(e, o, t, i) {
        var n = e("#slvr-qv-detail", t);
        null != collection_handle ? n.attr("href", i.replace(".js", "")) : n.attr("href", "/products/" + o.handle)
    }

    function createPrice(e, o, t) {
        var i = e("#slvr-qv-price-container", t);
        i.empty(), o.compare_at_price > o.price ? (e("#slvr-qv-sale").removeClass("slvr-qv-hidden"), i.append('<span class="slvr-qv-product-price ">' + SLVRShopify.formatMoney(o.price, moneyFormat) + '&nbsp;<del class="slvr-qv-product-compare-price">' + SLVRShopify.formatMoney(o.compare_at_price, moneyFormat) + "</del>  </span>")) : i.append('<span class="slvr-qv-product-price ">' + SLVRShopify.formatMoney(o.price, moneyFormat) + "</span>")
    }

    function createTitle(e, o, t) {
        var i = e("#slvr-qv-title", t);
        i.empty(), i.append("<strong>" + o.title + "</strong>")
    }

    function createGallery(t, e, o) {
        var i = t("#slvr-qv-galleryid", o);
        var selg = document.querySelector('#slvr-qv-galleryid');
        if(selg.classList.contains('slick-initialized')) {
          jQuery("#slvr-qv-galleryid").slick('unslick');
        }
        i.empty();
        var n = e.images,
            a = (parseInt(settings.img_main_width, 10) - 8) / 4;
        1 <= n.length && (cratezoomgalery(t, i, e.featured_image, a), t.each(n, function(e, o) {
            0 < e && e < 4 && cratezoomgalery(t, i, o, a)
        }))
    }

    function cratezoomgalery(e, o, t, i) {
        var n = "max-width:" + i + "px;max-height:" + i + "px;  ",
            a = '<a href="#" data-image="' + SLVRShopify.resizeImage(t, "large") + '" data-zoom-image="' + SLVRShopify.resizeImage(t, "original") + '"  class="slvr-qv-gallery-a" > <img src="' + SLVRShopify.resizeImage(t, "large") + '" class="slvr-qv-gallery-img"/> </a>';
        o.append(a)
    }

    function createZoomContainer(e, o, t) {
      console.log(e);
      console.log(o);
      console.log(t);
        var i = e("#slvr-qv-zoomcontainer", t);
        i.empty();
        var n = noimage;
        null != o.featured_image && (n = o.featured_image), i.append('<img  id="slvr-qv-zoomImg" style="max-width:' + settings.img_main_width + ";max-height:" + settings.img_main_width + '" src="' + SLVRShopify.resizeImage(n, "large") + '" data-zoom-image="' + SLVRShopify.resizeImage(n, "original") + '" alt=""  >')
    }

    function createZoomContainerGallery(t, e, o) {
        var i = t("#slvr-qv-zoomcontainer", o);
        //jQuery("#slvr-qv-zoomcontainer").slick('unslick');
        var sel = document.querySelector('#slvr-qv-zoomcontainer');
        if(sel.classList.contains('slick-initialized')) {
          jQuery('#slvr-qv-zoomcontainer').slick('unslick');
        }
        i.empty();
        var n = e.images,
        a = parseInt(settings.img_main_width);
        1 <= n.length && (cratezoomgalery(t, i, e.featured_image, a), t.each(n, function(e, o) {
            0 < e && cratezoomgalery(t, i, o, a)
        }))
    }

    function cleanTemplate(e, o) {
        e("#slvr-qv-zoomcontainer", o).empty(), e("#slvr-qv-galleryid", o).empty(), e("#slvr-qv-title", o).empty(), e("#slvr-qv-price-container", o).empty(), e("#slvr-qv-des", o).empty();
        var t = e("#slvr-qv-variant-options", e(".slvr-qv-product-options", e("#slvr-qv-add-item-form", o)));
        t.empty(), e("#slvr-qv-product-selected", t).empty()
    }
    SLVRShopify.initSettings = function(t) {
        SLVRShopify.showByHandle = function(e) {
            var o = SLVRShopify.jQuery;
            o(".slvrqv-temp-handle").length && o(".slvrqv-temp-handle").remove(), o("html").append('<a id="slvrqv-temp-handle"  class="slvrqv-temp-handle slvr-qv-button" href="#slvr-qv-showqv" data-index="1" handle="' + e + '" style="display:none !important"></a>'), o("#slvrqv-temp-handle").trigger("click")
        }, loadProductFromCart(t = SLVRShopify.jQuery);
        var i = !1;
        return t.ajax({
            dataType: "json",
            url: "/index?view=slvr.quickviewpro",
            contentType: "application/json; charset=utf-8",
            success: function(e) {
                (i = loadData(t, e)) && (onAddCartClicked(t), displayQuickView(t))
            },
            error: function() {
                console.log("cant  load metadata and try with html");
                var e = t("#slvrqv-metadata");
                if (e.length < 1) return !1;
                var o = {};
                o.jsondata = e.attr("jsondata"), o.moneyFormat = e.attr("moneyFormat"), o.noimage = e.attr("noimage"), o.autoconfig = e.attr("autoconfig"), (i = loadData(t, o)) && (onAddCartClicked(t), displayQuickView(t))
            }
        }), i
    };
    var getProductJson = function(e, o, t) {
        var i;
        return i = null != collection_handle ? o : "/products/" + o + ".js", e.ajax({
            type: "GET",
            dataType: "json",
            url: i,
            success: function(e) {
                t(SLVRShopify.jQuery, e)
            }
        }).responseText
    };

    function preloadQV(e, o) {
        var t, i = e(".slvr-qv-button");
        if (-1 < o && i.length > o) {
            t = i.eq(o), console.log(t);
            var n = t.attr("handle");
            e.ajax({
                dataType: "json",
                url: "/products/" + n + ".js"
            }).done(function(e) {
                SLVRShopify.preload(e.images, "large"), SLVRShopify.preload(e.images)
            })
        }
    }

    function preloadNearItem(e, o) {
        var t = e(".slvr-qv-button").index(o);
        preloadQV(e, t - 1), preloadQV(e, t + 1)
    }

    function freegifts_filter(i, e) {
        var n = [];
        return i.each(e.variants, function(e, o) {
            var t = !1;
            i.each(o.options, function(e, o) {
                if (6 < o.length && "% off)" == o.substring(o.length - 6, o.length)) return !(t = !0);
                if (6 < o.length && "% Off)" == o.substring(o.length - 6, o.length)) return !(t = !0);
                if (11 < o.length && "(Freegifts)" == o.substring(o.length - 11, o.length)) return !(t = !0);
                try {
                    if (o.match(/\(BK \d+\)/g)) return !(t = !0)
                } catch (e) {}
            }), t || n.push(o)
        }), e.variants = n, e
    }

    function buyx_product_json(e, o) {
        for (var t = [], i = -1, n = 0, a = o.options.length; n < a; n++)
            if ("BuyXDiscount" == o.options[n]) {
                i = n + 1;
                break
            } if (-1 == i) return o;
        1 < o.options.length ? o.options.splice(i - 1, 1) : o.options[0] = "Title", i = "option" + i, o.available = !1;
        for (var s = 0, r = o.variants.length; s < r; s++) "Default" == o.variants[s][i] && (o.variants[s][i] = "", t.push(o.variants[s]), o.available = o.available || o.variants[s].available);
        return o.variants = t, o
    }
    var callbackQV = function(i, e) {
            var t = [];
            i.each(e.options, function(e, o) {
                t[e] = o.name
            }), e.options = t;
            try {
                e = freegifts_filter(i, e), e = buyx_product_json(i, e)
            } catch (e) {
                console.log(e)
            }
            var o = i("#slvr-qv-left");
            //createZoomContainer(i, e, o),
            createZoomContainerGallery(i, e, o),
            createGallery(i, e, o),
            SLVRShopify.preload(e.images),
            SLVRShopify.preload(e.images, "large");

            var n = i("#slvr-qv-right");
            createTitle(i, e, n),
            createPrice(i, e, n),
            //createDesc(i, e, n),
            createCartForm(i, e, n),
            createDetail(i, e, n, e.handle);
            //zoomAllProduct(i);
            customProductSlider(i);
            /*
            var a = new Image;
            a.onload = function() {
                var e = a.height,
                    o = 10,
                    t = setInterval(function() {
                        (a = new Image).src = i("#slvr-qv-zoomImg").attr("src"), e = a.height, (0 == --o || 0 < e) && (window.clearInterval(t), zoomAllProduct(i), i("#slvr-qv-zoomcontainer").outerHeight() < i("#slvr-qv-zoomImg").outerHeight() && i("#slvr-qv-zoomcontainer").height(i("#slvr-qv-zoomImg").outerHeight()), "auto" == settings.wd_width || "auto" == settings.wd_height ? i.slvrfancybox.slvrupdate() : (i("#slvr-qv-right").outerHeight() > i("#slvr-qv-left").outerHeight() && i("#slvr-qv-left").outerHeight(i("#slvr-qv-right").outerHeight()), i.slvrfancybox.hideLoading())
                      )
                    }, 300)
            }, a.onerror = function() {
                console.error("Cannot load image"), i.slvrfancybox.hideLoading()
            }, a.src = i("#slvr-qv-zoomImg").attr("src"), i("#slvr-qv-right").outerHeight() > i(".slvr-fancybox-inner").outerHeight() && (i("#slvr-qv-left").outerHeight(""), i("#slvr-qv-left").height(""), i("#slvr-qv-right").outerHeight(""), i("#slvr-qv-right").height(""), i(".slvr-fancybox-inner").css("overflow", "auto"));
            */
        },
        displayQuickView = function(t) {
            t = SLVRShopify.jQuery;
            var e = !1,
                o = 9999,
                i = 9999,
                n = parseInt(settings.wd_width, 10) || 720,
                a = parseInt(settings.wd_height, 10) || 200;
            "auto" != settings.wd_width && "auto" != settings.wd_height || (e = !0, o = n), "auto" != settings.wd_height && (i = a), t(".slvr-qv-button").slvrfancybox({
                arrows: !1,
                openEffect: "elastic",
                scrolling: "no",
                maxHeight: i,
                maxWidth: o,
                autoSize: e,
                minHeight: a,
                minWidth: n,
                title: null,
                helpers: {
                    overlay: {
                        locked: overlay_lock
                    }
                },
                beforeLoad: function() {
                    loadProductFromCart(t), cleanTemplate(t, t("#slvr-qv-showqv")), t("#slvr-qv-addcart-msg").hide(), t("#slvr-qv-sale").addClass("slvr-qv-hidden");
                    var e = t(this.element);
                    e.slvrshowLoading();
                    var o = e.attr("handle");
                    if (null != o) getProductJson(t, t.trim(o), callbackQV);
                    else if (0 < t('span[class="slvr-qv-handle"]', e.parent()).length) {
                        o = t('span[class="slvr-qv-handle"]', e.parent());
                        getProductJson(t, t.trim(o.html()), callbackQV)
                    } else o = t("span", e.parent()), t.parseJSON(t.trim(o.html()))
                },
                afterShow: function() {},
                afterClose: function() {
                    t.slvrfancybox.hideLoading()
                }
            })
        },
        zoomAllProduct = function(e) {
            var o = !1;
            isMoblieBrowser() || isTablet() || (o = !0)
            // setTimeout(function(){
            //   jQuery('#slvr-qv-zoomcontainer').slick({
            //     accessibility: true,
            //     arrows: false,
            //     dots: true,
            //     infinite: false,
            //     fade: true,
            //     draggable: true,
            //     slidesToShow: 1,
            //     centerMode: true,
            //     slidesToScroll: 1,
            //     asNavFor: '#slvr-qv-galleryid'
            //   });
            //
            //   jQuery('#slvr-qv-galleryid').slick({
            //     slidesToShow: 4,
            //     slidesToScroll: 1,
            //     asNavFor: '#slvr-qv-zoomcontainer',
            //     dots: false,
            //     arrows: false,
            //     vertical: true,
            //     infinite: false,
            //     verticalSwiping: true,
            //     focusOnSelect: true
            //   });
            // }, 50);


            e("#slvr-qv-zoomImg").elevateZoom({
                gallery: "slvr-qv-galleryid",
                zoomWindowOffetx: 0,
                //zoomWindowOffetx: 10,
                borderSize: 1,
                scrollZoom: 0,
                //scrollZoom: o,
                cursor: "pointer",
                zoomEnabled: 0
                //zoomEnabled: o
            })
        },
        customProductSlider = function(e) {
          var sel = document.querySelector('#slvr-qv-zoomcontainer');
            setTimeout(function() {
              jQuery('#slvr-qv-zoomcontainer').slick({
                accessibility: true,
                arrows: false,
                dots: true,
                infinite: false,
                fade: true,
                draggable: true,
                slidesToShow: 1,
                centerMode: true,
                slidesToScroll: 1
              });

              jQuery('#slvr-qv-galleryid').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '#slvr-qv-zoomcontainer',
                dots: false,
                arrows: false,
                vertical: true,
                infinite: false,
                verticalSwiping: true,
                focusOnSelect: true
              });
            }, 50);
        },
        onAddCartClicked = function($) {
            function updateCartcount(e) {
                var o = parseInt($('[name="quantity"]', e).val(), 10) || 1,
                    t = (parseInt($(settings.cartcount).text(), 10) || 0) + o;
                return $(settings.cartcount).text(t), $(settings.cartcount).show(), o
            }

            function updateCartTotal() {
                $.getJSON("/cart.js", function(e) {
                    $(settings.cart_total).html(SLVRShopify.formatMoney(e.total_price, moneyFormat)), $(settings.cart_total).show()
                })
            }

            function updateCart(o, e) {
                console.log(e), $.ajax({
                    type: "get",
                    cache: !1,
                    async: !1,
                    url: e,
                    success: function(e) {
                        var n = $("<div/>").html(e);
                        $.each(o.split("|"), function(e, o) {
                            var t = $.trim(o),
                                i = $(t, n);
                            $(t).empty(), $(t).append(i.html())
                        })
                    },
                    error: function() {
                        console.log("add to cart error")
                    }
                })
            }

            function addItem(e, o) {
              var i = o.serialize().split('&'),
              id = i[0].replace('id=', ''),
              quantity = i[1].replace('quantity=');
              CartJS.addItem(id, quantity, {}, {
                  "success": function(data, textStatus, jqXHR) {
                      slvronSuccess(data)
                  },
                  "error": function(jqXHR, textStatus, errorThrown) {
                      slvronError;
                  }
              });
                // $.ajax({
                //     type: "POST",
                //     url: "/cart/add.js",
                //     dataType: "json",
                //     data: o.serialize(),
                //     success: slvronSuccess(o),
                //     error: slvronError
                // }).done(function(e) {
                //     try {
                //         Shopify.getCart(function() {
                //             var e = window.location.protocol + "//" + window.location.host + window.location.pathname;
                //             updateCart(settings.cartcount + "|" + settings.cart_total, e), SLVRShopify.cartCallback()
                //         })
                //     } catch (e) {
                //         var o = window.location.protocol + "//" + window.location.host + window.location.pathname;
                //         updateCart(settings.cartcount + "|" + settings.cart_total, o)
                //     }
                // })
            }
            void 0 === SLVRShopify.cartCallback && (SLVRShopify.cartCallback = function() {}), $(".slvr-qv-cartbtn").click(function(e) {
                var o = $("#slvr-qv-add-item-form");
                if ($(this).attr("form-id") && "" != $(this).attr("form-id") && (o = $($(this).attr("form-id"))), "no" == settings.cart_go) {
                    var t = $(this);
                    $(t).prop("disabled", !0), e.preventDefault(), addItem("slvr-qv-add-item-form", o)
                } else o.attr("action", "/cart/add"), o.submit()
            });
            var slvronSuccess = function(e) {
                    $("#slvr-qv-addcart-msg").hide(), $("#slvr-qv-addcart-msg").html(product_added), $("#slvr-qv-addcart-msg").fadeIn(700, function() {
                        $(".slvr-qv-cartbtn", e).removeAttr("disabled")
                    })
                },
                slvronError = function(XMLHttpRequest, textStatus) {
                    var data = eval("(" + XMLHttpRequest.responseText + ")");
                    data.message ? alert(data.message + "(" + data.status + "): " + data.description) : alert("Error : " + SLVRfullMessagesFromErrors(data).join("; ") + "."), $(".slvr-qv-cartbtn").removeAttr("disabled")
                },
                SLVRfullMessagesFromErrors = function(e) {
                    var i = [];
                    return $.each(e, function(t, e) {
                        $.each(e, function(e, o) {
                            i.push(t + " " + o)
                        })
                    }), i
                }
        },
        $checkVersion = function(e, o) {
            try {
                var t = e.split("."),
                    i = o.split("."),
                    n = 1e8 * parseInt(t[0]) + 1e6 * parseInt(t[1]) + 1e4 * parseInt(t[2]),
                    a = 1e8 * parseInt(i[0]) + 1e6 * parseInt(i[1]) + 1e4 * parseInt(i[2]);
                return a < n ? 1 : n < a ? -1 : 0
            } catch (e) {
                console.log(e)
            }
            return 1
        };

    function isTablet() {
        return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    function isMoblieBrowser() {
        var e, o = !1;
        try {
            e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (o = !0)
        } catch (e) {
            console.log(e)
        }
        return o
    }
    SLVRShopify.loaded || (SLVRShopify.loaded = !0, console.log("load jquery 1.11"), loadScript("//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js", function() {
        jQuery191 = jQuery.noConflict(!0), SLVRShopify.jQuery = jQuery191, jQuery191(document).ready(function() {
            //if (!(0 < jQuery191('script:contains("slvr-qv-scripts-noconfig"):contains("asyncLoad")').length)) return SLVRShopify.loaded = !1;
            loadScript("//cdnjs.cloudflare.com/ajax/libs/json2/20160511/json2.min.js", function() {});
            SLVRShopify.initSettings(jQuery191)
        })
    }))
}();
