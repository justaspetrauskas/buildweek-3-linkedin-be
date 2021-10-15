import Experience from "../schemas/experience.js";
import Profile from "../schemas/profile.js";
import Comment from "../schemas/comments.js";
import Like from "../schemas/likes.js";
import Post from "../schemas/post.js";
import FriendRequest from "../schemas/friendRequests.js";
import Friend from "../schemas/friends.js";

Profile.hasMany(Experience);
Experience.belongsTo(Profile);

Profile.hasMany(Comment);
Comment.belongsTo(Profile);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Profile.belongsToMany(Post, { through: { model: Like, unique: true } });
Post.belongsTo(Profile, { through: { model: Like, unique: true } });

Post.hasMany(Like);
Like.belongsTo(Post);

Post.belongsTo(Profile);
Profile.hasMany(Post);

// friends
// Profile.hasMany(FriendRequest, { as: "Incoming Friend Requests" });
// FriendRequest.belongsTo(Profile)

// User.hasMany(FriendRequest);

// Profile.belongsToMany(Profile, { as: "Friends", through: "friends" });

Profile.belongsToMany(Profile, {
  as: "Profile",
  through: { model: FriendRequest, unique: false, onDelete: "CASCADE" },
  foreignKey: "ProfileId",
});
Profile.belongsToMany(Profile, {
  as: "Followed",
  through: { model: FriendRequest, unique: false, onDelete: "CASCADE" },
  foreignKey: "FollowedId",
});

Profile.belongsToMany(Profile, {
  as: "Friends",
  through: { model: Friend, unique: false },
});

export default {
  Experience,
  Profile,
  Comment,
  Like,
  Post,
  FriendRequest,
  Friend,
};
