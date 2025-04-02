import { DataTypes } from "sequelize";
import sequelize from "../db/dbConnect.js";
import Customer from "./customer.model.js";

const Order = sequelize.define("Order", {
  order_id: {
    type: DataTypes.STRING,
    defaultValue: sequelize.UUIDV4,  // Auto-generate a unique UUID
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
      isIn: [["pending", "approved", "shipped", "delivered", "canceled", "unavailable"]],
    },
  },
  order_delivered_carrier_date: {
    type: DataTypes.DATE,
    allowNull: true, 
    defaultValue: DataTypes.NOW, // ✅ Use Sequelize's built-in timestamp
  },
  order_delivered_customer_date: {
    type: DataTypes.DATE,
    allowNull: true, 
    defaultValue: DataTypes.NOW, // ✅ Use Sequelize's built-in timestamp
  },
  order_estimated_delivery_date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW, // ✅ Use Sequelize's built-in timestamp
  },
}, {
  tableName: "orders",
  timestamps: true,
});

export default Order;
