// Catches most valid email addresses according to the W3C HTML5 specification.
// This willingly violates RFC 5322 to match real world usage.
export const emailRegex
  = /^([\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i

// Matches any character which is not a letter or a digit
export const specialCharsRegex = /[^a-z0-9]/i

// Matches all whitespace, used to measure length without spaces
export const whitespaceRegex = /\s+/g
