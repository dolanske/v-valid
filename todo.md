
- [Types] [] Correctly type all functions
- [useValidation] [] Fix coverage
- [Type] [] Add multiple error messages 
- [Validator] [x] minLenWithoutSpace()
- [Validator] [x] maxLenWithoutSpace()
- [Validator] [] hasSpecialChars()
- [Validator] passwordStrength(find a good regex, optional regex)
- [Validator] has(...words | words[])

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
- [Types] [x] Allow passing any validator value as a ref (use unref())
- [Core] [x] Validate nested params? ()
- [Core] [x] Make error object form structure
- [Validators] [x] minValue `<number | date>`
- [Validators] [x] maxValue `<number | date>`
- [Core] [x] Fix async validation timing out

## Can't do

- [Fix Helpers] [] defineRule does not properly type parameters
