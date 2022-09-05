import { test, expect } from "vitest"
import { email } from "../index"

const valid = [
  "email@example.com",
  "firstname.lastname@example.com",
  "email@subdomain.example.com",
  "firstname+lastname@example.com",
  '"email"@example.com',
  "email@example.name",
  "email@example.museum",
  "_______@example.com",
  "email@example-one.com",
  "email@example.co.jp",
  "email@123.123.123.123",
  "email@[123.123.123.123]",
  "1234567890@example.com",
  "firstname-lastname@example.com"
]

const invalid = [
  "plainaddress",
  "#@%^%#$@#$@#.com",
  "@example.com",
  "Joe Smith <email@example.com>",
  "email.example.com",
  "email@example@example.com",
  ".email@example.com",
  "email.@example.com",
  "email..email@example.com",
  "あいうえお@example.com",
  "email@example.com (Joe Smith)",
  "email@example",
  "email@-example.com",
  "email@example.web",
  "email@111.222.333.44444",
  "email@example..com",
  "Abc..123@example.com",
  "”(),:;<>[]@example.com",
  "just”not”right@example.com",
  'this is"really"notallowed@example.com'
]

test.skip("[validators] Email", () => {
  // Should be valid
  for (const str of valid) {
    expect(email.validate(str)).toBeTruthy()
  }

  // Should be invalid
  for (const str of invalid) {
    expect(email.validate(str)).toBeFalsy()
  }
})
