import express from "express";
import createHttpError from "http-errors";
import db from "../../modules/relations.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { parse } from "json2csv";
import { pipeline } from "stream"; // Core module

// = CONST
const cloudImg = new CloudinaryStorage({
  cloudinary, //authomatic read cloud URL
  params: {
    folder: "BuildWeek-3",
  },
});
const experience = express.Router();
const { Experience, Profile } = db;
// == / => GET PUT DELETE
experience
  .route("/")
  .get(async (req, res, next) => {
    try {
      const exper = await Experience.findAll();
      res.send(exper);
    } catch (error) {
      next(createHttpError(500));
    }
  })
  .post(async (req, res, next) => {
    try {
      const exper = await Experience.create(req.body);
      res.send(exper);
    } catch (error) {
      next(createHttpError(500));
    }
  });

// == /:ID => GET PUT DELETE
experience
  .route("/:expId")
  .get(async (req, res, next) => {
    try {
      const exper = await Experience.findAll({
        include: Profile,
        where: { id: req.params.expId },
      });
      if (exper[0]) {
        res.send(exper);
      } else {
        next(createHttpError(404, `ID: ${req.params.expId}, Not found!`));
      }
    } catch (error) {
      next(createHttpError(500));
    }
  })
  .put(async (req, res, next) => {
    try {
      const newData = { ...req.body, updatedAt: new Date() };
      const data = await Experience.update(newData, {
        where: {
          id: req.params.expId,
        },
        returning: true,
      });
      res.send(data[1][0]);
    } catch (error) {
      next(createHttpError(500));
    }
  })
  .delete(async (req, res, next) => {
    try {
      const data = await Experience.destroy({
        where: {
          id: req.params.expId,
        },
      });
      if (data > 0) {
        res.send({ message: "Ok!" });
      } else {
        next(createHttpError(404, "Not found!"));
      }
    } catch (error) {
      next(createHttpError(500));
    }
  });
//   == GET EXP by PROFILE IDs
experience.route("/:userId/profile").get(async (req, res, next) => {
  try {
    const exper = await Experience.findAll({
      include: { model: Profile, where: { id: req.params.userId } },
    });
    if (exper[0]) {
      res.send(exper);
    } else {
      next(createHttpError(404, `ID:${req.params.userId} , Not found!`));
    }
  } catch (error) {
    console.log(error);
    next(createHttpError(500));
  }
});
// === IMAGE UPLOAD
experience.route("/:expId/picture").post(
  multer({
    storage: cloudImg,
    fileFilter: (req, file, cb) => {
      if (file.mimetype != "image/jpeg" && file.mimetype != "image/png")
        cb(createHttpError(400, "Format not suported!"), false);
      else cb(null, true);
    },
  }).single("image"),
  async (req, res, next) => {
    try {
      const imageUrl = await req.file.path;
      const data = await Experience.update(
        { image: imageUrl, updatedAt: new Date() },
        {
          where: {
            id: req.params.expId,
          },
          returning: true,
        }
      );
      res.send(data[1][0]);
    } catch (error) {
      console.log(error);
      next(createHttpError(500, error));
    }
  }
);
experience.route("/:userId/CSV").get(async (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", `attachment; filename=experience.csv`);
    const data = await Experience.findAll({
      include: { model: Profile, where: { id: req.params.userId } },
    });
    const fields = [
      "id",
      "role",
      "company",
      "startDate",
      "endDate",
      "description",
      "area",
    ];
    if (data[0]) {
      const csv = parse(data, { fields });
      pipeline(csv, res, (err) => {
        if (err) next(err);
      });
    } else {
      next(
        createHttpError(
          404,
          `Profile ID:${req.params.userId} , had No experience`
        )
      );
    }
  } catch (error) {
    console.log(error);
    next(createHttpError(500, error));
  }
});

export default experience;
