// ---------------- 狀態列 -------------------------------------
	$.fn.extend({
	    Progress: function(options) {
	        var settings = {
	            width: 130,
	            height: 18,
	            percent: 0, 
	            backgroundColor: '#555', 
	            barColor: '#d9534f',
	            fontColor: '#fff',
	            radius: 4,
	            fontSize: 16, 
	            increaseTime: 1000.00 / 60.00,
	            increaseSpeed: 0.75,
	            animate: true
	        };
	        $.extend(settings, options);

	        var $svg = $(this),
	            $background, $bar, $g, $text, timeout;

	        function progressPercent(p) {
	            if (!$.isNumeric(p) || p < 0) {
	                return 0;
	            } else if (p > 100) {
	                return 100;
	            } else {
	                return p;
	            }
	        }
			
	        var Animate = {
	            getWidth: function() {
	                return settings.width * settings.percent / 100.00;
	            },
	            getPercent: function(currentWidth) {
	                return parseInt((100 * currentWidth / settings.width).toFixed(2));
	            },
	            animateWidth: function(currentWidth, targetWidth) {
					
	                timeout = setTimeout(function() {
	                    if (currentWidth > targetWidth) {
	                        if (currentWidth - settings.increaseSpeed <= targetWidth) {
	                            currentWidth = targetWidth;
	                        } else {
	                            currentWidth = currentWidth - settings.increaseSpeed;
	                        }
	                    } else if (currentWidth < targetWidth) {
	                        if (currentWidth + settings.increaseSpeed >= targetWidth) {
	                            currentWidth = targetWidth;
	                        } else {
	                            currentWidth = currentWidth + settings.increaseSpeed;
	                        }
	                    }

	                    $bar.attr("width", currentWidth);
	                    $text.empty().append(Animate.getPercent(currentWidth) + "%");

	                    if (currentWidth != targetWidth) {
	                        Animate.animateWidth(currentWidth, targetWidth);
	                    }
	                }, settings.increaseTime);
	            }
	        }

	        function svg(tag) {
	            return document.createElementNS("http://www.w3.org/2000/svg", tag);
	        }

			// initialize
	        ! function() {
	            settings.percent = progressPercent(settings.percent);

	            $svg.attr({
	                'width': settings.width,
	                'height': settings.height
	            });

	            $background = $(svg("rect")).appendTo($svg)
	                .attr({
	                    x: 0,
	                    rx: settings.radius,
	                    width: settings.width,
	                    height: settings.height,
	                    fill: settings.backgroundColor
	                });

	            $bar = $(svg("rect")).appendTo($svg)
	                .attr({
	                    x: 0,
	                    rx: settings.radius,
	                    height: settings.height,
	                    fill: settings.barColor
	                });

	            $g = $(svg("g")).appendTo($svg)
	                .attr({
	                    "fill": "#fff",
	                    "text-anchor": "middle",
	                    "font-family": "DejaVu Sans,Verdana,Geneva,sans-serif",
	                    "font-size": settings.fontSize
	                });

	            $text = $(svg("text")).appendTo($g)
	                .attr({
	                    "x": settings.width / 2.0,
	                    "y": settings.height / 2.0 + settings.fontSize / 3.0,
	                    fill: settings.fontColor
	                });

	            draw();
	        }();

			
	        function draw() {
	            var targetWidth = Animate.getWidth();
				
	            if (settings.animate) {
	                if (timeout) {
	                    clearTimeout(timeout);
	                }
	                var currentWidth = parseFloat($bar.attr("width"));
	                if (!currentWidth) currentWidth = 0;

	                Animate.animateWidth(currentWidth, targetWidth);
	            } else {
	                $bar.attr("width", targetWidth);
	                $text.empty().append(settings.percent + "%");
	            }
	        }

	        this.percent = function(p) {
	            if (p) {
	                p = progressPercent(p);

	                settings.percent = p;
	                draw();
	            }
	            return settings.percent;
	        }
	        return this;
	    }
	});

	// ------------------------------------ circle經驗條 ----------------------------
	setInterval(function() {
	    $('.circle').each(function(index, el) {
	        var num = $(this).find('span').text() * 3.6;
	        if (num <= 180) {
	            $(this).find('.right').css('transform', "rotate(" + num + "deg)");
				$(this).find('.left').css('transform', "rotate(0deg)");
	        } 
			else if (num >= 180){
	            $(this).find('.right').css('transform', "rotate(180deg)");
	            $(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
	        }
	    });
	}, 250);

	// ------------------------------------ jquery.ui.touch-punch.min ----------------
	!function(a) {
	    function f(a, b) {
	        if (!(a.originalEvent.touches.length > 1)) {
	            a.preventDefault();
	            var c = a.originalEvent.changedTouches[0],
	                d = document.createEvent("MouseEvents");
	            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null),
	                a.target.dispatchEvent(d)
	        }
	    }
	    if (a.support.touch = "ontouchend" in document, a.support.touch) {
	        var e, b = a.ui.mouse.prototype,
	            c = b._mouseInit,
	            d = b._mouseDestroy;
	        b._touchStart = function(a) {
	            var b = this;
	            !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, "mouseover"), f(a, "mousemove"), f(a, "mousedown"))
	        }, b._touchMove = function(a) {
	            e && (this._touchMoved = !0, f(a, "mousemove"))
	        }, b._touchEnd = function(a) {
	            e && (f(a, "mouseup"), f(a, "mouseout"), this._touchMoved || f(a, "click"), e = !1)
	        }, b._mouseInit = function() {
	            var b = this;
	            b.element.bind({
	                touchstart: a.proxy(b, "_touchStart"),
	                touchmove: a.proxy(b, "_touchMove"),
	                touchend: a.proxy(b, "_touchEnd")
	            }), c.call(b)
	        }, b._mouseDestroy = function() {
	            var b = this;
	            b.element.unbind({
	                touchstart: a.proxy(b, "_touchStart"),
	                touchmove: a.proxy(b, "_touchMove"),
	                touchend: a.proxy(b, "_touchEnd")
	            }), d.call(b)
	        }
	    }
	}(jQuery);
	
	// ----------------------------------- 拖拉 -------------------------------------------
	
	$(function(){
		$( "#foodImg1,#foodImg2,#foodImg3,#foodImg4,#drinkImg,#sportImg1,#sportImg2,#sportImg3,#cureImg1,#cureImg2,#cureImg3" ).draggable({ 
			revert: "invalid", // when not dropped, the item will revert back to its initial position
			containment: "document",
			helper: "clone",
			cursor: "pointer"});   
	});
	  
	  