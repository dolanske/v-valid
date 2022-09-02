import { test, expect, describe } from "vitest"
import { url } from "../index"

const valid = [
  "https://www.google.com",
  "http://127.0.0.1:8080",
  "https://www.url-with-querystring.com/?url=has-querystring",
  "http://www.google.com",
  "mailto:somebody@google.com",
  "mailto://aph@apirateh.at"
]

const invalid = [
  "cumcumcumc/cum",
  "1",
  "chantar;chantaro//chantaro@chantaro",
  ";./;.';.';.'"
]

describe("[validators] Url", () => {
  test("Valid URLS", () => {
    for (const item of valid) {
      console.log(item)
      expect(url._validate(item)).toBeTruthy()
    }
  })

  test("Invalid URLS", () => {
    for (const item of invalid) {
      expect(url._validate(item)).toBeFalsy()
    }
  })
})
