import { test, expect } from "vitest"
import { minLength } from "../index"

test("[validators] MinLength", () => {
  expect(minLength(1).validate([])).toBeFalsy()
  expect(minLength(1).validate(new Set())).toBeFalsy()
  expect(minLength(1).validate(new Map([]))).toBeFalsy()
  expect(minLength(1).validate({})).toBeFalsy()
  expect(minLength(1).validate("")).toBeFalsy()

  /* prettier-ignore */ expect(minLength(1).validate(["one", "two"])).toBeTruthy()
  /* prettier-ignore */ expect(minLength(1).validate(new Set(["one", "two"]))).toBeTruthy()
  /* prettier-ignore */ expect(minLength(1).validate(new Map([[1, "one"], [2, "two"]]))).toBeTruthy()
  /* prettier-ignore */ expect(minLength(1).validate({ one: 1, two: 2 })).toBeTruthy()
  /* prettier-ignore */ expect(minLength(1).validate("one")).toBeTruthy()
})
