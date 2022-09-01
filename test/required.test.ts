import { test, expect } from "vitest"

import { required } from "../index"

test("required", () => {
  // Should fail
  expect(required._validate()).toBeFalsy()
  expect(required._validate("")).toBeFalsy()
  expect(required._validate({})).toBeFalsy()
  expect(required._validate([])).toBeFalsy()
  expect(required._validate(new Set())).toBeFalsy()
  expect(required._validate(new Map())).toBeFalsy()

  // Should pass
  expect(required._validate("test")).toBeTruthy()
  expect(required._validate(0)).toBeTruthy()
  expect(required._validate({ foo: "bar" })).toBeTruthy()
  expect(required._validate(["test"])).toBeTruthy()
  expect(required._validate(new Set("test"))).toBeTruthy()
  expect(required._validate(new Map([["foo", "bar"]]))).toBeTruthy()
})
