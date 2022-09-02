import { test, expect } from "vitest"
import { match } from "../index"

test("[validators] Match", () => {
  expect(match(/hello/g)._validate("hello world")).toBeTruthy()
  expect(match(/^notthere$/g)._validate("hello world")).toBeFalsy()
})
