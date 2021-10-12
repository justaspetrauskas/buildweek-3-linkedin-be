import { body } from "express-validator"

export const postValidator = [
  body("text")
    .exists()
    .withMessage("Text field cannot be empty")
    .isString()
    .withMessage("Text must be a string"),
  body("username")
    .exists()
    .withMessage("Userame field cannot be empty")
    .isString()
    .withMessage("Username is required"),
]