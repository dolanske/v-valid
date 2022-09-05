import { test, expect } from "vitest"
import { maxLength } from "../index"

test("[validators] maxLength", () => {
  expect(maxLength(1).validate([])).toBeTruthy()
  expect(maxLength(1).validate(new Set())).toBeTruthy()
  expect(maxLength(1).validate(new Map([]))).toBeTruthy()
  expect(maxLength(1).validate({})).toBeTruthy()
  expect(maxLength(1).validate("a")).toBeTruthy()

  /* prettier-ignore */ expect(maxLength(1).validate(["one", "two"])).toBeFalsy()
  /* prettier-ignore */ expect(maxLength(1).validate(new Set(["one", "two"]))).toBeFalsy()
  /* prettier-ignore */ expect(maxLength(1).validate(new Map([[1, "one"], [2, "two"]]))).toBeFalsy()
  /* prettier-ignore */ expect(maxLength(1).validate({ one: 1, two: 2 })).toBeFalsy()
  /* prettier-ignore */ expect(maxLength(1).validate("one")).toBeFalsy()
})
