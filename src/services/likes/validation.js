import { body } from "express-validator";

export const likeValidator = [
  body("profileId")
    .exists()
    .withMessage("profileId field cannot be empty")
    .isNumeric()
    .withMessage("profileId must be an integer")
];
