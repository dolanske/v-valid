import { describe, expect, it } from 'vitest'
import { ref } from 'vue-demi'
import { getDeep, isNil, isObject, setDeep } from '../src/utils'

describe('utility methods', () => {
  it('isNil', () => {
    expect(isNil({})).toBeFalsy()
    expect(isNil(Object.create(null))).toBeFalsy()
  })

  it('isObject', () => {
    expect(isObject({})).toBeTruthy()
    expect(isObject(Object.create(null))).toBeTruthy()
  })

  it('setDeep & getDeep', () => {
    const base = {}
    setDeep(base, 'one.two.three', 'test')
    expect(base).toStrictEqual({
      one: {
        two: {
          three: 'test',
        },
      },
    })

    expect(getDeep(base, 'one.two')).toStrictEqual({
      three: 'test',
    })

    expect(getDeep(base, 'one.two.three')).toBe('test')
  })

  it('setDeep with refs', () => {
    const base = ref({})
    setDeep(base.value, 'one.two.three', 'test')
    expect(base.value).toStrictEqual({
      one: {
        two: {
          three: 'test',
        },
      },
    })

    setDeep(base.value, 'one.two.four', false)
    setDeep(base.value, 'one.three', true)

    expect(base.value).toStrictEqual({
      one: {
        three: true,
        two: {
          three: 'test',
          four: false,
        },
      },
    })
  })
})
