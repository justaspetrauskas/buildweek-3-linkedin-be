import Post from "post.js"
import Profile from "profile.js"

Post.belongsTo(Profile)
Profile.hasMany(Post)

export default { Post, Profile }