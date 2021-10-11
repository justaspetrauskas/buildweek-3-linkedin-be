import sequelize from "./db-inits"
import s from "sequelize"
import Profile from "profile.js"

const { DataTypes } = s

const Post = sequelize.define("post",
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        image: {
            type: DataTypes.STRING,
            defaultValue: "https://image.url",
        },
    },
    {
        timestamps: true,
    }
)

export default Post