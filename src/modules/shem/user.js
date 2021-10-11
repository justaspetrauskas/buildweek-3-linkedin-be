import sequelize from "../db-inits.js";
import s from "sequelize";

const { DataTypes } = s;

const User = sequelize.define("user", {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue:
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },
});

export default User;
