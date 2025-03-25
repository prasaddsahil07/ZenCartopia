import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";

const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customer_unique_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  customer_zip_code_prefix: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'customers',   // table name
  timestamps: true,
});

export default Customer;
