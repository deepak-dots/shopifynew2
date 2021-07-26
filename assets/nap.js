var NAP = NAP || {};
(function($) {
  NAP.widget = {
    init: function() {
      NAP.device();
      NAP.customZoom();

    },
    _initCustomSlider: function() {
      console.log('_initCustomSlider');
      var self = this;
      if (!$('.product-image').length) {
        return;
      }
      var previ = document.querySelector('.prev-i'),
      nexti = document.querySelector('.next-i');
      if (previ) {
        previ.addEventListener('click', function(e){
          console.log('click');
          e.preventDefault();
          var i = this.getAttribute('data-icount');
          console.log('[data-itemcount="'+ i+'"]');
          document.querySelector('[data-itemcount="'+ i+'"]').click();
          NAP.widget._initChangeArrowCounter();
        });

      }

      nexti&&nexti.addEventListener('click', function(e){
        e.preventDefault();
        var i = this.getAttribute('data-icount');
        //console.log('[data-itemcount="'+ i+'"]');
        document.querySelector('[data-itemcount="'+ i+'"]').click();
        NAP.widget._initChangeArrowCounter();
      });
    },
    _initChangeArrowCounter: function() {
      console.log('_initChangeArrowCounter');
      var previ = document.querySelector('.prev-i'),
      nexti = document.querySelector('.next-i'),
      at = document.querySelector('.product-image .active'),
      atc = (at)?eval(at.getAttribute('data-itemcount')):1,
      atcn = eval(atc) + 1;
      if(atcn > $('.product-image').length) {
        nexti.setAttribute('data-icount', 1);
        previ.setAttribute('data-icount', eval(atc- 1));
      } else {
        nexti.setAttribute('data-icount', atcn);
        if(atc == 1) {
          previ.setAttribute('data-icount', $('.product-image').length);
        } else {
          previ.setAttribute('data-icount', eval(atc- 1));
        }
      }
    },
  },
  NAP.device = function() {
    var a, b, c, d, e, f, g, h, i, j;
    a = window.device, window.device = {}, c = window.document.documentElement, j = window.navigator.userAgent.toLowerCase(), device.ios = function() {
        return device.iphone() || device.ipod() || device.ipad()
    }, device.iphone = function() {
        return d("iphone")
    }, device.ipod = function() {
        return d("ipod")
    }, device.ipad = function() {
        return d("ipad")
    }, device.android = function() {
        return d("android")
    }, device.androidPhone = function() {
        return device.android() && d("mobile")
    }, device.androidTablet = function() {
        return device.android() && !d("mobile")
    }, device.blackberry = function() {
        return d("blackberry") || d("bb10") || d("rim")
    }, device.blackberryPhone = function() {
        return device.blackberry() && !d("tablet")
    }, device.blackberryTablet = function() {
        return device.blackberry() && d("tablet")
    }, device.windows = function() {
        return d("windows")
    }, device.windowsPhone = function() {
        return device.windows() && d("phone")
    }, device.windowsTablet = function() {
        return device.windows() && d("touch") && !device.windowsPhone()
    }, device.fxos = function() {
        return (d("(mobile;") || d("(tablet;")) && d("; rv:")
    }, device.fxosPhone = function() {
        return device.fxos() && d("mobile")
    }, device.fxosTablet = function() {
        return device.fxos() && d("tablet")
    }, device.meego = function() {
        return d("meego")
    }, device.cordova = function() {
        return window.cordova && "file:" === location.protocol
    }, device.nodeWebkit = function() {
        return "object" == typeof window.process
    }, device.mobile = function() {
        return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego()
    }, device.tablet = function() {
        return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet()
    }, device.desktop = function() {
        return !device.tablet() && !device.mobile()
    }, device.portrait = function() {
        return window.innerHeight / window.innerWidth > 1
    }, device.landscape = function() {
        return window.innerHeight / window.innerWidth < 1
    }, device.noConflict = function() {
        return window.device = a, this
    }, d = function(a) {
        return -1 !== j.indexOf(a)
    }, f = function(a) {
        var b;
        return b = new RegExp(a, "i"), c.className.match(b)
    }, b = function(a) {
        return f(a) ? void 0 : c.className += " " + a
    }, h = function(a) {
        return f(a) ? c.className = c.className.replace(a, "") : void 0
    }, device.ios() ? device.ipad() ? b("ios ipad tablet") : device.iphone() ? b("ios iphone mobile") : device.ipod() && b("ios ipod mobile") : b(device.android() ? device.androidTablet() ? "android tablet" : "android mobile" : device.blackberry() ? device.blackberryTablet() ? "blackberry tablet" : "blackberry mobile" : device.windows() ? device.windowsTablet() ? "windows tablet" : device.windowsPhone() ? "windows mobile" : "desktop" : device.fxos() ? device.fxosTablet() ? "fxos tablet" : "fxos mobile" : device.meego() ? "meego mobile" : device.nodeWebkit() ? "node-webkit" : "desktop"), device.cordova() && b("cordova"), e = function() {
        return device.landscape() ? (h("portrait"), b("landscape")) : (h("landscape"), b("portrait"))
    }, i = "onorientationchange" in window, g = i ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(g, e, !1) : window.attachEvent ? window.attachEvent(g, e) : window[g] = e, e()
  }
  NAP.viewportTools = function() {
    function a() {
      return {
        height: window.innerHeight,
        width: window.innerWidth
      }
    }

    function b() {
      return window.scrollY
    }
    return {
      getScrollPosTop: b,
      getViewportSize: a
    }
  }(),
  NAP.customZoom = function() {
    !function(a) {
        var b = function(b, c) {
            this.config = c || {},
            this._selectorEl = b,
            this._winWidth = 0,
            this._winHeight = 0,
            this._transformPrefix = ["transform", "msTransform", "webkitTransform", "mozTransform"], this._cssTransform = this._getSupportedPropertyName(),
            this._analyticsFired = !1,
            this._zoomSettings = {
                imgEl: null,
                imgSrc: "",
                imgWidth: this.config.imgWidth || 920,
                imgHeight: this.config.imgHeight || 1380,
                xMaxPos: 0,
                yMaxPos: 0
            },
            this.config.touchEnabled = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
            var d = 'close', ic = document.querySelectorAll(".product-image").length;
            this._zoomTemplate = [
              '<div class="image-zoom-inner">',
              '<div class="image-container"><img class="zoomed-image" src="{{imgSrc}}" width="{{imgWidth}}" height="{{imgHeight}}" /></div>',
              '<div class="close-container js-close-zoom"><span class="close-copy js-close-zoom">',
              d,
              '</span><span class="js-close-zoom close-icon icon-cross_black" aria-label="',
              d, '"></span></div>',
              '<div id="image-gallery-nav hide"><a href ="arrow-left" class="prev-img prev-i" data-icount="'+ic+'">prev</a><a href="arrow-right" class="next-img next-i" data-icount="2">next</a></div>',
              "</div>"].join(""),
              this._orientation = window.device.portrait() ? "portrait" : "landscape",
              this._xPosTouchStart = 0,
              this._yPosTouchStart = 0,
              this._xImageTanslate = 0,
              this._yImageTanslate = 0,
              this._handlerTouchStart = null,
              this._handlerTouchMove = null,
              this._handlerMousemove = null,
              this._handlerCloseClick = null,
              this._handlerCloseTouch = null,
              this._handlerDeviceRotate = null,
              this._isTouchMoving = !1,
              this.extendZoomInSize = -1 !== navigator.userAgent.toLowerCase().indexOf("iphone") && -1 === navigator.userAgent.toLowerCase().indexOf("crios") ? 55 : 0
        };
        b.prototype._getSupportedPropertyName = function() {
            for (var a = 0, b = this._transformPrefix.length; b > a; a++)
                if ("undefined" != typeof document.body.style[this._transformPrefix[a]]) return this._transformPrefix[a];
            return null
        }, b.prototype._populateTemplate = function() {
            var a, b, c = this._zoomSettings,
                d = this._zoomTemplate;
            for (a in c) b = new RegExp("{{" + a + "}}", "ig"), d = d.replace(b, c[a]);
            return d
        }, b.prototype._getTouchStartPos = function(a) {
            this._xPosTouchStart = a.touches[0].clientX,
            this._yPosTouchStart = a.touches[0].clientY
        }, b.prototype._getImagePos = function() {
            var a = this._zoomSettings.imgEl.style[this._cssTransform];
            this._xTranslate = parseInt(/\(([^,]+),([^,]+),[^,]+\)/.exec(a)[1], 10), this._yTranslate = parseInt(/\(([^,]+),([^,]+),[^,]+\)/.exec(a)[2], 10)
        }, b.prototype._setImgMaxPos = function() {
            this._zoomSettings.xMaxPos = this._winWidth - this._zoomSettings.imgWidth, this._zoomSettings.yMaxPos = this._winHeight - this._zoomSettings.imgHeight
        }, b.prototype._setActiveImageSource = function() {
            this._zoomSettings.imgSrc = this._selectorEl.getElementsByClassName("product-image active")[0].getAttribute("src")
        }, b.prototype._setActiveImageElement = function() {
            var a = document.createElement("div"),
                b = document.querySelector(".main-content"),
                c = this._populateTemplate();
            a.className = a.className + "image-zoom-container",
            document.body.className = document.body.className + " fixed-body",
            a.innerHTML = c,
            b.parentNode.insertBefore(a, b.nextSibling),
            this._zoomSettings.imgEl = document.getElementsByClassName("zoomed-image")[0]
        }, b.prototype._loadHigResImage = function() {
            var a = document.createElement("img"),
                b = this._zoomSettings.imgEl,
                c = b.src;
            c = c.replace(/_([a-z]+)\.jpg/, "_xl.jpg"),
            a.addEventListener("load", function() {
                b.src = c
            }), a.src = c
        }, b.prototype._removeZoomContainer = function() {
            var a = document.getElementsByClassName("image-zoom-container")[0],
                b = document.body, c = document.querySelector('.page-container');
            a && (b.className = b.className.replace(/\bfixed-body\b/, ""), c.removeChild(a))
        }, b.prototype._onSetImgPos = function(a) {
            var b = ((this._winWidth - this._zoomSettings.imgWidth) * (a.clientX / this._winWidth)).toFixed(2),
                c = ((this._winHeight - this._zoomSettings.imgHeight) * (a.clientY / this._winHeight)).toFixed(2);
            this._zoomSettings.imgEl.style[this._cssTransform] = "translate3d(" + b + "px , " + c + "px, 0)"
        }, b.prototype._onSetImgPosY = function(a) {
            var b = ((this._winHeight - this._zoomSettings.imgHeight) * (a.clientY / this._winHeight)).toFixed(2);
            this._zoomSettings.imgEl.style[this._cssTransform] = "translate3d(0 , " + b + "px, 0)"
        }, b.prototype._onSetImgPosTouch = function(a) {
            if (a) {
                var b = this._xPosTouchStart - a.touches[0].clientX,
                    c = this._yPosTouchStart - a.touches[0].clientY,
                    d = this._xTranslate - b > this._zoomSettings.xMaxPos ? this._xTranslate - b : this._zoomSettings.xMaxPos,
                    e = this._yTranslate - c > this._zoomSettings.yMaxPos ? this._yTranslate - c : this._zoomSettings.yMaxPos;
                d = 0 > d ? d : 0, e = 0 > e ? e : 0, this._zoomSettings.imgEl.style[this._cssTransform] = "translate3d(" + d + "px, " + e + "px, 0)"
            } else this._zoomSettings.imgEl.style[this._cssTransform] = "portrait" === this._orientation ? "translate3d(" + (this._winWidth - this._zoomSettings.imgWidth) / 2 + "px, " + (this._winHeight - this.extendZoomInSize - this._zoomSettings.imgHeight) / 2 + "px, 0)" : "translate3d(0, " + (this._winHeight - this._zoomSettings.imgHeight) / 2 + "px, 0)"
        }, b.prototype._getPositionTouchStart = function(a) {
            var b = this,
                c = function(a) {
                    b._getTouchStartPos(a), b._getImagePos()
                };
            return document.body.addEventListener(a, c), c
        }, b.prototype._getPositionTouchMove = function(a) {
            var b = this,
                c = function(a) {
                    a.preventDefault(), b._isTouchMoving = !0, b._onSetImgPosTouch(a)
                };
            return document.body.addEventListener(a, c), c
        }, b.prototype._setOrientation = function() {
            switch (!0) {
                case window.device.portrait() && "landscape" === this._orientation:
                    this._orientation = "portrait", this._winWidth = a.viewportTools.getViewportSize().width, this._winHeight = a.viewportTools.getViewportSize().height, this._setImgMaxPos(), this._onSetImgPosTouch();
                    break;
                case window.device.landscape() && "portrait" === this._orientation:
                    this._orientation = "landscape", this._winWidth = a.viewportTools.getViewportSize().width, this._winHeight = a.viewportTools.getViewportSize().height, this._setImgMaxPos(), this._onSetImgPosTouch()
            }
        }, b.prototype._createDeviceRotate = function(a) {
            var b = this,
                c = function() {
                    b._setOrientation()
                };
            return window.addEventListener(a, c), c
        }, b.prototype._createMoveEventHandler = function(a) {
            var b = this,
                c = function(a) {
                    b._winWidth <= b._zoomSettings.imgWidth ? b._onSetImgPos(a) : b._onSetImgPosY(a)
                };
            return document.body.addEventListener(a, c), c
        }, b.prototype._createCloseEventHandler = function(a) {
            var b = this,
                c = function(a) {
                    a.preventDefault(), /\bjs-close-zoom\b/.test(a.target.className) && b.stopZoom(), /\bzoomed-image\b/.test(a.target.className) && (b._isTouchMoving === !1 ? b.stopZoom() : b._isTouchMoving = !1)
                };
            return document.body.addEventListener(a, c), c
        }, b.prototype._deleteEventHandler = function(a, b) {
            document.body.removeEventListener(a, b)
        }, b.prototype._bindImageZoomEventHandlers = function() {
            this.config.touchEnabled ? (this._handlerTouchStart = this._getPositionTouchStart("touchstart"), this._handlerTouchMove = this._getPositionTouchMove("touchmove"), this._handlerDeviceRotate = this._createDeviceRotate("deviceorientation")) : this._handlerMousemove = this._createMoveEventHandler("mousemove"), this._handlerCloseClick = this._createCloseEventHandler("click"), this._handlerCloseTouch = this._createCloseEventHandler("touchend")
        }, b.prototype._unBindImageZoomEventHandlers = function() {
            this.config.touchEnabled ? (this._deleteEventHandler("touchstart", this._handlerTouchStart), this._deleteEventHandler("touchmove", this._handlerTouchMove), this._deleteEventHandler("deviceorientation", this._handlerDeviceRotate)) : this._deleteEventHandler("mousemove", this._handlerMousemove), this._deleteEventHandler("click", this._handlerCloseClick), this._deleteEventHandler("touchend", this._handlerCloseTouch)
        }, b.prototype.startZoom = function(b, c) {
            this._winWidth = a.viewportTools.getViewportSize().width, this._winHeight = a.viewportTools.getViewportSize().height, this._setImgMaxPos(), this._setActiveImageSource(), this._setActiveImageElement(), this.config.touchEnabled ? this._onSetImgPosTouch() : this._onSetImgPosY(b), this._loadHigResImage(), this._bindImageZoomEventHandlers(), "function" == typeof c && c.call()
        }, b.prototype.stopZoom = function(a) {
            this._removeZoomContainer(), this._unBindImageZoomEventHandlers(), "function" == typeof a && a.call()
        },
        NAP.ProductDetails = NAP.ProductDetails || {}, NAP.ProductDetails.ImageZoom = b
    }(NAP),
    function(a) {
    var b = function(a, b) {
        this.config = b || {}, this._selectorEl = a, this._imgThumbsArr = [], this._imgThumbObj = {
            html: null
        }, this._imgThumbsTemplate = ['<div class="image-zoom-thumbnail-prev-button swiper-button"><span class="icon-arrow_up"></span></div>', '<div class="image-zoom-thumbnail-container">', '<ul class="image-zoom-thumbnails">', "{{html}}", "</ul>", "</div>", '<div class="image-zoom-thumbnail-next-button swiper-button"><span class="icon-arrow_down"></span></div>'].join(""), this._zoomContainerEl = document.getElementsByClassName("image-zoom-container")[0], this._zoomedImg = this._zoomContainerEl.getElementsByClassName("zoomed-image")[0], this._handlerImgSwitchClick = null, this._handlerImgSwitchTouch = null
    };
    b.prototype._populateTemplate = function(a, b) {
        var c, d, e = a,
            f = b;
        for (c in e) d = new RegExp("{{" + c + "}}", "ig"), f = f.replace(d, e[c]);
        return f
    }, b.prototype._copyImgListHTML = function() {
        console.log(this._selectorEl);
        for (var a = this._selectorEl.querySelector("ul.thumbnails"), b = a.getElementsByTagName("li"), c = 0, d = b.length; d > c; c++) this._createImgThumbArr(b[c].cloneNode(!0))
    }, b.prototype._createImgThumbArr = function(a) {
        /\bswiper-slide-duplicate\b/.test(a.className) || (this._removeAttributes(a), this._imgThumbsArr.push(a.outerHTML))
    }, b.prototype._removeAttributes = function(a) {
        a.removeAttribute("class"), a.removeAttribute("style"), a.removeAttribute("data-swiper-slide-index")
    }, b.prototype._createImgList = function() {
        this._imgThumbObj.html = this._imgThumbsArr.join("");
        var a = this._populateTemplate(this._imgThumbObj, this._imgThumbsTemplate),
            b = document.createElement("div");
        b.className = b.className + "image-zoom-thumbnail-wrapper", b.innerHTML = a, document.getElementsByClassName("image-zoom-inner")[0].appendChild(b)
    }, b.prototype._createCarousel = function() {}, b.prototype._changeZoomImage = function(a) {
      console.log(a);
        this._zoomedImg.src = a.getAttribute('data-zoom')
    }, b.prototype._loadHigResImage = function() {
        var a = document.createElement("img"),
            b = this._zoomedImg,
            c = b.src;
        c = c.replace(/_([a-z]+)\.jpg/, "_xl.jpg"), a.addEventListener("load", function() {
            b.src = c
        }), a.src = c
    }, b.prototype._createClickEventHandler = function(a) {
        var b = this,
            c = function(a) {
                /\bthumbnail-image\b/.test(a.target.className) && (b._changeZoomImage(a.target), b._loadHigResImage())
            };
        return this._zoomContainerEl.addEventListener(a, c), c
    }, b.prototype._deleteEventHandler = function(a, b) {
        document.body.removeEventListener(a, b)
    }, b.prototype._bindImageZoomEventHandlers = function() {
        this._handlerImgSwitchClick = this._createClickEventHandler("click"), this._handlerImgSwitchTouch = this._createClickEventHandler("touchstart")
    }, b.prototype._unBindImageZoomEventHandlers = function() {
        this._deleteEventHandler("click", this._handlerImgSwitchClick), this._deleteEventHandler("touchstart", this._handlerImgSwitchTouch)
    }, b.prototype.startZoomCarousel = function() {
        this._copyImgListHTML(), this._createImgList(), this._imgThumbsArr.length > 5 && Swiper && this._createCarousel(), this._bindImageZoomEventHandlers()
    }, b.prototype.stopZoomCarousel = function() {
        this._unBindImageZoomEventHandlers()
    }, NAP.ProductDetails = NAP.ProductDetails || {}, NAP.ProductDetails.ImageZoomCarousel = b
}(NAP)
    var a = document.getElementById("main-image-carousel"),
        b = document.getElementsByClassName("main-carousel-wrapper")[0],
        c = new NAP.ProductDetails.ImageZoom(a),
        d = null;

    a && (a.addEventListener("click", function(a) {
      var pi = document.querySelectorAll(".product-image"),
      izc = document.querySelector('.image-zoom-container');
      izc?izc.remove():'';
      for(i=0;i<pi.length; i++){pi[i].classList.remove('active');}
      a.target.classList.add('active')
        !a.target.classList.contains("product-image") || a.target.parentNode.classList.contains("video-poster") || b.classList.contains("video-open") || c.startZoom(a, function() {
          console.log('Product image zoomed');


        }),d = new NAP.ProductDetails.ImageZoomCarousel(document.querySelector(".thumbnail-wrapper")), d.startZoomCarousel();
    }), window.addEventListener("keydown", function(a) {
        27 === a.which && c.stopZoom(function() {
            d.stopZoomCarousel()
        })
    }));

  },
  NAP.documentOnReady = {
    init: function() {
      NAP.widget.init();
    }
  };
  var $window = $(window),
    $body = $('body'),
    DOC = $(document);
  $(document).ready( NAP.documentOnReady.init );
})(jQuery);
