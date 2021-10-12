import sequelize from "../db-inits.js";
import s from "sequelize";

const { DataTypes } = s;

const friends = sequelize.define(
  "friends",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

export default friends;
