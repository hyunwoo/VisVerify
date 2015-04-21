(function (global, factory) {
    function extractNS() {
        var g = {};
        return factory.call(g, global), g.jsnx;
    }

    if (typeof define === 'function' && define.amd) { /*AMD*/
        define(extractNS);
    } else if (typeof module !== 'undefined' && module.exports) { /*node*/
        module.exports = extractNS();
    } else {
        factory.call(global, global);
    }
}(this, function (window) {
    function h(a) {
        throw a;
    }

    var aa = void 0, k = !0, m = null, n = !1;

    function da(a) {
        return function () {
            return a
        }
    }

    var q, ea = this;

    function fa() {
    }

    function r(a) {
        var b = typeof a;
        if ("object" == b)if (a) {
            if (a instanceof Array)return"array";
            if (a instanceof Object)return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c)return"object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return"array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return"function"
        } else return"null";
        else if ("function" == b && "undefined" == typeof a.call)return"object";
        return b
    }

    function s(a) {
        return a !== aa
    }

    function ga(a) {
        return"array" == r(a)
    }

    function t(a) {
        var b = r(a);
        return"array" == b || "object" == b && "number" == typeof a.length
    }

    function u(a) {
        return"string" == typeof a
    }

    function ha(a) {
        return"boolean" == typeof a
    }

    function ia(a) {
        return"number" == typeof a
    }

    function ka(a) {
        return"function" == r(a)
    }

    function la(a) {
        var b = typeof a;
        return"object" == b && a != m || "function" == b
    }

    var ma = "closure_uid_" + (1E9 * Math.random() >>> 0), na = 0;

    function oa(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function pa(a, b, c) {
        a || h(Error());
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }

    function qa(a, b, c) {
        qa = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? oa : pa;
        return qa.apply(m, arguments)
    }

    function v(a, b) {
        var c = a.split("."), d = ea;
        !(c[0]in d) && d.execScript && d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());)!c.length && s(b) ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
    }

    function ra(a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.Wa = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    };
    var w = Array.prototype, sa = w.indexOf ? function (a, b, c) {
        return w.indexOf.call(a, b, c)
    } : function (a, b, c) {
        c = c == m ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (u(a))return!u(b) || 1 != b.length ? -1 : a.indexOf(b, c);
        for (; c < a.length; c++)if (c in a && a[c] === b)return c;
        return-1
    }, y = w.forEach ? function (a, b, c) {
        w.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = u(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
    }, ta = w.filter ? function (a, b, c) {
        return w.filter.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = [], f = 0, g = u(a) ? a.split("") :
            a, l = 0; l < d; l++)if (l in g) {
            var p = g[l];
            b.call(c, p, l, a) && (e[f++] = p)
        }
        return e
    }, ua = w.map ? function (a, b, c) {
        return w.map.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = Array(d), f = u(a) ? a.split("") : a, g = 0; g < d; g++)g in f && (e[g] = b.call(c, f[g], g, a));
        return e
    };

    function va(a, b) {
        if (a.reduce)return a.reduce(b, 0);
        var c = 0;
        y(a, function (d, e) {
            c = b.call(aa, c, d, e, a)
        });
        return c
    }

    function ya(a, b) {
        var c;
        a:{
            c = a.length;
            for (var d = u(a) ? a.split("") : a, e = 0; e < c; e++)if (e in d && b.call(aa, d[e], e, a)) {
                c = e;
                break a
            }
            c = -1
        }
        return 0 > c ? m : u(a) ? a.charAt(c) : a[c]
    }

    function za(a, b) {
        var c = sa(a, b);
        0 <= c && w.splice.call(a, c, 1)
    }

    function Aa(a) {
        return w.concat.apply(w, arguments)
    }

    function Ba(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)c[d] = a[d];
            return c
        }
        return[]
    }

    function Ea(a, b, c, d) {
        w.splice.apply(a, Fa(arguments, 1))
    }

    function Fa(a, b, c) {
        return 2 >= arguments.length ? w.slice.call(a, b) : w.slice.call(a, b, c)
    }

    function Ga(a, b, c) {
        if (!t(a) || !t(b) || a.length != b.length)return n;
        var d = a.length;
        c = c || La;
        for (var e = 0; e < d; e++)if (!c(a[e], b[e]))return n;
        return k
    }

    function Ma(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    }

    function La(a, b) {
        return a === b
    }

    function Na(a) {
        for (var b = [], c = 0; c < a; c++)b[c] = 0;
        return b
    }

    function Oa(a) {
        if (!arguments.length)return[];
        for (var b = [], c = 0; ; c++) {
            for (var d = [], e = 0; e < arguments.length; e++) {
                var f = arguments[e];
                if (c >= f.length)return b;
                d.push(f[c])
            }
            b.push(d)
        }
    };
    var z = "StopIteration"in ea ? ea.StopIteration : Error("StopIteration");

    function A() {
    }

    A.prototype.next = function () {
        h(z)
    };
    A.prototype.J = function () {
        return this
    };
    function Ra(a) {
        if (a instanceof A)return a;
        if ("function" == typeof a.J)return a.J(n);
        if (t(a)) {
            var b = 0, c = new A;
            c.next = function () {
                for (; ;) {
                    b >= a.length && h(z);
                    if (b in a)return a[b++];
                    b++
                }
            };
            return c
        }
        h(Error("Not implemented"))
    }

    function B(a, b, c) {
        if (t(a))try {
            y(a, b, c)
        } catch (d) {
            d !== z && h(d)
        } else {
            a = Ra(a);
            try {
                for (; ;)b.call(c, a.next(), aa, a)
            } catch (e) {
                e !== z && h(e)
            }
        }
    }

    function Sa(a, b, c) {
        var d = Ra(a);
        a = new A;
        a.next = function () {
            for (; ;) {
                var a = d.next();
                return b.call(c, a, aa, d)
            }
        };
        return a
    }

    function Ta(a, b, c) {
        var d = c;
        B(a, function (a) {
            d = b.call(aa, d, a)
        });
        return d
    }

    function Ua(a) {
        var b = arguments, c = b.length, d = 0, e = new A;
        e.next = function () {
            try {
                return d >= c && h(z), Ra(b[d]).next()
            } catch (a) {
                return(a !== z || d >= c) && h(a), d++, this.next()
            }
        };
        return e
    }

    function Va(a) {
        if (t(a))return Ba(a);
        a = Ra(a);
        var b = [];
        B(a, function (a) {
            b.push(a)
        });
        return b
    }

    function Wa(a, b) {
        try {
            return Ra(a).next()
        } catch (c) {
            return c != z && h(c), b
        }
    };
    function C(a, b, c) {
        for (var d in a)b.call(c, a[d], d, a)
    }

    function Xa(a, b, c) {
        var d = {}, e;
        for (e in a)d[e] = b.call(c, a[e], e, a);
        return d
    }

    function E(a) {
        var b = 0, c;
        for (c in a)b++;
        return b
    }

    function Ya(a) {
        for (var b in a)return b
    }

    function Za(a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = a[d];
        return b
    }

    function F(a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = d;
        return b
    }

    function $a(a) {
        for (var b in a)return n;
        return k
    }

    function ab(a) {
        for (var b in a)delete a[b]
    }

    function G(a, b) {
        b in a && delete a[b]
    }

    function H(a, b, c) {
        return b in a ? a[b] : c
    }

    function cb(a) {
        var b = {}, c;
        for (c in a)b[c] = a[c];
        return b
    }

    var db = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function I(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)a[c] = d[c];
            for (var f = 0; f < db.length; f++)c = db[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }

    function eb(a) {
        var b = arguments.length;
        if (1 == b && ga(arguments[0]))return eb.apply(m, arguments[0]);
        b % 2 && h(Error("Uneven number of arguments"));
        for (var c = {}, d = 0; d < b; d += 2)c[arguments[d]] = arguments[d + 1];
        return c
    };
    var J = {Ra: function (a) {
        return Math.floor(Math.random() * a)
    }, Xa: function (a, b) {
        return a + Math.random() * (b - a)
    }, La: function (a, b, c) {
        return Math.min(Math.max(a, b), c)
    }, Ca: function (a, b) {
        var c = a % b;
        return 0 > c * b ? c + b : c
    }, Oa: function (a, b, c) {
        return a + c * (b - a)
    }, Qa: function (a, b, c) {
        return Math.abs(a - b) <= (c || 1E-6)
    }, ea: function (a) {
        return J.Ca(a, 360)
    }, oa: function (a) {
        return a * Math.PI / 180
    }, Ha: function (a) {
        return 180 * a / Math.PI
    }, Ja: function (a, b) {
        return b * Math.cos(J.oa(a))
    }, Ka: function (a, b) {
        return b * Math.sin(J.oa(a))
    }, ga: function (a, b, c, d) {
        return J.ea(J.Ha(Math.atan2(d - b, c - a)))
    }, Ia: function (a, b) {
        var c = J.ea(b) - J.ea(a);
        180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
        return c
    }, Ua: function (a) {
        return 0 == a ? 0 : 0 > a ? -1 : 1
    }, Pa: function (a, b, c, d) {
        c = c || function (a, b) {
            return a == b
        };
        d = d || function (b) {
            return a[b]
        };
        for (var e = a.length, f = b.length, g = [], l = 0; l < e + 1; l++)g[l] = [], g[l][0] = 0;
        for (var p = 0; p < f + 1; p++)g[0][p] = 0;
        for (l = 1; l <= e; l++)for (p = 1; p <= e; p++)c(a[l - 1], b[p - 1]) ? g[l][p] = g[l - 1][p - 1] + 1 : g[l][p] = Math.max(g[l - 1][p], g[l][p - 1]);
        for (var D = [], l = e, p = f; 0 < l && 0 < p;)c(a[l - 1], b[p -
            1]) ? (D.unshift(d(l - 1, p - 1)), l--, p--) : g[l - 1][p] > g[l][p - 1] ? l-- : p--;
        return D
    }, q: function (a) {
        return va(arguments, function (a, c) {
            return a + c
        })
    }, va: function (a) {
        return J.q.apply(m, arguments) / arguments.length
    }, Va: function (a) {
        var b = arguments.length;
        if (2 > b)return 0;
        var c = J.va.apply(m, arguments), b = J.q.apply(m, ua(arguments, function (a) {
            return Math.pow(a - c, 2)
        })) / (b - 1);
        return Math.sqrt(b)
    }, Na: function (a) {
        return isFinite(a) && 0 == a % 1
    }, Ma: function (a) {
        return isFinite(a) && !isNaN(a)
    }, Ta: function (a, b) {
        return Math.floor(a +
            (b || 2E-15))
    }, Sa: function (a, b) {
        return Math.ceil(a - (b || 2E-15))
    }};

    function fb(a) {
        return Ta(K(a), function (a, c) {
            a[c[0]] = c[1];
            return a
        }, {})
    }

    function gb(a) {
        return a instanceof A || ka(a.J)
    }

    function hb(a) {
        if (a instanceof M)return a.M();
        if (u(a) || t(a))return a.length;
        if (ib(a))return E(a);
        h(new TypeError)
    }

    function N(a, b, c, d) {
        ha(c) && (d = c, c = m);
        if (d) {
            var e = b;
            b = function (a) {
                e.apply(this, a)
            }
        }
        a instanceof M ? B(K(a), b, c) : gb(a) ? B(a, b, c) : t(a) || u(a) ? y(a, b, c) : la(a) && N(F(a), b, c)
    }

    v("jsnx.forEach", N);
    function O(a, b, c) {
        if (a instanceof M)return O(K(a), b, c);
        if (t(a))return ua(a, b, c);
        if (gb(a))return Sa(a, b, c);
        if (la(a))return Xa(a, b, c);
        h(new TypeError)
    }

    function jb(a) {
        var b = arguments, c = b[0];
        if (t(c))return Oa.apply(m, b);
        if (gb(c)) {
            var c = new A, d = b.length;
            c.next = function () {
                for (var a = [], c = 0; c < d; c++)a.push(b[c].next());
                return a
            };
            return c
        }
        if (la(c))return Oa.apply(m, ua(b, F));
        h(new TypeError)
    }

    function kb(a, b) {
        a = ka(b) ? P(O(a, function () {
            return b.apply(m, arguments)
        })) : P(a);
        return Math.max.apply(m, a)
    }

    function Q(a, b, c) {
        if (0 === arguments.length)return Ra([]);
        1 === arguments.length ? (b = a, a = 0, c = 1) : 2 === arguments.length ? c = 1 : 3 === arguments.length && 0 === arguments[2] && h("range() step argument must not be zero");
        var d = new A, e = 0 > c, f = a, g;
        d.next = function () {
            (e && f <= b || !e && f >= b) && h(z);
            g = f;
            f += c;
            return g
        };
        return d
    }

    function lb(a) {
        var b = P(a), c = b.length;
        if (2 > c)return new A;
        var d = P(Q(2));
        a = new A;
        a.next = function () {
            var a = ua(d, function (a) {
                return b[a]
            });
            this.next = function () {
                var a = n, e;
                for (e = 2; e--;)if (d[e] != e + c - 2) {
                    a = k;
                    break
                }
                a || h(z);
                d[e] += 1;
                for (a = e + 1; 2 > a; a++)d[a] = d[a - 1] + 1;
                return ua(d, function (a) {
                    return b[a]
                })
            };
            return a
        };
        return a
    }

    function mb(a) {
        var b = P(a), c = b.length, d = ia(2) ? 2 : c;
        if (d > c)return new A;
        var e = P(Q(c)), f = P(Q(c, c - d, -1));
        a = new A;
        var g = new A, l, p = k;
        a.next = function () {
            this.next = l.next;
            return ua(e.slice(0, d), function (a) {
                return b[a]
            })
        };
        g.next = function () {
            return p
        };
        l = R(g, function (a) {
                a || h(z);
                p = n;
                return Q(d - 1, -1, -1)
            }, function (a) {
                if (!p)if (f[a] -= 1, 0 === f[a])e.splice.apply(e, [a, e.length].concat(e.slice(a + 1).concat([e[a]]))), f[a] = c - a; else {
                    var g = f[a], l = e[a];
                    e[a] = e[e.length - g];
                    e[e.length - g] = l;
                    p = k;
                    return K([ua(e.slice(0, d), function (a) {
                        return b[a]
                    })])
                }
            },
            function (a) {
                return a
            });
        return a
    }

    function nb(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)!s(a[c]) || "object" !== r(a[c]) ? a[c] = S(d[c]) : "object" === r(a[c]) && "object" === r(d) && nb(a[c], d[c]);
            for (var f = 0; f < db.length; f++)c = db[f], Object.prototype.hasOwnProperty.call(d, c) && (!s(a[c]) || "object" !== r(a[c]) ? a[c] = S(d[c]) : "object" === r(a[c]) && "object" === r(d) && nb(a[c], d[c]))
        }
    }

    function P(a) {
        if (a instanceof M)return P(K(a));
        if (t(a))return Ba(a);
        if (gb(a))return Va(a);
        if (la(a))return F(a);
        h(new TypeError)
    }

    v("jsnx.toArray", P);
    function ob(a) {
        var b = [];
        C(a, function (a, d) {
            b.push([d, a])
        });
        return b
    }

    function T(a) {
        var b = new A, c = Ra(F(a));
        b.next = function () {
            var b = c.next();
            return[b, a[b]]
        };
        return b
    }

    function K(a) {
        if (a instanceof M)return K(a.adj);
        "object" === r(a) && (!t(a) && !gb(a)) && (a = F(a));
        return Ra(a)
    }

    function R(a, b) {
        var c = new A, d = Fa(arguments, 1);
        if (0 === d.length)return a;
        try {
            a = Ra(a)
        } catch (e) {
            return c.next = function () {
                "Not implemented" === e.message && h(new TypeError)
            }, c
        }
        var f = m;
        c.next = function () {
            var b, e;
            try {
                for (; !s(b);)b = f.next()
            } catch (p) {
                for (; !s(e) || !s(b);)e = a.next(), b = d[0](e);
                if (gb(b))return f = R.apply(m, Aa([b], Fa(d, 1))), c.next();
                f = m
            }
            return b
        };
        return c
    }

    v("jsnx.sentinelIterator", function (a, b) {
        var c = new A;
        c.next = function () {
            return Wa(a, b)
        };
        return c
    });
    function ib(a) {
        var b = Object.prototype.hasOwnProperty;
        if (!a || "object" !== r(a) || a.nodeType || a == a.window)return n;
        try {
            if (a.constructor && !b.call(a, "constructor") && !b.call(a.constructor.prototype, "isPrototypeOf"))return n
        } catch (c) {
            return n
        }
        for (var d in a);
        return d === aa || b.call(a, d)
    }

    function S(a, b) {
        b = b || [];
        var c = r(a);
        if ("object" == c && ib(a) || "array" == c) {
            var d = ya(b, function (b) {
                return a === b[0]
            });
            if (d !== m)return d[1];
            if (a.$)return d = [a, a.$()], b.push(d), d[1];
            c = "array" == c ? [] : {};
            d = [a, c];
            b.push(d);
            for (var e in a)c[e] = S(a[e], b);
            return c
        }
        return a
    }

    function qb(a) {
        function b() {
        }

        var c = {}, d;
        b.prototype = a.constructor.prototype;
        for (d in a)a.hasOwnProperty(d) && (c[d] = a[d]);
        c = S(c);
        a = new b;
        for (d in c)a[d] = c[d];
        return a
    }

    var sb = function rb(b, c) {
        return 0 === c ? b : rb(c, b % c)
    };
    var tb, ub = m, vb = "add_node add_nodes_from add_edge add_edges_from remove_node remove_nodes_from remove_edge remove_edges_from clear".split(" ");
    v("jsnx.draw", function (a, b, c) {
        function d() {
            wa.f.attr("transform", function (a) {
                return["translate(", a.x, ",", a.y, ")scale(", ja, ")"].join("")
            });
            pb()
        }

        ha(b) && (c = b, b = m);
        b = b || ub || {};
        var e = b.d3 || window.d3, f = {};
        nb(f, wb, b);
        ub = b;
        e || h(Error("D3 requried for draw()"));
        f.element == m && tb == m && h(Error("Output element required for draw()"));
        tb = H(f, "element", tb);
        e.select(tb).select("svg.jsnx").remove();
        var g = e.select(tb), l = g.append("svg").classed("jsnx", k).attr("pointer-events", "all"), p = l.append("g");
        b = p.append("g").classed("edges",
            k).selectAll("g.edge");
        var D = p.append("g").classed("nodes", k).selectAll("g.node"), x = e.layout.force(), L = f.width || parseInt(g.style("width"), 10), V = f.height || parseInt(g.style("height"), 10), Ha = f.layout_attr, g = f.nodelist || m, ba, ca, W, Ca = a.c(), xa = f.weighted, wa = {f: D, g: b};
        if (f.with_labels) {
            var Da = f.labels;
            ba = "object" === r(Da) ? function (a) {
                return H(Da, a.node, "")
            } : ka(Da) ? Da : u(Da) ? function (a) {
                return a.data[Da]
            } : function (a) {
                return a.node
            }
        }
        f.labels = ba;
        if (xa) {
            var Ia = f.weights;
            W = "object" === r(Ia) ? function (a) {
                return H(Ia,
                    a.node, 1)
            } : ka(Ia) ? Ia : u(Ia) ? function (a) {
                return H(a.data, Ia, 1)
            } : da(1)
        }
        if (f.with_edge_labels) {
            var Ja = f.edge_labels;
            ca = xa && !s(Ja) ? W : "object" === r(Ja) ? function (a) {
                return H(Da, a.node, "")
            } : ka(Ja) ? Ja : u(Ja) ? function (a) {
                return a.data[Ja]
            } : function (a) {
                return a.edge
            };
            f.edge_labels = ca
        }
        if (xa && f.weighted_stroke) {
            var xa = Ta(a.e(m, k), function (a, b) {
                b = W({data: b[2]});
                return a > b ? a : b
            }, 0), Pc = e.scale.linear().range([1, f.edge_style["stroke-width"]]).domain([0, xa]);
            f.edge_style["stroke-width"] = function (a) {
                return Pc(W.call(this,
                    a))
            }
        }
        l.select("svg.jsnx").remove();
        l.attr("width", L + "px").attr("height", V + "px").style("opacity", 1E-6).transition().duration(1E3).style("opacity", 1);
        var Qc = {size: k, nodes: k, links: k, start: k};
        N(Ha, function (a) {
            if (!(a in Qc))x[a](Ha[a])
        });
        x.nodes([]).links([]).size([L, V]);
        var Pa = 1, ja = 1;
        if (f.pan_zoom.enabled) {
            var Tb = f.pan_zoom.scale, Ka = f.edge_style["stroke-width"];
            ka(Ka) ? f.edge_style["stroke-width"] = function () {
                var a = Ka.apply(this, arguments);
                return ja * (+a || parseInt(a, 10))
            } : (Ka = +Ka || parseInt(Ka, 10), f.edge_style["stroke-width"] =
                function () {
                    return ja * Ka
                });
            (function () {
                var a = n, b = 1, c = Pa;
                l.call(e.behavior.zoom().on("zoom", function () {
                    var g = e.event.sourceEvent.shiftKey;
                    (g = Tb && g || !(Tb || g)) && !a ? (b = e.event.scale, c = Pa, a = k) : !g && a && (a = n);
                    Pa = g ? c * (e.event.scale / b) : Pa;
                    ja = !g ? Pa / e.event.scale : ja;
                    g = e.event.translate;
                    p.attr("transform", "translate(" + g[0] + "," + g[1] + ")scale(" + e.event.scale + ")");
                    p.selectAll("g.edge > .line").style("stroke-width", f.edge_style["stroke-width"]);
                    d()
                }))
            })()
        }
        var pb = fa;
        if (Ca) {
            l.append("defs").append("marker").attr("id",
                "Triangle").attr("markerUnits", "strokeWidth").attr("refX", "7").attr("refY", "5").attr("viewBox", "0 0 10 10").attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z");
            f.edge_attr["marker-end"] = "url(#Triangle)";
            f.edge_style.fill = "none";
            var bb = f.layout_attr.linkDistance, Qa = f.edge_offset;
            ka(bb) || (bb = function () {
                return f.layout_attr.linkDistance
            });
            ga(Qa) && (Qa = function () {
                return f.edge_offset
            });
            ia(Qa) && (Qa = function () {
                return[f.edge_offset, f.edge_offset]
            });
            pb = function () {
                wa.g.each(function (a) {
                    if (a.source !==
                        a.target) {
                        var b = e.select(this), c = a.source.x, d = a.source.y, f = a.target.x, g = a.target.y, l = J.ga(c, d, f, g), f = Math.sqrt(Math.pow(f - c, 2) + Math.pow(g - d, 2)), g = Qa(a), g = [g[0] * ja, g[1] * ja];
                        b.attr("transform", ["translate(", c, ",", d, ")rotate(", l, ")"].join(""));
                        if (c = a.G.H(a.target.node, a.source.node)) {
                            var d = bb(a) / 3, l = -d / (f / 2), p = l * f;
                            b.select(".line").attr("d", ["M", g[0], l * g[0], "Q", f / 2, -d, f - g[1], -l * (f - g[1]) + p].join(" "))
                        } else b.select(".line").attr("d", ["M", g[0], "0 L", f - g[1], 0].join(" "));
                        g = 1 / ja;
                        b.select("text").attr("x",
                                f * g / 2).attr("y", c ? g * (-bb(a) / 4) : 0).attr("transform", "scale(" + ja + ")")
                    }
                })
            }
        } else pb = function () {
            wa.g.each(function (a) {
                if (a.source !== a.target) {
                    var b = e.select(this), c = a.source.x, d = a.source.y, g = a.target.x, l = a.target.y;
                    a = J.ga(c, d, g, l);
                    g = Math.sqrt(Math.pow(g - c, 2) + Math.pow(l - d, 2));
                    l = g / 2;
                    b.attr("transform", ["translate(", c, ",", d, ")rotate(", a, ")"].join(""));
                    b.select(".line").attr("d", ["M 0 0 L", g, "0"].join(" "));
                    f.with_edge_labels && b.select("text").attr("x", l * (1 / ja)).attr("y", 0).attr("transform", "scale(" + ja + ")" +
                        (90 < a && 279 > a ? "rotate(180," + l * (1 / ja) + ",0)" : ""))
                }
            })
        };
        x.on("tick", d);
        L = a.v();
        V = a.e();
        g && (c = n, L = a.d(g), V = a.e(g));
        wa.f = xb(a, L, x, D, f.node_shape, ba);
        wa.g = yb(a, V, x, b, ca);
        zb(wa.f, {attr: f.node_attr, style: f.node_style, U: f.label_style, T: f.label_attr}, f.with_labels);
        Ab(wa.g, {attr: f.edge_attr, style: f.edge_style, U: f.edge_label_style, T: f.edge_label_attr}, f.with_edge_labels, m, Ca);
        c ? Bb(a, x, f, wa) : a.bound ? Cb(a) : Db(a);
        x.start();
        return x
    });
    function xb(a, b, c, d, e, f) {
        var g = c.nodes();
        N(b, function (b) {
            var c = a.node[b];
            b = {node: b, data: c, G: a};
            g.push(b);
            c.__d3datum__ = b
        });
        d = d.data(g, Eb);
        b = d.enter().append("g").classed("node", k).call(c.drag);
        b.append(e).classed("node-shape", k);
        f && b.append("text").text(f);
        return d
    }

    function yb(a, b, c, d, e) {
        var f = c.links();
        N(b, function (b) {
            var c = b[0], d = b[1];
            b = b[2] || a.P(c, d);
            c = {edge: [c, d], redge: [d, c], source: a.node[c].__d3datum__, target: a.node[d].__d3datum__, data: b, G: a};
            f.push(c);
            b.__d3datum__ = c
        });
        d = d.data(f, Fb);
        b = d.enter().append("g").classed("edge", k);
        b.append("path").classed("line", k);
        e && b.append("text").text(e);
        return d
    }

    function zb(a, b, c, d) {
        if (d != m) {
            var e = {};
            N(d, function (a) {
                e[t(a) ? a[0] : a] = k
            });
            a = a.filter(function (a) {
                return a.node in e
            })
        }
        var f = a.selectAll(".node-shape");
        C(b.attr, function (a, b) {
            f.attr(b, a)
        });
        C(b.style, function (a, b) {
            f.style(b, a)
        });
        if (c) {
            var g = a.selectAll("text");
            C(b.T, function (a, b) {
                g.attr(b, a)
            });
            C(b.U, function (a, b) {
                g.style(b, a)
            })
        }
    }

    function Ab(a, b, c, d, e) {
        if (d != m) {
            var f = {};
            N(d, function (a) {
                f[[a[0], a[1]]] = k
            });
            a = a.filter(function (a) {
                return a.edge in f || e || a.redge in f
            })
        }
        var g = a.selectAll(".line");
        C(b.attr, function (a, b) {
            g.attr(b, a)
        });
        C(b.style, function (a, b) {
            g.style(b, a)
        });
        if (c) {
            var l = a.selectAll("text");
            C(b.T, function (a, b) {
                l.attr(b, a)
            });
            C(b.U, function (a, b) {
                l.style(b, a)
            })
        }
    }

    function Eb(a) {
        return a.node
    }

    function Fb(a) {
        return a.edge
    }

    function Gb(a, b, c, d) {
        var e = c.nodes();
        N(a.d(b), function (b) {
            za(e, a.node[b].__d3datum__)
        });
        d = d.data(e, Eb);
        d.exit().remove();
        return d
    }

    function Hb(a, b, c, d) {
        var e = c.links();
        N(b, function (b) {
            za(e, H(a.P(b[0], b[1], {}), "__d3datum__", m))
        });
        d = d.data(e, Fb);
        d.exit().remove();
        return d
    }

    function Bb(a, b, c, d) {
        Cb(a, n);
        var e = a.constructor.prototype, f = c.node_shape, g = {attr: c.node_attr, style: c.node_style, T: c.label_attr, U: c.label_style}, l = {attr: c.edge_attr, style: c.edge_style, T: c.edge_label_attr, U: c.edge_label_style}, p = c.labels, D = c.edge_labels, x = c.with_labels, L = c.with_edge_labels, V = a.c();
        a.add_node = a.D = function (a) {
            var c = !this.l(a);
            e.add_node.apply(this, arguments);
            c && (d.f = xb(this, [a], b, d.f, f, p));
            zb(d.f, g, x, [a]);
            b.start()
        };
        a.add_nodes_from = a.j = function (a) {
            var c = ta(P(a), function (a) {
                return!this.l(t(a) ?
                    a[0] : a)
            }, this);
            e.add_nodes_from.apply(this, arguments);
            0 < c.length && (d.f = xb(this, c, b, d.f, f, p));
            zb(d.f, g, x, a);
            b.start()
        };
        a.add_edge = a.a = function (c, ba) {
            var ca = !this.H(c, ba), W = [];
            ca && (W = ta(c == ba ? [c] : [c, ba], function (a) {
                return!this.l(a)
            }, this));
            e.add_edge.apply(a, arguments);
            0 < W.length && (d.f = xb(this, W, b, d.f, f, p), zb(d.f, g, x, W));
            ca && (d.g = yb(this, [
                [c, ba]
            ], b, d.g, D));
            Ab(d.g, l, L, [
                [c, ba]
            ], V);
            b.start()
        };
        a.add_edges_from = a.b = function (c) {
            var V = [], ca = [], W = {}, Ca = {}, xa = this.c();
            N(c, function (a) {
                var b = a[0];
                a = a[1];
                if (!this.H(b,
                    a) && !([b, a]in W) && (xa || !([a, b]in W)))V.push([b, a]), W[[b, a]] = k, !this.l(b) && !(b in Ca) && (ca.push(b), Ca[b] = k), !this.l(a) && !(a in Ca) && (ca.push(a), Ca[a] = k)
            }, this);
            e.add_edges_from.apply(a, arguments);
            0 < ca.length && (d.f = xb(this, ca, b, d.f, f, p), zb(d.f, g, x, ca));
            0 < V.length && (d.g = yb(this, V, b, d.g, D));
            Ab(d.g, l, L, V, xa);
            b.start()
        };
        a.remove_node = a.N = function (c) {
            try {
                if (this.l(c)) {
                    d.f = Gb(this, [c], b, d.f);
                    var f = this.e([c]);
                    this.c() && (f = Ua(f, this.I([c])));
                    d.g = Hb(this, f, b, d.g);
                    b.resume()
                }
            } catch (g) {
            }
            e.remove_node.apply(a,
                arguments)
        };
        a.remove_nodes_from = a.X = function (c) {
            try {
                d.f = Gb(this, c, b, d.f);
                var f = this.e(c);
                this.c() && (f = Ua(f, this.I(c)));
                d.g = Hb(this, f, b, d.g);
                b.resume()
            } catch (g) {
            }
            e.remove_nodes_from.apply(a, arguments)
        };
        a.remove_edge = a.u = function (c, f) {
            try {
                d.g = Hb(this, [
                    [c, f]
                ], b, d.g), b.resume()
            } catch (g) {
            }
            e.remove_edge.apply(a, arguments)
        };
        a.remove_edges_from = a.B = function (c) {
            try {
                d.g = Hb(this, c, b, d.g), b.resume()
            } catch (f) {
            }
            e.remove_edges_from.apply(a, arguments)
        };
        a.clear = a.clear = function () {
            d.f = d.f.data([], Eb);
            d.f.exit().remove();
            d.g = d.g.data([], Fb);
            d.g.exit().remove();
            b.nodes([]).links([]).resume();
            e.clear.apply(a, arguments)
        };
        a.bound = k
    }

    v("jsnx.is_bound", function (a) {
        return a.bound
    });
    function Cb(a, b) {
        if (a.bound) {
            var c = a.constructor.prototype;
            y(vb, function (b) {
                a[b] = c[b]
            });
            delete a.bound;
            (!s(b) || b) && Db(a)
        }
    }

    v("jsnx.unbind", Cb);
    function Db(a) {
        N(a.v(k), function (a) {
            G(a[1], "__d3datum__")
        });
        N(a.e(m, k), function (a) {
            G(a[2], "__d3datum__")
        })
    }

    var wb = {layout_attr: {charge: -120, linkDistance: 40}, node_shape: "circle", node_attr: {r: 10}, node_style: {stroke: "#333", fill: "#999", cursor: "pointer"}, edge_attr: {}, edge_style: {stroke: "#000", "stroke-width": 2}, label_attr: {}, label_style: {"text-anchor": "middle", "dominant-baseline": "central", cursor: "pointer", "-webkit-user-select": "none", fill: "#000"}, edge_label_attr: {}, edge_label_style: {"font-size": "0.8em", "dominant-baseline": "central", "text-anchor": "middle", "-webkit-user-select": "none"}, with_labels: n, with_edge_labels: n,
        edge_offset: 10, weighted: n, weights: "weight", weighted_stroke: k, pan_zoom: {enabled: k, scale: k}};

    function Ib(a) {
        if ("function" == typeof a.F)return a.F();
        if (u(a))return a.split("");
        if (t(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)b.push(a[d]);
            return b
        }
        return Za(a)
    };
    function Jb(a, b) {
        this.k = {};
        this.n = [];
        var c = arguments.length;
        if (1 < c) {
            c % 2 && h(Error("Uneven number of arguments"));
            for (var d = 0; d < c; d += 2)this.set(arguments[d], arguments[d + 1])
        } else a && this.ca(a)
    }

    q = Jb.prototype;
    q.z = 0;
    q.Z = 0;
    q.h = function () {
        return this.z
    };
    q.F = function () {
        Kb(this);
        for (var a = [], b = 0; b < this.n.length; b++)a.push(this.k[this.n[b]]);
        return a
    };
    q.S = function () {
        return 0 == this.z
    };
    q.clear = function () {
        this.k = {};
        this.Z = this.z = this.n.length = 0
    };
    q.remove = function (a) {
        return Object.prototype.hasOwnProperty.call(this.k, a) ? (delete this.k[a], this.z--, this.Z++, this.n.length > 2 * this.z && Kb(this), k) : n
    };
    function Kb(a) {
        if (a.z != a.n.length) {
            for (var b = 0, c = 0; b < a.n.length;) {
                var d = a.n[b];
                Object.prototype.hasOwnProperty.call(a.k, d) && (a.n[c++] = d);
                b++
            }
            a.n.length = c
        }
        if (a.z != a.n.length) {
            for (var e = {}, c = b = 0; b < a.n.length;)d = a.n[b], Object.prototype.hasOwnProperty.call(e, d) || (a.n[c++] = d, e[d] = 1), b++;
            a.n.length = c
        }
    }

    q.set = function (a, b) {
        Object.prototype.hasOwnProperty.call(this.k, a) || (this.z++, this.n.push(a), this.Z++);
        this.k[a] = b
    };
    q.ca = function (a) {
        var b;
        a instanceof Jb ? (Kb(a), b = a.n.concat(), a = a.F()) : (b = F(a), a = Za(a));
        for (var c = 0; c < b.length; c++)this.set(b[c], a[c])
    };
    q.$ = function () {
        return new Jb(this)
    };
    q.J = function (a) {
        Kb(this);
        var b = 0, c = this.n, d = this.k, e = this.Z, f = this, g = new A;
        g.next = function () {
            for (; ;) {
                e != f.Z && h(Error("The map has changed since the iterator was created"));
                b >= c.length && h(z);
                var g = c[b++];
                return a ? g : d[g]
            }
        };
        return g
    };
    function U(a) {
        this.k = new Jb;
        a && this.ca(a)
    }

    function Lb(a) {
        var b = typeof a;
        return"object" == b && a || "function" == b ? "o" + (a[ma] || (a[ma] = ++na)) : b.substr(0, 1) + a
    }

    q = U.prototype;
    q.h = function () {
        return this.k.h()
    };
    q.add = function (a) {
        this.k.set(Lb(a), a)
    };
    q.ca = function (a) {
        a = Ib(a);
        for (var b = a.length, c = 0; c < b; c++)this.add(a[c])
    };
    q.remove = function (a) {
        return this.k.remove(Lb(a))
    };
    q.clear = function () {
        this.k.clear()
    };
    q.S = function () {
        return this.k.S()
    };
    q.contains = function (a) {
        a = Lb(a);
        return Object.prototype.hasOwnProperty.call(this.k.k, a)
    };
    function Mb(a, b) {
        for (var c = new U, d = Ib(b), e = 0; e < d.length; e++) {
            var f = d[e];
            a.contains(f) && c.add(f)
        }
        return c
    }

    function Nb(a, b) {
        for (var c = a.$(), d = Ib(b), e = d.length, f = 0; f < e; f++)c.remove(d[f]);
        return c
    }

    q.F = function () {
        return this.k.F()
    };
    q.$ = function () {
        return new U(this)
    };
    q.J = function () {
        return this.k.J(n)
    };
    function Ob(a) {
        if (a != m)try {
            a.clear()
        } catch (b) {
            h(Error("Input graph is not a jsnx graph type"))
        } else a = new M;
        return a
    }

    function Pb(a, b, c) {
        var d = m;
        if (a.hasOwnProperty("adj"))try {
            return d = Qb(a.adj, b, a.m()), "graph"in a && "object" === r(a.graph) && (d.graph = cb(a.graph)), "node"in a && "object" === r(a.node) && (d.node = Xa(a.node, function (a) {
                return cb(a)
            })), d
        } catch (e) {
            h(Error("Input is not a correct jsnx graph"))
        }
        if ("object" === r(a))try {
            return Qb(a, b, c)
        } catch (f) {
            try {
                return Rb(a, b)
            } catch (g) {
                h(Error("Input is not known type."))
            }
        }
        if (t(a))try {
            return Sb(a, b)
        } catch (l) {
            h(Error("Input is not valid edge list"))
        }
        return d
    }

    v("jsnx.to_networkx_graph", Pb);
    v("jsnx.convert_to_undirected", function (a) {
        return a.O()
    });
    v("jsnx.convert_to_undirected", function (a) {
        return a.C()
    });
    v("jsnx.to_dict_of_lists", function (a, b) {
        function c(a) {
            return 0 <= sa(b, a)
        }

        var d = {};
        b != m ? b = P(b) : (b = a, c = function (a) {
            return b.l(a)
        });
        N(b, function (b) {
            d[b] = ta(a.K(b), c)
        });
        return d
    });
    function Rb(a, b) {
        var c = Ob(b);
        c.j(a);
        if (c.m() && !c.c()) {
            var d = {};
            C(a, function (a, b) {
                y(a, function (a) {
                    a in d || c.a(b, a)
                });
                d[b] = 1
            })
        } else {
            var e = [];
            C(a, function (a, b) {
                y(a, function (a) {
                    e.push([b, a])
                })
            });
            c.b(e)
        }
        return c
    }

    function Qb(a, b, c) {
        var d = Ob(b), e, f;
        d.j(a);
        c ? d.c() ? (d.m() ? (e = [], C(a, function (a, b) {
            t(a) && h(Error());
            C(a, function (a, c) {
                C(a, function (a, d) {
                    e.push([b, c, d, a])
                })
            })
        })) : (e = [], C(a, function (a, b) {
            t(a) && h(Error());
            C(a, function (a, c) {
                C(a, function (a) {
                    e.push([b, c, a])
                })
            })
        })), d.b(e)) : d.m() ? (f = new U, C(a, function (a, b) {
            t(a) && h(Error());
            C(a, function (a, c) {
                f.contains([b, c].toString()) || (e = [], C(a, function (a, d) {
                    e.push([b, c, d, a])
                }), d.b(e), f.add([c, b].toString()))
            })
        })) : (f = new U, C(a, function (a, b) {
            t(a) && h(Error());
            C(a, function (a, c) {
                f.contains([b, c].toString()) || (e = [], C(a, function (a) {
                    e.push([b, c, a])
                }), d.b(e), f.add([c, b].toString()))
            })
        })) : d.m() && !d.c() ? (f = new U, C(a, function (a, b) {
            t(a) && h(Error());
            C(a, function (a, c) {
                f.contains([b, c].toString()) || (d.a(b, c, a), f.add([c, b].toString()))
            })
        })) : (e = [], C(a, function (a, b) {
            t(a) && h(Error());
            C(a, function (a, c) {
                e.push([b, c, a])
            })
        }), d.b(e));
        return d
    }

    function Sb(a, b) {
        var c = Ob(b);
        c.b(a);
        return c
    };
    function Ub(a) {
        this.name = "JSNetworkXException";
        this.message = a
    }

    Ub.prototype = Error();
    Ub.prototype.constructor = Ub;
    v("jsnx.JSNetworkXException", Ub);
    function X(a) {
        Ub.call(this, a);
        this.name = "JSNetworkXError"
    }

    ra(X, Ub);
    v("jsnx.JSNetworkXError", X);
    function Vb(a) {
        Ub.call(this, a);
        this.name = "JSNetworkXPointlessConcept"
    }

    ra(Vb, Ub);
    v("jsnx.JSNetworkXPointlessConcept", Vb);
    function Wb(a) {
        Ub.call(this, a);
        this.name = "JSNetworkXAlgorithmError"
    }

    ra(Wb, Ub);
    v("jsnx.JSNetworkXAlgorithmError", Wb);
    function Xb(a) {
        Wb.call(this, a);
        this.name = "JSNetworkXUnfeasible"
    }

    ra(Xb, Wb);
    v("jsnx.JSNetworkXUnfeasible", Xb);
    function Yb(a) {
        Xb.call(this, a);
        this.name = "JSNetworkXNoPath"
    }

    ra(Yb, Xb);
    v("jsnx.JSNetworkXNoPath", Yb);
    function Zb(a) {
        Wb.call(this, a);
        this.name = "JSNetworkXUnbounded"
    }

    ra(Zb, Wb);
    v("jsnx.JSNetworkXUnbounded", Zb);
    function $b(a) {
        var b = [];
        ac(new bc, a, b);
        return b.join("")
    }

    function bc() {
        this.ba = aa
    }

    function ac(a, b, c) {
        switch (typeof b) {
            case "string":
                cc(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (b == m) {
                    c.push("null");
                    break
                }
                if (ga(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++)c.push(e), e = b[f], ac(a, a.ba ? a.ba.call(b, String(f), e) : e, c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b)Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), cc(f, c), c.push(":"),
                    ac(a, a.ba ? a.ba.call(b, f, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                h(Error("Unknown type: " + typeof b))
        }
    }

    var dc = {'"': '\\"', "\\": "\\\\", "/": "\\/", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\x0B": "\\u000b"}, ec = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function cc(a, b) {
        b.push('"', a.replace(ec, function (a) {
            if (a in dc)return dc[a];
            var b = a.charCodeAt(0), e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return dc[a] = e + b.toString(16)
        }), '"')
    };
    function M(a, b) {
        if (!(this instanceof M))return new M(a, b);
        this.graph = {};
        this.node = {};
        this.adj = {};
        a != m && Pb(a, this);
        I(this.graph, b || {});
        this.edge = this.adj
    }

    v("jsnx.classes.Graph", M);
    v("jsnx.Graph", M);
    M.__name__ = "Graph";
    M.prototype.za = m;
    M.prototype.graph = M.prototype.za;
    M.prototype.ka = m;
    M.prototype.node = M.prototype.ka;
    M.prototype.ta = m;
    M.prototype.adj = M.prototype.ta;
    M.prototype.xa = m;
    M.prototype.edge = M.prototype.xa;
    M.prototype.name = function (a) {
        if (s(a))this.graph.name = a.toString(); else return this.graph.name || ""
    };
    M.prototype.name = M.prototype.name;
    M.prototype.toString = function () {
        return this.name()
    };
    M.prototype.toString = M.prototype.toString;
    M.prototype.i = function (a) {
        a in this.adj || h({name: "KeyError", message: "Graph does not contain node " + a + "."});
        return this.adj[a]
    };
    M.prototype.get_node = M.prototype.i;
    M.prototype.D = function (a, b) {
        b != m || (b = {});
        "object" !== r(b) && h(new X("The attr_dict argument must be an object."));
        a in this.adj ? I(this.node[a], b || {}) : (this.adj[a] = {}, this.node[a] = b || {})
    };
    M.prototype.add_node = M.prototype.D;
    M.prototype.j = function (a, b) {
        var c, d, e, f, g;
        b != m || (b = {});
        N(a, function (a) {
            c = !(a in this.adj);
            ga(a) ? (d = a[0], e = a[1], d in this.adj ? (g = this.node[d], I(g, b, e)) : (this.adj[d] = {}, f = cb(b), I(f, e), this.node[d] = f)) : c ? (this.adj[a] = {}, this.node[a] = cb(b)) : I(this.node[a], b)
        }, this)
    };
    M.prototype.add_nodes_from = M.prototype.j;
    M.prototype.N = function (a) {
        var b = this.adj, c;
        a in this.node || h(new X("The node " + a + " is not in the graph"));
        c = F(b[a]);
        G(this.node, a);
        y(c, function (c) {
            G(b[c], a)
        });
        G(b, a)
    };
    M.prototype.remove_node = M.prototype.N;
    M.prototype.X = function (a) {
        var b = this.adj;
        N(a, function (a) {
            try {
                G(this.node, a), C(b[a], function (d, f) {
                    G(b[f], a)
                }), G(b, a)
            } catch (d) {
            }
        }, this)
    };
    M.prototype.remove_nodes_from = M.prototype.X;
    M.prototype.v = function (a) {
        return a ? T(this.node) : K(F(this.adj))
    };
    M.prototype.nodes_iter = M.prototype.v;
    M.prototype.nodes = function (a) {
        return Va(this.v(a))
    };
    M.prototype.nodes = M.prototype.nodes;
    M.prototype.M = function () {
        return E(this.adj)
    };
    M.prototype.number_of_nodes = M.prototype.M;
    M.prototype.A = function () {
        return E(this.adj)
    };
    M.prototype.order = M.prototype.A;
    M.prototype.l = function (a) {
        return!ga(a) && a in this.adj
    };
    M.prototype.has_node = M.prototype.l;
    M.prototype.a = function (a, b, c) {
        c = c || {};
        "object" !== r(c) && h(new X("The attr_dict argument must be an object."));
        a in this.adj || (this.adj[a] = {}, this.node[a] = {});
        b in this.adj || (this.adj[b] = {}, this.node[b] = {});
        var d = H(this.adj[a], b + "", {});
        I(d, c);
        this.adj[a][b] = d;
        this.adj[b][a] = d
    };
    M.prototype.add_edge = M.prototype.a;
    M.prototype.b = function (a, b) {
        b = b || {};
        "object" !== r(b) && h(new X("The attr_dict argument must be an object."));
        N(a, function (a) {
            var d = hb(a), e, f, g;
            3 === d ? (e = a[0], f = a[1], g = a[2]) : 2 === d ? (e = a[0], f = a[1], g = {}) : h(new X("Edge tuple " + a.toString() + " must be a 2-tuple or 3-tuple."));
            e in this.adj || (this.adj[e] = {}, this.node[e] = {});
            f in this.adj || (this.adj[f] = {}, this.node[f] = {});
            a = H(this.adj[e], f, {});
            I(a, b, g);
            this.adj[e][f] = a;
            this.adj[f][e] = a
        }, this)
    };
    M.prototype.add_edges_from = M.prototype.b;
    M.prototype.sa = function (a, b, c) {
        c = c || {};
        u(b) || (c = b, b = "weight");
        this.b(O(a, function (a) {
            var c = {};
            c[b] = a[2];
            s(c[b]) || h(new TypeError("Values must consist of three elements: " + $b(a)));
            return[a[0], a[1], c]
        }), c)
    };
    M.prototype.add_weighted_edges_from = M.prototype.sa;
    M.prototype.u = function (a, b) {
        try {
            G(this.adj[a], b), a != b && G(this.adj[b], a)
        } catch (c) {
            c instanceof TypeError && h(new X("The edge " + a + "-" + b + " is not in the graph")), h(c)
        }
    };
    M.prototype.remove_edge = M.prototype.u;
    M.prototype.B = function (a) {
        N(a, function (a) {
            var c = a[0];
            a = a[1];
            c in this.adj && a in this.adj[c] && (G(this.adj[c], a), c != a && G(this.adj[a], c))
        }, this)
    };
    M.prototype.remove_edges_from = M.prototype.B;
    M.prototype.H = function (a, b) {
        return a in this.adj && b in this.adj[a]
    };
    M.prototype.has_edge = M.prototype.H;
    M.prototype.K = function (a) {
        a in this.adj || h(new X("The node " + a + " is not in the graph."));
        return P(this.adj[a])
    };
    M.prototype.neighbors = M.prototype.K;
    M.prototype.V = function (a) {
        a in this.adj || h(new X("The node " + a + " is not in the graph."));
        return K(this.adj[a])
    };
    M.prototype.neighbors_iter = M.prototype.V;
    M.prototype.t = function (a, b) {
        return Va(this.e(a, b))
    };
    M.prototype.edges = M.prototype.t;
    M.prototype.e = function (a, b) {
        ha(a) && (b = a, a = m);
        var c = {}, d, e;
        d = a != m ? O(this.d(a), function (a) {
            return[a, this.adj[a]]
        }, this) : T(this.adj);
        return b ? R(d, function (a) {
            e = a[0];
            var b = new A, d = T(a[1]);
            b.next = function () {
                try {
                    return d.next()
                } catch (a) {
                    a === z && (c[e] = 1), h(a)
                }
            };
            return b
        }, function (a) {
            if (!(a[0]in c))return[e, a[0], a[1]]
        }) : R(d, function (a) {
            e = a[0];
            var b = new A, d = K(a[1]);
            b.next = function () {
                try {
                    return d.next()
                } catch (a) {
                    a === z && (c[e] = 1), h(a)
                }
            };
            return b
        }, function (a) {
            if (!(a in c))return[e, a]
        })
    };
    M.prototype.edges_iter = M.prototype.e;
    M.prototype.P = function (a, b, c) {
        s(c) || (c = m);
        return a in this.adj ? H(this.adj[a], b.toString(), c) : c
    };
    M.prototype.get_edge_data = M.prototype.P;
    M.prototype.ua = function () {
        return P(O(this.s(), function (a) {
            return F(a[1])
        }))
    };
    M.prototype.adjacency_list = M.prototype.ua;
    M.prototype.s = function () {
        return T(this.adj)
    };
    M.prototype.adjacency_iter = M.prototype.s;
    M.prototype.o = function (a, b) {
        return a != m && this.l(a) ? this.p(a, b).next()[1] : fb(Va(this.p(a, b)))
    };
    M.prototype.degree = M.prototype.o;
    M.prototype.p = function (a, b) {
        var c;
        c = a != m ? O(this.d(a), function (a) {
            return[a, this.adj[a]]
        }, this) : T(this.adj);
        return b ? O(c, function (a) {
            var c = a[0];
            a = a[1];
            var f = 0, g;
            for (g in a)f += +H(a[g], b, 1);
            f += +(c in a && H(a[c], b, 1));
            return[c, f]
        }) : O(c, function (a) {
            return[a[0], E(a[1]) + +(a[0]in a[1])]
        })
    };
    M.prototype.degree_iter = M.prototype.p;
    M.prototype.clear = function () {
        this.name("");
        ab(this.adj);
        ab(this.node);
        ab(this.graph)
    };
    M.prototype.clear = M.prototype.clear;
    M.prototype.copy = function () {
        return qb(this)
    };
    M.prototype.copy = M.prototype.copy;
    M.prototype.m = da(n);
    M.prototype.is_multigraph = M.prototype.m;
    M.prototype.c = da(n);
    M.prototype.is_directed = M.prototype.c;
    M.prototype.C = function () {
        var a = new Y;
        a.name(this.name());
        a.j(this);
        a.b(function () {
            var a;
            return R(this.s(), function (c) {
                a = c[0];
                return T(c[1])
            }, function (c) {
                return[a, c[0], S(c[1])]
            })
        }.call(this));
        a.graph = S(this.graph);
        a.node = S(this.node);
        return a
    };
    M.prototype.to_directed = M.prototype.C;
    M.prototype.O = function () {
        return qb(this)
    };
    M.prototype.to_undirected = M.prototype.O;
    M.prototype.w = function (a) {
        a = this.d(a);
        var b = new this.constructor, c = b.adj, d = this.adj;
        N(a, function (a) {
            var b = {};
            c[a] = b;
            C(d[a], function (d, l) {
                l in c && (b[l] = d, c[l][a] = d)
            })
        });
        N(b, function (a) {
            b.node[a] = this.node[a]
        }, this);
        b.graph = this.graph;
        return b
    };
    M.prototype.subgraph = M.prototype.w;
    M.prototype.Ea = function () {
        return ua(ta(ob(this.adj), function (a) {
            return a[0]in a[1]
        }), function (a) {
            return a[0]
        })
    };
    M.prototype.nodes_with_selfloops = M.prototype.Ea;
    M.prototype.Y = function (a) {
        return a ? ua(ta(ob(this.adj), function (a) {
            return a[0]in a[1]
        }), function (a) {
            var c = a[0];
            return[c, c, a[1][c]]
        }) : ua(ta(ob(this.adj), function (a) {
            return a[0]in a[1]
        }), function (a) {
            return[a[0], a[0]]
        })
    };
    M.prototype.selfloop_edges = M.prototype.Y;
    M.prototype.Fa = function () {
        return this.Y().length
    };
    M.prototype.number_of_selfloops = M.prototype.Fa;
    M.prototype.size = function (a) {
        var b = J.q.apply(m, Za(this.o(m, a))) / 2;
        return a != m ? b : Math.floor(b)
    };
    M.prototype.size = M.prototype.size;
    M.prototype.L = function (a, b) {
        return a == m ? Math.floor(this.size()) : b in this.adj[a] ? 1 : 0
    };
    M.prototype.number_of_edges = M.prototype.L;
    M.prototype.ra = function (a, b) {
        var c = P(a), d = c[0], c = O(Fa(c, 1), function (a) {
            return[d, a]
        });
        this.b(c, b)
    };
    M.prototype.add_star = M.prototype.ra;
    M.prototype.qa = function (a, b) {
        var c = P(a), c = Oa(Fa(c, 0, c.length - 1), Fa(c, 1));
        this.b(c, b)
    };
    M.prototype.add_path = M.prototype.qa;
    M.prototype.pa = function (a, b) {
        var c = P(a), c = Oa(c, Aa(Fa(c, 1), [c[0]]));
        this.b(c, b)
    };
    M.prototype.add_cycle = M.prototype.pa;
    M.prototype.d = function (a) {
        return a != m ? this.l(a) ? K([a.toString()]) : function (a, c) {
            var d = new A, e = R(a, function (a) {
                if (a in c)return a.toString()
            });
            d.next = function () {
                try {
                    return e.next()
                } catch (a) {
                    a instanceof TypeError && h(new X("nbunch is not a node or a sequence of nodes")), h(a)
                }
            };
            return d
        }(a, this.adj) : K(this.adj)
    };
    M.prototype.nbunch_iter = M.prototype.d;
    function Y(a, b) {
        if (!(this instanceof Y))return new Y(a, b);
        this.graph = {};
        this.node = {};
        this.adj = {};
        this.pred = {};
        this.succ = this.adj;
        a != m && Pb(a, this);
        I(this.graph, b || {});
        this.edge = this.adj
    }

    v("jsnx.classes.DiGraph", Y);
    v("jsnx.DiGraph", Y);
    ra(Y, M);
    Y.__name__ = "DiGraph";
    Y.prototype.D = function (a, b) {
        b != m || (b = {});
        "object" !== r(b) && h(new X("The attr_dict argument must be an object."));
        a in this.succ ? I(this.node[a], b) : (this.succ[a] = {}, this.pred[a] = {}, this.node[a] = b)
    };
    Y.prototype.add_node = Y.prototype.D;
    Y.prototype.j = function (a, b) {
        var c, d, e, f, g;
        b != m || (b = {});
        N(K(a), function (a) {
            c = !(a in this.succ);
            ga(a) ? (d = a[0], e = a[1], d in this.succ ? (g = this.node[d], I(g, b, e)) : (this.succ[d] = {}, this.pred[d] = {}, f = cb(b), I(f, e), this.node[d] = f)) : c ? (this.succ[a] = {}, this.pred[a] = {}, this.node[a] = cb(b)) : I(this.node[a], b)
        }, this)
    };
    Y.prototype.add_nodes_from = Y.prototype.j;
    Y.prototype.N = function (a) {
        a in this.node || h(new X("The node " + a + " is not in the graph"));
        var b = this.succ[a];
        G(this.node, a);
        C(b, function (b, d) {
            G(this.pred[d], a)
        }, this);
        G(this.succ, a);
        C(this.pred[a], function (b, d) {
            G(this.succ[d], a)
        }, this);
        G(this.pred, a)
    };
    Y.prototype.remove_node = Y.prototype.N;
    Y.prototype.X = function (a) {
        var b;
        N(a, function (a) {
            a in this.succ && (b = this.succ[a], G(this.node, a), C(b, function (b, e) {
                G(this.pred[e], a)
            }, this), G(this.succ, a), C(this.pred[a], function (b, e) {
                G(this.succ[e], a)
            }, this), G(this.pred, a))
        }, this)
    };
    Y.prototype.remove_nodes_from = Y.prototype.X;
    Y.prototype.a = function (a, b, c) {
        c = c || {};
        "object" !== r(c) && h(new X("The attr_dict argument must be an object."));
        a in this.succ || (this.succ[a] = {}, this.pred[a] = {}, this.node[a] = {});
        b in this.succ || (this.succ[b] = {}, this.pred[b] = {}, this.node[b] = {});
        var d = H(this.adj[a], "" + b, {});
        I(d, c);
        this.succ[a][b] = d;
        this.pred[b][a] = d
    };
    Y.prototype.add_edge = Y.prototype.a;
    Y.prototype.b = function (a, b) {
        b = b || {};
        "object" !== r(b) && h(new X("The attr_dict argument must be an object."));
        N(a, function (a) {
            var d = hb(a), e, f, g;
            3 === d ? (e = a[0], f = a[1], g = a[2]) : 2 === d ? (e = a[0], f = a[1], g = {}) : h(new X("Edge tuple " + a.toString() + " must be a 2-tuple or 3-tuple."));
            e in this.succ || (this.succ[e] = {}, this.pred[e] = {}, this.node[e] = {});
            f in this.succ || (this.succ[f] = {}, this.pred[f] = {}, this.node[f] = {});
            a = H(this.adj[e], f, {});
            I(a, b, g);
            this.succ[e][f] = a;
            this.pred[f][e] = a
        }, this)
    };
    Y.prototype.add_edges_from = Y.prototype.b;
    Y.prototype.u = function (a, b) {
        try {
            G(this.succ[a], b), G(this.pred[b], a)
        } catch (c) {
            c instanceof TypeError && h(new X("The edge " + a + "-" + b + " is not in the graph")), h(c)
        }
    };
    Y.prototype.remove_edge = Y.prototype.u;
    Y.prototype.B = function (a) {
        N(a, function (a) {
            var c = a[0];
            a = a[1];
            c in this.succ && a in this.succ[c] && (G(this.succ[c], a), G(this.pred[a], c))
        }, this)
    };
    Y.prototype.remove_edges_from = Y.prototype.B;
    Y.prototype.Ba = function (a, b) {
        return a in this.succ && b in this.succ[a]
    };
    Y.prototype.has_successor = Y.prototype.Ba;
    Y.prototype.Aa = function (a, b) {
        return a in this.pred && b in this.pred[a]
    };
    Y.prototype.has_predecessor = Y.prototype.Aa;
    Y.prototype.fa = function (a) {
        a in this.succ || h(new X("The node " + a + " is not in the digraph."));
        return K(this.succ[a])
    };
    Y.prototype.successors_iter = Y.prototype.fa;
    Y.prototype.ma = function (a) {
        a in this.pred || h(new X("The node " + a + " is not in the digraph."));
        return K(this.pred[a])
    };
    Y.prototype.predecessors_iter = Y.prototype.ma;
    Y.prototype.na = function (a) {
        a in this.succ || h(new X("The node " + a + " is not in the digraph."));
        return P(this.succ[a])
    };
    Y.prototype.successors = Y.prototype.na;
    Y.prototype.Ga = function (a) {
        a in this.succ || h(new X("The node " + a + " is not in the digraph."));
        return P(this.pred[a])
    };
    Y.prototype.predecessors = Y.prototype.Ga;
    Y.prototype.K = Y.prototype.na;
    Y.prototype.neighbors = Y.prototype.K;
    Y.prototype.V = Y.prototype.fa;
    Y.prototype.neighbors_iter = Y.prototype.V;
    Y.prototype.e = function (a, b) {
        ha(a) && (b = a, a = m);
        var c, d, e;
        c = a != m ? O(this.d(a), function (a) {
            return[a, this.adj[a]]
        }, this) : ob(this.adj);
        return b ? R(c, function (a) {
            d = a[0];
            e = a[1];
            return T(e)
        }, function (a) {
            return[d, a[0], a[1]]
        }) : R(c, function (a) {
            d = a[0];
            e = a[1];
            return T(e)
        }, function (a) {
            return[d, a[0]]
        })
    };
    Y.prototype.edges_iter = Y.prototype.e;
    Y.prototype.aa = Y.prototype.e;
    Y.prototype.out_edges_iter = Y.prototype.aa;
    Y.prototype.da = M.prototype.t;
    Y.prototype.out_edges = Y.prototype.da;
    Y.prototype.I = function (a, b) {
        ha(a) && (b = a, a = m);
        var c, d;
        c = a != m ? O(this.d(a), function (a) {
            return[a, this.pred[a]]
        }, this) : ob(this.pred);
        return b ? R(c, function (a) {
            d = a[0];
            return T(a[1])
        }, function (a) {
            return[a[0], d, a[1]]
        }) : R(c, function (a) {
            d = a[0];
            return T(a[1])
        }, function (a) {
            return[a[0], d]
        })
    };
    Y.prototype.in_edges_iter = Y.prototype.I;
    Y.prototype.R = function (a, b) {
        return P(this.I(a, b))
    };
    Y.prototype.in_edges = Y.prototype.R;
    Y.prototype.p = function (a, b) {
        var c;
        c = a != m ? jb(O(this.d(a), function (a) {
            return[a, this.succ[a]]
        }, this), O(this.d(a), function (a) {
            return[a, this.pred[a]]
        }, this)) : jb(T(this.succ), T(this.pred));
        return u(b) ? O(c, function (a) {
            var c = a[0][1], f = a[1][1], g = 0, l;
            for (l in c)g += +H(c[l], b, 1);
            for (l in f)g += +H(f[l], b, 1);
            return[a[0][0], g]
        }) : O(c, function (a) {
            return[a[0][0], hb(a[0][1]) + hb(a[1][1])]
        })
    };
    Y.prototype.degree_iter = Y.prototype.p;
    Y.prototype.Q = function (a, b) {
        var c;
        c = a != m ? O(this.d(a), function (a) {
            return[a, this.pred[a]]
        }, this) : T(this.pred);
        return b != m ? O(c, function (a) {
            var c = 0, f = a[1], g;
            for (g in f)c += +H(f[g], b, 1);
            return[a[0], c]
        }) : O(c, function (a) {
            return[a[0], E(a[1])]
        })
    };
    Y.prototype.in_degree_iter = Y.prototype.Q;
    Y.prototype.W = function (a, b) {
        var c;
        c = a != m ? O(this.d(a), function (a) {
            return[a, this.succ[a]]
        }, this) : T(this.succ);
        return b != m ? O(c, function (a) {
            var c = 0, f = a[1], g;
            for (g in f)c += +H(f[g], b, 1);
            return[a[0], c]
        }) : O(c, function (a) {
            return[a[0], E(a[1])]
        })
    };
    Y.prototype.out_degree_iter = Y.prototype.W;
    Y.prototype.ia = function (a, b) {
        return a != m && this.l(a) ? this.Q(a, b).next()[1] : fb(this.Q(a, b))
    };
    Y.prototype.in_degree = Y.prototype.ia;
    Y.prototype.la = function (a, b) {
        return a != m && this.l(a) ? this.W(a, b).next()[1] : fb(this.W(a, b))
    };
    Y.prototype.out_degree = Y.prototype.la;
    Y.prototype.clear = function () {
        ab(this.succ);
        ab(this.pred);
        ab(this.node);
        ab(this.graph)
    };
    Y.prototype.clear = Y.prototype.clear;
    Y.prototype.m = da(n);
    Y.prototype.is_multigraph = Y.prototype.m;
    Y.prototype.c = da(k);
    Y.prototype.is_directed = Y.prototype.c;
    Y.prototype.C = function () {
        return qb(this)
    };
    Y.prototype.to_directed = Y.prototype.C;
    Y.prototype.O = function (a) {
        var b = new M;
        b.name(this.name());
        b.j(this);
        var c = this.pred, d;
        a ? b.b(R(this.s(), function (a) {
            d = a[0];
            return T(a[1])
        }, function (a) {
            if (a[0]in c[d])return[d, a[0], S(a[1])]
        })) : b.b(R(this.s(), function (a) {
            d = a[0];
            return T(a[1])
        }, function (a) {
            return[d, a[0], S(a[1])]
        }));
        b.graph = S(this.graph);
        b.node = S(this.node);
        return b
    };
    Y.prototype.to_undirected = Y.prototype.O;
    Y.prototype.reverse = function (a) {
        (a = !s(a) || a) ? (a = new this.constructor(m, {name: "Reverse of (" + this.name() + ")"}), a.j(this), a.b(O(this.e(m, k), function (a) {
            return[a[1], a[0], S(a[2])]
        })), a.graph = S(this.graph), a.node = S(this.node)) : (a = this.succ, this.succ = this.pred, this.pred = a, this.adj = this.succ, a = this);
        return a
    };
    Y.prototype.reverse = Y.prototype.reverse;
    Y.prototype.w = function (a) {
        a = this.d(a);
        var b = new this.constructor, c = b.succ, d = b.pred, e = this.succ;
        N(a, function (a) {
            c[a] = {};
            d[a] = {}
        });
        N(c, function (a) {
            var b = c[a];
            C(e[a], function (e, p) {
                p in c && (b[p] = e, d[p][a] = e)
            })
        });
        N(b, function (a) {
            b.node[a] = this.node[a]
        }, this);
        b.graph = this.graph;
        return b
    };
    Y.prototype.subgraph = Y.prototype.w;
    function fc(a, b) {
        var c = Q(a), d, e, f = new A;
        try {
            e = [c.next()]
        } catch (g) {
            return g !== z && h(g), f
        }
        f.next = function () {
            0 === e.length && h(z);
            return e.splice(0, 1)[0]
        };
        return R(f, function (a) {
            d = a;
            return Q(b)
        }, function () {
            try {
                var a = c.next();
                e.push(a);
                return[d, a]
            } catch (b) {
                b !== z && h(b)
            }
        })
    }

    function gc(a, b, c) {
        c = hc(b, c);
        c.b(fc(b, a));
        return c
    }

    v("jsnx.generators.classic.full_rary_tree", gc);
    v("jsnx.full_rary_tree", gc);
    function ic(a, b, c) {
        b = 1 === a ? 2 : Math.floor((1 - Math.pow(a, b + 1)) / (1 - a));
        c = hc(b, c);
        c.b(fc(b, a));
        return c
    }

    v("jsnx.generators.classic.balanced_tree", ic);
    v("jsnx.balanced_tree", ic);
    function jc(a, b) {
        var c = hc(a, b);
        c.name("complete_graph(" + a + ")");
        1 < a && c.b(c.c() ? mb(Q(a)) : lb(Q(a)));
        return c
    }

    v("jsnx.generators.classic.complete_graph", jc);
    v("jsnx.complete_graph", jc);
    function kc(a, b) {
        var c = lc(a, b);
        c.name("cycle_graph(" + a + ")");
        1 < a && c.a(a - 1, 0);
        return c
    }

    v("jsnx.generators.classic.cycle_graph", kc);
    v("jsnx.cycle_graph", kc);
    function hc(a, b) {
        a instanceof M && (b = a, a = m);
        a != m || (a = 0);
        var c;
        b != m ? (c = b, c.clear()) : c = new M;
        c.j(Q(a));
        c.name("empty_graph(" + a + ")");
        return c
    }

    v("jsnx.generators.classic.empty_graph", hc);
    v("jsnx.empty_graph", hc);
    function mc(a, b, c, d) {
        var e = hc(0, d);
        e.name("grid_2d_graph");
        d = Va(Q(a));
        var f = Va(Q(b));
        y(d, function (a) {
            y(f, function (b) {
                e.D([a, b].toString())
            })
        });
        B(Q(1, a), function (a) {
            y(f, function (b) {
                e.a([a, b].toString(), [a - 1, b].toString())
            })
        });
        y(d, function (a) {
            B(Q(1, b), function (b) {
                e.a([a, b].toString(), [a, b - 1].toString())
            })
        });
        e.c() && (B(Q(0, a - 1), function (a) {
            y(f, function (b) {
                e.a([a, b].toString(), [a + 1, b].toString())
            })
        }), y(d, function (a) {
            B(Q(0, b - 1), function (b) {
                e.a([a, b].toString(), [a, b + 1].toString())
            })
        }));
        c && (2 < b && (y(d, function (a) {
            e.a([a,
                0].toString(), [a, b - 1].toString())
        }), e.c() && y(d, function (a) {
            e.a([a, b - 1].toString(), [a, 0].toString())
        })), 2 < a && (y(f, function (b) {
            e.a([0, b].toString(), [a - 1, b].toString())
        }), e.c() && y(f, function (b) {
            e.a([a - 1, b].toString(), [0, b].toString())
        })), e.name("periodic_grid_2d_graph(" + a + "," + b + ")"));
        return e
    }

    v("jsnx.generators.classic.grid_2d_graph", mc);
    v("jsnx.grid_2d_graph", mc);
    function nc(a) {
        a = hc(0, a);
        a.name("null_graph()");
        return a
    }

    v("jsnx.generators.classic.null_graph", nc);
    v("jsnx.null_graph", nc);
    function lc(a, b) {
        var c = hc(a, b);
        c.name("path_graph(" + a + ")");
        c.b(Sa(Q(a - 1), function (a) {
            return[a, a + 1]
        }));
        return c
    }

    v("jsnx.generators.classic.path_graph", lc);
    v("jsnx.path_graph", lc);
    function oc(a) {
        a = hc(1, a);
        a.name("null_graph()");
        return a
    }

    v("jsnx.generators.classic.trivial_graph", oc);
    v("jsnx.trivial_graph", oc);
    v("jsnx.fast_gnp_random_graph", function (a, b, c) {
        c != m || (c = n);
        var d = hc(a);
        d.name("fast_gnp_random_graph(" + a + "," + b + ")");
        if (0 >= b || 1 <= b)return pc(a, b, c);
        var e = 1, f = -1;
        b = Math.log(1 - b);
        if (c)for (d = new Y(d); e < a;) {
            c = Math.log(1 - Math.random());
            f = f + 1 + Math.floor(c / b);
            for (e === f && (f += 1); f >= a && e < a;)f -= a, e += 1, e == f && (f += 1);
            e < a && d.a(e, f)
        } else for (; e < a;) {
            c = Math.log(1 - Math.random());
            for (f = f + 1 + Math.floor(c / b); f >= e && e < a;)f -= e, e += 1;
            e < a && d.a(e, f)
        }
        return d
    });
    function pc(a, b, c) {
        var d;
        d = c ? new Y : new M;
        d.j(Q(a));
        d.name("gnp_random_graph(" + a + "," + b + ")");
        if (0 >= b)return d;
        if (1 <= b)return jc(a, d);
        a = d.c() ? mb(Q(a)) : lb(Q(a));
        B(a, function (a) {
            Math.random() < b && d.a(a[0], a[1])
        });
        return d
    }

    v("jsnx.gnp_random_graph", pc);
    v("jsnx.binomial_graph", pc);
    v("jsnx.erdos_renyi_graph", pc);
    v("jsnx.havel_hakimi_graph", function (a, b) {
        qc(a) || h(new X("Invalid degree sequence"));
        b != m && (b.c() && h(new X("Directed Graph not supported")), b.m() && h(new X("Havel-Hakimi requires simple graph")));
        var c = a.length, d = hc(c, b);
        if (0 === c || 0 === Math.max.apply(m, a))return d;
        for (c = Va(O(d, function (b) {
            return[a[b], b]
        })); 0 < c.length;) {
            c.sort(function (a, b) {
                return a[0] !== b[0] ? a[0] - b[0] : +a[1] - +b[1]
            });
            if (0 > c[0][0])return n;
            var e = c.pop();
            if (0 === e[0])break;
            if (e[0] > c.length)return n;
            for (var f = c.length, g = f - e[0]; g < f; g++)d.a(e[1],
                c[g][1]), c[g][0] -= 1
        }
        d.name("havel_hakimi_graph " + d.A() + " nodes " + d.size() + " edges");
        return d
    });
    function rc() {
        var a = new M;
        a.j(Q(34));
        a.name("Zachary's Karate Club");
        var b = 0;
        y("0 1 1 1 1 1 1 1 1 0 1 1 1 1 0 0 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 1 0 0;1 0 1 1 0 0 0 1 0 0 0 0 0 1 0 0 0 1 0 1 0 1 0 0 0 0 0 0 0 0 1 0 0 0;1 1 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 1 0;1 1 1 0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1;0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1;1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1;0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1;0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1;0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1;1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1;0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1;1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1;0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 0 1 1;0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 1 0 0;0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 1 0 0;0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1;0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1;0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1;0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 0 1 1;0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1;1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 1 1;0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 1 0 0 1 0 1 0 1 1 0 0 0 0 0 1 1 1 0 1;0 0 0 0 0 0 0 0 1 1 0 0 0 1 1 1 0 0 1 1 1 0 1 1 0 0 1 1 1 1 1 1 1 0".split(";"),
            function (c) {
                N(c.split(" "), function (c, e) {
                    "1" === c && a.a(b, e)
                });
                b += 1
            });
        return a
    }

    v("jsnx.generators.social.karate_club_graph", rc);
    v("jsnx.karate_club_graph", rc);
    function sc() {
        var a = new M;
        a.j("Evelyn Jefferson;Laura Mandeville;Theresa Anderson;Brenda Rogers;Charlotte McDowd;Frances Anderson;Eleanor Nye;Pearl Oglethorpe;Ruth DeSand;Verne Sanderson;Myra Liddel;Katherina Rogers;Sylvia Avondale;Nora Fayette;Helen Lloyd;Dorothy Murchison;Olivia Carleton;Flora Price".split(";"), {wa: 0});
        a.j("E1 E2 E3 E4 E5 E6 E7 E8 E9 E10 E11 E12 E13 E14".split(" "), {wa: 1});
        a.b([
            ["Evelyn Jefferson", "E1"],
            ["Evelyn Jefferson", "E2"],
            ["Evelyn Jefferson", "E3"],
            ["Evelyn Jefferson", "E4"],
            ["Evelyn Jefferson", "E5"],
            ["Evelyn Jefferson", "E6"],
            ["Evelyn Jefferson", "E8"],
            ["Evelyn Jefferson", "E9"],
            ["Laura Mandeville", "E1"],
            ["Laura Mandeville", "E2"],
            ["Laura Mandeville", "E3"],
            ["Laura Mandeville", "E5"],
            ["Laura Mandeville", "E6"],
            ["Laura Mandeville", "E7"],
            ["Laura Mandeville", "E8"],
            ["Theresa Anderson", "E2"],
            ["Theresa Anderson", "E3"],
            ["Theresa Anderson", "E4"],
            ["Theresa Anderson", "E5"],
            ["Theresa Anderson", "E6"],
            ["Theresa Anderson", "E7"],
            ["Theresa Anderson", "E8"],
            ["Theresa Anderson", "E9"],
            ["Brenda Rogers",
                "E1"],
            ["Brenda Rogers", "E3"],
            ["Brenda Rogers", "E4"],
            ["Brenda Rogers", "E5"],
            ["Brenda Rogers", "E6"],
            ["Brenda Rogers", "E7"],
            ["Brenda Rogers", "E8"],
            ["Charlotte McDowd", "E3"],
            ["Charlotte McDowd", "E4"],
            ["Charlotte McDowd", "E5"],
            ["Charlotte McDowd", "E7"],
            ["Frances Anderson", "E3"],
            ["Frances Anderson", "E5"],
            ["Frances Anderson", "E6"],
            ["Frances Anderson", "E8"],
            ["Eleanor Nye", "E5"],
            ["Eleanor Nye", "E6"],
            ["Eleanor Nye", "E7"],
            ["Eleanor Nye", "E8"],
            ["Pearl Oglethorpe", "E6"],
            ["Pearl Oglethorpe", "E8"],
            ["Pearl Oglethorpe",
                "E9"],
            ["Ruth DeSand", "E5"],
            ["Ruth DeSand", "E7"],
            ["Ruth DeSand", "E8"],
            ["Ruth DeSand", "E9"],
            ["Verne Sanderson", "E7"],
            ["Verne Sanderson", "E8"],
            ["Verne Sanderson", "E9"],
            ["Verne Sanderson", "E12"],
            ["Myra Liddel", "E8"],
            ["Myra Liddel", "E9"],
            ["Myra Liddel", "E10"],
            ["Myra Liddel", "E12"],
            ["Katherina Rogers", "E8"],
            ["Katherina Rogers", "E9"],
            ["Katherina Rogers", "E10"],
            ["Katherina Rogers", "E12"],
            ["Katherina Rogers", "E13"],
            ["Katherina Rogers", "E14"],
            ["Sylvia Avondale", "E7"],
            ["Sylvia Avondale", "E8"],
            ["Sylvia Avondale",
                "E9"],
            ["Sylvia Avondale", "E10"],
            ["Sylvia Avondale", "E12"],
            ["Sylvia Avondale", "E13"],
            ["Sylvia Avondale", "E14"],
            ["Nora Fayette", "E6"],
            ["Nora Fayette", "E7"],
            ["Nora Fayette", "E9"],
            ["Nora Fayette", "E10"],
            ["Nora Fayette", "E11"],
            ["Nora Fayette", "E12"],
            ["Nora Fayette", "E13"],
            ["Nora Fayette", "E14"],
            ["Helen Lloyd", "E7"],
            ["Helen Lloyd", "E8"],
            ["Helen Lloyd", "E10"],
            ["Helen Lloyd", "E11"],
            ["Helen Lloyd", "E12"],
            ["Dorothy Murchison", "E8"],
            ["Dorothy Murchison", "E9"],
            ["Olivia Carleton", "E9"],
            ["Olivia Carleton", "E11"],
            ["Flora Price", "E9"],
            ["Flora Price", "E11"]
        ]);
        return a
    }

    v("jsnx.generators.social.davis_southern_women_graph", sc);
    v("jsnx.davis_southern_women_graph", sc);
    function tc() {
        var a = new M;
        a.a("Acciaiuoli", "Medici");
        a.a("Castellani", "Peruzzi");
        a.a("Castellani", "Strozzi");
        a.a("Castellani", "Barbadori");
        a.a("Medici", "Barbadori");
        a.a("Medici", "Ridolfi");
        a.a("Medici", "Tornabuoni");
        a.a("Medici", "Albizzi");
        a.a("Medici", "Salviati");
        a.a("Salviati", "Pazzi");
        a.a("Peruzzi", "Strozzi");
        a.a("Peruzzi", "Bischeri");
        a.a("Strozzi", "Ridolfi");
        a.a("Strozzi", "Bischeri");
        a.a("Ridolfi", "Tornabuoni");
        a.a("Tornabuoni", "Guadagni");
        a.a("Albizzi", "Ginori");
        a.a("Albizzi", "Guadagni");
        a.a("Bischeri",
            "Guadagni");
        a.a("Guadagni", "Lamberteschi");
        return a
    }

    v("jsnx.generators.social.florentine_families_graph", tc);
    v("jsnx.florentine_families_graph", tc);
    function uc(a, b) {
        a.c() && h(new X("triangles() is not defined for directed graphs."));
        if (b != m && a.l(b))return Math.floor(vc(a, b).next()[2] / 2);
        var c = {};
        B(vc(a, b), function (a) {
            c[a[0]] = Math.floor(a[2] / 2)
        });
        return c
    }

    v("jsnx.triangles", uc);
    function vc(a, b) {
        a.m() && h(new X("Not defined for multigraphs."));
        var c;
        c = b != m ? R(a.d(b), function (b) {
            return[b, a.i(b)]
        }) : T(a.adj);
        return Sa(c, function (b) {
            var c = new U(F(b[1])), f = 0;
            c.remove(b[0]);
            B(c, function (b) {
                var d = new U(F(a.i(b)));
                d.remove(b);
                f += Mb(c, d).h()
            });
            return[b[0], c.h(), f]
        })
    }

    function wc(a, b, c) {
        a.m() && h(new X("Not defined for multigraphs."));
        u(c) || (c = "weight");
        var d;
        d = 0 === a.t().length ? 1 : kb(a.t(k), function (a) {
            return H(a[2], c, 1)
        });
        b = b != m ? R(a.d(b), function (b) {
            return[b, a.i(b)]
        }) : T(a.adj);
        return Sa(b, function (b) {
            var f = b[0], g = new U(F(b[1]));
            g.remove(f);
            var l = 0, p = new U;
            B(g, function (b) {
                var e = H(a.i(f)[b], c, 1) / d;
                p.add(b);
                var L = Nb(new U(F(a.i(b))), p);
                B(Mb(g, L), function (g) {
                    var p = H(a.i(b)[g], c, 1) / d;
                    g = H(a.i(f)[g], c, 1) / d;
                    l += Math.pow(e * p * g, 1 / 3)
                })
            });
            return[f, g.h(), 2 * l]
        })
    }

    v("jsnx.average_clustering", function (a, b, c, d) {
        2 === arguments.length ? u(b) ? (c = b, b = m) : ha(b) && (d = b, b = m) : 3 === arguments.length && ha(c) && (d = c, c = m);
        d != m || (d = k);
        var e = Za(xc(a, b, c));
        d || (e = ta(e, function (a) {
            return 0 < a
        }));
        return J.q.apply(J, e) / e.length
    });
    function xc(a, b, c) {
        a.c() && h(new X("Clustering algorithms are not defined for directed graphs."));
        c = c != m ? wc(a, b, c) : vc(a, b);
        var d = {};
        B(c, function (a) {
            d[a[0]] = 0 === a[2] ? 0 : a[2] / (a[1] * (a[1] - 1))
        });
        return b != m && a.l(b) ? Za(d)[0] : d
    }

    v("jsnx.clustering", xc);
    v("jsnx.transitivity", function (a) {
        var b = 0, c = 0;
        B(vc(a), function (a) {
            c += a[1] * (a[1] - 1);
            b += a[2]
        });
        return 0 === b ? 0 : b / c
    });
    v("jsnx.square_clustering", function (a, b) {
        var c = b == m ? K(a) : a.d(b), d = {};
        B(c, function (b) {
            var c = d[b] = 0;
            B(lb(F(a.i(b))), function (g) {
                var l = g[0];
                g = g[1];
                var p = Mb(new U(F(a.i(l))), F(a.i(g)));
                p.remove(b);
                p = p.h();
                d[b] += p;
                var D = p + 1, x = a.i(l);
                g in x && (D += 1);
                c += (E(a.i(l)) - D) * (E(a.i(g)) - D) + p
            });
            0 < c && (d[b] /= c)
        });
        return b != m && a.l(b) ? Za(d)[0] : d
    });
    function yc(a) {
        var b = -1, c = {}, d = new U;
        B(a.s(), function (a) {
            var e = new U(F(a[1]));
            e.remove(a[0]);
            var f = e.h();
            f > b ? (c[a[0]] = d = e, b = f) : c[a[0]] = e
        });
        var e = new U(F(c)), f = Nb(e, d), g = new U, l = [], p = [];
        a = new A;
        a.next = function () {
            0 === f.h() && 0 === l.length && h(z);
            var a, x;
            if (0 < f.h())a = Ra(f).next(), f.remove(a); else {
                var L = l.pop();
                e = L[0];
                g = L[1];
                f = L[2];
                p.pop();
                return this.next()
            }
            p.push(a);
            e.remove(a);
            g.add(a);
            var V = c[a], L = Mb(e, V), V = Mb(g, V);
            if (0 === L.h() && (0 === V.h() && (x = Ba(p)), p.pop(), x))return x;
            if (0 === V.h() && 1 === L.h())return x =
                Aa(p, L.F()), p.pop(), x;
            var Ha = L.h(), ba = -1, ca, W;
            for (x = Ra(V); (a = Wa(x, m)) !== m && !(a = Mb(L, c[a]), W = a.h(), W > ba && (ca = a, ba = W, ba === Ha)););
            if (ba === Ha)return p.pop(), this.next();
            b = -1;
            for (x = Ra(L); (a = Wa(x, m)) !== m && !(a = Mb(L, c[a]), W = a.h(), W > b && (d = a, b = W, b === Ha - 1)););
            ba > b && (d = ca);
            l.push([e, g, f]);
            e = L;
            g = V;
            f = Nb(e, d);
            return this.next()
        };
        return a
    }

    v("jsnx.find_cliques", yc);
    v("jsnx.find_cliques_recursive", function (a) {
        var b = {};
        B(a.s(), function (a) {
            var c = new U(F(a[1]));
            c.remove(a[0]);
            b[a[0]] = c
        });
        if ($a(b))return[];
        a = new U(F(b));
        var c = new U, d = [];
        zc(b, a, c, [], d);
        return d
    });
    function zc(a, b, c, d, e) {
        var f = -1, g = b.h(), l, p, D, x;
        for (p = Ra(c); (D = Wa(p, m)) !== m;)if (D = Mb(b, a[D]), x = D.h(), x > f && (l = D, f = x, x === g))return;
        B(b, function (c) {
            c = Mb(b, a[c]);
            var d = c.h();
            d > f && (l = c, f = d)
        });
        g = Nb(b, l);
        B(g, function (f) {
            b.remove(f);
            d.push(f);
            var g = a[f];
            f = Mb(b, g);
            g = Mb(c, g);
            f.S() && g.S() ? e.push(Ba(d)) : g.S() && 1 === f.h() ? e.push(Aa(d, f.F())) : zc(a, f, g, d, e);
            c.add(d.pop())
        })
    }

    v("jsnx.graph_clique_number", function (a, b) {
        b != m || (b = yc(a));
        var c = 0;
        N(b, function (a) {
            c = a.length > c ? a.length : c
        });
        return c
    });
    v("jsnx.graph_number_of_cliques", function (a, b) {
        b != m || (b = yc(a));
        return P(b).length
    });
    function Ac(a, b, c) {
        c = c != m ? Va(c) : Va(yc(a));
        b != m || (b = a.nodes());
        var d;
        if (ga(b))d = {}, y(b, function (a) {
            d[a] = ta(c, function (b) {
                return 0 <= sa(b, a) || 0 <= sa(b, a + "")
            }).length
        }); else {
            var e = b;
            d = ta(c, function (a) {
                return 0 <= sa(a, e) || 0 <= sa(a, e + "")
            }).length
        }
        return d
    }

    v("jsnx.number_of_cliques", Ac);
    function Bc(a, b) {
        if (a.A() != b.A())return n;
        var c, d = a.o(), e = uc(a), f = Ac(a), g = [];
        for (c in d)g.push([d[c], e[c], f[c]]);
        g.sort(function (a, b) {
            return a[0] !== b[0] ? a[0] - b[0] : a[1] !== b[1] ? a[1] - b[1] : a[2] - b[2]
        });
        var d = b.o(), e = uc(b), f = Ac(b), l = [];
        for (c in d)l.push([d[c], e[c], f[c]]);
        l.sort(function (a, b) {
            return a[0] !== b[0] ? a[0] - b[0] : a[1] !== b[1] ? a[1] - b[1] : a[2] - b[2]
        });
        return!Ga(g, l, function (a, b) {
            return Ga(a, b)
        }) ? n : k
    }

    v("jsnx.algorithms.isomorphism.could_be_isomorphic", Bc);
    v("jsnx.could_be_isomorphic", Bc);
    function Cc(a, b) {
        if (a.A() != b.A())return n;
        var c, d = a.o(), e = uc(a), f = [];
        for (c in d)f.push([d[c], e[c]]);
        f.sort(function (a, b) {
            return a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]
        });
        var d = b.o(), e = uc(b), g = [];
        for (c in d)g.push([d[c], e[c]]);
        g.sort(function (a, b) {
            return a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]
        });
        return!Ga(f, g, function (a, b) {
            return Ga(a, b)
        }) ? n : k
    }

    v("jsnx.algorithms.isomorphism.fast_could_be_isomorphic", Cc);
    v("jsnx.fast_could_be_isomorphic", Cc);
    function Dc(a, b) {
        if (a.A() != b.A())return n;
        var c = Za(a.o());
        c.sort();
        var d = Za(b.o());
        d.sort();
        return!Ga(c, d) ? n : k
    }

    v("jsnx.algorithms.isomorphism.faster_could_be_isomorphic", Dc);
    v("jsnx.faster_could_be_isomorphic", Dc);
    function Ec() {
    }

    Ec.ha = function () {
        return Ec.ja ? Ec.ja : Ec.ja = new Ec
    };
    Ec.prototype.Da = 0;
    Ec.ha();
    function Fc(a) {
        if (!t(a))return n;
        for (var b = 0, c = a.length; b < c; b++)if (window.isNaN(a[b]))return n;
        return k
    }

    v("jsnx.utils.is_list_of_ints", Fc);
    v("jsnx.utils.cumulative_sum", function (a) {
        var b = 0;
        return Sa(a, function (a) {
            return b += a
        })
    });
    v("jsnx.utils.generate_unique_node", function () {
        return":" + (Ec.ha().Da++).toString(36)
    });
    function qc(a, b) {
        if ("eg" === b)return Gc(a);
        if (b == m || "hh" === b)return Hc(a);
        h(new Ub("`opt_method` must be 'eg' or 'hh'"))
    }

    v("jsnx.is_valid_degree_sequence", qc);
    function Hc(a) {
        if (0 === a.length)return k;
        if (!Fc(a) || 0 > Math.min.apply(m, a) || 0 !== J.q.apply(m, a) % 2)return n;
        for (a = Ba(a); 0 < a.length;) {
            w.sort.call(a, Ma);
            if (0 > a[0])break;
            var b = a.pop();
            if (0 === b)return k;
            if (b > a.length)break;
            for (var c = a.length - 1, b = a.length - (b + 1); c > b; c--)a[c] -= 1
        }
        return n
    }

    v("jsnx.is_valid_degree_sequence_havel_hakimi", Hc);
    function Gc(a) {
        if (0 === a.length)return k;
        if (!Fc(a) || 0 > Math.min.apply(m, a) || 0 !== J.q.apply(m, a) % 2)return n;
        var b = a.length, c = Ba(a).sort(function (a, b) {
            return b - a
        }), d = [], e;
        e = 1;
        for (a = c.length; e < a; e++)c[e] < c[e - 1] && d.push(e);
        var f, g;
        e = 0;
        for (a = d.length; e < a; e++)if (f = J.q.apply(m, c.slice(0, d[e])), g = d[e] * (d[e] - 1) + J.q.apply(m, Va(Sa(Q(d[e], b), function (a) {
            return Math.min(d[e], c[a])
        }))), f > g)return n;
        return k
    }

    v("jsnx.is_valid_degree_sequence_erdos_gallai", Gc);
    function Ic(a) {
        try {
            return Jc(a), k
        } catch (b) {
            if (b instanceof Xb)return n;
            h(b)
        }
    }

    v("jsnx.algorithms.dag.is_directed_acyclic_graph", Ic);
    v("jsnx.is_directed_acyclic_graph", Ic);
    function Jc(a, b) {
        a.c() || h(new X("Topological sort not defined on undirected graphs."));
        var c = {}, d = [], e = {};
        b != m || (b = a.v());
        N(b, function (b) {
            if (!(b in e))for (b = [b]; 0 < b.length;) {
                var g = b[b.length - 1];
                if (g in e)b.pop(); else {
                    c[g] = k;
                    var l = [];
                    C(a.i(g), function (a, b) {
                        b in e || (b in c && h(new Xb("Graph contains a cycle")), l.push(b))
                    });
                    0 < l.length ? b.push.apply(b, l) : (e[g] = k, Ea(d, aa, 0, g.toString()))
                }
            }
        });
        return d
    }

    v("jsnx.algorithms.dag.topological_sort", Jc);
    v("jsnx.topological_sort", Jc);
    function Kc(a, b) {
        function c(a, b, d, e) {
            b.add(e);
            C(a.i(e), function (e, p) {
                if (b.contains(p))b.contains(p) && !(0 <= sa(d, p)) && h(new Xb("Graph contains a cycle")); else if (!c(a, b, d, p))return n
            });
            Ea(d, aa, 0, e.toString());
            return k
        }

        a.c() || h(new X("Topological sort not defined on undirected graphs."));
        var d = new U, e = [];
        b != m || (b = a.v());
        N(b, function (b) {
            !(0 <= sa(e, b)) && !c(a, d, e, b) && h(new Xb("Graph contains a cycle"))
        });
        return e
    }

    v("jsnx.algorithms.dag.topological_sort_recursive", Kc);
    v("jsnx.topological_sort_recursive", Kc);
    var Mc = function Lc(b) {
        b.c() || h(new X("is_aperiodic not defined for undirected graphs."));
        var c = b.v().next(), d = {};
        d[c] = 0;
        for (var c = [c], e = 0, f = 1; 0 < c.length;) {
            var g = [];
            y(c, function (c) {
                C(b.i(c), function (b, D) {
                    D in d ? e = sb(e, d[c] - d[D] + 1) : (g.push(D), d[D] = f)
                })
            });
            c = g;
            f += 1
        }
        return hb(d) === hb(b) ? 1 === e : 1 === e && Lc(b.w(Nb(new U(b.nodes()), F(d))))
    };
    v("jsnx.algorithms.dag.is_aperiodic", Mc);
    v("jsnx.is_aperiodic", Mc);
    function Nc(a, b, c) {
        var d = {}, e = 0, f = {};
        for (f[b] = 1; 0 < E(f);) {
            b = f;
            f = {};
            C(b, function (b, c) {
                c in d || (d[c] = e, I(f, a.i(c)))
            });
            if (ia(c) && c <= e)break;
            e += 1
        }
        return d
    }

    v("jsnx.algorithms.shortest_paths.unweighted.single_source_shortest_path_length", Nc);
    v("jsnx.single_source_shortest_path_length", Nc);
    function Oc(a, b) {
        var c = {};
        N(a, function (d) {
            c[d] = Nc(a, d, b)
        });
        return c
    }

    v("jsnx.algorithms.shortest_paths.unweighted.all_pairs_shortest_path_length", Oc);
    v("jsnx.all_pairs_shortest_path_length", Oc);
    function Rc(a, b, c) {
        b = b.toString();
        c = c.toString();
        c = Sc(a, b, c);
        a = c[0];
        b = c[1];
        c = c[2];
        for (var d = []; c != m;)d.push(c), c = b[c];
        for (c = a[d[0]]; c != m;)d.unshift(c), c = a[c];
        return d
    }

    v("jsnx.algorithms.shortest_paths.unweighted.bidirectional_shortest_path", Rc);
    v("jsnx.bidirectional_shortest_path", Rc);
    function Sc(a, b, c) {
        (!s(b) || !s(c)) && h(new Ub("Bidirectional shortest path called without source or target"));
        var d = {}, e = {};
        if (c === b)return d[c] = m, e[b] = m, [d, e, b];
        var f, g;
        a.c() ? (f = a.ma, g = a.fa) : g = f = a.V;
        d[b] = m;
        e[c] = m;
        for (var l = [b], p = [c], D, x; 0 < l.length && 0 < p.length && !x;)l.length <= p.length ? (D = l, l = [], y(D, function (b) {
            x || B(g.call(a, b), function (a) {
                x || (a in d || (l.push(a), d[a] = b), a in e && (x = [d, e, a]))
            })
        })) : (D = p, p = [], y(D, function (b) {
            x || B(f.call(a, b), function (a) {
                x || (a in e || (e[a] = b, p.push(a)), a in d && (x = [d, e, a]))
            })
        }));
        if (x)return x;
        h(new Yb("No path between " + b + " and " + c + "."))
    }

    function Tc(a, b, c) {
        b = b.toString();
        var d = 0, e = {};
        e[b] = 1;
        var f = {};
        f[b] = [b];
        if (0 === c)return f;
        for (; 0 < E(e) && !(b = e, e = {}, C(b, function (b, c) {
            C(a.i(c), function (a, b) {
                b in f || (f[b] = f[c].concat([b]), e[b] = 1)
            })
        }), d += 1, s(c) && c <= d););
        return f
    }

    v("jsnx.algorithms.shortest_paths.unweighted.single_source_shortest_path", Tc);
    v("jsnx.single_source_shortest_path", Tc);
    function Uc(a, b) {
        var c = {};
        N(a, function (d) {
            c[d] = Tc(a, d, b)
        });
        return c
    }

    v("jsnx.algorithms.shortest_paths.unweighted.all_pairs_shortest_path", Uc);
    v("jsnx.all_pairs_shortest_path", Uc);
    function Vc(a, b, c, d, e) {
        b = b.toString();
        var f = 0, g = [b], l = {};
        l[b] = f;
        var p = {};
        for (p[b] = []; 0 < g.length && !(f += 1, b = g, g = [], y(b, function (b) {
            C(a.i(b), function (a, c) {
                c in l ? l[c] === f && p[c].push(b) : (p[c] = [b], l[c] = f, g.push(c))
            })
        }), d != m && d <= f););
        return c != m ? (c = c.toString(), e ? !(c in p) ? [
            [],
            -1
        ] : [p[c], l[c]] : !(c in p) ? [] : p[c]) : e ? [p, l] : p
    }

    v("jsnx.algorithms.shortest_paths.unweighted.predecessor", Vc);
    v("jsnx.predecessor", Vc);
    function Wc(a, b, c) {
        var d = b;
        ka(b) && (d = {}, B(a.v(), function (a) {
            d[a] = b(a)
        }));
        return!s(c) || c ? Xc(a, d) : Yc(a, d)
    }

    v("jsnx.relabel_nodes", Wc);
    function Yc(a, b) {
        var c = new U(F(b)), d;
        if (0 < Mb(c, b).h()) {
            c = new Y(ob(b));
            c.B(c.Y());
            try {
                d = Jc(c)
            } catch (e) {
                e instanceof Xb && h(new Xb("The node label sets are overlapping and no ordering can resolve the mapping. Use copy=True."))
            }
            d.reverse()
        } else d = c;
        var f = a.m(), g = a.c(), l;
        B(d, function (c) {
            var d;
            c in b && (d = b[c], a.l(c) || h(new X("Node " + c + " is not in the graph.")), a.D(d, a.node[c]), f ? (l = ua(a.t(c, k, k), function (a) {
                return[d, a[1], a[2], a[3]]
            }), g && (l = Aa(l, ua(a.R(c, k, k), function (a) {
                return[a[0], d, a[2], a[3]]
            })))) : (l =
                ua(a.t(c, k), function (a) {
                    return[d, a[1], a[2]]
                }), g && (l = Aa(l, ua(a.R(c, k), function (a) {
                return[a[0], d, a[2]]
            })))), a.N(c), a.b(l))
        });
        return a
    }

    function Xc(a, b) {
        var c = new a.constructor;
        c.name("(" + a.name() + ")");
        a.m() ? c.b(Sa(a.e(m, k, k), function (a) {
            return[H(b, a[0], a[0]), H(b, a[1], a[1]), a[2], cb(a[3])]
        })) : c.b(Sa(a.e(m, k), function (a) {
            return[H(b, a[0], a[0]), H(b, a[1], a[1]), cb(a[2])]
        }));
        c.j(Sa(K(a), function (a) {
            return H(b, a, a)
        }));
        var d = {}, e;
        for (e in a.node)d[H(b, e, e)] = cb(a.node[e]);
        I(c.node, d);
        I(c.graph, cb(a.graph));
        return c
    }

    v("jsnx.convert_node_labels_to_integers", function (a, b, c, d) {
        3 === arguments.length && ha(c) ? (d = c, c = m) : 2 === arguments.length && (ha(b) ? (d = b, b = m) : u(b) && (c = b, b = m));
        b != m || (b = 0);
        c != m || (c = "default");
        d != m || (d = k);
        var e = {}, f, g, l, p;
        if ("default" === c) {
            f = a.nodes();
            g = 0;
            l = b;
            for (p = f.length; g < p; g++, l++)e[f[g]] = l
        } else if ("sorted" === c) {
            f = a.nodes();
            f.sort();
            g = 0;
            l = b;
            for (p = f.length; g < p; g++, l++)e[f[g]] = l
        } else if ("increasing degree" === c) {
            f = Va(a.p());
            f.sort(function (a, b) {
                return a[1] - b[1]
            });
            g = 0;
            l = b;
            for (p = f.length; g < p; g++, l++)e[f[g][0]] =
                l
        } else if ("decreasing degree" === c) {
            f = Va(a.p());
            f.sort(function (a, b) {
                return b[1] - a[1]
            });
            g = 0;
            l = b;
            for (p = f.length; g < p; g++, l++)e[f[g][0]] = l
        } else h(new X("Unkown node ordering: " + c));
        g = Wc(a, e);
        g.name("(" + a.name() + ")_with_int_labels");
        d || (g.node_labels = e);
        return g
    });
    function Z(a, b) {
        if (!(this instanceof Z))return new Z(a, b);
        M.call(this, a, b)
    }

    ra(Z, M);
    v("jsnx.classes.MultiGraph", Z);
    v("jsnx.MultiGraph", Z);
    Z.__name__ = "MultiGraph";
    Z.prototype.a = function (a, b, c, d) {
        var e, f;
        c != m && (!u(c) && !ia(c)) && (d = c, c = m);
        d = d || {};
        "object" !== r(d) && h(new X("The attr_dict argument must be an object."));
        a in this.adj || (this.adj[a] = {}, this.node[a] = {});
        b in this.adj || (this.adj[b] = {}, this.node[b] = {});
        if (b in this.adj[a]) {
            f = this.adj[a][b];
            if (c == m)for (c = E(f); c in f;)c += 1;
            e = H(f, "" + c, {});
            I(e, d);
            f[c] = e
        } else c != m || (c = 0), e = {}, I(e, d), f = eb(c, e), this.adj[a][b] = f, this.adj[b][a] = f
    };
    Z.prototype.add_edge = Z.prototype.a;
    Z.prototype.b = function (a, b) {
        b = b || {};
        "object" !== r(b) && h(new X("The attr_dict argument must be an object."));
        N(a, function (a) {
            var d = hb(a), e, f, g = m, l = {};
            4 === d ? (e = a[0], f = a[1], g = a[2], l = a[3]) : 3 === d ? (e = a[0], f = a[1], l = a[2]) : 2 === d ? (e = a[0], f = a[1]) : h(new X("Edge tuple " + $b(a) + " must be a 2-tuple, 3-tuple or 4-tuple."));
            a = e in this.adj ? H(this.adj[e], f, {}) : {};
            if (g == m)for (g = E(a); g in a;)g += 1;
            a = H(a, g, {});
            I(a, b, l);
            this.a(e, f, g, a)
        }, this)
    };
    Z.prototype.add_edges_from = Z.prototype.b;
    Z.prototype.u = function (a, b, c) {
        (!(a in this.adj) || !(b in this.adj[a])) && h(new X("The edge " + a + "-" + b + " is not in the graph"));
        var d = this.adj[a][b];
        c != m ? (c in d || h(new X("The edge " + a + "-" + b + " with key " + c + " is not in the graph")), G(d, c)) : G(d, Ya(d));
        0 === E(d) && (G(this.adj[a], b), a != b && G(this.adj[b], a))
    };
    Z.prototype.remove_edge = Z.prototype.u;
    Z.prototype.B = function (a) {
        N(a, function (a) {
            try {
                this.u(a[0], a[1], a[2])
            } catch (c) {
                c instanceof X || h(c)
            }
        }, this)
    };
    Z.prototype.remove_edges_from = Z.prototype.B;
    Z.prototype.H = function (a, b, c) {
        return c != m ? a in this.adj && b in this.adj[a] && c in this.adj[a][b] : a in this.adj && b in this.adj[a]
    };
    Z.prototype.has_edge = Z.prototype.H;
    Z.prototype.t = function (a, b, c) {
        return Va(this.e(a, b, c))
    };
    Z.prototype.edges = Z.prototype.t;
    Z.prototype.e = function (a, b, c) {
        ha(a) && (ha(b) && (c = b), b = a, a = m);
        var d = {}, e, f;
        a = a != m ? O(this.d(a), function (a) {
            return[a, this.adj[a]]
        }, this) : T(this.adj);
        return b ? R(a, function (a) {
            e = a[0];
            var b = new A, c = T(a[1]);
            b.next = function () {
                try {
                    return c.next()
                } catch (a) {
                    a === z && (d[e] = 1), h(a)
                }
            };
            return b
        }, function (a) {
            f = a[0];
            if (!(f in d))return T(a[1])
        }, function (a) {
            return c ? [e, f, a[0], a[1]] : [e, f, a[1]]
        }) : R(a, function (a) {
                e = a[0];
                var b = new A, c = T(a[1]);
                b.next = function () {
                    try {
                        return c.next()
                    } catch (a) {
                        a === z && (d[e] = 1), h(a)
                    }
                };
                return b
            },
            function (a) {
                f = a[0];
                if (!(f in d))return T(a[1])
            }, function (a) {
                return c ? [e, f, a[0]] : [e, f]
            })
    };
    Z.prototype.edges_iter = Z.prototype.e;
    Z.prototype.P = function (a, b, c, d) {
        s(d) || (d = m);
        return a in this.adj && b in this.adj[a] ? c != m ? H(this.adj[a][b], "" + c, d) : this.adj[a][b] : d
    };
    Z.prototype.get_edge_data = Z.prototype.P;
    Z.prototype.p = function (a, b) {
        var c;
        c = a != m ? O(this.d(a), function (a) {
            return[a, this.adj[a]]
        }, this) : T(this.adj);
        return b != m ? Sa(c, function (a) {
            var c = a[0];
            a = a[1];
            var f = 0;
            C(a, function (a) {
                C(a, function (a) {
                    f += H(a, b, 1)
                })
            });
            c in a && C(a[c], function (a) {
                f += H(a, b, 1)
            });
            return[c, f]
        }) : Sa(c, function (a) {
            var b = a[0];
            a = a[1];
            var c = 0;
            C(a, function (a) {
                c += E(a)
            });
            return[b, c + +(b in a && E(a[b]))]
        })
    };
    Z.prototype.degree_iter = Z.prototype.p;
    Z.prototype.m = da(k);
    Z.prototype.is_multigraph = Z.prototype.m;
    Z.prototype.c = da(n);
    Z.prototype.is_directed = Z.prototype.c;
    Z.prototype.C = function () {
        var a = new $;
        a.j(this);
        a.b(function () {
            var a, c;
            return R(this.s(), function (c) {
                a = c[0];
                return T(c[1])
            }, function (a) {
                c = a[0];
                return T(a[1])
            }, function (d) {
                return[a, c, d[0], S(d[1])]
            })
        }.call(this));
        a.graph = S(this.graph);
        a.node = S(this.node);
        return a
    };
    Z.prototype.to_directed = Z.prototype.C;
    Z.prototype.Y = function (a, b) {
        var c = [];
        a ? b ? C(this.adj, function (a, b) {
            b in a && C(a[b], function (a, d) {
                c.push([b, b, d, a])
            })
        }) : C(this.adj, function (a, b) {
            b in a && C(a[b], function (a) {
                c.push([b, b, a])
            })
        }) : b ? C(this.adj, function (a, b) {
            b in a && C(a[b], function (a, d) {
                c.push([b, b, d])
            })
        }) : C(this.adj, function (a, b) {
            b in a && C(a[b], function () {
                c.push([b, b])
            })
        });
        return c
    };
    Z.prototype.selfloop_edges = Z.prototype.Y;
    Z.prototype.L = function (a, b) {
        return a == m ? this.size() : a in this.adj && b in this.adj[a] ? E(this.adj[a][b]) : 0
    };
    Z.prototype.number_of_edges = Z.prototype.L;
    Z.prototype.w = function (a) {
        a = this.d(a);
        var b = new this.constructor, c = b.adj, d = this.adj;
        B(a, function (a) {
            var b = {};
            c[a] = b;
            C(d[a], function (d, l) {
                if (l in c) {
                    var p = cb(d);
                    b[l] = p;
                    c[l][a] = p
                }
            })
        });
        C(this.node, function (a, c) {
            b.node[c] = a
        });
        b.graph = this.graph;
        return b
    };
    Z.prototype.subgraph = Z.prototype.w;
    function $(a, b) {
        if (!(this instanceof $))return new $(a, b);
        Y.call(this, a, b)
    }

    ra($, Y);
    var Zc = $.prototype, $c = Z.prototype, ad;
    for (ad in $c)$c.hasOwnProperty(ad) && "constructor" !== ad && (Zc[ad] = $c[ad]);
    v("jsnx.classes.MultiDiGraph", $);
    v("jsnx.MultiDiGraph", $);
    $.__name__ = "MultiDiGraph";
    $.prototype.a = function (a, b, c, d) {
        var e, f;
        c != m && (!u(c) && !ia(c)) && (d = c, c = m);
        d = d || {};
        "object" !== r(d) && h(new X("The attr_dict argument must be an object."));
        a in this.succ || (this.succ[a] = {}, this.pred[a] = {}, this.node[a] = {});
        b in this.succ || (this.succ[b] = {}, this.pred[b] = {}, this.node[b] = {});
        if (b in this.succ[a]) {
            f = this.adj[a][b];
            if (c == m)for (c = E(f); c in f;)c += 1;
            e = H(f, c.toString(), {});
            I(e, d);
            f[c] = e
        } else c != m || (c = 0), e = {}, I(e, d), f = eb(c, e), this.succ[a][b] = f, this.pred[b][a] = f
    };
    $.prototype.add_edge = $.prototype.a;
    $.prototype.u = function (a, b, c) {
        (!(a in this.adj) || !(b in this.adj[a])) && h(new X("The edge " + a + "-" + b + " is not in the graph"));
        var d = this.adj[a][b];
        c != m ? (c in d || h(new X("The edge " + a + "-" + b + " with key " + c + " is not in the graph")), G(d, c)) : G(d, Ya(d));
        0 === E(d) && (G(this.succ[a], b), G(this.pred[b], a))
    };
    $.prototype.remove_edge = $.prototype.u;
    $.prototype.e = function (a, b, c) {
        ha(a) && (ha(b) && (c = b), b = a, a = m);
        var d, e;
        a = a != m ? O(this.d(a), function (a) {
            return[a, this.adj[a]]
        }, this) : ob(this.adj);
        return b ? R(a, function (a) {
            d = a[0];
            return T(a[1])
        }, function (a) {
            e = a[0];
            return T(a[1])
        }, function (a) {
            return c ? [d, e, a[0], a[1]] : [d, e, a[1]]
        }) : R(a, function (a) {
            d = a[0];
            return T(a[1])
        }, function (a) {
            e = a[0];
            return T(a[1])
        }, function (a) {
            return c ? [d, e, a[0]] : [d, e]
        })
    };
    $.prototype.edges_iter = $.prototype.e;
    $.prototype.aa = $.prototype.e;
    $.prototype.out_edges_iter = $.prototype.aa;
    $.prototype.da = function (a, b, c) {
        return Va(this.aa(a, b, c))
    };
    $.prototype.out_edges = $.prototype.da;
    $.prototype.I = function (a, b, c) {
        ha(a) && (b = a, a = m);
        var d, e;
        a = a != m ? O(this.d(a), function (a) {
            return[a, this.pred[a]]
        }, this) : ob(this.pred);
        return b ? R(a, function (a) {
            d = a[0];
            return T(a[1])
        }, function (a) {
            e = a[0];
            return T(a[1])
        }, function (a) {
            return c ? [e, d, a[0], a[1]] : [e, d, a[1]]
        }) : R(a, function (a) {
            d = a[0];
            return T(a[1])
        }, function (a) {
            e = a[0];
            return T(a[1])
        }, function (a) {
            return c ? [e, d, a[0]] : [e, d]
        })
    };
    $.prototype.in_edges_iter = $.prototype.I;
    $.prototype.R = function (a, b, c) {
        return Va(this.I(a, b, c))
    };
    $.prototype.in_edges = $.prototype.R;
    $.prototype.p = function (a, b) {
        var c;
        c = a != m ? jb(Sa(this.d(a), function (a) {
            return[a, this.succ[a]]
        }, this), Sa(this.d(a), function (a) {
            return[a, this.pred[a]]
        }, this)) : jb(T(this.succ), T(this.pred));
        return b != m ? O(c, function (a) {
            var c = a[0][1], f = 0;
            C(a[1][1], function (a) {
                C(a, function (a) {
                    f += +H(a, b, 1)
                })
            });
            C(c, function (a) {
                C(a, function (a) {
                    f += +H(a, b, 1)
                })
            });
            return[a[0][0], f]
        }) : O(c, function (a) {
            var b = 0, c = 0;
            C(a[1][1], function (a) {
                b += hb(a)
            });
            C(a[0][1], function (a) {
                c += hb(a)
            });
            return[a[0][0], b + c]
        })
    };
    $.prototype.degree_iter = $.prototype.p;
    $.prototype.Q = function (a, b) {
        var c;
        c = a != m ? O(this.d(a), function (a) {
            return[a, this.pred[a]]
        }, this) : T(this.pred);
        return b != m ? O(c, function (a) {
            var c = 0;
            C(a[1], function (a) {
                C(a, function (a) {
                    c += +H(a, b, 1)
                })
            });
            return[a[0][0], c]
        }) : O(c, function (a) {
            var b = 0;
            C(a[1], function (a) {
                b += E(a)
            });
            return[a[0], b]
        })
    };
    $.prototype.in_degree_iter = $.prototype.Q;
    $.prototype.W = function (a, b) {
        var c;
        c = a != m ? O(this.d(a), function (a) {
            return[a, this.succ[a]]
        }, this) : T(this.succ);
        return b != m ? O(c, function (a) {
            var c = 0;
            C(a[1], function (a) {
                C(a, function (a) {
                    c += +H(a, b, 1)
                })
            });
            return[a[0][0], c]
        }) : O(c, function (a) {
            var b = 0;
            C(a[1], function (a) {
                b += E(a)
            });
            return[a[0], b]
        })
    };
    $.prototype.out_degree_iter = $.prototype.W;
    $.prototype.m = da(k);
    $.prototype.is_multigraph = $.prototype.m;
    $.prototype.c = da(k);
    $.prototype.is_directed = $.prototype.c;
    $.prototype.C = function () {
        return qb(this)
    };
    $.prototype.to_directed = $.prototype.C;
    $.prototype.O = function (a) {
        var b = new Z;
        b.name(this.name());
        b.j(this);
        var c, d;
        a ? b.b(R(this.s(), function (a) {
            c = a[0];
            return T(a[1])
        }, function (a) {
            d = a[0];
            return T(a[1])
        }, qa(function (a) {
            if (this.H(d, c, a[0]))return[c, d, a[0], S(a[1])]
        }, this))) : b.b(R(this.s(), function (a) {
            c = a[0];
            return T(a[1])
        }, function (a) {
            d = a[0];
            return T(a[1])
        }, function (a) {
            return[c, d, a[0], S(a[1])]
        }));
        b.graph = S(this.graph);
        b.node = S(this.node);
        return b
    };
    $.prototype.to_undirected = $.prototype.O;
    $.prototype.w = function (a) {
        a = this.d(a);
        var b = new this.constructor, c = b.succ, d = b.pred, e = this.succ;
        B(a, function (a) {
            c[a] = {};
            d[a] = {}
        });
        N(c, function (a) {
            var b = c[a];
            C(e[a], function (e, p) {
                if (p in c) {
                    var D = cb(e);
                    b[p] = D;
                    d[p][a] = D
                }
            })
        });
        N(b, function (a) {
            b.node[a] = this.node[a]
        }, this);
        b.graph = this.graph;
        return b
    };
    $.prototype.subgraph = $.prototype.w;
    $.prototype.reverse = function (a) {
        (a = !s(a) || a) ? (a = new this.constructor(m, {name: "Reverse of (" + this.name() + ")"}), a.j(this), a.b(Sa(this.e(m, k, k), function (a) {
            return[a[1], a[0], a[2], S(a[3])]
        })), a.graph = S(this.graph), a.node = S(this.node)) : (a = this.succ, this.succ = this.pred, this.pred = a, this.adj = this.succ, a = this);
        return a
    };
    $.prototype.reverse = $.prototype.reverse;
    v("jsnx.nodes", function (a) {
        return a.nodes()
    });
    v("jsnx.nodes_iter", function (a) {
        return a.v()
    });
    v("jsnx.edges", function (a, b) {
        return a.t(b)
    });
    v("jsnx.edges_iter", function (a, b) {
        return a.e(b)
    });
    v("jsnx.degree", function (a, b, c) {
        return a.o(b, c)
    });
    v("jsnx.neighbors", function (a, b) {
        return a.K(b)
    });
    v("jsnx.number_of_nodes", function (a) {
        return a.M()
    });
    v("jsnx.number_of_edges", function (a) {
        return a.L()
    });
    v("jsnx.density", function (a) {
        var b = a.M(), c = a.L();
        return 0 === c ? 0 : a.c() ? c / (b * (b - 1)) : 2 * c / (b * (b - 1))
    });
    v("jsnx.degree_histogram", function (a) {
        a = Za(a.o());
        var b = Math.max.apply(Math, a) + 1, c = Na(b);
        y(a, function (a) {
            c[a] += 1
        });
        return c
    });
    v("jsnx.is_directed", function (a) {
        return a.c()
    });
    v("jsnx.freeze", function (a) {
        function b() {
            h(new X("Frozen graph can't be modified"))
        }

        a.D = b;
        a.j = b;
        a.N = b;
        a.X = b;
        a.a = b;
        a.b = b;
        a.u = b;
        a.B = b;
        a.clear = b;
        a.ya = k;
        return a
    });
    v("jsnx.is_frozen", function (a) {
        return!!a.ya
    });
    v("jsnx.subgraph", function (a, b) {
        return a.w(b)
    });
    v("jsnx.create_empty_copy", function (a, b) {
        s(b) || (b = k);
        var c = new a.constructor;
        b && c.j(a);
        return c
    });
    v("jsnx.info", function (a, b) {
        var c = "";
        if (b != m)a.l(b) || h(new X("node " + b + " not in graph")), c = c + ("Node " + b + " has the following properties:\n") + ("Degree: " + a.o(b) + "\n"), c += "Neighbors: " + a.K(b).join(" "); else {
            var c = c + ("Name: " + a.name() + "\n"), c = c + ("Type: " + a.constructor.__name__ + "\n"), c = c + ("Number of nodes: " + a.M() + "\n"), c = c + ("Number of edges: " + a.L() + "\n"), d = a.M();
            if (0 < d)if (a.c())c += "Average in degree: " + (J.q.apply(m, Za(a.ia())) / d).toFixed(4) + "\n", c += "Average out degree: " + (J.q.apply(m, Za(a.la())) / d).toFixed(4);
            else var e = J.q.apply(m, Za(a.o())), c = c + ("Average degree: " + (e / d).toFixed(4))
        }
        return c
    });
    v("jsnx.set_node_attributes", function (a, b, c) {
        C(c, function (c, e) {
            a.node[e][b] = c
        })
    });
    v("jsnx.get_node_attributes", function (a, b) {
        var c = {};
        C(a.ka, function (a, e) {
            b in a && (c[e] = a[b])
        });
        return c
    });
    v("jsnx.set_edge_attributes", function (a, b, c) {
        C(c, function (b, c) {
            c = c.split(",");
            a.i(c[0])[c[1]] = b
        })
    });
    v("jsnx.get_edge_attributes", function (a, b) {
        var c = {};
        C(a.t(m, k), function (a) {
            b in a[2] && (c[[a[0], a[1]]] = a[2][b])
        });
        return c
    });
}));