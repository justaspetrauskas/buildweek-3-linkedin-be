import Experience from "./experience.js";
import Profile from "./profile.js";

Profile.hasMany(Experience);
Experience.belongsTo(Profile);

export default { Profile, Experience };
