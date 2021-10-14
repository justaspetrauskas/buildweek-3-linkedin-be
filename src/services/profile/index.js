import express from "express";
import models from "../../modules/relationTable/relations.js";
import createHttpError from "http-errors";
import { getPDFReadableStream } from "../../lib/pdf.js";
import { pipeline } from "stream";
import { imageUpload } from "../../lib/multerTools.js";

import { validationResult } from "express-validator";
import { profileValidator } from "./validation.js";

import s from "sequelize";
import { profile } from "console";
const { Op } = s;

const profileRouter = express.Router();
const { Profile, Experience, Post, Comment, FriendRequest, Friends } = models;
profileRouter.get("/", async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({
      include: [
        {
          model: Experience,
          attributes: ["company", "role", "startDate", "endDate"],
        },

        {
          model: Post,
          attributes: ["text"],
        },
        {
          model: Comment,
          attributes: ["comment"],
        },
      ],
      where: req.query.search && {
        [Op.or]: [
          { name: { [Op.iLike]: `%${req.query.search}%` } },
          { surname: { [Op.iLike]: `%${req.query.search}%` } },
        ],
      },
      limit: req.query.limit * 5 || 5,
      offset: req.query.offset > 0 ? (req.query.offset - 1) * 5 : 0,
    });
    res.send(profiles);
  } catch (err) {
    next(err);
  }
});

profileRouter.get("/:profileId", async (req, res, next) => {
  try {
    const profile = await Profile.findByPk(req.params.profileId, {
      include: [
        {
          model: Experience,
          attributes: ["company", "role", "startDate", "endDate"],
        },
        {
          model: Post,
          attributes: ["text"],
        },
        {
          model: Comment,
          attributes: ["comment"],
        },
        // { model: Profile, through: { id: req.params.profileId }, as: "friends" },
      ],
    });
    profile ? res.send(profile) : next(createHttpError(404, "User not found"));
  } catch (err) {
    next(err);
  }
});

profileRouter.post("/", profileValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // let errorList = errors
      //   .array()
      //   .map((el) => el.msg.toString())
      //   .join();
      next(
        createHttpError(400, {
          message: errors.array().map((el) => el.msg),
          errors: errors.array(),
        })
      );
    } else {
      const profile = await Profile.create(req.body);
      res.send(profile);
    }
  } catch (err) {
    next(createHttpError(400, err.message));
  }
});
profileRouter.put("/:profileId", profileValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(
        createHttpError(400, {
          message: errors.array().map((el) => el.msg),
          errors: errors.array(),
        })
      );
    } else {
      const profile = await Profile.update(
        { ...req.body, updatedAt: new Date() },
        {
          where: {
            id: req.params.profileId,
          },
          returning: true,
        }
      );
      res.send(profile[1][0]);
    }
  } catch (err) {
    next(createHttpError(400, err.message));
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
      res.send(addedImage[1][0]);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////
// add friend
profileRouter.post("/:profileId/addFriend", async (req, res, next) => {
  try {
    // find me by id
    const currentProfile = await Profile.findByPk(req.params.profileId);
    const profileToFollow = await Profile.findByPk(req.body.followId);
    // make sure profile is not in my friends list or request list already
    const alreadyFriend = await currentProfile.hasFriend(profileToFollow);
    const hasRequestSent = await currentProfile.hasFollowed(profileToFollow);

    if (!alreadyFriend && !hasRequestSent) {
      await currentProfile.addProfile(profileToFollow);
      res.send(`friend request sent to the user ID ${req.body.followId}`);
    } else {
      next(
        createHttpError(
          400,
          `person is already a friend or has received a request`
        )
      );
    }
  } catch (err) {
    next(err);
  }
});
// see incoming friend requests
profileRouter.get("/:profileId/friendRequest", async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      where: { id: req.params.profileId },
      attributes: ["id", "name", "surname"],
    });
    const friendRequests = (
      await profile.getFollowed({
        attributes: ["name", "surname", "id"],
      })
    ).map((el) => el);
    const countFriendRequests = await profile.countFollowed();

    const hasfriendRequestData = {
      profile,
      total: countFriendRequests,
      friendRequests,
    };

    res.send(hasfriendRequestData);
  } catch (err) {
    next(err);
  }
});
// see outgoing friend requests
profileRouter.get("/:profileId/sentFriendRequests", async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      where: { id: req.params.profileId },
      attributes: ["id", "name", "surname"],
    });
    const sentfriendRequests = await profile.getProfile({
      attributes: ["name", "surname", "id"],
    });
    const countFriendRequests = await profile.countProfile();

    const sentfriendRequestData = {
      profile,
      total: countFriendRequests,
      sentfriendRequests,
    };

    res.send(sentfriendRequestData);
  } catch (err) {
    next(err);
  }
});

// acceptFriendRequest
profileRouter.post(
  "/:profileId/acceptFriendRequest",
  async (req, res, next) => {
    try {
      // find me by id
      const currentProfile = await Profile.findOne({
        where: { id: req.params.profileId },
      });
      const friendToAccept = await Profile.findOne({
        where: { id: req.body.profileId },
      });
      await currentProfile.addFriend(friendToAccept);
      await friendToAccept.addFriend(currentProfile);
      console.log("accepted");
      // delete from friendRequest
      const deletedFromRequests = await FriendRequest.destroy({
        where: { ProfileId: req.body.profileId },
      });
      console.log("deleted");

      res.send(`friend with ID ${req.body.profileId} accepted`);
    } catch (err) {
      next(err);
    }
  }
);
// cancelFriendRequest
profileRouter.put("/:profileId/cancelFriendRequest", async (req, res, next) => {
  try {
    // find me by id
    const profile = await Profile.findByPk(req.params.profileId);
    const cancelRequest = await Profile.findByPk(req.body.profileId);
    const hasCanceled = await profile.hasFollowed(cancelRequest);
    // console.log(hasCanceled);
    if (hasCanceled) {
      await profile.removeProfile(cancelRequest);
      res.send("canceled");
    } else {
      next(createHttpError(400, `Has already been canceled`));
    }
  } catch (err) {
    next(err);
  }
});
// reject friend request
profileRouter.put("/:profileId/rejectFriendrequest", async (req, res, next) => {
  try {
    // find me by id
    const profile = await Profile.findByPk(req.params.profileId);
    const rejectRequest = await Profile.findByPk(req.body.profileId);
    const hasRejected = await profile.hasProfile(rejectRequest);
    if (hasRejected) {
      await profile.removeProfile(rejectRequest);
      res.send("rejected");
    } else {
      next(createHttpError(400, `Has already been rejected`));
    }
  } catch (err) {
    next(err);
  }
});
// see friends
profileRouter.get("/:profileId/friends", async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      where: { id: req.params.profileId },
      attributes: ["id", "name", "surname"],
    });
    const friends = (
      await profile.getFriends({
        attributes: ["name", "surname", "id"],
      })
    ).map((el) => el);
    const countFriends = await profile.countFriends();

    const friendsData = {
      profile,
      total: countFriends,
      friends,
    };
    res.send(friendsData);
  } catch (err) {
    next(err);
  }
});
// unfriend
profileRouter.put("/:profileId/unfriend", async (req, res, next) => {
  try {
    const profile = await Profile.findByPk(req.params.profileId);
    const friendProfile = await Profile.findByPk(req.body.unfriendId);

    await profile.removeFriends(friendProfile);
    await friendProfile.removeFriend(profile);
    res.send("unfriended");
  } catch (err) {
    next(err);
  }
});

export default profileRouter;
