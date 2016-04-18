/*!

 This is not a Leaflet 3D, but Leaflet and D3 :-)	

 Leaflet, a JavaScript library for mobile-friendly interactive maps. http://leafletjs.com
 (c) 2010-2013, Vladimir Agafonkin
 (c) 2010-2011, CloudMade

 D3 
 Copyright (c) 2010-2015, Michael Bostock
 All rights reserved.
 Full licence here: https://github.com/mbostock/d3/blob/master/LICENSE

*/
! function(a, b, c) {
	var d = a.L,
		e = {};
	e.version = "0.7.5", "object" == typeof module && "object" == typeof module.exports ? module.exports = e : "function" == typeof define && define.amd && define(e), e.noConflict = function() {
			return a.L = d, this
		}, a.L = e, e.Util = {
			extend: function(a) {
				var b, c, d, e, f = Array.prototype.slice.call(arguments, 1);
				for (c = 0, d = f.length; d > c; c++) {
					e = f[c] || {};
					for (b in e) e.hasOwnProperty(b) && (a[b] = e[b])
				}
				return a
			},
			bind: function(a, b) {
				var c = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
				return function() {
					return a.apply(b, c || arguments)
				}
			},
			stamp: function() {
				var a = 0,
					b = "_leaflet_id";
				return function(c) {
					return c[b] = c[b] || ++a, c[b]
				}
			}(),
			invokeEach: function(a, b, c) {
				var d, e;
				if ("object" == typeof a) {
					e = Array.prototype.slice.call(arguments, 3);
					for (d in a) b.apply(c, [d, a[d]].concat(e));
					return !0
				}
				return !1
			},
			limitExecByInterval: function(a, b, c) {
				var d, e;
				return function f() {
					var g = arguments;
					return d ? void(e = !0) : (d = !0, setTimeout(function() {
						d = !1, e && (f.apply(c, g), e = !1)
					}, b), void a.apply(c, g))
				}
			},
			falseFn: function() {
				return !1
			},
			formatNum: function(a, b) {
				var c = Math.pow(10, b || 5);
				return Math.round(a * c) / c
			},
			trim: function(a) {
				return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
			},
			splitWords: function(a) {
				return e.Util.trim(a).split(/\s+/)
			},
			setOptions: function(a, b) {
				return a.options = e.extend({}, a.options, b), a.options
			},
			getParamString: function(a, b, c) {
				var d = [];
				for (var e in a) d.push(encodeURIComponent(c ? e.toUpperCase() : e) + "=" + encodeURIComponent(a[e]));
				return (b && -1 !== b.indexOf("?") ? "&" : "?") + d.join("&")
			},
			template: function(a, b) {
				return a.replace(/\{ *([\w_]+) *\}/g, function(a, d) {
					var e = b[d];
					if (e === c) throw new Error("No value provided for variable " + a);
					return "function" == typeof e && (e = e(b)), e
				})
			},
			isArray: Array.isArray || function(a) {
				return "[object Array]" === Object.prototype.toString.call(a)
			},
			emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
		},
		function() {
			function b(b) {
				var c, d, e = ["webkit", "moz", "o", "ms"];
				for (c = 0; c < e.length && !d; c++) d = a[e[c] + b];
				return d
			}

			function c(b) {
				var c = +new Date,
					e = Math.max(0, 16 - (c - d));
				return d = c + e, a.setTimeout(b, e)
			}
			var d = 0,
				f = a.requestAnimationFrame || b("RequestAnimationFrame") || c,
				g = a.cancelAnimationFrame || b("CancelAnimationFrame") || b("CancelRequestAnimationFrame") || function(b) {
					a.clearTimeout(b)
				};
			e.Util.requestAnimFrame = function(b, d, g, h) {
				return b = e.bind(b, d), g && f === c ? void b() : f.call(a, b, h)
			}, e.Util.cancelAnimFrame = function(b) {
				b && g.call(a, b)
			}
		}(), e.extend = e.Util.extend, e.bind = e.Util.bind, e.stamp = e.Util.stamp, e.setOptions = e.Util.setOptions, e.Class = function() {}, e.Class.extend = function(a) {
			var b = function() {
					this.initialize && this.initialize.apply(this, arguments), this._initHooks && this.callInitHooks()
				},
				c = function() {};
			c.prototype = this.prototype;
			var d = new c;
			d.constructor = b, b.prototype = d;
			for (var f in this) this.hasOwnProperty(f) && "prototype" !== f && (b[f] = this[f]);
			a.statics && (e.extend(b, a.statics), delete a.statics), a.includes && (e.Util.extend.apply(null, [d].concat(a.includes)), delete a.includes), a.options && d.options && (a.options = e.extend({}, d.options, a.options)), e.extend(d, a), d._initHooks = [];
			var g = this;
			return b.__super__ = g.prototype, d.callInitHooks = function() {
				if (!this._initHooksCalled) {
					g.prototype.callInitHooks && g.prototype.callInitHooks.call(this), this._initHooksCalled = !0;
					for (var a = 0, b = d._initHooks.length; b > a; a++) d._initHooks[a].call(this)
				}
			}, b
		}, e.Class.include = function(a) {
			e.extend(this.prototype, a)
		}, e.Class.mergeOptions = function(a) {
			e.extend(this.prototype.options, a)
		}, e.Class.addInitHook = function(a) {
			var b = Array.prototype.slice.call(arguments, 1),
				c = "function" == typeof a ? a : function() {
					this[a].apply(this, b)
				};
			this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(c)
		};
	var f = "_leaflet_events";
	e.Mixin = {}, e.Mixin.Events = {
			addEventListener: function(a, b, c) {
				if (e.Util.invokeEach(a, this.addEventListener, this, b, c)) return this;
				var d, g, h, i, j, k, l, m = this[f] = this[f] || {},
					n = c && c !== this && e.stamp(c);
				for (a = e.Util.splitWords(a), d = 0, g = a.length; g > d; d++) h = {
					action: b,
					context: c || this
				}, i = a[d], n ? (j = i + "_idx", k = j + "_len", l = m[j] = m[j] || {}, l[n] || (l[n] = [], m[k] = (m[k] || 0) + 1), l[n].push(h)) : (m[i] = m[i] || [], m[i].push(h));
				return this
			},
			hasEventListeners: function(a) {
				var b = this[f];
				return !!b && (a in b && b[a].length > 0 || a + "_idx" in b && b[a + "_idx_len"] > 0)
			},
			removeEventListener: function(a, b, c) {
				if (!this[f]) return this;
				if (!a) return this.clearAllEventListeners();
				if (e.Util.invokeEach(a, this.removeEventListener, this, b, c)) return this;
				var d, g, h, i, j, k, l, m, n, o = this[f],
					p = c && c !== this && e.stamp(c);
				for (a = e.Util.splitWords(a), d = 0, g = a.length; g > d; d++)
					if (h = a[d], k = h + "_idx", l = k + "_len", m = o[k], b) {
						if (i = p && m ? m[p] : o[h]) {
							for (j = i.length - 1; j >= 0; j--) i[j].action !== b || c && i[j].context !== c || (n = i.splice(j, 1), n[0].action = e.Util.falseFn);
							c && m && 0 === i.length && (delete m[p], o[l]--)
						}
					} else delete o[h], delete o[k], delete o[l];
				return this
			},
			clearAllEventListeners: function() {
				return delete this[f], this
			},
			fireEvent: function(a, b) {
				if (!this.hasEventListeners(a)) return this;
				var c, d, g, h, i, j = e.Util.extend({}, b, {
						type: a,
						target: this
					}),
					k = this[f];
				if (k[a])
					for (c = k[a].slice(), d = 0, g = c.length; g > d; d++) c[d].action.call(c[d].context, j);
				h = k[a + "_idx"];
				for (i in h)
					if (c = h[i].slice())
						for (d = 0, g = c.length; g > d; d++) c[d].action.call(c[d].context, j);
				return this
			},
			addOneTimeEventListener: function(a, b, c) {
				if (e.Util.invokeEach(a, this.addOneTimeEventListener, this, b, c)) return this;
				var d = e.bind(function() {
					this.removeEventListener(a, b, c).removeEventListener(a, d, c)
				}, this);
				return this.addEventListener(a, b, c).addEventListener(a, d, c)
			}
		}, e.Mixin.Events.on = e.Mixin.Events.addEventListener, e.Mixin.Events.off = e.Mixin.Events.removeEventListener, e.Mixin.Events.once = e.Mixin.Events.addOneTimeEventListener, e.Mixin.Events.fire = e.Mixin.Events.fireEvent,
		function() {
			var d = "ActiveXObject" in a,
				f = d && !b.addEventListener,
				g = navigator.userAgent.toLowerCase(),
				h = -1 !== g.indexOf("webkit"),
				i = -1 !== g.indexOf("chrome"),
				j = -1 !== g.indexOf("phantom"),
				k = -1 !== g.indexOf("android"),
				l = -1 !== g.search("android [23]"),
				m = -1 !== g.indexOf("gecko"),
				n = typeof orientation != c + "",
				o = !a.PointerEvent && a.MSPointerEvent,
				p = a.PointerEvent && a.navigator.pointerEnabled && a.navigator.maxTouchPoints || o,
				q = "devicePixelRatio" in a && a.devicePixelRatio > 1 || "matchMedia" in a && a.matchMedia("(min-resolution:144dpi)") && a.matchMedia("(min-resolution:144dpi)").matches,
				r = b.documentElement,
				s = d && "transition" in r.style,
				t = "WebKitCSSMatrix" in a && "m11" in new a.WebKitCSSMatrix && !l,
				u = "MozPerspective" in r.style,
				v = "OTransition" in r.style,
				w = !a.L_DISABLE_3D && (s || t || u || v) && !j,
				x = !a.L_NO_TOUCH && !j && (p || "ontouchstart" in a || a.DocumentTouch && b instanceof a.DocumentTouch);
			e.Browser = {
				ie: d,
				ielt9: f,
				webkit: h,
				gecko: m && !h && !a.opera && !d,
				android: k,
				android23: l,
				chrome: i,
				ie3d: s,
				webkit3d: t,
				gecko3d: u,
				opera3d: v,
				any3d: w,
				mobile: n,
				mobileWebkit: n && h,
				mobileWebkit3d: n && t,
				mobileOpera: n && a.opera,
				touch: x,
				msPointer: o,
				pointer: p,
				retina: q
			}
		}(), e.Point = function(a, b, c) {
			this.x = c ? Math.round(a) : a, this.y = c ? Math.round(b) : b
		}, e.Point.prototype = {
			clone: function() {
				return new e.Point(this.x, this.y)
			},
			add: function(a) {
				return this.clone()._add(e.point(a))
			},
			_add: function(a) {
				return this.x += a.x, this.y += a.y, this
			},
			subtract: function(a) {
				return this.clone()._subtract(e.point(a))
			},
			_subtract: function(a) {
				return this.x -= a.x, this.y -= a.y, this
			},
			divideBy: function(a) {
				return this.clone()._divideBy(a)
			},
			_divideBy: function(a) {
				return this.x /= a, this.y /= a, this
			},
			multiplyBy: function(a) {
				return this.clone()._multiplyBy(a)
			},
			_multiplyBy: function(a) {
				return this.x *= a, this.y *= a, this
			},
			round: function() {
				return this.clone()._round()
			},
			_round: function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this
			},
			floor: function() {
				return this.clone()._floor()
			},
			_floor: function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
			},
			distanceTo: function(a) {
				a = e.point(a);
				var b = a.x - this.x,
					c = a.y - this.y;
				return Math.sqrt(b * b + c * c)
			},
			equals: function(a) {
				return a = e.point(a), a.x === this.x && a.y === this.y
			},
			contains: function(a) {
				return a = e.point(a), Math.abs(a.x) <= Math.abs(this.x) && Math.abs(a.y) <= Math.abs(this.y)
			},
			toString: function() {
				return "Point(" + e.Util.formatNum(this.x) + ", " + e.Util.formatNum(this.y) + ")"
			}
		}, e.point = function(a, b, d) {
			return a instanceof e.Point ? a : e.Util.isArray(a) ? new e.Point(a[0], a[1]) : a === c || null === a ? a : new e.Point(a, b, d)
		}, e.Bounds = function(a, b) {
			if (a)
				for (var c = b ? [a, b] : a, d = 0, e = c.length; e > d; d++) this.extend(c[d])
		}, e.Bounds.prototype = {
			extend: function(a) {
				return a = e.point(a), this.min || this.max ? (this.min.x = Math.min(a.x, this.min.x), this.max.x = Math.max(a.x, this.max.x), this.min.y = Math.min(a.y, this.min.y), this.max.y = Math.max(a.y, this.max.y)) : (this.min = a.clone(), this.max = a.clone()), this
			},
			getCenter: function(a) {
				return new e.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, a)
			},
			getBottomLeft: function() {
				return new e.Point(this.min.x, this.max.y)
			},
			getTopRight: function() {
				return new e.Point(this.max.x, this.min.y)
			},
			getSize: function() {
				return this.max.subtract(this.min)
			},
			contains: function(a) {
				var b, c;
				return a = "number" == typeof a[0] || a instanceof e.Point ? e.point(a) : e.bounds(a), a instanceof e.Bounds ? (b = a.min, c = a.max) : b = c = a, b.x >= this.min.x && c.x <= this.max.x && b.y >= this.min.y && c.y <= this.max.y
			},
			intersects: function(a) {
				a = e.bounds(a);
				var b = this.min,
					c = this.max,
					d = a.min,
					f = a.max,
					g = f.x >= b.x && d.x <= c.x,
					h = f.y >= b.y && d.y <= c.y;
				return g && h
			},
			isValid: function() {
				return !(!this.min || !this.max)
			}
		}, e.bounds = function(a, b) {
			return !a || a instanceof e.Bounds ? a : new e.Bounds(a, b)
		}, e.Transformation = function(a, b, c, d) {
			this._a = a, this._b = b, this._c = c, this._d = d
		}, e.Transformation.prototype = {
			transform: function(a, b) {
				return this._transform(a.clone(), b)
			},
			_transform: function(a, b) {
				return b = b || 1, a.x = b * (this._a * a.x + this._b), a.y = b * (this._c * a.y + this._d), a
			},
			untransform: function(a, b) {
				return b = b || 1, new e.Point((a.x / b - this._b) / this._a, (a.y / b - this._d) / this._c)
			}
		}, e.DomUtil = {
			get: function(a) {
				return "string" == typeof a ? b.getElementById(a) : a
			},
			getStyle: function(a, c) {
				var d = a.style[c];
				if (!d && a.currentStyle && (d = a.currentStyle[c]), (!d || "auto" === d) && b.defaultView) {
					var e = b.defaultView.getComputedStyle(a, null);
					d = e ? e[c] : null
				}
				return "auto" === d ? null : d
			},
			getViewportOffset: function(a) {
				var c, d = 0,
					f = 0,
					g = a,
					h = b.body,
					i = b.documentElement;
				do {
					if (d += g.offsetTop || 0, f += g.offsetLeft || 0, d += parseInt(e.DomUtil.getStyle(g, "borderTopWidth"), 10) || 0, f += parseInt(e.DomUtil.getStyle(g, "borderLeftWidth"), 10) || 0, c = e.DomUtil.getStyle(g, "position"), g.offsetParent === h && "absolute" === c) break;
					if ("fixed" === c) {
						d += h.scrollTop || i.scrollTop || 0, f += h.scrollLeft || i.scrollLeft || 0;
						break
					}
					if ("relative" === c && !g.offsetLeft) {
						var j = e.DomUtil.getStyle(g, "width"),
							k = e.DomUtil.getStyle(g, "max-width"),
							l = g.getBoundingClientRect();
						("none" !== j || "none" !== k) && (f += l.left + g.clientLeft), d += l.top + (h.scrollTop || i.scrollTop || 0);
						break
					}
					g = g.offsetParent
				} while (g);
				g = a;
				do {
					if (g === h) break;
					d -= g.scrollTop || 0, f -= g.scrollLeft || 0, g = g.parentNode
				} while (g);
				return new e.Point(f, d)
			},
			documentIsLtr: function() {
				return e.DomUtil._docIsLtrCached || (e.DomUtil._docIsLtrCached = !0, e.DomUtil._docIsLtr = "ltr" === e.DomUtil.getStyle(b.body, "direction")), e.DomUtil._docIsLtr
			},
			create: function(a, c, d) {
				var e = b.createElement(a);
				return e.className = c, d && d.appendChild(e), e
			},
			hasClass: function(a, b) {
				if (a.classList !== c) return a.classList.contains(b);
				var d = e.DomUtil._getClass(a);
				return d.length > 0 && new RegExp("(^|\\s)" + b + "(\\s|$)").test(d)
			},
			addClass: function(a, b) {
				if (a.classList !== c)
					for (var d = e.Util.splitWords(b), f = 0, g = d.length; g > f; f++) a.classList.add(d[f]);
				else if (!e.DomUtil.hasClass(a, b)) {
					var h = e.DomUtil._getClass(a);
					e.DomUtil._setClass(a, (h ? h + " " : "") + b)
				}
			},
			removeClass: function(a, b) {
				a.classList !== c ? a.classList.remove(b) : e.DomUtil._setClass(a, e.Util.trim((" " + e.DomUtil._getClass(a) + " ").replace(" " + b + " ", " ")))
			},
			_setClass: function(a, b) {
				a.className.baseVal === c ? a.className = b : a.className.baseVal = b
			},
			_getClass: function(a) {
				return a.className.baseVal === c ? a.className : a.className.baseVal
			},
			setOpacity: function(a, b) {
				if ("opacity" in a.style) a.style.opacity = b;
				else if ("filter" in a.style) {
					var c = !1,
						d = "DXImageTransform.Microsoft.Alpha";
					try {
						c = a.filters.item(d)
					} catch (e) {
						if (1 === b) return
					}
					b = Math.round(100 * b), c ? (c.Enabled = 100 !== b, c.Opacity = b) : a.style.filter += " progid:" + d + "(opacity=" + b + ")"
				}
			},
			testProp: function(a) {
				for (var c = b.documentElement.style, d = 0; d < a.length; d++)
					if (a[d] in c) return a[d];
				return !1
			},
			getTranslateString: function(a) {
				var b = e.Browser.webkit3d,
					c = "translate" + (b ? "3d" : "") + "(",
					d = (b ? ",0" : "") + ")";
				return c + a.x + "px," + a.y + "px" + d
			},
			getScaleString: function(a, b) {
				var c = e.DomUtil.getTranslateString(b.add(b.multiplyBy(-1 * a))),
					d = " scale(" + a + ") ";
				return c + d
			},
			setPosition: function(a, b, c) {
				a._leaflet_pos = b, !c && e.Browser.any3d ? a.style[e.DomUtil.TRANSFORM] = e.DomUtil.getTranslateString(b) : (a.style.left = b.x + "px", a.style.top = b.y + "px")
			},
			getPosition: function(a) {
				return a._leaflet_pos
			}
		}, e.DomUtil.TRANSFORM = e.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), e.DomUtil.TRANSITION = e.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]), e.DomUtil.TRANSITION_END = "webkitTransition" === e.DomUtil.TRANSITION || "OTransition" === e.DomUtil.TRANSITION ? e.DomUtil.TRANSITION + "End" : "transitionend",
		function() {
			if ("onselectstart" in b) e.extend(e.DomUtil, {
				disableTextSelection: function() {
					e.DomEvent.on(a, "selectstart", e.DomEvent.preventDefault)
				},
				enableTextSelection: function() {
					e.DomEvent.off(a, "selectstart", e.DomEvent.preventDefault)
				}
			});
			else {
				var c = e.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
				e.extend(e.DomUtil, {
					disableTextSelection: function() {
						if (c) {
							var a = b.documentElement.style;
							this._userSelect = a[c], a[c] = "none"
						}
					},
					enableTextSelection: function() {
						c && (b.documentElement.style[c] = this._userSelect, delete this._userSelect)
					}
				})
			}
			e.extend(e.DomUtil, {
				disableImageDrag: function() {
					e.DomEvent.on(a, "dragstart", e.DomEvent.preventDefault)
				},
				enableImageDrag: function() {
					e.DomEvent.off(a, "dragstart", e.DomEvent.preventDefault)
				}
			})
		}(), e.LatLng = function(a, b, d) {
			if (a = parseFloat(a), b = parseFloat(b), isNaN(a) || isNaN(b)) throw new Error("Invalid LatLng object: (" + a + ", " + b + ")");
			this.lat = a, this.lng = b, d !== c && (this.alt = parseFloat(d))
		}, e.extend(e.LatLng, {
			DEG_TO_RAD: Math.PI / 180,
			RAD_TO_DEG: 180 / Math.PI,
			MAX_MARGIN: 1e-9
		}), e.LatLng.prototype = {
			equals: function(a) {
				if (!a) return !1;
				a = e.latLng(a);
				var b = Math.max(Math.abs(this.lat - a.lat), Math.abs(this.lng - a.lng));
				return b <= e.LatLng.MAX_MARGIN
			},
			toString: function(a) {
				return "LatLng(" + e.Util.formatNum(this.lat, a) + ", " + e.Util.formatNum(this.lng, a) + ")"
			},
			distanceTo: function(a) {
				a = e.latLng(a);
				var b = 6378137,
					c = e.LatLng.DEG_TO_RAD,
					d = (a.lat - this.lat) * c,
					f = (a.lng - this.lng) * c,
					g = this.lat * c,
					h = a.lat * c,
					i = Math.sin(d / 2),
					j = Math.sin(f / 2),
					k = i * i + j * j * Math.cos(g) * Math.cos(h);
				return 2 * b * Math.atan2(Math.sqrt(k), Math.sqrt(1 - k))
			},
			wrap: function(a, b) {
				var c = this.lng;
				return a = a || -180, b = b || 180, c = (c + b) % (b - a) + (a > c || c === b ? b : a), new e.LatLng(this.lat, c)
			}
		}, e.latLng = function(a, b) {
			return a instanceof e.LatLng ? a : e.Util.isArray(a) ? "number" == typeof a[0] || "string" == typeof a[0] ? new e.LatLng(a[0], a[1], a[2]) : null : a === c || null === a ? a : "object" == typeof a && "lat" in a ? new e.LatLng(a.lat, "lng" in a ? a.lng : a.lon) : b === c ? null : new e.LatLng(a, b)
		}, e.LatLngBounds = function(a, b) {
			if (a)
				for (var c = b ? [a, b] : a, d = 0, e = c.length; e > d; d++) this.extend(c[d])
		}, e.LatLngBounds.prototype = {
			extend: function(a) {
				if (!a) return this;
				var b = e.latLng(a);
				return a = null !== b ? b : e.latLngBounds(a), a instanceof e.LatLng ? this._southWest || this._northEast ? (this._southWest.lat = Math.min(a.lat, this._southWest.lat), this._southWest.lng = Math.min(a.lng, this._southWest.lng), this._northEast.lat = Math.max(a.lat, this._northEast.lat), this._northEast.lng = Math.max(a.lng, this._northEast.lng)) : (this._southWest = new e.LatLng(a.lat, a.lng), this._northEast = new e.LatLng(a.lat, a.lng)) : a instanceof e.LatLngBounds && (this.extend(a._southWest), this.extend(a._northEast)), this
			},
			pad: function(a) {
				var b = this._southWest,
					c = this._northEast,
					d = Math.abs(b.lat - c.lat) * a,
					f = Math.abs(b.lng - c.lng) * a;
				return new e.LatLngBounds(new e.LatLng(b.lat - d, b.lng - f), new e.LatLng(c.lat + d, c.lng + f))
			},
			getCenter: function() {
				return new e.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
			},
			getSouthWest: function() {
				return this._southWest
			},
			getNorthEast: function() {
				return this._northEast
			},
			getNorthWest: function() {
				return new e.LatLng(this.getNorth(), this.getWest())
			},
			getSouthEast: function() {
				return new e.LatLng(this.getSouth(), this.getEast())
			},
			getWest: function() {
				return this._southWest.lng
			},
			getSouth: function() {
				return this._southWest.lat
			},
			getEast: function() {
				return this._northEast.lng
			},
			getNorth: function() {
				return this._northEast.lat
			},
			contains: function(a) {
				a = "number" == typeof a[0] || a instanceof e.LatLng ? e.latLng(a) : e.latLngBounds(a);
				var b, c, d = this._southWest,
					f = this._northEast;
				return a instanceof e.LatLngBounds ? (b = a.getSouthWest(), c = a.getNorthEast()) : b = c = a, b.lat >= d.lat && c.lat <= f.lat && b.lng >= d.lng && c.lng <= f.lng
			},
			intersects: function(a) {
				a = e.latLngBounds(a);
				var b = this._southWest,
					c = this._northEast,
					d = a.getSouthWest(),
					f = a.getNorthEast(),
					g = f.lat >= b.lat && d.lat <= c.lat,
					h = f.lng >= b.lng && d.lng <= c.lng;
				return g && h
			},
			toBBoxString: function() {
				return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
			},
			equals: function(a) {
				return a ? (a = e.latLngBounds(a), this._southWest.equals(a.getSouthWest()) && this._northEast.equals(a.getNorthEast())) : !1
			},
			isValid: function() {
				return !(!this._southWest || !this._northEast)
			}
		}, e.latLngBounds = function(a, b) {
			return !a || a instanceof e.LatLngBounds ? a : new e.LatLngBounds(a, b)
		}, e.Projection = {}, e.Projection.SphericalMercator = {
			MAX_LATITUDE: 85.0511287798,
			project: function(a) {
				var b = e.LatLng.DEG_TO_RAD,
					c = this.MAX_LATITUDE,
					d = Math.max(Math.min(c, a.lat), -c),
					f = a.lng * b,
					g = d * b;
				return g = Math.log(Math.tan(Math.PI / 4 + g / 2)), new e.Point(f, g)
			},
			unproject: function(a) {
				var b = e.LatLng.RAD_TO_DEG,
					c = a.x * b,
					d = (2 * Math.atan(Math.exp(a.y)) - Math.PI / 2) * b;
				return new e.LatLng(d, c)
			}
		}, e.Projection.LonLat = {
			project: function(a) {
				return new e.Point(a.lng, a.lat)
			},
			unproject: function(a) {
				return new e.LatLng(a.y, a.x)
			}
		}, e.CRS = {
			latLngToPoint: function(a, b) {
				var c = this.projection.project(a),
					d = this.scale(b);
				return this.transformation._transform(c, d)
			},
			pointToLatLng: function(a, b) {
				var c = this.scale(b),
					d = this.transformation.untransform(a, c);
				return this.projection.unproject(d)
			},
			project: function(a) {
				return this.projection.project(a)
			},
			scale: function(a) {
				return 256 * Math.pow(2, a)
			},
			getSize: function(a) {
				var b = this.scale(a);
				return e.point(b, b)
			}
		}, e.CRS.Simple = e.extend({}, e.CRS, {
			projection: e.Projection.LonLat,
			transformation: new e.Transformation(1, 0, -1, 0),
			scale: function(a) {
				return Math.pow(2, a)
			}
		}), e.CRS.EPSG3857 = e.extend({}, e.CRS, {
			code: "EPSG:3857",
			projection: e.Projection.SphericalMercator,
			transformation: new e.Transformation(.5 / Math.PI, .5, -.5 / Math.PI, .5),
			project: function(a) {
				var b = this.projection.project(a),
					c = 6378137;
				return b.multiplyBy(c)
			}
		}), e.CRS.EPSG900913 = e.extend({}, e.CRS.EPSG3857, {
			code: "EPSG:900913"
		}), e.CRS.EPSG4326 = e.extend({}, e.CRS, {
			code: "EPSG:4326",
			projection: e.Projection.LonLat,
			transformation: new e.Transformation(1 / 360, .5, -1 / 360, .5)
		}), e.Map = e.Class.extend({
			includes: e.Mixin.Events,
			options: {
				crs: e.CRS.EPSG3857,
				fadeAnimation: e.DomUtil.TRANSITION && !e.Browser.android23,
				trackResize: !0,
				markerZoomAnimation: e.DomUtil.TRANSITION && e.Browser.any3d
			},
			initialize: function(a, b) {
				b = e.setOptions(this, b), this._initContainer(a), this._initLayout(), this._onResize = e.bind(this._onResize, this), this._initEvents(), b.maxBounds && this.setMaxBounds(b.maxBounds), b.center && b.zoom !== c && this.setView(e.latLng(b.center), b.zoom, {
					reset: !0
				}), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._tileLayersNum = 0, this.callInitHooks(), this._addLayers(b.layers)
			},
			setView: function(a, b) {
				return b = b === c ? this.getZoom() : b, this._resetView(e.latLng(a), this._limitZoom(b)), this
			},
			setZoom: function(a, b) {
				return this._loaded ? this.setView(this.getCenter(), a, {
					zoom: b
				}) : (this._zoom = this._limitZoom(a), this)
			},
			zoomIn: function(a, b) {
				return this.setZoom(this._zoom + (a || 1), b)
			},
			zoomOut: function(a, b) {
				return this.setZoom(this._zoom - (a || 1), b)
			},
			setZoomAround: function(a, b, c) {
				var d = this.getZoomScale(b),
					f = this.getSize().divideBy(2),
					g = a instanceof e.Point ? a : this.latLngToContainerPoint(a),
					h = g.subtract(f).multiplyBy(1 - 1 / d),
					i = this.containerPointToLatLng(f.add(h));
				return this.setView(i, b, {
					zoom: c
				})
			},
			fitBounds: function(a, b) {
				b = b || {}, a = a.getBounds ? a.getBounds() : e.latLngBounds(a);
				var c = e.point(b.paddingTopLeft || b.padding || [0, 0]),
					d = e.point(b.paddingBottomRight || b.padding || [0, 0]),
					f = this.getBoundsZoom(a, !1, c.add(d));
				f = b.maxZoom ? Math.min(b.maxZoom, f) : f;
				var g = d.subtract(c).divideBy(2),
					h = this.project(a.getSouthWest(), f),
					i = this.project(a.getNorthEast(), f),
					j = this.unproject(h.add(i).divideBy(2).add(g), f);
				return this.setView(j, f, b)
			},
			fitWorld: function(a) {
				return this.fitBounds([
					[-90, -180],
					[90, 180]
				], a)
			},
			panTo: function(a, b) {
				return this.setView(a, this._zoom, {
					pan: b
				})
			},
			panBy: function(a) {
				return this.fire("movestart"), this._rawPanBy(e.point(a)), this.fire("move"), this.fire("moveend")
			},
			setMaxBounds: function(a) {
				return a = e.latLngBounds(a), this.options.maxBounds = a, a ? (this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds, this)) : this.off("moveend", this._panInsideMaxBounds, this)
			},
			panInsideBounds: function(a, b) {
				var c = this.getCenter(),
					d = this._limitCenter(c, this._zoom, a);
				return c.equals(d) ? this : this.panTo(d, b)
			},
			addLayer: function(a) {
				var b = e.stamp(a);
				return this._layers[b] ? this : (this._layers[b] = a, !a.options || isNaN(a.options.maxZoom) && isNaN(a.options.minZoom) || (this._zoomBoundLayers[b] = a, this._updateZoomLevels()), this.options.zoomAnimation && e.TileLayer && a instanceof e.TileLayer && (this._tileLayersNum++, this._tileLayersToLoad++, a.on("load", this._onTileLayerLoad, this)), this._loaded && this._layerAdd(a), this)
			},
			removeLayer: function(a) {
				var b = e.stamp(a);
				return this._layers[b] ? (this._loaded && a.onRemove(this), delete this._layers[b], this._loaded && this.fire("layerremove", {
					layer: a
				}), this._zoomBoundLayers[b] && (delete this._zoomBoundLayers[b], this._updateZoomLevels()), this.options.zoomAnimation && e.TileLayer && a instanceof e.TileLayer && (this._tileLayersNum--, this._tileLayersToLoad--, a.off("load", this._onTileLayerLoad, this)), this) : this
			},
			hasLayer: function(a) {
				return a ? e.stamp(a) in this._layers : !1
			},
			eachLayer: function(a, b) {
				for (var c in this._layers) a.call(b, this._layers[c]);
				return this
			},
			invalidateSize: function(a) {
				if (!this._loaded) return this;
				a = e.extend({
					animate: !1,
					pan: !0
				}, a === !0 ? {
					animate: !0
				} : a);
				var b = this.getSize();
				this._sizeChanged = !0, this._initialCenter = null;
				var c = this.getSize(),
					d = b.divideBy(2).round(),
					f = c.divideBy(2).round(),
					g = d.subtract(f);
				return g.x || g.y ? (a.animate && a.pan ? this.panBy(g) : (a.pan && this._rawPanBy(g), this.fire("move"), a.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(e.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
					oldSize: b,
					newSize: c
				})) : this
			},
			addHandler: function(a, b) {
				if (!b) return this;
				var c = this[a] = new b(this);
				return this._handlers.push(c), this.options[a] && c.enable(), this
			},
			remove: function() {
				this._loaded && this.fire("unload"), this._initEvents("off");
				try {
					delete this._container._leaflet
				} catch (a) {
					this._container._leaflet = c
				}
				return this._clearPanes(), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this
			},
			getCenter: function() {
				return this._checkIfLoaded(), this._initialCenter && !this._moved() ? this._initialCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
			},
			getZoom: function() {
				return this._zoom
			},
			getBounds: function() {
				var a = this.getPixelBounds(),
					b = this.unproject(a.getBottomLeft()),
					c = this.unproject(a.getTopRight());
				return new e.LatLngBounds(b, c)
			},
			getMinZoom: function() {
				return this.options.minZoom === c ? this._layersMinZoom === c ? 0 : this._layersMinZoom : this.options.minZoom
			},
			getMaxZoom: function() {
				return this.options.maxZoom === c ? this._layersMaxZoom === c ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
			},
			getBoundsZoom: function(a, b, c) {
				a = e.latLngBounds(a);
				var d, f = this.getMinZoom() - (b ? 1 : 0),
					g = this.getMaxZoom(),
					h = this.getSize(),
					i = a.getNorthWest(),
					j = a.getSouthEast(),
					k = !0;
				c = e.point(c || [0, 0]);
				do f++, d = this.project(j, f).subtract(this.project(i, f)).add(c), k = b ? d.x < h.x || d.y < h.y : h.contains(d); while (k && g >= f);
				return k && b ? null : b ? f : f - 1
			},
			getSize: function() {
				return (!this._size || this._sizeChanged) && (this._size = new e.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1), this._size.clone()
			},
			getPixelBounds: function() {
				var a = this._getTopLeftPoint();
				return new e.Bounds(a, a.add(this.getSize()))
			},
			getPixelOrigin: function() {
				return this._checkIfLoaded(), this._initialTopLeftPoint
			},
			getPanes: function() {
				return this._panes
			},
			getContainer: function() {
				return this._container
			},
			getZoomScale: function(a) {
				var b = this.options.crs;
				return b.scale(a) / b.scale(this._zoom)
			},
			getScaleZoom: function(a) {
				return this._zoom + Math.log(a) / Math.LN2
			},
			project: function(a, b) {
				return b = b === c ? this._zoom : b, this.options.crs.latLngToPoint(e.latLng(a), b)
			},
			unproject: function(a, b) {
				return b = b === c ? this._zoom : b, this.options.crs.pointToLatLng(e.point(a), b)
			},
			layerPointToLatLng: function(a) {
				var b = e.point(a).add(this.getPixelOrigin());
				return this.unproject(b)
			},
			latLngToLayerPoint: function(a) {
				var b = this.project(e.latLng(a))._round();
				return b._subtract(this.getPixelOrigin())
			},
			containerPointToLayerPoint: function(a) {
				return e.point(a).subtract(this._getMapPanePos())
			},
			layerPointToContainerPoint: function(a) {
				return e.point(a).add(this._getMapPanePos())
			},
			containerPointToLatLng: function(a) {
				var b = this.containerPointToLayerPoint(e.point(a));
				return this.layerPointToLatLng(b)
			},
			latLngToContainerPoint: function(a) {
				return this.layerPointToContainerPoint(this.latLngToLayerPoint(e.latLng(a)))
			},
			mouseEventToContainerPoint: function(a) {
				return e.DomEvent.getMousePosition(a, this._container)
			},
			mouseEventToLayerPoint: function(a) {
				return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(a))
			},
			mouseEventToLatLng: function(a) {
				return this.layerPointToLatLng(this.mouseEventToLayerPoint(a))
			},
			_initContainer: function(a) {
				var b = this._container = e.DomUtil.get(a);
				if (!b) throw new Error("Map container not found.");
				if (b._leaflet) throw new Error("Map container is already initialized.");
				b._leaflet = !0
			},
			_initLayout: function() {
				var a = this._container;
				e.DomUtil.addClass(a, "leaflet-container" + (e.Browser.touch ? " leaflet-touch" : "") + (e.Browser.retina ? " leaflet-retina" : "") + (e.Browser.ielt9 ? " leaflet-oldie" : "") + (this.options.fadeAnimation ? " leaflet-fade-anim" : ""));
				var b = e.DomUtil.getStyle(a, "position");
				"absolute" !== b && "relative" !== b && "fixed" !== b && (a.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
			},
			_initPanes: function() {
				var a = this._panes = {};
				this._mapPane = a.mapPane = this._createPane("leaflet-map-pane", this._container), this._tilePane = a.tilePane = this._createPane("leaflet-tile-pane", this._mapPane), a.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane), a.shadowPane = this._createPane("leaflet-shadow-pane"), a.overlayPane = this._createPane("leaflet-overlay-pane"), a.markerPane = this._createPane("leaflet-marker-pane"), a.popupPane = this._createPane("leaflet-popup-pane");
				var b = " leaflet-zoom-hide";
				this.options.markerZoomAnimation || (e.DomUtil.addClass(a.markerPane, b), e.DomUtil.addClass(a.shadowPane, b), e.DomUtil.addClass(a.popupPane, b))
			},
			_createPane: function(a, b) {
				return e.DomUtil.create("div", a, b || this._panes.objectsPane)
			},
			_clearPanes: function() {
				this._container.removeChild(this._mapPane)
			},
			_addLayers: function(a) {
				a = a ? e.Util.isArray(a) ? a : [a] : [];
				for (var b = 0, c = a.length; c > b; b++) this.addLayer(a[b])
			},
			_resetView: function(a, b, c, d) {
				var f = this._zoom !== b;
				d || (this.fire("movestart"), f && this.fire("zoomstart")), this._zoom = b, this._initialCenter = a, this._initialTopLeftPoint = this._getNewTopLeftPoint(a), c ? this._initialTopLeftPoint._add(this._getMapPanePos()) : e.DomUtil.setPosition(this._mapPane, new e.Point(0, 0)), this._tileLayersToLoad = this._tileLayersNum;
				var g = !this._loaded;
				this._loaded = !0, this.fire("viewreset", {
					hard: !c
				}), g && (this.fire("load"), this.eachLayer(this._layerAdd, this)), this.fire("move"), (f || d) && this.fire("zoomend"), this.fire("moveend", {
					hard: !c
				})
			},
			_rawPanBy: function(a) {
				e.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(a))
			},
			_getZoomSpan: function() {
				return this.getMaxZoom() - this.getMinZoom()
			},
			_updateZoomLevels: function() {
				var a, b = 1 / 0,
					d = -(1 / 0),
					e = this._getZoomSpan();
				for (a in this._zoomBoundLayers) {
					var f = this._zoomBoundLayers[a];
					isNaN(f.options.minZoom) || (b = Math.min(b, f.options.minZoom)), isNaN(f.options.maxZoom) || (d = Math.max(d, f.options.maxZoom))
				}
				a === c ? this._layersMaxZoom = this._layersMinZoom = c : (this._layersMaxZoom = d, this._layersMinZoom = b), e !== this._getZoomSpan() && this.fire("zoomlevelschange")
			},
			_panInsideMaxBounds: function() {
				this.panInsideBounds(this.options.maxBounds)
			},
			_checkIfLoaded: function() {
				if (!this._loaded) throw new Error("Set map center and zoom first.")
			},
			_initEvents: function(b) {
				if (e.DomEvent) {
					b = b || "on", e.DomEvent[b](this._container, "click", this._onMouseClick, this);
					var c, d, f = ["dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu"];
					for (c = 0, d = f.length; d > c; c++) e.DomEvent[b](this._container, f[c], this._fireMouseEvent, this);
					this.options.trackResize && e.DomEvent[b](a, "resize", this._onResize, this)
				}
			},
			_onResize: function() {
				e.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = e.Util.requestAnimFrame(function() {
					this.invalidateSize({
						debounceMoveend: !0
					})
				}, this, !1, this._container)
			},
			_onMouseClick: function(a) {
				!this._loaded || !a._simulated && (this.dragging && this.dragging.moved() || this.boxZoom && this.boxZoom.moved()) || e.DomEvent._skipped(a) || (this.fire("preclick"), this._fireMouseEvent(a))
			},
			_fireMouseEvent: function(a) {
				if (this._loaded && !e.DomEvent._skipped(a)) {
					var b = a.type;
					if (b = "mouseenter" === b ? "mouseover" : "mouseleave" === b ? "mouseout" : b, this.hasEventListeners(b)) {
						"contextmenu" === b && e.DomEvent.preventDefault(a);
						var c = this.mouseEventToContainerPoint(a),
							d = this.containerPointToLayerPoint(c),
							f = this.layerPointToLatLng(d);
						this.fire(b, {
							latlng: f,
							layerPoint: d,
							containerPoint: c,
							originalEvent: a
						})
					}
				}
			},
			_onTileLayerLoad: function() {
				this._tileLayersToLoad--, this._tileLayersNum && !this._tileLayersToLoad && this.fire("tilelayersload")
			},
			_clearHandlers: function() {
				for (var a = 0, b = this._handlers.length; b > a; a++) this._handlers[a].disable()
			},
			whenReady: function(a, b) {
				return this._loaded ? a.call(b || this, this) : this.on("load", a, b), this
			},
			_layerAdd: function(a) {
				a.onAdd(this), this.fire("layeradd", {
					layer: a
				})
			},
			_getMapPanePos: function() {
				return e.DomUtil.getPosition(this._mapPane)
			},
			_moved: function() {
				var a = this._getMapPanePos();
				return a && !a.equals([0, 0])
			},
			_getTopLeftPoint: function() {
				return this.getPixelOrigin().subtract(this._getMapPanePos())
			},
			_getNewTopLeftPoint: function(a, b) {
				var c = this.getSize()._divideBy(2);
				return this.project(a, b)._subtract(c)._round()
			},
			_latLngToNewLayerPoint: function(a, b, c) {
				var d = this._getNewTopLeftPoint(c, b).add(this._getMapPanePos());
				return this.project(a, b)._subtract(d)
			},
			_getCenterLayerPoint: function() {
				return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
			},
			_getCenterOffset: function(a) {
				return this.latLngToLayerPoint(a).subtract(this._getCenterLayerPoint())
			},
			_limitCenter: function(a, b, c) {
				if (!c) return a;
				var d = this.project(a, b),
					f = this.getSize().divideBy(2),
					g = new e.Bounds(d.subtract(f), d.add(f)),
					h = this._getBoundsOffset(g, c, b);
				return this.unproject(d.add(h), b)
			},
			_limitOffset: function(a, b) {
				if (!b) return a;
				var c = this.getPixelBounds(),
					d = new e.Bounds(c.min.add(a), c.max.add(a));
				return a.add(this._getBoundsOffset(d, b))
			},
			_getBoundsOffset: function(a, b, c) {
				var d = this.project(b.getNorthWest(), c).subtract(a.min),
					f = this.project(b.getSouthEast(), c).subtract(a.max),
					g = this._rebound(d.x, -f.x),
					h = this._rebound(d.y, -f.y);
				return new e.Point(g, h)
			},
			_rebound: function(a, b) {
				return a + b > 0 ? Math.round(a - b) / 2 : Math.max(0, Math.ceil(a)) - Math.max(0, Math.floor(b))
			},
			_limitZoom: function(a) {
				var b = this.getMinZoom(),
					c = this.getMaxZoom();
				return Math.max(b, Math.min(c, a))
			}
		}), e.map = function(a, b) {
			return new e.Map(a, b)
		}, e.Projection.Mercator = {
			MAX_LATITUDE: 85.0840591556,
			R_MINOR: 6356752.314245179,
			R_MAJOR: 6378137,
			project: function(a) {
				var b = e.LatLng.DEG_TO_RAD,
					c = this.MAX_LATITUDE,
					d = Math.max(Math.min(c, a.lat), -c),
					f = this.R_MAJOR,
					g = this.R_MINOR,
					h = a.lng * b * f,
					i = d * b,
					j = g / f,
					k = Math.sqrt(1 - j * j),
					l = k * Math.sin(i);
				l = Math.pow((1 - l) / (1 + l), .5 * k);
				var m = Math.tan(.5 * (.5 * Math.PI - i)) / l;
				return i = -f * Math.log(m), new e.Point(h, i)
			},
			unproject: function(a) {
				for (var b, c = e.LatLng.RAD_TO_DEG, d = this.R_MAJOR, f = this.R_MINOR, g = a.x * c / d, h = f / d, i = Math.sqrt(1 - h * h), j = Math.exp(-a.y / d), k = Math.PI / 2 - 2 * Math.atan(j), l = 15, m = 1e-7, n = l, o = .1; Math.abs(o) > m && --n > 0;) b = i * Math.sin(k), o = Math.PI / 2 - 2 * Math.atan(j * Math.pow((1 - b) / (1 + b), .5 * i)) - k, k += o;
				return new e.LatLng(k * c, g)
			}
		}, e.CRS.EPSG3395 = e.extend({}, e.CRS, {
			code: "EPSG:3395",
			projection: e.Projection.Mercator,
			transformation: function() {
				var a = e.Projection.Mercator,
					b = a.R_MAJOR,
					c = .5 / (Math.PI * b);
				return new e.Transformation(c, .5, -c, .5)
			}()
		}), e.TileLayer = e.Class.extend({
			includes: e.Mixin.Events,
			options: {
				minZoom: 0,
				maxZoom: 18,
				tileSize: 256,
				subdomains: "abc",
				errorTileUrl: "",
				attribution: "",
				zoomOffset: 0,
				opacity: 1,
				unloadInvisibleTiles: e.Browser.mobile,
				updateWhenIdle: e.Browser.mobile
			},
			initialize: function(a, b) {
				b = e.setOptions(this, b), b.detectRetina && e.Browser.retina && b.maxZoom > 0 && (b.tileSize = Math.floor(b.tileSize / 2), b.zoomOffset++, b.minZoom > 0 && b.minZoom--, this.options.maxZoom--), b.bounds && (b.bounds = e.latLngBounds(b.bounds)), this._url = a;
				var c = this.options.subdomains;
				"string" == typeof c && (this.options.subdomains = c.split(""))
			},
			onAdd: function(a) {
				this._map = a, this._animated = a._zoomAnimated, this._initContainer(), a.on({
					viewreset: this._reset,
					moveend: this._update
				}, this), this._animated && a.on({
					zoomanim: this._animateZoom,
					zoomend: this._endZoomAnim
				}, this), this.options.updateWhenIdle || (this._limitedUpdate = e.Util.limitExecByInterval(this._update, 150, this), a.on("move", this._limitedUpdate, this)), this._reset(), this._update()
			},
			addTo: function(a) {
				return a.addLayer(this), this
			},
			onRemove: function(a) {
				this._container.parentNode.removeChild(this._container), a.off({
					viewreset: this._reset,
					moveend: this._update
				}, this), this._animated && a.off({
					zoomanim: this._animateZoom,
					zoomend: this._endZoomAnim
				}, this), this.options.updateWhenIdle || a.off("move", this._limitedUpdate, this), this._container = null, this._map = null
			},
			bringToFront: function() {
				var a = this._map._panes.tilePane;
				return this._container && (a.appendChild(this._container), this._setAutoZIndex(a, Math.max)), this
			},
			bringToBack: function() {
				var a = this._map._panes.tilePane;
				return this._container && (a.insertBefore(this._container, a.firstChild), this._setAutoZIndex(a, Math.min)), this
			},
			getAttribution: function() {
				return this.options.attribution
			},
			getContainer: function() {
				return this._container
			},
			setOpacity: function(a) {
				return this.options.opacity = a, this._map && this._updateOpacity(), this
			},
			setZIndex: function(a) {
				return this.options.zIndex = a, this._updateZIndex(), this
			},
			setUrl: function(a, b) {
				return this._url = a, b || this.redraw(), this
			},
			redraw: function() {
				return this._map && (this._reset({
					hard: !0
				}), this._update()), this
			},
			_updateZIndex: function() {
				this._container && this.options.zIndex !== c && (this._container.style.zIndex = this.options.zIndex)
			},
			_setAutoZIndex: function(a, b) {
				var c, d, e, f = a.children,
					g = -b(1 / 0, -(1 / 0));
				for (d = 0, e = f.length; e > d; d++) f[d] !== this._container && (c = parseInt(f[d].style.zIndex, 10), isNaN(c) || (g = b(g, c)));
				this.options.zIndex = this._container.style.zIndex = (isFinite(g) ? g : 0) + b(1, -1)
			},
			_updateOpacity: function() {
				var a, b = this._tiles;
				if (e.Browser.ielt9)
					for (a in b) e.DomUtil.setOpacity(b[a], this.options.opacity);
				else e.DomUtil.setOpacity(this._container, this.options.opacity)
			},
			_initContainer: function() {
				var a = this._map._panes.tilePane;
				if (!this._container) {
					if (this._container = e.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), this._animated) {
						var b = "leaflet-tile-container";
						this._bgBuffer = e.DomUtil.create("div", b, this._container), this._tileContainer = e.DomUtil.create("div", b, this._container)
					} else this._tileContainer = this._container;
					a.appendChild(this._container), this.options.opacity < 1 && this._updateOpacity()
				}
			},
			_reset: function(a) {
				for (var b in this._tiles) this.fire("tileunload", {
					tile: this._tiles[b]
				});
				this._tiles = {}, this._tilesToLoad = 0, this.options.reuseTiles && (this._unusedTiles = []), this._tileContainer.innerHTML = "", this._animated && a && a.hard && this._clearBgBuffer(), this._initContainer()
			},
			_getTileSize: function() {
				var a = this._map,
					b = a.getZoom() + this.options.zoomOffset,
					c = this.options.maxNativeZoom,
					d = this.options.tileSize;
				return c && b > c && (d = Math.round(a.getZoomScale(b) / a.getZoomScale(c) * d)), d
			},
			_update: function() {
				if (this._map) {
					var a = this._map,
						b = a.getPixelBounds(),
						c = a.getZoom(),
						d = this._getTileSize();
					if (!(c > this.options.maxZoom || c < this.options.minZoom)) {
						var f = e.bounds(b.min.divideBy(d)._floor(), b.max.divideBy(d)._floor());
						this._addTilesFromCenterOut(f), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(f)
					}
				}
			},
			_addTilesFromCenterOut: function(a) {
				var c, d, f, g = [],
					h = a.getCenter();
				for (c = a.min.y; c <= a.max.y; c++)
					for (d = a.min.x; d <= a.max.x; d++) f = new e.Point(d, c), this._tileShouldBeLoaded(f) && g.push(f);
				var i = g.length;
				if (0 !== i) {
					g.sort(function(a, b) {
						return a.distanceTo(h) - b.distanceTo(h)
					});
					var j = b.createDocumentFragment();
					for (this._tilesToLoad || this.fire("loading"), this._tilesToLoad += i, d = 0; i > d; d++) this._addTile(g[d], j);
					this._tileContainer.appendChild(j)
				}
			},
			_tileShouldBeLoaded: function(a) {
				if (a.x + ":" + a.y in this._tiles) return !1;
				var b = this.options;
				if (!b.continuousWorld) {
					var c = this._getWrapTileNum();
					if (b.noWrap && (a.x < 0 || a.x >= c.x) || a.y < 0 || a.y >= c.y) return !1
				}
				if (b.bounds) {
					var d = this._getTileSize(),
						e = a.multiplyBy(d),
						f = e.add([d, d]),
						g = this._map.unproject(e),
						h = this._map.unproject(f);
					if (b.continuousWorld || b.noWrap || (g = g.wrap(), h = h.wrap()), !b.bounds.intersects([g, h])) return !1
				}
				return !0
			},
			_removeOtherTiles: function(a) {
				var b, c, d, e;
				for (e in this._tiles) b = e.split(":"), c = parseInt(b[0], 10), d = parseInt(b[1], 10), (c < a.min.x || c > a.max.x || d < a.min.y || d > a.max.y) && this._removeTile(e)
			},
			_removeTile: function(a) {
				var b = this._tiles[a];
				this.fire("tileunload", {
					tile: b,
					url: b.src
				}), this.options.reuseTiles ? (e.DomUtil.removeClass(b, "leaflet-tile-loaded"), this._unusedTiles.push(b)) : b.parentNode === this._tileContainer && this._tileContainer.removeChild(b), e.Browser.android || (b.onload = null, b.src = e.Util.emptyImageUrl), delete this._tiles[a]
			},
			_addTile: function(a, b) {
				var c = this._getTilePos(a),
					d = this._getTile();
				e.DomUtil.setPosition(d, c, e.Browser.chrome), this._tiles[a.x + ":" + a.y] = d, this._loadTile(d, a), d.parentNode !== this._tileContainer && b.appendChild(d)
			},
			_getZoomForUrl: function() {
				var a = this.options,
					b = this._map.getZoom();
				return a.zoomReverse && (b = a.maxZoom - b), b += a.zoomOffset, a.maxNativeZoom ? Math.min(b, a.maxNativeZoom) : b
			},
			_getTilePos: function(a) {
				var b = this._map.getPixelOrigin(),
					c = this._getTileSize();
				return a.multiplyBy(c).subtract(b)
			},
			getTileUrl: function(a) {
				return e.Util.template(this._url, e.extend({
					s: this._getSubdomain(a),
					z: a.z,
					x: a.x,
					y: a.y
				}, this.options))
			},
			_getWrapTileNum: function() {
				var a = this._map.options.crs,
					b = a.getSize(this._map.getZoom());
				return b.divideBy(this._getTileSize())._floor()
			},
			_adjustTilePoint: function(a) {
				var b = this._getWrapTileNum();
				this.options.continuousWorld || this.options.noWrap || (a.x = (a.x % b.x + b.x) % b.x), this.options.tms && (a.y = b.y - a.y - 1), a.z = this._getZoomForUrl()
			},
			_getSubdomain: function(a) {
				var b = Math.abs(a.x + a.y) % this.options.subdomains.length;
				return this.options.subdomains[b]
			},
			_getTile: function() {
				if (this.options.reuseTiles && this._unusedTiles.length > 0) {
					var a = this._unusedTiles.pop();
					return this._resetTile(a), a
				}
				return this._createTile()
			},
			_resetTile: function() {},
			_createTile: function() {
				var a = e.DomUtil.create("img", "leaflet-tile");
				return a.style.width = a.style.height = this._getTileSize() + "px", a.galleryimg = "no", a.onselectstart = a.onmousemove = e.Util.falseFn, e.Browser.ielt9 && this.options.opacity !== c && e.DomUtil.setOpacity(a, this.options.opacity), e.Browser.mobileWebkit3d && (a.style.WebkitBackfaceVisibility = "hidden"), a
			},
			_loadTile: function(a, b) {
				a._layer = this, a.onload = this._tileOnLoad, a.onerror = this._tileOnError, this._adjustTilePoint(b), a.src = this.getTileUrl(b), this.fire("tileloadstart", {
					tile: a,
					url: a.src
				})
			},
			_tileLoaded: function() {
				this._tilesToLoad--, this._animated && e.DomUtil.addClass(this._tileContainer, "leaflet-zoom-animated"), this._tilesToLoad || (this.fire("load"), this._animated && (clearTimeout(this._clearBgBufferTimer), this._clearBgBufferTimer = setTimeout(e.bind(this._clearBgBuffer, this), 500)))
			},
			_tileOnLoad: function() {
				var a = this._layer;
				this.src !== e.Util.emptyImageUrl && (e.DomUtil.addClass(this, "leaflet-tile-loaded"), a.fire("tileload", {
					tile: this,
					url: this.src
				})), a._tileLoaded()
			},
			_tileOnError: function() {
				var a = this._layer;
				a.fire("tileerror", {
					tile: this,
					url: this.src
				});
				var b = a.options.errorTileUrl;
				b && (this.src = b), a._tileLoaded()
			}
		}), e.tileLayer = function(a, b) {
			return new e.TileLayer(a, b)
		}, e.TileLayer.WMS = e.TileLayer.extend({
			defaultWmsParams: {
				service: "WMS",
				request: "GetMap",
				version: "1.1.1",
				layers: "",
				styles: "",
				format: "image/jpeg",
				transparent: !1
			},
			initialize: function(a, b) {
				this._url = a;
				var c = e.extend({}, this.defaultWmsParams),
					d = b.tileSize || this.options.tileSize;
				b.detectRetina && e.Browser.retina ? c.width = c.height = 2 * d : c.width = c.height = d;
				for (var f in b) this.options.hasOwnProperty(f) || "crs" === f || (c[f] = b[f]);
				this.wmsParams = c, e.setOptions(this, b)
			},
			onAdd: function(a) {
				this._crs = this.options.crs || a.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
				var b = this._wmsVersion >= 1.3 ? "crs" : "srs";
				this.wmsParams[b] = this._crs.code, e.TileLayer.prototype.onAdd.call(this, a)
			},
			getTileUrl: function(a) {
				var b = this._map,
					c = this.options.tileSize,
					d = a.multiplyBy(c),
					f = d.add([c, c]),
					g = this._crs.project(b.unproject(d, a.z)),
					h = this._crs.project(b.unproject(f, a.z)),
					i = this._wmsVersion >= 1.3 && this._crs === e.CRS.EPSG4326 ? [h.y, g.x, g.y, h.x].join(",") : [g.x, h.y, h.x, g.y].join(","),
					j = e.Util.template(this._url, {
						s: this._getSubdomain(a)
					});
				return j + e.Util.getParamString(this.wmsParams, j, !0) + "&BBOX=" + i
			},
			setParams: function(a, b) {
				return e.extend(this.wmsParams, a), b || this.redraw(), this
			}
		}), e.tileLayer.wms = function(a, b) {
			return new e.TileLayer.WMS(a, b)
		}, e.TileLayer.Canvas = e.TileLayer.extend({
			options: {
				async: !1
			},
			initialize: function(a) {
				e.setOptions(this, a)
			},
			redraw: function() {
				this._map && (this._reset({
					hard: !0
				}), this._update());
				for (var a in this._tiles) this._redrawTile(this._tiles[a]);
				return this
			},
			_redrawTile: function(a) {
				this.drawTile(a, a._tilePoint, this._map._zoom)
			},
			_createTile: function() {
				var a = e.DomUtil.create("canvas", "leaflet-tile");
				return a.width = a.height = this.options.tileSize, a.onselectstart = a.onmousemove = e.Util.falseFn, a
			},
			_loadTile: function(a, b) {
				a._layer = this, a._tilePoint = b, this._redrawTile(a), this.options.async || this.tileDrawn(a)
			},
			drawTile: function() {},
			tileDrawn: function(a) {
				this._tileOnLoad.call(a)
			}
		}), e.tileLayer.canvas = function(a) {
			return new e.TileLayer.Canvas(a)
		}, e.ImageOverlay = e.Class.extend({
			includes: e.Mixin.Events,
			options: {
				opacity: 1
			},
			initialize: function(a, b, c) {
				this._url = a, this._bounds = e.latLngBounds(b), e.setOptions(this, c)
			},
			onAdd: function(a) {
				this._map = a, this._image || this._initImage(), a._panes.overlayPane.appendChild(this._image), a.on("viewreset", this._reset, this), a.options.zoomAnimation && e.Browser.any3d && a.on("zoomanim", this._animateZoom, this), this._reset()
			},
			onRemove: function(a) {
				a.getPanes().overlayPane.removeChild(this._image), a.off("viewreset", this._reset, this), a.options.zoomAnimation && a.off("zoomanim", this._animateZoom, this)
			},
			addTo: function(a) {
				return a.addLayer(this), this
			},
			setOpacity: function(a) {
				return this.options.opacity = a, this._updateOpacity(), this
			},
			bringToFront: function() {
				return this._image && this._map._panes.overlayPane.appendChild(this._image), this
			},
			bringToBack: function() {
				var a = this._map._panes.overlayPane;
				return this._image && a.insertBefore(this._image, a.firstChild), this
			},
			setUrl: function(a) {
				this._url = a, this._image.src = this._url
			},
			getAttribution: function() {
				return this.options.attribution
			},
			_initImage: function() {
				this._image = e.DomUtil.create("img", "leaflet-image-layer"), this._map.options.zoomAnimation && e.Browser.any3d ? e.DomUtil.addClass(this._image, "leaflet-zoom-animated") : e.DomUtil.addClass(this._image, "leaflet-zoom-hide"), this._updateOpacity(), e.extend(this._image, {
					galleryimg: "no",
					onselectstart: e.Util.falseFn,
					onmousemove: e.Util.falseFn,
					onload: e.bind(this._onImageLoad, this),
					src: this._url
				})
			},
			_animateZoom: function(a) {
				var b = this._map,
					c = this._image,
					d = b.getZoomScale(a.zoom),
					f = this._bounds.getNorthWest(),
					g = this._bounds.getSouthEast(),
					h = b._latLngToNewLayerPoint(f, a.zoom, a.center),
					i = b._latLngToNewLayerPoint(g, a.zoom, a.center)._subtract(h),
					j = h._add(i._multiplyBy(.5 * (1 - 1 / d)));
				c.style[e.DomUtil.TRANSFORM] = e.DomUtil.getTranslateString(j) + " scale(" + d + ") "
			},
			_reset: function() {
				var a = this._image,
					b = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
					c = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(b);
				e.DomUtil.setPosition(a, b), a.style.width = c.x + "px", a.style.height = c.y + "px"
			},
			_onImageLoad: function() {
				this.fire("load")
			},
			_updateOpacity: function() {
				e.DomUtil.setOpacity(this._image, this.options.opacity)
			}
		}), e.imageOverlay = function(a, b, c) {
			return new e.ImageOverlay(a, b, c)
		}, e.Icon = e.Class.extend({
			options: {
				className: ""
			},
			initialize: function(a) {
				e.setOptions(this, a)
			},
			createIcon: function(a) {
				return this._createIcon("icon", a)
			},
			createShadow: function(a) {
				return this._createIcon("shadow", a)
			},
			_createIcon: function(a, b) {
				var c = this._getIconUrl(a);
				if (!c) {
					if ("icon" === a) throw new Error("iconUrl not set in Icon options (see the docs).");
					return null
				}
				var d;
				return d = b && "IMG" === b.tagName ? this._createImg(c, b) : this._createImg(c), this._setIconStyles(d, a), d
			},
			_setIconStyles: function(a, b) {
				var c, d = this.options,
					f = e.point(d[b + "Size"]);
				c = "shadow" === b ? e.point(d.shadowAnchor || d.iconAnchor) : e.point(d.iconAnchor), !c && f && (c = f.divideBy(2, !0)), a.className = "leaflet-marker-" + b + " " + d.className, c && (a.style.marginLeft = -c.x + "px", a.style.marginTop = -c.y + "px"), f && (a.style.width = f.x + "px", a.style.height = f.y + "px")
			},
			_createImg: function(a, c) {
				return c = c || b.createElement("img"), c.src = a, c
			},
			_getIconUrl: function(a) {
				return e.Browser.retina && this.options[a + "RetinaUrl"] ? this.options[a + "RetinaUrl"] : this.options[a + "Url"]
			}
		}), e.icon = function(a) {
			return new e.Icon(a)
		}, e.Icon.Default = e.Icon.extend({
			options: {
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41]
			},
			_getIconUrl: function(a) {
				var b = a + "Url";
				if (this.options[b]) return this.options[b];
				e.Browser.retina && "icon" === a && (a += "-2x");
				var c = e.Icon.Default.imagePath;
				if (!c) throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
				return c + "/marker-" + a + ".png"
			}
		}), e.Icon.Default.imagePath = function() {
			var a, c, d, e, f, g = b.getElementsByTagName("script"),
				h = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
			for (a = 0, c = g.length; c > a; a++)
				if (d = g[a].src, e = d.match(h)) return f = d.split(h)[0], (f ? f + "/" : "") + "images"
		}(), e.Marker = e.Class.extend({
			includes: e.Mixin.Events,
			options: {
				icon: new e.Icon.Default,
				title: "",
				alt: "",
				clickable: !0,
				draggable: !1,
				keyboard: !0,
				zIndexOffset: 0,
				opacity: 1,
				riseOnHover: !1,
				riseOffset: 250
			},
			initialize: function(a, b) {
				e.setOptions(this, b), this._latlng = e.latLng(a)
			},
			onAdd: function(a) {
				this._map = a, a.on("viewreset", this.update, this), this._initIcon(), this.update(), this.fire("add"), a.options.zoomAnimation && a.options.markerZoomAnimation && a.on("zoomanim", this._animateZoom, this)
			},
			addTo: function(a) {
				return a.addLayer(this), this
			},
			onRemove: function(a) {
				this.dragging && this.dragging.disable(), this._removeIcon(), this._removeShadow(), this.fire("remove"), a.off({
					viewreset: this.update,
					zoomanim: this._animateZoom
				}, this), this._map = null
			},
			getLatLng: function() {
				return this._latlng
			},
			setLatLng: function(a) {
				return this._latlng = e.latLng(a), this.update(), this.fire("move", {
					latlng: this._latlng
				})
			},
			setZIndexOffset: function(a) {
				return this.options.zIndexOffset = a, this.update(), this
			},
			setIcon: function(a) {
				return this.options.icon = a, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup), this
			},
			update: function() {
				return this._icon && this._setPos(this._map.latLngToLayerPoint(this._latlng).round()), this
			},
			_initIcon: function() {
				var a = this.options,
					b = this._map,
					c = b.options.zoomAnimation && b.options.markerZoomAnimation,
					d = c ? "leaflet-zoom-animated" : "leaflet-zoom-hide",
					f = a.icon.createIcon(this._icon),
					g = !1;
				f !== this._icon && (this._icon && this._removeIcon(), g = !0, a.title && (f.title = a.title), a.alt && (f.alt = a.alt)), e.DomUtil.addClass(f, d), a.keyboard && (f.tabIndex = "0"), this._icon = f, this._initInteraction(), a.riseOnHover && e.DomEvent.on(f, "mouseover", this._bringToFront, this).on(f, "mouseout", this._resetZIndex, this);
				var h = a.icon.createShadow(this._shadow),
					i = !1;
				h !== this._shadow && (this._removeShadow(), i = !0), h && e.DomUtil.addClass(h, d), this._shadow = h, a.opacity < 1 && this._updateOpacity();
				var j = this._map._panes;
				g && j.markerPane.appendChild(this._icon), h && i && j.shadowPane.appendChild(this._shadow)
			},
			_removeIcon: function() {
				this.options.riseOnHover && e.DomEvent.off(this._icon, "mouseover", this._bringToFront).off(this._icon, "mouseout", this._resetZIndex), this._map._panes.markerPane.removeChild(this._icon), this._icon = null
			},
			_removeShadow: function() {
				this._shadow && this._map._panes.shadowPane.removeChild(this._shadow), this._shadow = null
			},
			_setPos: function(a) {
				e.DomUtil.setPosition(this._icon, a), this._shadow && e.DomUtil.setPosition(this._shadow, a), this._zIndex = a.y + this.options.zIndexOffset, this._resetZIndex()
			},
			_updateZIndex: function(a) {
				this._icon.style.zIndex = this._zIndex + a
			},
			_animateZoom: function(a) {
				var b = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center).round();
				this._setPos(b)
			},
			_initInteraction: function() {
				if (this.options.clickable) {
					var a = this._icon,
						b = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
					e.DomUtil.addClass(a, "leaflet-clickable"), e.DomEvent.on(a, "click", this._onMouseClick, this), e.DomEvent.on(a, "keypress", this._onKeyPress, this);
					for (var c = 0; c < b.length; c++) e.DomEvent.on(a, b[c], this._fireMouseEvent, this);
					e.Handler.MarkerDrag && (this.dragging = new e.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
				}
			},
			_onMouseClick: function(a) {
				var b = this.dragging && this.dragging.moved();
				(this.hasEventListeners(a.type) || b) && e.DomEvent.stopPropagation(a), b || (this.dragging && this.dragging._enabled || !this._map.dragging || !this._map.dragging.moved()) && this.fire(a.type, {
					originalEvent: a,
					latlng: this._latlng
				})
			},
			_onKeyPress: function(a) {
				13 === a.keyCode && this.fire("click", {
					originalEvent: a,
					latlng: this._latlng
				})
			},
			_fireMouseEvent: function(a) {
				this.fire(a.type, {
					originalEvent: a,
					latlng: this._latlng
				}), "contextmenu" === a.type && this.hasEventListeners(a.type) && e.DomEvent.preventDefault(a), "mousedown" !== a.type ? e.DomEvent.stopPropagation(a) : e.DomEvent.preventDefault(a)
			},
			setOpacity: function(a) {
				return this.options.opacity = a, this._map && this._updateOpacity(), this
			},
			_updateOpacity: function() {
				e.DomUtil.setOpacity(this._icon, this.options.opacity), this._shadow && e.DomUtil.setOpacity(this._shadow, this.options.opacity)
			},
			_bringToFront: function() {
				this._updateZIndex(this.options.riseOffset)
			},
			_resetZIndex: function() {
				this._updateZIndex(0)
			}
		}), e.marker = function(a, b) {
			return new e.Marker(a, b)
		}, e.DivIcon = e.Icon.extend({
			options: {
				iconSize: [12, 12],
				className: "leaflet-div-icon",
				html: !1
			},
			createIcon: function(a) {
				var c = a && "DIV" === a.tagName ? a : b.createElement("div"),
					d = this.options;
				return d.html !== !1 ? c.innerHTML = d.html : c.innerHTML = "", d.bgPos && (c.style.backgroundPosition = -d.bgPos.x + "px " + -d.bgPos.y + "px"), this._setIconStyles(c, "icon"), c
			},
			createShadow: function() {
				return null
			}
		}), e.divIcon = function(a) {
			return new e.DivIcon(a)
		}, e.Map.mergeOptions({
			closePopupOnClick: !0
		}), e.Popup = e.Class.extend({
			includes: e.Mixin.Events,
			options: {
				minWidth: 50,
				maxWidth: 300,
				autoPan: !0,
				closeButton: !0,
				offset: [0, 7],
				autoPanPadding: [5, 5],
				keepInView: !1,
				className: "",
				zoomAnimation: !0
			},
			initialize: function(a, b) {
				e.setOptions(this, a), this._source = b, this._animated = e.Browser.any3d && this.options.zoomAnimation, this._isOpen = !1
			},
			onAdd: function(a) {
				this._map = a, this._container || this._initLayout();
				var b = a.options.fadeAnimation;
				b && e.DomUtil.setOpacity(this._container, 0), a._panes.popupPane.appendChild(this._container), a.on(this._getEvents(), this), this.update(), b && e.DomUtil.setOpacity(this._container, 1), this.fire("open"), a.fire("popupopen", {
					popup: this
				}), this._source && this._source.fire("popupopen", {
					popup: this
				})
			},
			addTo: function(a) {
				return a.addLayer(this), this
			},
			openOn: function(a) {
				return a.openPopup(this), this
			},
			onRemove: function(a) {
				a._panes.popupPane.removeChild(this._container), e.Util.falseFn(this._container.offsetWidth), a.off(this._getEvents(), this), a.options.fadeAnimation && e.DomUtil.setOpacity(this._container, 0), this._map = null, this.fire("close"), a.fire("popupclose", {
					popup: this
				}), this._source && this._source.fire("popupclose", {
					popup: this
				})
			},
			getLatLng: function() {
				return this._latlng
			},
			setLatLng: function(a) {
				return this._latlng = e.latLng(a), this._map && (this._updatePosition(), this._adjustPan()), this
			},
			getContent: function() {
				return this._content
			},
			setContent: function(a) {
				return this._content = a, this.update(), this
			},
			update: function() {
				this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
			},
			_getEvents: function() {
				var a = {
					viewreset: this._updatePosition
				};
				return this._animated && (a.zoomanim = this._zoomAnimation), ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (a.preclick = this._close), this.options.keepInView && (a.moveend = this._adjustPan), a
			},
			_close: function() {
				this._map && this._map.closePopup(this)
			},
			_initLayout: function() {
				var a, b = "leaflet-popup",
					c = b + " " + this.options.className + " leaflet-zoom-" + (this._animated ? "animated" : "hide"),
					d = this._container = e.DomUtil.create("div", c);
				this.options.closeButton && (a = this._closeButton = e.DomUtil.create("a", b + "-close-button", d), a.href = "#close", a.innerHTML = "&#215;", e.DomEvent.disableClickPropagation(a), e.DomEvent.on(a, "click", this._onCloseButtonClick, this));
				var f = this._wrapper = e.DomUtil.create("div", b + "-content-wrapper", d);
				e.DomEvent.disableClickPropagation(f), this._contentNode = e.DomUtil.create("div", b + "-content", f), e.DomEvent.disableScrollPropagation(this._contentNode), e.DomEvent.on(f, "contextmenu", e.DomEvent.stopPropagation), this._tipContainer = e.DomUtil.create("div", b + "-tip-container", d), this._tip = e.DomUtil.create("div", b + "-tip", this._tipContainer)
			},
			_updateContent: function() {
				if (this._content) {
					if ("string" == typeof this._content) this._contentNode.innerHTML = this._content;
					else {
						for (; this._contentNode.hasChildNodes();) this._contentNode.removeChild(this._contentNode.firstChild);
						this._contentNode.appendChild(this._content)
					}
					this.fire("contentupdate")
				}
			},
			_updateLayout: function() {
				var a = this._contentNode,
					b = a.style;
				b.width = "", b.whiteSpace = "nowrap";
				var c = a.offsetWidth;
				c = Math.min(c, this.options.maxWidth), c = Math.max(c, this.options.minWidth), b.width = c + 1 + "px", b.whiteSpace = "", b.height = "";
				var d = a.offsetHeight,
					f = this.options.maxHeight,
					g = "leaflet-popup-scrolled";
				f && d > f ? (b.height = f + "px", e.DomUtil.addClass(a, g)) : e.DomUtil.removeClass(a, g), this._containerWidth = this._container.offsetWidth
			},
			_updatePosition: function() {
				if (this._map) {
					var a = this._map.latLngToLayerPoint(this._latlng),
						b = this._animated,
						c = e.point(this.options.offset);
					b && e.DomUtil.setPosition(this._container, a), this._containerBottom = -c.y - (b ? 0 : a.y), this._containerLeft = -Math.round(this._containerWidth / 2) + c.x + (b ? 0 : a.x), this._container.style.bottom = this._containerBottom + "px", this._container.style.left = this._containerLeft + "px"
				}
			},
			_zoomAnimation: function(a) {
				var b = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
				e.DomUtil.setPosition(this._container, b)
			},
			_adjustPan: function() {
				if (this.options.autoPan) {
					var a = this._map,
						b = this._container.offsetHeight,
						c = this._containerWidth,
						d = new e.Point(this._containerLeft, -b - this._containerBottom);
					this._animated && d._add(e.DomUtil.getPosition(this._container));
					var f = a.layerPointToContainerPoint(d),
						g = e.point(this.options.autoPanPadding),
						h = e.point(this.options.autoPanPaddingTopLeft || g),
						i = e.point(this.options.autoPanPaddingBottomRight || g),
						j = a.getSize(),
						k = 0,
						l = 0;
					f.x + c + i.x > j.x && (k = f.x + c - j.x + i.x), f.x - k - h.x < 0 && (k = f.x - h.x), f.y + b + i.y > j.y && (l = f.y + b - j.y + i.y), f.y - l - h.y < 0 && (l = f.y - h.y), (k || l) && a.fire("autopanstart").panBy([k, l])
				}
			},
			_onCloseButtonClick: function(a) {
				this._close(), e.DomEvent.stop(a)
			}
		}), e.popup = function(a, b) {
			return new e.Popup(a, b)
		}, e.Map.include({
			openPopup: function(a, b, c) {
				if (this.closePopup(), !(a instanceof e.Popup)) {
					var d = a;
					a = new e.Popup(c).setLatLng(b).setContent(d)
				}
				return a._isOpen = !0, this._popup = a, this.addLayer(a)
			},
			closePopup: function(a) {
				return a && a !== this._popup || (a = this._popup, this._popup = null), a && (this.removeLayer(a), a._isOpen = !1), this
			}
		}), e.Marker.include({
			openPopup: function() {
				return this._popup && this._map && !this._map.hasLayer(this._popup) && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup)), this
			},
			closePopup: function() {
				return this._popup && this._popup._close(), this
			},
			togglePopup: function() {
				return this._popup && (this._popup._isOpen ? this.closePopup() : this.openPopup()), this
			},
			bindPopup: function(a, b) {
				var c = e.point(this.options.icon.options.popupAnchor || [0, 0]);
				return c = c.add(e.Popup.prototype.options.offset), b && b.offset && (c = c.add(b.offset)), b = e.extend({
					offset: c
				}, b), this._popupHandlersAdded || (this.on("click", this.togglePopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this), this._popupHandlersAdded = !0), a instanceof e.Popup ? (e.setOptions(a, b), this._popup = a, a._source = this) : this._popup = new e.Popup(b, this).setContent(a), this
			},
			setPopupContent: function(a) {
				return this._popup && this._popup.setContent(a), this
			},
			unbindPopup: function() {
				return this._popup && (this._popup = null, this.off("click", this.togglePopup, this).off("remove", this.closePopup, this).off("move", this._movePopup, this), this._popupHandlersAdded = !1), this
			},
			getPopup: function() {
				return this._popup
			},
			_movePopup: function(a) {
				this._popup.setLatLng(a.latlng)
			}
		}), e.LayerGroup = e.Class.extend({
			initialize: function(a) {
				this._layers = {};
				var b, c;
				if (a)
					for (b = 0, c = a.length; c > b; b++) this.addLayer(a[b])
			},
			addLayer: function(a) {
				var b = this.getLayerId(a);
				return this._layers[b] = a, this._map && this._map.addLayer(a), this
			},
			removeLayer: function(a) {
				var b = a in this._layers ? a : this.getLayerId(a);
				return this._map && this._layers[b] && this._map.removeLayer(this._layers[b]), delete this._layers[b], this
			},
			hasLayer: function(a) {
				return a ? a in this._layers || this.getLayerId(a) in this._layers : !1
			},
			clearLayers: function() {
				return this.eachLayer(this.removeLayer, this), this
			},
			invoke: function(a) {
				var b, c, d = Array.prototype.slice.call(arguments, 1);
				for (b in this._layers) c = this._layers[b], c[a] && c[a].apply(c, d);
				return this
			},
			onAdd: function(a) {
				this._map = a, this.eachLayer(a.addLayer, a)
			},
			onRemove: function(a) {
				this.eachLayer(a.removeLayer, a), this._map = null
			},
			addTo: function(a) {
				return a.addLayer(this), this
			},
			eachLayer: function(a, b) {
				for (var c in this._layers) a.call(b, this._layers[c]);
				return this
			},
			getLayer: function(a) {
				return this._layers[a]
			},
			getLayers: function() {
				var a = [];
				for (var b in this._layers) a.push(this._layers[b]);
				return a
			},
			setZIndex: function(a) {
				return this.invoke("setZIndex", a)
			},
			getLayerId: function(a) {
				return e.stamp(a)
			}
		}), e.layerGroup = function(a) {
			return new e.LayerGroup(a)
		}, e.FeatureGroup = e.LayerGroup.extend({
			includes: e.Mixin.Events,
			statics: {
				EVENTS: "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"
			},
			addLayer: function(a) {
				return this.hasLayer(a) ? this : ("on" in a && a.on(e.FeatureGroup.EVENTS, this._propagateEvent, this), e.LayerGroup.prototype.addLayer.call(this, a), this._popupContent && a.bindPopup && a.bindPopup(this._popupContent, this._popupOptions), this.fire("layeradd", {
					layer: a
				}))
			},
			removeLayer: function(a) {
				return this.hasLayer(a) ? (a in this._layers && (a = this._layers[a]), a.off(e.FeatureGroup.EVENTS, this._propagateEvent, this), e.LayerGroup.prototype.removeLayer.call(this, a), this._popupContent && this.invoke("unbindPopup"), this.fire("layerremove", {
					layer: a
				})) : this
			},
			bindPopup: function(a, b) {
				return this._popupContent = a, this._popupOptions = b, this.invoke("bindPopup", a, b)
			},
			openPopup: function(a) {
				for (var b in this._layers) {
					this._layers[b].openPopup(a);
					break
				}
				return this
			},
			setStyle: function(a) {
				return this.invoke("setStyle", a)
			},
			bringToFront: function() {
				return this.invoke("bringToFront")
			},
			bringToBack: function() {
				return this.invoke("bringToBack")
			},
			getBounds: function() {
				var a = new e.LatLngBounds;
				return this.eachLayer(function(b) {
					a.extend(b instanceof e.Marker ? b.getLatLng() : b.getBounds())
				}), a
			},
			_propagateEvent: function(a) {
				a = e.extend({
					layer: a.target,
					target: this
				}, a), this.fire(a.type, a)
			}
		}), e.featureGroup = function(a) {
			return new e.FeatureGroup(a)
		}, e.Path = e.Class.extend({
			includes: [e.Mixin.Events],
			statics: {
				CLIP_PADDING: function() {
					var b = e.Browser.mobile ? 1280 : 2e3,
						c = (b / Math.max(a.outerWidth, a.outerHeight) - 1) / 2;
					return Math.max(0, Math.min(.5, c))
				}()
			},
			options: {
				stroke: !0,
				color: "#0033ff",
				dashArray: null,
				lineCap: null,
				lineJoin: null,
				weight: 5,
				opacity: .5,
				fill: !1,
				fillColor: null,
				fillOpacity: .2,
				clickable: !0
			},
			initialize: function(a) {
				e.setOptions(this, a)
			},
			onAdd: function(a) {
				this._map = a, this._container || (this._initElements(), this._initEvents()), this.projectLatlngs(), this._updatePath(), this._container && this._map._pathRoot.appendChild(this._container), this.fire("add"), a.on({
					viewreset: this.projectLatlngs,
					moveend: this._updatePath
				}, this)
			},
			addTo: function(a) {
				return a.addLayer(this), this
			},
			onRemove: function(a) {
				a._pathRoot.removeChild(this._container), this.fire("remove"), this._map = null, e.Browser.vml && (this._container = null, this._stroke = null, this._fill = null), a.off({
					viewreset: this.projectLatlngs,
					moveend: this._updatePath
				}, this)
			},
			projectLatlngs: function() {},
			setStyle: function(a) {
				return e.setOptions(this, a), this._container && this._updateStyle(), this
			},
			redraw: function() {
				return this._map && (this.projectLatlngs(), this._updatePath()), this
			}
		}), e.Map.include({
			_updatePathViewport: function() {
				var a = e.Path.CLIP_PADDING,
					b = this.getSize(),
					c = e.DomUtil.getPosition(this._mapPane),
					d = c.multiplyBy(-1)._subtract(b.multiplyBy(a)._round()),
					f = d.add(b.multiplyBy(1 + 2 * a)._round());
				this._pathViewport = new e.Bounds(d, f)
			}
		}), e.Path.SVG_NS = "http://www.w3.org/2000/svg", e.Browser.svg = !(!b.createElementNS || !b.createElementNS(e.Path.SVG_NS, "svg").createSVGRect), e.Path = e.Path.extend({
			statics: {
				SVG: e.Browser.svg
			},
			bringToFront: function() {
				var a = this._map._pathRoot,
					b = this._container;
				return b && a.lastChild !== b && a.appendChild(b), this
			},
			bringToBack: function() {
				var a = this._map._pathRoot,
					b = this._container,
					c = a.firstChild;
				return b && c !== b && a.insertBefore(b, c), this
			},
			getPathString: function() {},
			_createElement: function(a) {
				return b.createElementNS(e.Path.SVG_NS, a)
			},
			_initElements: function() {
				this._map._initPathRoot(), this._initPath(), this._initStyle()
			},
			_initPath: function() {
				this._container = this._createElement("g"), this._path = this._createElement("path"), this.options.className && e.DomUtil.addClass(this._path, this.options.className), this._container.appendChild(this._path)
			},
			_initStyle: function() {
				this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round")), this.options.fill && this._path.setAttribute("fill-rule", "evenodd"), this.options.pointerEvents && this._path.setAttribute("pointer-events", this.options.pointerEvents), this.options.clickable || this.options.pointerEvents || this._path.setAttribute("pointer-events", "none"), this._updateStyle()
			},
			_updateStyle: function() {
				this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray"), this.options.lineCap && this._path.setAttribute("stroke-linecap", this.options.lineCap), this.options.lineJoin && this._path.setAttribute("stroke-linejoin", this.options.lineJoin)) : this._path.setAttribute("stroke", "none"), this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
			},
			_updatePath: function() {
				var a = this.getPathString();
				a || (a = "M0 0"), this._path.setAttribute("d", a)
			},
			_initEvents: function() {
				if (this.options.clickable) {
					(e.Browser.svg || !e.Browser.vml) && e.DomUtil.addClass(this._path, "leaflet-clickable"), e.DomEvent.on(this._container, "click", this._onMouseClick, this);
					for (var a = ["dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"], b = 0; b < a.length; b++) e.DomEvent.on(this._container, a[b], this._fireMouseEvent, this)
				}
			},
			_onMouseClick: function(a) {
				this._map.dragging && this._map.dragging.moved() || this._fireMouseEvent(a)
			},
			_fireMouseEvent: function(a) {
				if (this.hasEventListeners(a.type)) {
					var b = this._map,
						c = b.mouseEventToContainerPoint(a),
						d = b.containerPointToLayerPoint(c),
						f = b.layerPointToLatLng(d);
					this.fire(a.type, {
						latlng: f,
						layerPoint: d,
						containerPoint: c,
						originalEvent: a
					}), "contextmenu" === a.type && e.DomEvent.preventDefault(a), "mousemove" !== a.type && e.DomEvent.stopPropagation(a)
				}
			}
		}), e.Map.include({
			_initPathRoot: function() {
				this._pathRoot || (this._pathRoot = e.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && e.Browser.any3d ? (e.DomUtil.addClass(this._pathRoot, "leaflet-zoom-animated"),
					this.on({
						zoomanim: this._animatePathZoom,
						zoomend: this._endPathZoom
					})) : e.DomUtil.addClass(this._pathRoot, "leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport())
			},
			_animatePathZoom: function(a) {
				var b = this.getZoomScale(a.zoom),
					c = this._getCenterOffset(a.center)._multiplyBy(-b)._add(this._pathViewport.min);
				this._pathRoot.style[e.DomUtil.TRANSFORM] = e.DomUtil.getTranslateString(c) + " scale(" + b + ") ", this._pathZooming = !0
			},
			_endPathZoom: function() {
				this._pathZooming = !1
			},
			_updateSvgViewport: function() {
				if (!this._pathZooming) {
					this._updatePathViewport();
					var a = this._pathViewport,
						b = a.min,
						c = a.max,
						d = c.x - b.x,
						f = c.y - b.y,
						g = this._pathRoot,
						h = this._panes.overlayPane;
					e.Browser.mobileWebkit && h.removeChild(g), e.DomUtil.setPosition(g, b), g.setAttribute("width", d), g.setAttribute("height", f), g.setAttribute("viewBox", [b.x, b.y, d, f].join(" ")), e.Browser.mobileWebkit && h.appendChild(g)
				}
			}
		}), e.Path.include({
			bindPopup: function(a, b) {
				return a instanceof e.Popup ? this._popup = a : ((!this._popup || b) && (this._popup = new e.Popup(b, this)), this._popup.setContent(a)), this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this.closePopup, this), this._popupHandlersAdded = !0), this
			},
			unbindPopup: function() {
				return this._popup && (this._popup = null, this.off("click", this._openPopup).off("remove", this.closePopup), this._popupHandlersAdded = !1), this
			},
			openPopup: function(a) {
				return this._popup && (a = a || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({
					latlng: a
				})), this
			},
			closePopup: function() {
				return this._popup && this._popup._close(), this
			},
			_openPopup: function(a) {
				this._popup.setLatLng(a.latlng), this._map.openPopup(this._popup)
			}
		}), e.Browser.vml = !e.Browser.svg && function() {
			try {
				var a = b.createElement("div");
				a.innerHTML = '<v:shape adj="1"/>';
				var c = a.firstChild;
				return c.style.behavior = "url(#default#VML)", c && "object" == typeof c.adj
			} catch (d) {
				return !1
			}
		}(), e.Path = e.Browser.svg || !e.Browser.vml ? e.Path : e.Path.extend({
			statics: {
				VML: !0,
				CLIP_PADDING: .02
			},
			_createElement: function() {
				try {
					return b.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
						function(a) {
							return b.createElement("<lvml:" + a + ' class="lvml">')
						}
				} catch (a) {
					return function(a) {
						return b.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
					}
				}
			}(),
			_initPath: function() {
				var a = this._container = this._createElement("shape");
				e.DomUtil.addClass(a, "leaflet-vml-shape" + (this.options.className ? " " + this.options.className : "")), this.options.clickable && e.DomUtil.addClass(a, "leaflet-clickable"), a.coordsize = "1 1", this._path = this._createElement("path"), a.appendChild(this._path), this._map._pathRoot.appendChild(a)
			},
			_initStyle: function() {
				this._updateStyle()
			},
			_updateStyle: function() {
				var a = this._stroke,
					b = this._fill,
					c = this.options,
					d = this._container;
				d.stroked = c.stroke, d.filled = c.fill, c.stroke ? (a || (a = this._stroke = this._createElement("stroke"), a.endcap = "round", d.appendChild(a)), a.weight = c.weight + "px", a.color = c.color, a.opacity = c.opacity, c.dashArray ? a.dashStyle = e.Util.isArray(c.dashArray) ? c.dashArray.join(" ") : c.dashArray.replace(/( *, *)/g, " ") : a.dashStyle = "", c.lineCap && (a.endcap = c.lineCap.replace("butt", "flat")), c.lineJoin && (a.joinstyle = c.lineJoin)) : a && (d.removeChild(a), this._stroke = null), c.fill ? (b || (b = this._fill = this._createElement("fill"), d.appendChild(b)), b.color = c.fillColor || c.color, b.opacity = c.fillOpacity) : b && (d.removeChild(b), this._fill = null)
			},
			_updatePath: function() {
				var a = this._container.style;
				a.display = "none", this._path.v = this.getPathString() + " ", a.display = ""
			}
		}), e.Map.include(e.Browser.svg || !e.Browser.vml ? {} : {
			_initPathRoot: function() {
				if (!this._pathRoot) {
					var a = this._pathRoot = b.createElement("div");
					a.className = "leaflet-vml-container", this._panes.overlayPane.appendChild(a), this.on("moveend", this._updatePathViewport), this._updatePathViewport()
				}
			}
		}), e.Browser.canvas = function() {
			return !!b.createElement("canvas").getContext
		}(), e.Path = e.Path.SVG && !a.L_PREFER_CANVAS || !e.Browser.canvas ? e.Path : e.Path.extend({
			statics: {
				CANVAS: !0,
				SVG: !1
			},
			redraw: function() {
				return this._map && (this.projectLatlngs(), this._requestUpdate()), this
			},
			setStyle: function(a) {
				return e.setOptions(this, a), this._map && (this._updateStyle(), this._requestUpdate()), this
			},
			onRemove: function(a) {
				a.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this), this.options.clickable && (this._map.off("click", this._onClick, this), this._map.off("mousemove", this._onMouseMove, this)), this._requestUpdate(), this.fire("remove"), this._map = null
			},
			_requestUpdate: function() {
				this._map && !e.Path._updateRequest && (e.Path._updateRequest = e.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
			},
			_fireMapMoveEnd: function() {
				e.Path._updateRequest = null, this.fire("moveend")
			},
			_initElements: function() {
				this._map._initPathRoot(), this._ctx = this._map._canvasCtx
			},
			_updateStyle: function() {
				var a = this.options;
				a.stroke && (this._ctx.lineWidth = a.weight, this._ctx.strokeStyle = a.color), a.fill && (this._ctx.fillStyle = a.fillColor || a.color), a.lineCap && (this._ctx.lineCap = a.lineCap), a.lineJoin && (this._ctx.lineJoin = a.lineJoin)
			},
			_drawPath: function() {
				var a, b, c, d, f, g;
				for (this._ctx.beginPath(), a = 0, c = this._parts.length; c > a; a++) {
					for (b = 0, d = this._parts[a].length; d > b; b++) f = this._parts[a][b], g = (0 === b ? "move" : "line") + "To", this._ctx[g](f.x, f.y);
					this instanceof e.Polygon && this._ctx.closePath()
				}
			},
			_checkIfEmpty: function() {
				return !this._parts.length
			},
			_updatePath: function() {
				if (!this._checkIfEmpty()) {
					var a = this._ctx,
						b = this.options;
					this._drawPath(), a.save(), this._updateStyle(), b.fill && (a.globalAlpha = b.fillOpacity, a.fill(b.fillRule || "evenodd")), b.stroke && (a.globalAlpha = b.opacity, a.stroke()), a.restore()
				}
			},
			_initEvents: function() {
				this.options.clickable && (this._map.on("mousemove", this._onMouseMove, this), this._map.on("click dblclick contextmenu", this._fireMouseEvent, this))
			},
			_fireMouseEvent: function(a) {
				this._containsPoint(a.layerPoint) && this.fire(a.type, a)
			},
			_onMouseMove: function(a) {
				this._map && !this._map._animatingZoom && (this._containsPoint(a.layerPoint) ? (this._ctx.canvas.style.cursor = "pointer", this._mouseInside = !0, this.fire("mouseover", a)) : this._mouseInside && (this._ctx.canvas.style.cursor = "", this._mouseInside = !1, this.fire("mouseout", a)))
			}
		}), e.Map.include(e.Path.SVG && !a.L_PREFER_CANVAS || !e.Browser.canvas ? {} : {
			_initPathRoot: function() {
				var a, c = this._pathRoot;
				c || (c = this._pathRoot = b.createElement("canvas"), c.style.position = "absolute", a = this._canvasCtx = c.getContext("2d"), a.lineCap = "round", a.lineJoin = "round", this._panes.overlayPane.appendChild(c), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)), this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport())
			},
			_updateCanvasViewport: function() {
				if (!this._pathZooming) {
					this._updatePathViewport();
					var a = this._pathViewport,
						b = a.min,
						c = a.max.subtract(b),
						d = this._pathRoot;
					e.DomUtil.setPosition(d, b), d.width = c.x, d.height = c.y, d.getContext("2d").translate(-b.x, -b.y)
				}
			}
		}), e.LineUtil = {
			simplify: function(a, b) {
				if (!b || !a.length) return a.slice();
				var c = b * b;
				return a = this._reducePoints(a, c), a = this._simplifyDP(a, c)
			},
			pointToSegmentDistance: function(a, b, c) {
				return Math.sqrt(this._sqClosestPointOnSegment(a, b, c, !0))
			},
			closestPointOnSegment: function(a, b, c) {
				return this._sqClosestPointOnSegment(a, b, c)
			},
			_simplifyDP: function(a, b) {
				var d = a.length,
					e = typeof Uint8Array != c + "" ? Uint8Array : Array,
					f = new e(d);
				f[0] = f[d - 1] = 1, this._simplifyDPStep(a, f, b, 0, d - 1);
				var g, h = [];
				for (g = 0; d > g; g++) f[g] && h.push(a[g]);
				return h
			},
			_simplifyDPStep: function(a, b, c, d, e) {
				var f, g, h, i = 0;
				for (g = d + 1; e - 1 >= g; g++) h = this._sqClosestPointOnSegment(a[g], a[d], a[e], !0), h > i && (f = g, i = h);
				i > c && (b[f] = 1, this._simplifyDPStep(a, b, c, d, f), this._simplifyDPStep(a, b, c, f, e))
			},
			_reducePoints: function(a, b) {
				for (var c = [a[0]], d = 1, e = 0, f = a.length; f > d; d++) this._sqDist(a[d], a[e]) > b && (c.push(a[d]), e = d);
				return f - 1 > e && c.push(a[f - 1]), c
			},
			clipSegment: function(a, b, c, d) {
				var e, f, g, h = d ? this._lastCode : this._getBitCode(a, c),
					i = this._getBitCode(b, c);
				for (this._lastCode = i;;) {
					if (!(h | i)) return [a, b];
					if (h & i) return !1;
					e = h || i, f = this._getEdgeIntersection(a, b, e, c), g = this._getBitCode(f, c), e === h ? (a = f, h = g) : (b = f, i = g)
				}
			},
			_getEdgeIntersection: function(a, b, c, d) {
				var f = b.x - a.x,
					g = b.y - a.y,
					h = d.min,
					i = d.max;
				return 8 & c ? new e.Point(a.x + f * (i.y - a.y) / g, i.y) : 4 & c ? new e.Point(a.x + f * (h.y - a.y) / g, h.y) : 2 & c ? new e.Point(i.x, a.y + g * (i.x - a.x) / f) : 1 & c ? new e.Point(h.x, a.y + g * (h.x - a.x) / f) : void 0
			},
			_getBitCode: function(a, b) {
				var c = 0;
				return a.x < b.min.x ? c |= 1 : a.x > b.max.x && (c |= 2), a.y < b.min.y ? c |= 4 : a.y > b.max.y && (c |= 8), c
			},
			_sqDist: function(a, b) {
				var c = b.x - a.x,
					d = b.y - a.y;
				return c * c + d * d
			},
			_sqClosestPointOnSegment: function(a, b, c, d) {
				var f, g = b.x,
					h = b.y,
					i = c.x - g,
					j = c.y - h,
					k = i * i + j * j;
				return k > 0 && (f = ((a.x - g) * i + (a.y - h) * j) / k, f > 1 ? (g = c.x, h = c.y) : f > 0 && (g += i * f, h += j * f)), i = a.x - g, j = a.y - h, d ? i * i + j * j : new e.Point(g, h)
			}
		}, e.Polyline = e.Path.extend({
			initialize: function(a, b) {
				e.Path.prototype.initialize.call(this, b), this._latlngs = this._convertLatLngs(a)
			},
			options: {
				smoothFactor: 1,
				noClip: !1
			},
			projectLatlngs: function() {
				this._originalPoints = [];
				for (var a = 0, b = this._latlngs.length; b > a; a++) this._originalPoints[a] = this._map.latLngToLayerPoint(this._latlngs[a])
			},
			getPathString: function() {
				for (var a = 0, b = this._parts.length, c = ""; b > a; a++) c += this._getPathPartStr(this._parts[a]);
				return c
			},
			getLatLngs: function() {
				return this._latlngs
			},
			setLatLngs: function(a) {
				return this._latlngs = this._convertLatLngs(a), this.redraw()
			},
			addLatLng: function(a) {
				return this._latlngs.push(e.latLng(a)), this.redraw()
			},
			spliceLatLngs: function() {
				var a = [].splice.apply(this._latlngs, arguments);
				return this._convertLatLngs(this._latlngs, !0), this.redraw(), a
			},
			closestLayerPoint: function(a) {
				for (var b, c, d = 1 / 0, f = this._parts, g = null, h = 0, i = f.length; i > h; h++)
					for (var j = f[h], k = 1, l = j.length; l > k; k++) {
						b = j[k - 1], c = j[k];
						var m = e.LineUtil._sqClosestPointOnSegment(a, b, c, !0);
						d > m && (d = m, g = e.LineUtil._sqClosestPointOnSegment(a, b, c))
					}
				return g && (g.distance = Math.sqrt(d)), g
			},
			getBounds: function() {
				return new e.LatLngBounds(this.getLatLngs())
			},
			_convertLatLngs: function(a, b) {
				var c, d, f = b ? a : [];
				for (c = 0, d = a.length; d > c; c++) {
					if (e.Util.isArray(a[c]) && "number" != typeof a[c][0]) return;
					f[c] = e.latLng(a[c])
				}
				return f
			},
			_initEvents: function() {
				e.Path.prototype._initEvents.call(this)
			},
			_getPathPartStr: function(a) {
				for (var b, c = e.Path.VML, d = 0, f = a.length, g = ""; f > d; d++) b = a[d], c && b._round(), g += (d ? "L" : "M") + b.x + " " + b.y;
				return g
			},
			_clipPoints: function() {
				var a, b, c, d = this._originalPoints,
					f = d.length;
				if (this.options.noClip) return void(this._parts = [d]);
				this._parts = [];
				var g = this._parts,
					h = this._map._pathViewport,
					i = e.LineUtil;
				for (a = 0, b = 0; f - 1 > a; a++) c = i.clipSegment(d[a], d[a + 1], h, a), c && (g[b] = g[b] || [], g[b].push(c[0]), (c[1] !== d[a + 1] || a === f - 2) && (g[b].push(c[1]), b++))
			},
			_simplifyPoints: function() {
				for (var a = this._parts, b = e.LineUtil, c = 0, d = a.length; d > c; c++) a[c] = b.simplify(a[c], this.options.smoothFactor)
			},
			_updatePath: function() {
				this._map && (this._clipPoints(), this._simplifyPoints(), e.Path.prototype._updatePath.call(this))
			}
		}), e.polyline = function(a, b) {
			return new e.Polyline(a, b)
		}, e.PolyUtil = {}, e.PolyUtil.clipPolygon = function(a, b) {
			var c, d, f, g, h, i, j, k, l, m = [1, 4, 2, 8],
				n = e.LineUtil;
			for (d = 0, j = a.length; j > d; d++) a[d]._code = n._getBitCode(a[d], b);
			for (g = 0; 4 > g; g++) {
				for (k = m[g], c = [], d = 0, j = a.length, f = j - 1; j > d; f = d++) h = a[d], i = a[f], h._code & k ? i._code & k || (l = n._getEdgeIntersection(i, h, k, b), l._code = n._getBitCode(l, b), c.push(l)) : (i._code & k && (l = n._getEdgeIntersection(i, h, k, b), l._code = n._getBitCode(l, b), c.push(l)), c.push(h));
				a = c
			}
			return a
		}, e.Polygon = e.Polyline.extend({
			options: {
				fill: !0
			},
			initialize: function(a, b) {
				e.Polyline.prototype.initialize.call(this, a, b), this._initWithHoles(a)
			},
			_initWithHoles: function(a) {
				var b, c, d;
				if (a && e.Util.isArray(a[0]) && "number" != typeof a[0][0])
					for (this._latlngs = this._convertLatLngs(a[0]), this._holes = a.slice(1), b = 0, c = this._holes.length; c > b; b++) d = this._holes[b] = this._convertLatLngs(this._holes[b]), d[0].equals(d[d.length - 1]) && d.pop();
				a = this._latlngs, a.length >= 2 && a[0].equals(a[a.length - 1]) && a.pop()
			},
			projectLatlngs: function() {
				if (e.Polyline.prototype.projectLatlngs.call(this), this._holePoints = [], this._holes) {
					var a, b, c, d;
					for (a = 0, c = this._holes.length; c > a; a++)
						for (this._holePoints[a] = [], b = 0, d = this._holes[a].length; d > b; b++) this._holePoints[a][b] = this._map.latLngToLayerPoint(this._holes[a][b])
				}
			},
			setLatLngs: function(a) {
				return a && e.Util.isArray(a[0]) && "number" != typeof a[0][0] ? (this._initWithHoles(a), this.redraw()) : e.Polyline.prototype.setLatLngs.call(this, a)
			},
			_clipPoints: function() {
				var a = this._originalPoints,
					b = [];
				if (this._parts = [a].concat(this._holePoints), !this.options.noClip) {
					for (var c = 0, d = this._parts.length; d > c; c++) {
						var f = e.PolyUtil.clipPolygon(this._parts[c], this._map._pathViewport);
						f.length && b.push(f)
					}
					this._parts = b
				}
			},
			_getPathPartStr: function(a) {
				var b = e.Polyline.prototype._getPathPartStr.call(this, a);
				return b + (e.Browser.svg ? "z" : "x")
			}
		}), e.polygon = function(a, b) {
			return new e.Polygon(a, b)
		},
		function() {
			function a(a) {
				return e.FeatureGroup.extend({
					initialize: function(a, b) {
						this._layers = {}, this._options = b, this.setLatLngs(a)
					},
					setLatLngs: function(b) {
						var c = 0,
							d = b.length;
						for (this.eachLayer(function(a) {
								d > c ? a.setLatLngs(b[c++]) : this.removeLayer(a)
							}, this); d > c;) this.addLayer(new a(b[c++], this._options));
						return this
					},
					getLatLngs: function() {
						var a = [];
						return this.eachLayer(function(b) {
							a.push(b.getLatLngs())
						}), a
					}
				})
			}
			e.MultiPolyline = a(e.Polyline), e.MultiPolygon = a(e.Polygon), e.multiPolyline = function(a, b) {
				return new e.MultiPolyline(a, b)
			}, e.multiPolygon = function(a, b) {
				return new e.MultiPolygon(a, b)
			}
		}(), e.Rectangle = e.Polygon.extend({
			initialize: function(a, b) {
				e.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(a), b)
			},
			setBounds: function(a) {
				this.setLatLngs(this._boundsToLatLngs(a))
			},
			_boundsToLatLngs: function(a) {
				return a = e.latLngBounds(a), [a.getSouthWest(), a.getNorthWest(), a.getNorthEast(), a.getSouthEast()]
			}
		}), e.rectangle = function(a, b) {
			return new e.Rectangle(a, b)
		}, e.Circle = e.Path.extend({
			initialize: function(a, b, c) {
				e.Path.prototype.initialize.call(this, c), this._latlng = e.latLng(a), this._mRadius = b
			},
			options: {
				fill: !0
			},
			setLatLng: function(a) {
				return this._latlng = e.latLng(a), this.redraw()
			},
			setRadius: function(a) {
				return this._mRadius = a, this.redraw()
			},
			projectLatlngs: function() {
				var a = this._getLngRadius(),
					b = this._latlng,
					c = this._map.latLngToLayerPoint([b.lat, b.lng - a]);
				this._point = this._map.latLngToLayerPoint(b), this._radius = Math.max(this._point.x - c.x, 1)
			},
			getBounds: function() {
				var a = this._getLngRadius(),
					b = this._mRadius / 40075017 * 360,
					c = this._latlng;
				return new e.LatLngBounds([c.lat - b, c.lng - a], [c.lat + b, c.lng + a])
			},
			getLatLng: function() {
				return this._latlng
			},
			getPathString: function() {
				var a = this._point,
					b = this._radius;
				return this._checkIfEmpty() ? "" : e.Browser.svg ? "M" + a.x + "," + (a.y - b) + "A" + b + "," + b + ",0,1,1," + (a.x - .1) + "," + (a.y - b) + " z" : (a._round(), b = Math.round(b), "AL " + a.x + "," + a.y + " " + b + "," + b + " 0,23592600")
			},
			getRadius: function() {
				return this._mRadius
			},
			_getLatRadius: function() {
				return this._mRadius / 40075017 * 360
			},
			_getLngRadius: function() {
				return this._getLatRadius() / Math.cos(e.LatLng.DEG_TO_RAD * this._latlng.lat)
			},
			_checkIfEmpty: function() {
				if (!this._map) return !1;
				var a = this._map._pathViewport,
					b = this._radius,
					c = this._point;
				return c.x - b > a.max.x || c.y - b > a.max.y || c.x + b < a.min.x || c.y + b < a.min.y
			}
		}), e.circle = function(a, b, c) {
			return new e.Circle(a, b, c)
		}, e.CircleMarker = e.Circle.extend({
			options: {
				radius: 10,
				weight: 2
			},
			initialize: function(a, b) {
				e.Circle.prototype.initialize.call(this, a, null, b), this._radius = this.options.radius
			},
			projectLatlngs: function() {
				this._point = this._map.latLngToLayerPoint(this._latlng)
			},
			_updateStyle: function() {
				e.Circle.prototype._updateStyle.call(this), this.setRadius(this.options.radius)
			},
			setLatLng: function(a) {
				return e.Circle.prototype.setLatLng.call(this, a), this._popup && this._popup._isOpen && this._popup.setLatLng(a), this
			},
			setRadius: function(a) {
				return this.options.radius = this._radius = a, this.redraw()
			},
			getRadius: function() {
				return this._radius
			}
		}), e.circleMarker = function(a, b) {
			return new e.CircleMarker(a, b)
		}, e.Polyline.include(e.Path.CANVAS ? {
			_containsPoint: function(a, b) {
				var c, d, f, g, h, i, j, k = this.options.weight / 2;
				for (e.Browser.touch && (k += 10), c = 0, g = this._parts.length; g > c; c++)
					for (j = this._parts[c], d = 0, h = j.length, f = h - 1; h > d; f = d++)
						if ((b || 0 !== d) && (i = e.LineUtil.pointToSegmentDistance(a, j[f], j[d]), k >= i)) return !0;
				return !1
			}
		} : {}), e.Polygon.include(e.Path.CANVAS ? {
			_containsPoint: function(a) {
				var b, c, d, f, g, h, i, j, k = !1;
				if (e.Polyline.prototype._containsPoint.call(this, a, !0)) return !0;
				for (f = 0, i = this._parts.length; i > f; f++)
					for (b = this._parts[f], g = 0, j = b.length, h = j - 1; j > g; h = g++) c = b[g], d = b[h], c.y > a.y != d.y > a.y && a.x < (d.x - c.x) * (a.y - c.y) / (d.y - c.y) + c.x && (k = !k);
				return k
			}
		} : {}), e.Circle.include(e.Path.CANVAS ? {
			_drawPath: function() {
				var a = this._point;
				this._ctx.beginPath(), this._ctx.arc(a.x, a.y, this._radius, 0, 2 * Math.PI, !1)
			},
			_containsPoint: function(a) {
				var b = this._point,
					c = this.options.stroke ? this.options.weight / 2 : 0;
				return a.distanceTo(b) <= this._radius + c
			}
		} : {}), e.CircleMarker.include(e.Path.CANVAS ? {
			_updateStyle: function() {
				e.Path.prototype._updateStyle.call(this)
			}
		} : {}), e.GeoJSON = e.FeatureGroup.extend({
			initialize: function(a, b) {
				e.setOptions(this, b), this._layers = {}, a && this.addData(a)
			},
			addData: function(a) {
				var b, c, d, f = e.Util.isArray(a) ? a : a.features;
				if (f) {
					for (b = 0, c = f.length; c > b; b++) d = f[b], (d.geometries || d.geometry || d.features || d.coordinates) && this.addData(f[b]);
					return this
				}
				var g = this.options;
				if (!g.filter || g.filter(a)) {
					var h = e.GeoJSON.geometryToLayer(a, g.pointToLayer, g.coordsToLatLng, g);
					return h.feature = e.GeoJSON.asFeature(a), h.defaultOptions = h.options, this.resetStyle(h), g.onEachFeature && g.onEachFeature(a, h), this.addLayer(h)
				}
			},
			resetStyle: function(a) {
				var b = this.options.style;
				b && (e.Util.extend(a.options, a.defaultOptions), this._setLayerStyle(a, b))
			},
			setStyle: function(a) {
				this.eachLayer(function(b) {
					this._setLayerStyle(b, a)
				}, this)
			},
			_setLayerStyle: function(a, b) {
				"function" == typeof b && (b = b(a.feature)), a.setStyle && a.setStyle(b)
			}
		}), e.extend(e.GeoJSON, {
			geometryToLayer: function(a, b, c, d) {
				var f, g, h, i, j = "Feature" === a.type ? a.geometry : a,
					k = j.coordinates,
					l = [];
				switch (c = c || this.coordsToLatLng, j.type) {
					case "Point":
						return f = c(k), b ? b(a, f) : new e.Marker(f);
					case "MultiPoint":
						for (h = 0, i = k.length; i > h; h++) f = c(k[h]), l.push(b ? b(a, f) : new e.Marker(f));
						return new e.FeatureGroup(l);
					case "LineString":
						return g = this.coordsToLatLngs(k, 0, c), new e.Polyline(g, d);
					case "Polygon":
						if (2 === k.length && !k[1].length) throw new Error("Invalid GeoJSON object.");
						return g = this.coordsToLatLngs(k, 1, c), new e.Polygon(g, d);
					case "MultiLineString":
						return g = this.coordsToLatLngs(k, 1, c), new e.MultiPolyline(g, d);
					case "MultiPolygon":
						return g = this.coordsToLatLngs(k, 2, c), new e.MultiPolygon(g, d);
					case "GeometryCollection":
						for (h = 0, i = j.geometries.length; i > h; h++) l.push(this.geometryToLayer({
							geometry: j.geometries[h],
							type: "Feature",
							properties: a.properties
						}, b, c, d));
						return new e.FeatureGroup(l);
					default:
						throw new Error("Invalid GeoJSON object.")
				}
			},
			coordsToLatLng: function(a) {
				return new e.LatLng(a[1], a[0], a[2])
			},
			coordsToLatLngs: function(a, b, c) {
				var d, e, f, g = [];
				for (e = 0, f = a.length; f > e; e++) d = b ? this.coordsToLatLngs(a[e], b - 1, c) : (c || this.coordsToLatLng)(a[e]), g.push(d);
				return g
			},
			latLngToCoords: function(a) {
				var b = [a.lng, a.lat];
				return a.alt !== c && b.push(a.alt), b
			},
			latLngsToCoords: function(a) {
				for (var b = [], c = 0, d = a.length; d > c; c++) b.push(e.GeoJSON.latLngToCoords(a[c]));
				return b
			},
			getFeature: function(a, b) {
				return a.feature ? e.extend({}, a.feature, {
					geometry: b
				}) : e.GeoJSON.asFeature(b)
			},
			asFeature: function(a) {
				return "Feature" === a.type ? a : {
					type: "Feature",
					properties: {},
					geometry: a
				}
			}
		});
	var g = {
		toGeoJSON: function() {
			return e.GeoJSON.getFeature(this, {
				type: "Point",
				coordinates: e.GeoJSON.latLngToCoords(this.getLatLng())
			})
		}
	};
	e.Marker.include(g), e.Circle.include(g), e.CircleMarker.include(g), e.Polyline.include({
			toGeoJSON: function() {
				return e.GeoJSON.getFeature(this, {
					type: "LineString",
					coordinates: e.GeoJSON.latLngsToCoords(this.getLatLngs())
				})
			}
		}), e.Polygon.include({
			toGeoJSON: function() {
				var a, b, c, d = [e.GeoJSON.latLngsToCoords(this.getLatLngs())];
				if (d[0].push(d[0][0]), this._holes)
					for (a = 0, b = this._holes.length; b > a; a++) c = e.GeoJSON.latLngsToCoords(this._holes[a]), c.push(c[0]), d.push(c);
				return e.GeoJSON.getFeature(this, {
					type: "Polygon",
					coordinates: d
				})
			}
		}),
		function() {
			function a(a) {
				return function() {
					var b = [];
					return this.eachLayer(function(a) {
						b.push(a.toGeoJSON().geometry.coordinates)
					}), e.GeoJSON.getFeature(this, {
						type: a,
						coordinates: b
					})
				}
			}
			e.MultiPolyline.include({
				toGeoJSON: a("MultiLineString")
			}), e.MultiPolygon.include({
				toGeoJSON: a("MultiPolygon")
			}), e.LayerGroup.include({
				toGeoJSON: function() {
					var b, c = this.feature && this.feature.geometry,
						d = [];
					if (c && "MultiPoint" === c.type) return a("MultiPoint").call(this);
					var f = c && "GeometryCollection" === c.type;
					return this.eachLayer(function(a) {
						a.toGeoJSON && (b = a.toGeoJSON(), d.push(f ? b.geometry : e.GeoJSON.asFeature(b)))
					}), f ? e.GeoJSON.getFeature(this, {
						geometries: d,
						type: "GeometryCollection"
					}) : {
						type: "FeatureCollection",
						features: d
					}
				}
			})
		}(), e.geoJson = function(a, b) {
			return new e.GeoJSON(a, b)
		}, e.DomEvent = {
			addListener: function(a, b, c, d) {
				var f, g, h, i = e.stamp(c),
					j = "_leaflet_" + b + i;
				return a[j] ? this : (f = function(b) {
					return c.call(d || a, b || e.DomEvent._getEvent())
				}, e.Browser.pointer && 0 === b.indexOf("touch") ? this.addPointerListener(a, b, f, i) : (e.Browser.touch && "dblclick" === b && this.addDoubleTapListener && this.addDoubleTapListener(a, f, i), "addEventListener" in a ? "mousewheel" === b ? (a.addEventListener("DOMMouseScroll", f, !1), a.addEventListener(b, f, !1)) : "mouseenter" === b || "mouseleave" === b ? (g = f, h = "mouseenter" === b ? "mouseover" : "mouseout", f = function(b) {
					return e.DomEvent._checkMouse(a, b) ? g(b) : void 0
				}, a.addEventListener(h, f, !1)) : "click" === b && e.Browser.android ? (g = f, f = function(a) {
					return e.DomEvent._filterClick(a, g)
				}, a.addEventListener(b, f, !1)) : a.addEventListener(b, f, !1) : "attachEvent" in a && a.attachEvent("on" + b, f), a[j] = f, this))
			},
			removeListener: function(a, b, c) {
				var d = e.stamp(c),
					f = "_leaflet_" + b + d,
					g = a[f];
				return g ? (e.Browser.pointer && 0 === b.indexOf("touch") ? this.removePointerListener(a, b, d) : e.Browser.touch && "dblclick" === b && this.removeDoubleTapListener ? this.removeDoubleTapListener(a, d) : "removeEventListener" in a ? "mousewheel" === b ? (a.removeEventListener("DOMMouseScroll", g, !1), a.removeEventListener(b, g, !1)) : "mouseenter" === b || "mouseleave" === b ? a.removeEventListener("mouseenter" === b ? "mouseover" : "mouseout", g, !1) : a.removeEventListener(b, g, !1) : "detachEvent" in a && a.detachEvent("on" + b, g), a[f] = null, this) : this
			},
			stopPropagation: function(a) {
				return a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0, e.DomEvent._skipped(a), this
			},
			disableScrollPropagation: function(a) {
				var b = e.DomEvent.stopPropagation;
				return e.DomEvent.on(a, "mousewheel", b).on(a, "MozMousePixelScroll", b)
			},
			disableClickPropagation: function(a) {
				for (var b = e.DomEvent.stopPropagation, c = e.Draggable.START.length - 1; c >= 0; c--) e.DomEvent.on(a, e.Draggable.START[c], b);
				return e.DomEvent.on(a, "click", e.DomEvent._fakeStop).on(a, "dblclick", b)
			},
			preventDefault: function(a) {
				return a.preventDefault ? a.preventDefault() : a.returnValue = !1, this
			},
			stop: function(a) {
				return e.DomEvent.preventDefault(a).stopPropagation(a)
			},
			getMousePosition: function(a, b) {
				if (!b) return new e.Point(a.clientX, a.clientY);
				var c = b.getBoundingClientRect();
				return new e.Point(a.clientX - c.left - b.clientLeft, a.clientY - c.top - b.clientTop)
			},
			getWheelDelta: function(a) {
				var b = 0;
				return a.wheelDelta && (b = a.wheelDelta / 120), a.detail && (b = -a.detail / 3), b
			},
			_skipEvents: {},
			_fakeStop: function(a) {
				e.DomEvent._skipEvents[a.type] = !0
			},
			_skipped: function(a) {
				var b = this._skipEvents[a.type];
				return this._skipEvents[a.type] = !1, b
			},
			_checkMouse: function(a, b) {
				var c = b.relatedTarget;
				if (!c) return !0;
				try {
					for (; c && c !== a;) c = c.parentNode
				} catch (d) {
					return !1
				}
				return c !== a
			},
			_getEvent: function() {
				var b = a.event;
				if (!b)
					for (var c = arguments.callee.caller; c && (b = c.arguments[0], !b || a.Event !== b.constructor);) c = c.caller;
				return b
			},
			_filterClick: function(a, b) {
				var c = a.timeStamp || a.originalEvent.timeStamp,
					d = e.DomEvent._lastClick && c - e.DomEvent._lastClick;
				return d && d > 100 && 500 > d || a.target._simulatedClick && !a._simulated ? void e.DomEvent.stop(a) : (e.DomEvent._lastClick = c, b(a))
			}
		}, e.DomEvent.on = e.DomEvent.addListener, e.DomEvent.off = e.DomEvent.removeListener, e.Draggable = e.Class.extend({
			includes: e.Mixin.Events,
			statics: {
				START: e.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
				END: {
					mousedown: "mouseup",
					touchstart: "touchend",
					pointerdown: "touchend",
					MSPointerDown: "touchend"
				},
				MOVE: {
					mousedown: "mousemove",
					touchstart: "touchmove",
					pointerdown: "touchmove",
					MSPointerDown: "touchmove"
				}
			},
			initialize: function(a, b) {
				this._element = a, this._dragStartTarget = b || a
			},
			enable: function() {
				if (!this._enabled) {
					for (var a = e.Draggable.START.length - 1; a >= 0; a--) e.DomEvent.on(this._dragStartTarget, e.Draggable.START[a], this._onDown, this);
					this._enabled = !0
				}
			},
			disable: function() {
				if (this._enabled) {
					for (var a = e.Draggable.START.length - 1; a >= 0; a--) e.DomEvent.off(this._dragStartTarget, e.Draggable.START[a], this._onDown, this);
					this._enabled = !1, this._moved = !1
				}
			},
			_onDown: function(a) {
				if (this._moved = !1, !a.shiftKey && (1 === a.which || 1 === a.button || a.touches) && (e.DomEvent.stopPropagation(a), !e.Draggable._disabled && (e.DomUtil.disableImageDrag(), e.DomUtil.disableTextSelection(), !this._moving))) {
					var c = a.touches ? a.touches[0] : a;
					this._startPoint = new e.Point(c.clientX, c.clientY), this._startPos = this._newPos = e.DomUtil.getPosition(this._element), e.DomEvent.on(b, e.Draggable.MOVE[a.type], this._onMove, this).on(b, e.Draggable.END[a.type], this._onUp, this)
				}
			},
			_onMove: function(a) {
				if (a.touches && a.touches.length > 1) return void(this._moved = !0);
				var c = a.touches && 1 === a.touches.length ? a.touches[0] : a,
					d = new e.Point(c.clientX, c.clientY),
					f = d.subtract(this._startPoint);
				(f.x || f.y) && (e.Browser.touch && Math.abs(f.x) + Math.abs(f.y) < 3 || (e.DomEvent.preventDefault(a), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = e.DomUtil.getPosition(this._element).subtract(f), e.DomUtil.addClass(b.body, "leaflet-dragging"), this._lastTarget = a.target || a.srcElement, e.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(f), this._moving = !0, e.Util.cancelAnimFrame(this._animRequest), this._animRequest = e.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)))
			},
			_updatePosition: function() {
				this.fire("predrag"), e.DomUtil.setPosition(this._element, this._newPos), this.fire("drag")
			},
			_onUp: function() {
				e.DomUtil.removeClass(b.body, "leaflet-dragging"), this._lastTarget && (e.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null);
				for (var a in e.Draggable.MOVE) e.DomEvent.off(b, e.Draggable.MOVE[a], this._onMove).off(b, e.Draggable.END[a], this._onUp);
				e.DomUtil.enableImageDrag(), e.DomUtil.enableTextSelection(), this._moved && this._moving && (e.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {
					distance: this._newPos.distanceTo(this._startPos)
				})), this._moving = !1
			}
		}), e.Handler = e.Class.extend({
			initialize: function(a) {
				this._map = a
			},
			enable: function() {
				this._enabled || (this._enabled = !0, this.addHooks())
			},
			disable: function() {
				this._enabled && (this._enabled = !1, this.removeHooks())
			},
			enabled: function() {
				return !!this._enabled
			}
		}), e.Map.mergeOptions({
			dragging: !0,
			inertia: !e.Browser.android23,
			inertiaDeceleration: 3400,
			inertiaMaxSpeed: 1 / 0,
			inertiaThreshold: e.Browser.touch ? 32 : 18,
			easeLinearity: .25,
			worldCopyJump: !1
		}), e.Map.Drag = e.Handler.extend({
			addHooks: function() {
				if (!this._draggable) {
					var a = this._map;
					this._draggable = new e.Draggable(a._mapPane, a._container), this._draggable.on({
						dragstart: this._onDragStart,
						drag: this._onDrag,
						dragend: this._onDragEnd
					}, this), a.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), a.on("viewreset", this._onViewReset, this), a.whenReady(this._onViewReset, this))
				}
				this._draggable.enable()
			},
			removeHooks: function() {
				this._draggable.disable()
			},
			moved: function() {
				return this._draggable && this._draggable._moved
			},
			_onDragStart: function() {
				var a = this._map;
				a._panAnim && a._panAnim.stop(), a.fire("movestart").fire("dragstart"), a.options.inertia && (this._positions = [], this._times = [])
			},
			_onDrag: function() {
				if (this._map.options.inertia) {
					var a = this._lastTime = +new Date,
						b = this._lastPos = this._draggable._newPos;
					this._positions.push(b), this._times.push(a), a - this._times[0] > 200 && (this._positions.shift(), this._times.shift())
				}
				this._map.fire("move").fire("drag")
			},
			_onViewReset: function() {
				var a = this._map.getSize()._divideBy(2),
					b = this._map.latLngToLayerPoint([0, 0]);
				this._initialWorldOffset = b.subtract(a).x, this._worldWidth = this._map.project([0, 180]).x
			},
			_onPreDrag: function() {
				var a = this._worldWidth,
					b = Math.round(a / 2),
					c = this._initialWorldOffset,
					d = this._draggable._newPos.x,
					e = (d - b + c) % a + b - c,
					f = (d + b + c) % a - b - c,
					g = Math.abs(e + c) < Math.abs(f + c) ? e : f;
				this._draggable._newPos.x = g
			},
			_onDragEnd: function(a) {
				var b = this._map,
					c = b.options,
					d = +new Date - this._lastTime,
					f = !c.inertia || d > c.inertiaThreshold || !this._positions[0];
				if (b.fire("dragend", a), f) b.fire("moveend");
				else {
					var g = this._lastPos.subtract(this._positions[0]),
						h = (this._lastTime + d - this._times[0]) / 1e3,
						i = c.easeLinearity,
						j = g.multiplyBy(i / h),
						k = j.distanceTo([0, 0]),
						l = Math.min(c.inertiaMaxSpeed, k),
						m = j.multiplyBy(l / k),
						n = l / (c.inertiaDeceleration * i),
						o = m.multiplyBy(-n / 2).round();
					o.x && o.y ? (o = b._limitOffset(o, b.options.maxBounds), e.Util.requestAnimFrame(function() {
						b.panBy(o, {
							duration: n,
							easeLinearity: i,
							noMoveStart: !0
						})
					})) : b.fire("moveend")
				}
			}
		}), e.Map.addInitHook("addHandler", "dragging", e.Map.Drag), e.Map.mergeOptions({
			doubleClickZoom: !0
		}), e.Map.DoubleClickZoom = e.Handler.extend({
			addHooks: function() {
				this._map.on("dblclick", this._onDoubleClick, this)
			},
			removeHooks: function() {
				this._map.off("dblclick", this._onDoubleClick, this)
			},
			_onDoubleClick: function(a) {
				var b = this._map,
					c = b.getZoom() + (a.originalEvent.shiftKey ? -1 : 1);
				"center" === b.options.doubleClickZoom ? b.setZoom(c) : b.setZoomAround(a.containerPoint, c)
			}
		}), e.Map.addInitHook("addHandler", "doubleClickZoom", e.Map.DoubleClickZoom), e.Map.mergeOptions({
			scrollWheelZoom: !0
		}), e.Map.ScrollWheelZoom = e.Handler.extend({
			addHooks: function() {
				e.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), e.DomEvent.on(this._map._container, "MozMousePixelScroll", e.DomEvent.preventDefault), this._delta = 0
			},
			removeHooks: function() {
				e.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll), e.DomEvent.off(this._map._container, "MozMousePixelScroll", e.DomEvent.preventDefault)
			},
			_onWheelScroll: function(a) {
				var b = e.DomEvent.getWheelDelta(a);
				this._delta += b, this._lastMousePos = this._map.mouseEventToContainerPoint(a), this._startTime || (this._startTime = +new Date);
				var c = Math.max(40 - (+new Date - this._startTime), 0);
				clearTimeout(this._timer), this._timer = setTimeout(e.bind(this._performZoom, this), c), e.DomEvent.preventDefault(a), e.DomEvent.stopPropagation(a)
			},
			_performZoom: function() {
				var a = this._map,
					b = this._delta,
					c = a.getZoom();
				b = b > 0 ? Math.ceil(b) : Math.floor(b), b = Math.max(Math.min(b, 4), -4), b = a._limitZoom(c + b) - c, this._delta = 0, this._startTime = null, b && ("center" === a.options.scrollWheelZoom ? a.setZoom(c + b) : a.setZoomAround(this._lastMousePos, c + b))
			}
		}), e.Map.addInitHook("addHandler", "scrollWheelZoom", e.Map.ScrollWheelZoom), e.extend(e.DomEvent, {
			_touchstart: e.Browser.msPointer ? "MSPointerDown" : e.Browser.pointer ? "pointerdown" : "touchstart",
			_touchend: e.Browser.msPointer ? "MSPointerUp" : e.Browser.pointer ? "pointerup" : "touchend",
			addDoubleTapListener: function(a, c, d) {
				function f(a) {
					var b;
					if (e.Browser.pointer ? (o.push(a.pointerId), b = o.length) : b = a.touches.length, !(b > 1)) {
						var c = Date.now(),
							d = c - (h || c);
						i = a.touches ? a.touches[0] : a, j = d > 0 && k >= d, h = c
					}
				}

				function g(a) {
					if (e.Browser.pointer) {
						var b = o.indexOf(a.pointerId);
						if (-1 === b) return;
						o.splice(b, 1)
					}
					if (j) {
						if (e.Browser.pointer) {
							var d, f = {};
							for (var g in i) d = i[g], "function" == typeof d ? f[g] = d.bind(i) : f[g] = d;
							i = f
						}
						i.type = "dblclick", c(i), h = null
					}
				}
				var h, i, j = !1,
					k = 250,
					l = "_leaflet_",
					m = this._touchstart,
					n = this._touchend,
					o = [];
				a[l + m + d] = f, a[l + n + d] = g;
				var p = e.Browser.pointer ? b.documentElement : a;
				return a.addEventListener(m, f, !1), p.addEventListener(n, g, !1), e.Browser.pointer && p.addEventListener(e.DomEvent.POINTER_CANCEL, g, !1), this
			},
			removeDoubleTapListener: function(a, c) {
				var d = "_leaflet_";
				return a.removeEventListener(this._touchstart, a[d + this._touchstart + c], !1), (e.Browser.pointer ? b.documentElement : a).removeEventListener(this._touchend, a[d + this._touchend + c], !1), e.Browser.pointer && b.documentElement.removeEventListener(e.DomEvent.POINTER_CANCEL, a[d + this._touchend + c], !1), this
			}
		}), e.extend(e.DomEvent, {
			POINTER_DOWN: e.Browser.msPointer ? "MSPointerDown" : "pointerdown",
			POINTER_MOVE: e.Browser.msPointer ? "MSPointerMove" : "pointermove",
			POINTER_UP: e.Browser.msPointer ? "MSPointerUp" : "pointerup",
			POINTER_CANCEL: e.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
			_pointers: [],
			_pointerDocumentListener: !1,
			addPointerListener: function(a, b, c, d) {
				switch (b) {
					case "touchstart":
						return this.addPointerListenerStart(a, b, c, d);
					case "touchend":
						return this.addPointerListenerEnd(a, b, c, d);
					case "touchmove":
						return this.addPointerListenerMove(a, b, c, d);
					default:
						throw "Unknown touch event type"
				}
			},
			addPointerListenerStart: function(a, c, d, f) {
				var g = "_leaflet_",
					h = this._pointers,
					i = function(a) {
						e.DomEvent.preventDefault(a);
						for (var b = !1, c = 0; c < h.length; c++)
							if (h[c].pointerId === a.pointerId) {
								b = !0;
								break
							}
						b || h.push(a), a.touches = h.slice(), a.changedTouches = [a], d(a)
					};
				if (a[g + "touchstart" + f] = i, a.addEventListener(this.POINTER_DOWN, i, !1), !this._pointerDocumentListener) {
					var j = function(a) {
						for (var b = 0; b < h.length; b++)
							if (h[b].pointerId === a.pointerId) {
								h.splice(b, 1);
								break
							}
					};
					b.documentElement.addEventListener(this.POINTER_UP, j, !1), b.documentElement.addEventListener(this.POINTER_CANCEL, j, !1), this._pointerDocumentListener = !0
				}
				return this
			},
			addPointerListenerMove: function(a, b, c, d) {
				function e(a) {
					if (a.pointerType !== a.MSPOINTER_TYPE_MOUSE && "mouse" !== a.pointerType || 0 !== a.buttons) {
						for (var b = 0; b < g.length; b++)
							if (g[b].pointerId === a.pointerId) {
								g[b] = a;
								break
							}
						a.touches = g.slice(), a.changedTouches = [a], c(a)
					}
				}
				var f = "_leaflet_",
					g = this._pointers;
				return a[f + "touchmove" + d] = e, a.addEventListener(this.POINTER_MOVE, e, !1), this
			},
			addPointerListenerEnd: function(a, b, c, d) {
				var e = "_leaflet_",
					f = this._pointers,
					g = function(a) {
						for (var b = 0; b < f.length; b++)
							if (f[b].pointerId === a.pointerId) {
								f.splice(b, 1);
								break
							}
						a.touches = f.slice(), a.changedTouches = [a], c(a)
					};
				return a[e + "touchend" + d] = g, a.addEventListener(this.POINTER_UP, g, !1), a.addEventListener(this.POINTER_CANCEL, g, !1), this
			},
			removePointerListener: function(a, b, c) {
				var d = "_leaflet_",
					e = a[d + b + c];
				switch (b) {
					case "touchstart":
						a.removeEventListener(this.POINTER_DOWN, e, !1);
						break;
					case "touchmove":
						a.removeEventListener(this.POINTER_MOVE, e, !1);
						break;
					case "touchend":
						a.removeEventListener(this.POINTER_UP, e, !1), a.removeEventListener(this.POINTER_CANCEL, e, !1)
				}
				return this
			}
		}), e.Map.mergeOptions({
			touchZoom: e.Browser.touch && !e.Browser.android23,
			bounceAtZoomLimits: !0
		}), e.Map.TouchZoom = e.Handler.extend({
			addHooks: function() {
				e.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
			},
			removeHooks: function() {
				e.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
			},
			_onTouchStart: function(a) {
				var c = this._map;
				if (a.touches && 2 === a.touches.length && !c._animatingZoom && !this._zooming) {
					var d = c.mouseEventToLayerPoint(a.touches[0]),
						f = c.mouseEventToLayerPoint(a.touches[1]),
						g = c._getCenterLayerPoint();
					this._startCenter = d.add(f)._divideBy(2), this._startDist = d.distanceTo(f), this._moved = !1, this._zooming = !0, this._centerOffset = g.subtract(this._startCenter), c._panAnim && c._panAnim.stop(), e.DomEvent.on(b, "touchmove", this._onTouchMove, this).on(b, "touchend", this._onTouchEnd, this), e.DomEvent.preventDefault(a)
				}
			},
			_onTouchMove: function(a) {
				var b = this._map;
				if (a.touches && 2 === a.touches.length && this._zooming) {
					var c = b.mouseEventToLayerPoint(a.touches[0]),
						d = b.mouseEventToLayerPoint(a.touches[1]);
					this._scale = c.distanceTo(d) / this._startDist, this._delta = c._add(d)._divideBy(2)._subtract(this._startCenter), 1 !== this._scale && (b.options.bounceAtZoomLimits || !(b.getZoom() === b.getMinZoom() && this._scale < 1 || b.getZoom() === b.getMaxZoom() && this._scale > 1)) && (this._moved || (e.DomUtil.addClass(b._mapPane, "leaflet-touching"), b.fire("movestart").fire("zoomstart"), this._moved = !0), e.Util.cancelAnimFrame(this._animRequest), this._animRequest = e.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), e.DomEvent.preventDefault(a))
				}
			},
			_updateOnMove: function() {
				var a = this._map,
					b = this._getScaleOrigin(),
					c = a.layerPointToLatLng(b),
					d = a.getScaleZoom(this._scale);
				a._animateZoom(c, d, this._startCenter, this._scale, this._delta, !1, !0)
			},
			_onTouchEnd: function() {
				if (!this._moved || !this._zooming) return void(this._zooming = !1);
				var a = this._map;
				this._zooming = !1, e.DomUtil.removeClass(a._mapPane, "leaflet-touching"), e.Util.cancelAnimFrame(this._animRequest), e.DomEvent.off(b, "touchmove", this._onTouchMove).off(b, "touchend", this._onTouchEnd);
				var c = this._getScaleOrigin(),
					d = a.layerPointToLatLng(c),
					f = a.getZoom(),
					g = a.getScaleZoom(this._scale) - f,
					h = g > 0 ? Math.ceil(g) : Math.floor(g),
					i = a._limitZoom(f + h),
					j = a.getZoomScale(i) / this._scale;
				a._animateZoom(d, i, c, j)
			},
			_getScaleOrigin: function() {
				var a = this._centerOffset.subtract(this._delta).divideBy(this._scale);
				return this._startCenter.add(a)
			}
		}), e.Map.addInitHook("addHandler", "touchZoom", e.Map.TouchZoom), e.Map.mergeOptions({
			tap: !0,
			tapTolerance: 15
		}), e.Map.Tap = e.Handler.extend({
			addHooks: function() {
				e.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
			},
			removeHooks: function() {
				e.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
			},
			_onDown: function(a) {
				if (a.touches) {
					if (e.DomEvent.preventDefault(a), this._fireClick = !0, a.touches.length > 1) return this._fireClick = !1, void clearTimeout(this._holdTimeout);
					var c = a.touches[0],
						d = c.target;
					this._startPos = this._newPos = new e.Point(c.clientX, c.clientY), d.tagName && "a" === d.tagName.toLowerCase() && e.DomUtil.addClass(d, "leaflet-active"), this._holdTimeout = setTimeout(e.bind(function() {
						this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", c))
					}, this), 1e3), e.DomEvent.on(b, "touchmove", this._onMove, this).on(b, "touchend", this._onUp, this)
				}
			},
			_onUp: function(a) {
				if (clearTimeout(this._holdTimeout), e.DomEvent.off(b, "touchmove", this._onMove, this).off(b, "touchend", this._onUp, this), this._fireClick && a && a.changedTouches) {
					var c = a.changedTouches[0],
						d = c.target;
					d && d.tagName && "a" === d.tagName.toLowerCase() && e.DomUtil.removeClass(d, "leaflet-active"), this._isTapValid() && this._simulateEvent("click", c)
				}
			},
			_isTapValid: function() {
				return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
			},
			_onMove: function(a) {
				var b = a.touches[0];
				this._newPos = new e.Point(b.clientX, b.clientY)
			},
			_simulateEvent: function(c, d) {
				var e = b.createEvent("MouseEvents");
				e._simulated = !0, d.target._simulatedClick = !0, e.initMouseEvent(c, !0, !0, a, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), d.target.dispatchEvent(e)
			}
		}), e.Browser.touch && !e.Browser.pointer && e.Map.addInitHook("addHandler", "tap", e.Map.Tap), e.Map.mergeOptions({
			boxZoom: !0
		}), e.Map.BoxZoom = e.Handler.extend({
			initialize: function(a) {
				this._map = a, this._container = a._container, this._pane = a._panes.overlayPane, this._moved = !1
			},
			addHooks: function() {
				e.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
			},
			removeHooks: function() {
				e.DomEvent.off(this._container, "mousedown", this._onMouseDown), this._moved = !1
			},
			moved: function() {
				return this._moved
			},
			_onMouseDown: function(a) {
				return this._moved = !1, !a.shiftKey || 1 !== a.which && 1 !== a.button ? !1 : (e.DomUtil.disableTextSelection(), e.DomUtil.disableImageDrag(), this._startLayerPoint = this._map.mouseEventToLayerPoint(a), void e.DomEvent.on(b, "mousemove", this._onMouseMove, this).on(b, "mouseup", this._onMouseUp, this).on(b, "keydown", this._onKeyDown, this))
			},
			_onMouseMove: function(a) {
				this._moved || (this._box = e.DomUtil.create("div", "leaflet-zoom-box", this._pane), e.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", this._map.fire("boxzoomstart"));
				var b = this._startLayerPoint,
					c = this._box,
					d = this._map.mouseEventToLayerPoint(a),
					f = d.subtract(b),
					g = new e.Point(Math.min(d.x, b.x), Math.min(d.y, b.y));
				e.DomUtil.setPosition(c, g), this._moved = !0, c.style.width = Math.max(0, Math.abs(f.x) - 4) + "px", c.style.height = Math.max(0, Math.abs(f.y) - 4) + "px"
			},
			_finish: function() {
				this._moved && (this._pane.removeChild(this._box), this._container.style.cursor = ""), e.DomUtil.enableTextSelection(), e.DomUtil.enableImageDrag(), e.DomEvent.off(b, "mousemove", this._onMouseMove).off(b, "mouseup", this._onMouseUp).off(b, "keydown", this._onKeyDown)
			},
			_onMouseUp: function(a) {
				this._finish();
				var b = this._map,
					c = b.mouseEventToLayerPoint(a);
				if (!this._startLayerPoint.equals(c)) {
					var d = new e.LatLngBounds(b.layerPointToLatLng(this._startLayerPoint), b.layerPointToLatLng(c));
					b.fitBounds(d), b.fire("boxzoomend", {
						boxZoomBounds: d
					})
				}
			},
			_onKeyDown: function(a) {
				27 === a.keyCode && this._finish()
			}
		}), e.Map.addInitHook("addHandler", "boxZoom", e.Map.BoxZoom), e.Map.mergeOptions({
			keyboard: !0,
			keyboardPanOffset: 80,
			keyboardZoomOffset: 1
		}), e.Map.Keyboard = e.Handler.extend({
			keyCodes: {
				left: [37],
				right: [39],
				down: [40],
				up: [38],
				zoomIn: [187, 107, 61, 171],
				zoomOut: [189, 109, 173]
			},
			initialize: function(a) {
				this._map = a, this._setPanOffset(a.options.keyboardPanOffset), this._setZoomOffset(a.options.keyboardZoomOffset)
			},
			addHooks: function() {
				var a = this._map._container; - 1 === a.tabIndex && (a.tabIndex = "0"), e.DomEvent.on(a, "focus", this._onFocus, this).on(a, "blur", this._onBlur, this).on(a, "mousedown", this._onMouseDown, this), this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
			},
			removeHooks: function() {
				this._removeHooks();
				var a = this._map._container;
				e.DomEvent.off(a, "focus", this._onFocus, this).off(a, "blur", this._onBlur, this).off(a, "mousedown", this._onMouseDown, this), this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
			},
			_onMouseDown: function() {
				if (!this._focused) {
					var c = b.body,
						d = b.documentElement,
						e = c.scrollTop || d.scrollTop,
						f = c.scrollLeft || d.scrollLeft;
					this._map._container.focus(), a.scrollTo(f, e)
				}
			},
			_onFocus: function() {
				this._focused = !0, this._map.fire("focus")
			},
			_onBlur: function() {
				this._focused = !1, this._map.fire("blur")
			},
			_setPanOffset: function(a) {
				var b, c, d = this._panKeys = {},
					e = this.keyCodes;
				for (b = 0, c = e.left.length; c > b; b++) d[e.left[b]] = [-1 * a, 0];
				for (b = 0, c = e.right.length; c > b; b++) d[e.right[b]] = [a, 0];
				for (b = 0, c = e.down.length; c > b; b++) d[e.down[b]] = [0, a];
				for (b = 0, c = e.up.length; c > b; b++) d[e.up[b]] = [0, -1 * a]
			},
			_setZoomOffset: function(a) {
				var b, c, d = this._zoomKeys = {},
					e = this.keyCodes;
				for (b = 0, c = e.zoomIn.length; c > b; b++) d[e.zoomIn[b]] = a;
				for (b = 0, c = e.zoomOut.length; c > b; b++) d[e.zoomOut[b]] = -a
			},
			_addHooks: function() {
				e.DomEvent.on(b, "keydown", this._onKeyDown, this)
			},
			_removeHooks: function() {
				e.DomEvent.off(b, "keydown", this._onKeyDown, this)
			},
			_onKeyDown: function(a) {
				var b = a.keyCode,
					c = this._map;
				if (b in this._panKeys) {
					if (c._panAnim && c._panAnim._inProgress) return;
					c.panBy(this._panKeys[b]), c.options.maxBounds && c.panInsideBounds(c.options.maxBounds)
				} else {
					if (!(b in this._zoomKeys)) return;
					c.setZoom(c.getZoom() + this._zoomKeys[b])
				}
				e.DomEvent.stop(a)
			}
		}), e.Map.addInitHook("addHandler", "keyboard", e.Map.Keyboard), e.Handler.MarkerDrag = e.Handler.extend({
			initialize: function(a) {
				this._marker = a
			},
			addHooks: function() {
				var a = this._marker._icon;
				this._draggable || (this._draggable = new e.Draggable(a, a)), this._draggable.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this), this._draggable.enable(), e.DomUtil.addClass(this._marker._icon, "leaflet-marker-draggable")
			},
			removeHooks: function() {
				this._draggable.off("dragstart", this._onDragStart, this).off("drag", this._onDrag, this).off("dragend", this._onDragEnd, this), this._draggable.disable(), e.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
			},
			moved: function() {
				return this._draggable && this._draggable._moved
			},
			_onDragStart: function() {
				this._marker.closePopup().fire("movestart").fire("dragstart")
			},
			_onDrag: function() {
				var a = this._marker,
					b = a._shadow,
					c = e.DomUtil.getPosition(a._icon),
					d = a._map.layerPointToLatLng(c);
				b && e.DomUtil.setPosition(b, c), a._latlng = d, a.fire("move", {
					latlng: d
				}).fire("drag")
			},
			_onDragEnd: function(a) {
				this._marker.fire("moveend").fire("dragend", a)
			}
		}), e.Control = e.Class.extend({
			options: {
				position: "topright"
			},
			initialize: function(a) {
				e.setOptions(this, a)
			},
			getPosition: function() {
				return this.options.position
			},
			setPosition: function(a) {
				var b = this._map;
				return b && b.removeControl(this), this.options.position = a, b && b.addControl(this), this
			},
			getContainer: function() {
				return this._container
			},
			addTo: function(a) {
				this._map = a;
				var b = this._container = this.onAdd(a),
					c = this.getPosition(),
					d = a._controlCorners[c];
				return e.DomUtil.addClass(b, "leaflet-control"), -1 !== c.indexOf("bottom") ? d.insertBefore(b, d.firstChild) : d.appendChild(b), this
			},
			removeFrom: function(a) {
				var b = this.getPosition(),
					c = a._controlCorners[b];
				return c.removeChild(this._container), this._map = null, this.onRemove && this.onRemove(a), this
			},
			_refocusOnMap: function() {
				this._map && this._map.getContainer().focus()
			}
		}), e.control = function(a) {
			return new e.Control(a)
		}, e.Map.include({
			addControl: function(a) {
				return a.addTo(this), this
			},
			removeControl: function(a) {
				return a.removeFrom(this), this
			},
			_initControlPos: function() {
				function a(a, f) {
					var g = c + a + " " + c + f;
					b[a + f] = e.DomUtil.create("div", g, d)
				}
				var b = this._controlCorners = {},
					c = "leaflet-",
					d = this._controlContainer = e.DomUtil.create("div", c + "control-container", this._container);
				a("top", "left"), a("top", "right"), a("bottom", "left"), a("bottom", "right")
			},
			_clearControlPos: function() {
				this._container.removeChild(this._controlContainer)
			}
		}), e.Control.Zoom = e.Control.extend({
			options: {
				position: "topleft",
				zoomInText: "+",
				zoomInTitle: "Zoom in",
				zoomOutText: "-",
				zoomOutTitle: "Zoom out"
			},
			onAdd: function(a) {
				var b = "leaflet-control-zoom",
					c = e.DomUtil.create("div", b + " leaflet-bar");
				return this._map = a, this._zoomInButton = this._createButton(this.options.zoomInText, this.options.zoomInTitle, b + "-in", c, this._zoomIn, this), this._zoomOutButton = this._createButton(this.options.zoomOutText, this.options.zoomOutTitle, b + "-out", c, this._zoomOut, this), this._updateDisabled(), a.on("zoomend zoomlevelschange", this._updateDisabled, this), c
			},
			onRemove: function(a) {
				a.off("zoomend zoomlevelschange", this._updateDisabled, this)
			},
			_zoomIn: function(a) {
				this._map.zoomIn(a.shiftKey ? 3 : 1)
			},
			_zoomOut: function(a) {
				this._map.zoomOut(a.shiftKey ? 3 : 1)
			},
			_createButton: function(a, b, c, d, f, g) {
				var h = e.DomUtil.create("a", c, d);
				h.innerHTML = a, h.href = "#", h.title = b;
				var i = e.DomEvent.stopPropagation;
				return e.DomEvent.on(h, "click", i).on(h, "mousedown", i).on(h, "dblclick", i).on(h, "click", e.DomEvent.preventDefault).on(h, "click", f, g).on(h, "click", this._refocusOnMap, g), h
			},
			_updateDisabled: function() {
				var a = this._map,
					b = "leaflet-disabled";
				e.DomUtil.removeClass(this._zoomInButton, b), e.DomUtil.removeClass(this._zoomOutButton, b), a._zoom === a.getMinZoom() && e.DomUtil.addClass(this._zoomOutButton, b), a._zoom === a.getMaxZoom() && e.DomUtil.addClass(this._zoomInButton, b)
			}
		}), e.Map.mergeOptions({
			zoomControl: !0
		}), e.Map.addInitHook(function() {
			this.options.zoomControl && (this.zoomControl = new e.Control.Zoom, this.addControl(this.zoomControl))
		}), e.control.zoom = function(a) {
			return new e.Control.Zoom(a)
		}, e.Control.Attribution = e.Control.extend({
			options: {
				position: "bottomright",
				prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
			},
			initialize: function(a) {
				e.setOptions(this, a), this._attributions = {}
			},
			onAdd: function(a) {
				this._container = e.DomUtil.create("div", "leaflet-control-attribution"), e.DomEvent.disableClickPropagation(this._container);
				for (var b in a._layers) a._layers[b].getAttribution && this.addAttribution(a._layers[b].getAttribution());
				return a.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container
			},
			onRemove: function(a) {
				a.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
			},
			setPrefix: function(a) {
				return this.options.prefix = a, this._update(), this
			},
			addAttribution: function(a) {
				return a ? (this._attributions[a] || (this._attributions[a] = 0), this._attributions[a]++, this._update(), this) : void 0
			},
			removeAttribution: function(a) {
				return a ? (this._attributions[a] && (this._attributions[a]--, this._update()), this) : void 0
			},
			_update: function() {
				if (this._map) {
					var a = [];
					for (var b in this._attributions) this._attributions[b] && a.push(b);
					var c = [];
					this.options.prefix && c.push(this.options.prefix), a.length && c.push(a.join(", ")), this._container.innerHTML = c.join(" | ")
				}
			},
			_onLayerAdd: function(a) {
				a.layer.getAttribution && this.addAttribution(a.layer.getAttribution())
			},
			_onLayerRemove: function(a) {
				a.layer.getAttribution && this.removeAttribution(a.layer.getAttribution())
			}
		}), e.Map.mergeOptions({
			attributionControl: !0
		}), e.Map.addInitHook(function() {
			this.options.attributionControl && (this.attributionControl = (new e.Control.Attribution).addTo(this))
		}), e.control.attribution = function(a) {
			return new e.Control.Attribution(a)
		}, e.Control.Scale = e.Control.extend({
			options: {
				position: "bottomleft",
				maxWidth: 100,
				metric: !0,
				imperial: !0,
				updateWhenIdle: !1
			},
			onAdd: function(a) {
				this._map = a;
				var b = "leaflet-control-scale",
					c = e.DomUtil.create("div", b),
					d = this.options;
				return this._addScales(d, b, c), a.on(d.updateWhenIdle ? "moveend" : "move", this._update, this), a.whenReady(this._update, this), c
			},
			onRemove: function(a) {
				a.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
			},
			_addScales: function(a, b, c) {
				a.metric && (this._mScale = e.DomUtil.create("div", b + "-line", c)), a.imperial && (this._iScale = e.DomUtil.create("div", b + "-line", c))
			},
			_update: function() {
				var a = this._map.getBounds(),
					b = a.getCenter().lat,
					c = 6378137 * Math.PI * Math.cos(b * Math.PI / 180),
					d = c * (a.getNorthEast().lng - a.getSouthWest().lng) / 180,
					e = this._map.getSize(),
					f = this.options,
					g = 0;
				e.x > 0 && (g = d * (f.maxWidth / e.x)), this._updateScales(f, g)
			},
			_updateScales: function(a, b) {
				a.metric && b && this._updateMetric(b), a.imperial && b && this._updateImperial(b)
			},
			_updateMetric: function(a) {
				var b = this._getRoundNum(a);
				this._mScale.style.width = this._getScaleWidth(b / a) + "px", this._mScale.innerHTML = 1e3 > b ? b + " m" : b / 1e3 + " km"
			},
			_updateImperial: function(a) {
				var b, c, d, e = 3.2808399 * a,
					f = this._iScale;
				e > 5280 ? (b = e / 5280, c = this._getRoundNum(b), f.style.width = this._getScaleWidth(c / b) + "px", f.innerHTML = c + " mi") : (d = this._getRoundNum(e), f.style.width = this._getScaleWidth(d / e) + "px", f.innerHTML = d + " ft")
			},
			_getScaleWidth: function(a) {
				return Math.round(this.options.maxWidth * a) - 10
			},
			_getRoundNum: function(a) {
				var b = Math.pow(10, (Math.floor(a) + "").length - 1),
					c = a / b;
				return c = c >= 10 ? 10 : c >= 5 ? 5 : c >= 3 ? 3 : c >= 2 ? 2 : 1, b * c
			}
		}), e.control.scale = function(a) {
			return new e.Control.Scale(a)
		}, e.Control.Layers = e.Control.extend({
			options: {
				collapsed: !0,
				position: "topright",
				autoZIndex: !0
			},
			initialize: function(a, b, c) {
				e.setOptions(this, c), this._layers = {}, this._lastZIndex = 0, this._handlingClick = !1;
				for (var d in a) this._addLayer(a[d], d);
				for (d in b) this._addLayer(b[d], d, !0)
			},
			onAdd: function(a) {
				return this._initLayout(), this._update(), a.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this), this._container
			},
			onRemove: function(a) {
				a.off("layeradd", this._onLayerChange, this).off("layerremove", this._onLayerChange, this)
			},
			addBaseLayer: function(a, b) {
				return this._addLayer(a, b), this._update(), this
			},
			addOverlay: function(a, b) {
				return this._addLayer(a, b, !0), this._update(), this
			},
			removeLayer: function(a) {
				var b = e.stamp(a);
				return delete this._layers[b], this._update(), this
			},
			_initLayout: function() {
				var a = "leaflet-control-layers",
					b = this._container = e.DomUtil.create("div", a);
				b.setAttribute("aria-haspopup", !0), e.Browser.touch ? e.DomEvent.on(b, "click", e.DomEvent.stopPropagation) : e.DomEvent.disableClickPropagation(b).disableScrollPropagation(b);
				var c = this._form = e.DomUtil.create("form", a + "-list");
				if (this.options.collapsed) {
					e.Browser.android || e.DomEvent.on(b, "mouseover", this._expand, this).on(b, "mouseout", this._collapse, this);
					var d = this._layersLink = e.DomUtil.create("a", a + "-toggle", b);
					d.href = "#", d.title = "Layers", e.Browser.touch ? e.DomEvent.on(d, "click", e.DomEvent.stop).on(d, "click", this._expand, this) : e.DomEvent.on(d, "focus", this._expand, this), e.DomEvent.on(c, "click", function() {
						setTimeout(e.bind(this._onInputClick, this), 0)
					}, this), this._map.on("click", this._collapse, this)
				} else this._expand();
				this._baseLayersList = e.DomUtil.create("div", a + "-base", c), this._separator = e.DomUtil.create("div", a + "-separator", c), this._overlaysList = e.DomUtil.create("div", a + "-overlays", c), b.appendChild(c)
			},
			_addLayer: function(a, b, c) {
				var d = e.stamp(a);
				this._layers[d] = {
					layer: a,
					name: b,
					overlay: c
				}, this.options.autoZIndex && a.setZIndex && (this._lastZIndex++, a.setZIndex(this._lastZIndex))
			},
			_update: function() {
				if (this._container) {
					this._baseLayersList.innerHTML = "", this._overlaysList.innerHTML = "";
					var a, b, c = !1,
						d = !1;
					for (a in this._layers) b = this._layers[a], this._addItem(b), d = d || b.overlay, c = c || !b.overlay;
					this._separator.style.display = d && c ? "" : "none"
				}
			},
			_onLayerChange: function(a) {
				var b = this._layers[e.stamp(a.layer)];
				if (b) {
					this._handlingClick || this._update();
					var c = b.overlay ? "layeradd" === a.type ? "overlayadd" : "overlayremove" : "layeradd" === a.type ? "baselayerchange" : null;
					c && this._map.fire(c, b)
				}
			},
			_createRadioElement: function(a, c) {
				var d = '<input type="radio" class="leaflet-control-layers-selector" name="' + a + '"';
				c && (d += ' checked="checked"'), d += "/>";
				var e = b.createElement("div");
				return e.innerHTML = d, e.firstChild
			},
			_addItem: function(a) {
				var c, d = b.createElement("label"),
					f = this._map.hasLayer(a.layer);
				a.overlay ? (c = b.createElement("input"), c.type = "checkbox", c.className = "leaflet-control-layers-selector", c.defaultChecked = f) : c = this._createRadioElement("leaflet-base-layers", f), c.layerId = e.stamp(a.layer), e.DomEvent.on(c, "click", this._onInputClick, this);
				var g = b.createElement("span");
				g.innerHTML = " " + a.name, d.appendChild(c), d.appendChild(g);
				var h = a.overlay ? this._overlaysList : this._baseLayersList;
				return h.appendChild(d), d
			},
			_onInputClick: function() {
				var a, b, c, d = this._form.getElementsByTagName("input"),
					e = d.length;
				for (this._handlingClick = !0, a = 0; e > a; a++) b = d[a], c = this._layers[b.layerId], b.checked && !this._map.hasLayer(c.layer) ? this._map.addLayer(c.layer) : !b.checked && this._map.hasLayer(c.layer) && this._map.removeLayer(c.layer);
				this._handlingClick = !1, this._refocusOnMap()
			},
			_expand: function() {
				e.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
			},
			_collapse: function() {
				this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
			}
		}), e.control.layers = function(a, b, c) {
			return new e.Control.Layers(a, b, c)
		}, e.PosAnimation = e.Class.extend({
			includes: e.Mixin.Events,
			run: function(a, b, c, d) {
				this.stop(), this._el = a, this._inProgress = !0, this._newPos = b, this.fire("start"), a.style[e.DomUtil.TRANSITION] = "all " + (c || .25) + "s cubic-bezier(0,0," + (d || .5) + ",1)", e.DomEvent.on(a, e.DomUtil.TRANSITION_END, this._onTransitionEnd, this), e.DomUtil.setPosition(a, b), e.Util.falseFn(a.offsetWidth), this._stepTimer = setInterval(e.bind(this._onStep, this), 50)
			},
			stop: function() {
				this._inProgress && (e.DomUtil.setPosition(this._el, this._getPos()), this._onTransitionEnd(), e.Util.falseFn(this._el.offsetWidth))
			},
			_onStep: function() {
				var a = this._getPos();
				return a ? (this._el._leaflet_pos = a, void this.fire("step")) : void this._onTransitionEnd()
			},
			_transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
			_getPos: function() {
				var b, c, d, f = this._el,
					g = a.getComputedStyle(f);
				if (e.Browser.any3d) {
					if (d = g[e.DomUtil.TRANSFORM].match(this._transformRe), !d) return;
					b = parseFloat(d[1]), c = parseFloat(d[2])
				} else b = parseFloat(g.left), c = parseFloat(g.top);
				return new e.Point(b, c, !0)
			},
			_onTransitionEnd: function() {
				e.DomEvent.off(this._el, e.DomUtil.TRANSITION_END, this._onTransitionEnd, this), this._inProgress && (this._inProgress = !1, this._el.style[e.DomUtil.TRANSITION] = "", this._el._leaflet_pos = this._newPos, clearInterval(this._stepTimer), this.fire("step").fire("end"))
			}
		}), e.Map.include({
			setView: function(a, b, d) {
				if (b = b === c ? this._zoom : this._limitZoom(b), a = this._limitCenter(e.latLng(a), b, this.options.maxBounds), d = d || {}, this._panAnim && this._panAnim.stop(), this._loaded && !d.reset && d !== !0) {
					d.animate !== c && (d.zoom = e.extend({
						animate: d.animate
					}, d.zoom), d.pan = e.extend({
						animate: d.animate
					}, d.pan));
					var f = this._zoom !== b ? this._tryAnimatedZoom && this._tryAnimatedZoom(a, b, d.zoom) : this._tryAnimatedPan(a, d.pan);
					if (f) return clearTimeout(this._sizeTimer), this
				}
				return this._resetView(a, b), this
			},
			panBy: function(a, b) {
				if (a = e.point(a).round(), b = b || {}, !a.x && !a.y) return this;
				if (this._panAnim || (this._panAnim = new e.PosAnimation, this._panAnim.on({
						step: this._onPanTransitionStep,
						end: this._onPanTransitionEnd
					}, this)), b.noMoveStart || this.fire("movestart"), b.animate !== !1) {
					e.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
					var c = this._getMapPanePos().subtract(a);
					this._panAnim.run(this._mapPane, c, b.duration || .25, b.easeLinearity)
				} else this._rawPanBy(a), this.fire("move").fire("moveend");
				return this
			},
			_onPanTransitionStep: function() {
				this.fire("move")
			},
			_onPanTransitionEnd: function() {
				e.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
			},
			_tryAnimatedPan: function(a, b) {
				var c = this._getCenterOffset(a)._floor();
				return (b && b.animate) === !0 || this.getSize().contains(c) ? (this.panBy(c, b), !0) : !1
			}
		}), e.PosAnimation = e.DomUtil.TRANSITION ? e.PosAnimation : e.PosAnimation.extend({
			run: function(a, b, c, d) {
				this.stop(), this._el = a, this._inProgress = !0, this._duration = c || .25, this._easeOutPower = 1 / Math.max(d || .5, .2), this._startPos = e.DomUtil.getPosition(a), this._offset = b.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
			},
			stop: function() {
				this._inProgress && (this._step(), this._complete())
			},
			_animate: function() {
				this._animId = e.Util.requestAnimFrame(this._animate, this), this._step()
			},
			_step: function() {
				var a = +new Date - this._startTime,
					b = 1e3 * this._duration;
				b > a ? this._runFrame(this._easeOut(a / b)) : (this._runFrame(1), this._complete())
			},
			_runFrame: function(a) {
				var b = this._startPos.add(this._offset.multiplyBy(a));
				e.DomUtil.setPosition(this._el, b), this.fire("step")
			},
			_complete: function() {
				e.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
			},
			_easeOut: function(a) {
				return 1 - Math.pow(1 - a, this._easeOutPower)
			}
		}), e.Map.mergeOptions({
			zoomAnimation: !0,
			zoomAnimationThreshold: 4
		}), e.DomUtil.TRANSITION && e.Map.addInitHook(function() {
			this._zoomAnimated = this.options.zoomAnimation && e.DomUtil.TRANSITION && e.Browser.any3d && !e.Browser.android23 && !e.Browser.mobileOpera, this._zoomAnimated && e.DomEvent.on(this._mapPane, e.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
		}), e.Map.include(e.DomUtil.TRANSITION ? {
			_catchTransitionEnd: function(a) {
				this._animatingZoom && a.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
			},
			_nothingToAnimate: function() {
				return !this._container.getElementsByClassName("leaflet-zoom-animated").length
			},
			_tryAnimatedZoom: function(a, b, c) {
				if (this._animatingZoom) return !0;
				if (c = c || {}, !this._zoomAnimated || c.animate === !1 || this._nothingToAnimate() || Math.abs(b - this._zoom) > this.options.zoomAnimationThreshold) return !1;
				var d = this.getZoomScale(b),
					e = this._getCenterOffset(a)._divideBy(1 - 1 / d),
					f = this._getCenterLayerPoint()._add(e);
				return c.animate === !0 || this.getSize().contains(e) ? (this.fire("movestart").fire("zoomstart"), this._animateZoom(a, b, f, d, null, !0), !0) : !1
			},
			_animateZoom: function(a, b, c, d, f, g, h) {
				h || (this._animatingZoom = !0), e.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"), this._animateToCenter = a, this._animateToZoom = b, e.Draggable && (e.Draggable._disabled = !0), e.Util.requestAnimFrame(function() {
					this.fire("zoomanim", {
						center: a,
						zoom: b,
						origin: c,
						scale: d,
						delta: f,
						backwards: g
					}), setTimeout(e.bind(this._onZoomTransitionEnd, this), 250)
				}, this)
			},
			_onZoomTransitionEnd: function() {
				this._animatingZoom && (this._animatingZoom = !1, e.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._resetView(this._animateToCenter, this._animateToZoom, !0, !0), e.Draggable && (e.Draggable._disabled = !1))
			}
		} : {}), e.TileLayer.include({
			_animateZoom: function(a) {
				this._animating || (this._animating = !0, this._prepareBgBuffer());
				var b = this._bgBuffer,
					c = e.DomUtil.TRANSFORM,
					d = a.delta ? e.DomUtil.getTranslateString(a.delta) : b.style[c],
					f = e.DomUtil.getScaleString(a.scale, a.origin);
				b.style[c] = a.backwards ? f + " " + d : d + " " + f
			},
			_endZoomAnim: function() {
				var a = this._tileContainer,
					b = this._bgBuffer;
				a.style.visibility = "", a.parentNode.appendChild(a), e.Util.falseFn(b.offsetWidth);
				var c = this._map.getZoom();
				(c > this.options.maxZoom || c < this.options.minZoom) && this._clearBgBuffer(), this._animating = !1
			},
			_clearBgBuffer: function() {
				var a = this._map;
				!a || a._animatingZoom || a.touchZoom._zooming || (this._bgBuffer.innerHTML = "", this._bgBuffer.style[e.DomUtil.TRANSFORM] = "")
			},
			_prepareBgBuffer: function() {
				var a = this._tileContainer,
					b = this._bgBuffer,
					c = this._getLoadedTilesPercentage(b),
					d = this._getLoadedTilesPercentage(a);
				return b && c > .5 && .5 > d ? (a.style.visibility = "hidden", void this._stopLoadingImages(a)) : (b.style.visibility = "hidden", b.style[e.DomUtil.TRANSFORM] = "", this._tileContainer = b, b = this._bgBuffer = a, this._stopLoadingImages(b), void clearTimeout(this._clearBgBufferTimer))
			},
			_getLoadedTilesPercentage: function(a) {
				var b, c, d = a.getElementsByTagName("img"),
					e = 0;
				for (b = 0, c = d.length; c > b; b++) d[b].complete && e++;
				return e / c
			},
			_stopLoadingImages: function(a) {
				var b, c, d, f = Array.prototype.slice.call(a.getElementsByTagName("img"));
				for (b = 0, c = f.length; c > b; b++) d = f[b], d.complete || (d.onload = e.Util.falseFn, d.onerror = e.Util.falseFn, d.src = e.Util.emptyImageUrl, d.parentNode.removeChild(d))
			}
		}), e.Map.include({
			_defaultLocateOptions: {
				watch: !1,
				setView: !1,
				maxZoom: 1 / 0,
				timeout: 1e4,
				maximumAge: 0,
				enableHighAccuracy: !1
			},
			locate: function(a) {
				if (a = this._locateOptions = e.extend(this._defaultLocateOptions, a), !navigator.geolocation) return this._handleGeolocationError({
					code: 0,
					message: "Geolocation not supported."
				}), this;
				var b = e.bind(this._handleGeolocationResponse, this),
					c = e.bind(this._handleGeolocationError, this);
				return a.watch ? this._locationWatchId = navigator.geolocation.watchPosition(b, c, a) : navigator.geolocation.getCurrentPosition(b, c, a), this
			},
			stopLocate: function() {
				return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
			},
			_handleGeolocationError: function(a) {
				var b = a.code,
					c = a.message || (1 === b ? "permission denied" : 2 === b ? "position unavailable" : "timeout");
				this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
					code: b,
					message: "Geolocation error: " + c + "."
				})
			},
			_handleGeolocationResponse: function(a) {
				var b = a.coords.latitude,
					c = a.coords.longitude,
					d = new e.LatLng(b, c),
					f = 180 * a.coords.accuracy / 40075017,
					g = f / Math.cos(e.LatLng.DEG_TO_RAD * b),
					h = e.latLngBounds([b - f, c - g], [b + f, c + g]),
					i = this._locateOptions;
				if (i.setView) {
					var j = Math.min(this.getBoundsZoom(h), i.maxZoom);
					this.setView(d, j)
				}
				var k = {
					latlng: d,
					bounds: h,
					timestamp: a.timestamp
				};
				for (var l in a.coords) "number" == typeof a.coords[l] && (k[l] = a.coords[l]);
				this.fire("locationfound", k)
			}
		})
}(window, document), topojson = function() {
	function a(a, b) {
		function c(b) {
			var c = a.arcs[b],
				d = c[0],
				e = [0, 0];
			return c.forEach(function(a) {
				e[0] += a[0], e[1] += a[1]
			}), [d, e]
		}
		var d = {},
			e = {};
		b.forEach(function(a) {
			var b, f, g = c(a),
				h = g[0],
				i = g[1];
			if (b = e[h])
				if (delete e[b.end], b.push(a), b.end = i, f = d[i]) {
					delete d[f.start];
					var j = f === b ? b : b.concat(f);
					d[j.start = b.start] = e[j.end = f.end] = j
				} else if (f = e[i]) {
				delete d[f.start], delete e[f.end];
				var j = b.concat(f.map(function(a) {
					return ~a
				}).reverse());
				d[j.start = b.start] = e[j.end = f.start] = j
			} else d[b.start] = e[b.end] = b;
			else if (b = d[i])
				if (delete d[b.start], b.unshift(a), b.start = h, f = e[h]) {
					delete e[f.end];
					var k = f === b ? b : f.concat(b);
					d[k.start = f.start] = e[k.end = b.end] = k
				} else if (f = d[h]) {
				delete d[f.start], delete e[f.end];
				var k = f.map(function(a) {
					return ~a
				}).reverse().concat(b);
				d[k.start = f.end] = e[k.end = b.end] = k
			} else d[b.start] = e[b.end] = b;
			else if (b = d[h])
				if (delete d[b.start], b.unshift(~a), b.start = i, f = e[i]) {
					delete e[f.end];
					var k = f === b ? b : f.concat(b);
					d[k.start = f.start] = e[k.end = b.end] = k
				} else if (f = d[i]) {
				delete d[f.start], delete e[f.end];
				var k = f.map(function(a) {
					return ~a
				}).reverse().concat(b);
				d[k.start = f.end] = e[k.end = b.end] = k
			} else d[b.start] = e[b.end] = b;
			else if (b = e[i])
				if (delete e[b.end], b.push(~a), b.end = h, f = e[h]) {
					delete d[f.start];
					var j = f === b ? b : b.concat(f);
					d[j.start = b.start] = e[j.end = f.end] = j
				} else if (f = d[h]) {
				delete d[f.start], delete e[f.end];
				var j = b.concat(f.map(function(a) {
					return ~a
				}).reverse());
				d[j.start = b.start] = e[j.end = f.start] = j
			} else d[b.start] = e[b.end] = b;
			else b = [a], d[b.start = h] = e[b.end = i] = b
		});
		var f = [];
		for (var g in e) f.push(e[g]);
		return f
	}

	function b(b, c, d) {
		function f(a) {
			0 > a && (a = -a - 1), (l[a] || (l[a] = [])).push(k)
		}

		function g(a) {
			a.forEach(f)
		}

		function h(a) {
			a.forEach(g)
		}

		function i(a) {
			"GeometryCollection" === a.type ? a.geometries.forEach(i) : a.type in m && (k = a, m[a.type](a.arcs))
		}
		var j = [];
		if (arguments.length > 1) {
			var k, l = [],
				m = {
					LineString: g,
					MultiLineString: h,
					Polygon: h,
					MultiPolygon: function(a) {
						a.forEach(h)
					}
				};
			i(c), l.forEach(arguments.length < 3 ? function(a, b) {
				j.push(b)
			} : function(a, b) {
				d(a[0], a[a.length - 1]) && j.push(b)
			})
		} else
			for (var n = 0, o = b.arcs.length; o > n; ++n) j.push(n);
		return e(b, {
			type: "MultiLineString",
			arcs: a(b, j)
		})
	}

	function c(a, b) {
		return "GeometryCollection" === b.type ? {
			type: "FeatureCollection",
			features: b.geometries.map(function(b) {
				return d(a, b)
			})
		} : d(a, b)
	}

	function d(a, b) {
		var c = {
			type: "Feature",
			id: b.id,
			properties: b.properties || {},
			geometry: e(a, b)
		};
		return null == b.id && delete c.id, c
	}

	function e(a, b) {
		function c(a, b) {
			b.length && b.pop();
			for (var c, d = o[0 > a ? ~a : a], e = 0, g = d.length, h = 0, i = 0; g > e; ++e) b.push(c = d[e].slice()), c[0] = (h += c[0]) * k + m, c[1] = (i += c[1]) * l + n;
			0 > a && f(b, g)
		}

		function d(a) {
			return a = a.slice(), a[0] = a[0] * k + m, a[1] = a[1] * l + n, a
		}

		function e(a) {
			for (var b = [], d = 0, e = a.length; e > d; ++d) c(a[d], b);
			return b.length < 2 && b.push(b[0].slice()), b
		}

		function g(a) {
			for (var b = e(a); b.length < 4;) b.push(b[0].slice());
			return b
		}

		function h(a) {
			return a.map(g)
		}

		function i(a) {
			var b = a.type;
			return "GeometryCollection" === b ? {
				type: b,
				geometries: a.geometries.map(i)
			} : b in p ? {
				type: b,
				coordinates: p[b](a)
			} : null
		}
		var j = a.transform,
			k = j.scale[0],
			l = j.scale[1],
			m = j.translate[0],
			n = j.translate[1],
			o = a.arcs,
			p = {
				Point: function(a) {
					return d(a.coordinates)
				},
				MultiPoint: function(a) {
					return a.coordinates.map(d)
				},
				LineString: function(a) {
					return e(a.arcs)
				},
				MultiLineString: function(a) {
					return a.arcs.map(e)
				},
				Polygon: function(a) {
					return h(a.arcs)
				},
				MultiPolygon: function(a) {
					return a.arcs.map(h)
				}
			};
		return i(b)
	}

	function f(a, b) {
		for (var c, d = a.length, e = d - b; e < --d;) c = a[e], a[e++] = a[d], a[d] = c
	}

	function g(a, b) {
		for (var c = 0, d = a.length; d > c;) {
			var e = c + d >>> 1;
			a[e] < b ? c = e + 1 : d = e
		}
		return c
	}

	function h(a) {
		function b(a, b) {
			a.forEach(function(a) {
				0 > a && (a = ~a);
				var c = e[a];
				c ? c.push(b) : e[a] = [b]
			})
		}

		function c(a, c) {
			a.forEach(function(a) {
				b(a, c)
			})
		}

		function d(a, b) {
			"GeometryCollection" === a.type ? a.geometries.forEach(function(a) {
				d(a, b)
			}) : a.type in h && h[a.type](a.arcs, b)
		}
		var e = {},
			f = a.map(function() {
				return []
			}),
			h = {
				LineString: b,
				MultiLineString: c,
				Polygon: c,
				MultiPolygon: function(a, b) {
					a.forEach(function(a) {
						c(a, b)
					})
				}
			};
		a.forEach(d);
		for (var i in e)
			for (var j = e[i], k = j.length, l = 0; k > l; ++l)
				for (var m = l + 1; k > m; ++m) {
					var n, o = j[l],
						p = j[m];
					(n = f[o])[i = g(n, p)] !== p && n.splice(i, 0, p), (n = f[p])[i = g(n, o)] !== o && n.splice(i, 0, o)
				}
		return f
	}

	function i(a, b) {
		function c(a) {
			e.remove(a), a[1][2] = b(a), e.push(a)
		}
		var d, e = l(k),
			f = 0;
		for (b || (b = j), a.arcs.forEach(function(c) {
				var f = [];
				c.forEach(m(a.transform));
				for (var g = 1, h = c.length - 1; h > g; ++g) d = c.slice(g - 1, g + 2), d[1][2] = b(d), f.push(d), e.push(d);
				c[0][2] = c[h][2] = 1 / 0;
				for (var g = 0, h = f.length; h > g; ++g) d = f[g], d.previous = f[g - 1], d.next = f[g + 1]
			}); d = e.pop();) {
			var g = d.previous,
				h = d.next;
			d[1][2] < f ? d[1][2] = f : f = d[1][2], g && (g.next = h, g[2] = d[2], c(g)), h && (h.previous = g, h[0] = d[0], c(h))
		}
		return a.arcs.forEach(function(b) {
			b.forEach(n(a.transform))
		}), a
	}

	function j(a) {
		return Math.abs((a[0][0] - a[2][0]) * (a[1][1] - a[0][1]) - (a[0][0] - a[1][0]) * (a[2][1] - a[0][1]))
	}

	function k(a, b) {
		return a[1][2] - b[1][2]
	}

	function l(a) {
		function b(b) {
			for (var c = e[b]; b > 0;) {
				var d = (b + 1 >> 1) - 1,
					f = e[d];
				if (a(c, f) >= 0) break;
				e[f.index = b] = f, e[c.index = b = d] = c
			}
		}

		function c(b) {
			for (var c = e[b];;) {
				var d = b + 1 << 1,
					f = d - 1,
					g = b,
					h = e[g];
				if (f < e.length && a(e[f], h) < 0 && (h = e[g = f]), d < e.length && a(e[d], h) < 0 && (h = e[g = d]), g === b) break;
				e[h.index = b] = h, e[c.index = b = g] = c
			}
		}
		var d = {},
			e = [];
		return d.push = function() {
			for (var a = 0, c = arguments.length; c > a; ++a) {
				var d = arguments[a];
				b(d.index = e.push(d) - 1)
			}
			return e.length
		}, d.pop = function() {
			var a = e[0],
				b = e.pop();
			return e.length && (e[b.index = 0] = b, c(0)), a
		}, d.remove = function(d) {
			var f = d.index,
				g = e.pop();
			return f !== e.length && (e[g.index = f] = g, (a(g, d) < 0 ? b : c)(f)), f
		}, d
	}

	function m(a) {
		var b = 0,
			c = 0,
			d = a.scale[0],
			e = a.scale[1],
			f = a.translate[0],
			g = a.translate[1];
		return function(a) {
			a[0] = (b += a[0]) * d + f, a[1] = (c += a[1]) * e + g
		}
	}

	function n(a) {
		var b = 0,
			c = 0,
			d = a.scale[0],
			e = a.scale[1],
			f = a.translate[0],
			g = a.translate[1];
		return function(a) {
			var h = (a[0] - f) / d | 0,
				i = (a[1] - g) / e | 0;
			a[0] = h - b, a[1] = i - c, b = h, c = i
		}
	}
	return {
		version: "1.3.0",
		mesh: b,
		feature: c,
		neighbors: h,
		presimplify: i
	}
}(), ! function() {
	function a(a) {
		return a && (a.ownerDocument || a.document || a).documentElement
	}

	function b(a) {
		return a && (a.ownerDocument && a.ownerDocument.defaultView || a.document && a || a.defaultView)
	}

	function c(a) {
		return a
	}

	function d(a, b, c) {
		return function() {
			var d = c.apply(b, arguments);
			return d === b ? a : d
		}
	}

	function e(a, b) {
		if (b in a) return b;
		b = b.charAt(0).toUpperCase() + b.slice(1);
		for (var c = 0, d = Mc.length; d > c; ++c) {
			var e = Mc[c] + b;
			if (e in a) return e
		}
	}

	function f(a, b) {
		for (var c in b) Object.defineProperty(a.prototype, c, {
			value: b[c],
			enumerable: !1
		})
	}

	function g() {
		this._ = Object.create(null)
	}

	function h(a) {
		return (a += "") === Nc || a[0] === Oc ? Oc + a : a
	}

	function i(a) {
		return (a += "")[0] === Oc ? a.slice(1) : a
	}

	function j(a) {
		return h(a) in this._
	}

	function k(a) {
		return (a = h(a)) in this._ && delete this._[a]
	}

	function l() {
		var a = [];
		for (var b in this._) a.push(i(b));
		return a
	}

	function m() {
		var a = 0;
		for (var b in this._) ++a;
		return a
	}

	function n() {
		for (var a in this._) return !1;
		return !0
	}

	function o() {}

	function p() {}

	function q(a) {
		function b() {
			for (var b, d = c, e = -1, f = d.length; ++e < f;)(b = d[e].on) && b.apply(this, arguments);
			return a
		}
		var c = [],
			d = new g;
		return b.on = function(b, e) {
			var f, g = d.get(b);
			return arguments.length < 2 ? g && g.on : (g && (g.on = null, c = c.slice(0, f = c.indexOf(g)).concat(c.slice(f + 1)), d.remove(b)), e && c.push(d.set(b, {
				on: e
			})), a)
		}, b
	}

	function r() {
		Kc.event.preventDefault()
	}

	function s() {
		for (var a, b = Kc.event; a = b.sourceEvent;) b = a;
		return b
	}

	function t(a) {
		for (var b = new p, c = 0, d = arguments.length; ++c < d;) b[arguments[c]] = q(b);
		return b.of = function(c, d) {
			return function(e) {
				try {
					var f = e.sourceEvent = Kc.event;
					e.target = a, Kc.event = e, b[e.type].apply(c, d)
				} finally {
					Kc.event = f
				}
			}
		}, b
	}

	function u(a) {
		return Sc(a, Wc), a
	}

	function v(a) {
		return "function" == typeof a ? a : function() {
			return Tc(a, this)
		}
	}

	function w(a, b, c) {
		function d() {
			var b = this[g];
			b && (this.removeEventListener(a, b, b.$), delete this[g])
		}

		function e() {
			var e = i(b, Qc(arguments));
			d.call(this), this.addEventListener(a, this[g] = e, e.$ = c), e._ = b
		}

		function f() {
			var b, c = new RegExp("^__on([^.]+)" + Kc.requote(a) + "$");
			for (var d in this)
				if (b = d.match(c)) {
					var e = this[d];
					this.removeEventListener(b[1], e, e.$), delete this[d]
				}
		}
		var g = "__on" + a,
			h = a.indexOf("."),
			i = x;
		h > 0 && (a = a.slice(0, h));
		var j = Xc.get(a);
		return j && (a = j, i = y), h ? b ? e : d : b ? o : f
	}

	function x(a, b) {
		return function(c) {
			var d = Kc.event;
			Kc.event = c, b[0] = this.__data__;
			try {
				a.apply(this, b)
			} finally {
				Kc.event = d
			}
		}
	}

	function y(a, b) {
		var c = x(a, b);
		return function(a) {
			var b = this,
				d = a.relatedTarget;
			d && (d === b || 8 & d.compareDocumentPosition(b)) || c.call(b, a)
		}
	}

	function z(c) {
		var d = ".dragsuppress-" + ++Zc,
			f = "click" + d,
			g = Kc.select(b(c)).on("touchmove" + d, r).on("dragstart" + d, r).on("selectstart" + d, r);
		if (null == Yc && (Yc = "onselectstart" in c ? !1 : e(c.style, "userSelect")), Yc) {
			var h = a(c).style,
				i = h[Yc];
			h[Yc] = "none"
		}
		return function(a) {
			if (g.on(d, null), Yc && (h[Yc] = i), a) {
				var b = function() {
					g.on(f, null)
				};
				g.on(f, function() {
					r(), b()
				}, !0), setTimeout(b, 0)
			}
		}
	}

	function A(a, c) {
		c.changedTouches && (c = c.changedTouches[0]);
		var d = a.ownerSVGElement || a;
		if (d.createSVGPoint) {
			var e = d.createSVGPoint();
			if (0 > $c) {
				var f = b(a);
				if (f.scrollX || f.scrollY) {
					d = Kc.select("body").append("svg").style({
						position: "absolute",
						top: 0,
						left: 0,
						margin: 0,
						padding: 0,
						border: "none"
					}, "important");
					var g = d[0][0].getScreenCTM();
					$c = !(g.f || g.e), d.remove()
				}
			}
			return $c ? (e.x = c.pageX, e.y = c.pageY) : (e.x = c.clientX, e.y = c.clientY), e = e.matrixTransform(a.getScreenCTM().inverse()), [e.x, e.y]
		}
		var h = a.getBoundingClientRect();
		return [c.clientX - h.left - a.clientLeft, c.clientY - h.top - a.clientTop]
	}

	function B() {
		return Kc.event.changedTouches[0].identifier
	}

	function C(a, b, c) {
		return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
	}

	function D(a) {
		return a > 1 ? 0 : -1 > a ? bd : Math.acos(a)
	}

	function E(a) {
		return a > 1 ? dd : -1 > a ? -dd : Math.asin(a)
	}

	function F(a) {
		return ((a = Math.exp(a)) - 1 / a) / 2
	}

	function G(a) {
		return ((a = Math.exp(a)) + 1 / a) / 2
	}

	function H(a) {
		return ((a = Math.exp(2 * a)) - 1) / (a + 1)
	}

	function I(a) {
		return "function" == typeof a ? a : function() {
			return a
		}
	}

	function J() {
		var a = K(),
			b = L() - a;
		b > 24 ? (isFinite(b) && (clearTimeout(qd), qd = setTimeout(J, b)), pd = 0) : (pd = 1, sd(J))
	}

	function K() {
		var a = Date.now();
		for (rd = nd; rd;) a >= rd.t && (rd.f = rd.c(a - rd.t)), rd = rd.n;
		return a
	}

	function L() {
		for (var a, b = nd, c = 1 / 0; b;) b.f ? b = a ? a.n = b.n : nd = b.n : (b.t < c && (c = b.t), b = (a = b).n);
		return od = a, c
	}

	function M(a, b) {
		a && vd.hasOwnProperty(a.type) && vd[a.type](a, b)
	}

	function N(a, b, c) {
		var d, e = -1,
			f = a.length - c;
		for (b.lineStart(); ++e < f;) d = a[e], b.point(d[0], d[1], d[2]);
		b.lineEnd()
	}

	function O(a, b) {
		var c = -1,
			d = a.length;
		for (b.polygonStart(); ++c < d;) N(a[c], b, 1);
		b.polygonEnd()
	}

	function P() {}

	function Q(a, b, c) {
		var d = c.s = a + b,
			e = d - a,
			f = d - e;
		c.t = a - f + (b - e)
	}

	function R() {
		function a(a, b) {
			a *= ed, b = b * ed / 2 + bd / 4;
			var c = a - d,
				g = c >= 0 ? 1 : -1,
				h = g * c,
				i = Math.cos(b),
				j = Math.sin(b),
				k = f * j,
				l = e * i + k * Math.cos(h),
				m = k * g * Math.sin(h);
			yd.add(Math.atan2(m, l)), d = a, e = i, f = j
		}
		var b, c, d, e, f;
		zd.point = function(g, h) {
			zd.point = a, d = (b = g) * ed, e = Math.cos(h = (c = h) * ed / 2 + bd / 4), f = Math.sin(h)
		}, zd.lineEnd = function() {
			a(b, c)
		}
	}

	function S(a) {
		var b = a[0],
			c = a[1],
			d = Math.cos(c);
		return [d * Math.cos(b), d * Math.sin(b), Math.sin(c)]
	}

	function T(a, b) {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
	}

	function U(a, b) {
		return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
	}

	function V(a, b) {
		a[0] += b[0], a[1] += b[1], a[2] += b[2]
	}

	function W(a, b) {
		return [a[0] * b, a[1] * b, a[2] * b]
	}

	function X(a) {
		var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
		a[0] /= b, a[1] /= b, a[2] /= b
	}

	function Y(a) {
		return [Math.atan2(a[1], a[0]), E(a[2])]
	}

	function Z(a, b) {
		return td(a[0] - b[0]) < _c && td(a[1] - b[1]) < _c
	}

	function $(a, b) {
		function c(c, d) {
			return c = a(c, d), b(c[0], c[1])
		}
		return a.invert && b.invert && (c.invert = function(c, d) {
			return c = b.invert(c, d), c && a.invert(c[0], c[1])
		}), c
	}

	function _() {
		return !0
	}

	function aa(a, b, c, d, e) {
		var f = [],
			g = [];
		if (a.forEach(function(a) {
				if (!((b = a.length - 1) <= 0)) {
					var b, c = a[0],
						d = a[b];
					if (Z(c, d)) {
						e.lineStart();
						for (var h = 0; b > h; ++h) e.point((c = a[h])[0], c[1]);
						return void e.lineEnd()
					}
					var i = new ca(c, a, null, !0),
						j = new ca(c, null, i, !1);
					i.o = j, f.push(i), g.push(j), i = new ca(d, a, null, !1), j = new ca(d, null, i, !0), i.o = j, f.push(i), g.push(j)
				}
			}), g.sort(b), ba(f), ba(g), f.length) {
			for (var h = 0, i = c, j = g.length; j > h; ++h) g[h].e = i = !i;
			for (var k, l, m = f[0];;) {
				for (var n = m, o = !0; n.v;)
					if ((n = n.n) === m) return;
				k = n.z, e.lineStart();
				do {
					if (n.v = n.o.v = !0, n.e) {
						if (o)
							for (var h = 0, j = k.length; j > h; ++h) e.point((l = k[h])[0], l[1]);
						else d(n.x, n.n.x, 1, e);
						n = n.n
					} else {
						if (o) {
							k = n.p.z;
							for (var h = k.length - 1; h >= 0; --h) e.point((l = k[h])[0], l[1])
						} else d(n.x, n.p.x, -1, e);
						n = n.p
					}
					n = n.o, k = n.z, o = !o
				} while (!n.v);
				e.lineEnd()
			}
		}
	}

	function ba(a) {
		if (b = a.length) {
			for (var b, c, d = 0, e = a[0]; ++d < b;) e.n = c = a[d], c.p = e, e = c;
			e.n = c = a[0], c.p = e
		}
	}

	function ca(a, b, c, d) {
		this.x = a, this.z = b, this.o = c, this.e = d, this.v = !1, this.n = this.p = null
	}

	function da(a, b, c, d) {
		return function(e, f) {
			function g(b, c) {
				var d = e(b, c);
				a(b = d[0], c = d[1]) && f.point(b, c)
			}

			function h(a, b) {
				var c = e(a, b);
				q.point(c[0], c[1])
			}

			function i() {
				s.point = h, q.lineStart()
			}

			function j() {
				s.point = g, q.lineEnd()
			}

			function k(a, b) {
				p.push([a, b]);
				var c = e(a, b);
				u.point(c[0], c[1])
			}

			function l() {
				u.lineStart(), p = []
			}

			function m() {
				k(p[0][0], p[0][1]), u.lineEnd();
				var a, b = u.clean(),
					c = t.buffer(),
					d = c.length;
				if (p.pop(), o.push(p), p = null, d)
					if (1 & b) {
						a = c[0];
						var e, d = a.length - 1,
							g = -1;
						if (d > 0) {
							for (v || (f.polygonStart(), v = !0), f.lineStart(); ++g < d;) f.point((e = a[g])[0], e[1]);
							f.lineEnd()
						}
					} else d > 1 && 2 & b && c.push(c.pop().concat(c.shift())), n.push(c.filter(ea))
			}
			var n, o, p, q = b(f),
				r = e.invert(d[0], d[1]),
				s = {
					point: g,
					lineStart: i,
					lineEnd: j,
					polygonStart: function() {
						s.point = k, s.lineStart = l, s.lineEnd = m, n = [], o = []
					},
					polygonEnd: function() {
						s.point = g, s.lineStart = i, s.lineEnd = j, n = Kc.merge(n);
						var a = ka(r, o);
						n.length ? (v || (f.polygonStart(), v = !0), aa(n, ga, a, c, f)) : a && (v || (f.polygonStart(), v = !0), f.lineStart(), c(null, null, 1, f), f.lineEnd()), v && (f.polygonEnd(), v = !1), n = o = null
					},
					sphere: function() {
						f.polygonStart(), f.lineStart(), c(null, null, 1, f), f.lineEnd(), f.polygonEnd()
					}
				},
				t = fa(),
				u = b(t),
				v = !1;
			return s
		}
	}

	function ea(a) {
		return a.length > 1
	}

	function fa() {
		var a, b = [];
		return {
			lineStart: function() {
				b.push(a = [])
			},
			point: function(b, c) {
				a.push([b, c])
			},
			lineEnd: o,
			buffer: function() {
				var c = b;
				return b = [], a = null, c
			},
			rejoin: function() {
				b.length > 1 && b.push(b.pop().concat(b.shift()))
			}
		}
	}

	function ga(a, b) {
		return ((a = a.x)[0] < 0 ? a[1] - dd - _c : dd - a[1]) - ((b = b.x)[0] < 0 ? b[1] - dd - _c : dd - b[1])
	}

	function ha(a) {
		var b, c = NaN,
			d = NaN,
			e = NaN;
		return {
			lineStart: function() {
				a.lineStart(), b = 1
			},
			point: function(f, g) {
				var h = f > 0 ? bd : -bd,
					i = td(f - c);
				td(i - bd) < _c ? (a.point(c, d = (d + g) / 2 > 0 ? dd : -dd), a.point(e, d), a.lineEnd(), a.lineStart(), a.point(h, d), a.point(f, d), b = 0) : e !== h && i >= bd && (td(c - e) < _c && (c -= e * _c), td(f - h) < _c && (f -= h * _c), d = ia(c, d, f, g), a.point(e, d), a.lineEnd(), a.lineStart(), a.point(h, d), b = 0), a.point(c = f, d = g), e = h
			},
			lineEnd: function() {
				a.lineEnd(), c = d = NaN
			},
			clean: function() {
				return 2 - b
			}
		}
	}

	function ia(a, b, c, d) {
		var e, f, g = Math.sin(a - c);
		return td(g) > _c ? Math.atan((Math.sin(b) * (f = Math.cos(d)) * Math.sin(c) - Math.sin(d) * (e = Math.cos(b)) * Math.sin(a)) / (e * f * g)) : (b + d) / 2
	}

	function ja(a, b, c, d) {
		var e;
		if (null == a) e = c * dd, d.point(-bd, e), d.point(0, e), d.point(bd, e), d.point(bd, 0), d.point(bd, -e), d.point(0, -e), d.point(-bd, -e), d.point(-bd, 0), d.point(-bd, e);
		else if (td(a[0] - b[0]) > _c) {
			var f = a[0] < b[0] ? bd : -bd;
			e = c * f / 2, d.point(-f, e), d.point(0, e), d.point(f, e)
		} else d.point(b[0], b[1])
	}

	function ka(a, b) {
		var c = a[0],
			d = a[1],
			e = [Math.sin(c), -Math.cos(c), 0],
			f = 0,
			g = 0;
		yd.reset();
		for (var h = 0, i = b.length; i > h; ++h) {
			var j = b[h],
				k = j.length;
			if (k)
				for (var l = j[0], m = l[0], n = l[1] / 2 + bd / 4, o = Math.sin(n), p = Math.cos(n), q = 1;;) {
					q === k && (q = 0), a = j[q];
					var r = a[0],
						s = a[1] / 2 + bd / 4,
						t = Math.sin(s),
						u = Math.cos(s),
						v = r - m,
						w = v >= 0 ? 1 : -1,
						x = w * v,
						y = x > bd,
						z = o * t;
					if (yd.add(Math.atan2(z * w * Math.sin(x), p * u + z * Math.cos(x))), f += y ? v + w * cd : v, y ^ m >= c ^ r >= c) {
						var A = U(S(l), S(a));
						X(A);
						var B = U(e, A);
						X(B);
						var C = (y ^ v >= 0 ? -1 : 1) * E(B[2]);
						(d > C || d === C && (A[0] || A[1])) && (g += y ^ v >= 0 ? 1 : -1)
					}
					if (!q++) break;
					m = r, o = t, p = u, l = a
				}
		}
		return (-_c > f || _c > f && 0 > yd) ^ 1 & g
	}

	function la(a) {
		function b(a, b) {
			return Math.cos(a) * Math.cos(b) > f
		}

		function c(a) {
			var c, f, i, j, k;
			return {
				lineStart: function() {
					j = i = !1, k = 1
				},
				point: function(l, m) {
					var n, o = [l, m],
						p = b(l, m),
						q = g ? p ? 0 : e(l, m) : p ? e(l + (0 > l ? bd : -bd), m) : 0;
					if (!c && (j = i = p) && a.lineStart(), p !== i && (n = d(c, o), (Z(c, n) || Z(o, n)) && (o[0] += _c, o[1] += _c, p = b(o[0], o[1]))), p !== i) k = 0, p ? (a.lineStart(), n = d(o, c), a.point(n[0], n[1])) : (n = d(c, o), a.point(n[0], n[1]), a.lineEnd()), c = n;
					else if (h && c && g ^ p) {
						var r;
						q & f || !(r = d(o, c, !0)) || (k = 0, g ? (a.lineStart(), a.point(r[0][0], r[0][1]), a.point(r[1][0], r[1][1]), a.lineEnd()) : (a.point(r[1][0], r[1][1]), a.lineEnd(), a.lineStart(), a.point(r[0][0], r[0][1])))
					}!p || c && Z(c, o) || a.point(o[0], o[1]), c = o, i = p, f = q
				},
				lineEnd: function() {
					i && a.lineEnd(), c = null
				},
				clean: function() {
					return k | (j && i) << 1
				}
			}
		}

		function d(a, b, c) {
			var d = S(a),
				e = S(b),
				g = [1, 0, 0],
				h = U(d, e),
				i = T(h, h),
				j = h[0],
				k = i - j * j;
			if (!k) return !c && a;
			var l = f * i / k,
				m = -f * j / k,
				n = U(g, h),
				o = W(g, l),
				p = W(h, m);
			V(o, p);
			var q = n,
				r = T(o, q),
				s = T(q, q),
				t = r * r - s * (T(o, o) - 1);
			if (!(0 > t)) {
				var u = Math.sqrt(t),
					v = W(q, (-r - u) / s);
				if (V(v, o), v = Y(v), !c) return v;
				var w, x = a[0],
					y = b[0],
					z = a[1],
					A = b[1];
				x > y && (w = x, x = y, y = w);
				var B = y - x,
					C = td(B - bd) < _c,
					D = C || _c > B;
				if (!C && z > A && (w = z, z = A, A = w), D ? C ? z + A > 0 ^ v[1] < (td(v[0] - x) < _c ? z : A) : z <= v[1] && v[1] <= A : B > bd ^ (x <= v[0] && v[0] <= y)) {
					var E = W(q, (-r + u) / s);
					return V(E, o), [v, Y(E)]
				}
			}
		}

		function e(b, c) {
			var d = g ? a : bd - a,
				e = 0;
			return -d > b ? e |= 1 : b > d && (e |= 2), -d > c ? e |= 4 : c > d && (e |= 8), e
		}
		var f = Math.cos(a),
			g = f > 0,
			h = td(f) > _c,
			i = Ra(a, 6 * ed);
		return da(b, c, i, g ? [0, -a] : [-bd, a - bd])
	}

	function ma(a, b, c, d) {
		return function(e) {
			var f, g = e.a,
				h = e.b,
				i = g.x,
				j = g.y,
				k = h.x,
				l = h.y,
				m = 0,
				n = 1,
				o = k - i,
				p = l - j;
			if (f = a - i, o || !(f > 0)) {
				if (f /= o, 0 > o) {
					if (m > f) return;
					n > f && (n = f)
				} else if (o > 0) {
					if (f > n) return;
					f > m && (m = f)
				}
				if (f = c - i, o || !(0 > f)) {
					if (f /= o, 0 > o) {
						if (f > n) return;
						f > m && (m = f)
					} else if (o > 0) {
						if (m > f) return;
						n > f && (n = f)
					}
					if (f = b - j, p || !(f > 0)) {
						if (f /= p, 0 > p) {
							if (m > f) return;
							n > f && (n = f)
						} else if (p > 0) {
							if (f > n) return;
							f > m && (m = f)
						}
						if (f = d - j, p || !(0 > f)) {
							if (f /= p, 0 > p) {
								if (f > n) return;
								f > m && (m = f)
							} else if (p > 0) {
								if (m > f) return;
								n > f && (n = f)
							}
							return m > 0 && (e.a = {
								x: i + m * o,
								y: j + m * p
							}), 1 > n && (e.b = {
								x: i + n * o,
								y: j + n * p
							}), e
						}
					}
				}
			}
		}
	}

	function na(a, b, c, d) {
		function e(d, e) {
			return td(d[0] - a) < _c ? e > 0 ? 0 : 3 : td(d[0] - c) < _c ? e > 0 ? 2 : 1 : td(d[1] - b) < _c ? e > 0 ? 1 : 0 : e > 0 ? 3 : 2
		}

		function f(a, b) {
			return g(a.x, b.x)
		}

		function g(a, b) {
			var c = e(a, 1),
				d = e(b, 1);
			return c !== d ? c - d : 0 === c ? b[1] - a[1] : 1 === c ? a[0] - b[0] : 2 === c ? a[1] - b[1] : b[0] - a[0]
		}
		return function(h) {
			function i(a) {
				for (var b = 0, c = q.length, d = a[1], e = 0; c > e; ++e)
					for (var f, g = 1, h = q[e], i = h.length, j = h[0]; i > g; ++g) f = h[g], j[1] <= d ? f[1] > d && C(j, f, a) > 0 && ++b : f[1] <= d && C(j, f, a) < 0 && --b, j = f;
				return 0 !== b
			}

			function j(f, h, i, j) {
				var k = 0,
					l = 0;
				if (null == f || (k = e(f, i)) !== (l = e(h, i)) || g(f, h) < 0 ^ i > 0) {
					do j.point(0 === k || 3 === k ? a : c, k > 1 ? d : b); while ((k = (k + i + 4) % 4) !== l)
				} else j.point(h[0], h[1])
			}

			function k(e, f) {
				return e >= a && c >= e && f >= b && d >= f
			}

			function l(a, b) {
				k(a, b) && h.point(a, b)
			}

			function m() {
				E.point = o, q && q.push(r = []), y = !0, x = !1, v = w = NaN
			}

			function n() {
				p && (o(s, t), u && x && B.rejoin(), p.push(B.buffer())), E.point = l, x && h.lineEnd()
			}

			function o(a, b) {
				a = Math.max(-Bd, Math.min(Bd, a)), b = Math.max(-Bd, Math.min(Bd, b));
				var c = k(a, b);
				if (q && r.push([a, b]), y) s = a, t = b, u = c, y = !1, c && (h.lineStart(), h.point(a, b));
				else if (c && x) h.point(a, b);
				else {
					var d = {
						a: {
							x: v,
							y: w
						},
						b: {
							x: a,
							y: b
						}
					};
					D(d) ? (x || (h.lineStart(), h.point(d.a.x, d.a.y)), h.point(d.b.x, d.b.y), c || h.lineEnd(), z = !1) : c && (h.lineStart(), h.point(a, b), z = !1)
				}
				v = a, w = b, x = c
			}
			var p, q, r, s, t, u, v, w, x, y, z, A = h,
				B = fa(),
				D = ma(a, b, c, d),
				E = {
					point: l,
					lineStart: m,
					lineEnd: n,
					polygonStart: function() {
						h = B, p = [], q = [], z = !0
					},
					polygonEnd: function() {
						h = A, p = Kc.merge(p);
						var b = i([a, d]),
							c = z && b,
							e = p.length;
						(c || e) && (h.polygonStart(), c && (h.lineStart(), j(null, null, 1, h), h.lineEnd()), e && aa(p, f, b, j, h), h.polygonEnd()), p = q = r = null
					}
				};
			return E
		}
	}

	function oa(a) {
		var b = 0,
			c = bd / 3,
			d = Ja(a),
			e = d(b, c);
		return e.parallels = function(a) {
			return arguments.length ? d(b = a[0] * bd / 180, c = a[1] * bd / 180) : [b / bd * 180, c / bd * 180]
		}, e
	}

	function pa(a, b) {
		function c(a, b) {
			var c = Math.sqrt(f - 2 * e * Math.sin(b)) / e;
			return [c * Math.sin(a *= e), g - c * Math.cos(a)]
		}
		var d = Math.sin(a),
			e = (d + Math.sin(b)) / 2,
			f = 1 + d * (2 * e - d),
			g = Math.sqrt(f) / e;
		return c.invert = function(a, b) {
			var c = g - b;
			return [Math.atan2(a, c) / e, E((f - (a * a + c * c) * e * e) / (2 * e))]
		}, c
	}

	function qa(a, b) {
		a *= ed;
		var c = Math.cos(b *= ed);
		ra(c * Math.cos(a), c * Math.sin(a), Math.sin(b))
	}

	function ra(a, b, c) {
		++Cd, Ed += (a - Ed) / Cd, Fd += (b - Fd) / Cd, Gd += (c - Gd) / Cd
	}

	function sa() {
		function a(a, e) {
			a *= ed;
			var f = Math.cos(e *= ed),
				g = f * Math.cos(a),
				h = f * Math.sin(a),
				i = Math.sin(e),
				j = Math.atan2(Math.sqrt((j = c * i - d * h) * j + (j = d * g - b * i) * j + (j = b * h - c * g) * j), b * g + c * h + d * i);
			Dd += j, Hd += j * (b + (b = g)), Id += j * (c + (c = h)), Jd += j * (d + (d = i)), ra(b, c, d)
		}
		var b, c, d;
		Td.point = function(e, f) {
			e *= ed;
			var g = Math.cos(f *= ed);
			b = g * Math.cos(e), c = g * Math.sin(e), d = Math.sin(f), Td.point = a, ra(b, c, d)
		}
	}

	function ta() {
		Td.point = qa
	}

	function ua() {
		function a(a, b) {
			a *= ed;
			var c = Math.cos(b *= ed),
				g = c * Math.cos(a),
				h = c * Math.sin(a),
				i = Math.sin(b),
				j = e * i - f * h,
				k = f * g - d * i,
				l = d * h - e * g,
				m = Math.sqrt(j * j + k * k + l * l),
				n = d * g + e * h + f * i,
				o = m && -D(n) / m,
				p = Math.atan2(m, n);
			Kd += o * j, Ld += o * k, Md += o * l, Dd += p, Hd += p * (d + (d = g)), Id += p * (e + (e = h)), Jd += p * (f + (f = i)), ra(d, e, f)
		}
		var b, c, d, e, f;
		Td.point = function(g, h) {
			b = g, c = h, Td.point = a, g *= ed;
			var i = Math.cos(h *= ed);
			d = i * Math.cos(g), e = i * Math.sin(g), f = Math.sin(h), ra(d, e, f)
		}, Td.lineEnd = function() {
			a(b, c), Td.lineEnd = ta, Td.point = qa
		}
	}

	function va() {
		function a(a, b) {
			Od += e * a - d * b, d = a, e = b
		}
		var b, c, d, e;
		Ud.point = function(f, g) {
			Ud.point = a, b = d = f, c = e = g
		}, Ud.lineEnd = function() {
			a(b, c)
		}
	}

	function wa(a, b) {
		Pd > a && (Pd = a), a > Rd && (Rd = a), Qd > b && (Qd = b), b > Sd && (Sd = b)
	}

	function xa() {
		function a(a, b) {
			g.push("M", a, ",", b, f)
		}

		function b(a, b) {
			g.push("M", a, ",", b), h.point = c
		}

		function c(a, b) {
			g.push("L", a, ",", b)
		}

		function d() {
			h.point = a
		}

		function e() {
			g.push("Z")
		}
		var f = ya(4.5),
			g = [],
			h = {
				point: a,
				lineStart: function() {
					h.point = b
				},
				lineEnd: d,
				polygonStart: function() {
					h.lineEnd = e
				},
				polygonEnd: function() {
					h.lineEnd = d, h.point = a
				},
				pointRadius: function(a) {
					return f = ya(a), h
				},
				result: function() {
					if (g.length) {
						var a = g.join("");
						return g = [], a
					}
				}
			};
		return h
	}

	function ya(a) {
		return "m0," + a + "a" + a + "," + a + " 0 1,1 0," + -2 * a + "a" + a + "," + a + " 0 1,1 0," + 2 * a + "z"
	}

	function za(a, b) {
		Ed += a, Fd += b, ++Gd
	}

	function Aa() {
		function a(a, d) {
			var e = a - b,
				f = d - c,
				g = Math.sqrt(e * e + f * f);
			Hd += g * (b + a) / 2, Id += g * (c + d) / 2, Jd += g, za(b = a, c = d)
		}
		var b, c;
		Wd.point = function(d, e) {
			Wd.point = a, za(b = d, c = e)
		}
	}

	function Ba() {
		Wd.point = za
	}

	function Ca() {
		function a(a, b) {
			var c = a - d,
				f = b - e,
				g = Math.sqrt(c * c + f * f);
			Hd += g * (d + a) / 2, Id += g * (e + b) / 2, Jd += g, g = e * a - d * b, Kd += g * (d + a), Ld += g * (e + b), Md += 3 * g, za(d = a, e = b)
		}
		var b, c, d, e;
		Wd.point = function(f, g) {
			Wd.point = a, za(b = d = f, c = e = g)
		}, Wd.lineEnd = function() {
			a(b, c)
		}
	}

	function Da(a) {
		function b(b, c) {
			a.moveTo(b + g, c), a.arc(b, c, g, 0, cd)
		}

		function c(b, c) {
			a.moveTo(b, c), h.point = d
		}

		function d(b, c) {
			a.lineTo(b, c)
		}

		function e() {
			h.point = b
		}

		function f() {
			a.closePath()
		}
		var g = 4.5,
			h = {
				point: b,
				lineStart: function() {
					h.point = c
				},
				lineEnd: e,
				polygonStart: function() {
					h.lineEnd = f
				},
				polygonEnd: function() {
					h.lineEnd = e, h.point = b
				},
				pointRadius: function(a) {
					return g = a, h
				},
				result: o
			};
		return h
	}

	function Ea(a) {
		function b(a) {
			return (h ? d : c)(a)
		}

		function c(b) {
			return Ha(b, function(c, d) {
				c = a(c, d), b.point(c[0], c[1])
			})
		}

		function d(b) {
			function c(c, d) {
				c = a(c, d), b.point(c[0], c[1])
			}

			function d() {
				t = NaN, y.point = f, b.lineStart()
			}

			function f(c, d) {
				var f = S([c, d]),
					g = a(c, d);
				e(t, u, s, v, w, x, t = g[0], u = g[1], s = c, v = f[0], w = f[1], x = f[2], h, b), b.point(t, u)
			}

			function g() {
				y.point = c, b.lineEnd()
			}

			function i() {
				d(), y.point = j, y.lineEnd = k
			}

			function j(a, b) {
				f(l = a, m = b), n = t, o = u, p = v, q = w, r = x, y.point = f
			}

			function k() {
				e(t, u, s, v, w, x, n, o, l, p, q, r, h, b), y.lineEnd = g, g()
			}
			var l, m, n, o, p, q, r, s, t, u, v, w, x, y = {
				point: c,
				lineStart: d,
				lineEnd: g,
				polygonStart: function() {
					b.polygonStart(), y.lineStart = i
				},
				polygonEnd: function() {
					b.polygonEnd(), y.lineStart = d
				}
			};
			return y
		}

		function e(b, c, d, h, i, j, k, l, m, n, o, p, q, r) {
			var s = k - b,
				t = l - c,
				u = s * s + t * t;
			if (u > 4 * f && q--) {
				var v = h + n,
					w = i + o,
					x = j + p,
					y = Math.sqrt(v * v + w * w + x * x),
					z = Math.asin(x /= y),
					A = td(td(x) - 1) < _c || td(d - m) < _c ? (d + m) / 2 : Math.atan2(w, v),
					B = a(A, z),
					C = B[0],
					D = B[1],
					E = C - b,
					F = D - c,
					G = t * E - s * F;
				(G * G / u > f || td((s * E + t * F) / u - .5) > .3 || g > h * n + i * o + j * p) && (e(b, c, d, h, i, j, C, D, A, v /= y, w /= y, x, q, r), r.point(C, D), e(C, D, A, v, w, x, k, l, m, n, o, p, q, r))
			}
		}
		var f = .5,
			g = Math.cos(30 * ed),
			h = 16;
		return b.precision = function(a) {
			return arguments.length ? (h = (f = a * a) > 0 && 16, b) : Math.sqrt(f)
		}, b
	}

	function Fa(a) {
		var b = Ea(function(b, c) {
			return a([b * fd, c * fd])
		});
		return function(a) {
			return Ka(b(a))
		}
	}

	function Ga(a) {
		this.stream = a
	}

	function Ha(a, b) {
		return {
			point: b,
			sphere: function() {
				a.sphere()
			},
			lineStart: function() {
				a.lineStart()
			},
			lineEnd: function() {
				a.lineEnd()
			},
			polygonStart: function() {
				a.polygonStart()
			},
			polygonEnd: function() {
				a.polygonEnd()
			}
		}
	}

	function Ia(a) {
		return Ja(function() {
			return a
		})()
	}

	function Ja(a) {
		function b(a) {
			return a = i(a[0] * ed, a[1] * ed), [a[0] * n + j, k - a[1] * n]
		}

		function d(a) {
			return a = i.invert((a[0] - j) / n, (k - a[1]) / n), a && [a[0] * fd, a[1] * fd]
		}

		function e() {
			i = $(h = Na(s, t, u), g);
			var a = g(q, r);
			return j = o - a[0] * n, k = p + a[1] * n, f()
		}

		function f() {
			return l && (l.valid = !1, l = null), b
		}
		var g, h, i, j, k, l, m = Ea(function(a, b) {
				return a = g(a, b), [a[0] * n + j, k - a[1] * n]
			}),
			n = 150,
			o = 480,
			p = 250,
			q = 0,
			r = 0,
			s = 0,
			t = 0,
			u = 0,
			v = Ad,
			w = c,
			x = null,
			y = null;
		return b.stream = function(a) {
				return l && (l.valid = !1), l = Ka(v(h, m(w(a)))), l.valid = !0, l
			}, b.clipAngle = function(a) {
				return arguments.length ? (v = null == a ? (x = a, Ad) : la((x = +a) * ed), f()) : x
			}, b.clipExtent = function(a) {
				return arguments.length ? (y = a, w = a ? na(a[0][0], a[0][1], a[1][0], a[1][1]) : c, f()) : y
			}, b.scale = function(a) {
				return arguments.length ? (n = +a, e()) : n
			}, b.translate = function(a) {
				return arguments.length ? (o = +a[0], p = +a[1], e()) : [o, p]
			}, b.center = function(a) {
				return arguments.length ? (q = a[0] % 360 * ed, r = a[1] % 360 * ed, e()) : [q * fd, r * fd]
			}, b.rotate = function(a) {
				return arguments.length ? (s = a[0] % 360 * ed, t = a[1] % 360 * ed, u = a.length > 2 ? a[2] % 360 * ed : 0, e()) : [s * fd, t * fd, u * fd]
			}, Kc.rebind(b, m, "precision"),
			function() {
				return g = a.apply(this, arguments), b.invert = g.invert && d, e()
			}
	}

	function Ka(a) {
		return Ha(a, function(b, c) {
			a.point(b * ed, c * ed)
		})
	}

	function La(a, b) {
		return [a, b]
	}

	function Ma(a, b) {
		return [a > bd ? a - cd : -bd > a ? a + cd : a, b]
	}

	function Na(a, b, c) {
		return a ? b || c ? $(Pa(a), Qa(b, c)) : Pa(a) : b || c ? Qa(b, c) : Ma
	}

	function Oa(a) {
		return function(b, c) {
			return b += a, [b > bd ? b - cd : -bd > b ? b + cd : b, c]
		}
	}

	function Pa(a) {
		var b = Oa(a);
		return b.invert = Oa(-a), b
	}

	function Qa(a, b) {
		function c(a, b) {
			var c = Math.cos(b),
				h = Math.cos(a) * c,
				i = Math.sin(a) * c,
				j = Math.sin(b),
				k = j * d + h * e;
			return [Math.atan2(i * f - k * g, h * d - j * e), E(k * f + i * g)]
		}
		var d = Math.cos(a),
			e = Math.sin(a),
			f = Math.cos(b),
			g = Math.sin(b);
		return c.invert = function(a, b) {
			var c = Math.cos(b),
				h = Math.cos(a) * c,
				i = Math.sin(a) * c,
				j = Math.sin(b),
				k = j * f - i * g;
			return [Math.atan2(i * f + j * g, h * d + k * e), E(k * d - h * e)]
		}, c
	}

	function Ra(a, b) {
		var c = Math.cos(a),
			d = Math.sin(a);
		return function(e, f, g, h) {
			var i = g * b;
			null != e ? (e = Sa(c, e), f = Sa(c, f), (g > 0 ? f > e : e > f) && (e += g * cd)) : (e = a + g * cd, f = a - .5 * i);
			for (var j, k = e; g > 0 ? k > f : f > k; k -= i) h.point((j = Y([c, -d * Math.cos(k), -d * Math.sin(k)]))[0], j[1])
		}
	}

	function Sa(a, b) {
		var c = S(b);
		c[0] -= a, X(c);
		var d = D(-c[1]);
		return ((-c[2] < 0 ? -d : d) + 2 * Math.PI - _c) % (2 * Math.PI)
	}

	function Ta(a) {
		for (var b = 1; a * b % 1;) b *= 10;
		return b
	}

	function Ua(a, b, c) {
		var d = Kc.range(a, b - _c, c).concat(b);
		return function(a) {
			return d.map(function(b) {
				return [a, b]
			})
		}
	}

	function Va(a, b, c) {
		var d = Kc.range(a, b - _c, c).concat(b);
		return function(a) {
			return d.map(function(b) {
				return [b, a]
			})
		}
	}

	function Wa(a) {
		return a.source
	}

	function Xa(a) {
		return a.target
	}

	function Ya() {
		function a(a, e) {
			var f = Math.sin(e *= ed),
				g = Math.cos(e),
				h = td((a *= ed) - b),
				i = Math.cos(h);
			Xd += Math.atan2(Math.sqrt((h = g * Math.sin(h)) * h + (h = d * f - c * g * i) * h), c * f + d * g * i), b = a, c = f, d = g
		}
		var b, c, d;
		Yd.point = function(e, f) {
			b = e * ed, c = Math.sin(f *= ed), d = Math.cos(f), Yd.point = a
		}, Yd.lineEnd = function() {
			Yd.point = Yd.lineEnd = o
		}
	}

	function Za(a, b) {
		function c(b, c) {
			var d = Math.cos(b),
				e = Math.cos(c),
				f = a(d * e);
			return [f * e * Math.sin(b), f * Math.sin(c)]
		}
		return c.invert = function(a, c) {
			var d = Math.sqrt(a * a + c * c),
				e = b(d),
				f = Math.sin(e),
				g = Math.cos(e);
			return [Math.atan2(a * f, d * g), Math.asin(d && c * f / d)]
		}, c
	}

	function $a(a) {
		var b = [a.a, a.b],
			c = [a.c, a.d],
			d = ab(b),
			e = _a(b, c),
			f = ab(bb(c, b, -e)) || 0;
		b[0] * c[1] < c[0] * b[1] && (b[0] *= -1, b[1] *= -1, d *= -1, e *= -1), this.rotate = (d ? Math.atan2(b[1], b[0]) : Math.atan2(-c[0], c[1])) * fd, this.translate = [a.e, a.f], this.scale = [d, f], this.skew = f ? Math.atan2(e, f) * fd : 0
	}

	function _a(a, b) {
		return a[0] * b[0] + a[1] * b[1]
	}

	function ab(a) {
		var b = Math.sqrt(_a(a, a));
		return b && (a[0] /= b, a[1] /= b), b
	}

	function bb(a, b, c) {
		return a[0] += c * b[0], a[1] += c * b[1], a
	}

	function cb(a) {
		var b = a[0],
			c = a[a.length - 1];
		return c > b ? [b, c] : [c, b]
	}

	function db() {}

	function eb(a, b, c) {
		return this instanceof eb ? (this.h = +a, this.s = +b, void(this.l = +c)) : arguments.length < 2 ? a instanceof eb ? new eb(a.h, a.s, a.l) : rb("" + a, sb, eb) : new eb(a, b, c)
	}

	function fb(a, b, c) {
		function d(a) {
			return a > 360 ? a -= 360 : 0 > a && (a += 360), 60 > a ? f + (g - f) * a / 60 : 180 > a ? g : 240 > a ? f + (g - f) * (240 - a) / 60 : f
		}

		function e(a) {
			return Math.round(255 * d(a))
		}
		var f, g;
		return a = isNaN(a) ? 0 : (a %= 360) < 0 ? a + 360 : a, b = isNaN(b) ? 0 : 0 > b ? 0 : b > 1 ? 1 : b, c = 0 > c ? 0 : c > 1 ? 1 : c, g = .5 >= c ? c * (1 + b) : c + b - c * b, f = 2 * c - g, new ob(e(a + 120), e(a), e(a - 120))
	}

	function gb(a, b, c) {
		return this instanceof gb ? (this.h = +a, this.c = +b, void(this.l = +c)) : arguments.length < 2 ? a instanceof gb ? new gb(a.h, a.c, a.l) : a instanceof ib ? kb(a.l, a.a, a.b) : kb((a = tb((a = Kc.rgb(a)).r, a.g, a.b)).l, a.a, a.b) : new gb(a, b, c)
	}

	function hb(a, b, c) {
		return isNaN(a) && (a = 0), isNaN(b) && (b = 0), new ib(c, Math.cos(a *= ed) * b, Math.sin(a) * b)
	}

	function ib(a, b, c) {
		return this instanceof ib ? (this.l = +a, this.a = +b, void(this.b = +c)) : arguments.length < 2 ? a instanceof ib ? new ib(a.l, a.a, a.b) : a instanceof gb ? hb(a.h, a.c, a.l) : tb((a = ob(a)).r, a.g, a.b) : new ib(a, b, c)
	}

	function jb(a, b, c) {
		var d = (a + 16) / 116,
			e = d + b / 500,
			f = d - c / 200;
		return e = lb(e) * ce, d = lb(d) * de, f = lb(f) * ee, new ob(nb(3.2404542 * e - 1.5371385 * d - .4985314 * f), nb(-.969266 * e + 1.8760108 * d + .041556 * f), nb(.0556434 * e - .2040259 * d + 1.0572252 * f))
	}

	function kb(a, b, c) {
		return a > 0 ? new gb(Math.atan2(c, b) * fd, Math.sqrt(b * b + c * c), a) : new gb(NaN, NaN, a)
	}

	function lb(a) {
		return a > .206893034 ? a * a * a : (a - 4 / 29) / 7.787037
	}

	function mb(a) {
		return a > .008856 ? Math.pow(a, 1 / 3) : 7.787037 * a + 4 / 29
	}

	function nb(a) {
		return Math.round(255 * (.00304 >= a ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - .055))
	}

	function ob(a, b, c) {
		return this instanceof ob ? (this.r = ~~a, this.g = ~~b, void(this.b = ~~c)) : arguments.length < 2 ? a instanceof ob ? new ob(a.r, a.g, a.b) : rb("" + a, ob, fb) : new ob(a, b, c)
	}

	function pb(a) {
		return new ob(a >> 16, a >> 8 & 255, 255 & a)
	}

	function qb(a) {
		return 16 > a ? "0" + Math.max(0, a).toString(16) : Math.min(255, a).toString(16)
	}

	function rb(a, b, c) {
		var d, e, f, g = 0,
			h = 0,
			i = 0;
		if (d = /([a-z]+)\((.*)\)/.exec(a = a.toLowerCase())) switch (e = d[2].split(","), d[1]) {
			case "hsl":
				return c(parseFloat(e[0]), parseFloat(e[1]) / 100, parseFloat(e[2]) / 100);
			case "rgb":
				return b(vb(e[0]), vb(e[1]), vb(e[2]))
		}
		return (f = he.get(a)) ? b(f.r, f.g, f.b) : (null == a || "#" !== a.charAt(0) || isNaN(f = parseInt(a.slice(1), 16)) || (4 === a.length ? (g = (3840 & f) >> 4, g = g >> 4 | g, h = 240 & f, h = h >> 4 | h, i = 15 & f, i = i << 4 | i) : 7 === a.length && (g = (16711680 & f) >> 16, h = (65280 & f) >> 8, i = 255 & f)), b(g, h, i))
	}

	function sb(a, b, c) {
		var d, e, f = Math.min(a /= 255, b /= 255, c /= 255),
			g = Math.max(a, b, c),
			h = g - f,
			i = (g + f) / 2;
		return h ? (e = .5 > i ? h / (g + f) : h / (2 - g - f), d = a == g ? (b - c) / h + (c > b ? 6 : 0) : b == g ? (c - a) / h + 2 : (a - b) / h + 4, d *= 60) : (d = NaN, e = i > 0 && 1 > i ? 0 : d), new eb(d, e, i)
	}

	function tb(a, b, c) {
		a = ub(a), b = ub(b), c = ub(c);
		var d = mb((.4124564 * a + .3575761 * b + .1804375 * c) / ce),
			e = mb((.2126729 * a + .7151522 * b + .072175 * c) / de),
			f = mb((.0193339 * a + .119192 * b + .9503041 * c) / ee);
		return ib(116 * e - 16, 500 * (d - e), 200 * (e - f))
	}

	function ub(a) {
		return (a /= 255) <= .04045 ? a / 12.92 : Math.pow((a + .055) / 1.055, 2.4)
	}

	function vb(a) {
		var b = parseFloat(a);
		return "%" === a.charAt(a.length - 1) ? Math.round(2.55 * b) : b
	}

	function wb(a, b) {
		a = Kc.rgb(a), b = Kc.rgb(b);
		var c = a.r,
			d = a.g,
			e = a.b,
			f = b.r - c,
			g = b.g - d,
			h = b.b - e;
		return function(a) {
			return "#" + qb(Math.round(c + f * a)) + qb(Math.round(d + g * a)) + qb(Math.round(e + h * a))
		}
	}

	function xb(a, b) {
		var c, d = {},
			e = {};
		for (c in a) c in b ? d[c] = Bb(a[c], b[c]) : e[c] = a[c];
		for (c in b) c in a || (e[c] = b[c]);
		return function(a) {
			for (c in d) e[c] = d[c](a);
			return e
		}
	}

	function yb(a, b) {
		var c, d = [],
			e = [],
			f = a.length,
			g = b.length,
			h = Math.min(a.length, b.length);
		for (c = 0; h > c; ++c) d.push(Bb(a[c], b[c]));
		for (; f > c; ++c) e[c] = a[c];
		for (; g > c; ++c) e[c] = b[c];
		return function(a) {
			for (c = 0; h > c; ++c) e[c] = d[c](a);
			return e
		}
	}

	function zb(a, b) {
		return a = +a, b = +b,
			function(c) {
				return a * (1 - c) + b * c
			}
	}

	function Ab(a, b) {
		var c, d, e, f = ie.lastIndex = je.lastIndex = 0,
			g = -1,
			h = [],
			i = [];
		for (a += "", b += "";
			(c = ie.exec(a)) && (d = je.exec(b));)(e = d.index) > f && (e = b.slice(f, e), h[g] ? h[g] += e : h[++g] = e), (c = c[0]) === (d = d[0]) ? h[g] ? h[g] += d : h[++g] = d : (h[++g] = null, i.push({
			i: g,
			x: zb(c, d)
		})), f = je.lastIndex;
		return f < b.length && (e = b.slice(f), h[g] ? h[g] += e : h[++g] = e), h.length < 2 ? i[0] ? (b = i[0].x, function(a) {
			return b(a) + ""
		}) : function() {
			return b
		} : (b = i.length, function(a) {
			for (var c, d = 0; b > d; ++d) h[(c = i[d]).i] = c.x(a);
			return h.join("")
		})
	}

	function Bb(a, b) {
		for (var c, d = Kc.interpolators.length; --d >= 0 && !(c = Kc.interpolators[d](a, b)););
		return c
	}

	function Cb(a, b) {
		return b -= a,
			function(c) {
				return Math.round(a + b * c)
			}
	}

	function Db(a, b) {
		return b = (b -= a = +a) || 1 / b,
			function(c) {
				return (c - a) / b
			}
	}

	function Eb(a, b) {
		return b = (b -= a = +a) || 1 / b,
			function(c) {
				return Math.max(0, Math.min(1, (c - a) / b))
			}
	}

	function Fb(a, b) {
		return b - (a ? Math.ceil(Math.log(a) / Math.LN10) : 1)
	}

	function Gb(a, b) {
		var c = Math.pow(10, 3 * td(8 - b));
		return {
			scale: b > 8 ? function(a) {
				return a / c
			} : function(a) {
				return a * c
			},
			symbol: a
		}
	}

	function Hb(a) {
		var b = a.decimal,
			d = a.thousands,
			e = a.grouping,
			f = a.currency,
			g = e && d ? function(a, b) {
				for (var c = a.length, f = [], g = 0, h = e[0], i = 0; c > 0 && h > 0 && (i + h + 1 > b && (h = Math.max(1, b - i)), f.push(a.substring(c -= h, c + h)), !((i += h + 1) > b));) h = e[g = (g + 1) % e.length];
				return f.reverse().join(d)
			} : c;
		return function(a) {
			var c = le.exec(a),
				d = c[1] || " ",
				e = c[2] || ">",
				h = c[3] || "-",
				i = c[4] || "",
				j = c[5],
				k = +c[6],
				l = c[7],
				m = c[8],
				n = c[9],
				o = 1,
				p = "",
				q = "",
				r = !1,
				s = !0;
			switch (m && (m = +m.substring(1)), (j || "0" === d && "=" === e) && (j = d = "0", e = "="), n) {
				case "n":
					l = !0, n = "g";
					break;
				case "%":
					o = 100, q = "%", n = "f";
					break;
				case "p":
					o = 100, q = "%", n = "r";
					break;
				case "b":
				case "o":
				case "x":
				case "X":
					"#" === i && (p = "0" + n.toLowerCase());
				case "c":
					s = !1;
				case "d":
					r = !0, m = 0;
					break;
				case "s":
					o = -1, n = "r"
			}
			"$" === i && (p = f[0], q = f[1]), "r" != n || m || (n = "g"), null != m && ("g" == n ? m = Math.max(1, Math.min(21, m)) : ("e" == n || "f" == n) && (m = Math.max(0, Math.min(20, m)))), n = me.get(n) || Ib;
			var t = j && l;
			return function(a) {
				var c = q;
				if (r && a % 1) return "";
				var f = 0 > a || 0 === a && 0 > 1 / a ? (a = -a, "-") : "-" === h ? "" : h;
				if (0 > o) {
					var i = Kc.formatPrefix(a, m);
					a = i.scale(a), c = i.symbol + q
				} else a *= o;
				a = n(a, m);
				var u, v, w = a.lastIndexOf(".");
				if (0 > w) {
					var x = s ? a.lastIndexOf("e") : -1;
					0 > x ? (u = a, v = "") : (u = a.substring(0, x), v = a.substring(x))
				} else u = a.substring(0, w), v = b + a.substring(w + 1);
				!j && l && (u = g(u, 1 / 0));
				var y = p.length + u.length + v.length + (t ? 0 : f.length),
					z = k > y ? new Array(y = k - y + 1).join(d) : "";
				return t && (u = g(z + u, z.length ? k - v.length : 1 / 0)), f += p, a = u + v, ("<" === e ? f + a + z : ">" === e ? z + f + a : "^" === e ? z.substring(0, y >>= 1) + f + a + z.substring(y) : f + (t ? a : z + a)) + c
			}
		}
	}

	function Ib(a) {
		return a + ""
	}

	function Jb() {
		this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
	}

	function Kb(a, b, c) {
		function d(b) {
			var c = a(b),
				d = f(c, 1);
			return d - b > b - c ? c : d
		}

		function e(c) {
			return b(c = a(new oe(c - 1)), 1), c
		}

		function f(a, c) {
			return b(a = new oe(+a), c), a
		}

		function g(a, d, f) {
			var g = e(a),
				h = [];
			if (f > 1)
				for (; d > g;) c(g) % f || h.push(new Date(+g)), b(g, 1);
			else
				for (; d > g;) h.push(new Date(+g)), b(g, 1);
			return h
		}

		function h(a, b, c) {
			try {
				oe = Jb;
				var d = new Jb;
				return d._ = a, g(d, b, c)
			} finally {
				oe = Date
			}
		}
		a.floor = a, a.round = d, a.ceil = e, a.offset = f, a.range = g;
		var i = a.utc = Lb(a);
		return i.floor = i, i.round = Lb(d), i.ceil = Lb(e), i.offset = Lb(f), i.range = h, a
	}

	function Lb(a) {
		return function(b, c) {
			try {
				oe = Jb;
				var d = new Jb;
				return d._ = b, a(d, c)._
			} finally {
				oe = Date
			}
		}
	}

	function Mb(a) {
		function b(a) {
			function b(b) {
				for (var c, e, f, g = [], h = -1, i = 0; ++h < d;) 37 === a.charCodeAt(h) && (g.push(a.slice(i, h)), null != (e = qe[c = a.charAt(++h)]) && (c = a.charAt(++h)), (f = C[c]) && (c = f(b, null == e ? "e" === c ? " " : "0" : e)), g.push(c), i = h + 1);
				return g.push(a.slice(i, h)), g.join("")
			}
			var d = a.length;
			return b.parse = function(b) {
				var d = {
						y: 1900,
						m: 0,
						d: 1,
						H: 0,
						M: 0,
						S: 0,
						L: 0,
						Z: null
					},
					e = c(d, a, b, 0);
				if (e != b.length) return null;
				"p" in d && (d.H = d.H % 12 + 12 * d.p);
				var f = null != d.Z && oe !== Jb,
					g = new(f ? Jb : oe);
				return "j" in d ? g.setFullYear(d.y, 0, d.j) : "w" in d && ("W" in d || "U" in d) ? (g.setFullYear(d.y, 0, 1), g.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + 7 * d.W - (g.getDay() + 5) % 7 : d.w + 7 * d.U - (g.getDay() + 6) % 7)) : g.setFullYear(d.y, d.m, d.d), g.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L), f ? g._ : g
			}, b.toString = function() {
				return a
			}, b
		}

		function c(a, b, c, d) {
			for (var e, f, g, h = 0, i = b.length, j = c.length; i > h;) {
				if (d >= j) return -1;
				if (e = b.charCodeAt(h++), 37 === e) {
					if (g = b.charAt(h++), f = D[g in qe ? b.charAt(h++) : g], !f || (d = f(a, c, d)) < 0) return -1
				} else if (e != c.charCodeAt(d++)) return -1
			}
			return d
		}

		function d(a, b, c) {
			w.lastIndex = 0;
			var d = w.exec(b.slice(c));
			return d ? (a.w = x.get(d[0].toLowerCase()), c + d[0].length) : -1
		}

		function e(a, b, c) {
			u.lastIndex = 0;
			var d = u.exec(b.slice(c));
			return d ? (a.w = v.get(d[0].toLowerCase()), c + d[0].length) : -1
		}

		function f(a, b, c) {
			A.lastIndex = 0;
			var d = A.exec(b.slice(c));
			return d ? (a.m = B.get(d[0].toLowerCase()), c + d[0].length) : -1
		}

		function g(a, b, c) {
			y.lastIndex = 0;
			var d = y.exec(b.slice(c));
			return d ? (a.m = z.get(d[0].toLowerCase()), c + d[0].length) : -1
		}

		function h(a, b, d) {
			return c(a, C.c.toString(), b, d)
		}

		function i(a, b, d) {
			return c(a, C.x.toString(), b, d)
		}

		function j(a, b, d) {
			return c(a, C.X.toString(), b, d)
		}

		function k(a, b, c) {
			var d = t.get(b.slice(c, c += 2).toLowerCase());
			return null == d ? -1 : (a.p = d, c)
		}
		var l = a.dateTime,
			m = a.date,
			n = a.time,
			o = a.periods,
			p = a.days,
			q = a.shortDays,
			r = a.months,
			s = a.shortMonths;
		b.utc = function(a) {
			function c(a) {
				try {
					oe = Jb;
					var b = new oe;
					return b._ = a, d(b)
				} finally {
					oe = Date
				}
			}
			var d = b(a);
			return c.parse = function(a) {
				try {
					oe = Jb;
					var b = d.parse(a);
					return b && b._
				} finally {
					oe = Date
				}
			}, c.toString = d.toString, c
		}, b.multi = b.utc.multi = ec;
		var t = Kc.map(),
			u = Ob(p),
			v = Pb(p),
			w = Ob(q),
			x = Pb(q),
			y = Ob(r),
			z = Pb(r),
			A = Ob(s),
			B = Pb(s);
		o.forEach(function(a, b) {
			t.set(a.toLowerCase(), b)
		});
		var C = {
				a: function(a) {
					return q[a.getDay()]
				},
				A: function(a) {
					return p[a.getDay()]
				},
				b: function(a) {
					return s[a.getMonth()]
				},
				B: function(a) {
					return r[a.getMonth()]
				},
				c: b(l),
				d: function(a, b) {
					return Nb(a.getDate(), b, 2)
				},
				e: function(a, b) {
					return Nb(a.getDate(), b, 2)
				},
				H: function(a, b) {
					return Nb(a.getHours(), b, 2)
				},
				I: function(a, b) {
					return Nb(a.getHours() % 12 || 12, b, 2)
				},
				j: function(a, b) {
					return Nb(1 + ne.dayOfYear(a), b, 3)
				},
				L: function(a, b) {
					return Nb(a.getMilliseconds(), b, 3)
				},
				m: function(a, b) {
					return Nb(a.getMonth() + 1, b, 2)
				},
				M: function(a, b) {
					return Nb(a.getMinutes(), b, 2)
				},
				p: function(a) {
					return o[+(a.getHours() >= 12)]
				},
				S: function(a, b) {
					return Nb(a.getSeconds(), b, 2)
				},
				U: function(a, b) {
					return Nb(ne.sundayOfYear(a), b, 2)
				},
				w: function(a) {
					return a.getDay()
				},
				W: function(a, b) {
					return Nb(ne.mondayOfYear(a), b, 2)
				},
				x: b(m),
				X: b(n),
				y: function(a, b) {
					return Nb(a.getFullYear() % 100, b, 2)
				},
				Y: function(a, b) {
					return Nb(a.getFullYear() % 1e4, b, 4)
				},
				Z: cc,
				"%": function() {
					return "%"
				}
			},
			D = {
				a: d,
				A: e,
				b: f,
				B: g,
				c: h,
				d: Yb,
				e: Yb,
				H: $b,
				I: $b,
				j: Zb,
				L: bc,
				m: Xb,
				M: _b,
				p: k,
				S: ac,
				U: Rb,
				w: Qb,
				W: Sb,
				x: i,
				X: j,
				y: Ub,
				Y: Tb,
				Z: Vb,
				"%": dc
			};
		return b
	}

	function Nb(a, b, c) {
		var d = 0 > a ? "-" : "",
			e = (d ? -a : a) + "",
			f = e.length;
		return d + (c > f ? new Array(c - f + 1).join(b) + e : e)
	}

	function Ob(a) {
		return new RegExp("^(?:" + a.map(Kc.requote).join("|") + ")", "i")
	}

	function Pb(a) {
		for (var b = new g, c = -1, d = a.length; ++c < d;) b.set(a[c].toLowerCase(), c);
		return b
	}

	function Qb(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c, c + 1));
		return d ? (a.w = +d[0], c + d[0].length) : -1
	}

	function Rb(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c));
		return d ? (a.U = +d[0], c + d[0].length) : -1
	}

	function Sb(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c));
		return d ? (a.W = +d[0], c + d[0].length) : -1
	}

	function Tb(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c, c + 4));
		return d ? (a.y = +d[0], c + d[0].length) : -1
	}

	function Ub(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c, c + 2));
		return d ? (a.y = Wb(+d[0]), c + d[0].length) : -1
	}

	function Vb(a, b, c) {
		return /^[+-]\d{4}$/.test(b = b.slice(c, c + 5)) ? (a.Z = -b, c + 5) : -1
	}

	function Wb(a) {
		return a + (a > 68 ? 1900 : 2e3)
	}

	function Xb(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c, c + 2));
		return d ? (a.m = d[0] - 1, c + d[0].length) : -1
	}

	function Yb(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c, c + 2));
		return d ? (a.d = +d[0], c + d[0].length) : -1
	}

	function Zb(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c, c + 3));
		return d ? (a.j = +d[0], c + d[0].length) : -1
	}

	function $b(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c, c + 2));
		return d ? (a.H = +d[0], c + d[0].length) : -1
	}

	function _b(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c, c + 2));
		return d ? (a.M = +d[0], c + d[0].length) : -1
	}

	function ac(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c, c + 2));
		return d ? (a.S = +d[0], c + d[0].length) : -1
	}

	function bc(a, b, c) {
		re.lastIndex = 0;
		var d = re.exec(b.slice(c, c + 3));
		return d ? (a.L = +d[0], c + d[0].length) : -1
	}

	function cc(a) {
		var b = a.getTimezoneOffset(),
			c = b > 0 ? "-" : "+",
			d = td(b) / 60 | 0,
			e = td(b) % 60;
		return c + Nb(d, "0", 2) + Nb(e, "0", 2)
	}

	function dc(a, b, c) {
		se.lastIndex = 0;
		var d = se.exec(b.slice(c, c + 1));
		return d ? c + d[0].length : -1
	}

	function ec(a) {
		for (var b = a.length, c = -1; ++c < b;) a[c][0] = this(a[c][0]);
		return function(b) {
			for (var c = 0, d = a[c]; !d[1](b);) d = a[++c];
			return d[0](b)
		}
	}

	function fc(a, b, c, d) {
		var e = c(a[0], a[1]),
			f = d(b[0], b[1]);
		return function(a) {
			return f(e(a))
		}
	}

	function gc(a, b) {
		var c, d = 0,
			e = a.length - 1,
			f = a[d],
			g = a[e];
		return f > g && (c = d, d = e, e = c, c = f, f = g, g = c), a[d] = b.floor(f), a[e] = b.ceil(g), a
	}

	function hc(a) {
		return a ? {
			floor: function(b) {
				return Math.floor(b / a) * a
			},
			ceil: function(b) {
				return Math.ceil(b / a) * a
			}
		} : ue
	}

	function ic(a, b) {
		return b > a ? -1 : a > b ? 1 : a >= b ? 0 : NaN
	}

	function jc(a) {
		return {
			left: function(b, c, d, e) {
				for (arguments.length < 3 && (d = 0), arguments.length < 4 && (e = b.length); e > d;) {
					var f = d + e >>> 1;
					a(b[f], c) < 0 ? d = f + 1 : e = f
				}
				return d
			},
			right: function(b, c, d, e) {
				for (arguments.length < 3 && (d = 0), arguments.length < 4 && (e = b.length); e > d;) {
					var f = d + e >>> 1;
					a(b[f], c) > 0 ? e = f : d = f + 1
				}
				return d
			}
		}
	}

	function kc(a, b, c, d) {
		var e = [],
			f = [],
			g = 0,
			h = Math.min(a.length, b.length) - 1;
		for (a[h] < a[0] && (a = a.slice().reverse(), b = b.slice().reverse()); ++g <= h;) e.push(c(a[g - 1], a[g])), f.push(d(b[g - 1], b[g]));
		return function(b) {
			var c = Kc.bisect(a, b, 1, h) - 1;
			return f[c](e[c](b))
		}
	}

	function lc(a, b, c, d) {
		function e() {
			var e = Math.min(a.length, b.length) > 2 ? kc : fc,
				i = d ? Eb : Db;
			return g = e(a, b, i, c), h = e(b, a, i, Bb), f
		}

		function f(a) {
			return g(a)
		}
		var g, h;
		return f.invert = function(a) {
			return h(a)
		}, f.domain = function(b) {
			return arguments.length ? (a = b.map(Number), e()) : a
		}, f.range = function(a) {
			return arguments.length ? (b = a, e()) : b
		}, f.rangeRound = function(a) {
			return f.range(a).interpolate(Cb)
		}, f.clamp = function(a) {
			return arguments.length ? (d = a, e()) : d
		}, f.interpolate = function(a) {
			return arguments.length ? (c = a, e()) : c
		}, f.ticks = function(b) {
			return oc(a, b)
		}, f.tickFormat = function(b, c) {
			return pc(a, b, c)
		}, f.nice = function(b) {
			return mc(a, b), e()
		}, f.copy = function() {
			return lc(a, b, c, d)
		}, e()
	}

	function mc(a, b) {
		return gc(a, hc(nc(a, b)[2]))
	}

	function nc(a, b) {
		null == b && (b = 10);
		var c = cb(a),
			d = c[1] - c[0],
			e = Math.pow(10, Math.floor(Math.log(d / b) / Math.LN10)),
			f = b / d * e;
		return .15 >= f ? e *= 10 : .35 >= f ? e *= 5 : .75 >= f && (e *= 2), c[0] = Math.ceil(c[0] / e) * e, c[1] = Math.floor(c[1] / e) * e + .5 * e, c[2] = e, c
	}

	function oc(a, b) {
		return Kc.range.apply(Kc, nc(a, b))
	}

	function pc(a, b, c) {
		var d = nc(a, b);
		if (c) {
			var e = le.exec(c);
			if (e.shift(), "s" === e[8]) {
				var f = Kc.formatPrefix(Math.max(td(d[0]), td(d[1])));
				return e[7] || (e[7] = "." + qc(f.scale(d[2]))), e[8] = "f", c = Kc.format(e.join("")),
					function(a) {
						return c(f.scale(a)) + f.symbol
					}
			}
			e[7] || (e[7] = "." + rc(e[8], d)), c = e.join("")
		} else c = ",." + qc(d[2]) + "f";
		return Kc.format(c)
	}

	function qc(a) {
		return -Math.floor(Math.log(a) / Math.LN10 + .01)
	}

	function rc(a, b) {
		var c = qc(b[2]);
		return a in we ? Math.abs(c - qc(Math.max(td(b[0]), td(b[1])))) + +("e" !== a) : c - 2 * ("%" === a)
	}

	function sc(a) {
		return function() {
			var b, c;
			(b = this[a]) && (c = b[b.active]) && (--b.count ? delete b[b.active] : delete this[a], b.active += .5, c.event && c.event.interrupt.call(this, this.__data__, c.index))
		}
	}

	function tc(a, b, c) {
		return Sc(a, Ae), a.namespace = b, a.id = c, a
	}

	function uc(a) {
		return function(b) {
			return 0 >= b ? 0 : b >= 1 ? 1 : a(b)
		}
	}

	function vc(a) {
		return function(b) {
			return 1 - a(1 - b)
		}
	}

	function wc(a) {
		return function(b) {
			return .5 * (.5 > b ? a(2 * b) : 2 - a(2 - 2 * b))
		}
	}

	function xc(a) {
		return a * a
	}

	function yc(a) {
		return a * a * a
	}

	function zc(a) {
		if (0 >= a) return 0;
		if (a >= 1) return 1;
		var b = a * a,
			c = b * a;
		return 4 * (.5 > a ? c : 3 * (a - b) + c - .75)
	}

	function Ac(a) {
		return function(b) {
			return Math.pow(b, a)
		}
	}

	function Bc(a) {
		return 1 - Math.cos(a * dd)
	}

	function Cc(a) {
		return Math.pow(2, 10 * (a - 1))
	}

	function Dc(a) {
		return 1 - Math.sqrt(1 - a * a)
	}

	function Ec(a, b) {
		var c;
		return arguments.length < 2 && (b = .45), arguments.length ? c = b / cd * Math.asin(1 / a) : (a = 1, c = b / 4),
			function(d) {
				return 1 + a * Math.pow(2, -10 * d) * Math.sin((d - c) * cd / b)
			}
	}

	function Fc(a) {
		return a || (a = 1.70158),
			function(b) {
				return b * b * ((a + 1) * b - a)
			}
	}

	function Gc(a) {
		return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
	}

	function Hc(a, b) {
		for (var c = 0, d = a.length; d > c; c++)
			for (var e, f = a[c], g = 0, h = f.length; h > g; g++)(e = f[g]) && b(e, g, c);
		return a
	}

	function Ic(a) {
		return null == a ? "__transition__" : "__transition_" + a + "__"
	}

	function Jc(a, b, c, d, e) {
		var f = a[c] || (a[c] = {
				active: 0,
				count: 0
			}),
			h = f[d];
		if (!h) {
			var i = e.time;
			h = f[d] = {
				tween: new g,
				time: i,
				delay: e.delay,
				duration: e.duration,
				ease: e.ease,
				index: b
			}, e = null, ++f.count, Kc.timer(function(e) {
				function g(c) {
					if (f.active > d) return k();
					var e = f[f.active];
					e && (--f.count, delete f[f.active], e.event && e.event.interrupt.call(a, a.__data__, e.index)), f.active = d, h.event && h.event.start.call(a, a.__data__, b), h.tween.forEach(function(c, d) {
						(d = d.call(a, a.__data__, b)) && p.push(d)
					}), m = h.ease, l = h.duration, Kc.timer(function() {
						return o.c = j(c || 1) ? _ : j, 1
					}, 0, i)
				}

				function j(c) {
					if (f.active !== d) return 1;
					for (var e = c / l, g = m(e), i = p.length; i > 0;) p[--i].call(a, g);
					return e >= 1 ? (h.event && h.event.end.call(a, a.__data__, b), k()) : void 0
				}

				function k() {
					return --f.count ? delete f[d] : delete a[c], 1
				}
				var l, m, n = h.delay,
					o = rd,
					p = [];
				return o.t = n + i, e >= n ? g(e - n) : void(o.c = g)
			}, 0, i)
		}
	}
	var Kc = {
		version: "3.5.6"
	};
	Kc.behavior = {};
	var Lc = this.document;
	Kc.rebind = function(a, b) {
		for (var c, e = 1, f = arguments.length; ++e < f;) a[c = arguments[e]] = d(a, b, b[c]);
		return a
	};
	var Mc = ["webkit", "ms", "moz", "Moz", "o", "O"];
	Kc.map = function(a, b) {
		var c = new g;
		if (a instanceof g) a.forEach(function(a, b) {
			c.set(a, b)
		});
		else if (Array.isArray(a)) {
			var d, e = -1,
				f = a.length;
			if (1 === arguments.length)
				for (; ++e < f;) c.set(e, a[e]);
			else
				for (; ++e < f;) c.set(b.call(a, d = a[e], e), d)
		} else
			for (var h in a) c.set(h, a[h]);
		return c
	};
	var Nc = "__proto__",
		Oc = "\x00";
	f(g, {
		has: j,
		get: function(a) {
			return this._[h(a)]
		},
		set: function(a, b) {
			return this._[h(a)] = b
		},
		remove: k,
		keys: l,
		values: function() {
			var a = [];
			for (var b in this._) a.push(this._[b]);
			return a
		},
		entries: function() {
			var a = [];
			for (var b in this._) a.push({
				key: i(b),
				value: this._[b]
			});
			return a
		},
		size: m,
		empty: n,
		forEach: function(a) {
			for (var b in this._) a.call(this, i(b), this._[b])
		}
	});
	var Pc = [].slice,
		Qc = function(a) {
			return Pc.call(a)
		};
	Kc.dispatch = function() {
		for (var a = new p, b = -1, c = arguments.length; ++b < c;) a[arguments[b]] = q(a);
		return a
	}, p.prototype.on = function(a, b) {
		var c = a.indexOf("."),
			d = "";
		if (c >= 0 && (d = a.slice(c + 1), a = a.slice(0, c)), a) return arguments.length < 2 ? this[a].on(d) : this[a].on(d, b);
		if (2 === arguments.length) {
			if (null == b)
				for (a in this) this.hasOwnProperty(a) && this[a].on(d, null);
			return this
		}
	}, Kc.event = null, Kc.requote = function(a) {
		return a.replace(Rc, "\\$&")
	};
	var Rc = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
		Sc = {}.__proto__ ? function(a, b) {
			a.__proto__ = b
		} : function(a, b) {
			for (var c in b) a[c] = b[c]
		},
		Tc = function(a, b) {
			return b.querySelector(a)
		},
		Uc = function(a, b) {
			return b.querySelectorAll(a)
		},
		Vc = function(a, b) {
			var c = a.matches || a[e(a, "matchesSelector")];
			return (Vc = function(a, b) {
				return c.call(a, b)
			})(a, b)
		};
	"function" == typeof Sizzle && (Tc = function(a, b) {
		return Sizzle(a, b)[0] || null
	}, Uc = Sizzle, Vc = Sizzle.matchesSelector), Kc.selection = function() {
		return Kc.select(Lc.documentElement)
	};
	var Wc = Kc.selection.prototype = [];
	Wc.select = function(a) {
		var b, c, d, e, f = [];
		a = v(a);
		for (var g = -1, h = this.length; ++g < h;) {
			f.push(b = []), b.parentNode = (d = this[g]).parentNode;
			for (var i = -1, j = d.length; ++i < j;)(e = d[i]) ? (b.push(c = a.call(e, e.__data__, i, g)), c && "__data__" in e && (c.__data__ = e.__data__)) : b.push(null)
		}
		return u(f)
	}, Wc.call = function(a) {
		var b = Qc(arguments);
		return a.apply(b[0] = this, b), this
	}, Kc.select = function(b) {
		var c;
		return "string" == typeof b ? (c = [Tc(b, Lc)], c.parentNode = Lc.documentElement) : (c = [b], c.parentNode = a(b)), u([c])
	}, Kc.selectAll = function(a) {
		var b;
		return "string" == typeof a ? (b = Qc(Uc(a, Lc)), b.parentNode = Lc.documentElement) : (b = a, b.parentNode = null), u([b])
	}, Wc.on = function(a, b, c) {
		var d = arguments.length;
		if (3 > d) {
			if ("string" != typeof a) {
				2 > d && (b = !1);
				for (c in a) this.each(w(c, a[c], b));
				return this
			}
			if (2 > d) return (d = this.node()["__on" + a]) && d._;
			c = !1
		}
		return this.each(w(a, b, c))
	};
	var Xc = Kc.map({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	});
	Lc && Xc.forEach(function(a) {
		"on" + a in Lc && Xc.remove(a)
	});
	var Yc, Zc = 0;
	Kc.mouse = function(a) {
		return A(a, s())
	};
	var $c = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
	Kc.touch = function(a, b, c) {
		if (arguments.length < 3 && (c = b, b = s().changedTouches), b)
			for (var d, e = 0, f = b.length; f > e; ++e)
				if ((d = b[e]).identifier === c) return A(a, d)
	}, Kc.behavior.drag = function() {
		function a() {
			this.on("mousedown.drag", g).on("touchstart.drag", h)
		}

		function d(a, b, c, d, g) {
			return function() {
				function h() {
					var a, c, d = b(m, p);
					d && (a = d[0] - t[0], c = d[1] - t[1], o |= a | c, t = d, n({
						type: "drag",
						x: d[0] + j[0],
						y: d[1] + j[1],
						dx: a,
						dy: c
					}))
				}

				function i() {
					b(m, p) && (r.on(d + q, null).on(g + q, null), s(o && Kc.event.target === l), n({
						type: "dragend"
					}))
				}
				var j, k = this,
					l = Kc.event.target,
					m = k.parentNode,
					n = e.of(k, arguments),
					o = 0,
					p = a(),
					q = ".drag" + (null == p ? "" : "-" + p),
					r = Kc.select(c(l)).on(d + q, h).on(g + q, i),
					s = z(l),
					t = b(m, p);
				f ? (j = f.apply(k, arguments), j = [j.x - t[0], j.y - t[1]]) : j = [0, 0], n({
					type: "dragstart"
				})
			}
		}
		var e = t(a, "drag", "dragstart", "dragend"),
			f = null,
			g = d(o, Kc.mouse, b, "mousemove", "mouseup"),
			h = d(B, Kc.touch, c, "touchmove", "touchend");
		return a.origin = function(b) {
			return arguments.length ? (f = b, a) : f
		}, Kc.rebind(a, e, "on")
	}, Kc.touches = function(a, b) {
		return arguments.length < 2 && (b = s().touches), b ? Qc(b).map(function(b) {
			var c = A(a, b);
			return c.identifier = b.identifier, c
		}) : []
	};
	var _c = 1e-6,
		ad = _c * _c,
		bd = Math.PI,
		cd = 2 * bd,
		dd = bd / 2,
		ed = bd / 180,
		fd = 180 / bd,
		gd = Math.SQRT2,
		hd = 2,
		id = 4;
	Kc.interpolateZoom = function(a, b) {
		function c(a) {
			var b = a * s;
			if (r) {
				var c = G(p),
					g = f / (hd * m) * (c * H(gd * b + p) - F(p));
				return [d + g * j, e + g * k, f * c / G(gd * b + p)]
			}
			return [d + a * j, e + a * k, f * Math.exp(gd * b)]
		}
		var d = a[0],
			e = a[1],
			f = a[2],
			g = b[0],
			h = b[1],
			i = b[2],
			j = g - d,
			k = h - e,
			l = j * j + k * k,
			m = Math.sqrt(l),
			n = (i * i - f * f + id * l) / (2 * f * hd * m),
			o = (i * i - f * f - id * l) / (2 * i * hd * m),
			p = Math.log(Math.sqrt(n * n + 1) - n),
			q = Math.log(Math.sqrt(o * o + 1) - o),
			r = q - p,
			s = (r || Math.log(i / f)) / gd;
		return c.duration = 1e3 * s, c
	}, Kc.behavior.zoom = function() {
		function a(a) {
			a.on(G, l).on(kd + ".zoom", n).on("dblclick.zoom", o).on(J, m)
		}

		function c(a) {
			return [(a[0] - B.x) / B.k, (a[1] - B.y) / B.k]
		}

		function d(a) {
			return [a[0] * B.k + B.x, a[1] * B.k + B.y]
		}

		function e(a) {
			B.k = Math.max(D[0], Math.min(D[1], a))
		}

		function f(a, b) {
			b = d(b), B.x += a[0] - b[0], B.y += a[1] - b[1]
		}

		function g(b, c, d, g) {
			b.__chart__ = {
				x: B.x,
				y: B.y,
				k: B.k
			}, e(Math.pow(2, g)), f(q = c, d), b = Kc.select(b), E > 0 && (b = b.transition().duration(E)), b.call(a.event)
		}

		function h() {
			x && x.domain(w.range().map(function(a) {
				return (a - B.x) / B.k
			}).map(w.invert)), A && A.domain(y.range().map(function(a) {
				return (a - B.y) / B.k
			}).map(y.invert))
		}

		function i(a) {
			F++ || a({
				type: "zoomstart"
			})
		}

		function j(a) {
			h(), a({
				type: "zoom",
				scale: B.k,
				translate: [B.x, B.y]
			})
		}

		function k(a) {
			--F || (a({
				type: "zoomend"
			}), q = null)
		}

		function l() {
			function a() {
				l = 1, f(Kc.mouse(e), n), j(h)
			}

			function d() {
				m.on(H, null).on(I, null), o(l && Kc.event.target === g), k(h)
			}
			var e = this,
				g = Kc.event.target,
				h = K.of(e, arguments),
				l = 0,
				m = Kc.select(b(e)).on(H, a).on(I, d),
				n = c(Kc.mouse(e)),
				o = z(e);
			ze.call(e), i(h)
		}

		function m() {
			function a() {
				var a = Kc.touches(o);
				return n = B.k, a.forEach(function(a) {
					a.identifier in q && (q[a.identifier] = c(a))
				}), a
			}

			function b() {
				var b = Kc.event.target;
				Kc.select(b).on(u, d).on(w, h), x.push(b);
				for (var c = Kc.event.changedTouches, e = 0, f = c.length; f > e; ++e) q[c[e].identifier] = null;
				var i = a(),
					j = Date.now();
				if (1 === i.length) {
					if (500 > j - v) {
						var k = i[0];
						g(o, k, q[k.identifier], Math.floor(Math.log(B.k) / Math.LN2) + 1), r()
					}
					v = j
				} else if (i.length > 1) {
					var k = i[0],
						l = i[1],
						m = k[0] - l[0],
						n = k[1] - l[1];
					s = m * m + n * n
				}
			}

			function d() {
				var a, b, c, d, g = Kc.touches(o);
				ze.call(o);
				for (var h = 0, i = g.length; i > h; ++h, d = null)
					if (c = g[h], d = q[c.identifier]) {
						if (b) break;
						a = c, b = d
					}
				if (d) {
					var k = (k = c[0] - a[0]) * k + (k = c[1] - a[1]) * k,
						l = s && Math.sqrt(k / s);
					a = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2], b = [(b[0] + d[0]) / 2, (b[1] + d[1]) / 2], e(l * n)
				}
				v = null, f(a, b), j(p)
			}

			function h() {
				if (Kc.event.touches.length) {
					for (var b = Kc.event.changedTouches, c = 0, d = b.length; d > c; ++c) delete q[b[c].identifier];
					for (var e in q) return void a()
				}
				Kc.selectAll(x).on(t, null), y.on(G, l).on(J, m), A(), k(p)
			}
			var n, o = this,
				p = K.of(o, arguments),
				q = {},
				s = 0,
				t = ".zoom-" + Kc.event.changedTouches[0].identifier,
				u = "touchmove" + t,
				w = "touchend" + t,
				x = [],
				y = Kc.select(o),
				A = z(o);
			b(), i(p), y.on(G, null).on(J, b)
		}

		function n() {
			var a = K.of(this, arguments);
			u ? clearTimeout(u) : (ze.call(this), p = c(q = s || Kc.mouse(this)), i(a)), u = setTimeout(function() {
				u = null, k(a)
			}, 50), r(), e(Math.pow(2, .002 * jd()) * B.k), f(q, p), j(a)
		}

		function o() {
			var a = Kc.mouse(this),
				b = Math.log(B.k) / Math.LN2;
			g(this, a, c(a), Kc.event.shiftKey ? Math.ceil(b) - 1 : Math.floor(b) + 1)
		}
		var p, q, s, u, v, w, x, y, A, B = {
				x: 0,
				y: 0,
				k: 1
			},
			C = [960, 500],
			D = ld,
			E = 250,
			F = 0,
			G = "mousedown.zoom",
			H = "mousemove.zoom",
			I = "mouseup.zoom",
			J = "touchstart.zoom",
			K = t(a, "zoomstart", "zoom", "zoomend");
		return kd || (kd = "onwheel" in Lc ? (jd = function() {
			return -Kc.event.deltaY * (Kc.event.deltaMode ? 120 : 1)
		}, "wheel") : "onmousewheel" in Lc ? (jd = function() {
			return Kc.event.wheelDelta
		}, "mousewheel") : (jd = function() {
			return -Kc.event.detail
		}, "MozMousePixelScroll")), a.event = function(a) {
			a.each(function() {
				var a = K.of(this, arguments),
					b = B;
				xe ? Kc.select(this).transition().each("start.zoom", function() {
					B = this.__chart__ || {
						x: 0,
						y: 0,
						k: 1
					}, i(a)
				}).tween("zoom:zoom", function() {
					var c = C[0],
						d = C[1],
						e = q ? q[0] : c / 2,
						f = q ? q[1] : d / 2,
						g = Kc.interpolateZoom([(e - B.x) / B.k, (f - B.y) / B.k, c / B.k], [(e - b.x) / b.k, (f - b.y) / b.k, c / b.k]);
					return function(b) {
						var d = g(b),
							h = c / d[2];
						this.__chart__ = B = {
							x: e - d[0] * h,
							y: f - d[1] * h,
							k: h
						}, j(a)
					}
				}).each("interrupt.zoom", function() {
					k(a)
				}).each("end.zoom", function() {
					k(a)
				}) : (this.__chart__ = B, i(a), j(a), k(a))
			})
		}, a.translate = function(b) {
			return arguments.length ? (B = {
				x: +b[0],
				y: +b[1],
				k: B.k
			}, h(), a) : [B.x, B.y]
		}, a.scale = function(b) {
			return arguments.length ? (B = {
				x: B.x,
				y: B.y,
				k: +b
			}, h(), a) : B.k
		}, a.scaleExtent = function(b) {
			return arguments.length ? (D = null == b ? ld : [+b[0], +b[1]], a) : D
		}, a.center = function(b) {
			return arguments.length ? (s = b && [+b[0], +b[1]], a) : s
		}, a.size = function(b) {
			return arguments.length ? (C = b && [+b[0], +b[1]], a) : C
		}, a.duration = function(b) {
			return arguments.length ? (E = +b, a) : E
		}, a.x = function(b) {
			return arguments.length ? (x = b, w = b.copy(), B = {
				x: 0,
				y: 0,
				k: 1
			}, a) : x
		}, a.y = function(b) {
			return arguments.length ? (A = b, y = b.copy(), B = {
				x: 0,
				y: 0,
				k: 1
			}, a) : A
		}, Kc.rebind(a, K, "on")
	};
	var jd, kd, ld = [0, 1 / 0];
	Kc.functor = I;
	var md = {
		svg: "http://www.w3.org/2000/svg",
		xhtml: "http://www.w3.org/1999/xhtml",
		xlink: "http://www.w3.org/1999/xlink",
		xml: "http://www.w3.org/XML/1998/namespace",
		xmlns: "http://www.w3.org/2000/xmlns/"
	};
	Kc.ns = {
		prefix: md,
		qualify: function(a) {
			var b = a.indexOf(":"),
				c = a;
			return b >= 0 && (c = a.slice(0, b), a = a.slice(b + 1)), md.hasOwnProperty(c) ? {
				space: md[c],
				local: a
			} : a
		}
	};
	var nd, od, pd, qd, rd, sd = this[e(this, "requestAnimationFrame")] || function(a) {
		setTimeout(a, 17)
	};
	Kc.timer = function(a, b, c) {
		var d = arguments.length;
		2 > d && (b = 0), 3 > d && (c = Date.now());
		var e = c + b,
			f = {
				c: a,
				t: e,
				f: !1,
				n: null
			};
		od ? od.n = f : nd = f, od = f, pd || (qd = clearTimeout(qd), pd = 1, sd(J))
	}, Kc.timer.flush = function() {
		K(), L()
	}, Kc.geo = {};
	var td = Math.abs;
	Kc.geo.stream = function(a, b) {
		a && ud.hasOwnProperty(a.type) ? ud[a.type](a, b) : M(a, b)
	};
	var ud = {
			Feature: function(a, b) {
				M(a.geometry, b)
			},
			FeatureCollection: function(a, b) {
				for (var c = a.features, d = -1, e = c.length; ++d < e;) M(c[d].geometry, b)
			}
		},
		vd = {
			Sphere: function(a, b) {
				b.sphere()
			},
			Point: function(a, b) {
				a = a.coordinates, b.point(a[0], a[1], a[2])
			},
			MultiPoint: function(a, b) {
				for (var c = a.coordinates, d = -1, e = c.length; ++d < e;) a = c[d], b.point(a[0], a[1], a[2])
			},
			LineString: function(a, b) {
				N(a.coordinates, b, 0)
			},
			MultiLineString: function(a, b) {
				for (var c = a.coordinates, d = -1, e = c.length; ++d < e;) N(c[d], b, 0)
			},
			Polygon: function(a, b) {
				O(a.coordinates, b)
			},
			MultiPolygon: function(a, b) {
				for (var c = a.coordinates, d = -1, e = c.length; ++d < e;) O(c[d], b)
			},
			GeometryCollection: function(a, b) {
				for (var c = a.geometries, d = -1, e = c.length; ++d < e;) M(c[d], b)
			}
		};
	P.prototype = {
		s: 0,
		t: 0,
		add: function(a) {
			Q(a, this.t, wd), Q(wd.s, this.s, this), this.s ? this.t += wd.t : this.s = wd.t
		},
		reset: function() {
			this.s = this.t = 0
		},
		valueOf: function() {
			return this.s
		}
	};
	var wd = new P;
	Kc.geo.area = function(a) {
		return xd = 0, Kc.geo.stream(a, zd), xd
	};
	var xd, yd = new P,
		zd = {
			sphere: function() {
				xd += 4 * bd
			},
			point: o,
			lineStart: o,
			lineEnd: o,
			polygonStart: function() {
				yd.reset(), zd.lineStart = R
			},
			polygonEnd: function() {
				var a = 2 * yd;
				xd += 0 > a ? 4 * bd + a : a, zd.lineStart = zd.lineEnd = zd.point = o
			}
		};
	Kc.geo.bounds = function() {
		function a(a, b) {
			t.push(u = [k = a, m = a]), l > b && (l = b), b > n && (n = b)
		}

		function b(b, c) {
			var d = S([b * ed, c * ed]);
			if (r) {
				var e = U(r, d),
					f = [e[1], -e[0], 0],
					g = U(f, e);
				X(g), g = Y(g);
				var i = b - o,
					j = i > 0 ? 1 : -1,
					p = g[0] * fd * j,
					q = td(i) > 180;
				if (q ^ (p > j * o && j * b > p)) {
					var s = g[1] * fd;
					s > n && (n = s)
				} else if (p = (p + 360) % 360 - 180, q ^ (p > j * o && j * b > p)) {
					var s = -g[1] * fd;
					l > s && (l = s)
				} else l > c && (l = c), c > n && (n = c);
				q ? o > b ? h(k, b) > h(k, m) && (m = b) : h(b, m) > h(k, m) && (k = b) : m >= k ? (k > b && (k = b), b > m && (m = b)) : b > o ? h(k, b) > h(k, m) && (m = b) : h(b, m) > h(k, m) && (k = b)
			} else a(b, c);
			r = d, o = b
		}

		function c() {
			v.point = b
		}

		function d() {
			u[0] = k, u[1] = m, v.point = a, r = null
		}

		function e(a, c) {
			if (r) {
				var d = a - o;
				s += td(d) > 180 ? d + (d > 0 ? 360 : -360) : d
			} else p = a, q = c;
			zd.point(a, c), b(a, c)
		}

		function f() {
			zd.lineStart()
		}

		function g() {
			e(p, q), zd.lineEnd(), td(s) > _c && (k = -(m = 180)), u[0] = k, u[1] = m, r = null
		}

		function h(a, b) {
			return (b -= a) < 0 ? b + 360 : b
		}

		function i(a, b) {
			return a[0] - b[0]
		}

		function j(a, b) {
			return b[0] <= b[1] ? b[0] <= a && a <= b[1] : a < b[0] || b[1] < a
		}
		var k, l, m, n, o, p, q, r, s, t, u, v = {
			point: a,
			lineStart: c,
			lineEnd: d,
			polygonStart: function() {
				v.point = e, v.lineStart = f, v.lineEnd = g, s = 0, zd.polygonStart()
			},
			polygonEnd: function() {
				zd.polygonEnd(), v.point = a, v.lineStart = c, v.lineEnd = d, 0 > yd ? (k = -(m = 180), l = -(n = 90)) : s > _c ? n = 90 : -_c > s && (l = -90), u[0] = k, u[1] = m
			}
		};
		return function(a) {
			n = m = -(k = l = 1 / 0), t = [], Kc.geo.stream(a, v);
			var b = t.length;
			if (b) {
				t.sort(i);
				for (var c, d = 1, e = t[0], f = [e]; b > d; ++d) c = t[d], j(c[0], e) || j(c[1], e) ? (h(e[0], c[1]) > h(e[0], e[1]) && (e[1] = c[1]), h(c[0], e[1]) > h(e[0], e[1]) && (e[0] = c[0])) : f.push(e = c);
				for (var g, c, o = -(1 / 0), b = f.length - 1, d = 0, e = f[b]; b >= d; e = c, ++d) c = f[d], (g = h(e[1], c[0])) > o && (o = g, k = c[0], m = e[1])
			}
			return t = u = null, k === 1 / 0 || l === 1 / 0 ? [
				[NaN, NaN],
				[NaN, NaN]
			] : [
				[k, l],
				[m, n]
			]
		}
	}(), Kc.merge = function(a) {
		for (var b, c, d, e = a.length, f = -1, g = 0; ++f < e;) g += a[f].length;
		for (c = new Array(g); --e >= 0;)
			for (d = a[e], b = d.length; --b >= 0;) c[--g] = d[b];
		return c
	};
	var Ad = da(_, ha, ja, [-bd, -bd / 2]),
		Bd = 1e9;
	Kc.geo.clipExtent = function() {
		var a, b, c, d, e, f, g = {
			stream: function(a) {
				return e && (e.valid = !1), e = f(a), e.valid = !0, e
			},
			extent: function(h) {
				return arguments.length ? (f = na(a = +h[0][0], b = +h[0][1], c = +h[1][0], d = +h[1][1]), e && (e.valid = !1, e = null), g) : [
					[a, b],
					[c, d]
				]
			}
		};
		return g.extent([
			[0, 0],
			[960, 500]
		])
	}, (Kc.geo.conicEqualArea = function() {
		return oa(pa)
	}).raw = pa, Kc.geo.albers = function() {
		return Kc.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
	}, Kc.geo.albersUsa = function() {
		function a(a) {
			var f = a[0],
				g = a[1];
			return b = null, c(f, g), b || (d(f, g), b) || e(f, g), b
		}
		var b, c, d, e, f = Kc.geo.albers(),
			g = Kc.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
			h = Kc.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
			i = {
				point: function(a, c) {
					b = [a, c]
				}
			};
		return a.invert = function(a) {
			var b = f.scale(),
				c = f.translate(),
				d = (a[0] - c[0]) / b,
				e = (a[1] - c[1]) / b;
			return (e >= .12 && .234 > e && d >= -.425 && -.214 > d ? g : e >= .166 && .234 > e && d >= -.214 && -.115 > d ? h : f).invert(a)
		}, a.stream = function(a) {
			var b = f.stream(a),
				c = g.stream(a),
				d = h.stream(a);
			return {
				point: function(a, e) {
					b.point(a, e), c.point(a, e), d.point(a, e)
				},
				sphere: function() {
					b.sphere(), c.sphere(), d.sphere()
				},
				lineStart: function() {
					b.lineStart(), c.lineStart(), d.lineStart()
				},
				lineEnd: function() {
					b.lineEnd(), c.lineEnd(), d.lineEnd()
				},
				polygonStart: function() {
					b.polygonStart(), c.polygonStart(), d.polygonStart()
				},
				polygonEnd: function() {
					b.polygonEnd(), c.polygonEnd(), d.polygonEnd()
				}
			}
		}, a.precision = function(b) {
			return arguments.length ? (f.precision(b), g.precision(b), h.precision(b), a) : f.precision()
		}, a.scale = function(b) {
			return arguments.length ? (f.scale(b), g.scale(.35 * b), h.scale(b), a.translate(f.translate())) : f.scale()
		}, a.translate = function(b) {
			if (!arguments.length) return f.translate();
			var j = f.scale(),
				k = +b[0],
				l = +b[1];
			return c = f.translate(b).clipExtent([
				[k - .455 * j, l - .238 * j],
				[k + .455 * j, l + .238 * j]
			]).stream(i).point, d = g.translate([k - .307 * j, l + .201 * j]).clipExtent([
				[k - .425 * j + _c, l + .12 * j + _c],
				[k - .214 * j - _c, l + .234 * j - _c]
			]).stream(i).point, e = h.translate([k - .205 * j, l + .212 * j]).clipExtent([
				[k - .214 * j + _c, l + .166 * j + _c],
				[k - .115 * j - _c, l + .234 * j - _c]
			]).stream(i).point, a
		}, a.scale(1070)
	}, Kc.geo.centroid = function(a) {
		Cd = Dd = Ed = Fd = Gd = Hd = Id = Jd = Kd = Ld = Md = 0, Kc.geo.stream(a, Td);
		var b = Kd,
			c = Ld,
			d = Md,
			e = b * b + c * c + d * d;
		return ad > e && (b = Hd, c = Id, d = Jd, _c > Dd && (b = Ed, c = Fd, d = Gd), e = b * b + c * c + d * d, ad > e) ? [NaN, NaN] : [Math.atan2(c, b) * fd, E(d / Math.sqrt(e)) * fd]
	};
	var Cd, Dd, Ed, Fd, Gd, Hd, Id, Jd, Kd, Ld, Md, Nd, Od, Pd, Qd, Rd, Sd, Td = {
			sphere: o,
			point: qa,
			lineStart: sa,
			lineEnd: ta,
			polygonStart: function() {
				Td.lineStart = ua
			},
			polygonEnd: function() {
				Td.lineStart = sa
			}
		},
		Ud = {
			point: o,
			lineStart: o,
			lineEnd: o,
			polygonStart: function() {
				Od = 0, Ud.lineStart = va
			},
			polygonEnd: function() {
				Ud.lineStart = Ud.lineEnd = Ud.point = o, Nd += td(Od / 2)
			}
		},
		Vd = {
			point: wa,
			lineStart: o,
			lineEnd: o,
			polygonStart: o,
			polygonEnd: o
		},
		Wd = {
			point: za,
			lineStart: Aa,
			lineEnd: Ba,
			polygonStart: function() {
				Wd.lineStart = Ca
			},
			polygonEnd: function() {
				Wd.point = za, Wd.lineStart = Aa, Wd.lineEnd = Ba
			}
		};
	Kc.geo.path = function() {
		function a(a) {
			return a && ("function" == typeof i && g.pointRadius(+i.apply(this, arguments)), h && h.valid || (h = f(g)), Kc.geo.stream(a, h)), g.result()
		}

		function b() {
			return h = null, a
		}
		var d, e, f, g, h, i = 4.5;
		return a.area = function(a) {
			return Nd = 0, Kc.geo.stream(a, f(Ud)), Nd
		}, a.centroid = function(a) {
			return Ed = Fd = Gd = Hd = Id = Jd = Kd = Ld = Md = 0, Kc.geo.stream(a, f(Wd)), Md ? [Kd / Md, Ld / Md] : Jd ? [Hd / Jd, Id / Jd] : Gd ? [Ed / Gd, Fd / Gd] : [NaN, NaN]
		}, a.bounds = function(a) {
			return Rd = Sd = -(Pd = Qd = 1 / 0), Kc.geo.stream(a, f(Vd)), [
				[Pd, Qd],
				[Rd, Sd]
			]
		}, a.projection = function(a) {
			return arguments.length ? (f = (d = a) ? a.stream || Fa(a) : c, b()) : d
		}, a.context = function(a) {
			return arguments.length ? (g = null == (e = a) ? new xa : new Da(a), "function" != typeof i && g.pointRadius(i), b()) : e
		}, a.pointRadius = function(b) {
			return arguments.length ? (i = "function" == typeof b ? b : (g.pointRadius(+b), +b), a) : i
		}, a.projection(Kc.geo.albersUsa()).context(null)
	}, Kc.geo.transform = function(a) {
		return {
			stream: function(b) {
				var c = new Ga(b);
				for (var d in a) c[d] = a[d];
				return c
			}
		}
	}, Ga.prototype = {
		point: function(a, b) {
			this.stream.point(a, b)
		},
		sphere: function() {
			this.stream.sphere()
		},
		lineStart: function() {
			this.stream.lineStart()
		},
		lineEnd: function() {
			this.stream.lineEnd()
		},
		polygonStart: function() {
			this.stream.polygonStart()
		},
		polygonEnd: function() {
			this.stream.polygonEnd()
		}
	}, Kc.geo.projection = Ia, Kc.geo.projectionMutator = Ja, (Kc.geo.equirectangular = function() {
		return Ia(La)
	}).raw = La.invert = La, Kc.geo.rotation = function(a) {
		function b(b) {
			return b = a(b[0] * ed, b[1] * ed), b[0] *= fd, b[1] *= fd, b
		}
		return a = Na(a[0] % 360 * ed, a[1] * ed, a.length > 2 ? a[2] * ed : 0), b.invert = function(b) {
			return b = a.invert(b[0] * ed, b[1] * ed), b[0] *= fd, b[1] *= fd, b
		}, b
	}, Ma.invert = La, Kc.geo.circle = function() {
		function a() {
			var a = "function" == typeof d ? d.apply(this, arguments) : d,
				b = Na(-a[0] * ed, -a[1] * ed, 0).invert,
				e = [];
			return c(null, null, 1, {
				point: function(a, c) {
					e.push(a = b(a, c)), a[0] *= fd, a[1] *= fd
				}
			}), {
				type: "Polygon",
				coordinates: [e]
			}
		}
		var b, c, d = [0, 0],
			e = 6;
		return a.origin = function(b) {
			return arguments.length ? (d = b, a) : d
		}, a.angle = function(d) {
			return arguments.length ? (c = Ra((b = +d) * ed, e * ed), a) : b
		}, a.precision = function(d) {
			return arguments.length ? (c = Ra(b * ed, (e = +d) * ed), a) : e
		}, a.angle(90)
	}, Kc.geo.distance = function(a, b) {
		var c, d = (b[0] - a[0]) * ed,
			e = a[1] * ed,
			f = b[1] * ed,
			g = Math.sin(d),
			h = Math.cos(d),
			i = Math.sin(e),
			j = Math.cos(e),
			k = Math.sin(f),
			l = Math.cos(f);
		return Math.atan2(Math.sqrt((c = l * g) * c + (c = j * k - i * l * h) * c), i * k + j * l * h)
	}, Kc.range = function(a, b, c) {
		if (arguments.length < 3 && (c = 1, arguments.length < 2 && (b = a, a = 0)), (b - a) / c === 1 / 0) throw new Error("infinite range");
		var d, e = [],
			f = Ta(td(c)),
			g = -1;
		if (a *= f, b *= f, c *= f, 0 > c)
			for (;
				(d = a + c * ++g) > b;) e.push(d / f);
		else
			for (;
				(d = a + c * ++g) < b;) e.push(d / f);
		return e
	}, Kc.geo.graticule = function() {
		function a() {
			return {
				type: "MultiLineString",
				coordinates: b()
			}
		}

		function b() {
			return Kc.range(Math.ceil(f / q) * q, e, q).map(m).concat(Kc.range(Math.ceil(j / r) * r, i, r).map(n)).concat(Kc.range(Math.ceil(d / o) * o, c, o).filter(function(a) {
				return td(a % q) > _c
			}).map(k)).concat(Kc.range(Math.ceil(h / p) * p, g, p).filter(function(a) {
				return td(a % r) > _c
			}).map(l))
		}
		var c, d, e, f, g, h, i, j, k, l, m, n, o = 10,
			p = o,
			q = 90,
			r = 360,
			s = 2.5;
		return a.lines = function() {
			return b().map(function(a) {
				return {
					type: "LineString",
					coordinates: a
				}
			})
		}, a.outline = function() {
			return {
				type: "Polygon",
				coordinates: [m(f).concat(n(i).slice(1), m(e).reverse().slice(1), n(j).reverse().slice(1))]
			}
		}, a.extent = function(b) {
			return arguments.length ? a.majorExtent(b).minorExtent(b) : a.minorExtent()
		}, a.majorExtent = function(b) {
			return arguments.length ? (f = +b[0][0], e = +b[1][0], j = +b[0][1], i = +b[1][1], f > e && (b = f, f = e, e = b), j > i && (b = j, j = i, i = b), a.precision(s)) : [
				[f, j],
				[e, i]
			]
		}, a.minorExtent = function(b) {
			return arguments.length ? (d = +b[0][0], c = +b[1][0], h = +b[0][1], g = +b[1][1], d > c && (b = d, d = c, c = b), h > g && (b = h, h = g, g = b), a.precision(s)) : [
				[d, h],
				[c, g]
			]
		}, a.step = function(b) {
			return arguments.length ? a.majorStep(b).minorStep(b) : a.minorStep()
		}, a.majorStep = function(b) {
			return arguments.length ? (q = +b[0], r = +b[1], a) : [q, r]
		}, a.minorStep = function(b) {
			return arguments.length ? (o = +b[0], p = +b[1], a) : [o, p]
		}, a.precision = function(b) {
			return arguments.length ? (s = +b, k = Ua(h, g, 90), l = Va(d, c, s), m = Ua(j, i, 90), n = Va(f, e, s), a) : s
		}, a.majorExtent([
			[-180, -90 + _c],
			[180, 90 - _c]
		]).minorExtent([
			[-180, -80 - _c],
			[180, 80 + _c]
		])
	}, Kc.geo.greatArc = function() {
		function a() {
			return {
				type: "LineString",
				coordinates: [b || d.apply(this, arguments), c || e.apply(this, arguments)]
			}
		}
		var b, c, d = Wa,
			e = Xa;
		return a.distance = function() {
			return Kc.geo.distance(b || d.apply(this, arguments), c || e.apply(this, arguments))
		}, a.source = function(c) {
			return arguments.length ? (d = c, b = "function" == typeof c ? null : c, a) : d
		}, a.target = function(b) {
			return arguments.length ? (e = b, c = "function" == typeof b ? null : b, a) : e
		}, a.precision = function() {
			return arguments.length ? a : 0
		}, a
	}, Kc.geo.length = function(a) {
		return Xd = 0, Kc.geo.stream(a, Yd), Xd
	};
	var Xd, Yd = {
			sphere: o,
			point: o,
			lineStart: Ya,
			lineEnd: o,
			polygonStart: o,
			polygonEnd: o
		},
		Zd = Za(function() {
			return 1
		}, Math.asin);
	(Kc.geo.orthographic = function() {
		return Ia(Zd)
	}).raw = Zd, Kc.random = {
		normal: function(a, b) {
			var c = arguments.length;
			return 2 > c && (b = 1), 1 > c && (a = 0),
				function() {
					var c, d, e;
					do c = 2 * Math.random() - 1, d = 2 * Math.random() - 1, e = c * c + d * d; while (!e || e > 1);
					return a + b * c * Math.sqrt(-2 * Math.log(e) / e)
				}
		},
		logNormal: function() {
			var a = Kc.random.normal.apply(Kc, arguments);
			return function() {
				return Math.exp(a())
			}
		},
		bates: function(a) {
			var b = Kc.random.irwinHall(a);
			return function() {
				return b() / a
			}
		},
		irwinHall: function(a) {
			return function() {
				for (var b = 0, c = 0; a > c; c++) b += Math.random();
				return b
			}
		}
	}, Kc.transform = function(a) {
		var b = Lc.createElementNS(Kc.ns.prefix.svg, "g");
		return (Kc.transform = function(a) {
			if (null != a) {
				b.setAttribute("transform", a);
				var c = b.transform.baseVal.consolidate()
			}
			return new $a(c ? c.matrix : $d)
		})(a)
	}, $a.prototype.toString = function() {
		return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
	};
	var $d = {
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e: 0,
		f: 0
	};
	Kc.scale = {}, Kc.color = db, db.prototype.toString = function() {
		return this.rgb() + ""
	}, Kc.hsl = eb;
	var _d = eb.prototype = new db;
	_d.brighter = function(a) {
		return a = Math.pow(.7, arguments.length ? a : 1), new eb(this.h, this.s, this.l / a)
	}, _d.darker = function(a) {
		return a = Math.pow(.7, arguments.length ? a : 1), new eb(this.h, this.s, a * this.l)
	}, _d.rgb = function() {
		return fb(this.h, this.s, this.l)
	}, Kc.hcl = gb;
	var ae = gb.prototype = new db;
	ae.brighter = function(a) {
		return new gb(this.h, this.c, Math.min(100, this.l + be * (arguments.length ? a : 1)))
	}, ae.darker = function(a) {
		return new gb(this.h, this.c, Math.max(0, this.l - be * (arguments.length ? a : 1)))
	}, ae.rgb = function() {
		return hb(this.h, this.c, this.l).rgb()
	}, Kc.lab = ib;
	var be = 18,
		ce = .95047,
		de = 1,
		ee = 1.08883,
		fe = ib.prototype = new db;
	fe.brighter = function(a) {
		return new ib(Math.min(100, this.l + be * (arguments.length ? a : 1)), this.a, this.b)
	}, fe.darker = function(a) {
		return new ib(Math.max(0, this.l - be * (arguments.length ? a : 1)), this.a, this.b)
	}, fe.rgb = function() {
		return jb(this.l, this.a, this.b)
	}, Kc.rgb = ob;
	var ge = ob.prototype = new db;
	ge.brighter = function(a) {
		a = Math.pow(.7, arguments.length ? a : 1);
		var b = this.r,
			c = this.g,
			d = this.b,
			e = 30;
		return b || c || d ? (b && e > b && (b = e), c && e > c && (c = e), d && e > d && (d = e), new ob(Math.min(255, b / a), Math.min(255, c / a), Math.min(255, d / a))) : new ob(e, e, e)
	}, ge.darker = function(a) {
		return a = Math.pow(.7, arguments.length ? a : 1), new ob(a * this.r, a * this.g, a * this.b)
	}, ge.hsl = function() {
		return sb(this.r, this.g, this.b)
	}, ge.toString = function() {
		return "#" + qb(this.r) + qb(this.g) + qb(this.b)
	};
	var he = Kc.map({
		aliceblue: 15792383,
		antiquewhite: 16444375,
		aqua: 65535,
		aquamarine: 8388564,
		azure: 15794175,
		beige: 16119260,
		bisque: 16770244,
		black: 0,
		blanchedalmond: 16772045,
		blue: 255,
		blueviolet: 9055202,
		brown: 10824234,
		burlywood: 14596231,
		cadetblue: 6266528,
		chartreuse: 8388352,
		chocolate: 13789470,
		coral: 16744272,
		cornflowerblue: 6591981,
		cornsilk: 16775388,
		crimson: 14423100,
		cyan: 65535,
		darkblue: 139,
		darkcyan: 35723,
		darkgoldenrod: 12092939,
		darkgray: 11119017,
		darkgreen: 25600,
		darkgrey: 11119017,
		darkkhaki: 12433259,
		darkmagenta: 9109643,
		darkolivegreen: 5597999,
		darkorange: 16747520,
		darkorchid: 10040012,
		darkred: 9109504,
		darksalmon: 15308410,
		darkseagreen: 9419919,
		darkslateblue: 4734347,
		darkslategray: 3100495,
		darkslategrey: 3100495,
		darkturquoise: 52945,
		darkviolet: 9699539,
		deeppink: 16716947,
		deepskyblue: 49151,
		dimgray: 6908265,
		dimgrey: 6908265,
		dodgerblue: 2003199,
		firebrick: 11674146,
		floralwhite: 16775920,
		forestgreen: 2263842,
		fuchsia: 16711935,
		gainsboro: 14474460,
		ghostwhite: 16316671,
		gold: 16766720,
		goldenrod: 14329120,
		gray: 8421504,
		green: 32768,
		greenyellow: 11403055,
		grey: 8421504,
		honeydew: 15794160,
		hotpink: 16738740,
		indianred: 13458524,
		indigo: 4915330,
		ivory: 16777200,
		khaki: 15787660,
		lavender: 15132410,
		lavenderblush: 16773365,
		lawngreen: 8190976,
		lemonchiffon: 16775885,
		lightblue: 11393254,
		lightcoral: 15761536,
		lightcyan: 14745599,
		lightgoldenrodyellow: 16448210,
		lightgray: 13882323,
		lightgreen: 9498256,
		lightgrey: 13882323,
		lightpink: 16758465,
		lightsalmon: 16752762,
		lightseagreen: 2142890,
		lightskyblue: 8900346,
		lightslategray: 7833753,
		lightslategrey: 7833753,
		lightsteelblue: 11584734,
		lightyellow: 16777184,
		lime: 65280,
		limegreen: 3329330,
		linen: 16445670,
		magenta: 16711935,
		maroon: 8388608,
		mediumaquamarine: 6737322,
		mediumblue: 205,
		mediumorchid: 12211667,
		mediumpurple: 9662683,
		mediumseagreen: 3978097,
		mediumslateblue: 8087790,
		mediumspringgreen: 64154,
		mediumturquoise: 4772300,
		mediumvioletred: 13047173,
		midnightblue: 1644912,
		mintcream: 16121850,
		mistyrose: 16770273,
		moccasin: 16770229,
		navajowhite: 16768685,
		navy: 128,
		oldlace: 16643558,
		olive: 8421376,
		olivedrab: 7048739,
		orange: 16753920,
		orangered: 16729344,
		orchid: 14315734,
		palegoldenrod: 15657130,
		palegreen: 10025880,
		paleturquoise: 11529966,
		palevioletred: 14381203,
		papayawhip: 16773077,
		peachpuff: 16767673,
		peru: 13468991,
		pink: 16761035,
		plum: 14524637,
		powderblue: 11591910,
		purple: 8388736,
		rebeccapurple: 6697881,
		red: 16711680,
		rosybrown: 12357519,
		royalblue: 4286945,
		saddlebrown: 9127187,
		salmon: 16416882,
		sandybrown: 16032864,
		seagreen: 3050327,
		seashell: 16774638,
		sienna: 10506797,
		silver: 12632256,
		skyblue: 8900331,
		slateblue: 6970061,
		slategray: 7372944,
		slategrey: 7372944,
		snow: 16775930,
		springgreen: 65407,
		steelblue: 4620980,
		tan: 13808780,
		teal: 32896,
		thistle: 14204888,
		tomato: 16737095,
		turquoise: 4251856,
		violet: 15631086,
		wheat: 16113331,
		white: 16777215,
		whitesmoke: 16119285,
		yellow: 16776960,
		yellowgreen: 10145074
	});
	he.forEach(function(a, b) {
		he.set(a, pb(b))
	}), Kc.interpolateRgb = wb, Kc.interpolateObject = xb, Kc.interpolateArray = yb, Kc.interpolateNumber = zb, Kc.interpolateString = Ab;
	var ie = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
		je = new RegExp(ie.source, "g");
	Kc.interpolate = Bb, Kc.interpolators = [function(a, b) {
		var c = typeof b;
		return ("string" === c ? he.has(b.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(b) ? wb : Ab : b instanceof db ? wb : Array.isArray(b) ? yb : "object" === c && isNaN(b) ? xb : zb)(a, b)
	}], Kc.interpolateRound = Cb, Kc.round = function(a, b) {
		return b ? Math.round(a * (b = Math.pow(10, b))) / b : Math.round(a)
	};
	var ke = ["y", "z", "a", "f", "p", "n", "碌", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(Gb);
	Kc.formatPrefix = function(a, b) {
		var c = 0;
		return a && (0 > a && (a *= -1), b && (a = Kc.round(a, Fb(a, b))), c = 1 + Math.floor(1e-12 + Math.log(a) / Math.LN10), c = Math.max(-24, Math.min(24, 3 * Math.floor((c - 1) / 3)))), ke[8 + c / 3]
	};
	var le = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
		me = Kc.map({
			b: function(a) {
				return a.toString(2)
			},
			c: function(a) {
				return String.fromCharCode(a)
			},
			o: function(a) {
				return a.toString(8)
			},
			x: function(a) {
				return a.toString(16)
			},
			X: function(a) {
				return a.toString(16).toUpperCase()
			},
			g: function(a, b) {
				return a.toPrecision(b)
			},
			e: function(a, b) {
				return a.toExponential(b)
			},
			f: function(a, b) {
				return a.toFixed(b)
			},
			r: function(a, b) {
				return (a = Kc.round(a, Fb(a, b))).toFixed(Math.max(0, Math.min(20, Fb(a * (1 + 1e-15), b))))
			}
		}),
		ne = Kc.time = {},
		oe = Date;
	Jb.prototype = {
		getDate: function() {
			return this._.getUTCDate()
		},
		getDay: function() {
			return this._.getUTCDay()
		},
		getFullYear: function() {
			return this._.getUTCFullYear()
		},
		getHours: function() {
			return this._.getUTCHours()
		},
		getMilliseconds: function() {
			return this._.getUTCMilliseconds()
		},
		getMinutes: function() {
			return this._.getUTCMinutes()
		},
		getMonth: function() {
			return this._.getUTCMonth()
		},
		getSeconds: function() {
			return this._.getUTCSeconds()
		},
		getTime: function() {
			return this._.getTime()
		},
		getTimezoneOffset: function() {
			return 0
		},
		valueOf: function() {
			return this._.valueOf()
		},
		setDate: function() {
			pe.setUTCDate.apply(this._, arguments)
		},
		setDay: function() {
			pe.setUTCDay.apply(this._, arguments)
		},
		setFullYear: function() {
			pe.setUTCFullYear.apply(this._, arguments)
		},
		setHours: function() {
			pe.setUTCHours.apply(this._, arguments)
		},
		setMilliseconds: function() {
			pe.setUTCMilliseconds.apply(this._, arguments)
		},
		setMinutes: function() {
			pe.setUTCMinutes.apply(this._, arguments)
		},
		setMonth: function() {
			pe.setUTCMonth.apply(this._, arguments)
		},
		setSeconds: function() {
			pe.setUTCSeconds.apply(this._, arguments)
		},
		setTime: function() {
			pe.setTime.apply(this._, arguments)
		}
	};
	var pe = Date.prototype;
	ne.year = Kb(function(a) {
		return a = ne.day(a), a.setMonth(0, 1), a
	}, function(a, b) {
		a.setFullYear(a.getFullYear() + b)
	}, function(a) {
		return a.getFullYear()
	}), ne.years = ne.year.range, ne.years.utc = ne.year.utc.range, ne.day = Kb(function(a) {
		var b = new oe(2e3, 0);
		return b.setFullYear(a.getFullYear(), a.getMonth(), a.getDate()), b
	}, function(a, b) {
		a.setDate(a.getDate() + b)
	}, function(a) {
		return a.getDate() - 1
	}), ne.days = ne.day.range, ne.days.utc = ne.day.utc.range, ne.dayOfYear = function(a) {
		var b = ne.year(a);
		return Math.floor((a - b - 6e4 * (a.getTimezoneOffset() - b.getTimezoneOffset())) / 864e5)
	}, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(a, b) {
		b = 7 - b;
		var c = ne[a] = Kb(function(a) {
			return (a = ne.day(a)).setDate(a.getDate() - (a.getDay() + b) % 7), a
		}, function(a, b) {
			a.setDate(a.getDate() + 7 * Math.floor(b))
		}, function(a) {
			var c = ne.year(a).getDay();
			return Math.floor((ne.dayOfYear(a) + (c + b) % 7) / 7) - (c !== b)
		});
		ne[a + "s"] = c.range, ne[a + "s"].utc = c.utc.range, ne[a + "OfYear"] = function(a) {
			var c = ne.year(a).getDay();
			return Math.floor((ne.dayOfYear(a) + (c + b) % 7) / 7)
		}
	}), ne.week = ne.sunday, ne.weeks = ne.sunday.range, ne.weeks.utc = ne.sunday.utc.range, ne.weekOfYear = ne.sundayOfYear;
	var qe = {
			"-": "",
			_: " ",
			0: "0"
		},
		re = /^\s*\d+/,
		se = /^%/;
	Kc.locale = function(a) {
		return {
			numberFormat: Hb(a),
			timeFormat: Mb(a)
		}
	};
	var te = Kc.locale({
		decimal: ".",
		thousands: ",",
		grouping: [3],
		currency: ["$", ""],
		dateTime: "%a %b %e %X %Y",
		date: "%m/%d/%Y",
		time: "%H:%M:%S",
		periods: ["AM", "PM"],
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	});
	Kc.format = te.numberFormat;
	var ue = {
		floor: c,
		ceil: c
	};
	Kc.ascending = ic;
	var ve = jc(ic);
	Kc.bisectLeft = ve.left, Kc.bisect = Kc.bisectRight = ve.right, Kc.bisector = function(a) {
		return jc(1 === a.length ? function(b, c) {
			return ic(a(b), c)
		} : a)
	}, Kc.scale.linear = function() {
		return lc([0, 1], [0, 1], Bb, !1)
	};
	var we = {
		s: 1,
		g: 1,
		p: 1,
		r: 1,
		e: 1
	};
	Wc.transition = function(a) {
		for (var b, c, d = xe || ++Be, e = Ic(a), f = [], g = ye || {
				time: Date.now(),
				ease: zc,
				delay: 0,
				duration: 250
			}, h = -1, i = this.length; ++h < i;) {
			f.push(b = []);
			for (var j = this[h], k = -1, l = j.length; ++k < l;)(c = j[k]) && Jc(c, k, e, d, g), b.push(c)
		}
		return tc(f, e, d)
	}, Wc.interrupt = function(a) {
		return this.each(null == a ? ze : sc(Ic(a)))
	};
	var xe, ye, ze = sc(Ic()),
		Ae = [],
		Be = 0;
	Ae.call = Wc.call, Ae.empty = Wc.empty, Ae.node = Wc.node, Ae.size = Wc.size, Kc.transition = function(a, b) {
		return a && a.transition ? xe ? a.transition(b) : a : Kc.selection().transition(a)
	}, Kc.transition.prototype = Ae;
	var Ce = function() {
			return c
		},
		De = Kc.map({
			linear: Ce,
			poly: Ac,
			quad: function() {
				return xc
			},
			cubic: function() {
				return yc
			},
			sin: function() {
				return Bc
			},
			exp: function() {
				return Cc
			},
			circle: function() {
				return Dc
			},
			elastic: Ec,
			back: Fc,
			bounce: function() {
				return Gc
			}
		}),
		Ee = Kc.map({
			"in": c,
			out: vc,
			"in-out": wc,
			"out-in": function(a) {
				return wc(vc(a))
			}
		});
	Kc.ease = function(a) {
		var b = a.indexOf("-"),
			d = b >= 0 ? a.slice(0, b) : a,
			e = b >= 0 ? a.slice(b + 1) : "in";
		return d = De.get(d) || Ce, e = Ee.get(e) || c, uc(e(d.apply(null, Pc.call(arguments, 1))))
	}, Wc.each = function(a) {
		return Hc(this, function(b, c, d) {
			a.call(b, b.__data__, c, d)
		})
	}, Ae.ease = function(a) {
		var b = this.id,
			c = this.namespace;
		return arguments.length < 1 ? this.node()[c][b].ease : ("function" != typeof a && (a = Kc.ease.apply(Kc, arguments)), Hc(this, function(d) {
			d[c][b].ease = a
		}))
	}, Ae.delay = function(a) {
		var b = this.id,
			c = this.namespace;
		return arguments.length < 1 ? this.node()[c][b].delay : Hc(this, "function" == typeof a ? function(d, e, f) {
			d[c][b].delay = +a.call(d, d.__data__, e, f)
		} : (a = +a, function(d) {
			d[c][b].delay = a
		}))
	}, Ae.duration = function(a) {
		var b = this.id,
			c = this.namespace;
		return arguments.length < 1 ? this.node()[c][b].duration : Hc(this, "function" == typeof a ? function(d, e, f) {
			d[c][b].duration = Math.max(1, a.call(d, d.__data__, e, f))
		} : (a = Math.max(1, a), function(d) {
			d[c][b].duration = a
		}))
	}, Ae.each = function(a, b) {
		var c = this.id,
			d = this.namespace;
		if (arguments.length < 2) {
			var e = ye,
				f = xe;
			try {
				xe = c, Hc(this, function(b, e, f) {
					ye = b[d][c], a.call(b, b.__data__, e, f)
				})
			} finally {
				ye = e, xe = f
			}
		} else Hc(this, function(e) {
			var f = e[d][c];
			(f.event || (f.event = Kc.dispatch("start", "end", "interrupt"))).on(a, b)
		});
		return this
	}, Ae.tween = function(a, b) {
		var c = this.id,
			d = this.namespace;
		return arguments.length < 2 ? this.node()[d][c].tween.get(a) : Hc(this, null == b ? function(b) {
			b[d][c].tween.remove(a)
		} : function(e) {
			e[d][c].tween.set(a, b)
		})
	}, "function" == typeof define && define.amd ? define(Kc) : "object" == typeof module && module.exports && (module.exports = Kc), this.d3 = Kc
}(), L.TileLayer.Multi = L.TileLayer.extend({
	_tileDefs: [],
	initialize: function(a, b) {
		L.TileLayer.prototype.initialize.call(this, void 0, b);
		var c = this.options.minZoom;
		for (var d in a)
			for (var e = this._fixTileDef(a[d]); d >= c; c++) this._tileDefs[c] = e
	},
	_fixTileDef: function(a) {
		var b = L.extend({}, {
			subdomains: L.TileLayer.prototype.options.subdomains
		}, a);
		return "string" == typeof b.subdomains && (b.subdomains = b.subdomains.split("")), b
	},
	_getSubdomain: function(a, b) {
		var c = (a.x + a.y) % b.length;
		return b[c]
	},
	setUrl: function() {},
	getTileUrl: function(a) {
		var b = this._getZoomForUrl(),
			c = this._tileDefs[b];
		return this._adjustTilePoint(a), L.Util.template(c.url, L.extend({
			s: this._getSubdomain(a, c.subdomains),
			z: b,
			x: a.x,
			y: a.y
		}, this.options))
	}
}), L.TileLayer.multi = function(a, b) {
	return new L.TileLayer.Multi(a, b)
};