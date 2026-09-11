# TODO

- [Core] [ ] Array item validation (`items.*.name`), similar to vuelidate's `$each`
- [Core] [ ] Per-field dirty / touched tracking
- [Validators] [ ] `url` option to restrict allowed protocols (currently any absolute URL passes, including `javascript:`)
- [Documentation] [ ] Review entire documentation

## Done in 4.0

- [Core] [x] `validate()` resolves with a boolean instead of rejecting
- [Core] [x] Rules-driven traversal, fields validated in parallel, single reactive write per run
- [Core] [x] Partial validation keeps other fields' results, accepts parent paths
- [Core] [x] `bail` option
- [Core] [x] Rules accept getters, arrays, falsy entries; conditions evaluated lazily
- [Core] [x] Superseded runs are discarded
- [Core] [x] Fix deep path handling (4+ levels), Map/Set/Date fields, `required` on booleans
- [Core] [x] Fix refs passed to validators being frozen after the first run
- [Core] [x] `addError` updates `messages` and `anyError`
- [Helpers] [x] `not` matches its documentation (passes only if every rule fails)
- [Helpers] [x] `and` reports the failing rule's message
- [Helpers] [x] `withLabel` callback receives rule params
- [Helpers] [x] `optional`, `skip`
- [Validators] [x] Rename `hasSpecialChars` to `noSpecialChars`
- [Validators] [x] Remove unfinished `password`
- [Build] [x] Drop vue-demi, fix `exports.types`, `sideEffects: false`
- [Build] [x] Fix coverage (`@vitest/coverage-v8`)

## Done before 4.0

- [Label] [x] unref all values within label
- [Validators] [x] Add tests for decimal
- [Label] [x] Update error messages to follow the same rules
- [Types] [x] Correctly type all functions
- [Core] [x] Add tests for core
- [Core] [x] Make it possible to use a simple object for rules
- [Validators] [x] Check if there is more detailed regex for validating email address
- [Core] [x] Pass parameters into `validate(...args)` to only validate part of the form
- [Core] [x] Merge errors into state
- [Helpers] [x] validateIf(), validateIfNot(), and(), or(), not(), withLabel(), skip()
- [Helpers] [x] defineRule / createRule / createRuleArg
- [Validators] [x] url, between, match, minLength, maxLength, minLenNoSpace, maxLenNoSpace, contains, before, after
- [Core] [x] Validate nested params
- [Core] [x] Make error object form structure
- [Core] [x] Fix async validation timing out
