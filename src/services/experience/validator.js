import { body } from "express-validator";

export const postValid = [
  body("role").exists().notEmpty().withMessage("role is a mandatory field!"),
  body("company").exists().withMessage("company is a mandatory field!"),
  body("startDate").exists().withMessage("startDate is a mandatory field!"),
  //   body("endDate").exists().withMessage("cover is a mandatory field!"),
  body("description").exists().withMessage("description is a mandatory field!"),
  body("area").exists().notEmpty().withMessage("area is a mandatory field!"),
  body("profileId")
    .exists()
    // .notEmpty()
    .isNumeric()
    .withMessage(
      "profileId is a mandatory field! profileId should be Integer!"
    ),
  //   body("readTime.value")
  //     .exists()
  //     .notEmpty()
  //     .isNumeric()
  //     .withMessage("category is a mandatory field!"),
  //   body("readTime.unit")
  //     .exists()
  //     .notEmpty()
  //     .withMessage("category is a mandatory field!"),
];
