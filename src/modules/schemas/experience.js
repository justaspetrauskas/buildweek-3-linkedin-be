import sequelize from "../db-inits.js";
import s from "sequelize";

const { DataTypes } = s;

const Experience = sequelize.define("experience", {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  role: { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: false },
  area: { type: DataTypes.STRING, allowNull: false },
  // username: { type: DataTypes.STRING, allowNull: false },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue:
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },
});

export default Experience;
