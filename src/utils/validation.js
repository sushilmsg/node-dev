const validator = require('validator');

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required!");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })) {
    throw new Error("Password must be strong (min 8 chars, include upper, lower, number)");
  }
};

module.exports = { validateSignupData };
