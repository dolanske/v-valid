import { test, expect, describe } from "vitest"
import { type } from "../index"

describe("[Validators] Type", () => {
  test("ARRAY type", () => {
    expect(type.str._validate("Hello")).toBeTruthy()
    expect(type.str._validate(new String("Hello world"))).toBeTruthy()

    expect(type.str._validate(10)).toBeFalsy()
    expect(type.str._validate(1 + 2)).toBeFalsy()
  })

  test("NUMBER type", () => {
    expect(type.num._validate(10)).toBeTruthy()
    expect(type.num._validate(new Number(10))).toBeTruthy()

    expect(type.num._validate("10")).toBeFalsy()
    expect(type.num._validate(1 + "10")).toBeFalsy()
  })

  test("ARRAY type", () => {
    expect(type.arr._validate([])).toBeTruthy()
    expect(type.arr._validate(new Array())).toBeTruthy()

    expect(type.arr._validate({})).toBeFalsy()
    expect(type.arr._validate(new Set())).toBeFalsy()
    expect(type.arr._validate(new Map())).toBeFalsy()
  })

  test("OBJECT type", () => {
    expect(type.obj._validate({})).toBeTruthy()
    expect(type.obj._validate({ test: true })).toBeTruthy()
    expect(type.obj._validate(new Object({ test: "true" }))).toBeTruthy()

    expect(type.obj._validate([])).toBeFalsy()
    expect(type.obj._validate(new Set())).toBeFalsy()
    expect(type.obj._validate(new Map())).toBeFalsy()
  })

  test("SET type", () => {
    expect(type.set._validate(new Set(["one"]))).toBeTruthy()
    expect(type.set._validate(new Set([() => {}]))).toBeTruthy()

    expect(type.set._validate([])).toBeFalsy()
    expect(type.set._validate({})).toBeFalsy()
    expect(type.set._validate(new Map())).toBeFalsy()
  })

  test("MAP type", () => {
    /* prettier-ignore */ expect(type.map._validate(new Map([['one', 1], ['two', 2]]))).toBeTruthy()
    expect(type.map._validate(new Map())).toBeTruthy()

    expect(type.map._validate([])).toBeFalsy()
    expect(type.map._validate({})).toBeFalsy()
    expect(type.map._validate(new Set())).toBeFalsy()
  })

  test("DATE type", () => {
    expect(type.date._validate(new Date())).toBeTruthy()
    expect(type.date._validate(new Date().toString())).toBeTruthy()
    expect(type.date._validate(Date.now())).toBeTruthy()

    expect(type.date._validate(new Date("helloworld"))).toBeFalsy()
    expect(type.date._validate(new Date("41276437891263"))).toBeFalsy()
  })
})
