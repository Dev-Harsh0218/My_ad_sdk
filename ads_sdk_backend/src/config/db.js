// Database Entry point is here
// Here we are connecting to the database
// creating an initial connection without database to check if the DB is present or not
// if not creating the DB only if the connection is successful but there is not db present here

const { Sequelize } = require("sequelize");
const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_DB_NAME,
} = require("./env");
const logger = require("../core/utils/logger");

//initial connection without database
const initConnection = new Sequelize({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  dialect: "mysql",
  logging: false,
});

//main connection with database
const sequelize = new Sequelize(MYSQL_DB_NAME, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: "mysql",
  logging: false,
});

const createDatabase = async () => {
  try {
    await initConnection.getQueryInterface().createDatabase(MYSQL_DB_NAME);
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

const connectDB = async () => {
  try {
    //creating database if not exists
    await createDatabase();
    //Connecting to the database
    await sequelize
      .authenticate()
      .then(() => {
        logger.info("Connection has been established successfully.");
        sequelize
          .sync({ force: false })
          .then(() => {
            logger.success("Database Synced Successfully");
          })
          .catch((error) => {
            logger.error(error);
            process.exit(1);
          });
      })
      .catch((error) => {
        logger.error("Unable to connect to the database:", error);
        process.exit(1);
      });
    logger.success("Database connected successfully");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
