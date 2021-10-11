import sequelize from "./db-inits.js";
import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const Comment = sequelize.define("comment", {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  comment: { type: DataTypes.STRING, allowNull: false }
});

export default Comment;
