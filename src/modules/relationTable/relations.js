import Experience from "../schemas/Experience.js";
import Profile from "../schemas/profile.js";
import Comment from "../schemas/comments.js";
import Like from "../schemas/likes.js";
import Post from "../schemas/post.js";

Profile.hasMany(Experience);
Experience.belongsTo(Profile);

Profile.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(Profile, { foreignKey: "user_id" });

Post.hasMany(Comment, { foreignKey: "post_id" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

Profile.belongsToMany(Post, { through: { model: Like, unique: true } });
Post.belongsTo(Profile, { through: { model: Like, unique: true } });

Post.belongsTo(Profile);
Profile.hasMany(Post);

export default { Experience, Profile, Comment, Like, Post };
