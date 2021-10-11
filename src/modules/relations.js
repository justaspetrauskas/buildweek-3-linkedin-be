import Comment from "./comments.js";
import Like from "./likes.js";
import Profile from "./profile.js";
import Post from "./post.js";
import Experience from "./experience.js";

Profile.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(Profile, { foreignKey: "user_id" });

Post.hasMany(Comment, { foreignKey: "post_id" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

Profile.belongsToMany(Post, { through: { model: Like, unique: true } });
Post.belongsTo(Profile, { through: { model: Like, unique: true } });

Post.belongsTo(Profile);
Profile.hasMany(Post);

Profile.hasMany(Experience);
Experience.belongsTo(Profile);

export default { Comment, Like, Post, Experience, Profile };
