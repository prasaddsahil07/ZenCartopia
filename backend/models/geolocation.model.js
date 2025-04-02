import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";
import Order from "./order.model.js";

const ShippingDetails = sequelize.define("ShippingDetails", {
  shipping_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Order, // References the Order model
      key: "order_id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  geolocation_zip_code_prefix: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  geolocation_address: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "NIT Durgapur",
  },
  geolocation_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  geolocation_state: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
}, {
  tableName: "shipping_details", // New table name for shipping details
  timestamps: true,
});

export default ShippingDetails;
