# Validate forms

You know what they say, you can not trust a thief or a murderer. You know who you can trust even less? That's right, the u s e r 😤. Therefore we need to strictly watch their every step and every action. Especially when we ask THEM (dear god) to input something in a form and send it to us (YIKES).

## Example + Setup

1. Make sure you clone this repository or install it wiht npm

   ```cmd
   npm i -S git+https://github.com/dolanske/validate.git
   ```

2. Set up your component

   ```js
   import {
     useValidation,
     required,
     type,
     minLength,
     validateIf
   } from "@dolanske/validate"
   import { computed, reactive } from "vue"

   // Create your form
   const form = reactive({ value: [1, 2, 3] })

   // Create rules your form must conform to
   const rules = computed(() => ({
     // Rule keys must match the keys of your form
     value: {
       // Value is rquired
       required,
       // Using a helper, we can add conditional validations
       // Here we check if length of value is larger than 1 but ONLY if the value is an array
       shouldCheckType: validateIf(
         () => Array.isArray(form.value),
         minLength(1)
       )
     }
   }))

   // Create your validation instance
   const { validate, errors, reset } = useValidation(form, rules)
   ```

3. Trigger form validation whenever and wherever you want

   ```js
   async function onSubmit(e) {
     e.preventDefault()

     validate()
       // ctx is an object which contains information about validation checks
       .then((ctx) => {
         /* Executes if validation passes */
       })
       .catch((ctx) => {
         /* Executes if validation fails */
       })
   }

   // You can also write the same function like this

   async function onSubmit(e) {
     e.preventDefault()

     await validate()

     if (errors) {
       // Handle errors or reset form
       // Resetting form clears all errors though, so it is recommended to display
       // them in some manner and reset them when user begins using the form again

       reset()
     }
   }
   ```

## API

### `useValidation(form, rules, options)`

Main composable which is used to initiate form validation context as well as return validation methods.

- `form` reactive form object
- `rules` computed object of rules
- `options`
  - `autoclear` (default: false) resets all errors the first time a form is updated after `validation()` was ran
  - `proactive` (default: false) runs form validation on every form update

Returns

- `validate(): Promise<State>` performs a form validation and resolves with the current State of the form
- `reset(): void` clears all errors after form validation
- `errors` an object which contains all form fields and their status
- `state` an object which includes state of the entire form

---

## Validators

Collection of validators used to construct rule objects

### `required`

Requires non-empty value.

```js
const rules = computed(() => ({
  name: { required }
}))
```

---

### `minLength(min)`

Requires input to have a minimal specified length.

- **Parameters**
  - `Ref<number> | number` min
- **Works with**
  - `string`, `Set<any>`, `Map<any, any>`, `any[]` and `Object`

```js
const rules = computed(() => ({
  name: { minLength: minLength(10) }
}))
```

---

### `maxLength(max)`

Requires input to have a maximum specified length.

- **Parameters**
  - `Ref<number> | number` max
- **Works with**
  - `string`, `Set<any>`, `Map<any, any>`, `any[]`, `Object`

```js
const rules = computed(() => ({
  name: { minLength: minLength(10) }
}))
```

---

### `between(min, max)`

Requires input to be a number or Date within the specified bounds.

- **Parameters**
  - `Ref<number> | number | Date` min
  - `Ref<number> | number | Date` max
- **Works with**
  - `number`, `Date`

```js
const rules = computed(() => ({
  numberVal: { between: between(0, 10) },
  dateVal: {
    between: between(new Date("12/24/2020"), new Date("12/24/2022").getTime())
  }
}))
```

---

### `url`

Requires input to be a valid URL.

---

### `email`

Requires input to be a valid email address.

---

### `sameAs(value, lenient)`

Requires input to be the same as the provided value in the rule.

- **Parameters**
  - `Ref<any> | any` value
  - `boolean` (default: false) lenient - wether to only compare based on value or value and type (eg. `==` vs `===`)
- **Works with**
  - `any`

```js
const rules = computed(() => ({
  name: { sameAs: sameAs("Hello world") }
}))
```

---

### `match(regex)`

Requires value to match the provided regular expression check.

- **Parameters**
  - `string | RegExp` regex
- **Works with**
  - `string`

