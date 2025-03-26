import { Sequelize } from "sequelize"
import { DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "../constant.js";

// Initialize Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error connecting to the database:', err));

export default sequelize;
