import Experience from "../schemas/Experience.js";
import Profile from "../schemas/profile.js";
import Comment from "../schemas/comments.js";
import Like from "../schemas/likes.js";
import Post from "../schemas/post.js";

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

export default { Experience, Profile, Comment, Like, Post };
