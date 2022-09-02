import { test, expect } from "vitest"
import { isNum } from "../index"

test("[validators] Required", () => {
  expect(isNum._validate(1)).toBeTruthy()
  expect(isNum._validate(1.1)).toBeTruthy()

  expect(isNum._validate("1")).toBeFalsy()
  expect(isNum._validate(1 + "1")).toBeFalsy()
})
