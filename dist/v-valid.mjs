import { reactive as Ae, watch as tt, isRef as ft, unref as f } from "vue-demi";
var Se = typeof global == "object" && global && global.Object === Object && global;
const Ht = Se;
var Pe = typeof self == "object" && self && self.Object === Object && self, Ee = Ht || Pe || Function("return this")();
const m = Ee;
var Ce = m.Symbol;
const A = Ce;
var Wt = Object.prototype, Ie = Wt.hasOwnProperty, xe = Wt.toString, F = A ? A.toStringTag : void 0;
function De(t) {
  var e = Ie.call(t, F), r = t[F];
  try {
    t[F] = void 0;
    var n = !0;
  } catch {
  }
  var a = xe.call(t);
  return n && (e ? t[F] = r : delete t[F]), a;
}
var ke = Object.prototype, Me = ke.toString;
function Ve(t) {
  return Me.call(t);
}
var Fe = "[object Null]", Le = "[object Undefined]", Tt = A ? A.toStringTag : void 0;
function y(t) {
  return t == null ? t === void 0 ? Le : Fe : Tt && Tt in Object(t) ? De(t) : Ve(t);
}
function $(t) {
  return t != null && typeof t == "object";
}
var Ne = "[object Symbol]";
function K(t) {
  return typeof t == "symbol" || $(t) && y(t) == Ne;
}
function ze(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, a = Array(n); ++r < n; )
    a[r] = e(t[r], r, t);
  return a;
}
var Ue = Array.isArray;
const j = Ue;
var Re = 1 / 0, mt = A ? A.prototype : void 0, jt = mt ? mt.toString : void 0;
function qt(t) {
  if (typeof t == "string")
    return t;
  if (j(t))
    return ze(t, qt) + "";
  if (K(t))
    return jt ? jt.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Re ? "-0" : e;
}
function T(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Be = "[object AsyncFunction]", Ge = "[object Function]", Ke = "[object GeneratorFunction]", Ze = "[object Proxy]";
function Z(t) {
  if (!T(t))
    return !1;
  var e = y(t);
  return e == Ge || e == Ke || e == Be || e == Ze;
}
var He = m["__core-js_shared__"];
const et = He;
var wt = function() {
  var t = /[^.]+$/.exec(et && et.keys && et.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function We(t) {
  return !!wt && wt in t;
}
var qe = Function.prototype, Ye = qe.toString;
function I(t) {
  if (t != null) {
    try {
      return Ye.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Xe = /[\\^$.*+?()[\]{}|]/g, Je = /^\[object .+?Constructor\]$/, Qe = Function.prototype, tr = Object.prototype, er = Qe.toString, rr = tr.hasOwnProperty, nr = RegExp(
  "^" + er.call(rr).replace(Xe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ar(t) {
  if (!T(t) || We(t))
    return !1;
  var e = Z(t) ? nr : Je;
  return e.test(I(t));
}
function sr(t, e) {
  return t == null ? void 0 : t[e];
}
function x(t, e) {
  var r = sr(t, e);
  return ar(r) ? r : void 0;
}
var or = x(m, "WeakMap");
const nt = or;
var vt = Object.create, ir = function() {
  function t() {
  }
  return function(e) {
    if (!T(e))
      return {};
    if (vt)
      return vt(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}();
const fr = ir;
function cr(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var ur = function() {
  try {
    var t = x(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const Ot = ur;
function lr(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n && e(t[r], r, t) !== !1; )
    ;
  return t;
}
var pr = 9007199254740991, gr = /^(?:0|[1-9]\d*)$/;
function Yt(t, e) {
  var r = typeof t;
  return e = e == null ? pr : e, !!e && (r == "number" || r != "symbol" && gr.test(t)) && t > -1 && t % 1 == 0 && t < e;
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
var br = Object.prototype, dr = br.hasOwnProperty;
function ct(t, e, r) {
  var n = t[e];
  (!(dr.call(t, e) && Jt(n, r)) || r === void 0 && !(e in t)) && Xt(t, e, r);
}
function H(t, e, r, n) {
  var a = !r;
  r || (r = {});
  for (var s = -1, i = e.length; ++s < i; ) {
    var c = e[s], g = n ? n(r[c], t[c], c, r, t) : void 0;
    g === void 0 && (g = t[c]), a ? Xt(r, c, g) : ct(r, c, g);
  }
  return r;
}
var hr = 9007199254740991;
function Qt(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= hr;
}
function ut(t) {
  return t != null && Qt(t.length) && !Z(t);
}
var yr = Object.prototype;
function W(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || yr;
  return t === r;
}
function $r(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var _r = "[object Arguments]";
function At(t) {
  return $(t) && y(t) == _r;
}
var te = Object.prototype, Tr = te.hasOwnProperty, mr = te.propertyIsEnumerable, jr = At(function() {
  return arguments;
}()) ? At : function(t) {
  return $(t) && Tr.call(t, "callee") && !mr.call(t, "callee");
};
const ee = jr;
function wr() {
  return !1;
}
var re = typeof exports == "object" && exports && !exports.nodeType && exports, St = re && typeof module == "object" && module && !module.nodeType && module, vr = St && St.exports === re, Pt = vr ? m.Buffer : void 0, Or = Pt ? Pt.isBuffer : void 0, Ar = Or || wr;
const lt = Ar;
var Sr = "[object Arguments]", Pr = "[object Array]", Er = "[object Boolean]", Cr = "[object Date]", Ir = "[object Error]", xr = "[object Function]", Dr = "[object Map]", kr = "[object Number]", Mr = "[object Object]", Vr = "[object RegExp]", Fr = "[object Set]", Lr = "[object String]", Nr = "[object WeakMap]", zr = "[object ArrayBuffer]", Ur = "[object DataView]", Rr = "[object Float32Array]", Br = "[object Float64Array]", Gr = "[object Int8Array]", Kr = "[object Int16Array]", Zr = "[object Int32Array]", Hr = "[object Uint8Array]", Wr = "[object Uint8ClampedArray]", qr = "[object Uint16Array]", Yr = "[object Uint32Array]", l = {};
l[Rr] = l[Br] = l[Gr] = l[Kr] = l[Zr] = l[Hr] = l[Wr] = l[qr] = l[Yr] = !0;
l[Sr] = l[Pr] = l[zr] = l[Er] = l[Ur] = l[Cr] = l[Ir] = l[xr] = l[Dr] = l[kr] = l[Mr] = l[Vr] = l[Fr] = l[Lr] = l[Nr] = !1;
function Xr(t) {
  return $(t) && Qt(t.length) && !!l[y(t)];
}
function q(t) {
  return function(e) {
    return t(e);
  };
}
var ne = typeof exports == "object" && exports && !exports.nodeType && exports, L = ne && typeof module == "object" && module && !module.nodeType && module, Jr = L && L.exports === ne, rt = Jr && Ht.process, Qr = function() {
  try {
    var t = L && L.require && L.require("util").types;
    return t || rt && rt.binding && rt.binding("util");
  } catch {
  }
}();
const S = Qr;
var Et = S && S.isTypedArray, tn = Et ? q(Et) : Xr;
const ae = tn;
var en = Object.prototype, rn = en.hasOwnProperty;
function se(t, e) {
  var r = j(t), n = !r && ee(t), a = !r && !n && lt(t), s = !r && !n && !a && ae(t), i = r || n || a || s, c = i ? $r(t.length, String) : [], g = c.length;
  for (var b in t)
    (e || rn.call(t, b)) && !(i && (b == "length" || a && (b == "offset" || b == "parent") || s && (b == "buffer" || b == "byteLength" || b == "byteOffset") || Yt(b, g))) && c.push(b);
  return c;
}
function oe(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var nn = oe(Object.keys, Object);
const an = nn;
var sn = Object.prototype, on = sn.hasOwnProperty;
function ie(t) {
  if (!W(t))
    return an(t);
  var e = [];
  for (var r in Object(t))
    on.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function pt(t) {
  return ut(t) ? se(t) : ie(t);
}
function fn(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var cn = Object.prototype, un = cn.hasOwnProperty;
function ln(t) {
  if (!T(t))
    return fn(t);
  var e = W(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !un.call(t, n)) || r.push(n);
  return r;
}
function gt(t) {
  return ut(t) ? se(t, !0) : ln(t);
}
var pn = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, gn = /^\w*$/;
function bn(t, e) {
  if (j(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || K(t) ? !0 : gn.test(t) || !pn.test(t) || e != null && t in Object(e);
}
var dn = x(Object, "create");
const N = dn;
function hn() {
  this.__data__ = N ? N(null) : {}, this.size = 0;
}
function yn(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var $n = "__lodash_hash_undefined__", _n = Object.prototype, Tn = _n.hasOwnProperty;
function mn(t) {
  var e = this.__data__;
  if (N) {
    var r = e[t];
    return r === $n ? void 0 : r;
  }
  return Tn.call(e, t) ? e[t] : void 0;
}
var jn = Object.prototype, wn = jn.hasOwnProperty;
function vn(t) {
  var e = this.__data__;
  return N ? e[t] !== void 0 : wn.call(e, t);
}
var On = "__lodash_hash_undefined__";
function An(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = N && e === void 0 ? On : e, this;
}
function C(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
C.prototype.clear = hn;
C.prototype.delete = yn;
C.prototype.get = mn;
C.prototype.has = vn;
C.prototype.set = An;
function Sn() {
  this.__data__ = [], this.size = 0;
}
function Y(t, e) {
  for (var r = t.length; r--; )
    if (Jt(t[r][0], e))
      return r;
  return -1;
}
var Pn = Array.prototype, En = Pn.splice;
function Cn(t) {
  var e = this.__data__, r = Y(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : En.call(e, r, 1), --this.size, !0;
}
function In(t) {
  var e = this.__data__, r = Y(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function xn(t) {
  return Y(this.__data__, t) > -1;
}
function Dn(t, e) {
  var r = this.__data__, n = Y(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function v(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
v.prototype.clear = Sn;
v.prototype.delete = Cn;
v.prototype.get = In;
v.prototype.has = xn;
v.prototype.set = Dn;
var kn = x(m, "Map");
const z = kn;
function Mn() {
  this.size = 0, this.__data__ = {
    hash: new C(),
    map: new (z || v)(),
    string: new C()
  };
}
function Vn(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function X(t, e) {
  var r = t.__data__;
  return Vn(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function Fn(t) {
  var e = X(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Ln(t) {
  return X(this, t).get(t);
}
function Nn(t) {
  return X(this, t).has(t);
}
function zn(t, e) {
  var r = X(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function P(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
P.prototype.clear = Mn;
P.prototype.delete = Fn;
P.prototype.get = Ln;
P.prototype.has = Nn;
P.prototype.set = zn;
var Un = "Expected a function";
function bt(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Un);
  var r = function() {
    var n = arguments, a = e ? e.apply(this, n) : n[0], s = r.cache;
    if (s.has(a))
      return s.get(a);
    var i = t.apply(this, n);
    return r.cache = s.set(a, i) || s, i;
  };
  return r.cache = new (bt.Cache || P)(), r;
}
bt.Cache = P;
var Rn = 500;
function Bn(t) {
  var e = bt(t, function(n) {
    return r.size === Rn && r.clear(), n;
  }), r = e.cache;
  return e;
}
var Gn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Kn = /\\(\\)?/g, Zn = Bn(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Gn, function(r, n, a, s) {
    e.push(a ? s.replace(Kn, "$1") : n || r);
  }), e;
});
const Hn = Zn;
function Wn(t) {
  return t == null ? "" : qt(t);
}
function fe(t, e) {
  return j(t) ? t : bn(t, e) ? [t] : Hn(Wn(t));
}
var qn = 1 / 0;
function ce(t) {
  if (typeof t == "string" || K(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -qn ? "-0" : e;
}
function Yn(t, e) {
  e = fe(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[ce(e[r++])];
  return r && r == n ? t : void 0;
}
function Xn(t, e, r) {
  var n = t == null ? void 0 : Yn(t, e);
  return n === void 0 ? r : n;
}
function ue(t, e) {
  for (var r = -1, n = e.length, a = t.length; ++r < n; )
    t[a + r] = e[r];
  return t;
}
var Jn = oe(Object.getPrototypeOf, Object);
const dt = Jn;
var Qn = "[object Object]", ta = Function.prototype, ea = Object.prototype, le = ta.toString, ra = ea.hasOwnProperty, na = le.call(Object);
function aa(t) {
  if (!$(t) || y(t) != Qn)
    return !1;
  var e = dt(t);
  if (e === null)
    return !0;
  var r = ra.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && le.call(r) == na;
}
function sa() {
  this.__data__ = new v(), this.size = 0;
}
function oa(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function ia(t) {
  return this.__data__.get(t);
}
function fa(t) {
  return this.__data__.has(t);
}
var ca = 200;
function ua(t, e) {
  var r = this.__data__;
  if (r instanceof v) {
    var n = r.__data__;
    if (!z || n.length < ca - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new P(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function M(t) {
  var e = this.__data__ = new v(t);
  this.size = e.size;
}
M.prototype.clear = sa;
M.prototype.delete = oa;
M.prototype.get = ia;
M.prototype.has = fa;
M.prototype.set = ua;
function la(t, e) {
  return t && H(e, pt(e), t);
}
function pa(t, e) {
  return t && H(e, gt(e), t);
}
var pe = typeof exports == "object" && exports && !exports.nodeType && exports, Ct = pe && typeof module == "object" && module && !module.nodeType && module, ga = Ct && Ct.exports === pe, It = ga ? m.Buffer : void 0, xt = It ? It.allocUnsafe : void 0;
function ba(t, e) {
  if (e)
    return t.slice();
  var r = t.length, n = xt ? xt(r) : new t.constructor(r);
  return t.copy(n), n;
}
function da(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, a = 0, s = []; ++r < n; ) {
    var i = t[r];
    e(i, r, t) && (s[a++] = i);
  }
  return s;
}
function ge() {
  return [];
}
var ha = Object.prototype, ya = ha.propertyIsEnumerable, Dt = Object.getOwnPropertySymbols, $a = Dt ? function(t) {
  return t == null ? [] : (t = Object(t), da(Dt(t), function(e) {
    return ya.call(t, e);
  }));
} : ge;
const ht = $a;
function _a(t, e) {
  return H(t, ht(t), e);
}
var Ta = Object.getOwnPropertySymbols, ma = Ta ? function(t) {
  for (var e = []; t; )
    ue(e, ht(t)), t = dt(t);
  return e;
} : ge;
const be = ma;
function ja(t, e) {
  return H(t, be(t), e);
}
function de(t, e, r) {
  var n = e(t);
  return j(t) ? n : ue(n, r(t));
}
function wa(t) {
  return de(t, pt, ht);
}
function va(t) {
  return de(t, gt, be);
}
var Oa = x(m, "DataView");
const at = Oa;
var Aa = x(m, "Promise");
const st = Aa;
var Sa = x(m, "Set");
const ot = Sa;
var kt = "[object Map]", Pa = "[object Object]", Mt = "[object Promise]", Vt = "[object Set]", Ft = "[object WeakMap]", Lt = "[object DataView]", Ea = I(at), Ca = I(z), Ia = I(st), xa = I(ot), Da = I(nt), E = y;
(at && E(new at(new ArrayBuffer(1))) != Lt || z && E(new z()) != kt || st && E(st.resolve()) != Mt || ot && E(new ot()) != Vt || nt && E(new nt()) != Ft) && (E = function(t) {
  var e = y(t), r = e == Pa ? t.constructor : void 0, n = r ? I(r) : "";
  if (n)
    switch (n) {
      case Ea:
        return Lt;
      case Ca:
        return kt;
      case Ia:
        return Mt;
      case xa:
        return Vt;
      case Da:
        return Ft;
    }
  return e;
});
const J = E;
var ka = Object.prototype, Ma = ka.hasOwnProperty;
function Va(t) {
  var e = t.length, r = new t.constructor(e);
  return e && typeof t[0] == "string" && Ma.call(t, "index") && (r.index = t.index, r.input = t.input), r;
}
var Fa = m.Uint8Array;
const Nt = Fa;
function yt(t) {
  var e = new t.constructor(t.byteLength);
  return new Nt(e).set(new Nt(t)), e;
}
function La(t, e) {
  var r = e ? yt(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.byteLength);
}
var Na = /\w*$/;
function za(t) {
  var e = new t.constructor(t.source, Na.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var zt = A ? A.prototype : void 0, Ut = zt ? zt.valueOf : void 0;
function Ua(t) {
  return Ut ? Object(Ut.call(t)) : {};
}
function Ra(t, e) {
  var r = e ? yt(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
var Ba = "[object Boolean]", Ga = "[object Date]", Ka = "[object Map]", Za = "[object Number]", Ha = "[object RegExp]", Wa = "[object Set]", qa = "[object String]", Ya = "[object Symbol]", Xa = "[object ArrayBuffer]", Ja = "[object DataView]", Qa = "[object Float32Array]", ts = "[object Float64Array]", es = "[object Int8Array]", rs = "[object Int16Array]", ns = "[object Int32Array]", as = "[object Uint8Array]", ss = "[object Uint8ClampedArray]", os = "[object Uint16Array]", is = "[object Uint32Array]";
function fs(t, e, r) {
  var n = t.constructor;
  switch (e) {
    case Xa:
      return yt(t);
    case Ba:
    case Ga:
      return new n(+t);
    case Ja:
      return La(t, r);
    case Qa:
    case ts:
    case es:
    case rs:
    case ns:
    case as:
    case ss:
    case os:
    case is:
      return Ra(t, r);
    case Ka:
      return new n();
    case Za:
    case qa:
      return new n(t);
    case Ha:
      return za(t);
    case Wa:
      return new n();
    case Ya:
      return Ua(t);
  }
}
function cs(t) {
  return typeof t.constructor == "function" && !W(t) ? fr(dt(t)) : {};
}
var us = "[object Map]";
function ls(t) {
  return $(t) && J(t) == us;
}
var Rt = S && S.isMap, ps = Rt ? q(Rt) : ls;
const U = ps;
var gs = "[object Set]";
function bs(t) {
  return $(t) && J(t) == gs;
}
var Bt = S && S.isSet, ds = Bt ? q(Bt) : bs;
const R = ds;
var hs = 1, ys = 2, $s = 4, he = "[object Arguments]", _s = "[object Array]", Ts = "[object Boolean]", ms = "[object Date]", js = "[object Error]", ye = "[object Function]", ws = "[object GeneratorFunction]", vs = "[object Map]", Os = "[object Number]", $e = "[object Object]", As = "[object RegExp]", Ss = "[object Set]", Ps = "[object String]", Es = "[object Symbol]", Cs = "[object WeakMap]", Is = "[object ArrayBuffer]", xs = "[object DataView]", Ds = "[object Float32Array]", ks = "[object Float64Array]", Ms = "[object Int8Array]", Vs = "[object Int16Array]", Fs = "[object Int32Array]", Ls = "[object Uint8Array]", Ns = "[object Uint8ClampedArray]", zs = "[object Uint16Array]", Us = "[object Uint32Array]", u = {};
u[he] = u[_s] = u[Is] = u[xs] = u[Ts] = u[ms] = u[Ds] = u[ks] = u[Ms] = u[Vs] = u[Fs] = u[vs] = u[Os] = u[$e] = u[As] = u[Ss] = u[Ps] = u[Es] = u[Ls] = u[Ns] = u[zs] = u[Us] = !0;
u[js] = u[ye] = u[Cs] = !1;
function B(t, e, r, n, a, s) {
  var i, c = e & hs, g = e & ys, b = e & $s;
  if (r && (i = a ? r(t, n, a, s) : r(t)), i !== void 0)
    return i;
  if (!T(t))
    return t;
  var _ = j(t);
  if (_) {
    if (i = Va(t), !c)
      return cr(t, i);
  } else {
    var O = J(t), D = O == ye || O == ws;
    if (lt(t))
      return ba(t, c);
    if (O == $e || O == he || D && !a) {
      if (i = g || D ? {} : cs(t), !c)
        return g ? ja(t, pa(i, t)) : _a(t, la(i, t));
    } else {
      if (!u[O])
        return a ? t : {};
      i = fs(t, O, c);
    }
  }
  s || (s = new M());
  var d = s.get(t);
  if (d)
    return d;
  s.set(t, i), R(t) ? t.forEach(function(h) {
    i.add(B(h, e, r, h, t, s));
  }) : U(t) && t.forEach(function(h, w) {
    i.set(w, B(h, e, r, w, t, s));
  });
  var Q = b ? g ? va : wa : g ? gt : pt, V = _ ? void 0 : Q(t);
  return lr(V || t, function(h, w) {
    V && (w = h, h = t[w]), ct(i, w, B(h, e, r, w, t, s));
  }), i;
}
var Rs = 1, Bs = 4;
function Gt(t) {
  return B(t, Rs | Bs);
}
var Gs = "[object String]";
function Ks(t) {
  return typeof t == "string" || !j(t) && $(t) && y(t) == Gs;
}
var Zs = "[object Boolean]";
function _e(t) {
  return t === !0 || t === !1 || $(t) && y(t) == Zs;
}
var Hs = "[object Date]";
function Ws(t) {
  return $(t) && y(t) == Hs;
}
var Kt = S && S.isDate, qs = Kt ? q(Kt) : Ws;
const G = qs;
var Ys = "[object Map]", Xs = "[object Set]", Js = Object.prototype, Qs = Js.hasOwnProperty;
function to(t) {
  if (t == null)
    return !0;
  if (ut(t) && (j(t) || typeof t == "string" || typeof t.splice == "function" || lt(t) || ae(t) || ee(t)))
    return !t.length;
  var e = J(t);
  if (e == Ys || e == Xs)
    return !t.size;
  if (W(t))
    return !ie(t).length;
  for (var r in t)
    if (Qs.call(t, r))
      return !1;
  return !0;
}
var eo = "[object Number]";
function $t(t) {
  return typeof t == "number" || $(t) && y(t) == eo;
}
function p(t) {
  return t == null;
}
function ro(t, e, r, n) {
  if (!T(t))
    return t;
  e = fe(e, t);
  for (var a = -1, s = e.length, i = s - 1, c = t; c != null && ++a < s; ) {
    var g = ce(e[a]), b = r;
    if (g === "__proto__" || g === "constructor" || g === "prototype")
      return t;
    if (a != i) {
      var _ = c[g];
      b = n ? n(_, g, c) : void 0, b === void 0 && (b = T(_) ? _ : Yt(e[a + 1]) ? [] : {});
    }
    ct(c, g, b), c = c[g];
  }
  return t;
}
function k(t, e, r) {
  return t == null ? t : ro(t, e, r);
}
const no = (t) => t.trim().replace(" ", "."), Zt = {
  id: null,
  value: null,
  invalid: !1,
  errors: {}
};
async function it(t, e, r = "") {
  for (const n in t) {
    const a = `${r} ${n}`;
    aa(t[n]) ? it(t[n], e, a) : await e(n, t[n], a);
  }
}
function xo(t, e, { proactive: r = !1, autoclear: n = !1 } = {}) {
  const a = Ae({ anyError: !1, pending: !1, errors: {} });
  n ? tt(t, () => i(), { deep: !0 }) : r && (tt(t, () => c(), { deep: !0 }), ft(e) && tt(e, () => c(), { deep: !0 })), i();
  function s() {
    it(a.errors, (g, b, _) => {
      k(a.errors, _, Gt(Zt));
    }), Object.assign(a, { anyError: !1, pending: !1 });
  }
  function i() {
    s();
  }
  async function c(...g) {
    return i(), a.pending = !0, new Promise(async (b, _) => {
      await it(t, async (O, D, d) => {
        d = no(d), k(a.errors, d, Gt(Zt));
        const Q = f(e), V = Xn(Q, d);
        if (!!V) {
          for (const [h, w] of Object.entries(V)) {
            if (g.length > 0 && !g.includes(h))
              continue;
            const { label: je, validate: we, _skip: ve } = w;
            if (ve)
              continue;
            const Oe = await we(D);
            k(a.errors, `${d}.id`, O), k(a.errors, `${d}.value`, D), Oe || (a.anyError = !0, k(a.errors, `${d}.invalid`, !0), k(a.errors, `${d}.errors.${h}`, je(D)));
          }
          return Promise.resolve();
        }
      }), a.pending = !1, a.anyError ? _(a.errors) : b(a.errors), a.pending = !1;
    });
  }
  return {
    reset: i,
    validate: c,
    root: a,
    errors: a.errors,
    run: c
  };
}
const o = function(...t) {
  return {
    _skip: !0,
    validate: () => !0,
    label: () => "test"
  };
}, _t = (t, e, r) => new Promise(async (n) => {
  const a = [];
  for (const s of e) {
    if (!s.validate)
      throw new Error("Rule is missing a validator function");
    const i = await s.validate(t);
    a.push(i);
  }
  switch (r) {
    case "every": {
      n(a.every((s) => s));
      break;
    }
    case "some": {
      n(a.some((s) => s));
      break;
    }
    case "none": {
      n(!a.every((s) => s));
      break;
    }
  }
}), Te = "Value does not satisfy the validation rule.";
function Do(t, e) {
  return {
    skip: o,
    _skip: !1,
    validate: (r) => t(r),
    label: (r) => p(e) ? Te : typeof e == "string" ? e : e(r)
  };
}
function ko(t, e) {
  return (n) => ({
    _skip: !1,
    validate: (a) => t(a, n),
    label: (a) => p(e) ? Te : typeof e == "string" ? e : e(a, n)
  });
}
const Mo = (t, e) => {
  const { validate: r, _skip: n } = e;
  if (p(r))
    throw new Error("[withLabel] Missing validator function");
  return {
    _skip: n,
    validate: r,
    label: (a) => typeof t == "string" ? t : t(a)
  };
}, Vo = (t, e) => _e(t) ? t ? e : o() : ft(t) ? t.value ? e : o() : Z(t) ? t() ? e : o() : t.then((r) => r ? e : o()), Fo = (t, e) => _e(t) ? t ? o() : e : ft(t) ? t.value ? o() : e : Z(t) ? t() ? o() : e : t.then((r) => r ? o() : e), ao = (...t) => ({
  _skip: !1,
  validate: (e) => _t(e, t, "every"),
  label() {
    return "Value must pass all the required checks";
  }
});
ao.skip = o;
const so = (...t) => ({
  _skip: !1,
  validate: (e) => _t(e, t, "some"),
  label() {
    return "Value must pass some of the checks";
  }
});
so.skip = o;
const oo = (...t) => ({
  _skip: !1,
  validate: (e) => _t(e, t, "none"),
  label() {
    return "Value must pass none of the checks";
  }
});
oo.skip = o();
const Lo = (t, e) => {
  const r = t.validate(e);
  return r instanceof Promise, r;
}, No = {
  _skip: !1,
  skip: o,
  validate: (t) => p(t) || t === "null" || t === "undefined" ? !1 : typeof t == "string" ? t.length > 0 : typeof t == "number" ? !0 : !to(t),
  label: () => "Value is required"
}, io = (t) => ({
  _skip: !1,
  validate: (e) => p(e) ? !1 : (t = f(t), R(e) || U(e) ? e.size >= t : T(e) ? Object.keys(e).length >= t : e != null && e.length ? e.length >= t : !1),
  label: () => `Value must be greater or equal to ${f(t)}`
});
io.skip = o;
const fo = (t) => ({
  _skip: !1,
  validate: (e) => p(e) ? !1 : (t = f(t), R(e) || U(e) ? e.size <= t : T(e) ? Object.keys(e).length <= t : e != null && e.length ? e.length <= t : !1),
  label: () => `Value must be lesser or equal to ${f(t)}`
});
fo.skip = o;
const co = /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/, uo = /[^a-zA-Z0-9]/, me = /\S/g, zo = {
  _skip: !1,
  skip: o,
  validate: (t) => p(t) ? !1 : co.test(t),
  label: () => "Value must be in a valid email format"
}, lo = (t, e = !1) => ({
  _skip: !1,
  validate: (r) => (t = f(t), e ? f(r) == f(t) : f(r) === f(t)),
  label: () => "Values must be matching"
});
lo.skip = o;
const po = (t) => {
  const e = typeof t == "string" ? new RegExp(t) : t;
  return {
    _skip: !1,
    validate: (r) => p(r) ? !1 : e.test(r),
    label: () => "Value must match the provided rule."
  };
};
po.skip = o;
const Uo = {
  _skip: !1,
  skip: o,
  validate: (t) => {
    if (p(t))
      return !1;
    try {
      return new URL(t) instanceof URL;
    } catch {
      return !1;
    }
  },
  label: () => "Value must be a valid URL"
}, go = {
  _skip: !1,
  skip: o,
  validate: (t) => p(t) ? !1 : Ks(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a string`
}, bo = {
  _skip: !1,
  skip: o,
  validate: (t) => p(t) ? !1 : $t(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a number`
}, ho = {
  _skip: !1,
  skip: o,
  validate: (t) => p(t) ? !1 : j(t),
  label: ({ value: t }) => `Value <${typeof t}> must be an Array`
}, yo = {
  _skip: !1,
  skip: o,
  validate: (t) => p(t) || j(t) || R(t) || U(t) ? !1 : T(t),
  label: ({ value: t }) => `Value <${typeof t}> must be an Object`
}, $o = {
  _skip: !1,
  skip: o,
  validate: (t) => p(t) ? !1 : R(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Set`
}, _o = {
  _skip: !1,
  skip: o,
  validate: (t) => p(t) ? !1 : U(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Map`
}, To = {
  _skip: !1,
  skip: o,
  validate: (t) => {
    if (p(t) || t == "Invalid Date")
      return !1;
    if (G(t) && t.getTime())
      return !0;
    const e = new Date(t);
    return G(e);
  },
  label: ({ value: t }) => `Value <${typeof t}> must be a valid Date object`
}, mo = {
  _skip: !1,
  skip: o,
  validate: (t) => p(t) ? !1 : K(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Symbol`
}, jo = {
  str: go,
  num: bo,
  arr: ho,
  obj: yo,
  set: $o,
  map: _o,
  date: To,
  symbol: mo
}, wo = (t, e) => ({
  _skip: !1,
  validate: (r) => p(r) ? !1 : (t = f(t), e = f(e), jo.date.validate(r) && (t = t instanceof Date ? t.getTime() : new Date(t).getTime(), e = e instanceof Date ? e.getTime() : new Date(e).getTime(), r = r instanceof Date ? r.getTime() : new Date(r).getTime()), r >= t && r <= e),
  label: () => `Value must be between ${f(t)} and ${f(e)}`
});
wo.skip = o;
const vo = (t) => ({
  _skip: !1,
  validate: (e) => p(e) ? !1 : (t = f(t), $t(e) ? e >= t : G(e) ? new Date(e) >= new Date(t) : !1),
  label: () => `Minimum allowed value is ${f(t)}`
});
vo.skip = o;
const Oo = (t) => ({
  _skip: !1,
  validate: (e) => p(e) ? !1 : (t = f(t), $t(e) ? e <= t : G(e) ? new Date(e) <= new Date(t) : !1),
  label: () => `Value must be shorter or equal to ${f(t)}`
});
Oo.skip = o;
const Ao = (t) => ({
  _skip: !1,
  validate: (e) => {
    if (p(e) || typeof e != "string")
      return !1;
    t = f(t);
    const r = e.match(me);
    return r ? r.length <= t : !1;
  },
  label: (e) => typeof e != "string" ? "Value must be a string and " : `Value must have maximal lenght of ${f(t)} excluding spaces`
});
Ao.skip = o;
const So = (t) => ({
  _skip: !1,
  validate: (e) => {
    if (p(e) || typeof e != "string")
      return !1;
    t = f(t);
    const r = e.match(me);
    return r ? r.length >= t : !1;
  },
  label: () => `Value must have minimal lenght of ${f(t)} excluding spaces`
});
So.skip = o;
const Ro = {
  _skip: !1,
  skip: o,
  validate: (t) => p(t) ? !1 : !uo.test(t),
  label: (t) => typeof t != "string" ? "Value must be a string and contain no special characters" : "Value must not contain any special characters"
}, Po = (t, e = !1) => ({
  _skip: !1,
  validate: (r) => p(r) || typeof r != "string" ? !1 : (typeof t == "string" && (t = e ? [t] : t.trim().split(/\s+/)), t.every((n) => r.toLowerCase().includes(n.toLowerCase()))),
  label: (r) => {
    t = f(t);
    const n = typeof t == "string" ? t : t.join(", ");
    return typeof r != "string" ? `Value must be a string and contain <${n}>` : `Value must contain <${n}>`;
  }
});
Po.skip = o;
const Eo = (t, e) => ({
  _skip: !1,
  validate: (r) => (t = f(t), !r || typeof r != "string" ? !1 : r.startsWith(t, e)),
  label: (r) => typeof r != "string" ? `Value must be a string and start with '${f(t)}'` : `Value must start with '${f(t)}'`
});
Eo.skip = o;
const Co = (t, e) => ({
  _skip: !1,
  validate: (r) => (t = f(t), !r || typeof r != "string" ? !1 : r.endsWith(t, e)),
  label: (r) => typeof r != "string" ? `Value must be a string and end with '${f(t)}'` : `Value must end with '${f(t)}'`
});
Co.skip = o;
export {
  ao as $and,
  Do as $def,
  ko as $defParam,
  oo as $not,
  so as $or,
  Lo as $test,
  Vo as $validateIf,
  Fo as $validateIfNot,
  Mo as $withLabel,
  wo as between,
  Po as contains,
  zo as email,
  Co as endsWith,
  Ro as hasSpecialChars,
  ho as isArr,
  To as isDate,
  _o as isMap,
  bo as isNum,
  yo as isObj,
  $o as isSet,
  go as isStr,
  mo as isSymbol,
  po as match,
  Ao as maxLenNoSpace,
  fo as maxLength,
  Oo as maxValue,
  So as minLenNoSpace,
  io as minLength,
  vo as minValue,
  No as required,
  lo as sameAs,
  Eo as startsWith,
  jo as type,
  Uo as url,
  xo as useValidation
};
