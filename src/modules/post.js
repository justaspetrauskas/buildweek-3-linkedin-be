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
            defaultValue: 
                "https://external-preview.redd.it/QYZ08WZ7FITBjVNPOpzJDnBFANuewPdkk4JdJ5qU86A.jpg?width=640&crop=smart&auto=webp&s=fd313ec9d9faf35c7072ae93e1f8cb248c47a4cc",
        },
    },
    {
        timestamps: true,
    }
)

export default Post