import { body, validationResult } from "express-validator";
import ErrorHandler from "../error-handler/index.js";

const registerValidationRules = () => {
  const rules = [
    body("email", "email must be valid").isEmail(),
    body("password", "password must be at least 5 characters").isLength({
      min: 5,
    }),
    body("name", "name must be at least 3 characters").isLength({ min: 3 }),
  ];

  return rules;
};

const loginValidationRules = () => {
  const rules = [
    body("email", "email must be valid").isEmail(),
    body("password", "password must be at least 5 characters").isLength({
      min: 5,
    }),
  ];

  return rules;
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(400, errors.array()[0].msg));
  }
  next();
};

export { registerValidationRules, validate, loginValidationRules };
