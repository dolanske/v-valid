import { ref as tt, reactive as Ie, watch as et, isRef as ft, unref as u } from "vue-demi";
var Xt = typeof global == "object" && global && global.Object === Object && global, ke = typeof self == "object" && self && self.Object === Object && self, T = Xt || ke || Function("return this")(), E = T.Symbol, Zt = Object.prototype, xe = Zt.hasOwnProperty, De = Zt.toString, M = E ? E.toStringTag : void 0;
function Ve(t) {
  var e = xe.call(t, M), r = t[M];
  try {
    t[M] = void 0;
    var n = !0;
  } catch {
  }
  var i = De.call(t);
  return n && (e ? t[M] = r : delete t[M]), i;
}
var Le = Object.prototype, Me = Le.toString;
function Fe(t) {
  return Me.call(t);
}
var ze = "[object Null]", Ne = "[object Undefined]", jt = E ? E.toStringTag : void 0;
function y(t) {
  return t == null ? t === void 0 ? Ne : ze : jt && jt in Object(t) ? Ve(t) : Fe(t);
}
function _(t) {
  return t != null && typeof t == "object";
}
var Re = "[object Symbol]";
function q(t) {
  return typeof t == "symbol" || _(t) && y(t) == Re;
}
function Ue(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, i = Array(n); ++r < n; )
    i[r] = e(t[r], r, t);
  return i;
}
var j = Array.isArray, Be = 1 / 0, vt = E ? E.prototype : void 0, wt = vt ? vt.toString : void 0;
function Jt(t) {
  if (typeof t == "string")
    return t;
  if (j(t))
    return Ue(t, Jt) + "";
  if (q(t))
    return wt ? wt.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Be ? "-0" : e;
}
function $(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Ge = "[object AsyncFunction]", Ke = "[object Function]", We = "[object GeneratorFunction]", qe = "[object Proxy]";
function H(t) {
  if (!$(t))
    return !1;
  var e = y(t);
  return e == Ke || e == We || e == Ge || e == qe;
}
var rt = T["__core-js_shared__"], Ot = function() {
  var t = /[^.]+$/.exec(rt && rt.keys && rt.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function He(t) {
  return !!Ot && Ot in t;
}
var Ye = Function.prototype, Xe = Ye.toString;
function x(t) {
  if (t != null) {
    try {
      return Xe.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Ze = /[\\^$.*+?()[\]{}|]/g, Je = /^\[object .+?Constructor\]$/, Qe = Function.prototype, tr = Object.prototype, er = Qe.toString, rr = tr.hasOwnProperty, nr = RegExp(
  "^" + er.call(rr).replace(Ze, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ar(t) {
  if (!$(t) || He(t))
    return !1;
  var e = H(t) ? nr : Je;
  return e.test(x(t));
}
function ir(t, e) {
  return t == null ? void 0 : t[e];
}
function D(t, e) {
  var r = ir(t, e);
  return ar(r) ? r : void 0;
}
var at = D(T, "WeakMap"), St = Object.create, or = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!$(e))
      return {};
    if (St)
      return St(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}();
function sr(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var At = function() {
  try {
    var t = D(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
function ur(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n && e(t[r], r, t) !== !1; )
    ;
  return t;
}
var fr = 9007199254740991, cr = /^(?:0|[1-9]\d*)$/;
function Qt(t, e) {
  var r = typeof t;
  return e = e ?? fr, !!e && (r == "number" || r != "symbol" && cr.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function te(t, e, r) {
  e == "__proto__" && At ? At(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function ee(t, e) {
  return t === e || t !== t && e !== e;
}
var lr = Object.prototype, pr = lr.hasOwnProperty;
function ct(t, e, r) {
  var n = t[e];
  (!(pr.call(t, e) && ee(n, r)) || r === void 0 && !(e in t)) && te(t, e, r);
}
function Y(t, e, r, n) {
  var i = !r;
  r || (r = {});
  for (var a = -1, o = e.length; ++a < o; ) {
    var p = e[a], d = void 0;
    d === void 0 && (d = t[p]), i ? te(r, p, d) : ct(r, p, d);
  }
  return r;
}
var gr = 9007199254740991;
function re(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= gr;
}
function lt(t) {
  return t != null && re(t.length) && !H(t);
}
var dr = Object.prototype;
function X(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || dr;
  return t === r;
}
function br(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var hr = "[object Arguments]";
function Pt(t) {
  return _(t) && y(t) == hr;
}
var ne = Object.prototype, yr = ne.hasOwnProperty, _r = ne.propertyIsEnumerable, ae = Pt(/* @__PURE__ */ function() {
  return arguments;
}()) ? Pt : function(t) {
  return _(t) && yr.call(t, "callee") && !_r.call(t, "callee");
};
function mr() {
  return !1;
}
var ie = typeof exports == "object" && exports && !exports.nodeType && exports, Et = ie && typeof module == "object" && module && !module.nodeType && module, $r = Et && Et.exports === ie, Ct = $r ? T.Buffer : void 0, Tr = Ct ? Ct.isBuffer : void 0, pt = Tr || mr, jr = "[object Arguments]", vr = "[object Array]", wr = "[object Boolean]", Or = "[object Date]", Sr = "[object Error]", Ar = "[object Function]", Pr = "[object Map]", Er = "[object Number]", Cr = "[object Object]", Ir = "[object RegExp]", kr = "[object Set]", xr = "[object String]", Dr = "[object WeakMap]", Vr = "[object ArrayBuffer]", Lr = "[object DataView]", Mr = "[object Float32Array]", Fr = "[object Float64Array]", zr = "[object Int8Array]", Nr = "[object Int16Array]", Rr = "[object Int32Array]", Ur = "[object Uint8Array]", Br = "[object Uint8ClampedArray]", Gr = "[object Uint16Array]", Kr = "[object Uint32Array]", c = {};
c[Mr] = c[Fr] = c[zr] = c[Nr] = c[Rr] = c[Ur] = c[Br] = c[Gr] = c[Kr] = !0;
c[jr] = c[vr] = c[Vr] = c[wr] = c[Lr] = c[Or] = c[Sr] = c[Ar] = c[Pr] = c[Er] = c[Cr] = c[Ir] = c[kr] = c[xr] = c[Dr] = !1;
function Wr(t) {
  return _(t) && re(t.length) && !!c[y(t)];
}
function Z(t) {
  return function(e) {
    return t(e);
  };
}
var oe = typeof exports == "object" && exports && !exports.nodeType && exports, F = oe && typeof module == "object" && module && !module.nodeType && module, qr = F && F.exports === oe, nt = qr && Xt.process, C = function() {
  try {
    var t = F && F.require && F.require("util").types;
    return t || nt && nt.binding && nt.binding("util");
  } catch {
  }
}(), It = C && C.isTypedArray, se = It ? Z(It) : Wr, Hr = Object.prototype, Yr = Hr.hasOwnProperty;
function ue(t, e) {
  var r = j(t), n = !r && ae(t), i = !r && !n && pt(t), a = !r && !n && !i && se(t), o = r || n || i || a, p = o ? br(t.length, String) : [], d = p.length;
  for (var g in t)
    (e || Yr.call(t, g)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (g == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (g == "offset" || g == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (g == "buffer" || g == "byteLength" || g == "byteOffset") || // Skip index properties.
    Qt(g, d))) && p.push(g);
  return p;
}
function fe(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var Xr = fe(Object.keys, Object), Zr = Object.prototype, Jr = Zr.hasOwnProperty;
function ce(t) {
  if (!X(t))
    return Xr(t);
  var e = [];
  for (var r in Object(t))
    Jr.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function gt(t) {
  return lt(t) ? ue(t) : ce(t);
}
function Qr(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var tn = Object.prototype, en = tn.hasOwnProperty;
function rn(t) {
  if (!$(t))
    return Qr(t);
  var e = X(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !en.call(t, n)) || r.push(n);
  return r;
}
function dt(t) {
  return lt(t) ? ue(t, !0) : rn(t);
}
var nn = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, an = /^\w*$/;
function on(t, e) {
  if (j(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || q(t) ? !0 : an.test(t) || !nn.test(t) || e != null && t in Object(e);
}
var z = D(Object, "create");
function sn() {
  this.__data__ = z ? z(null) : {}, this.size = 0;
}
function un(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var fn = "__lodash_hash_undefined__", cn = Object.prototype, ln = cn.hasOwnProperty;
function pn(t) {
  var e = this.__data__;
  if (z) {
    var r = e[t];
    return r === fn ? void 0 : r;
  }
  return ln.call(e, t) ? e[t] : void 0;
}
var gn = Object.prototype, dn = gn.hasOwnProperty;
function bn(t) {
  var e = this.__data__;
  return z ? e[t] !== void 0 : dn.call(e, t);
}
var hn = "__lodash_hash_undefined__";
function yn(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = z && e === void 0 ? hn : e, this;
}
function k(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
k.prototype.clear = sn;
k.prototype.delete = un;
k.prototype.get = pn;
k.prototype.has = bn;
k.prototype.set = yn;
function _n() {
  this.__data__ = [], this.size = 0;
}
function J(t, e) {
  for (var r = t.length; r--; )
    if (ee(t[r][0], e))
      return r;
  return -1;
}
var mn = Array.prototype, $n = mn.splice;
function Tn(t) {
  var e = this.__data__, r = J(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : $n.call(e, r, 1), --this.size, !0;
}
function jn(t) {
  var e = this.__data__, r = J(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function vn(t) {
  return J(this.__data__, t) > -1;
}
function wn(t, e) {
  var r = this.__data__, n = J(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function O(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
O.prototype.clear = _n;
O.prototype.delete = Tn;
O.prototype.get = jn;
O.prototype.has = vn;
O.prototype.set = wn;
var N = D(T, "Map");
function On() {
  this.size = 0, this.__data__ = {
    hash: new k(),
    map: new (N || O)(),
    string: new k()
  };
}
function Sn(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Q(t, e) {
  var r = t.__data__;
  return Sn(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function An(t) {
  var e = Q(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Pn(t) {
  return Q(this, t).get(t);
}
function En(t) {
  return Q(this, t).has(t);
}
function Cn(t, e) {
  var r = Q(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function I(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
I.prototype.clear = On;
I.prototype.delete = An;
I.prototype.get = Pn;
I.prototype.has = En;
I.prototype.set = Cn;
var In = "Expected a function";
function bt(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(In);
  var r = function() {
    var n = arguments, i = e ? e.apply(this, n) : n[0], a = r.cache;
    if (a.has(i))
      return a.get(i);
    var o = t.apply(this, n);
    return r.cache = a.set(i, o) || a, o;
  };
  return r.cache = new (bt.Cache || I)(), r;
}
bt.Cache = I;
var kn = 500;
function xn(t) {
  var e = bt(t, function(n) {
    return r.size === kn && r.clear(), n;
  }), r = e.cache;
  return e;
}
var Dn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Vn = /\\(\\)?/g, Ln = xn(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Dn, function(r, n, i, a) {
    e.push(i ? a.replace(Vn, "$1") : n || r);
  }), e;
});
function Mn(t) {
  return t == null ? "" : Jt(t);
}
function le(t, e) {
  return j(t) ? t : on(t, e) ? [t] : Ln(Mn(t));
}
var Fn = 1 / 0;
function pe(t) {
  if (typeof t == "string" || q(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -Fn ? "-0" : e;
}
function zn(t, e) {
  e = le(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[pe(e[r++])];
  return r && r == n ? t : void 0;
}
function Nn(t, e, r) {
  var n = t == null ? void 0 : zn(t, e);
  return n === void 0 ? r : n;
}
function ge(t, e) {
  for (var r = -1, n = e.length, i = t.length; ++r < n; )
    t[i + r] = e[r];
  return t;
}
var ht = fe(Object.getPrototypeOf, Object), Rn = "[object Object]", Un = Function.prototype, Bn = Object.prototype, de = Un.toString, Gn = Bn.hasOwnProperty, Kn = de.call(Object);
function Wn(t) {
  if (!_(t) || y(t) != Rn)
    return !1;
  var e = ht(t);
  if (e === null)
    return !0;
  var r = Gn.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && de.call(r) == Kn;
}
function qn() {
  this.__data__ = new O(), this.size = 0;
}
function Hn(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function Yn(t) {
  return this.__data__.get(t);
}
function Xn(t) {
  return this.__data__.has(t);
}
var Zn = 200;
function Jn(t, e) {
  var r = this.__data__;
  if (r instanceof O) {
    var n = r.__data__;
    if (!N || n.length < Zn - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new I(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function V(t) {
  var e = this.__data__ = new O(t);
  this.size = e.size;
}
V.prototype.clear = qn;
V.prototype.delete = Hn;
V.prototype.get = Yn;
V.prototype.has = Xn;
V.prototype.set = Jn;
function Qn(t, e) {
  return t && Y(e, gt(e), t);
}
function ta(t, e) {
  return t && Y(e, dt(e), t);
}
var be = typeof exports == "object" && exports && !exports.nodeType && exports, kt = be && typeof module == "object" && module && !module.nodeType && module, ea = kt && kt.exports === be, xt = ea ? T.Buffer : void 0, Dt = xt ? xt.allocUnsafe : void 0;
function ra(t, e) {
  if (e)
    return t.slice();
  var r = t.length, n = Dt ? Dt(r) : new t.constructor(r);
  return t.copy(n), n;
}
function na(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, i = 0, a = []; ++r < n; ) {
    var o = t[r];
    e(o, r, t) && (a[i++] = o);
  }
  return a;
}
function he() {
  return [];
}
var aa = Object.prototype, ia = aa.propertyIsEnumerable, Vt = Object.getOwnPropertySymbols, yt = Vt ? function(t) {
  return t == null ? [] : (t = Object(t), na(Vt(t), function(e) {
    return ia.call(t, e);
  }));
} : he;
function oa(t, e) {
  return Y(t, yt(t), e);
}
var sa = Object.getOwnPropertySymbols, ye = sa ? function(t) {
  for (var e = []; t; )
    ge(e, yt(t)), t = ht(t);
  return e;
} : he;
function ua(t, e) {
  return Y(t, ye(t), e);
}
function _e(t, e, r) {
  var n = e(t);
  return j(t) ? n : ge(n, r(t));
}
function fa(t) {
  return _e(t, gt, yt);
}
function ca(t) {
  return _e(t, dt, ye);
}
var it = D(T, "DataView"), ot = D(T, "Promise"), st = D(T, "Set"), Lt = "[object Map]", la = "[object Object]", Mt = "[object Promise]", Ft = "[object Set]", zt = "[object WeakMap]", Nt = "[object DataView]", pa = x(it), ga = x(N), da = x(ot), ba = x(st), ha = x(at), m = y;
(it && m(new it(new ArrayBuffer(1))) != Nt || N && m(new N()) != Lt || ot && m(ot.resolve()) != Mt || st && m(new st()) != Ft || at && m(new at()) != zt) && (m = function(t) {
  var e = y(t), r = e == la ? t.constructor : void 0, n = r ? x(r) : "";
  if (n)
    switch (n) {
      case pa:
        return Nt;
      case ga:
        return Lt;
      case da:
        return Mt;
      case ba:
        return Ft;
      case ha:
        return zt;
    }
  return e;
});
var ya = Object.prototype, _a = ya.hasOwnProperty;
function ma(t) {
  var e = t.length, r = new t.constructor(e);
  return e && typeof t[0] == "string" && _a.call(t, "index") && (r.index = t.index, r.input = t.input), r;
}
var Rt = T.Uint8Array;
function _t(t) {
  var e = new t.constructor(t.byteLength);
  return new Rt(e).set(new Rt(t)), e;
}
function $a(t, e) {
  var r = e ? _t(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.byteLength);
}
var Ta = /\w*$/;
function ja(t) {
  var e = new t.constructor(t.source, Ta.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var Ut = E ? E.prototype : void 0, Bt = Ut ? Ut.valueOf : void 0;
function va(t) {
  return Bt ? Object(Bt.call(t)) : {};
}
function wa(t, e) {
  var r = e ? _t(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
var Oa = "[object Boolean]", Sa = "[object Date]", Aa = "[object Map]", Pa = "[object Number]", Ea = "[object RegExp]", Ca = "[object Set]", Ia = "[object String]", ka = "[object Symbol]", xa = "[object ArrayBuffer]", Da = "[object DataView]", Va = "[object Float32Array]", La = "[object Float64Array]", Ma = "[object Int8Array]", Fa = "[object Int16Array]", za = "[object Int32Array]", Na = "[object Uint8Array]", Ra = "[object Uint8ClampedArray]", Ua = "[object Uint16Array]", Ba = "[object Uint32Array]";
function Ga(t, e, r) {
  var n = t.constructor;
  switch (e) {
    case xa:
      return _t(t);
    case Oa:
    case Sa:
      return new n(+t);
    case Da:
      return $a(t, r);
    case Va:
    case La:
    case Ma:
    case Fa:
    case za:
    case Na:
    case Ra:
    case Ua:
    case Ba:
      return wa(t, r);
    case Aa:
      return new n();
    case Pa:
    case Ia:
      return new n(t);
    case Ea:
      return ja(t);
    case Ca:
      return new n();
    case ka:
      return va(t);
  }
}
function Ka(t) {
  return typeof t.constructor == "function" && !X(t) ? or(ht(t)) : {};
}
var Wa = "[object Map]";
function qa(t) {
  return _(t) && m(t) == Wa;
}
var Gt = C && C.isMap, U = Gt ? Z(Gt) : qa, Ha = "[object Set]";
function Ya(t) {
  return _(t) && m(t) == Ha;
}
var Kt = C && C.isSet, B = Kt ? Z(Kt) : Ya, Xa = 1, Za = 2, Ja = 4, me = "[object Arguments]", Qa = "[object Array]", ti = "[object Boolean]", ei = "[object Date]", ri = "[object Error]", $e = "[object Function]", ni = "[object GeneratorFunction]", ai = "[object Map]", ii = "[object Number]", Te = "[object Object]", oi = "[object RegExp]", si = "[object Set]", ui = "[object String]", fi = "[object Symbol]", ci = "[object WeakMap]", li = "[object ArrayBuffer]", pi = "[object DataView]", gi = "[object Float32Array]", di = "[object Float64Array]", bi = "[object Int8Array]", hi = "[object Int16Array]", yi = "[object Int32Array]", _i = "[object Uint8Array]", mi = "[object Uint8ClampedArray]", $i = "[object Uint16Array]", Ti = "[object Uint32Array]", f = {};
f[me] = f[Qa] = f[li] = f[pi] = f[ti] = f[ei] = f[gi] = f[di] = f[bi] = f[hi] = f[yi] = f[ai] = f[ii] = f[Te] = f[oi] = f[si] = f[ui] = f[fi] = f[_i] = f[mi] = f[$i] = f[Ti] = !0;
f[ri] = f[$e] = f[ci] = !1;
function K(t, e, r, n, i, a) {
  var o, p = e & Xa, d = e & Za, g = e & Ja;
  if (o !== void 0)
    return o;
  if (!$(t))
    return t;
  var v = j(t);
  if (v) {
    if (o = ma(t), !p)
      return sr(t, o);
  } else {
    var S = m(t), w = S == $e || S == ni;
    if (pt(t))
      return ra(t, p);
    if (S == Te || S == me || w && !i) {
      if (o = d || w ? {} : Ka(t), !p)
        return d ? ua(t, ta(o, t)) : oa(t, Qn(o, t));
    } else {
      if (!f[S])
        return i ? t : {};
      o = Ga(t, S, p);
    }
  }
  a || (a = new V());
  var A = a.get(t);
  if (A)
    return A;
  a.set(t, o), B(t) ? t.forEach(function(h) {
    o.add(K(h, e, r, h, t, a));
  }) : U(t) && t.forEach(function(h, b) {
    o.set(b, K(h, e, r, b, t, a));
  });
  var L = g ? d ? ca : fa : d ? dt : gt, G = v ? void 0 : L(t);
  return ur(G || t, function(h, b) {
    G && (b = h, h = t[b]), ct(o, b, K(h, e, r, b, t, a));
  }), o;
}
var ji = 1, vi = 4;
function Wt(t) {
  return K(t, ji | vi);
}
var wi = "[object String]";
function Oi(t) {
  return typeof t == "string" || !j(t) && _(t) && y(t) == wi;
}
var Si = "[object Boolean]";
function je(t) {
  return t === !0 || t === !1 || _(t) && y(t) == Si;
}
var Ai = "[object Date]";
function Pi(t) {
  return _(t) && y(t) == Ai;
}
var qt = C && C.isDate, W = qt ? Z(qt) : Pi, Ei = "[object Map]", Ci = "[object Set]", Ii = Object.prototype, ki = Ii.hasOwnProperty;
function xi(t) {
  if (t == null)
    return !0;
  if (lt(t) && (j(t) || typeof t == "string" || typeof t.splice == "function" || pt(t) || se(t) || ae(t)))
    return !t.length;
  var e = m(t);
  if (e == Ei || e == Ci)
    return !t.size;
  if (X(t))
    return !ce(t).length;
  for (var r in t)
    if (ki.call(t, r))
      return !1;
  return !0;
}
var Di = "[object Number]";
function R(t) {
  return typeof t == "number" || _(t) && y(t) == Di;
}
function l(t) {
  return t == null;
}
function Vi(t, e, r, n) {
  if (!$(t))
    return t;
  e = le(e, t);
  for (var i = -1, a = e.length, o = a - 1, p = t; p != null && ++i < a; ) {
    var d = pe(e[i]), g = r;
    if (d === "__proto__" || d === "constructor" || d === "prototype")
      return t;
    if (i != o) {
      var v = p[d];
      g = void 0, g === void 0 && (g = $(v) ? v : Qt(e[i + 1]) ? [] : {});
    }
    ct(p, d, g), p = p[d];
  }
  return t;
}
function P(t, e, r) {
  return t == null ? t : Vi(t, e, r);
}
function Ht(t) {
  return t.trim().replace(" ", ".");
}
async function ut(t, e, r = "") {
  for (const n in t) {
    const i = `${r} ${n}`.trim();
    Wn(t[n]) ? ut(t[n], e, i) : await e(n, t[n], i);
  }
}
const Yt = {
  id: null,
  value: null,
  invalid: !1,
  errors: {}
};
function fo(t, e, { proactive: r = !1, autoclear: n = !1 } = {}) {
  const i = tt(!1), a = tt(!1), o = tt({}), p = Ie({
    // To improve speed, we do not perform autoclear when validation was
    // not performed yet
    didValidate: !1
  });
  n ? et(t, () => {
    p.didValidate && g();
  }, { deep: !0 }) : r && (et(t, () => v(), { deep: !0 }), ft(e) && et(e, () => v(), { deep: !0 })), g();
  function d() {
    ut(t, (w, A, L) => {
      P(o.value, Ht(L), Wt(Yt));
    }), Object.assign(p, { anyError: !1, pending: !1 });
  }
  function g() {
    p.didValidate = !1, d();
  }
  async function v(...w) {
    return g(), a.value = !0, new Promise(async (A, L) => {
      await ut(t, async (G, h, b) => {
        b = Ht(b), P(o.value, b, Wt(Yt));
        const Oe = u(e), $t = Nn(Oe, b);
        if ($t) {
          for (const [Tt, Se] of Object.entries($t)) {
            if (w.length > 0 && !w.includes(Tt))
              continue;
            const { label: Ae, validate: Pe, __skip: Ee } = Se;
            if (Ee)
              continue;
            const Ce = await Pe(h);
            P(o.value, `${b}.id`, G), P(o.value, `${b}.value`, h), Ce || (i.value = !0, P(o.value, `${b}.invalid`, !0), P(o.value, `${b}.errors.${Tt}`, Ae(h)));
          }
          return Promise.resolve();
        }
      }), a.value = !1, p.didValidate = !0, i.value ? L(o.value) : A(o.value);
    });
  }
  function S(w, A) {
    P(o.value, `${w}.errors.${A.key}`, A.message), P(o.value, `${w}.invalid`, !0);
  }
  return {
    reset: g,
    validate: v,
    addError: S,
    errors: o,
    anyError: i,
    pending: a
  };
}
const s = function(...t) {
  return {
    name: "skipped-rule",
    __skip: !0,
    validate: () => !0,
    label: () => "test"
  };
};
function mt(t, e, r) {
  return new Promise(async (n) => {
    const i = [];
    for (const a of e) {
      if (!a.validate)
        throw new Error("Rule is missing a validator function");
      const o = await a.validate(t);
      i.push(o);
    }
    switch (r) {
      case "every": {
        n(i.every((a) => a));
        break;
      }
      case "some": {
        n(i.some((a) => a));
        break;
      }
      case "none": {
        n(!i.every((a) => a));
        break;
      }
    }
  });
}
const ve = "Value does not satisfy the validation rule.";
function co(t, e, r) {
  return {
    skip: s,
    name: r ?? "custom-object-rule",
    __skip: !1,
    validate: (n) => t(n),
    label: (n) => l(e) ? ve : typeof e == "string" ? e : e(n)
  };
}
function lo(t, e, r) {
  return (i) => ({
    // the value from validate is the actual value we are testing against
    // injected during validation
    __skip: !1,
    name: r ?? "custom-param-rule",
    validate: (a) => t(a, i),
    label: (a) => l(e) ? ve : typeof e == "string" ? e : e(a, i)
  });
}
function po(t, e) {
  const { validate: r, __skip: n, name: i } = e;
  if (l(r))
    throw new Error("[withLabel] Missing validator function");
  return {
    name: i,
    __skip: n,
    validate: r,
    label: (a) => typeof t == "string" ? t : t(a)
  };
}
function go(t, e) {
  return je(t) ? t ? e : s() : ft(t) ? t.value ? e : s() : H(t) ? t() ? e : s() : t.then((r) => r ? e : s());
}
function bo(t, e) {
  return je(t) ? t ? s() : e : ft(t) ? t.value ? s() : e : H(t) ? t() ? s() : e : t.then((r) => r ? s() : e);
}
function Li(...t) {
  return {
    name: "and-validator",
    __skip: !1,
    validate: (e) => mt(e, t, "every"),
    label() {
      return "Value must pass all the required checks";
    }
  };
}
Li.skip = s;
function Mi(...t) {
  return {
    name: "or-validator",
    __skip: !1,
    validate: (e) => mt(e, t, "some"),
    label() {
      return "Value must pass some of the checks";
    }
  };
}
Mi.skip = s;
function Fi(...t) {
  return {
    name: "not-validator",
    __skip: !1,
    validate: (e) => mt(e, t, "none"),
    label() {
      return "Value must pass none of the checks";
    }
  };
}
Fi.skip = s();
function ho(t, e) {
  return t.validate(e);
}
const yo = {
  __skip: !1,
  name: "required",
  skip: s,
  validate: (t) => l(t) || t === "null" || t === "undefined" ? !1 : typeof t == "string" ? t.length > 0 : typeof t == "number" ? !0 : !xi(t),
  /* c8 ignore next 3 */
  label: () => "Value is required"
};
function zi(t) {
  return {
    name: "minLength",
    __skip: !1,
    validate: (e) => l(e) ? !1 : (t = u(t), B(e) || U(e) ? e.size >= t : $(e) ? Object.keys(e).length >= t : e != null && e.length ? e.length >= t : !1),
    /* c8 ignore next 3 */
    label: () => `Value must be greater or equal to ${u(t)}`
  };
}
zi.skip = s;
function Ni(t) {
  return {
    name: "maxLength",
    __skip: !1,
    validate: (e) => l(e) ? !1 : (t = u(t), B(e) || U(e) ? e.size <= t : $(e) ? Object.keys(e).length <= t : e != null && e.length ? e.length <= t : !1),
    /* c8 ignore next 3 */
    label: () => `Value must be lesser or equal to ${u(t)}`
  };
}
Ni.skip = s;
const Ri = /^([\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i, Ui = /[^a-z0-9]/i, we = /\S/g, _o = {
  __skip: !1,
  name: "email",
  skip: s,
  validate: (t) => l(t) ? !1 : Ri.test(t),
  /* c8 ignore next 3 */
  label: () => "Value must be in a valid email format"
};
function Bi(t, e = !1) {
  return {
    name: "sameAs",
    __skip: !1,
    validate: (r) => (t = u(t), e ? u(r) == u(t) : u(r) === u(t)),
    /* c8 ignore next 3 */
    label: () => "Values must be matching"
  };
}
Bi.skip = s;
function Gi(t) {
  const e = typeof t == "string" ? new RegExp(t) : t;
  return {
    name: "match",
    __skip: !1,
    validate: (r) => l(r) ? !1 : e.test(r),
    /* c8 ignore next 3 */
    label: () => "Value must match the provided rule."
  };
}
Gi.skip = s;
const mo = {
  __skip: !1,
  name: "url",
  skip: s,
  validate: (t) => {
    if (l(t))
      return !1;
    try {
      return new URL(t) instanceof URL;
    } catch {
      return !1;
    }
  },
  label: () => "Value must be a valid URL"
}, Ki = {
  __skip: !1,
  name: "str",
  skip: s,
  validate: (t) => l(t) ? !1 : Oi(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a string`
}, Wi = {
  name: "num",
  __skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : R(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a number`
}, qi = {
  name: "arr",
  __skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : j(t),
  label: ({ value: t }) => `Value <${typeof t}> must be an Array`
}, Hi = {
  name: "obj",
  __skip: !1,
  skip: s,
  validate: (t) => l(t) || j(t) || B(t) || U(t) ? !1 : $(t),
  label: ({ value: t }) => `Value <${typeof t}> must be an Object`
}, Yi = {
  name: "set",
  __skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : B(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Set`
}, Xi = {
  name: "map",
  __skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : U(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Map`
}, Zi = {
  name: "date",
  __skip: !1,
  skip: s,
  validate: (t) => {
    if (l(t) || t == "Invalid Date")
      return !1;
    if (W(t) && t.getTime())
      return !0;
    const e = new Date(t);
    return W(e);
  },
  label: ({ value: t }) => `Value <${typeof t}> must be a valid Date object`
}, Ji = {
  name: "symbol",
  __skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : q(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Symbol`
}, Qi = {
  str: Ki,
  num: Wi,
  arr: qi,
  obj: Hi,
  set: Yi,
  map: Xi,
  date: Zi,
  symbol: Ji
};
function to(t, e) {
  return {
    __skip: !1,
    name: "between",
    validate: (r) => l(r) ? !1 : (t = u(t), e = u(e), Qi.date.validate(r) && (t = t instanceof Date ? t.getTime() : new Date(t).getTime(), e = e instanceof Date ? e.getTime() : new Date(e).getTime(), r = r instanceof Date ? r.getTime() : new Date(r).getTime()), r >= t && r <= e),
    label: () => `Value must be between ${u(t)} and ${u(e)}`
  };
}
to.skip = s;
function eo(t) {
  return {
    name: "minValue",
    __skip: !1,
    validate: (e) => l(e) ? !1 : (t = u(t), R(e) && R(t) ? e >= t : W(e) ? new Date(e) >= new Date(t) : !1),
    /* c8 ignore next 3 */
    label: () => `Minimum allowed value is ${u(t)}`
  };
}
eo.skip = s;
function ro(t) {
  return {
    name: "maxValue",
    __skip: !1,
    validate: (e) => l(e) ? !1 : (t = u(t), R(e) && R(t) ? e <= t : W(e) ? new Date(e) <= new Date(t) : !1),
    /* c8 ignore next 3 */
    label: () => `Value must be shorter or equal to ${u(t)}`
  };
}
ro.skip = s;
function no(t) {
  return {
    __skip: !1,
    name: "maxLenNoSpace",
    validate: (e) => {
      if (l(e) || typeof e != "string")
        return !1;
      t = u(t);
      const r = e.match(we);
      return r ? r.length <= t : !1;
    },
    label: (e) => typeof e != "string" ? "Value must be a string and " : `Value must have maximal lenght of ${u(t)} excluding spaces`
  };
}
no.skip = s;
function ao(t) {
  return {
    name: "minLenNoSpace",
    __skip: !1,
    validate: (e) => {
      if (l(e) || typeof e != "string")
        return !1;
      t = u(t);
      const r = e.match(we);
      return r ? r.length >= t : !1;
    },
    /* c8 ignore next 3 */
    label: () => `Value must have minimal lenght of ${u(t)} excluding spaces`
  };
}
ao.skip = s;
const $o = {
  __skip: !1,
  name: "hasSpecialChars",
  skip: s,
  validate: (t) => l(t) ? !1 : !Ui.test(t),
  label: (t) => typeof t != "string" ? "Value must be a string and contain no special characters" : "Value must not contain any special characters"
};
function io(t, e = !1) {
  return {
    __skip: !1,
    name: "contains",
    validate: (r) => l(r) || typeof r != "string" ? !1 : (typeof t == "string" && (t = e ? [t] : t.trim().split(/\s+/)), t.every((n) => r.toLowerCase().includes(n.toLowerCase()))),
    label: (r) => {
      t = u(t);
      const n = typeof t == "string" ? t : t.join(", ");
      return typeof r != "string" ? `Value must be a string and contain <${n}>` : `Value must contain <${n}>`;
    }
  };
}
io.skip = s;
function oo(t, e) {
  return {
    __skip: !1,
    name: "startsWith",
    validate: (r) => (t = u(t), !r || typeof r != "string" ? !1 : r.startsWith(t, e)),
    label: (r) => typeof r != "string" ? `Value must be a string and start with '${u(t)}'` : `Value must start with '${u(t)}'`
  };
}
oo.skip = s;
function so(t, e) {
  return {
    __skip: !1,
    name: "endsWith",
    validate: (r) => (t = u(t), !r || typeof r != "string" ? !1 : r.endsWith(t, e)),
    label: (r) => typeof r != "string" ? `Value must be a string and end with '${u(t)}'` : `Value must end with '${u(t)}'`
  };
}
so.skip = s;
export {
  Li as $and,
  Fi as $not,
  Mi as $or,
  ho as $test,
  go as $validateIf,
  bo as $validateIfNot,
  po as $withLabel,
  to as between,
  io as contains,
  co as createRule,
  lo as createRuleArg,
  _o as email,
  so as endsWith,
  $o as hasSpecialChars,
  qi as isArr,
  Zi as isDate,
  Xi as isMap,
  Wi as isNum,
  Hi as isObj,
  Yi as isSet,
  Ki as isStr,
  Ji as isSymbol,
  Gi as match,
  no as maxLenNoSpace,
  Ni as maxLength,
  ro as maxValue,
  ao as minLenNoSpace,
  zi as minLength,
  eo as minValue,
  yo as required,
  Bi as sameAs,
  oo as startsWith,
  Qi as type,
  mo as url,
  fo as useValidation
};
