# Todo

- [Plugins] string

  - [Validator] minLenWithoutSpace()
  - [Validator] maxLenWithoutSpace()
  - [Validator] hasSpecialChars()
  - [Validator] search([...words] | regex)
  - [Validator] passwordStrength(find a good regex, optional regex)
  - [Validator] mustContain

- [Plugins] date
  - [Validator] before
  - [Validator] after

## 1.0.0

- [Validators] [] minValue `<number | date>`
- [Validators] [] maxValue `<number | date>`

- [Fix Helpers] [] defineRule does not properly type parameters
- [Types] [] Correctly type all functions
- [useValidation] [] Fix coverage
- [Types] [] Allow passing any validator value as a ref (use unref())
- [Core] [] Validate nested params? ()

## Done

- [Validators] [x] Check if there is more detailed regex for validating email address
- [Core] [x] Pass parameters into `validate(...args)` to only validate part of the form
- [Core] [x] Merge errors into state
- [Helpers] [x] do() / test() should be able to perform validation outside of the
  scope, essentially as shortening `method(params).validate(value)`
- [Helpers] [x] async() - Implemented in defineRule
- [Helpers] [x] validateIf()
- [Helpers] [x] defineRule
- [Validators] [x] isNum()
- [Validators] [x] isUrl()
- [Validators] [x] between() - number / date
- [Validators] [x] match() - regex matching
- [Helpers] [x] withLabel() accept callback function which will expose stuff
  from useValidation.ts line 92
- [Helpers] [x] skip() - when writing large forms, this would allow you to
  quickly skip validation instead of commenting or whatever
- [Helpers] [x] and()
- [Helpers] [x] or()
- [Helpers] [x] not() inverts the result
- [Helpers] [x] validateIfNot()
  validateIf(not(...rules))
