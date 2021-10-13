import { body } from "express-validator";

export const profileValidator = [
  body("name")
    .exists()
    .withMessage("Name field cannot be empty")
    .isString()
    .withMessage("Name must be a string"),
  body("surname")
    .exists()
    .withMessage("Surname field cannot be empty")
    .isString()
    .withMessage("Surname must be a string"),
  body("email")
    .exists()
    .withMessage("Email field cannot be empty")
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Email is not correct"),
  body("bio").optional().isString().withMessage("Bio field must be a string"),
  body("title").optional().isString().withMessage("Title field must be a string"),
  body("image").optional().isString().withMessage("Image field must be a string"),
  body("area")
    .optional()
    .isString()
    .withMessage("Location must be a string"),
  body("username")
    .exists()
    .withMessage("Userame field cannot be empty")
    .isString()
    .withMessage("Username is required"),
];
