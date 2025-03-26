import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";
import Customer from "./customer.model.js";

const Order = sequelize.define("Order", {
  order_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  customer_unique_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Customer,  // References Customers table
      key: "customer_unique_id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  order_status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["pending", "approved", "shipped", "delivered", "canceled", "unavailable"]], // Allowed values
    },
  },
  order_delivered_carrier_date: {
    type: DataTypes.DATE,
    allowNull: true, // Can be null if order is not yet shipped
  },
  order_delivered_customer_date: {
    type: DataTypes.DATE,
    allowNull: true, // Can be null if order is not yet delivered
  },
  order_estimated_delivery_date: {
    type: DataTypes.DATE,
    allowNull: false, // Required field
  },
}, {
  tableName: "orders", // Explicit table name
  timestamps: true,
});

export default Order;