```js
// Checks wether string contains only letters and numbers
const rules = computed(() => ({
  name: {
    noSpecialChars: match(/[^a-zA-Z0-9]/)
  }
}))
```

---

### `type[typeToCheckFor]`

This is a special object rule in which you need to specify the type you want to check against.

- **Available type checks**
  - `type.str` - requires value to be an instance of `string`
  - `type.num` - requires value to be an instance of `number`
  - `type.arr` - requires value to be an instance of `Array`
  - `type.obj` - requires value to be an instance of `Object`
  - `type.set` - requires value to be an instance of `Set`
  - `type.map` - requires value to be an instance of `Map`
  - `type.date` - requires value to be an instance of `Date`
  - `type.symbol` - requires value to be an instance of `Symbol`

```js
const rules = computed(() => ({
  name: { array: type.arr }
}))
```

## Helpers

### `withLabel(label, rule)`

Allows you to add a custom error message to ant validation rule.

- **Parameters**
  - `string | Label` label
  - `ValidationRule | ValidationRuleObject` rule

```js
const rules = computed(() => ({
  name: {
    required: withLabel("You MUST fill this input!!", required)
  }
}))
```

We can also use a method instead of a string when creating custom label. This method receives the validated `value` as the first parameter and all the subsequent parameters from the validation rule. If there are any.

```js
const rules = computed(() => ({
  name: {
    between: withLabel(
      (value, min, max) =>
        `The value (${value}) must fit between ${min} and ${max}`,
      // If error occurs, the message will read like this:
      // 'The value (<value>) must fit between 5 and 10'
      between(5, 10)
    )
  }
}))
```

---

### `and(rules)`, `or(rules)`

Used when we want to apply multiple rules together into one.

- `and(...ValidationRule[])` Requires all rules to be passing to resolve
- `or(...ValidationRule[])` Requires at least one rule to be passing to resolve

```js
const rule = computed(() => ({
  name: {
    // We want the value to be an array with at least 1 values in it
    group: and(type.arr, minLength(10))
  }
}))
```

### `not(rules)`

Used in situations where we want to invert a rule results. Can also be used with multiple rules, only resolving when all of them are failing.

```js
const rule = computed(() => ({
  name: {
    // We want the input value to be anything but a string
    notString: not(type.str)
  }
}))
```

---

### `validateIf(condition, rule)`, `validateIfNot(condition, rule)`

Performs validation if the provided conition is met. Due to implementation limits, you can't use a rule as a condition. For that please use the `and` helper.

- **Parameters**
  - `boolean | () => boolean | Ref<boolean> | Promise<boolean>` condition
  - `ValidationRule` rule

```js
const rule = computed(() => ({
  name: {
    // We want to check min length of value but only if value is an array
    minLength: validateIf(Array.isArray(form.value), minLength(5))

    // If value is not a number, required it to match "Hello World"
    sameAs: validateIfNot(typeof form.value === 'number', sameAs("Hello World"))
  }
}))
```

---

### `defineRule(rule, message): ValidationRule`

Helper which is used to create and store custom validation rules.

- **Parameters**
  - `(value: any, ...args: any[]) => boolean | Promise<boolean>` rule
  - `string | Label | undefined` label

```js
// Rule which requires value to be an array and be at least n length
const arrAndMinLen = defineRule(
  (value, length) => {
    return isArray(value) && value.length >= length
  },
  (_, length) => `Array with at least ${length} length`
)

// Asynchronous rule, the main usecase here is validating
// login passwords or other API related things
const checkPassword = defineRule(
  (password) =>
    new Promise((resolve) => {
      const result = await someApiCall(password)
      resolve(result)
    }),
  "Incorrect password. Please try again."
)
```

---

### `test(rule, value): Promise<boolean> | boolean`

Perform a synthetic validation outside of any validation scope.

- **Parameters**
  - `ValidationRule` rule
  - `value` any

```js
const result = test(minLength(5), [1, 2, 3]) // False
const result = test(maxLength(5), [1, 2, 3]) // True
const result = test(type.symbol, Symbol()) // True

// with `and`, `not` and `or` or any async
// custom validators we have to acustom for the returned promise
const result = await test(or(type.str, type.num), "Hello World") // True
```
