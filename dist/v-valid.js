import { ref as z, reactive as Q, watch as E, isRef as A, unref as f } from "vue-demi";
function y(e) {
  return e.trim().replace(" ", ".");
}
async function h(e, t, n = "") {
  for (const r in e) {
    const i = `${n} ${r}`.trim();
    p(e[r]) && !(e[r] instanceof Date) ? await h(e[r], t, i) : await t(r, e[r], i);
  }
}
function X(e, t, n = "") {
  for (const r in e) {
    const i = `${n} ${r}`.trim();
    p(e[r]) && !(e[r] instanceof Date) ? h(e[r], t, i) : t(r, e[r], i);
  }
}
function u(e) {
  return e == null;
}
function M(e) {
  return typeof e == "boolean";
}
function O(e) {
  return typeof e == "function" && e instanceof Function;
}
function _(e) {
  return typeof e == "number" || e instanceof Number;
}
function $(e) {
  return e instanceof Date;
}
function V(e) {
  return Array.isArray(e);
}
function Y(e) {
  return typeof e == "string" || e instanceof String;
}
function Z(e) {
  return u(e) ? !0 : "length" in e ? e.length <= 0 : "size" in e ? e.size <= 0 : p(e) ? Object.keys(e).length <= 0 : !0;
}
function w(e) {
  return e instanceof Map;
}
function p(e) {
  return typeof e == "object" && !V(e) && e !== null && !O(e);
}
function D(e) {
  return e instanceof Set;
}
function I(e) {
  return e instanceof Symbol;
}
function c(e, t, n) {
  if (u(e) || !p(e))
    return;
  t = y(t.trim());
  const r = t.split(".");
  let i = e;
  const a = r.length;
  if (a > 1)
    for (let o = 0; o < a; o++) {
      const l = r[o];
      if (l.length === 0)
        continue;
      const d = Reflect.get(i, l);
      if (p(d))
        i = d;
      else if (o === a - 1) {
        Reflect.set(i, l, n);
        break;
      } else
        d === void 0 && (Reflect.set(i, l, {}), i = Reflect.get(i, l));
    }
  else
    Reflect.set(i, r[0], n);
}
function x(e, t) {
  if (u(e) || !p(e))
    return;
  t = y(t.trim());
  const n = t.split(".");
  let r = e;
  for (const i of n)
    i.length !== 0 && (r = Reflect.get(r, i));
  return r;
}
function q() {
  return { id: null, value: null, invalid: !1, errors: {} };
}
function Le(e, t, n = {}) {
  const { proactive: r = !1, autoclear: i = !1 } = n, a = z(!1), o = z(!1), l = z({}), d = Q({
    didValidate: !1
  });
  i ? E(e, () => {
    d.didValidate && b();
  }, { deep: !0 }) : r && (E(e, () => R(), { deep: !0 }), A(t) && E(t, () => R(), { deep: !0 })), b();
  function C() {
    a.value = !1, o.value = !1, h(e, (k, g, S) => {
      c(l.value, y(S), q());
    });
  }
  function b() {
    d.didValidate = !1, C();
  }
  async function R(...k) {
    return b(), o.value = !0, new Promise(async (g, S) => {
      await h(e, async (j, L, m) => {
        m = y(m), c(l.value, m, q());
        const F = f(t), P = x(F, m);
        if (!P)
          return Promise.resolve();
        for (const [T, B] of Object.entries(P)) {
          if (k.length > 0 && !k.includes(T))
            continue;
          const { label: K, validate: G, __skip: H } = B;
          if (H)
            continue;
          const J = await G(L);
          c(l.value, `${m}.id`, j), c(l.value, `${m}.value`, L), J || (a.value = !0, c(l.value, `${m}.invalid`, !0), c(l.value, `${m}.errors.${T}`, K(L)));
        }
        return Promise.resolve();
      }), o.value = !1, d.didValidate = !0, a.value ? S(l.value) : g(l.value);
    });
  }
  function U(k, g) {
    c(l.value, `${k}.errors.${g.key}`, g.message), c(l.value, `${k}.invalid`, !0);
  }
  return {
    reset: b,
    validate: R,
    addError: U,
    errors: l,
    anyError: a,
    pending: o
  };
}
const s = function(...e) {
  return {
    name: "skipped-rule",
    __skip: !0,
    validate: () => !0,
    label: () => "test"
  };
};
function N(e, t, n) {
  return new Promise(async (r) => {
    const i = [];
    for (const a of t) {
      if (!a.validate)
        throw new Error("Rule is missing a validator function");
      const o = await a.validate(e);
      i.push(o);
    }
    switch (n) {
      case "every": {
        r(i.every((a) => a));
        break;
      }
      case "some": {
        r(i.some((a) => a));
        break;
      }
      case "none": {
        r(!i.every((a) => a));
        break;
      }
    }
  });
}
const W = "Value does not satisfy the validation rule.";
function ze(e, t, n) {
  return {
    skip: s,
    name: n ?? "custom-object-rule",
    __skip: !1,
    validate: (r) => e(r),
    label: (r) => u(t) ? W : typeof t == "string" ? t : t(r)
  };
}
function Ee(e, t, n) {
  const r = (i) => ({
    // the value from validate is the actual value we are testing against
    // injected during validation
    __skip: !1,
    name: n ?? "custom-param-rule",
    validate: (a) => e(a, i),
    label: (a) => u(t) ? W : typeof t == "string" ? t : t(a, i)
  });
  return r.skip = s, r;
}
function Ae(e) {
  return X(e, (t, n, r) => {
    V(n) && c(e, r, n.reduce((i, a, o) => (a.name in i ? Reflect.set(i, a.name + o, a) : Reflect.set(i, a.name, a), i), {}));
  }), e;
}
function Oe(e, t) {
  const { validate: n, __skip: r, name: i } = t;
  if (u(n))
    throw new Error("[withLabel] Missing validator function");
  return {
    name: i,
    __skip: r,
    validate: n,
    label: (a) => typeof e == "string" ? e : e(a)
  };
}
function Ne(e, t) {
  return M(e) ? e ? t : s() : A(e) ? e.value ? t : s() : O(e) ? e() ? t : s() : e.then((n) => n ? t : s());
}
function Pe(e, t) {
  return M(e) ? e ? s() : t : A(e) ? e.value ? s() : t : O(e) ? e() ? s() : t : e.then((n) => n ? s() : t);
}
function ee(...e) {
  return {
    name: "and-validator",
    __skip: !1,
    validate: (t) => N(t, e, "every"),
    label() {
      return "Value must pass all the required checks";
    }
  };
}
ee.skip = s;
function te(...e) {
  return {
    name: "or-validator",
    __skip: !1,
    validate: (t) => N(t, e, "some"),
    label() {
      return "Value must pass some of the checks";
    }
  };
}
te.skip = s;
function ne(...e) {
  return {
    name: "not-validator",
    __skip: !1,
    validate: (t) => N(t, e, "none"),
    label() {
      return "Value must pass none of the checks";
    }
  };
}
ne.skip = s();
function Te(e, t) {
  return e.validate(t);
}
const qe = {
  __skip: !1,
  name: "required",
  skip: s,
  validate: (e) => u(e) || e === "null" || e === "undefined" ? !1 : typeof e == "string" ? e.length > 0 : typeof e == "number" ? !0 : !Z(e),
  /* c8 ignore next 3 */
  label: () => "Value is required"
};
function re(e) {
  return {
    name: "minLength",
    __skip: !1,
    validate: (t) => u(t) ? !1 : (e = f(e), D(t) || w(t) ? t.size >= e : p(t) ? Object.keys(t).length >= e : t != null && t.length ? t.length >= e : !1),
    /* c8 ignore next 3 */
    label: () => `Value must be greater or equal to ${f(e)}`
  };
}
re.skip = s;
function se(e) {
  return {
    name: "maxLength",
    __skip: !1,
    validate: (t) => u(t) ? !1 : (e = f(e), D(t) || w(t) ? t.size <= e : p(t) ? Object.keys(t).length <= e : t.length <= e),
    /* c8 ignore next 3 */
    label: () => `Value must be lesser or equal to ${f(e)}`
  };
}
se.skip = s;
const ie = /^([\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i, ae = /[^a-z0-9]/i, v = /\S/g, Me = {
  __skip: !1,
  name: "email",
  skip: s,
  validate: (e) => u(e) ? !1 : ie.test(e),
  /* c8 ignore next 3 */
  label: () => "Value must be in a valid email format"
};
function fe(e, t = !1) {
  return {
    name: "sameAs",
    __skip: !1,
    validate: (n) => (e = f(e), t ? f(n) == f(e) : f(n) === f(e)),
    /* c8 ignore next 3 */
    label: () => "Values must be matching"
  };
}
fe.skip = s;
function ue(e) {
  const t = typeof e == "string" ? new RegExp(e) : e;
  return {
    name: "match",
    __skip: !1,
    validate: (n) => u(n) ? !1 : t.test(n),
    /* c8 ignore next 3 */
    label: () => "Value must match the provided rule."
  };
}
ue.skip = s;
const We = {
  __skip: !1,
  name: "url",
  skip: s,
  validate: (e) => {
    if (u(e))
      return !1;
    try {
      return new URL(e) instanceof URL;
    } catch {
      return !1;
    }
  },
  label: () => "Value must be a valid URL"
}, le = {
  __skip: !1,
  name: "str",
  skip: s,
  validate: (e) => u(e) ? !1 : Y(e),
  label: ({ value: e }) => `Value <${typeof e}> must be a string`
}, oe = {
  name: "num",
  __skip: !1,
  skip: s,
  validate: (e) => u(e) ? !1 : _(e),
  label: ({ value: e }) => `Value <${typeof e}> must be a number`
}, ce = {
  name: "arr",
  __skip: !1,
  skip: s,
  validate: (e) => u(e) ? !1 : V(e),
  label: ({ value: e }) => `Value <${typeof e}> must be an Array`
}, pe = {
  name: "obj",
  __skip: !1,
  skip: s,
  validate: (e) => u(e) || V(e) || D(e) || w(e) ? !1 : p(e),
  label: ({ value: e }) => `Value <${typeof e}> must be an Object`
}, me = {
  name: "set",
  __skip: !1,
  skip: s,
  validate: (e) => u(e) ? !1 : D(e),
  label: ({ value: e }) => `Value <${typeof e}> must be a Set`
}, de = {
  name: "map",
  __skip: !1,
  skip: s,
  validate: (e) => u(e) ? !1 : w(e),
  label: ({ value: e }) => `Value <${typeof e}> must be a Map`
}, ke = {
  name: "date",
  __skip: !1,
  skip: s,
  validate: (e) => {
    if (u(e) || e == "Invalid Date")
      return !1;
    if ($(e) && e.getTime())
      return !0;
    const t = new Date(e);
    return $(t);
  },
  label: ({ value: e }) => `Value <${typeof e}> must be a valid Date object`
}, ge = {
  name: "symbol",
  __skip: !1,
  skip: s,
  validate: (e) => u(e) ? !1 : I(e),
  label: ({ value: e }) => `Value <${typeof e}> must be a Symbol`
}, _e = {
  str: le,
  num: oe,
  arr: ce,
  obj: pe,
  set: me,
  map: de,
  date: ke,
  symbol: ge
};
function be(e, t) {
  return {
    __skip: !1,
    name: "between",
    validate: (n) => u(n) ? !1 : (e = f(e), t = f(t), _e.date.validate(n) && (e = e instanceof Date ? e.getTime() : new Date(e).getTime(), t = t instanceof Date ? t.getTime() : new Date(t).getTime(), n = n instanceof Date ? n.getTime() : new Date(n).getTime()), n >= e && n <= t),
    label: () => `Value must be between ${f(e)} and ${f(t)}`
  };
}
be.skip = s;
function ye(e) {
  return {
    name: "minValue",
    __skip: !1,
    validate: (t) => u(t) ? !1 : (e = f(e), _(t) && _(e) ? t >= e : $(t) ? new Date(t) >= new Date(e) : !1),
    /* c8 ignore next 3 */
    label: () => `Minimum allowed value is ${f(e)}`
  };
}
ye.skip = s;
function he(e) {
  return {
    name: "maxValue",
    __skip: !1,
    validate: (t) => u(t) ? !1 : (e = f(e), _(t) && _(e) ? t <= e : $(t) ? new Date(t) <= new Date(e) : !1),
    /* c8 ignore next 3 */
    label: () => `Value must be shorter or equal to ${f(e)}`
  };
}
he.skip = s;
function $e(e) {
  return {
    __skip: !1,
    name: "maxLenNoSpace",
    validate: (t) => {
      if (u(t) || typeof t != "string")
        return !1;
      e = f(e);
      const n = t.match(v);
      return n ? n.length <= e : !1;
    },
    label: (t) => typeof t != "string" ? "Value must be a string and " : `Value must have maximal lenght of ${f(e)} excluding spaces`
  };
}
$e.skip = s;
function Ve(e) {
  return {
    name: "minLenNoSpace",
    __skip: !1,
    validate: (t) => {
      if (u(t) || typeof t != "string")
        return !1;
      e = f(e);
      const n = t.match(v);
      return n ? n.length >= e : !1;
    },
    /* c8 ignore next 3 */
    label: () => `Value must have minimal lenght of ${f(e)} excluding spaces`
  };
}
Ve.skip = s;
const ve = {
  __skip: !1,
  name: "hasSpecialChars",
  skip: s,
  validate: (e) => u(e) ? !1 : !ae.test(e),
  label: (e) => typeof e != "string" ? "Value must be a string and contain no special characters" : "Value must not contain any special characters"
};
function we(e, t = !1) {
  return {
    __skip: !1,
    name: "contains",
    validate: (n) => u(n) || typeof n != "string" ? !1 : (typeof e == "string" && (e = t ? [e] : e.trim().split(/\s+/)), e.every((r) => n.toLowerCase().includes(r.toLowerCase()))),
    label: (n) => {
      e = f(e);
      const r = typeof e == "string" ? e : e.join(", ");
      return typeof n != "string" ? `Value must be a string and contain <${r}>` : `Value must contain <${r}>`;
    }
  };
}
we.skip = s;
function De(e, t) {
  return {
    __skip: !1,
    name: "startsWith",
    validate: (n) => (e = f(e), !n || typeof n != "string" ? !1 : n.startsWith(e, t)),
    label: (n) => typeof n != "string" ? `Value must be a string and start with '${f(e)}'` : `Value must start with '${f(e)}'`
  };
}
De.skip = s;
function Re(e, t) {
  return {
    __skip: !1,
    name: "endsWith",
    validate: (n) => (e = f(e), !n || typeof n != "string" ? !1 : n.endsWith(e, t)),
    label: (n) => typeof n != "string" ? `Value must be a string and end with '${f(e)}'` : `Value must end with '${f(e)}'`
  };
}
Re.skip = s;
export {
  ee as $and,
  ne as $not,
  te as $or,
  Te as $test,
  Ne as $validateIf,
  Pe as $validateIfNot,
  Oe as $withLabel,
  be as between,
  we as contains,
  ze as createRule,
  Ee as createRuleArg,
  Ae as defineRules,
  Me as email,
  Re as endsWith,
  ve as hasSpecialChars,
  ce as isArr,
  ke as isDate,
  de as isMap,
  oe as isNum,
  pe as isObj,
  me as isSet,
  le as isStr,
  ge as isSymbol,
  ue as match,
  $e as maxLenNoSpace,
  se as maxLength,
  he as maxValue,
  Ve as minLenNoSpace,
  re as minLength,
  ye as minValue,
  qe as required,
  fe as sameAs,
  De as startsWith,
  _e as type,
  We as url,
  Le as useValidation
};
