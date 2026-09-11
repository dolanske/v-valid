# v-valid

Model based form validation for Vue 3, inspired by [vuelidate](https://vuelidate-next.netlify.app/). You describe your form as a reactive object, describe the rules in an object of the same shape, and get back a reactive error object of that same shape.

- Rules mirror your form. Nest as deep as you want.
- Every validator accepts refs and getters, so limits can change at runtime.
- Rules can be conditional, combined, skipped, relabelled and asynchronous.
- Fully typed: typos in rule paths and `validate()` calls are compile errors.
- Small: ~4 kB gzipped, no dependencies besides Vue.

## Install

```sh
npm i @dolanske/v-valid
```

Requires Vue 3.

## Quick start

```ts
import { computed, reactive } from 'vue'
import {
  defineRules,
  email,
  minLength,
  required,
  sameAs,
  useValidation,
  validateIf,
} from '@dolanske/v-valid'

const form = reactive({
  name: '',
  password: '',
  passwordRepeat: '',
  isBusiness: false,
  company: '',
  info: {
    contact: '',
  },
})

// `defineRules<typeof form>` type checks the keys against the form
const rules = defineRules<typeof form>({
  name: { required, minLength: minLength(2) },
  password: [required, minLength(8)],
  // Getters are re-read on every validation
  passwordRepeat: { sameAs: sameAs(() => form.password) },
  // Conditions too, no `computed` needed
  company: { required: validateIf(() => form.isBusiness, required) },
  info: {
    contact: [required, email],
  },
})

const { validate, errors, anyError, pending, reset } = useValidation(form, rules)

async function onSubmit() {
  if (await validate())
    return submit(form)

  // errors is shaped like the form
  errors.value.info.contact.invalid // true
  errors.value.info.contact.messages // ['Value is required', 'Value must be a valid email address']
  errors.value.info.contact.errors.email // 'Value must be a valid email address'
}
```

```vue
<template>
  <input v-model="form.name" :class="{ error: errors.name.invalid }">
  <p v-for="message in errors.name.messages" :key="message">
    {{ message }}
  </p>
  <button :disabled="pending" @click="onSubmit">
    Submit
  </button>
</template>
```

## Migrating from 3.x

4.0 is a rewrite of the core. The rule and validator names are the same, the behaviour changed in these ways:

| 3.x | 4.0 |
| --- | --- |
| `validate()` rejects with the errors when invalid | `validate()` resolves with `boolean`. Read `errors.value` for details |
| `validate('ruleKey')` filters by rule key | `validate('field.path')` filters by field path (typed) |
| Conditions in `validateIf` are evaluated when the rules object is built | Evaluated on every validation |
| Refs passed to validators stop updating after the first run | Refs and getters stay live |
| `not(a, b)` passes if any rule fails | Passes only if every rule fails, as documented |
| `and(...)` reports a generic message | Reports the failing rule's message |
| `hasSpecialChars` | Renamed to `noSpecialChars` (it always passed when there were none) |
| `required` throws on booleans and fails on Dates | Booleans and valid Dates count as present |
| Map/Set fields are silently never validated | Validated as single values |
| `rule.__skip` | `rule.skipped` |
| Array rules need `defineRules` | Arrays work everywhere, `defineRules` is only a type helper |
| `ValidationError.id` may be `null` | Always the field key. New `path` property |
| `vue-demi` dependency | Imports from `vue` directly (Vue 3 only) |
| `addError` only sets `errors` and `invalid` | Also updates `messages` and `anyError` |

New: `bail` option, `optional()`, `skip()`, `validated` ref, rules as getters, rule `params` exposed to `withLabel` callbacks, validators return a string to fail with a custom message.

## API

### `useValidation(form, rules, options?)`

- `form` reactive object, or a ref to one.
- `rules` object shaped like the form. May also be a `ref`, `computed` or a getter function, which is re-read on every validation.
- `options`
  - `bail` (default `false`) stop at the first failing rule of each field. Rules run in definition order.
  - `proactive` (default `false`) re-validate whenever the form, the rules, or any ref used by a rule changes.
  - `autoclear` (default `false`) clear all errors the first time the form changes after `validate()` ran.

Returns:

| | |
| --- | --- |
| `validate(...paths)` | Runs the rules. Resolves with `true` when everything passed. Pass field paths (`'name'`, `'info.contact'`, or a parent like `'info'`) to validate only those; other fields keep their previous result. |
| `reset()` | Clears all errors. |
| `addError(path, { key, message })` | Adds an error to a field, e.g. one returned by your server. |
| `errors` | `ShallowRef` shaped like the form. Each leaf is a `ValidationError`. |
| `anyError` | `Ref<boolean>` |
| `pending` | `Ref<boolean>`, true while an async validation runs. |
| `validated` | `Ref<boolean>`, true once `validate()` completed, until `reset()`. |

```ts
interface ValidationError {
  id: string // 'contact'
  path: string // 'info.contact'
  value: any // the value that was validated
  invalid: boolean
  errors: Record<string, string> // { email: 'Value must be a valid email address' }
  messages: string[] // ['Value must be a valid email address']
}
```

The error object always contains every field of the form, so you can bind to `errors.name.invalid` in templates before anything ran.

### Rule objects

Rules for a field are either an object, where the key becomes the error key, or an array, where the rule's `name` is used. Falsy entries are ignored, which makes conditional rules easy:

```ts
function rules() {
  return {
    name: { required, min: minLength(2) },
    tags: [required, maxLength(5)],
    email: { email: form.wantsNewsletter && email },
  }
}
```

A rule group can also target a nested object, which is then validated as a single value:

```ts
const rules = { address: { required } } // address must be a non-empty object
```

Superseded runs are discarded: if `validate()` is called again while an async run is pending, only the latest result is applied.

## Validators

Every validator with parameters accepts plain values, refs or getters, and exposes `.skip(...)` which returns a rule that is never run. Validators without parameters expose `.skip()`.

| Validator | Passes when |
| --- | --- |
| `required` | Value is not `null`, `undefined`, `NaN`, an invalid Date, `''` or an empty array/object/Map/Set. `0` and `false` pass. |
| `minLength(min)` | Length of a string, array, Map, Set or object is at least `min`. |
| `maxLength(max)` | Length is at most `max`. |
| `minLenNoSpace(min)` | String has at least `min` non-whitespace characters. |
| `maxLenNoSpace(max)` | String has at most `max` non-whitespace characters. |
| `between(min, max)` | Number or Date is within the range (inclusive). Bounds can be numbers or Dates. |
| `before(max)` | Date is at or before `max`. Accepts Dates, timestamps and date strings. |
| `after(min)` | Date is at or after `min`. |
| `decimal` | Number with a fractional part. |
| `email` | Valid email address (HTML5 rules). |
| `url` | Absolute URL. |
| `match(regex)` | String matches the regular expression or pattern string. |
| `sameAs(value, lenient?)` | Value is `===` (`==` when `lenient`) to `value`. Pass a getter to compare against another field. |
| `contains(words, exact?)` | String contains every word, case insensitive. A string with spaces is split into words unless `exact`. |
| `startsWith(str, position?)` | String starts with `str`. |
| `endsWith(str, position?)` | String ends with `str`. |
| `noSpecialChars` | String contains only letters and digits. |

Validators fail for empty values. Wrap them in `optional()` for fields that may be left blank.

## Helpers

### `withLabel(message, rule)`

Replaces the error message. The callback receives the value and the rule's parameters.

```ts
const rules = {
  name: { required: withLabel('Please fill in your name', required) },
  age: {
    between: withLabel(
      (value, { min, max }) => `${value} is not between ${min} and ${max}`,
      between(18, 99),
    ),
  },
}
```

### `validateIf(condition, rule)`, `validateIfNot(condition, rule)`

Runs the rule only when the condition holds. The condition is a boolean, ref, getter or promise and is evaluated on every validation.

```ts
const rules = {
  company: { required: validateIf(() => form.isBusiness, required) },
  phone: { required: validateIfNot(() => form.email, required) },
}
```

### `optional(...rules)`

Passes for empty values, otherwise applies the rules.

```ts
const rules = {
  website: { url: optional(url) },
  nickname: { format: optional(minLength(3), noSpecialChars) },
}
```

### `and(...rules)`, `or(...rules)`, `not(...rules)`

Combine rules into one. All three stop as early as possible.

- `and` passes when every rule passes. The error message is the failing rule's message.
- `or` passes when at least one rule passes.
- `not` passes when every rule fails.

```ts
const rules = {
  username: { format: and(minLength(3), noSpecialChars) },
  contact: { either: or(email, match(/^\+\d+$/)) },
  password: { notName: not(sameAs(() => form.name)) },
}
```

### `skip(rule)`

Returns a copy of the rule that is never run. Handy for temporarily disabling a rule in a large form. Equivalent to `minLength.skip(3)` / `required.skip()`.

## Custom rules

### `createRule(validate, label?, name?)`

`validate` returns `true` to pass, `false` to fail with `label`, or a string to fail with that string as the message. It may return a promise.

```ts
const isEven = createRule(value => value % 2 === 0, 'Value must be even', 'isEven')

// Message decided inside the rule
const strongPassword = createRule((value) => {
  if (!/[A-Z]/.test(value))
    return 'Add an uppercase letter'
  if (!/\d/.test(value))
    return 'Add a digit'
  return true
})

// Async, e.g. checking availability against an API
const usernameFree = createRule(
  async username => (await api.checkUsername(username)).available,
  'This username is taken',
)
```

### `createRuleArg(validate, label?, name?)`

Creates a rule factory that takes a parameter object. Refs and getters in the parameters are resolved before they reach `validate` and `label`.

```ts
const arrayBetween = createRuleArg<{ min: number, max: number }>(
  (value, { min, max }) => Array.isArray(value) && value.length >= min && value.length <= max,
  (_, { min, max }) => `Choose between ${min} and ${max} items`,
  'arrayBetween',
)

const max = ref(5)
const rules = {
  tags: { arrayBetween: arrayBetween({ min: 1, max }) },
}
```

### `defineRule(definition)`

Lower level building block used by every built-in validator, for factories with positional parameters:

```ts
import type { MaybeRefOrGetter } from '@dolanske/v-valid'
import { defineRule } from '@dolanske/v-valid'
import { toValue } from 'vue'

function divisibleBy(divisor: MaybeRefOrGetter<number>) {
  return defineRule({
    name: 'divisibleBy',
    params: () => ({ divisor: toValue(divisor) }),
    validate: (value, { divisor }) => value % divisor === 0,
    label: (_, { divisor }) => `Value must be divisible by ${divisor}`,
  })
}
```

## Types

```ts
import type { ErrorsFor, Path, RulesFor, ValidationError, ValidationRule } from '@dolanske/v-valid'

interface Form { name: string, info: { contact: string } }

RulesFor<Form> // rules object shaped like Form
ErrorsFor<Form> // errors object shaped like Form
Path<Form> // 'name' | 'info' | 'info.contact'
```
