import express from "express";
import Profile from "../../modules/profile.js";
import createHttpError from "http-errors";
import { getPDFReadableStream } from "../../lib/pdf.js";
import { pipeline } from "stream";
import { imageUpload } from "../../lib/multerTools.js";

const profileRouter = express.Router();

profileRouter.get("/", async (req, res, next) => {
  try {
    const profiles = await Profile.findAll();
    res.send(profiles);
  } catch (err) {
    next(err);
  }
});

profileRouter.get("/:profileId", async (req, res, next) => {
  try {
    const profile = await Profile.findByPk(req.params.profileId);
    res.send(profile);
  } catch (err) {
    next(err);
  }
});

profileRouter.post("/", async (req, res, next) => {
  try {
    const profile = await Profile.create(req.body);
    res.send(profile);
  } catch (err) {
    next(err);
  }
});
profileRouter.put("/:profileId", async (req, res, next) => {
  try {
    const profile = await Profile.update(
      { ...req.body, updatedAt: new Date() },
      {
        where: {
          id: req.params.profileId,
        },
        returning: true,
      }
    );
    res.send("updated");
  } catch (err) {
    next(err);
  }
});

profileRouter.delete("/:profileId", async (req, res, next) => {
  try {
    const profile = await Profile.destroy({
      where: { id: req.params.profileId },
    });
    profile > 0
      ? res.send(`Profile ${req.params.profileId} deleted`)
      : res.status(404).send(`Profile ${req.params.profileId} not found`);
  } catch (err) {
    next(err);
  }
});

// profileimage
profileRouter.post(
  "/:profileId/picture",
  imageUpload.single("picture"),
  async (req, res, next) => {
    try {
      const imagePath = req.file.path;
      console.log(imagePath);
      const addedImage = await Profile.update(
        { image: imagePath },
        {
          where: {
            id: req.params.profileId,
          },

          returning: true,
        }
      );
      res.send(addedImage);
    } catch (err) {
      next(err);
    }
  }
);

// downloadPDF
profileRouter.get("/:profileId/CV", async (req, res, next) => {
  try {
    //   find profile by id: req.params.profileId
    const profile = await Profile.findByPk(req.params.profileId);
    if (profile) {
      // pdf stuff
      const source = await getPDFReadableStream(profile);
      res.setHeader("Content-Type", "application/pdf");
      const destination = res;
      pipeline(source, destination, (err) => {
        if (err) next(err);
      });
    } else {
      next(
        createHttpError(
          404,
          `Profile with id ${req.params.profileId} not found`
        )
      );
    }
  } catch (err) {
    next(err);
  }
});

export default profileRouter;
