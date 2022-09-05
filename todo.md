# Todo

- [Validators] [] maxValue() - or try to work this into maxLength, with boolean to check if spaces should be included or not (the regex `value.match(/\S/g).length >= min`)
- [Validators] [] minValue() - or try to work this into minLength - same here
- [Validators] [] earlist() - date related
- [Validators] [] latest() - date related
- [Validators] [] isSpecialChar() - is value special character
- [Validators] [] Check if there is more detailed regex for validating email
  address

- [Helpers] [] validateIfNot()
- [Helpers] [] or()
- [Helpers] [] not() inverts the result
- [Fix Helpers] [] defineRule does not properly type parameters
- [Types] [] Correctly type all functions
- [Documentation] [] Properly document every single file
- [useValidation] [] Fix coverage

- [CodeClymate] Check if all validators can be rewritten using defineRule

## Done

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
