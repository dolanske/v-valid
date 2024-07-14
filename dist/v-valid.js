import { ref as L, reactive as Q, watch as R, isRef as E, unref as i } from "vue-demi";
function y(e) {
  return e.trim().replace(" ", ".");
}
async function z(e, t, n = "") {
  for (const s in e) {
    const f = `${n} ${s}`.trim();
    m(e[s]) && !(e[s] instanceof Date) ? await z(e[s], t, f) : await t(s, e[s], f);
  }
}
function a(e) {
  return e == null;
}
function q(e) {
  return typeof e == "boolean";
}
function A(e) {
  return typeof e == "function" && e instanceof Function;
}
function k(e) {
  return typeof e == "number" || e instanceof Number;
}
function h(e) {
  return e instanceof Date;
}
function O(e) {
  return Array.isArray(e);
}
function X(e) {
  return typeof e == "string" || e instanceof String;
}
function Y(e) {
  return a(e) ? !0 : "length" in e ? e.length <= 0 : "size" in e ? e.size <= 0 : m(e) ? Object.keys(e).length <= 0 : !0;
}
function $(e) {
  return e instanceof Map;
}
function m(e) {
  return typeof e == "object" && !O(e) && e !== null && !A(e);
}
function V(e) {
  return e instanceof Set;
}
function Z(e) {
  return e instanceof Symbol;
}
function p(e, t, n) {
  if (a(e) || !m(e))
    return;
  t = y(t.trim());
  const s = t.split(".");
  let f = e;
  const u = s.length;
  if (u > 1)
    for (let o = 0; o < u; o++) {
      const l = s[o];
      if (l.length === 0)
        continue;
      const d = Reflect.get(f, l);
      if (m(d))
        f = d;
      else if (o === u - 1) {
        Reflect.set(f, l, n);
        break;
      } else
        d === void 0 && (Reflect.set(f, l, {}), f = Reflect.get(f, l));
    }
  else
    Reflect.set(f, s[0], n);
}
function I(e, t) {
  if (a(e) || !m(e))
    return;
  t = y(t.trim());
  const n = t.split(".");
  let s = e;
  for (const f of n)
    f.length !== 0 && (s = Reflect.get(s, f));
  return s;
}
function P() {
  return { id: null, value: null, invalid: !1, errors: {} };
}
function Le(e, t, n = {}) {
  const { proactive: s = !1, autoclear: f = !1 } = n, u = L(!1), o = L(!1), l = L({}), d = Q({
    didValidate: !1
  });
  f ? R(e, () => {
    d.didValidate && _();
  }, { deep: !0 }) : s && (R(e, () => w(), { deep: !0 }), E(t) && R(t, () => w(), { deep: !0 })), _();
  function W() {
    u.value = !1, o.value = !1, z(e, (b, g, D) => {
      p(l.value, y(D), P());
    });
  }
  function _() {
    d.didValidate = !1, W();
  }
  async function w(...b) {
    return _(), o.value = !0, new Promise(async (g, D) => {
      await z(e, async (U, S, c) => {
        c = y(c), p(l.value, c, P());
        const F = i(t), T = I(F, c);
        if (!T)
          return Promise.resolve();
        for (const [j, B] of Object.entries(T)) {
          if (b.length > 0 && !b.includes(j))
            continue;
          const { label: K, validate: G, __skip: H } = B;
          if (H)
            continue;
          const J = await G(S);
          p(l.value, `${c}.id`, U), p(l.value, `${c}.value`, S), J || (u.value = !0, p(l.value, `${c}.invalid`, !0), p(l.value, `${c}.errors.${j}`, K(S)));
        }
        return Promise.resolve();
      }), o.value = !1, d.didValidate = !0, u.value ? D(l.value) : g(l.value);
    });
  }
  function C(b, g) {
    p(l.value, `${b}.errors.${g.key}`, g.message), p(l.value, `${b}.invalid`, !0);
  }
  return {
    reset: _,
    validate: w,
    addError: C,
    errors: l,
    anyError: u,
    pending: o
  };
}
const r = function(...e) {
  return {
    name: "skipped-rule",
    __skip: !0,
    validate: () => !0,
    label: () => "test"
  };
};
function N(e, t, n) {
  return new Promise(async (s) => {
    const f = [];
    for (const u of t) {
      if (!u.validate)
        throw new Error("Rule is missing a validator function");
      const o = await u.validate(e);
      f.push(o);
    }
    switch (n) {
      case "every": {
        s(f.every((u) => u));
        break;
      }
      case "some": {
        s(f.some((u) => u));
        break;
      }
      case "none": {
        s(!f.every((u) => u));
        break;
      }
    }
  });
}
const v = "Value does not satisfy the validation rule.";
function Re(e, t, n) {
  return {
    skip: r,
    name: n ?? "custom-object-rule",
    __skip: !1,
    validate: (s) => e(s),
    label: (s) => a(t) ? v : typeof t == "string" ? t : t(s)
  };
}
function ze(e, t, n) {
  const s = (f) => ({
    // the value from validate is the actual value we are testing against
    // injected during validation
    __skip: !1,
    name: n ?? "custom-param-rule",
    validate: (u) => e(u, f),
    label: (u) => a(t) ? v : typeof t == "string" ? t : t(u, f)
  });
  return s.skip = r, s;
}
function Ee(e, t) {
  const { validate: n, __skip: s, name: f } = t;
  if (a(n))
    throw new Error("[withLabel] Missing validator function");
  return {
    name: f,
    __skip: s,
    validate: n,
    label: (u) => typeof e == "string" ? e : e(u)
  };
}
function Ae(e, t) {
  return q(e) ? e ? t : r() : E(e) ? e.value ? t : r() : A(e) ? e() ? t : r() : e.then((n) => n ? t : r());
}
function Oe(e, t) {
  return q(e) ? e ? r() : t : E(e) ? e.value ? r() : t : A(e) ? e() ? r() : t : e.then((n) => n ? r() : t);
}
function x(...e) {
  return {
    name: "and-validator",
    __skip: !1,
    validate: (t) => N(t, e, "every"),
    label() {
      return "Value must pass all the required checks";
    }
  };
}
x.skip = r;
function ee(...e) {
  return {
    name: "or-validator",
    __skip: !1,
    validate: (t) => N(t, e, "some"),
    label() {
      return "Value must pass some of the checks";
    }
  };
}
ee.skip = r;
function te(...e) {
  return {
    name: "not-validator",
    __skip: !1,
    validate: (t) => N(t, e, "none"),
    label() {
      return "Value must pass none of the checks";
    }
  };
}
te.skip = r();
function Ne(e, t) {
  return e.validate(t);
}
const Te = {
  __skip: !1,
  name: "required",
  skip: r,
  validate: (e) => a(e) || e === "null" || e === "undefined" ? !1 : typeof e == "string" ? e.length > 0 : typeof e == "number" ? !0 : !Y(e),
  /* c8 ignore next 3 */
  label: () => "Value is required"
};
function ne(e) {
  return {
    name: "minLength",
    __skip: !1,
    validate: (t) => a(t) ? !1 : (e = i(e), V(t) || $(t) ? t.size >= e : m(t) ? Object.keys(t).length >= e : t != null && t.length ? t.length >= e : !1),
    /* c8 ignore next 3 */
    label: () => `Value must be greater or equal to ${i(e)}`
  };
}
ne.skip = r;
function re(e) {
  return {
    name: "maxLength",
    __skip: !1,
    validate: (t) => a(t) ? !1 : (e = i(e), V(t) || $(t) ? t.size <= e : m(t) ? Object.keys(t).length <= e : t.length <= e),
    /* c8 ignore next 3 */
    label: () => `Value must be lesser or equal to ${i(e)}`
  };
}
re.skip = r;
const se = /^([\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i, ie = /[^a-z0-9]/i, M = /\S/g, je = {
  __skip: !1,
  name: "email",
  skip: r,
  validate: (e) => a(e) ? !1 : se.test(e),
  /* c8 ignore next 3 */
  label: () => "Value must be in a valid email format"
};
function ae(e, t = !1) {
  return {
    name: "sameAs",
    __skip: !1,
    validate: (n) => (e = i(e), t ? i(n) == i(e) : i(n) === i(e)),
    /* c8 ignore next 3 */
    label: () => "Values must be matching"
  };
}
ae.skip = r;
function fe(e) {
  const t = typeof e == "string" ? new RegExp(e) : e;
  return {
    name: "match",
    __skip: !1,
    validate: (n) => a(n) ? !1 : t.test(n),
    /* c8 ignore next 3 */
    label: () => "Value must match the provided rule."
  };
}
fe.skip = r;
const Pe = {
  __skip: !1,
  name: "url",
  skip: r,
  validate: (e) => {
    if (a(e))
      return !1;
    try {
      return new URL(e) instanceof URL;
    } catch {
      return !1;
    }
  },
  label: () => "Value must be a valid URL"
}, ue = {
  __skip: !1,
  name: "str",
  skip: r,
  validate: (e) => a(e) ? !1 : X(e),
  label: ({ value: e }) => `Value <${typeof e}> must be a string`
}, le = {
  name: "num",
  __skip: !1,
  skip: r,
  validate: (e) => a(e) ? !1 : k(e),
  label: ({ value: e }) => `Value <${typeof e}> must be a number`
}, oe = {
  name: "arr",
  __skip: !1,
  skip: r,
  validate: (e) => a(e) ? !1 : O(e),
  label: ({ value: e }) => `Value <${typeof e}> must be an Array`
}, ce = {
  name: "obj",
  __skip: !1,
  skip: r,
  validate: (e) => a(e) || O(e) || V(e) || $(e) ? !1 : m(e),
  label: ({ value: e }) => `Value <${typeof e}> must be an Object`
}, pe = {
  name: "set",
  __skip: !1,
  skip: r,
  validate: (e) => a(e) ? !1 : V(e),
  label: ({ value: e }) => `Value <${typeof e}> must be a Set`
}, me = {
  name: "map",
  __skip: !1,
  skip: r,
  validate: (e) => a(e) ? !1 : $(e),
  label: ({ value: e }) => `Value <${typeof e}> must be a Map`
}, de = {
  name: "date",
  __skip: !1,
  skip: r,
  validate: (e) => {
    if (a(e) || e == "Invalid Date")
      return !1;
    if (h(e) && e.getTime())
      return !0;
    const t = new Date(e);
    return h(t);
  },
  label: ({ value: e }) => `Value <${typeof e}> must be a valid Date object`
}, be = {
  name: "symbol",
  __skip: !1,
  skip: r,
  validate: (e) => a(e) ? !1 : Z(e),
  label: ({ value: e }) => `Value <${typeof e}> must be a Symbol`
}, ge = {
  str: ue,
  num: le,
  arr: oe,
  obj: ce,
  set: pe,
  map: me,
  date: de,
  symbol: be
};
function ke(e, t) {
  return {
    __skip: !1,
    name: "between",
    validate: (n) => a(n) ? !1 : (e = i(e), t = i(t), ge.date.validate(n) && (e = e instanceof Date ? e.getTime() : new Date(e).getTime(), t = t instanceof Date ? t.getTime() : new Date(t).getTime(), n = n instanceof Date ? n.getTime() : new Date(n).getTime()), n >= e && n <= t),
    label: () => `Value must be between ${i(e)} and ${i(t)}`
  };
}
ke.skip = r;
function _e(e) {
  return {
    name: "minValue",
    __skip: !1,
    validate: (t) => a(t) ? !1 : (e = i(e), k(t) && k(e) ? t >= e : h(t) ? new Date(t) >= new Date(e) : !1),
    /* c8 ignore next 3 */
    label: () => `Minimum allowed value is ${i(e)}`
  };
}
_e.skip = r;
function ye(e) {
  return {
    name: "maxValue",
    __skip: !1,
    validate: (t) => a(t) ? !1 : (e = i(e), k(t) && k(e) ? t <= e : h(t) ? new Date(t) <= new Date(e) : !1),
    /* c8 ignore next 3 */
    label: () => `Value must be shorter or equal to ${i(e)}`
  };
}
ye.skip = r;
function he(e) {
  return {
    __skip: !1,
    name: "maxLenNoSpace",
    validate: (t) => {
      if (a(t) || typeof t != "string")
        return !1;
      e = i(e);
      const n = t.match(M);
      return n ? n.length <= e : !1;
    },
    label: (t) => typeof t != "string" ? "Value must be a string and " : `Value must have maximal lenght of ${i(e)} excluding spaces`
  };
}
he.skip = r;
function $e(e) {
  return {
    name: "minLenNoSpace",
    __skip: !1,
    validate: (t) => {
      if (a(t) || typeof t != "string")
        return !1;
      e = i(e);
      const n = t.match(M);
      return n ? n.length >= e : !1;
    },
    /* c8 ignore next 3 */
    label: () => `Value must have minimal lenght of ${i(e)} excluding spaces`
  };
}
$e.skip = r;
const qe = {
  __skip: !1,
  name: "hasSpecialChars",
  skip: r,
  validate: (e) => a(e) ? !1 : !ie.test(e),
  label: (e) => typeof e != "string" ? "Value must be a string and contain no special characters" : "Value must not contain any special characters"
};
function Ve(e, t = !1) {
  return {
    __skip: !1,
    name: "contains",
    validate: (n) => a(n) || typeof n != "string" ? !1 : (typeof e == "string" && (e = t ? [e] : e.trim().split(/\s+/)), e.every((s) => n.toLowerCase().includes(s.toLowerCase()))),
    label: (n) => {
      e = i(e);
      const s = typeof e == "string" ? e : e.join(", ");
      return typeof n != "string" ? `Value must be a string and contain <${s}>` : `Value must contain <${s}>`;
    }
  };
}
Ve.skip = r;
function we(e, t) {
  return {
    __skip: !1,
    name: "startsWith",
    validate: (n) => (e = i(e), !n || typeof n != "string" ? !1 : n.startsWith(e, t)),
    label: (n) => typeof n != "string" ? `Value must be a string and start with '${i(e)}'` : `Value must start with '${i(e)}'`
  };
}
we.skip = r;
function De(e, t) {
  return {
    __skip: !1,
    name: "endsWith",
    validate: (n) => (e = i(e), !n || typeof n != "string" ? !1 : n.endsWith(e, t)),
    label: (n) => typeof n != "string" ? `Value must be a string and end with '${i(e)}'` : `Value must end with '${i(e)}'`
  };
}
De.skip = r;
export {
  x as $and,
  te as $not,
  ee as $or,
  Ne as $test,
  Ae as $validateIf,
  Oe as $validateIfNot,
  Ee as $withLabel,
  ke as between,
  Ve as contains,
  Re as createRule,
  ze as createRuleArg,
  je as email,
  De as endsWith,
  qe as hasSpecialChars,
  oe as isArr,
  de as isDate,
  me as isMap,
  le as isNum,
  ce as isObj,
  pe as isSet,
  ue as isStr,
  be as isSymbol,
  fe as match,
  he as maxLenNoSpace,
  re as maxLength,
  ye as maxValue,
  $e as minLenNoSpace,
  ne as minLength,
  _e as minValue,
  Te as required,
  ae as sameAs,
  we as startsWith,
  ge as type,
  Pe as url,
  Le as useValidation
};
