// This regex should catch most valid email addresses according to the W3C HTML5 specification
// This willingfully violates the RFC 5322 to include more real world use cases
export const emailRegex
  = /^([\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i

// This make sure that the string does not contain special characters
export const noSpecialCharsRegex = /[^a-z0-9]/i

// This regex checks the length of a string without counting the space
export const noSpaceRegex = /\S/g

// Password validation
export const hasUppercase = /(?=.*[A-Z])/
export const hasLowercase = /(?=.*[a-z])/
export const hasNumber = /(?=.*\d)/
