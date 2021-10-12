import sequelize from "../db-inits.js";
import s from "sequelize";

// get all friendREquest where requesteeeId or requesterId is my id  and accepted=true

/***
 *
 *  /:id/connections?limit
 *
 */
const { DataTypes } = s;

const friendRequests = sequelize.define(
  "friendRequests",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    //     accepted: { type: DataTypes.BOOLEAN, defaultValue: false },
    //      //   },
  },

  { timestamps: false }
);

export default friendRequests;
