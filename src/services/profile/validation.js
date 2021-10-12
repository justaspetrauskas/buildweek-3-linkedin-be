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
  body("bio")
    .exists()
    .withMessage("Bio field cannot be empty")
    .isString()
    .withMessage("Bio field must be a string"),
  body("area")
    .exists()
    .withMessage("Area field cannot be empty")
    .isString()
    .withMessage("Location must be a string"),
  body("username")
    .exists()
    .withMessage("Userame field cannot be empty")
    .isString()
    .withMessage("Username is required"),
];
