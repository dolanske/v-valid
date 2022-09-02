import { test, expect } from "vitest"
import { sameAs } from "../index"

test("[validators] SameAs", () => {
  // Numbers
  expect(sameAs(1)._validate(1)).toBeTruthy()
  expect(sameAs(1)._validate(2)).toBeFalsy()

  // Leanient
  expect(sameAs(1, true)._validate("1")).toBeTruthy()
  expect(sameAs("1")._validate(1)).toBeFalsy()

  expect(sameAs("hello world")._validate("hello world")).toBeTruthy()
  expect(sameAs("hello")._validate("world")).toBeFalsy()
})
