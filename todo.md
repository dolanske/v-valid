# Todo

- [Types] [] Correctly type all functions
- [Validators] [] isStr()
- [Validators] [] type.string etc

- [Validators] [] isUrl()
- [Validators] [] match() - regex matching
- [Validators] [] maxValue() - or try to work this into maxLength, with boolean to check if spaces should be included or not (the regex `value.match(/\S/g).length >= min`)
- [Validators] [] minValue() - or try to work this into minLength - same here
- [Validators] [] earlist() - date related
- [Validators] [] latest() - date related
- [Validators] [] between() - number / date
- [Validators] [] isSpecialChar() - is value special character
- [Validators] [] Check if there is more detailed regex for validating email
  address

- [Helpers] [] validateIf()
- [Helpers] [] validateIfNot()
- [Helpers] [] async()
- [Helpers] [] not() inverts the result
- [Helpers] [] and()
- [Helpers] [] or()
- [Helpers] [] custom((value, { options }) => validator)

- [Documentation] [] Properly document every single file

- [useValidation] [] Fix coverage

## Done

- [Validators] [x] isNum()
- [Helpers] [x] withMessage() accept callback function which will expose stuff from useValidation.ts line 92
