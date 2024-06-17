import { expect, it } from 'vitest'
import { minLenNoSpace, required } from '../src'
import { extractName } from '../src/utils'

it('alternative array rule declaration', async () => {
  /**
   * Alternative syntax to declare form rules. While this does not mimic
   * the exact structure the main form has, it can simplify rule
   * declaration. In most cases the user does not care what kind of
   * key/id the rule is declared for. Those rules are almost exclusively
   * declared as `{ validateName: validateName() }`. To simplify usecases as such,
   * there should be a support to simply insert an array of rules.
   *
   * There are two cases that will require extra attention
   *  1. Using the same validator should append an index at the end of the id within the errors object
   *  2. Every rule will need to receive an ID which is the validator's name eg minLength
   *  - only required
   *  3. $def and $defParam should have a way of inputting the id, by default it'd be 'customRule'
   */

  // Function rules
  expect(extractName(minLenNoSpace)).toBe('minLenNoSpace')

  // Object rules
  expect(extractName({ required })).toBe('required')

  // const form = reactive({
  //   first: 'hello',
  //   nested: {
  //     second: 'world',
  //   },
  // })

  // // Current syntax
  // const rules = {
  //   first: {
  //     string: type.str,
  //   },
  //   nested: {
  //     second: {
  //       minLenNoSpace: minLenNoSpace(10),
  //       num: type.num,
  //     },
  //   },
  // }

  // // Alternative syntax
  // const rules = {
  //   first: [type.str],
  //   nested: {
  //     second: [minLenNoSpace(10), type.num],
  //   },
  // }

  // Second alternative syntax
})
