import Comment from "./comments.js";
import Like from "./likes.js";

Profile.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(Profile, { foreignKey: "user_id" });

Post.hasMany(Comment, { foreignKey: "post_id" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

Profile.belongsToMany(Post, { through: { model: Like, unique: true } });
Post.belongsTo(Profile, { through: { model: Like, unique: true } });

export default { Comment, Like };
