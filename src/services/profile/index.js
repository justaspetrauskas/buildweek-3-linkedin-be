import express from "express";
import Profile from "../../modules/profile.js";

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
    const profile = await Profile.update(req.body, {
      where: {
        id: req.params.profileId,
      },
      returning: true,
    });
    res.send(data);
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
export default profileRouter;

// profileimage
