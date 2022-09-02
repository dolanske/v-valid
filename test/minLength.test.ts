import { test, expect } from "vitest"
import { minLength } from "../index"

test("[validators] MinLength", () => {
  expect(minLength(1)._validate([])).toBeFalsy()
  expect(minLength(1)._validate(new Set())).toBeFalsy()
  expect(minLength(1)._validate(new Map([]))).toBeFalsy()
  expect(minLength(1)._validate({})).toBeFalsy()
  expect(minLength(1)._validate("")).toBeFalsy()

  /* prettier-ignore */ expect(minLength(1)._validate(["one", "two"])).toBeTruthy()
  /* prettier-ignore */ expect(minLength(1)._validate(new Set(["one", "two"]))).toBeTruthy()
  /* prettier-ignore */ expect(minLength(1)._validate(new Map([[1, "one"], [2, "two"]]))).toBeTruthy()
  /* prettier-ignore */ expect(minLength(1)._validate({ one: 1, two: 2 })).toBeTruthy()
  /* prettier-ignore */ expect(minLength(1)._validate("one")).toBeTruthy()
})
