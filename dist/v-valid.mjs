import { reactive as Pe, watch as et, isRef as ct, unref as f } from "vue-demi";
var Ee = typeof global == "object" && global && global.Object === Object && global;
const Wt = Ee;
var Ce = typeof self == "object" && self && self.Object === Object && self, Ie = Wt || Ce || Function("return this")();
const w = Ie;
var xe = w.Symbol;
const P = xe;
var qt = Object.prototype, De = qt.hasOwnProperty, ke = qt.toString, F = P ? P.toStringTag : void 0;
function Me(t) {
  var e = De.call(t, F), r = t[F];
  try {
    t[F] = void 0;
    var n = !0;
  } catch {
  }
  var a = ke.call(t);
  return n && (e ? t[F] = r : delete t[F]), a;
}
var Ve = Object.prototype, Fe = Ve.toString;
function Le(t) {
  return Fe.call(t);
}
var Ne = "[object Null]", ze = "[object Undefined]", mt = P ? P.toStringTag : void 0;
function _(t) {
  return t == null ? t === void 0 ? ze : Ne : mt && mt in Object(t) ? Me(t) : Le(t);
}
function T(t) {
  return t != null && typeof t == "object";
}
var Ue = "[object Symbol]";
function H(t) {
  return typeof t == "symbol" || T(t) && _(t) == Ue;
}
function Re(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, a = Array(n); ++r < n; )
    a[r] = e(t[r], r, t);
  return a;
}
var Be = Array.isArray;
const v = Be;
var Ge = 1 / 0, jt = P ? P.prototype : void 0, wt = jt ? jt.toString : void 0;
function Yt(t) {
  if (typeof t == "string")
    return t;
  if (v(t))
    return Re(t, Yt) + "";
  if (H(t))
    return wt ? wt.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Ge ? "-0" : e;
}
function j(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Ke = "[object AsyncFunction]", Ze = "[object Function]", He = "[object GeneratorFunction]", We = "[object Proxy]";
function W(t) {
  if (!j(t))
    return !1;
  var e = _(t);
  return e == Ze || e == He || e == Ke || e == We;
}
var qe = w["__core-js_shared__"];
const rt = qe;
var vt = function() {
  var t = /[^.]+$/.exec(rt && rt.keys && rt.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Ye(t) {
  return !!vt && vt in t;
}
var Xe = Function.prototype, Je = Xe.toString;
function D(t) {
  if (t != null) {
    try {
      return Je.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Qe = /[\\^$.*+?()[\]{}|]/g, tr = /^\[object .+?Constructor\]$/, er = Function.prototype, rr = Object.prototype, nr = er.toString, ar = rr.hasOwnProperty, sr = RegExp(
  "^" + nr.call(ar).replace(Qe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ir(t) {
  if (!j(t) || Ye(t))
    return !1;
  var e = W(t) ? sr : tr;
  return e.test(D(t));
}
function or(t, e) {
  return t == null ? void 0 : t[e];
}
function k(t, e) {
  var r = or(t, e);
  return ir(r) ? r : void 0;
}
var fr = k(w, "WeakMap");
const st = fr;
var Ot = Object.create, cr = function() {
  function t() {
  }
  return function(e) {
    if (!j(e))
      return {};
    if (Ot)
      return Ot(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}();
const ur = cr;
function lr(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var pr = function() {
  try {
    var t = k(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const At = pr;
function gr(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n && e(t[r], r, t) !== !1; )
    ;
  return t;
}
var dr = 9007199254740991, br = /^(?:0|[1-9]\d*)$/;
function Xt(t, e) {
  var r = typeof t;
  return e = e ?? dr, !!e && (r == "number" || r != "symbol" && br.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Jt(t, e, r) {
  e == "__proto__" && At ? At(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function Qt(t, e) {
  return t === e || t !== t && e !== e;
}
var hr = Object.prototype, yr = hr.hasOwnProperty;
function ut(t, e, r) {
  var n = t[e];
  (!(yr.call(t, e) && Qt(n, r)) || r === void 0 && !(e in t)) && Jt(t, e, r);
}
function q(t, e, r, n) {
  var a = !r;
  r || (r = {});
  for (var s = -1, o = e.length; ++s < o; ) {
    var c = e[s], d = n ? n(r[c], t[c], c, r, t) : void 0;
    d === void 0 && (d = t[c]), a ? Jt(r, c, d) : ut(r, c, d);
  }
  return r;
}
var $r = 9007199254740991;
function te(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= $r;
}
function lt(t) {
  return t != null && te(t.length) && !W(t);
}
var _r = Object.prototype;
function Y(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || _r;
  return t === r;
}
function Tr(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var mr = "[object Arguments]";
function St(t) {
  return T(t) && _(t) == mr;
}
var ee = Object.prototype, jr = ee.hasOwnProperty, wr = ee.propertyIsEnumerable, vr = St(function() {
  return arguments;
}()) ? St : function(t) {
  return T(t) && jr.call(t, "callee") && !wr.call(t, "callee");
};
const re = vr;
function Or() {
  return !1;
}
var ne = typeof exports == "object" && exports && !exports.nodeType && exports, Pt = ne && typeof module == "object" && module && !module.nodeType && module, Ar = Pt && Pt.exports === ne, Et = Ar ? w.Buffer : void 0, Sr = Et ? Et.isBuffer : void 0, Pr = Sr || Or;
const pt = Pr;
var Er = "[object Arguments]", Cr = "[object Array]", Ir = "[object Boolean]", xr = "[object Date]", Dr = "[object Error]", kr = "[object Function]", Mr = "[object Map]", Vr = "[object Number]", Fr = "[object Object]", Lr = "[object RegExp]", Nr = "[object Set]", zr = "[object String]", Ur = "[object WeakMap]", Rr = "[object ArrayBuffer]", Br = "[object DataView]", Gr = "[object Float32Array]", Kr = "[object Float64Array]", Zr = "[object Int8Array]", Hr = "[object Int16Array]", Wr = "[object Int32Array]", qr = "[object Uint8Array]", Yr = "[object Uint8ClampedArray]", Xr = "[object Uint16Array]", Jr = "[object Uint32Array]", l = {};
l[Gr] = l[Kr] = l[Zr] = l[Hr] = l[Wr] = l[qr] = l[Yr] = l[Xr] = l[Jr] = !0;
l[Er] = l[Cr] = l[Rr] = l[Ir] = l[Br] = l[xr] = l[Dr] = l[kr] = l[Mr] = l[Vr] = l[Fr] = l[Lr] = l[Nr] = l[zr] = l[Ur] = !1;
function Qr(t) {
  return T(t) && te(t.length) && !!l[_(t)];
}
function X(t) {
  return function(e) {
    return t(e);
  };
}
var ae = typeof exports == "object" && exports && !exports.nodeType && exports, L = ae && typeof module == "object" && module && !module.nodeType && module, tn = L && L.exports === ae, nt = tn && Wt.process, en = function() {
  try {
    var t = L && L.require && L.require("util").types;
    return t || nt && nt.binding && nt.binding("util");
  } catch {
  }
}();
const E = en;
var Ct = E && E.isTypedArray, rn = Ct ? X(Ct) : Qr;
const se = rn;
var nn = Object.prototype, an = nn.hasOwnProperty;
function ie(t, e) {
  var r = v(t), n = !r && re(t), a = !r && !n && pt(t), s = !r && !n && !a && se(t), o = r || n || a || s, c = o ? Tr(t.length, String) : [], d = c.length;
  for (var g in t)
    (e || an.call(t, g)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (g == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (g == "offset" || g == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (g == "buffer" || g == "byteLength" || g == "byteOffset") || // Skip index properties.
    Xt(g, d))) && c.push(g);
  return c;
}
function oe(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var sn = oe(Object.keys, Object);
const on = sn;
var fn = Object.prototype, cn = fn.hasOwnProperty;
function fe(t) {
  if (!Y(t))
    return on(t);
  var e = [];
  for (var r in Object(t))
    cn.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function gt(t) {
  return lt(t) ? ie(t) : fe(t);
}
function un(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var ln = Object.prototype, pn = ln.hasOwnProperty;
function gn(t) {
  if (!j(t))
    return un(t);
  var e = Y(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !pn.call(t, n)) || r.push(n);
  return r;
}
function dt(t) {
  return lt(t) ? ie(t, !0) : gn(t);
}
var dn = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, bn = /^\w*$/;
function hn(t, e) {
  if (v(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || H(t) ? !0 : bn.test(t) || !dn.test(t) || e != null && t in Object(e);
}
var yn = k(Object, "create");
const N = yn;
function $n() {
  this.__data__ = N ? N(null) : {}, this.size = 0;
}
function _n(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Tn = "__lodash_hash_undefined__", mn = Object.prototype, jn = mn.hasOwnProperty;
function wn(t) {
  var e = this.__data__;
  if (N) {
    var r = e[t];
    return r === Tn ? void 0 : r;
  }
  return jn.call(e, t) ? e[t] : void 0;
}
var vn = Object.prototype, On = vn.hasOwnProperty;
function An(t) {
  var e = this.__data__;
  return N ? e[t] !== void 0 : On.call(e, t);
}
var Sn = "__lodash_hash_undefined__";
function Pn(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = N && e === void 0 ? Sn : e, this;
}
function x(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
x.prototype.clear = $n;
x.prototype.delete = _n;
x.prototype.get = wn;
x.prototype.has = An;
x.prototype.set = Pn;
function En() {
  this.__data__ = [], this.size = 0;
}
function J(t, e) {
  for (var r = t.length; r--; )
    if (Qt(t[r][0], e))
      return r;
  return -1;
}
var Cn = Array.prototype, In = Cn.splice;
function xn(t) {
  var e = this.__data__, r = J(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : In.call(e, r, 1), --this.size, !0;
}
function Dn(t) {
  var e = this.__data__, r = J(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function kn(t) {
  return J(this.__data__, t) > -1;
}
function Mn(t, e) {
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
O.prototype.clear = En;
O.prototype.delete = xn;
O.prototype.get = Dn;
O.prototype.has = kn;
O.prototype.set = Mn;
var Vn = k(w, "Map");
const z = Vn;
function Fn() {
  this.size = 0, this.__data__ = {
    hash: new x(),
    map: new (z || O)(),
    string: new x()
  };
}
function Ln(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Q(t, e) {
  var r = t.__data__;
  return Ln(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function Nn(t) {
  var e = Q(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function zn(t) {
  return Q(this, t).get(t);
}
function Un(t) {
  return Q(this, t).has(t);
}
function Rn(t, e) {
  var r = Q(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function C(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
C.prototype.clear = Fn;
C.prototype.delete = Nn;
C.prototype.get = zn;
C.prototype.has = Un;
C.prototype.set = Rn;
var Bn = "Expected a function";
function bt(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Bn);
  var r = function() {
    var n = arguments, a = e ? e.apply(this, n) : n[0], s = r.cache;
    if (s.has(a))
      return s.get(a);
    var o = t.apply(this, n);
    return r.cache = s.set(a, o) || s, o;
  };
  return r.cache = new (bt.Cache || C)(), r;
}
bt.Cache = C;
var Gn = 500;
function Kn(t) {
  var e = bt(t, function(n) {
    return r.size === Gn && r.clear(), n;
  }), r = e.cache;
  return e;
}
var Zn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Hn = /\\(\\)?/g, Wn = Kn(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Zn, function(r, n, a, s) {
    e.push(a ? s.replace(Hn, "$1") : n || r);
  }), e;
});
const qn = Wn;
function Yn(t) {
  return t == null ? "" : Yt(t);
}
function ce(t, e) {
  return v(t) ? t : hn(t, e) ? [t] : qn(Yn(t));
}
var Xn = 1 / 0;
function ue(t) {
  if (typeof t == "string" || H(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -Xn ? "-0" : e;
}
function Jn(t, e) {
  e = ce(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[ue(e[r++])];
  return r && r == n ? t : void 0;
}
function Qn(t, e, r) {
  var n = t == null ? void 0 : Jn(t, e);
  return n === void 0 ? r : n;
}
function le(t, e) {
  for (var r = -1, n = e.length, a = t.length; ++r < n; )
    t[a + r] = e[r];
  return t;
}
var ta = oe(Object.getPrototypeOf, Object);
const ht = ta;
var ea = "[object Object]", ra = Function.prototype, na = Object.prototype, pe = ra.toString, aa = na.hasOwnProperty, sa = pe.call(Object);
function ia(t) {
  if (!T(t) || _(t) != ea)
    return !1;
  var e = ht(t);
  if (e === null)
    return !0;
  var r = aa.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && pe.call(r) == sa;
}
function oa() {
  this.__data__ = new O(), this.size = 0;
}
function fa(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function ca(t) {
  return this.__data__.get(t);
}
function ua(t) {
  return this.__data__.has(t);
}
var la = 200;
function pa(t, e) {
  var r = this.__data__;
  if (r instanceof O) {
    var n = r.__data__;
    if (!z || n.length < la - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new C(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function M(t) {
  var e = this.__data__ = new O(t);
  this.size = e.size;
}
M.prototype.clear = oa;
M.prototype.delete = fa;
M.prototype.get = ca;
M.prototype.has = ua;
M.prototype.set = pa;
function ga(t, e) {
  return t && q(e, gt(e), t);
}
function da(t, e) {
  return t && q(e, dt(e), t);
}
var ge = typeof exports == "object" && exports && !exports.nodeType && exports, It = ge && typeof module == "object" && module && !module.nodeType && module, ba = It && It.exports === ge, xt = ba ? w.Buffer : void 0, Dt = xt ? xt.allocUnsafe : void 0;
function ha(t, e) {
  if (e)
    return t.slice();
  var r = t.length, n = Dt ? Dt(r) : new t.constructor(r);
  return t.copy(n), n;
}
function ya(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, a = 0, s = []; ++r < n; ) {
    var o = t[r];
    e(o, r, t) && (s[a++] = o);
  }
  return s;
}
function de() {
  return [];
}
var $a = Object.prototype, _a = $a.propertyIsEnumerable, kt = Object.getOwnPropertySymbols, Ta = kt ? function(t) {
  return t == null ? [] : (t = Object(t), ya(kt(t), function(e) {
    return _a.call(t, e);
  }));
} : de;
const yt = Ta;
function ma(t, e) {
  return q(t, yt(t), e);
}
var ja = Object.getOwnPropertySymbols, wa = ja ? function(t) {
  for (var e = []; t; )
    le(e, yt(t)), t = ht(t);
  return e;
} : de;
const be = wa;
function va(t, e) {
  return q(t, be(t), e);
}
function he(t, e, r) {
  var n = e(t);
  return v(t) ? n : le(n, r(t));
}
function Oa(t) {
  return he(t, gt, yt);
}
function Aa(t) {
  return he(t, dt, be);
}
var Sa = k(w, "DataView");
const it = Sa;
var Pa = k(w, "Promise");
const ot = Pa;
var Ea = k(w, "Set");
const ft = Ea;
var Mt = "[object Map]", Ca = "[object Object]", Vt = "[object Promise]", Ft = "[object Set]", Lt = "[object WeakMap]", Nt = "[object DataView]", Ia = D(it), xa = D(z), Da = D(ot), ka = D(ft), Ma = D(st), I = _;
(it && I(new it(new ArrayBuffer(1))) != Nt || z && I(new z()) != Mt || ot && I(ot.resolve()) != Vt || ft && I(new ft()) != Ft || st && I(new st()) != Lt) && (I = function(t) {
  var e = _(t), r = e == Ca ? t.constructor : void 0, n = r ? D(r) : "";
  if (n)
    switch (n) {
      case Ia:
        return Nt;
      case xa:
        return Mt;
      case Da:
        return Vt;
      case ka:
        return Ft;
      case Ma:
        return Lt;
    }
  return e;
});
const tt = I;
var Va = Object.prototype, Fa = Va.hasOwnProperty;
function La(t) {
  var e = t.length, r = new t.constructor(e);
  return e && typeof t[0] == "string" && Fa.call(t, "index") && (r.index = t.index, r.input = t.input), r;
}
var Na = w.Uint8Array;
const zt = Na;
function $t(t) {
  var e = new t.constructor(t.byteLength);
  return new zt(e).set(new zt(t)), e;
}
function za(t, e) {
  var r = e ? $t(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.byteLength);
}
var Ua = /\w*$/;
function Ra(t) {
  var e = new t.constructor(t.source, Ua.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var Ut = P ? P.prototype : void 0, Rt = Ut ? Ut.valueOf : void 0;
function Ba(t) {
  return Rt ? Object(Rt.call(t)) : {};
}
function Ga(t, e) {
  var r = e ? $t(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
var Ka = "[object Boolean]", Za = "[object Date]", Ha = "[object Map]", Wa = "[object Number]", qa = "[object RegExp]", Ya = "[object Set]", Xa = "[object String]", Ja = "[object Symbol]", Qa = "[object ArrayBuffer]", ts = "[object DataView]", es = "[object Float32Array]", rs = "[object Float64Array]", ns = "[object Int8Array]", as = "[object Int16Array]", ss = "[object Int32Array]", is = "[object Uint8Array]", os = "[object Uint8ClampedArray]", fs = "[object Uint16Array]", cs = "[object Uint32Array]";
function us(t, e, r) {
  var n = t.constructor;
  switch (e) {
    case Qa:
      return $t(t);
    case Ka:
    case Za:
      return new n(+t);
    case ts:
      return za(t, r);
    case es:
    case rs:
    case ns:
    case as:
    case ss:
    case is:
    case os:
    case fs:
    case cs:
      return Ga(t, r);
    case Ha:
      return new n();
    case Wa:
    case Xa:
      return new n(t);
    case qa:
      return Ra(t);
    case Ya:
      return new n();
    case Ja:
      return Ba(t);
  }
}
function ls(t) {
  return typeof t.constructor == "function" && !Y(t) ? ur(ht(t)) : {};
}
var ps = "[object Map]";
function gs(t) {
  return T(t) && tt(t) == ps;
}
var Bt = E && E.isMap, ds = Bt ? X(Bt) : gs;
const U = ds;
var bs = "[object Set]";
function hs(t) {
  return T(t) && tt(t) == bs;
}
var Gt = E && E.isSet, ys = Gt ? X(Gt) : hs;
const R = ys;
var $s = 1, _s = 2, Ts = 4, ye = "[object Arguments]", ms = "[object Array]", js = "[object Boolean]", ws = "[object Date]", vs = "[object Error]", $e = "[object Function]", Os = "[object GeneratorFunction]", As = "[object Map]", Ss = "[object Number]", _e = "[object Object]", Ps = "[object RegExp]", Es = "[object Set]", Cs = "[object String]", Is = "[object Symbol]", xs = "[object WeakMap]", Ds = "[object ArrayBuffer]", ks = "[object DataView]", Ms = "[object Float32Array]", Vs = "[object Float64Array]", Fs = "[object Int8Array]", Ls = "[object Int16Array]", Ns = "[object Int32Array]", zs = "[object Uint8Array]", Us = "[object Uint8ClampedArray]", Rs = "[object Uint16Array]", Bs = "[object Uint32Array]", u = {};
u[ye] = u[ms] = u[Ds] = u[ks] = u[js] = u[ws] = u[Ms] = u[Vs] = u[Fs] = u[Ls] = u[Ns] = u[As] = u[Ss] = u[_e] = u[Ps] = u[Es] = u[Cs] = u[Is] = u[zs] = u[Us] = u[Rs] = u[Bs] = !0;
u[vs] = u[$e] = u[xs] = !1;
function G(t, e, r, n, a, s) {
  var o, c = e & $s, d = e & _s, g = e & Ts;
  if (r && (o = a ? r(t, n, a, s) : r(t)), o !== void 0)
    return o;
  if (!j(t))
    return t;
  var h = v(t);
  if (h) {
    if (o = La(t), !c)
      return lr(t, o);
  } else {
    var y = tt(t), V = y == $e || y == Os;
    if (pt(t))
      return ha(t, c);
    if (y == _e || y == ye || V && !a) {
      if (o = d || V ? {} : ls(t), !c)
        return d ? va(t, da(o, t)) : ma(t, ga(o, t));
    } else {
      if (!u[y])
        return a ? t : {};
      o = us(t, y, c);
    }
  }
  s || (s = new M());
  var A = s.get(t);
  if (A)
    return A;
  s.set(t, o), R(t) ? t.forEach(function($) {
    o.add(G($, e, r, $, t, s));
  }) : U(t) && t.forEach(function($, m) {
    o.set(m, G($, e, r, m, t, s));
  });
  var b = g ? d ? Aa : Oa : d ? dt : gt, B = h ? void 0 : b(t);
  return gr(B || t, function($, m) {
    B && (m = $, $ = t[m]), ut(o, m, G($, e, r, m, t, s));
  }), o;
}
var Gs = 1, Ks = 4;
function Kt(t) {
  return G(t, Gs | Ks);
}
var Zs = "[object String]";
function Hs(t) {
  return typeof t == "string" || !v(t) && T(t) && _(t) == Zs;
}
var Ws = "[object Boolean]";
function Te(t) {
  return t === !0 || t === !1 || T(t) && _(t) == Ws;
}
var qs = "[object Date]";
function Ys(t) {
  return T(t) && _(t) == qs;
}
var Zt = E && E.isDate, Xs = Zt ? X(Zt) : Ys;
const Z = Xs;
var Js = "[object Map]", Qs = "[object Set]", ti = Object.prototype, ei = ti.hasOwnProperty;
function ri(t) {
  if (t == null)
    return !0;
  if (lt(t) && (v(t) || typeof t == "string" || typeof t.splice == "function" || pt(t) || se(t) || re(t)))
    return !t.length;
  var e = tt(t);
  if (e == Js || e == Qs)
    return !t.size;
  if (Y(t))
    return !fe(t).length;
  for (var r in t)
    if (ei.call(t, r))
      return !1;
  return !0;
}
var ni = "[object Number]";
function _t(t) {
  return typeof t == "number" || T(t) && _(t) == ni;
}
function p(t) {
  return t == null;
}
function ai(t, e, r, n) {
  if (!j(t))
    return t;
  e = ce(e, t);
  for (var a = -1, s = e.length, o = s - 1, c = t; c != null && ++a < s; ) {
    var d = ue(e[a]), g = r;
    if (d === "__proto__" || d === "constructor" || d === "prototype")
      return t;
    if (a != o) {
      var h = c[d];
      g = n ? n(h, d, c) : void 0, g === void 0 && (g = j(h) ? h : Xt(e[a + 1]) ? [] : {});
    }
    ut(c, d, g), c = c[d];
  }
  return t;
}
function S(t, e, r) {
  return t == null ? t : ai(t, e, r);
}
const at = (t) => t.trim().replace(" ", "."), Ht = {
  id: null,
  value: null,
  invalid: !1,
  errors: {}
};
async function K(t, e, r = "") {
  for (const n in t) {
    const a = `${r} ${n}`;
    ia(t[n]) ? K(t[n], e, a) : await e(n, t[n], a);
  }
}
function xi(t, e, { proactive: r = !1, autoclear: n = !1 } = {}) {
  const a = Pe({
    anyError: !1,
    pending: !1,
    errors: {},
    // To improve speed, we do not perform autoclear when validation was
    // not performed  yet
    didValidate: !1
  });
  n ? et(t, () => {
    a.didValidate && o();
  }, { deep: !0 }) : r && (et(t, () => c(), { deep: !0 }), ct(e) && et(e, () => c(), { deep: !0 })), o();
  function s() {
    K(t, (g, h, y) => {
      S(a.errors, at(y), Kt(Ht));
    }), Object.assign(a, { anyError: !1, pending: !1 });
  }
  function o() {
    a.didValidate = !1, s();
  }
  async function c(...g) {
    return o(), a.pending = !0, new Promise(async (h, y) => {
      await K(t, async (V, A, b) => {
        b = at(b), S(a.errors, b, Kt(Ht));
        const B = f(e), $ = Qn(B, b);
        if ($) {
          for (const [m, we] of Object.entries($)) {
            if (g.length > 0 && !g.includes(m))
              continue;
            const { label: ve, validate: Oe, _skip: Ae } = we;
            if (Ae)
              continue;
            const Se = await Oe(A);
            S(a.errors, `${b}.id`, V), S(a.errors, `${b}.value`, A), Se || (a.anyError = !0, S(a.errors, `${b}.invalid`, !0), S(a.errors, `${b}.errors.${m}`, ve(A)));
          }
          return Promise.resolve();
        }
      }), a.pending = !1, a.didValidate = !0, a.anyError ? y(a.errors) : h(a.errors);
    });
  }
  function d(g, h) {
    return K(t, (y, V, A) => {
      if (g === y) {
        const b = at(A);
        S(a.errors, `${b}.errors.${h.errorKey}`, h.message), S(a.errors, `${b}.invalid`, !0);
      }
    });
  }
  return {
    reset: o,
    validate: c,
    run: c,
    addError: d,
    errors: a.errors,
    $: a
  };
}
const i = function(...t) {
  return {
    _skip: !0,
    validate: () => !0,
    label: () => "test"
  };
}, Tt = (t, e, r) => new Promise(async (n) => {
  const a = [];
  for (const s of e) {
    if (!s.validate)
      throw new Error("Rule is missing a validator function");
    const o = await s.validate(t);
    a.push(o);
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
}), me = "Value does not satisfy the validation rule.";
function Di(t, e) {
  return {
    skip: i,
    _skip: !1,
    validate: (r) => t(r),
    label: (r) => p(e) ? me : typeof e == "string" ? e : e(r)
  };
}
function ki(t, e) {
  return (n) => ({
    // the value from validate is the actual value we are testing against
    // injected during validation
    _skip: !1,
    validate: (a) => t(a, n),
    label: (a) => p(e) ? me : typeof e == "string" ? e : e(a, n)
  });
}
const Mi = (t, e) => {
  const { validate: r, _skip: n } = e;
  if (p(r))
    throw new Error("[withLabel] Missing validator function");
  return {
    _skip: n,
    validate: r,
    label: (a) => typeof t == "string" ? t : t(a)
  };
}, Vi = (t, e) => Te(t) ? t ? e : i() : ct(t) ? t.value ? e : i() : W(t) ? t() ? e : i() : t.then((r) => r ? e : i()), Fi = (t, e) => Te(t) ? t ? i() : e : ct(t) ? t.value ? i() : e : W(t) ? t() ? i() : e : t.then((r) => r ? i() : e), si = (...t) => ({
  _skip: !1,
  validate: (e) => Tt(e, t, "every"),
  label() {
    return "Value must pass all the required checks";
  }
});
si.skip = i;
const ii = (...t) => ({
  _skip: !1,
  validate: (e) => Tt(e, t, "some"),
  label() {
    return "Value must pass some of the checks";
  }
});
ii.skip = i;
const oi = (...t) => ({
  _skip: !1,
  validate: (e) => Tt(e, t, "none"),
  label() {
    return "Value must pass none of the checks";
  }
});
oi.skip = i();
const Li = (t, e) => {
  const r = t.validate(e);
  return r instanceof Promise, r;
}, Ni = {
  _skip: !1,
  skip: i,
  validate: (t) => p(t) || t === "null" || t === "undefined" ? !1 : typeof t == "string" ? t.length > 0 : typeof t == "number" ? !0 : !ri(t),
  /* c8 ignore next 3 */
  label: () => "Value is required"
}, fi = (t) => ({
  _skip: !1,
  validate: (e) => p(e) ? !1 : (t = f(t), R(e) || U(e) ? e.size >= t : j(e) ? Object.keys(e).length >= t : e != null && e.length ? e.length >= t : !1),
  /* c8 ignore next 3 */
  label: () => `Value must be greater or equal to ${f(t)}`
});
fi.skip = i;
const ci = (t) => ({
  _skip: !1,
  validate: (e) => p(e) ? !1 : (t = f(t), R(e) || U(e) ? e.size <= t : j(e) ? Object.keys(e).length <= t : e != null && e.length ? e.length <= t : !1),
  /* c8 ignore next 3 */
  label: () => `Value must be lesser or equal to ${f(t)}`
});
ci.skip = i;
const ui = /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/, li = /[^a-zA-Z0-9]/, je = /\S/g, zi = {
  _skip: !1,
  skip: i,
  validate: (t) => p(t) ? !1 : ui.test(t),
  /* c8 ignore next 3 */
  label: () => "Value must be in a valid email format"
}, pi = (t, e = !1) => ({
  _skip: !1,
  validate: (r) => (t = f(t), e ? f(r) == f(t) : f(r) === f(t)),
  /* c8 ignore next 3 */
  label: () => "Values must be matching"
});
pi.skip = i;
const gi = (t) => {
  const e = typeof t == "string" ? new RegExp(t) : t;
  return {
    _skip: !1,
    validate: (r) => p(r) ? !1 : e.test(r),
    /* c8 ignore next 3 */
    label: () => "Value must match the provided rule."
  };
};
gi.skip = i;
const Ui = {
  _skip: !1,
  skip: i,
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
}, di = {
  _skip: !1,
  skip: i,
  validate: (t) => p(t) ? !1 : Hs(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a string`
}, bi = {
  _skip: !1,
  skip: i,
  validate: (t) => p(t) ? !1 : _t(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a number`
}, hi = {
  _skip: !1,
  skip: i,
  validate: (t) => p(t) ? !1 : v(t),
  label: ({ value: t }) => `Value <${typeof t}> must be an Array`
}, yi = {
  _skip: !1,
  skip: i,
  validate: (t) => p(t) || v(t) || R(t) || U(t) ? !1 : j(t),
  label: ({ value: t }) => `Value <${typeof t}> must be an Object`
}, $i = {
  _skip: !1,
  skip: i,
  validate: (t) => p(t) ? !1 : R(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Set`
}, _i = {
  _skip: !1,
  skip: i,
  validate: (t) => p(t) ? !1 : U(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Map`
}, Ti = {
  _skip: !1,
  skip: i,
  validate: (t) => {
    if (p(t) || t == "Invalid Date")
      return !1;
    if (Z(t) && t.getTime())
      return !0;
    const e = new Date(t);
    return Z(e);
  },
  label: ({ value: t }) => `Value <${typeof t}> must be a valid Date object`
}, mi = {
  _skip: !1,
  skip: i,
  validate: (t) => p(t) ? !1 : H(t),
  label: ({ value: t }) => `Value <${typeof t}> must be a Symbol`
}, ji = {
  str: di,
  num: bi,
  arr: hi,
  obj: yi,
  set: $i,
  map: _i,
  date: Ti,
  symbol: mi
}, wi = (t, e) => ({
  _skip: !1,
  validate: (r) => p(r) ? !1 : (t = f(t), e = f(e), ji.date.validate(r) && (t = t instanceof Date ? t.getTime() : new Date(t).getTime(), e = e instanceof Date ? e.getTime() : new Date(e).getTime(), r = r instanceof Date ? r.getTime() : new Date(r).getTime()), r >= t && r <= e),
  label: () => `Value must be between ${f(t)} and ${f(e)}`
});
wi.skip = i;
const vi = (t) => ({
  _skip: !1,
  validate: (e) => p(e) ? !1 : (t = f(t), _t(e) ? e >= t : Z(e) ? new Date(e) >= new Date(t) : !1),
  /* c8 ignore next 3 */
  label: () => `Minimum allowed value is ${f(t)}`
});
vi.skip = i;
const Oi = (t) => ({
  _skip: !1,
  validate: (e) => p(e) ? !1 : (t = f(t), _t(e) ? e <= t : Z(e) ? new Date(e) <= new Date(t) : !1),
  /* c8 ignore next 3 */
  label: () => `Value must be shorter or equal to ${f(t)}`
});
Oi.skip = i;
const Ai = (t) => ({
  _skip: !1,
  validate: (e) => {
    if (p(e) || typeof e != "string")
      return !1;
    t = f(t);
    const r = e.match(je);
    return r ? r.length <= t : !1;
  },
  label: (e) => typeof e != "string" ? "Value must be a string and " : `Value must have maximal lenght of ${f(t)} excluding spaces`
});
Ai.skip = i;
const Si = (t) => ({
  _skip: !1,
  validate: (e) => {
    if (p(e) || typeof e != "string")
      return !1;
    t = f(t);
    const r = e.match(je);
    return r ? r.length >= t : !1;
  },
  /* c8 ignore next 3 */
  label: () => `Value must have minimal lenght of ${f(t)} excluding spaces`
});
Si.skip = i;
const Ri = {
  _skip: !1,
  skip: i,
  validate: (t) => p(t) ? !1 : !li.test(t),
  label: (t) => typeof t != "string" ? "Value must be a string and contain no special characters" : "Value must not contain any special characters"
}, Pi = (t, e = !1) => ({
  _skip: !1,
  validate: (r) => p(r) || typeof r != "string" ? !1 : (typeof t == "string" && (t = e ? [t] : t.trim().split(/\s+/)), t.every((n) => r.toLowerCase().includes(n.toLowerCase()))),
  label: (r) => {
    t = f(t);
    const n = typeof t == "string" ? t : t.join(", ");
    return typeof r != "string" ? `Value must be a string and contain <${n}>` : `Value must contain <${n}>`;
  }
});
Pi.skip = i;
const Ei = (t, e) => ({
  _skip: !1,
  validate: (r) => (t = f(t), !r || typeof r != "string" ? !1 : r.startsWith(t, e)),
  label: (r) => typeof r != "string" ? `Value must be a string and start with '${f(t)}'` : `Value must start with '${f(t)}'`
});
Ei.skip = i;
const Ci = (t, e) => ({
  _skip: !1,
  validate: (r) => (t = f(t), !r || typeof r != "string" ? !1 : r.endsWith(t, e)),
  label: (r) => typeof r != "string" ? `Value must be a string and end with '${f(t)}'` : `Value must end with '${f(t)}'`
});
Ci.skip = i;
export {
  si as $and,
  Di as $def,
  ki as $defParam,
  oi as $not,
  ii as $or,
  Li as $test,
  Vi as $validateIf,
  Fi as $validateIfNot,
  Mi as $withLabel,
  wi as between,
  Pi as contains,
  zi as email,
  Ci as endsWith,
  Ri as hasSpecialChars,
  hi as isArr,
  Ti as isDate,
  _i as isMap,
  bi as isNum,
  yi as isObj,
  $i as isSet,
  di as isStr,
  mi as isSymbol,
  gi as match,
  Ai as maxLenNoSpace,
  ci as maxLength,
  Oi as maxValue,
  Si as minLenNoSpace,
  fi as minLength,
  vi as minValue,
  Ni as required,
  pi as sameAs,
  Ei as startsWith,
  ji as type,
  Ui as url,
  xi as useValidation
};
