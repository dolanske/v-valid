// This regex should catch most valid email addresses according to the W3C HTML5 specification
// This willingfully violates the RFC 5322 to include more real world use cases
export const emailRegex
  = /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/

// This make sure that the string does not contain special characters
export const noSpecialCharsRegex = /[^a-zA-Z0-9]/

// This regex checks the length of a string without counting the space
export const noSpaceRegex = /\S/g
