import Experience from "./experience.js";
import User from "./user.js";

User.hasMany(Experience);
Experience.belongsTo(User);

export default { User, Experience };
