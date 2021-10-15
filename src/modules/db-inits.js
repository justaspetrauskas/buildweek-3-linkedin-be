import { Sequelize } from "sequelize";
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});

export const testDB = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("DB is authenticated");
  } catch (error) {
    console.log(error);
  }
};

// testDB();

export const connectDB = async () => {
  try {
    await sequelize.sync({ alter: true, logging: false });
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
