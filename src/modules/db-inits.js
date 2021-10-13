import { Sequelize } from "sequelize";
const {
  PGPORT,
  PGHOST,
  PGPASSWORD,
  PGUSER,
  PGDATABASE,
  NODE_ENV,
  DATABASE_URL,
} = process.env;

const sequelize = new Sequelize(DATABASE_URL, PGUSER, PGPASSWORD, {
  port: PGPORT,
  host: PGHOST,
  dialect: "postgres",
  // protocol: 'postgres',
  // dialectOptions: {
  //     ssl: {
  //         require: false,
  //         rejectUnauthorized: false
  //     }
  // }
});

export const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB is authenticated");
  } catch (error) {
    console.log(error);
  }
};

// testDB();

export const connectDB = async () => {
  try {
    await sequelize.sync({ force: true });
    // console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
