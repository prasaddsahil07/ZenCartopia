import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";

const Seller = sequelize.define("Seller", {
  seller_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  seller_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seller_zip_code_prefix: {
    type: DataTypes.INTEGER,
    allowNull: false, // Every seller should have a zip code
  },
  seller_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seller_state: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
}, {
  tableName: "sellers", // Explicit table name
  timestamps: true,
});

export default Seller;
