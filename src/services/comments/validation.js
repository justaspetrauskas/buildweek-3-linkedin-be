import { body } from "express-validator";

export const commentValidator = [
  body("profileId")
    .exists()
    .withMessage("profileId field cannot be empty")
    .isNumeric()
    .withMessage("profileId must be an integer"),
  body("comment")
    .exists()
    .withMessage("comment field cannot be empty")
    .isString()
    .withMessage("comment must be a string")
];
