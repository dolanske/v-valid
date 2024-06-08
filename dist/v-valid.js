import { reactive as Se, watch as et, isRef as ut, unref as f } from "vue-demi";
var Ht = typeof global == "object" && global && global.Object === Object && global, Pe = typeof self == "object" && self && self.Object === Object && self, v = Ht || Pe || Function("return this")(), E = v.Symbol, qt = Object.prototype, Ee = qt.hasOwnProperty, Ce = qt.toString, z = E ? E.toStringTag : void 0;
function Ie(t) {
  var e = Ee.call(t, z), r = t[z];
  try {
    t[z] = void 0;
    var n = !0;
  } catch {
  }
  var a = Ce.call(t);
  return n && (e ? t[z] = r : delete t[z]), a;
}
var ke = Object.prototype, xe = ke.toString;
function De(t) {
  return xe.call(t);
}
var Ve = "[object Null]", Me = "[object Undefined]", Tt = E ? E.toStringTag : void 0;
function $(t) {
  return t == null ? t === void 0 ? Me : Ve : Tt && Tt in Object(t) ? Ie(t) : De(t);
}
function T(t) {
  return t != null && typeof t == "object";
}
var ze = "[object Symbol]";
function q(t) {
  return typeof t == "symbol" || T(t) && $(t) == ze;
}
function Fe(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, a = Array(n); ++r < n; )
    a[r] = e(t[r], r, t);
  return a;
}
var O = Array.isArray, Le = 1 / 0, mt = E ? E.prototype : void 0, jt = mt ? mt.toString : void 0;
function Wt(t) {
  if (typeof t == "string")
    return t;
  if (O(t))
    return Fe(t, Wt) + "";
  if (q(t))
    return jt ? jt.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Le ? "-0" : e;
}
function w(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Ne = "[object AsyncFunction]", Re = "[object Function]", Ue = "[object GeneratorFunction]", Be = "[object Proxy]";
function W(t) {
  if (!w(t))
    return !1;
  var e = $(t);
  return e == Re || e == Ue || e == Ne || e == Be;
}
var rt = v["__core-js_shared__"], wt = function() {
  var t = /[^.]+$/.exec(rt && rt.keys && rt.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Ge(t) {
  return !!wt && wt in t;
}
var Ke = Function.prototype, Ze = Ke.toString;
function x(t) {
  if (t != null) {
    try {
      return Ze.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var He = /[\\^$.*+?()[\]{}|]/g, qe = /^\[object .+?Constructor\]$/, We = Function.prototype, Ye = Object.prototype, Xe = We.toString, Je = Ye.hasOwnProperty, Qe = RegExp(
  "^" + Xe.call(Je).replace(He, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function tr(t) {
  if (!w(t) || Ge(t))
    return !1;
  var e = W(t) ? Qe : qe;
  return e.test(x(t));
}
function er(t, e) {
  return t == null ? void 0 : t[e];
}
function D(t, e) {
  var r = er(t, e);
  return tr(r) ? r : void 0;
}
var it = D(v, "WeakMap"), vt = Object.create, rr = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!w(e))
      return {};
    if (vt)
      return vt(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}();
function nr(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var Ot = function() {
  try {
    var t = D(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
function ar(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n && e(t[r], r, t) !== !1; )
    ;
  return t;
}
var ir = 9007199254740991, sr = /^(?:0|[1-9]\d*)$/;
function Yt(t, e) {
  var r = typeof t;
  return e = e ?? ir, !!e && (r == "number" || r != "symbol" && sr.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Xt(t, e, r) {
  e == "__proto__" && Ot ? Ot(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function Jt(t, e) {
  return t === e || t !== t && e !== e;
}
var or = Object.prototype, fr = or.hasOwnProperty;
function ct(t, e, r) {
  var n = t[e];
  (!(fr.call(t, e) && Jt(n, r)) || r === void 0 && !(e in t)) && Xt(t, e, r);
}
function Y(t, e, r, n) {
  var a = !r;
  r || (r = {});
  for (var i = -1, o = e.length; ++i < o; ) {
    var p = e[i], d = void 0;
    d === void 0 && (d = t[p]), a ? Xt(r, p, d) : ct(r, p, d);
  }
  return r;
}
var ur = 9007199254740991;
function Qt(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ur;
}
function lt(t) {
  return t != null && Qt(t.length) && !W(t);
}
var cr = Object.prototype;
function X(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || cr;
  return t === r;
}
function lr(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var pr = "[object Arguments]";
function At(t) {
  return T(t) && $(t) == pr;
}
var te = Object.prototype, gr = te.hasOwnProperty, dr = te.propertyIsEnumerable, ee = At(/* @__PURE__ */ function() {
  return arguments;
}()) ? At : function(t) {
  return T(t) && gr.call(t, "callee") && !dr.call(t, "callee");
};
function br() {
  return !1;
}
var re = typeof exports == "object" && exports && !exports.nodeType && exports, St = re && typeof module == "object" && module && !module.nodeType && module, hr = St && St.exports === re, Pt = hr ? v.Buffer : void 0, yr = Pt ? Pt.isBuffer : void 0, pt = yr || br, _r = "[object Arguments]", $r = "[object Array]", Tr = "[object Boolean]", mr = "[object Date]", jr = "[object Error]", wr = "[object Function]", vr = "[object Map]", Or = "[object Number]", Ar = "[object Object]", Sr = "[object RegExp]", Pr = "[object Set]", Er = "[object String]", Cr = "[object WeakMap]", Ir = "[object ArrayBuffer]", kr = "[object DataView]", xr = "[object Float32Array]", Dr = "[object Float64Array]", Vr = "[object Int8Array]", Mr = "[object Int16Array]", zr = "[object Int32Array]", Fr = "[object Uint8Array]", Lr = "[object Uint8ClampedArray]", Nr = "[object Uint16Array]", Rr = "[object Uint32Array]", c = {};
c[xr] = c[Dr] = c[Vr] = c[Mr] = c[zr] = c[Fr] = c[Lr] = c[Nr] = c[Rr] = !0;
c[_r] = c[$r] = c[Ir] = c[Tr] = c[kr] = c[mr] = c[jr] = c[wr] = c[vr] = c[Or] = c[Ar] = c[Sr] = c[Pr] = c[Er] = c[Cr] = !1;
function Ur(t) {
  return T(t) && Qt(t.length) && !!c[$(t)];
}
function J(t) {
  return function(e) {
    return t(e);
  };
}
var ne = typeof exports == "object" && exports && !exports.nodeType && exports, F = ne && typeof module == "object" && module && !module.nodeType && module, Br = F && F.exports === ne, nt = Br && Ht.process, C = function() {
  try {
    var t = F && F.require && F.require("util").types;
    return t || nt && nt.binding && nt.binding("util");
  } catch {
  }
}(), Et = C && C.isTypedArray, ae = Et ? J(Et) : Ur, Gr = Object.prototype, Kr = Gr.hasOwnProperty;
function ie(t, e) {
  var r = O(t), n = !r && ee(t), a = !r && !n && pt(t), i = !r && !n && !a && ae(t), o = r || n || a || i, p = o ? lr(t.length, String) : [], d = p.length;
  for (var g in t)
    (e || Kr.call(t, g)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (g == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (g == "offset" || g == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (g == "buffer" || g == "byteLength" || g == "byteOffset") || // Skip index properties.
    Yt(g, d))) && p.push(g);
  return p;
}
function se(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var Zr = se(Object.keys, Object), Hr = Object.prototype, qr = Hr.hasOwnProperty;
function oe(t) {
  if (!X(t))
    return Zr(t);
  var e = [];
  for (var r in Object(t))
    qr.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function gt(t) {
  return lt(t) ? ie(t) : oe(t);
}
function Wr(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var Yr = Object.prototype, Xr = Yr.hasOwnProperty;
function Jr(t) {
  if (!w(t))
    return Wr(t);
  var e = X(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !Xr.call(t, n)) || r.push(n);
  return r;
}
function dt(t) {
  return lt(t) ? ie(t, !0) : Jr(t);
}
var Qr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, tn = /^\w*$/;
function en(t, e) {
  if (O(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || q(t) ? !0 : tn.test(t) || !Qr.test(t) || e != null && t in Object(e);
}
var L = D(Object, "create");
function rn() {
  this.__data__ = L ? L(null) : {}, this.size = 0;
}
function nn(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var an = "__lodash_hash_undefined__", sn = Object.prototype, on = sn.hasOwnProperty;
function fn(t) {
  var e = this.__data__;
  if (L) {
    var r = e[t];
    return r === an ? void 0 : r;
  }
  return on.call(e, t) ? e[t] : void 0;
}
var un = Object.prototype, cn = un.hasOwnProperty;
function ln(t) {
  var e = this.__data__;
  return L ? e[t] !== void 0 : cn.call(e, t);
}
var pn = "__lodash_hash_undefined__";
function gn(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = L && e === void 0 ? pn : e, this;
}
function k(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
k.prototype.clear = rn;
k.prototype.delete = nn;
k.prototype.get = fn;
k.prototype.has = ln;
k.prototype.set = gn;
function dn() {
  this.__data__ = [], this.size = 0;
}
function Q(t, e) {
  for (var r = t.length; r--; )
    if (Jt(t[r][0], e))
      return r;
  return -1;
}
var bn = Array.prototype, hn = bn.splice;
function yn(t) {
  var e = this.__data__, r = Q(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : hn.call(e, r, 1), --this.size, !0;
}
function _n(t) {
  var e = this.__data__, r = Q(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function $n(t) {
  return Q(this.__data__, t) > -1;
}
function Tn(t, e) {
  var r = this.__data__, n = Q(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function A(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
A.prototype.clear = dn;
A.prototype.delete = yn;
A.prototype.get = _n;
A.prototype.has = $n;
A.prototype.set = Tn;
var N = D(v, "Map");
function mn() {
  this.size = 0, this.__data__ = {
    hash: new k(),
    map: new (N || A)(),
    string: new k()
  };
}
function jn(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function tt(t, e) {
  var r = t.__data__;
  return jn(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function wn(t) {
  var e = tt(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function vn(t) {
  return tt(this, t).get(t);
}
function On(t) {
  return tt(this, t).has(t);
}
function An(t, e) {
  var r = tt(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function I(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
I.prototype.clear = mn;
I.prototype.delete = wn;
I.prototype.get = vn;
I.prototype.has = On;
I.prototype.set = An;
var Sn = "Expected a function";
function bt(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Sn);
  var r = function() {
    var n = arguments, a = e ? e.apply(this, n) : n[0], i = r.cache;
    if (i.has(a))
      return i.get(a);
    var o = t.apply(this, n);
    return r.cache = i.set(a, o) || i, o;
  };
  return r.cache = new (bt.Cache || I)(), r;
}
bt.Cache = I;
var Pn = 500;
function En(t) {
  var e = bt(t, function(n) {
    return r.size === Pn && r.clear(), n;
  }), r = e.cache;
  return e;
}
var Cn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, In = /\\(\\)?/g, kn = En(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Cn, function(r, n, a, i) {
    e.push(a ? i.replace(In, "$1") : n || r);
  }), e;
});
function xn(t) {
  return t == null ? "" : Wt(t);
}
function fe(t, e) {
  return O(t) ? t : en(t, e) ? [t] : kn(xn(t));
}
var Dn = 1 / 0;
function ue(t) {
  if (typeof t == "string" || q(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -Dn ? "-0" : e;
}
function Vn(t, e) {
  e = fe(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[ue(e[r++])];
  return r && r == n ? t : void 0;
}
function Mn(t, e, r) {
  var n = t == null ? void 0 : Vn(t, e);
  return n === void 0 ? r : n;
}
function ce(t, e) {
  for (var r = -1, n = e.length, a = t.length; ++r < n; )
    t[a + r] = e[r];
  return t;
}
var ht = se(Object.getPrototypeOf, Object), zn = "[object Object]", Fn = Function.prototype, Ln = Object.prototype, le = Fn.toString, Nn = Ln.hasOwnProperty, Rn = le.call(Object);
function Un(t) {
  if (!T(t) || $(t) != zn)
    return !1;
  var e = ht(t);
  if (e === null)
    return !0;
  var r = Nn.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && le.call(r) == Rn;
}
function Bn() {
  this.__data__ = new A(), this.size = 0;
}
function Gn(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function Kn(t) {
  return this.__data__.get(t);
}
function Zn(t) {
  return this.__data__.has(t);
}
var Hn = 200;
function qn(t, e) {
  var r = this.__data__;
  if (r instanceof A) {
    var n = r.__data__;
    if (!N || n.length < Hn - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new I(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function V(t) {
  var e = this.__data__ = new A(t);
  this.size = e.size;
}
V.prototype.clear = Bn;
V.prototype.delete = Gn;
V.prototype.get = Kn;
V.prototype.has = Zn;
V.prototype.set = qn;
function Wn(t, e) {
  return t && Y(e, gt(e), t);
}
function Yn(t, e) {
  return t && Y(e, dt(e), t);
}
var pe = typeof exports == "object" && exports && !exports.nodeType && exports, Ct = pe && typeof module == "object" && module && !module.nodeType && module, Xn = Ct && Ct.exports === pe, It = Xn ? v.Buffer : void 0, kt = It ? It.allocUnsafe : void 0;
function Jn(t, e) {
  if (e)
    return t.slice();
  var r = t.length, n = kt ? kt(r) : new t.constructor(r);
  return t.copy(n), n;
}
function Qn(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, a = 0, i = []; ++r < n; ) {
    var o = t[r];
    e(o, r, t) && (i[a++] = o);
  }
  return i;
}
function ge() {
  return [];
}
var ta = Object.prototype, ea = ta.propertyIsEnumerable, xt = Object.getOwnPropertySymbols, yt = xt ? function(t) {
  return t == null ? [] : (t = Object(t), Qn(xt(t), function(e) {
    return ea.call(t, e);
  }));
} : ge;
function ra(t, e) {
  return Y(t, yt(t), e);
}
var na = Object.getOwnPropertySymbols, de = na ? function(t) {
  for (var e = []; t; )
    ce(e, yt(t)), t = ht(t);
  return e;
} : ge;
function aa(t, e) {
  return Y(t, de(t), e);
}
function be(t, e, r) {
  var n = e(t);
  return O(t) ? n : ce(n, r(t));
}
function ia(t) {
  return be(t, gt, yt);
}
function sa(t) {
  return be(t, dt, de);
}
var st = D(v, "DataView"), ot = D(v, "Promise"), ft = D(v, "Set"), Dt = "[object Map]", oa = "[object Object]", Vt = "[object Promise]", Mt = "[object Set]", zt = "[object WeakMap]", Ft = "[object DataView]", fa = x(st), ua = x(N), ca = x(ot), la = x(ft), pa = x(it), j = $;
(st && j(new st(new ArrayBuffer(1))) != Ft || N && j(new N()) != Dt || ot && j(ot.resolve()) != Vt || ft && j(new ft()) != Mt || it && j(new it()) != zt) && (j = function(t) {
  var e = $(t), r = e == oa ? t.constructor : void 0, n = r ? x(r) : "";
  if (n)
    switch (n) {
      case fa:
        return Ft;
      case ua:
        return Dt;
      case ca:
        return Vt;
      case la:
        return Mt;
      case pa:
        return zt;
    }
  return e;
});
var ga = Object.prototype, da = ga.hasOwnProperty;
function ba(t) {
  var e = t.length, r = new t.constructor(e);
  return e && typeof t[0] == "string" && da.call(t, "index") && (r.index = t.index, r.input = t.input), r;
}
var Lt = v.Uint8Array;
function _t(t) {
  var e = new t.constructor(t.byteLength);
  return new Lt(e).set(new Lt(t)), e;
}
function ha(t, e) {
  var r = e ? _t(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.byteLength);
}
var ya = /\w*$/;
function _a(t) {
  var e = new t.constructor(t.source, ya.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var Nt = E ? E.prototype : void 0, Rt = Nt ? Nt.valueOf : void 0;
function $a(t) {
  return Rt ? Object(Rt.call(t)) : {};
}
function Ta(t, e) {
  var r = e ? _t(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
var ma = "[object Boolean]", ja = "[object Date]", wa = "[object Map]", va = "[object Number]", Oa = "[object RegExp]", Aa = "[object Set]", Sa = "[object String]", Pa = "[object Symbol]", Ea = "[object ArrayBuffer]", Ca = "[object DataView]", Ia = "[object Float32Array]", ka = "[object Float64Array]", xa = "[object Int8Array]", Da = "[object Int16Array]", Va = "[object Int32Array]", Ma = "[object Uint8Array]", za = "[object Uint8ClampedArray]", Fa = "[object Uint16Array]", La = "[object Uint32Array]";
function Na(t, e, r) {
  var n = t.constructor;
  switch (e) {
    case Ea:
      return _t(t);
    case ma:
    case ja:
      return new n(+t);
    case Ca:
      return ha(t, r);
    case Ia:
    case ka:
    case xa:
    case Da:
    case Va:
    case Ma:
    case za:
    case Fa:
    case La:
      return Ta(t, r);
    case wa:
      return new n();
    case va:
    case Sa:
      return new n(t);
    case Oa:
      return _a(t);
    case Aa:
      return new n();
    case Pa:
      return $a(t);
  }
}
function Ra(t) {
  return typeof t.constructor == "function" && !X(t) ? rr(ht(t)) : {};
}
var Ua = "[object Map]";
function Ba(t) {
  return T(t) && j(t) == Ua;
}
var Ut = C && C.isMap, U = Ut ? J(Ut) : Ba, Ga = "[object Set]";
function Ka(t) {
  return T(t) && j(t) == Ga;
}
var Bt = C && C.isSet, B = Bt ? J(Bt) : Ka, Za = 1, Ha = 2, qa = 4, he = "[object Arguments]", Wa = "[object Array]", Ya = "[object Boolean]", Xa = "[object Date]", Ja = "[object Error]", ye = "[object Function]", Qa = "[object GeneratorFunction]", ti = "[object Map]", ei = "[object Number]", _e = "[object Object]", ri = "[object RegExp]", ni = "[object Set]", ai = "[object String]", ii = "[object Symbol]", si = "[object WeakMap]", oi = "[object ArrayBuffer]", fi = "[object DataView]", ui = "[object Float32Array]", ci = "[object Float64Array]", li = "[object Int8Array]", pi = "[object Int16Array]", gi = "[object Int32Array]", di = "[object Uint8Array]", bi = "[object Uint8ClampedArray]", hi = "[object Uint16Array]", yi = "[object Uint32Array]", u = {};
u[he] = u[Wa] = u[oi] = u[fi] = u[Ya] = u[Xa] = u[ui] = u[ci] = u[li] = u[pi] = u[gi] = u[ti] = u[ei] = u[_e] = u[ri] = u[ni] = u[ai] = u[ii] = u[di] = u[bi] = u[hi] = u[yi] = !0;
u[Ja] = u[ye] = u[si] = !1;
function K(t, e, r, n, a, i) {
  var o, p = e & Za, d = e & Ha, g = e & qa;
  if (o !== void 0)
    return o;
  if (!w(t))
    return t;
  var y = O(t);
  if (y) {
    if (o = ba(t), !p)
      return nr(t, o);
  } else {
    var h = j(t), M = h == ye || h == Qa;
    if (pt(t))
      return Jn(t, p);
    if (h == _e || h == he || M && !a) {
      if (o = d || M ? {} : Ra(t), !p)
        return d ? aa(t, Yn(o, t)) : ra(t, Wn(o, t));
    } else {
      if (!u[h])
        return a ? t : {};
      o = Na(t, h, p);
    }
  }
  i || (i = new V());
  var S = i.get(t);
  if (S)
    return S;
  i.set(t, o), B(t) ? t.forEach(function(_) {
    o.add(K(_, e, r, _, t, i));
  }) : U(t) && t.forEach(function(_, m) {
    o.set(m, K(_, e, r, m, t, i));
  });
  var b = g ? d ? sa : ia : d ? dt : gt, G = y ? void 0 : b(t);
  return ar(G || t, function(_, m) {
    G && (m = _, _ = t[m]), ct(o, m, K(_, e, r, m, t, i));
  }), o;
}
var _i = 1, $i = 4;
function Gt(t) {
  return K(t, _i | $i);
}
var Ti = "[object String]";
function mi(t) {
  return typeof t == "string" || !O(t) && T(t) && $(t) == Ti;
}
var ji = "[object Boolean]";
function $e(t) {
  return t === !0 || t === !1 || T(t) && $(t) == ji;
}
var wi = "[object Date]";
function vi(t) {
  return T(t) && $(t) == wi;
}
var Kt = C && C.isDate, H = Kt ? J(Kt) : vi, Oi = "[object Map]", Ai = "[object Set]", Si = Object.prototype, Pi = Si.hasOwnProperty;
function Ei(t) {
  if (t == null)
    return !0;
  if (lt(t) && (O(t) || typeof t == "string" || typeof t.splice == "function" || pt(t) || ae(t) || ee(t)))
    return !t.length;
  var e = j(t);
  if (e == Oi || e == Ai)
    return !t.size;
  if (X(t))
    return !oe(t).length;
  for (var r in t)
    if (Pi.call(t, r))
      return !1;
  return !0;
}
var Ci = "[object Number]";
function R(t) {
  return typeof t == "number" || T(t) && $(t) == Ci;
}
function l(t) {
  return t == null;
}
function Ii(t, e, r, n) {
  if (!w(t))
    return t;
  e = fe(e, t);
  for (var a = -1, i = e.length, o = i - 1, p = t; p != null && ++a < i; ) {
    var d = ue(e[a]), g = r;
    if (d === "__proto__" || d === "constructor" || d === "prototype")
      return t;
    if (a != o) {
      var y = p[d];
      g = void 0, g === void 0 && (g = w(y) ? y : Yt(e[a + 1]) ? [] : {});
    }
    ct(p, d, g), p = p[d];
  }
  return t;
}
function P(t, e, r) {
  return t == null ? t : Ii(t, e, r);
}
const at = (t) => t.trim().replace(" ", "."), Zt = {
  id: null,
  value: null,
  invalid: !1,
  errors: {}
};
async function Z(t, e, r = "") {
  for (const n in t) {
    const a = `${r} ${n}`;
    Un(t[n]) ? Z(t[n], e, a) : await e(n, t[n], a);
  }
}
function is(t, e, { proactive: r = !1, autoclear: n = !1 } = {}) {
  const a = Se({
    anyError: !1,
    pending: !1,
    errors: {},
    // To improve speed, we do not perform autoclear when validation was
    // not performed  yet
    didValidate: !1
  });
  n ? et(t, () => {
    a.didValidate && o();
  }, { deep: !0 }) : r && (et(t, () => p(), { deep: !0 }), ut(e) && et(e, () => p(), { deep: !0 })), o();
  function i() {
    Z(t, (g, y, h) => {
      P(a.errors, at(h), Gt(Zt));
    }), Object.assign(a, { anyError: !1, pending: !1 });
  }
  function o() {
    a.didValidate = !1, i();
  }
  async function p(...g) {
    return o(), a.pending = !0, new Promise(async (y, h) => {
      await Z(t, async (M, S, b) => {
        b = at(b), P(a.errors, b, Gt(Zt));
        const G = f(e), _ = Mn(G, b);
        if (_) {
          for (const [m, je] of Object.entries(_)) {
            if (g.length > 0 && !g.includes(m))
              continue;
            const { label: we, validate: ve, _skip: Oe } = je;
            if (Oe)
              continue;
            const Ae = await ve(S);
            P(a.errors, `${b}.id`, M), P(a.errors, `${b}.value`, S), Ae || (a.anyError = !0, P(a.errors, `${b}.invalid`, !0), P(a.errors, `${b}.errors.${m}`, we(S)));
          }
          return Promise.resolve();
        }
      }), a.pending = !1, a.didValidate = !0, a.anyError ? h(a.errors) : y(a.errors);
    });
  }
  function d(g, y) {
    return Z(t, (h, M, S) => {
      if (g === h) {
        const b = at(S);
        P(a.errors, `${b}.errors.${y.errorKey}`, y.message), P(a.errors, `${b}.invalid`, !0);
      }
    });
  }
  return {
    reset: o,
    validate: p,
    run: p,
    addError: d,
    errors: a.errors,
    $: a
  };
}
const s = function(...t) {
  return {
    _skip: !0,
    validate: () => !0,
    label: () => "test"
  };
}, $t = (t, e, r) => new Promise(async (n) => {
  const a = [];
  for (const i of e) {
    if (!i.validate)
      throw new Error("Rule is missing a validator function");
    const o = await i.validate(t);
    a.push(o);
  }
  switch (r) {
    case "every": {
      n(a.every((i) => i));
      break;
    }
    case "some": {
      n(a.some((i) => i));
      break;
    }
    case "none": {
      n(!a.every((i) => i));
      break;
    }
  }
}), Te = "Value does not satisfy the validation rule.";
function ss(t, e) {
  return {
    skip: s,
    _skip: !1,
    validate: (r) => t(r),
    label: (r) => l(e) ? Te : typeof e == "string" ? e : e(r)
  };
}
function os(t, e) {
  return (n) => ({
    // the value from validate is the actual value we are testing against
    // injected during validation
    _skip: !1,
    validate: (a) => t(a, n),
    label: (a) => l(e) ? Te : typeof e == "string" ? e : e(a, n)
  });
}
const fs = (t, e) => {
  const { validate: r, _skip: n } = e;
  if (l(r))
    throw new Error("[withLabel] Missing validator function");
  return {
    _skip: n,
    validate: r,
    label: (a) => typeof t == "string" ? t : t(a)
  };
}, us = (t, e) => $e(t) ? t ? e : s() : ut(t) ? t.value ? e : s() : W(t) ? t() ? e : s() : t.then((r) => r ? e : s()), cs = (t, e) => $e(t) ? t ? s() : e : ut(t) ? t.value ? s() : e : W(t) ? t() ? s() : e : t.then((r) => r ? s() : e), ki = (...t) => ({
  _skip: !1,
  validate: (e) => $t(e, t, "every"),
  label() {
    return "Value must pass all the required checks";
  }
});
ki.skip = s;
const xi = (...t) => ({
  _skip: !1,
  validate: (e) => $t(e, t, "some"),
  label() {
    return "Value must pass some of the checks";
  }
});
xi.skip = s;
const Di = (...t) => ({
  _skip: !1,
  validate: (e) => $t(e, t, "none"),
  label() {
    return "Value must pass none of the checks";
  }
});
Di.skip = s();
const ls = (t, e) => {
  const r = t.validate(e);
  return r instanceof Promise, r;
}, ps = {
  _skip: !1,
  skip: s,
  validate: (t) => l(t) || t === "null" || t === "undefined" ? !1 : typeof t == "string" ? t.length > 0 : typeof t == "number" ? !0 : !Ei(t),
  /* c8 ignore next 3 */
  label: () => "Value is required"
}, Vi = (t) => ({
  _skip: !1,
  validate: (e) => l(e) ? !1 : (t = f(t), B(e) || U(e) ? e.size >= t : w(e) ? Object.keys(e).length >= t : e != null && e.length ? e.length >= t : !1),
  /* c8 ignore next 3 */
  label: () => `Value must be greater or equal to ${f(t)}`
});
Vi.skip = s;
const Mi = (t) => ({
  _skip: !1,
  validate: (e) => l(e) ? !1 : (t = f(t), B(e) || U(e) ? e.size <= t : w(e) ? Object.keys(e).length <= t : e != null && e.length ? e.length <= t : !1),
  /* c8 ignore next 3 */
  label: () => `Value must be lesser or equal to ${f(t)}`
});
Mi.skip = s;
const zi = /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/, Fi = /[^a-zA-Z0-9]/, me = /\S/g, gs = {
  _skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : zi.test(t),
  /* c8 ignore next 3 */
  label: () => "Value must be in a valid email format"
}, Li = (t, e = !1) => ({
  _skip: !1,
  validate: (r) => (t = f(t), e ? f(r) == f(t) : f(r) === f(t)),
  /* c8 ignore next 3 */
  label: () => "Values must be matching"
});
Li.skip = s;
const Ni = (t) => {
  const e = typeof t == "string" ? new RegExp(t) : t;
  return {
    _skip: !1,
    validate: (r) => l(r) ? !1 : e.test(r),
    /* c8 ignore next 3 */
    label: () => "Value must match the provided rule."
  };
};
Ni.skip = s;
const ds = {
  _skip: !1,
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
}, Ri = {
  _skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : mi(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a string`
}, Ui = {
  _skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : R(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a number`
}, Bi = {
  _skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : O(t),
  label: ({ value: t }) => `Value <${typeof t}> must be an Array`
}, Gi = {
  _skip: !1,
  skip: s,
  validate: (t) => l(t) || O(t) || B(t) || U(t) ? !1 : w(t),
  label: ({ value: t }) => `Value <${typeof t}> must be an Object`
}, Ki = {
  _skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : B(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Set`
}, Zi = {
  _skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : U(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Map`
}, Hi = {
  _skip: !1,
  skip: s,
  validate: (t) => {
    if (l(t) || t == "Invalid Date")
      return !1;
    if (H(t) && t.getTime())
      return !0;
    const e = new Date(t);
    return H(e);
  },
  label: ({ value: t }) => `Value <${typeof t}> must be a valid Date object`
}, qi = {
  _skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : q(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Symbol`
}, Wi = {
  str: Ri,
  num: Ui,
  arr: Bi,
  obj: Gi,
  set: Ki,
  map: Zi,
  date: Hi,
  symbol: qi
}, Yi = (t, e) => ({
  _skip: !1,
  validate: (r) => l(r) ? !1 : (t = f(t), e = f(e), Wi.date.validate(r) && (t = t instanceof Date ? t.getTime() : new Date(t).getTime(), e = e instanceof Date ? e.getTime() : new Date(e).getTime(), r = r instanceof Date ? r.getTime() : new Date(r).getTime()), r >= t && r <= e),
  label: () => `Value must be between ${f(t)} and ${f(e)}`
});
Yi.skip = s;
const Xi = (t) => ({
  _skip: !1,
  validate: (e) => l(e) ? !1 : (t = f(t), R(e) && R(t) ? e >= t : H(e) ? new Date(e) >= new Date(t) : !1),
  /* c8 ignore next 3 */
  label: () => `Minimum allowed value is ${f(t)}`
});
Xi.skip = s;
const Ji = (t) => ({
  _skip: !1,
  validate: (e) => l(e) ? !1 : (t = f(t), R(e) && R(t) ? e <= t : H(e) ? new Date(e) <= new Date(t) : !1),
  /* c8 ignore next 3 */
  label: () => `Value must be shorter or equal to ${f(t)}`
});
Ji.skip = s;
const Qi = (t) => ({
  _skip: !1,
  validate: (e) => {
    if (l(e) || typeof e != "string")
      return !1;
    t = f(t);
    const r = e.match(me);
    return r ? r.length <= t : !1;
  },
  label: (e) => typeof e != "string" ? "Value must be a string and " : `Value must have maximal lenght of ${f(t)} excluding spaces`
});
Qi.skip = s;
const ts = (t) => ({
  _skip: !1,
  validate: (e) => {
    if (l(e) || typeof e != "string")
      return !1;
    t = f(t);
    const r = e.match(me);
    return r ? r.length >= t : !1;
  },
  /* c8 ignore next 3 */
  label: () => `Value must have minimal lenght of ${f(t)} excluding spaces`
});
ts.skip = s;
const bs = {
  _skip: !1,
  skip: s,
  validate: (t) => l(t) ? !1 : !Fi.test(t),
  label: (t) => typeof t != "string" ? "Value must be a string and contain no special characters" : "Value must not contain any special characters"
}, es = (t, e = !1) => ({
  _skip: !1,
  validate: (r) => l(r) || typeof r != "string" ? !1 : (typeof t == "string" && (t = e ? [t] : t.trim().split(/\s+/)), t.every((n) => r.toLowerCase().includes(n.toLowerCase()))),
  label: (r) => {
    t = f(t);
    const n = typeof t == "string" ? t : t.join(", ");
    return typeof r != "string" ? `Value must be a string and contain <${n}>` : `Value must contain <${n}>`;
  }
});
es.skip = s;
const rs = (t, e) => ({
  _skip: !1,
  validate: (r) => (t = f(t), !r || typeof r != "string" ? !1 : r.startsWith(t, e)),
  label: (r) => typeof r != "string" ? `Value must be a string and start with '${f(t)}'` : `Value must start with '${f(t)}'`
});
rs.skip = s;
const ns = (t, e) => ({
  _skip: !1,
  validate: (r) => (t = f(t), !r || typeof r != "string" ? !1 : r.endsWith(t, e)),
  label: (r) => typeof r != "string" ? `Value must be a string and end with '${f(t)}'` : `Value must end with '${f(t)}'`
});
ns.skip = s;
export {
  ki as $and,
  ss as $def,
  os as $defParam,
  Di as $not,
  xi as $or,
  ls as $test,
  us as $validateIf,
  cs as $validateIfNot,
  fs as $withLabel,
  Yi as between,
  es as contains,
  gs as email,
  ns as endsWith,
  bs as hasSpecialChars,
  Bi as isArr,
  Hi as isDate,
  Zi as isMap,
  Ui as isNum,
  Gi as isObj,
  Ki as isSet,
  Ri as isStr,
  qi as isSymbol,
  Ni as match,
  Qi as maxLenNoSpace,
  Mi as maxLength,
  Ji as maxValue,
  ts as minLenNoSpace,
  Vi as minLength,
  Xi as minValue,
  ps as required,
  Li as sameAs,
  rs as startsWith,
  Wi as type,
  ds as url,
  is as useValidation
};
