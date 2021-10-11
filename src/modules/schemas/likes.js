import sequelize from "./db-inits.js";
import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const Like = sequelize.define("like", {
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true }
});

export default Like;
